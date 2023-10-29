import { RouteProp, useRoute } from "@react-navigation/native";
import { Text, View, Image, ScrollView } from "react-native";
import { RoutesNavigatorParamList } from "../../routes";
import dayjs from "dayjs";

import { Container, ImageView, TextBlue, Title, WeatherDescription, WeatherDescriptionView } from "./styles";
import { BackButton } from "../../components/BackButton";

type WeatherDayProp = RouteProp<RoutesNavigatorParamList, "WeatherDay">;

export const WeatherDay = () => {
  const { params } = useRoute<WeatherDayProp>();
  return (
    <Container style={{ flex: 1 }}>
      <BackButton />
      <Title>Previsão do tempo</Title>
      <Text style={{ color: "#fff", marginBottom: 15 }}>
        {params.city}, {params.date}
      </Text>
      <View
        style={{
          borderRadius: 10,
        }}
      >
        <ScrollView horizontal>
          {params.data.map((weather: any) => (
            <WeatherDescriptionView key={weather.dt}>
              <TextBlue>{dayjs(weather.dt_txt).format("HH:mm")}</TextBlue>
              <ImageView>
                <Image
                  source={{
                    uri: `https://openweathermap.org/img/wn/${weather.weather[0]?.icon}.png`,
                  }}
                  style={{ width: 35, height: 35 }}
                />
                <TextBlue>{Math.floor(weather.main.temp)} ºC</TextBlue>
              </ImageView>
              <WeatherDescription>{weather.weather[0]?.description}</WeatherDescription>
            </WeatherDescriptionView>
          ))}
        </ScrollView>
      </View>
    </Container>
  );
};
