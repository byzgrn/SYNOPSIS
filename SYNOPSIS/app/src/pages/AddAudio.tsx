import React, { useState } from "react";
import { Text, View, Image } from "react-native";

import Button from "../../../components/Button";
import Input from "../../../components/Input";
import useAudioUploader from "../../../hooks/useAudioUploader";
import { colors } from "../../../constants/Colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { firebase } from "../firebase";
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  SaveAudio: { folderName: string | null  };
  AddAudio: { folderName: string | null };
};
export type Props = {
  navigation: StackNavigationProp<RootStackParamList, "SaveAudio">;
  route: FolderRouteProp;
};

type FolderRouteProp = RouteProp<RootStackParamList, 'AddAudio'>;

export type AudioItem = {
  audioNo: number;
  key: string;
  name: string;
  contentType: string;
};

const AddAudio = ({ route, navigation }: Props) => {
  const { folderName } = route.params;
  const userId = firebase.auth().currentUser?.uid;
  const folder = `userAudioRecordings/${userId}/${folderName}`;
  const { selectedFile, uploadProgress, selectFile, uploadFile } =
    useAudioUploader();
  const [fileName, setFileName] = useState("");
  const handleFileNameChange = (fileName: string) => {
    setFileName(fileName);
  };

  function navigateToSaveAudioScreen() {
    navigation.navigate("SaveAudio", {folderName:folderName });
  }

  return (
    <View
      style={{
        //padding: 50,
        backgroundColor: colors.darkbrown,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image source={require("@/assets/images/SYNOPSISDarkBrownLogo.png")} />
      <View
        style={{
          padding: 25,
          margin: 20,
          marginTop: 50,
          backgroundColor: colors.brown,
          borderWidth: 2,
          borderColor: colors.grayish,
          borderRadius: 5,
        }}
      >
        <Button text="Select Audio File" onPress={selectFile} />
        {selectedFile && (
          <View style={{ marginBottom: 20 }}>
            <Text>Selected File: {selectedFile.name}</Text>
            <Input
              placeholder={"File Name"}
              value={fileName}
              onChangeText={handleFileNameChange}
            ></Input>
            <Text>Progress: {uploadProgress.toFixed(2)}%</Text>
            <Button
              text="Upload File"
              onPress={() =>
                uploadFile({
                  folder: folder,
                  fileName: fileName,
                  userId: userId,
                })
              }
            />
          </View>
        )}
      </View>
      <View
        style={{
          padding: 25,
          margin: 20,
          backgroundColor: colors.brown,
          borderWidth: 2,
          borderColor: colors.grayish,
          borderRadius: 5,
        }}
      >
        <Button text="New Recording" onPress={navigateToSaveAudioScreen} />
      </View>
    </View>
  );
};

export default AddAudio;
