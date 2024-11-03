import React from "react";
import FolderList from "../src/pages/FolderList/FolderList";
import { createStackNavigator } from "@react-navigation/stack";
import AudioList from "../src/pages/AudioList";
import ResultList from "../src/pages/ResultList";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddAudio from "../src/pages/AddAudio/AddAudio";
import SaveAudio from "../src/pages/SaveAudio";
import Result from "../src/pages/ResultScreen";

type RootStackParamList = {
  FolderList: undefined;
  AudioList: { folderName: string; navigation: any };
  AddAudio: { folderName: string; navigation: any };
  SaveAudio: { folderName: string; navigation: any };
  ResultList: { audioFileName: string; audioUrl: string };
  Result: { audioFileName: string; audioUrl: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function TabTwoScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FolderList" component={FolderList} />
      <Stack.Screen name="AudioList" component={AudioList} />
      <Stack.Screen name="ResultList" component={ResultList} />
      <Stack.Screen name="AddAudio" component={AddAudio} />
      <Stack.Screen name="SaveAudio" component={SaveAudio} />
      <Stack.Screen name="Result" component={Result} />
    </Stack.Navigator>
  );
}
