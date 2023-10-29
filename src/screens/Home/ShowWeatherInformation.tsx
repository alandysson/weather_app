import { Image, ActivityIndicator, ScrollView, View } from "react-native";
import {
  ButtonText,
  Container,
  CurrentInformationView,
  CustomButton,
  DescriptionView,
  NextDaysTitle,
  NextDaysTitleView,
  NextDaysView,
  Title,
  WeatherDescription,
  WeatherTemperature,
} from "./styles";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";
import { RoutesNavigationProp } from "../../routes";
import { Fontisto } from "@expo/vector-icons";
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
  country: string;
};

export const ShowWeatherInformation = ({ lat, long }: ShowWeatherInformationProps) => {
  const [weathers, setWeathers] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [currentInformations, setCurrentInformations] = useState<CurrentInformations>(
    {} as CurrentInformations
  );
  const navigation = useNavigation<RoutesNavigationProp>();
  const apiKey = process.env.EXPO_PUBLIC_API_KEY;
  const getCurrentInformations = async () => {
    if (!lat || !long) return;
    try {
      const { data } = await api.get(
        `weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric&lang=pt_br`
      );
      setCurrentInformations({
        cityName: data.name,
        temperature: data.main.temp,
        weatherDescription: data.weather[0]?.description,
        weatherIcon: data.weather[0]?.icon,
        country: data.sys.country,
      });
    } catch (error) {
      alert("Erro ao obter dados atuais");
    }
  };

  const getData = async () => {
    setLoading(true);
    if (!lat || !long) return;
    try {
      const { data } = await api.get(
        `forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric&lang=pt_br`
      );
      setWeathers(data.list);
    } catch (error) {
      console.log(error);
      alert("Erro ao obter dados");
    }
    setLoading(false);
  };

  const transformDateInDay = (dayOfWeek: number) => {
    switch (dayOfWeek) {
      case 0:
        return "Domingo";
      case 1:
        return "Segunda";
      case 2:
        return "Terça";
      case 3:
        return "Quarta";
      case 4:
        return "Quinta";
      case 5:
        return "Sexta";
      case 6:
        return "Sábado";
    }
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
    getCurrentInformations();
    getData();
  }, []);

  if (loading) {
    return (
      <View style={{ marginTop: 15 }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <Container>
      <DescriptionView>
        <Title>
          {currentInformations.cityName}, {currentInformations.country}
        </Title>
        <CurrentInformationView>
          <View style={{ alignItems: "center" }}>
            <Image
              source={{ uri: `https://openweathermap.org/img/wn/${currentInformations.weatherIcon}.png` }}
              style={{ width: 85, height: 85, backgroundColor: "rgba(0,0,0,0.14)", borderRadius: 50 }}
            />
            <WeatherDescription>{currentInformations.weatherDescription}</WeatherDescription>
          </View>
          <WeatherTemperature>{Math.floor(currentInformations.temperature)}ºC</WeatherTemperature>
        </CurrentInformationView>
      </DescriptionView>
      <NextDaysView>
        <NextDaysTitleView>
          <Fontisto name="date" size={18} color="black" />
          <NextDaysTitle>Veja as previsões dos próximos dias</NextDaysTitle>
        </NextDaysTitleView>
        <ScrollView>
          {Array.from(Array(5).keys()).map((day) => (
            <CustomButton key={day} onPress={() => pushToWeatherDay(day)}>
              {day === 0 ? (
                <ButtonText>Hoje</ButtonText>
              ) : (
                <ButtonText>{transformDateInDay(dayjs().add(day, "day").get("day"))}</ButtonText>
              )}
            </CustomButton>
          ))}
        </ScrollView>
      </NextDaysView>
    </Container>
  );
};
