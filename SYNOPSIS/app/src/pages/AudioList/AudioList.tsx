import React, { useState, useEffect } from "react";
import { View, FlatList, Text } from "react-native";
import AudioCard from "../../../../components/AudioCard";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StackNavigationProp } from "@react-navigation/stack";

import styles from "./AudioList.style";
import { firebase } from "../../firebase";
import { colors } from "../../../../constants/Colors";

type RootStackParamList = {
  AddAudio: { key: string | null };
};
export type navigationProp = {
  navigation: StackNavigationProp<RootStackParamList, "AddAudio">;
};

export type AudioItem = {
  audioNo: number;
  key: string;
  name: string;
  contentType: string;
};

const AudioList = () => {
  const userId = firebase.auth().currentUser?.uid;
  const storageRef = firebase.storage().ref();
  const [audioList, setAudioList] = useState([]);


  useEffect(() => {
    listAudios();
    const interval = setInterval(listAudios, 5000);

    return () => clearInterval(interval);
  }, []);

  const listAudios = () => {
    const audioRef = storageRef.child(`userAudioRecordings/${userId}`);

    audioRef
      .listAll()
      .then((audio: any) => {
        const promises = audio.items.map((itemRef: any, index: number) => {
          return itemRef.getMetadata().then((metadata: any) => {
            return {
              audioNo: index + 1,
              key: metadata.timeCreated,
              name: itemRef.name,
              contentType: metadata.contentType,
            };
          });
        });
        Promise.all(promises).then((list: any) => {
          setAudioList(list);
          console.log(list);
        });
      })
      .catch((error: Error) => {
        console.error("Error getting audio files list:", error.message);
      });
  };

  const renderAudio = ({ item }: { item: AudioItem }) => (
    <AudioCard audio={item} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={audioList}
        renderItem={renderAudio}
      />
    </View>
  );
};

export default AudioList;
