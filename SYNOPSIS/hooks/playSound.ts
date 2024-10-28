import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

import {firebase} from '../app/src/firebase';

const playSound = (fileName:string) => {
  const userId = firebase.auth().currentUser?.uid;
  const folder = `userAudioRecordings/${userId}`;
  if(fileName === 'No Sound') return {
    play: () => {},
    stop: () => {},
    isPlaying: false
  };


  const storageRef = firebase.storage().ref();
  const fileRef = storageRef.child(`${folder}/${fileName}`);

  const [sound, setSound] = useState<any>();
  const [isPlaying, setIsPlaying] = useState(false);
  async function play() {
    try {
      const downloadURL = await fileRef.getDownloadURL();
      const {sound} = await Audio.Sound.createAsync(
        { uri: downloadURL},
        { shouldPlay: true }
      );
      setSound(sound);
      setIsPlaying(true);
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  }

  async function stop() {
    try {
        await sound.stopAsync();
        setIsPlaying(false);

      
    } catch (error) {
      console.log('Error stopping sound:', error);
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return {
    play,
    stop,
    isPlaying 
  };
};

export default playSound;
