import React from "react";
import FolderList from "../src/pages/FolderList/FolderList";
import { createStackNavigator } from "@react-navigation/stack";
import Result from "../src/pages/Result/Result";
import AudioList from "../src/pages/AudioList";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddAudio from "../src/pages/AddAudio";
import SaveAudio from "../src/pages/SaveAudio";

type RootStackParamList = {
  FolderList: undefined;
  AudioList: { folderName: string; navigation:any };
  AddAudio:{ folderName: string; navigation:any };
  SaveAudio:{ folderName: string; navigation:any };
  Result:undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function TabTwoScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FolderList" component={FolderList} />
      <Stack.Screen name="AudioList" component={AudioList} />
      <Stack.Screen name="AddAudio" component={AddAudio} />
      <Stack.Screen name="SaveAudio" component={SaveAudio} />
      <Stack.Screen name="Result" component={Result} />
    </Stack.Navigator>
  );
}
