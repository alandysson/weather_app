import styled from "styled-components/native";

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 20px;
`;

export const TextBlue = styled.Text`
  color: #3b7cb9;
`;

export const TextWhite = styled.Text`
  color: #fff;
`;
export const Container = styled.View`
  padding: 30px;
  margin-top: 40px;
`;

export const WeatherDescriptionView = styled.View`
  display: flex;
  align-items: center;
  margin-right: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  width: 160px;
  margin: 10px;
  background-color: #fff;
  elevation: 5;
  box-shadow: 2px 2px 5px #ccc;
`;

export const ImageView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const WeatherDescription = styled.Text`
  text-transform: capitalize;
  font-size: 16px;
  color: #3b7cb9;
`;
