import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, ScrollView } from "react-native";
import { firebase } from "../../firebase";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import styles from "./Result.style";

type RootStackParamList = {
  ResultCard: { audioFileName: string; audioUrl: string };
};

type ResultCardRouteProp = RouteProp<RootStackParamList, "ResultCard">;

interface ResultData {
  id: string;
  text: string;
  date: firebase.firestore.Timestamp;
  audioFileName: string;
  audioUrl: string;
}

const Result: React.FC = () => {
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const navigation = useNavigation();
  const route = useRoute<ResultCardRouteProp>();

  const { audioFileName, audioUrl } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const querySnapshot = await db
        .collection("records")
        .where("audioUrl", "==", audioUrl)
        .limit(1)
        .get();

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        setResultData(doc.data() as ResultData);
      } else {
        console.log("No data found for this audio file and folder.");
      }
    };

    fetchData();
  }, [audioFileName, audioUrl]);

  if (!resultData) {
    return <Text>Loading...</Text>;
  }

  const { text, date } = resultData;
  const formattedDate = date.toDate().toDateString();

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/SYNOPSISLogo.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Result for {audioFileName}</Text>
      <Text style={styles.date}>Date: {formattedDate}</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.result}>{text}</Text>
      </ScrollView>
    </View>
  );
};

export default Result;
