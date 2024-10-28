import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import styles from './AudioCard.style';
import {colors} from "../../constants/Colors";
import {firebase} from "../../app/src/firebase";
import playSound from '../../hooks/playSound';

export type Audio = {
  audioNo: number;
  key: string;
  name: string;
  contentType: string;
}

type AudioCardProps = {
  audio: Audio; 
}

const AudioCard = ({audio}:AudioCardProps) => {
  const userId = firebase.auth().currentUser?.uid;
    const folder = `userAudioRecordings/${userId}`;

    const {
        play,
        stop,
        isPlaying,

    } = playSound(audio.name);

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
        console.log("hereee");
        console.log(audio.name);
        console.log(audioRef);
        audioRef.delete()
        .then(() => {
          console.log('Audio file deleted successfully!');
        })
        .catch((error: Error) => {
          console.log('Error deleting audio file:', error.message);
        });
    }


    return(
        <TouchableOpacity  onPress={handleSoundPlay}>
            <View style={styles.square} >
            
                <View style={styles.inner_container}>        
                    <Text style={styles.title} >{audio.name}</Text>                   
                </View>
                <View style={styles.buttonsLocation}>                                                   
                    <FontAwesome.Button style={styles.buttonContainer} name='trash' size={20} backgroundColor={colors.danger} onPress={deleteAudio}/>
                </View>             
                
            </View>
        </TouchableOpacity>
    )
}

export default AudioCard;