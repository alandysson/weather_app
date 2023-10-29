import { Image, Text, ActivityIndicator, ScrollView } from "react-native";
import {
  ButtonText,
  Container,
  CurrentInformationView,
  CustomButton,
  NextDaysTitleView,
  NextDaysView,
  Title,
  WeatherDescription,
  WeatherTemperature,
} from "./styles";
import { useEffect, useState } from "react";
import data from "../../../data.json";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";
import { RoutesNavigationProp } from "../../routes";
import { Fontisto } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { api } from "../../service/api";

interface ShowWeatherInformationProps {
  lat: number;
  long: number;
}
type CurrentInformations = {
  cityName: string;
  temperature: number;
  weatherDescription: string;
  weatherIcon: string;
};

export const ShowWeatherInformation = ({ lat, long }: ShowWeatherInformationProps) => {
  const [weathers, setWeathers] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [currentInformations, setCurrentInformations] = useState<CurrentInformations>(
    {} as CurrentInformations
  );
  const navigation = useNavigation<RoutesNavigationProp>();

  const getData = async () => {
    setLoading(true);
    if (!lat || !long) return;
    try {
      const { data } = await api.get(
        `forecast?lat=${lat}&lon=${long}&appid=fd8bc8a1052edaa97828bcbded7083c3&units=metric&lang=pt_br`
      );
      setCurrentInformations({
        cityName: data.city.name,
        temperature: data.list[0].main.temp,
        weatherDescription: data.list[0].weather[0]?.description,
        weatherIcon: data.list[0].weather[0]?.icon,
      });
      setWeathers(data.list);
    } catch (error) {
      console.log(error);
      alert("Erro ao obter dados");
    }
    setLoading(false);
  };

  const pushToWeatherDay = (day: number) => {
    const date = dayjs().add(day, "day").format("DD-MM-YYYY");
    const filteredWeathers = weathers.filter(
      (weather: any) => dayjs(weather.dt_txt).format("DD-MM-YYYY") === date
    );

    navigation.navigate("WeatherDay", {
      date: date,
      data: filteredWeathers,
      city: currentInformations.cityName,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <ActivityIndicator />;

  return (
    <Container>
      <CurrentInformationView>
        <Image
          source={{ uri: `https://openweathermap.org/img/wn/${currentInformations.weatherIcon}.png` }}
          style={{ width: 60, height: 60, backgroundColor: "#3b7cb9", borderRadius: 30 }}
        />
        <Title>{currentInformations.cityName}</Title>
        <WeatherDescription>{currentInformations.weatherDescription}</WeatherDescription>
        <WeatherTemperature>{currentInformations.temperature} ºC</WeatherTemperature>
      </CurrentInformationView>
      <NextDaysView>
        <NextDaysTitleView>
          <Fontisto name="date" size={18} color="white" />
          <Text style={{ color: "#fff", marginLeft: 8 }}>Veja a previsão dos próximos dias</Text>
        </NextDaysTitleView>
        <ScrollView>
          {Array.from(Array(5).keys()).map((day) => (
            <CustomButton key={day} onPress={() => pushToWeatherDay(day)}>
              <Entypo name="adjust" size={18} color="#3b7cb9" />
              {day === 0 ? (
                <ButtonText>Hoje</ButtonText>
              ) : (
                <ButtonText>{dayjs().add(day, "day").format("DD-MM-YYYY")}</ButtonText>
              )}
            </CustomButton>
          ))}
        </ScrollView>
      </NextDaysView>
    </Container>
  );
};
