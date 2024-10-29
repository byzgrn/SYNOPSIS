import React from "react";
import AudioList from "../src/pages/AudioList";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, View, StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();

export default function TabTwoScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: () => (
          <View style={styles.headerTitleContainer}>
            <Image source={require("@/assets/images/SYNOPSISLogo.png")} />
          </View>
        ),
      }}
    >
      <Stack.Screen name="AudioList" component={AudioList} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
