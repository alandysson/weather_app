import { RouteProp, useRoute } from "@react-navigation/native";
import { Text, View, Image, ScrollView } from "react-native";
import { RoutesNavigatorParamList } from "../../routes";
import dayjs from "dayjs";

import { Container, CustomText, Title, WeatherDescriptionView } from "./styles";
import { BackButton } from "../../components/BackButton";
import { Feather } from "@expo/vector-icons";

type WeatherDayProp = RouteProp<RoutesNavigatorParamList, "WeatherDay">;

export const WeatherDay = () => {
  const { params } = useRoute<WeatherDayProp>();

  return (
    <Container>
      <BackButton />
      <Title>Previsão do tempo</Title>
      <Text style={{ color: "#fff", marginBottom: 15 }}>
        {params.city}, {params.date}
      </Text>
      <View style={{ backgroundColor: "#fff", borderRadius: 20, padding: 10 }}>
        <ScrollView horizontal>
          {params.data.map((weather: any) => (
            <WeatherDescriptionView key={weather.dt}>
              <CustomText>{dayjs(weather.dt_txt).format("HH:mm")}</CustomText>
              <Image
                source={{
                  uri: `https://openweathermap.org/img/wn/${weather.weather[0]?.icon}.png`,
                }}
                style={{ width: 50, height: 50 }}
              />
              <CustomText>{Math.floor(weather.main.temp)} ºC</CustomText>
              <View style={{ alignItems: "center", marginTop: 10 }}>
                <Feather name="wind" size={20} color="#3b7cb9" />
                <CustomText>{Math.floor(weather.wind.speed)} m/s</CustomText>
              </View>
            </WeatherDescriptionView>
          ))}
        </ScrollView>
      </View>
    </Container>
  );
};
