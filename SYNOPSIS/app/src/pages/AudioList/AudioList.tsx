import React, { useState, useEffect } from "react";
import { View, FlatList, Text ,Image} from "react-native";
import AudioCard from "../../../../components/AudioCard";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from '@react-navigation/native';

import styles from "./AudioList.style";
import { firebase } from "../../firebase";
import { colors } from "../../../../constants/Colors";

type RootStackParamList = {
  AudioList: { folderName: string | null };
  AddAudio: { folderName: string | null};
};

type FolderRouteProp = RouteProp<RootStackParamList, 'AudioList'>;
 type navigationProp =  StackNavigationProp<RootStackParamList, 'AddAudio'>;

type Props = {
  route: FolderRouteProp;
  navigation:navigationProp;
};

export type AudioItem = {
  audioNo: number;
  key: string;
  name: string;
  contentType: string;
};

const AudioList = ({route, navigation}:Props) => {
  const { folderName } = route.params;
  const userId = firebase.auth().currentUser?.uid;
  const storageRef = firebase.storage().ref();
  const [audioList, setAudioList] = useState<AudioItem[]>([]);

  function navigateToAddAudioScreen() {
    navigation.navigate('AddAudio', {folderName: folderName});
}

  useEffect(() => {
    listAudios();
    const interval = setInterval(listAudios, 5000);

    return () => clearInterval(interval);
  }, []);

  const listAudios = () => {
    const audioRef = storageRef.child(`userAudioRecordings/${userId}/${folderName}`);
    

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
          setAudioList((prevFiles) => 
            prevFiles.filter(file => file.name !== "temp.txt")
        );
        });
      })
      .catch((error: Error) => {
        console.error("Error getting audio files list:", error.message);
      });
  };

  const renderAudio = ({ item }: { item: AudioItem }) => (
    <AudioCard audio={item} folderName={folderName} />
  );

  return (
    <View style={styles.container}>    
      <View style={styles.buttonContainer}>
      <Text style={styles.title}>{folderName}</Text>
       <FontAwesome.Button name='plus' backgroundColor={colors.darkbrown} onPress={navigateToAddAudioScreen}>Add Audio</FontAwesome.Button>
      </View>
      <Image
        source={require("@/assets/images/SYNOPSISLogo.png")}
        style={styles.logo}
      />
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={audioList}
        renderItem={renderAudio}
      />
    </View>
  );
};

export default AudioList;
