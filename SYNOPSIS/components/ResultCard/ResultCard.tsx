import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./ResultCard.style";
import { firebase } from "../../app/src/firebase";

export type Audio = {
  name: string;
};

type ResultCardProps = {
  audioUrl: string;
  fileName: string;
  navigation: any;
};

const ResultCard = ({ audioUrl, fileName, navigation }: ResultCardProps) => {
  const userId = firebase.auth().currentUser?.uid;

  const navigateToResult = () => {
    navigation.navigate("Result", {
      audioUrl: audioUrl,
    });
  };

  return (
    <TouchableOpacity onPress={navigateToResult}>
      <View style={styles.square}>
        <View style={styles.inner_container}>
          <Text style={styles.title}>{fileName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ResultCard;
