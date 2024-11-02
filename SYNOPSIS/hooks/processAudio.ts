import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

import {firebase} from '../app/src/firebase';

import { GoogleGenerativeAI } from "@google/generative-ai";



const genAI = new GoogleGenerativeAI("");


const processAudio = (fileName:string, folderName:string | any) => {
  const userId = firebase.auth().currentUser?.uid;
  const folder = `userAudioRecordings/${userId}/${folderName}`;
  if(fileName === 'No Sound') return {
    process: () => {}
  };


  const storageRef = firebase.storage().ref();
  const fileRef = storageRef.child(`${folder}/${fileName}`);
  const [sound, setSound] = useState<any>();
  const [base64Audio, setBase64Audio] = useState<any>('');

  async function process() {
    try {
      const downloadURL = await fileRef.getDownloadURL();
      const response = await fetch(downloadURL);
    const blob = await response.blob();
    
    
    const base64String = await blobToBase64(blob);
    setBase64Audio(base64String);
      
      const {sound} = await Audio.Sound.createAsync(
        { uri: downloadURL}
      );
      setSound(sound);


const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});


const result = await model.generateContent([
    {
      inlineData: {
        mimeType: "audio/mp3",
        data: base64Audio
      }
    },
    { text: "Please summarize the audio." },
  ]);


console.log(result.response.text())


    } catch (error) {
      console.log('Error processing sound:', error);
    }
  }

  const blobToBase64 = (blob:Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]); 
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob); 
    });
  };

  return {
    process
  };
};

export default processAudio;