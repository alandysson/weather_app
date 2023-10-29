import { View, Text, Image, ActivityIndicator } from "react-native";
import { api } from "../../service/api";
import { useState } from "react";
import {
  ButtonText,
  CurrentInformationView,
  CustomButton,
  DescriptionView,
  Input,
  SearchContainer,
  TextWhite,
  Title,
  WeatherDescription,
  WeatherTemperature,
} from "./styles";
import { BackButton } from "../../components/BackButton";

type CurrentInformations = {
  cityName: string;
  weatherDescription: string;
  temperature: number;
  weatherIcon: string;
  date: number;
};

type WeatherInformation = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
};

export const SearchWearthCity = () => {
  const [citySearch, setCitySearch] = useState<string>("");
  const [currentInformations, setCurrentInformations] = useState<CurrentInformations>(
    {} as CurrentInformations
  );
  const [cityWearthData, setCityWearthData] = useState<WeatherInformation>({} as WeatherInformation);
  const [loading, setLoading] = useState<boolean>(false);
  const apiKey = process.env.EXPO_PUBLIC_API_KEY;
  const getData = async () => {
    if (!citySearch) return alert("Digite uma cidade");

    setLoading(true);
    try {
      const { data } = await api.get(`weather?q=${citySearch}&appid=${apiKey}&units=metric&lang=pt_br`);
      setCityWearthData({
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        temp_min: data.main.temp_min,
        temp_max: data.main.temp_max,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
      });
      setCurrentInformations({
        cityName: data.name,
        weatherDescription: data.weather[0].description,
        temperature: data.main.temp,
        weatherIcon: data.weather[0].icon,
        date: data.dt,
      });
    } catch (error) {
      alert("Cidade não encontrada");
    }
    setLoading(false);
  };
  const Loading = () => {
    return (
      <View style={{ marginTop: 15 }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  };

  return (
    <View style={{ marginTop: 50, padding: 10 }}>
      <BackButton />
      <SearchContainer>
        <Input
          onChangeText={setCitySearch}
          style={{ backgroundColor: "#fff", height: 40 }}
          placeholder="Digite o nome da cidade"
        />
        <CustomButton onPress={getData}>
          <ButtonText>Buscar</ButtonText>
        </CustomButton>
      </SearchContainer>
      {loading ? (
        <Loading />
      ) : (
        <>
          {Object.keys(currentInformations).length === 0 ? (
            <View>
              <TextWhite>Após digitar, clique em buscar</TextWhite>
            </View>
          ) : (
            <DescriptionView>
              <Title>{currentInformations.cityName}</Title>
              <CurrentInformationView>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ alignItems: "center" }}>
                    <Image
                      source={{
                        uri: `https://openweathermap.org/img/wn/${currentInformations.weatherIcon}.png`,
                      }}
                      style={{ width: 60, height: 60, backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 30 }}
                    />
                    <WeatherDescription>{currentInformations.weatherDescription}</WeatherDescription>
                  </View>
                  <WeatherTemperature>{Math.floor(currentInformations.temperature)}ºC</WeatherTemperature>
                </View>
                <View>
                  <Text>max: {Math.floor(cityWearthData.temp_max)}ºC</Text>
                  <Text>min: {Math.floor(cityWearthData.temp_min)}ºC</Text>
                </View>
              </CurrentInformationView>
            </DescriptionView>
          )}
        </>
      )}
    </View>
  );
};
