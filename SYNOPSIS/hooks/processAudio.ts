import { useState, useEffect } from "react";
import { Audio } from "expo-av";
import { firebase } from "../app/src/firebase";
import { GoogleGenerativeAI } from "@google/generative-ai";
import config from "../app/config.json";
import { Alert } from "react-native";

const genAI = new GoogleGenerativeAI("");

const useProcessAudio = (fileName: string, folderName: string | any) => {
  const { defaultLanguage } = config;
  const [base64Audio, setBase64Audio] = useState<string>("");
  const userId = firebase.auth().currentUser?.uid;
  const folder = `userAudioRecordings/${userId}/${folderName}`;

  if (fileName === "No Sound") return { process: () => {} };

  useEffect(() => {
    if (!base64Audio) return;

    const processAudioContent = async () => {
      try {
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
        });

        const result = await model.generateContent([
          {
            inlineData: {
              mimeType: "audio/mp3",
              data: base64Audio,
            },
          },
          {
            text:
              "Reply to my questions with exact and strict responses, with no additional information." +
              "if content is not educational or analyzable reply with 'No'" +
              "If content is educational," +
              "What are the main ideas?" +
              "What are the key terms and definitions?" +
              "What are the lecture highlights?" +
              "What are the connections to other concepts and courses?" +
              "What are the assignments and deadlines?" +
              "What is the summary of the lecture topic and what is covered." +
              "Please provide the information clearly and in an organized format, in " +
              defaultLanguage +
              ":\n\nMain ideas:\n- [Specify the main ideas here.]\n\nKey terms and definitions:\n- [Specify the key terms and definitions here.]\n\nLecture highlights:\n- [Specify the lecture highlights here.]\n\nConnections to other concepts, courses, etc.:\n- [Specify the connections to other concepts and courses here.]\n\nAssignments and deadlines:\n- [Specify the assignments and deadlines here.]\n\nSummary of the lecture:\n- [Specify the summary of the lecture and what was covered here.]",
          },
        ]);

        console.log(result.response.text());
        const responseText = await result.response.text();

        if (responseText.trim() === "No") {
          Alert.alert(
            "Bilgilendirme",
            "Yüklenen ses dosyası bir eğitim kaydı değildir."
          );
        } else {
          const downloadURL = await fileRef.getDownloadURL();

          const record = {
            date: new Date(),
            text: responseText,
            audioFileName: fileName,
            audioUrl: downloadURL,
          };

          await firebase.firestore().collection("records").add(record);
          Alert.alert(
            "Başarılı",
            "Sonucunuz oluşturulmuş ve veritabanına kaydedilmiştir."
          );
        }
      } catch (error) {
        console.log("Error processing sound:", error);
      }
    };

    processAudioContent();
  }, [base64Audio]);

  const storageRef = firebase.storage().ref();
  const fileRef = storageRef.child(`${folder}/${fileName}`);

  const process = async () => {
    try {
      const downloadURL = await fileRef.getDownloadURL();
      const response = await fetch(downloadURL);
      const blob = await response.blob();
      const base64String = await blobToBase64(blob);
      setBase64Audio(base64String);
    } catch (error) {
      console.log("Error processing sound:", error);
    }
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        resolve(result.split(",")[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return {
    process,
  };
};

export default useProcessAudio;
