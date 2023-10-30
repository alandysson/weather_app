import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/Home";
import { WeatherDay } from "../screens/WeatherDay";
import { SearchWearthCity } from "../screens/SearchWearthCity";

export type RoutesNavigatorParamList = {
  Home: undefined;
  WeatherDay: { date: string; data: any[]; city: string };
  SearchWearthCity: undefined;
};

export type RoutesNavigationProp = NativeStackNavigationProp<RoutesNavigatorParamList, "Home">;

const Stack = createNativeStackNavigator<RoutesNavigatorParamList>();

export function Routes() {
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: "#3b7cb9",
        },
      }}
    >
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Group>
          <Stack.Screen name="WeatherDay" component={WeatherDay} options={{ headerShown: false }} />
          <Stack.Screen
            name="SearchWearthCity"
            component={SearchWearthCity}
            options={{ headerShown: false }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
