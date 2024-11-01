import React from "react";
import FolderList from "../src/pages/FolderList/FolderList";
import { createStackNavigator } from "@react-navigation/stack";
import Result from "../src/pages/Result/Result";
const Stack = createStackNavigator();

export default function TabTwoScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FolderList" component={FolderList} />
      <Stack.Screen name="Result" component={Result} />
    </Stack.Navigator>
  );
}
