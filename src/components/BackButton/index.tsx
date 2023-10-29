import { useNavigation } from "@react-navigation/native";
import { RoutesNavigationProp } from "../../routes";
import { AntDesign } from "@expo/vector-icons";
import { CustomButton, TextWhite } from "./styles";
export const BackButton = () => {
  const navigation = useNavigation<RoutesNavigationProp>();
  return (
    <CustomButton onPress={() => navigation.goBack()}>
      <AntDesign name="arrowleft" size={20} color="white" />
      <TextWhite style={{ marginLeft: 5 }}>Voltar</TextWhite>
    </CustomButton>
  );
};
