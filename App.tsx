import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import UserList from "./Userlist";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    PoppinsThin: require("./assets/fonts/Poppins/Poppins-Thin.ttf"),
    PoppinsThinItalic: require("./assets/fonts/Poppins/Poppins-ThinItalic.ttf"),
    PoppinsLight: require("./assets/fonts/Poppins/Poppins-Light.ttf"),
    PoppinsExtraLight: require("./assets/fonts/Poppins/Poppins-ExtraLight.ttf"),
    PoppinsMedium: require("./assets/fonts/Poppins/Poppins-Medium.ttf"),
    PoppinsMediumItalic: require("./assets/fonts/Poppins/Poppins-MediumItalic.ttf"),
    PoppinsRegular: require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("./assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    PoppinsBold: require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
    PoppinsExtraBold: require("./assets/fonts/Poppins/Poppins-ExtraBold.ttf"),
    PoppinsExtraBoldItalic: require("./assets/fonts/Poppins/Poppins-ExtraBoldItalic.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <UserList />
    </>
  );
}
