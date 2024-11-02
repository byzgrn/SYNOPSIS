import styles from "./FolderList.style";
import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { firebase } from "../../firebase";
import { uploadBytes, deleteObject } from "firebase/storage";
import { colors } from "@/constants/Colors";
import Folder from "@/components/Folder/Folder";
import FontAwesome from '@expo/vector-icons/FontAwesome';


export type FolderItem = {
  folderNo: number;
  key: string;
  name: string;
  contentType: string;
};

type RootStackParamList = {
  AudioList: { folderName: string | null };
};

type navigation = StackNavigationProp<RootStackParamList, 'AudioList'>;

type Props = {
  navigation: navigation;
};


const FolderList = ({navigation}: Props) => {

  const userId = firebase.auth().currentUser?.uid;
  const storageRef = firebase.storage().ref();
  const [folderList, setFolderList] = useState<any>([]);


  useEffect(() => {
    listFolders();
    const interval = setInterval(listFolders, 5000);

    return () => clearInterval(interval);
  }, []);

  const listFolders = async() => {
    const folderRef = storageRef.child(`userAudioRecordings/${userId}`);

    const result = await folderRef.listAll();
      
    const folderNames = result.prefixes.map(folderRef => ({name: folderRef.name, referance:folderRef}));
      
    setFolderList(folderNames);
  };

  const [newFolderName, setNewFolderName] = useState<string>("");

  const addFolder = async () => {
    if (!newFolderName.trim()) {
      Alert.alert("Dosya ismini girin.");
      return;
    }

    const folderRef = storageRef.child(`userAudioRecordings/${userId}/${newFolderName}/temp.txt`);
    // Create an empty Blob to upload (zero-byte file)
    const emptyBlob = new Blob([], { type: "text/plain" });

  try {
    // Upload the empty file
    await uploadBytes(folderRef, emptyBlob);
    console.log(`Temporary file uploaded to create folder: ${newFolderName}`);

  
    console.log(`Temporary file deleted: ${folderRef.fullPath}`);
  } catch (error) {
    console.error("Error creating folder:", error);
  }
  }

  const renderFolder = ({ item }: { item: FolderItem }) => (
    <Folder folderName={item.name} navigation={navigation}/>
  );

  return (
    <View style={styles.container}>
       <Image
        source={require("@/assets/images/SYNOPSISLogo.png")}
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        placeholder="Yeni dosya ismi"
        value={newFolderName}
        onChangeText={setNewFolderName}
      />
      <View style={styles.buttonContainer}>
                <FontAwesome.Button name='plus' backgroundColor={colors.darkbrown} onPress={addFolder}>
                  Add Folder</FontAwesome.Button>
            </View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={folderList}
        renderItem={renderFolder}
      />
    </View>
  );


};

export default FolderList;
