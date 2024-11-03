import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import {firebase} from "../../app/src/firebase";
import styles from './Folder.style';
import {colors} from "../../constants/Colors";
import React from 'react';

  
  type RootStackParamList = {
    AudioList: { folderName: string | null };
  };

  type FolderProps = {
    folderName: string; 
    navigation : StackNavigationProp<RootStackParamList, 'AudioList'>;
  }


const Folder = ({folderName, navigation}:FolderProps) => {
    const userId = firebase.auth().currentUser?.uid;

    function navigateToAudioList() {
        navigation.navigate('AudioList', {folderName:folderName});
    }

    function deleteFolder() {
        const folderRef = firebase.storage().ref().child(`userAudioRecordings/${userId}/${folderName}`);
        Alert.alert("Dosyayı Sil", "Bu dosyayı silmek istediğinize emin misiniz?", [
            { text: "Hayır", style: "cancel" },
            {
              text: "Evet",
              onPress: async () => {
                
                const folderContents = await folderRef.listAll();
    
                const deletePromises = folderContents.items.map((itemRef) => {
                  return itemRef.delete();
                });
            
                await Promise.all(deletePromises)
                    .then(() => {
                      console.log('Folder deleted successfully!');
                    })
                    .catch((error: Error) => {
                      console.log('Error deleting folder:', error.message);
                    });
               
              },
            },
          ]);
        
    }

return(
    <TouchableOpacity  onPress={navigateToAudioList}>
        <View style={styles.square} >
        <View style={styles.inner_container}> 
        <Icon name="folder-open" size={25} color={colors.grayish}/>      
            <Text style={styles.title} >{folderName}</Text>                   
        </View>
        <View style={styles.buttonsLocation}>                                                   
            <FontAwesome.Button style={styles.buttonContainer} name='trash' size={20} backgroundColor={colors.danger} onPress={deleteFolder}/>
        </View>              
        
        </View>
    </TouchableOpacity>
)
}
export default Folder;