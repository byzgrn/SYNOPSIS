import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import styles from "./AudioCard.style";
import { colors } from "../../constants/Colors";
import { firebase } from "../../app/src/firebase";
import playSound from "../../hooks/playSound";
import processAudio from "@/hooks/processAudio";

export type Audio = {
  name: string;
};

type AudioCardProps = {
  audio: Audio;
  folderName: string | null;
  navigation: any;
};

const AudioCard = ({ audio, folderName, navigation }: AudioCardProps) => {
  const userId = firebase.auth().currentUser?.uid;
  const folder = `userAudioRecordings/${userId}/${folderName}`;

  const { play, stop, isPlaying } = playSound(audio.name, folderName);
  const { process } = processAudio(audio.name, folderName);

  function handleSoundPlay() {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
  }

  function deleteAudio() {
    const audioRef = firebase.storage().ref().child(`${folder}/${audio.name}`);
    audioRef
      .delete()
      .then(() => {
        console.log("Audio file deleted successfully!");
      })
      .catch((error: Error) => {
        console.log("Error deleting audio file:", error.message);
      });
  }

  const navigateToResultList = async () => {
    try {
      const audioRef = firebase
        .storage()
        .ref()
        .child(`${folder}/${audio.name}`);
      const audioUrl = await audioRef.getDownloadURL();

      navigation.navigate("ResultList", {
        audioFileName: audio.name,
        audioUrl: audioUrl,
      });
      console.log(audioUrl);
    } catch (error) {
      console.error("Error fetching audio URL:", error);
    }
  };

  return (
    <TouchableOpacity onPress={handleSoundPlay}>
      <View style={styles.square}>
        <View style={styles.inner_container}>
          <Text style={styles.title}>{audio.name}</Text>
        </View>
        <View style={styles.buttonsLocation}>
          <FontAwesome.Button
            style={styles.buttonContainer}
            name="pencil-square-o"
            size={20}
            backgroundColor={colors.darkbrown}
            onPress={process}
          />
          <FontAwesome.Button
            style={styles.buttonContainer}
            name="trash"
            size={20}
            backgroundColor={colors.darkbrown}
            onPress={deleteAudio}
          />
          <FontAwesome.Button
            style={styles.buttonContainer}
            name="list-ul"
            size={20}
            backgroundColor={colors.darkbrown}
            onPress={navigateToResultList}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AudioCard;
