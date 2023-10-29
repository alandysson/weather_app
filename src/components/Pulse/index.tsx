import React, { useEffect } from "react";
import { Container } from "./styles";
import { Animated, Easing } from "react-native";

export const Pulse = () => {
  const scale = new Animated.Value(1);
  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.2,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1 }
    ).start();
  };
  useEffect(() => {
    startPulseAnimation();
  });

  return (
    <Container>
      <Animated.View
        style={{
          transform: [{ scale: scale }],
        }}
      >
        <Animated.Image
          source={require("../../../assets/weather.png")}
          style={{
            width: 120,
            height: 120,
          }}
        />
      </Animated.View>
    </Container>
  );
};
