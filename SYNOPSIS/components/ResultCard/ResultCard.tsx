import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./ResultCard.style";
import { firebase } from "../../app/src/firebase";

export type Audio = {
  name: string;
};

type ResultCardProps = {
  folderName: string;
  fileName: string;
  navigation: any;
};

const ResultCard = ({ folderName, fileName, navigation }: ResultCardProps) => {
  const userId = firebase.auth().currentUser?.uid;
  const folder = `userAudioRecordings/${userId}/${folderName}`;
  const file = `userAudioRecordings/${userId}/${folderName}/${fileName}`;

  const navigateToResult = () => {
    navigation.navigate("Result", {
      audioFileName: fileName,
      folderName: folderName,
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
