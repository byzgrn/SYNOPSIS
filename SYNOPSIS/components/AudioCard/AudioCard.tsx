/*import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import styles from "./AudioCard.style";
import { colors } from "../../constants/Colors";
import { firebase } from "../../app/src/firebase";
import playSound from "../../hooks/playSound";
import processAudio from "@/hooks/processAudio";
import signIn from "@/hooks/signIn";
import Button from "../Button";

export type Audio = {
  name: string;
};

type AudioCardProps = {
  audio: Audio;
  folderName: string | null;
};

const AudioCard = ({ audio, folderName }: AudioCardProps) => {
  const userId = firebase.auth().currentUser?.uid;
  const folder = `userAudioRecordings/${userId}/${folderName}`;

  const { play, stop, isPlaying } = playSound(audio.name, folderName);

  const { process } = processAudio(audio.name, folderName);

  useEffect(() => {
    return () => {
      stop();
    };
  }, []);

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

  const [showButtons, setShowButtons] = useState(false);

  const handleToggle = () => {
    setShowButtons((prev) => !prev);
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
            onPress={process}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AudioCard;*/
import React, { useState, useEffect } from "react";
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
  navigation: any; // Add navigation prop
};

const AudioCard = ({ audio, folderName, navigation }: AudioCardProps) => {
  const userId = firebase.auth().currentUser?.uid;
  const folder = `userAudioRecordings/${userId}/${folderName}`;

  const { play, stop, isPlaying } = playSound(audio.name, folderName);
  const { process } = processAudio(audio.name, folderName);

  useEffect(() => {
    return () => {
      stop();
    };
  }, []);

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

  const [showButtons, setShowButtons] = useState(false);

  const handleToggle = () => {
    setShowButtons((prev) => !prev);
  };

  // Navigate to ResultList screen with audio name and folder name
  const navigateToResultList = () => {
    navigation.navigate("ResultList", {
      audioFileName: audio.name,
      folderName: folderName,
    });
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
            onPress={navigateToResultList} // Updated to navigate to ResultList
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AudioCard;
