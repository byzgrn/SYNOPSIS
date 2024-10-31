import styles from "./FolderList.style";
import React, { useEffect, useState } from "react";
import {
  View,
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
import { colors } from "@/constants/Colors";

type RootStackParamList = {
  AudioList: { fileId: number };
};

export type NavigationProp = StackNavigationProp<
  RootStackParamList,
  "AudioList"
>;

export interface FileItem {
  id: string; // id artık string olarak tutuluyor
  name: string;
}

interface FolderListProps {
  navigation: NavigationProp;
}

const FolderList: React.FC<FolderListProps> = ({ navigation }) => {
  const [fileList, setFileList] = useState<FileItem[]>([]);
  const [newFileName, setNewFileName] = useState<string>("");

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const dbRef = firebase.firestore().collection("files");

    try {
      const snapshot = await dbRef.get();
      const filesData: FileItem[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as { name: string };
        filesData.push({
          id: doc.id, // Firestore ID'sini burada alıyoruz (string)
          name: data.name,
        });
      });

      // Alfabetik sıraya göre sıralama
      filesData.sort((a, b) => a.name.localeCompare(b.name));
      setFileList(filesData);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const addFile = async () => {
    if (!newFileName.trim()) {
      Alert.alert("Dosya ismini girin.");
      return;
    }

    const dbRef = firebase.firestore().collection("files");
    const newFile = { name: newFileName };

    try {
      const docRef = await dbRef.add(newFile);
      setFileList((prev) => [
        ...prev,
        { id: docRef.id, name: newFileName }, // Yeni belge için ID'yi alıyoruz
      ]);
      setNewFileName(""); // Input'u temizle
    } catch (error) {
      console.error("Error adding file:", error);
    }
  };

  const deleteFile = async (fileId: string) => {
    const dbRef = firebase.firestore().collection("files").doc(fileId);

    Alert.alert("Dosyayı Sil", "Bu dosyayı silmek istediğinize emin misiniz?", [
      { text: "Hayır", style: "cancel" },
      {
        text: "Evet",
        onPress: async () => {
          try {
            await dbRef.delete(); // Belgeyi sil
            setFileList((prev) => prev.filter((file) => file.id !== fileId)); // Ekrandan kaldır
          } catch (error) {
            console.error("Error deleting file:", error);
          }
        },
      },
    ]);
  };

  const renderFile = ({ item }: { item: FileItem }) => (
    <View style={styles.fileItem}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("AudioList", { fileId: Number(item.id) })
        }
      >
        <Image
          source={require("@/assets/images/folder.png")}
          style={styles.fileImage}
        />
        <Text style={styles.fileName}>{item.name}</Text>
      </TouchableOpacity>
      <Button
        title="Sil"
        onPress={() => deleteFile(item.id)}
        color={colors.danger}
      />
    </View>
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
        value={newFileName}
        onChangeText={setNewFileName}
      />
      <TouchableOpacity onPress={addFile}>
        <Text style={styles.addFileButton}>Dosya Ekle</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {fileList.map((item) => renderFile({ item }))}
      </ScrollView>
    </View>
  );
};

export default FolderList;
