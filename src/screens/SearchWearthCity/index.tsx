import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { api } from "../../service/api";
import { useEffect, useState } from "react";
import data from "../../../data.json";
import {
  ButtonText,
  CardInformations,
  CurrentInformationView,
  CustomButton,
  InfoCard,
  Input,
  SearchContainer,
  TextWhite,
  Title,
  WeatherDescription,
  WeatherTemperature,
} from "./styles";
import dayjs from "dayjs";
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

  const getData = async () => {
    if (!citySearch) return alert("Digite uma cidade");

    setLoading(true);
    try {
      const { data } = await api.get(
        `weather?q=${citySearch}&appid=fd8bc8a1052edaa97828bcbded7083c3&units=metric&lang=pt_br`
      );
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
        <View style={{ marginTop: 15 }}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <>
          {Object.keys(currentInformations).length === 0 ? (
            <View>
              <TextWhite>Após digitar, clique em buscar</TextWhite>
            </View>
          ) : (
            <>
              <CurrentInformationView>
                <Image
                  source={{ uri: `https://openweathermap.org/img/wn/${currentInformations.weatherIcon}.png` }}
                  style={{ width: 60, height: 60, backgroundColor: "#3b7cb9", borderRadius: 30 }}
                />
                <Title>{currentInformations.cityName}</Title>
                <WeatherDescription>{currentInformations.weatherDescription}</WeatherDescription>
                <WeatherTemperature>{Math.floor(currentInformations.temperature)}ºC</WeatherTemperature>
              </CurrentInformationView>
              <CardInformations>
                <TextWhite>Temperatura máxima: {Math.floor(cityWearthData.temp_max)}ºC</TextWhite>
                <TextWhite>Temperatura máxima: {Math.floor(cityWearthData.temp_min)}ºC</TextWhite>
                <TextWhite>Sensação termica: {Math.floor(cityWearthData.feels_like)}ºC</TextWhite>
              </CardInformations>
            </>
          )}
        </>
      )}
    </View>
  );
};
