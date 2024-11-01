import React from "react";
import AudioList from "../src/pages/AudioList";
import {Image, View, StyleSheet } from "react-native";

export default function TabTwoScreen() {
  return (  
    <>
      <View style={styles.headerTitleContainer}>
          <Image source={require("@/assets/images/SYNOPSISLogo.png")} />
      </View>
      <AudioList/>
      </>

  );
}

const styles = StyleSheet.create({
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
