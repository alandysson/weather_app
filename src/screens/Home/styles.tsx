import styled from "styled-components/native";

export const Container = styled.View`
  padding: 30px;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: #fff;
  margin: 5px 0px;
`;

export const WeatherTemperature = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #e4f8f8;
`;

export const WeatherDescription = styled.Text`
  text-transform: capitalize;
  color: #ccc;
`;

export const CurrentInformationView = styled.View`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 15px;
`;

export const NextDaysView = styled.View`
  display: flex;
  background-color: #3b7cb9;
  padding: 10px;
  border-radius: 10px;
  margin-top: 20px;
`;

export const NextDaysTitleView = styled.View`
  display: flex;
  flex-direction: row;
  padding: 4px;
  border-bottom-width: 1px;
  border-color: #fff;
`;

export const CustomButton = styled.TouchableOpacity`
  background-color: #fff;
  padding: 10px;
  margin: 8px 0px;
  border-radius: 8px;
  border: 1px solid #769797;
  flex-direction: row;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #3b7cb9;
  font-weight: bold;
  margin-left: 6px;
`;
