import styled from "styled-components/native";

export const Container = styled.View`
  padding: 30px;
`;

export const Title = styled.Text`
  font-size: 23px;
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 10px;
`;

export const DescriptionView = styled.View`
  background-color: #fff;
  border-radius: 15px;
  margin: 20px 0px;
  padding: 10px;
  elevation: 5;
`;

export const WeatherTemperature = styled.Text`
  font-size: 45px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.7);
  margin-left: 20px;
`;

export const WeatherDescription = styled.Text`
  text-transform: capitalize;
  color: rgba(0, 0, 0, 0.7);
  margin-top: 10px;
`;

export const CurrentInformationView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border-radius: 15px;
`;

export const NextDaysView = styled.View`
  display: flex;
  background-color: #fff;
  padding: 10px;
  border-radius: 20px;
  margin-top: 20px;
  elevation: 5;
`;

export const NextDaysTitleView = styled.View`
  display: flex;
  flex-direction: row;
  padding: 4px;
  border-bottom-width: 1px;
  border-color: rgba(0, 0, 0, 0.3);
`;

export const NextDaysTitle = styled.Text`
  font-size: 16px;
  margin-left: 8px;
  color: rgba(0, 0, 0, 0.8);
`;

export const CustomButton = styled.TouchableOpacity`
  background-color: #fff;
  padding: 8px;
  margin: 3px 0px;
  flex-direction: row;
  align-items: center;
`;

export const ButtonText = styled.Text`
  margin-left: 6px;
  color: rgba(0, 0, 0, 0.8);
`;
