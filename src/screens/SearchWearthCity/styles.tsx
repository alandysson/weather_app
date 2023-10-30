import styled from "styled-components/native";

export const SearchContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Input = styled.TextInput`
  background-color: #fff;
  padding: 10px;
  margin: 8px 0px;
  border-radius: 8px;
  width: 280px;
  border: 1px solid #769797;
  margin-right: 10px;
`;

export const Container = styled.View`
  padding: 30px;
`;

export const Title = styled.Text`
  font-size: 23px;
  margin: 15px 0px;
  color: rgba(0, 0, 0, 0.7);
`;

export const WeatherTemperature = styled.Text`
  font-size: 45px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.7);
  margin-left: 20px;
`;

export const WeatherDescription = styled.Text`
  text-transform: capitalize;
  margin: 5px 0px;
  color: rgba(0, 0, 0, 0.7);
`;

export const DescriptionView = styled.View`
  background-color: #fff;
  border-radius: 15px;
  margin: 20px 0px;
  padding: 10px;
  elevation: 5;
`;

export const CurrentInformationView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 15px;
  margin: 15px 0px;
`;

export const CustomButton = styled.TouchableOpacity`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 10px;
  margin: 8px 0px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.7);
  flex-direction: row;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
`;

export const TextWhite = styled.Text`
  font-weight: 500;
  margin-bottom: 5px;
  color: #fff;
`;
