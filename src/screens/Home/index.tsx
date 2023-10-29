import { requestForegroundPermissionsAsync, getCurrentPositionAsync, Accuracy } from "expo-location";
import { useState, useEffect } from "react";
import { View, ActivityIndicator, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RoutesNavigationProp } from "../../routes";
import { ShowWeatherInformation } from "./ShowWeatherInformation";

export const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const [longitude, setTongitude] = useState<number>();
  const [latitude, setLatitude] = useState<number>();
  const navigation = useNavigation<RoutesNavigationProp>();

  const getPermission = async () => {
    setLoading(true);
    try {
      const { granted } = await requestForegroundPermissionsAsync();
      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          accuracy: Accuracy.Highest,
        });
        setTongitude(coords.longitude);
        setLatitude(coords.latitude);
      }
    } catch (error) {
      console.error("Erro ao obter permissão:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPermission();
  }, []);

  if (loading) return <ActivityIndicator />;

  return (
    <View style={{ marginTop: 50, padding: 10 }}>
      <View style={{ alignItems: "flex-end", marginRight: 10 }}>
        <TouchableOpacity onPress={() => navigation.navigate("SearchWearthCity")}>
          <AntDesign name="search1" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <ShowWeatherInformation lat={latitude} long={longitude} />
    </View>
  );
};
