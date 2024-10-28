import { useEffect, useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { firebase } from '../app/src/firebase';
import config from "../app/config.json";

const useAudioUploader = () => { 

  const [selectedFile, setSelectedFile] = useState<any>(null); 
  const [uploadProgress, setUploadProgress] = useState(0); 
  const [uploadError, setUploadError] = useState<any>(null);
  const [uri, setUri] = useState<any>(null); 
  const [fileRef, setFileRef] = useState<any>(null); 
  const [metadata, setMetadata] = useState<any>(null); 
  const [userId, setUserId] = useState<string>();
  const [fileName, setFileName] = useState<any>(null);

  const {ipAddress} = config;

 const FLASK_API_BACKEND = `http://${ipAddress}:3000/audio`; 

  useEffect(() => {
    if (uri) { 
      fetchFile();
    }

  }, [uri, fileRef, metadata, userId]); 

  
  const selectFile = async () => {
    try {
      const type: string = 'audio/*';
      const file = await DocumentPicker.getDocumentAsync({ type }); 
      console.log("this is");
      console.log(file);
     
      if (file.canceled) {
        console.log('File selection canceled');
      } else {
        setSelectedFile(file);
        setUri(file.assets[0].uri);
      }
      
    } catch (error) {
      console.log(error); 
    }
  };


  const fetchFile = async () => { 
    
    try {
      const response = await fetch(uri); 
      const blob = await response.blob(); 
      const uploadTask = fileRef.put(blob, metadata); 

      uploadTask.on('state_changed', 
        (snapshot:any) => { 
          
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress); 
        },
        (error:Error) => { 
          setUploadError(error.message); 
          console.error(error); 
        },
        async () => { 
          const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
          setSelectedFile(null); 
          setUploadProgress(0);
          console.log('File uploaded to Firebase storage:', downloadUrl); 
          console.log('File uploaded successfully'); 
          try {
            console.log("downloadUrl: " + downloadUrl);
            var obj = {
              parameter: downloadUrl.toString(),
              userID: userId,
              completitionTime: fileName
            };
            const response =  await fetch(FLASK_API_BACKEND, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(obj), 
            });

            if (response.ok) {
              console.log('Request successful');
            } else {
              console.error('Request failed:', response.status);
            }
            console.log("RESPONSE : " + JSON.stringify(response))
          } catch (err) {
            console.error(err);
          }
        }
      );
    } catch (error) {
      console.log(error); 
    }
  }

  interface FetchParams {
    audioURI?: string | null; 
    folder: string;
    fileName: string;
    userId: string | undefined; 
  }

 
  const uploadFile = async ({ audioURI, folder, fileName, userId }:FetchParams) => {

    console.log(audioURI);
    console.log(folder);
    console.log(fileName);
    console.log(userId);

    try {
      const storageRef = firebase.storage().ref(); // firebase storage ref
      console.log(storageRef);
       
      const fileRef_ = storageRef.child(`${folder}/${fileName}.mp3`); 
      console.log(fileRef_);
      setUserId(userId);
      setFileName(fileName);
      setFileRef(fileRef_) 
      if (!selectedFile && !!audioURI) { 
        setUri(audioURI); 
      }

      const metadata_ = { 
        contentType: 'audio/mp3'
      };
      setMetadata(metadata_);

    } catch (error) {
      setUploadError(error);
      console.log(error);
      
    }

  };
  return { 
    selectedFile,
    uploadProgress,
    uploadError,
    selectFile,
    uploadFile,
  };
};

export default useAudioUploader;