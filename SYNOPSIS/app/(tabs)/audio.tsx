import AudioList from "../src/pages/AudioList";
import AddAudio from "../src/pages/AddAudio";
import SaveAudio from "../src/pages/SaveAudio";
import { Image, View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

type RootStackParamList = {
  AddAudio:{ folderName: string; navigation:any };
  SaveAudio:{ folderName: string; navigation:any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function TabTwoScreen() {
  
}
