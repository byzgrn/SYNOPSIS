import React, { useEffect, useState} from 'react';
import { View } from 'react-native';
import { Audio } from 'expo-av';

import { StackNavigationProp } from '@react-navigation/stack';


import styles from './SaveAudio.style';
import useAudioUploader from '../../../../hooks/useAudioUploader';
import { firebase } from '../../firebase';
import Button from '../../../../components/Button';
import { RouteProp } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {colors} from '@/constants/Colors';

type RootStackParamList = {
  SaveAudio: { folderName: string | null };
  AudioList: { folderName: string | null };

};

type FolderRouteProp = RouteProp<RootStackParamList, 'SaveAudio'>;

export type Props = {
  navigation : StackNavigationProp<RootStackParamList, 'AudioList'>;
  route: FolderRouteProp;
}

const SaveAudio = ({route, navigation}:Props) => { 
  const { folderName } = route.params;
  function navigateToAudioScreen() {
    navigation.navigate('AudioList', {folderName: folderName});
  }

  const [recording, setRecording] = useState<any>(); 
  const [recordEndedSuccessfully, setRecordEndedSuccessfully] = useState(false); 
  const [recordContinues, setRecordingContinues] = useState<boolean>(); 
  const [recordingContent, setRecordingContent] = useState<any>([]); 
  const [audioURI, setAudioURI] = useState(null);
  const [audioName, setAudioName] = useState<any>(null);

  const [index, setIndex] = useState(0);
  const [showIcons, setShowIcons] = useState(true);
  const [color, setColor] = useState([colors.darkestbrown, colors.brown]) // Track visibility of icons

  useEffect(() => {
    const interval = setInterval(() => {
      if (showIcons) {
        if (index < 3) {
          setIndex((prevIndex) => prevIndex + 1); 
        } else {
          setShowIcons(false); 
        }
      } else {
        setIndex(0);
        setColor([color[1], color[0]])
        setShowIcons(true); 
        
      }
    }, 800);

    return () => clearInterval(interval); 
  }, [index, showIcons]);



  const userId = firebase.auth().currentUser?.uid;


  const folder =  `userAudioRecordings/${userId}/${folderName}`; 


  const { 
    uploadFile, 
  } = useAudioUploader(); 




  function getDateAndTime() { 
    const currentDate = new Date(); 
    const currentYear = currentDate.getFullYear(); 
    const currentMonth = currentDate.getMonth() + 1; 
    const currentDay = currentDate.getDate(); 
    const currentHour = currentDate.getHours(); 
    const currentMinute = currentDate.getMinutes(); 
    const currentSecond = currentDate.getSeconds(); 

    return currentDay + "." + currentMonth + "." + currentYear + "-" + currentHour + "." + currentMinute + "." + currentSecond
  }


  async function startRecording() { 
    try {

      setRecordingContinues(true); 

      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );

        setRecording(recording); 


      } 
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }



  async function completeRecording() { 
    setRecordEndedSuccessfully(true); 
    stopRecording(); 
  }

  async function stopRecording() { 
    try {
        setRecordingContinues(false); 

        await recording.stopAndUnloadAsync();


        const { sound, status } = await recording.createNewLoadedSoundAsync();

        

        setAudioURI(recording.getURI()); 
        setAudioName(getDateAndTime()); 
        setRecordingContent({
          sound: sound,
          duration: status.durationMillis / 1000, 
          file: recording.getURI()
        });
        setRecording(null); 


      }
       catch (error) {
      console.error('Failed to stop recording:', error);
    }
  }

  return (
    <View style={styles.container}>  
       
      {recordContinues ? 
      <>
      <View style={styles.buttonContainer}>
      {Array.from({ length: 4 }).map((_, idx) => (
      <Icon key={idx} name='circle'  size={25} color={idx < index ? color[0] : color[1]}/>))}
      </View>
        <View style={styles.buttonContainer}>
          <Button onPress={completeRecording} text={'Stop Recording'}></Button>
        </View>
        </>
        : 
        <View style={styles.row}>
          {recordEndedSuccessfully ? 
            <>
              <Button theme='little' onPress={() => recordingContent.sound.replayAsync()} text="Play"></Button>
                <Button theme='little' onPress={() =>

                  uploadFile({ audioURI: audioURI, folder: folder, fileName: audioName, userId: userId })
                    .then((downloadUrl) => {
                   
                      console.log('Upload successful, download URL:', downloadUrl);
                    })
                    .catch((error) => {
                      console.error('Error uploading file:', error);
                     
                    }).finally(() => {
                      navigateToAudioScreen();
                    })
                    

                } text="Save"></Button>
              
               </>
            : 
            <View style={styles.buttonContainer}>
              <Button onPress={startRecording} text={'Start Recording'}></Button>
            </View> }
        </View>


      }

    </View>
  );
};

export default SaveAudio;