/*import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { firebase } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import styles from "./Result.style";
import "firebase/firestore";
import "firebase/storage";

const Result = () => {
  const [resultData, setResultData] = useState<any>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const snapshot = await db.collection("records").get();
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      if (data.length > 0) {
        setResultData(data[0]); // İlk sonucu alıyoruz
      }
    };

    fetchData();
  }, []);

  if (!resultData) {
    return <Text>Loading...</Text>; // Yükleniyor durumu
  }

  const { result, name, date } = resultData;

  // Tarih nesnesini string'e çevirme
  const formattedDate = date?.toDate().toLocaleDateString(); // Eğer date bir Firestore Timestamp ise
  const resultText =
    typeof result === "object" ? JSON.stringify(result) : result; // Sonucu string'e çevirme

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/SYNOPSISLogo.png")} />
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.date}>{formattedDate}</Text>
      <Text style={styles.result}>{resultText}</Text>
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default Result;
*/
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { firebase } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import styles from "./Result.style";
interface ResultData {
  id: string;
  result: string | object;
  name: string;
  date: any; // Firestore Timestamp tipini kullanabilirsiniz
}

const Result: React.FC = () => {
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const snapshot = await db.collection("records").get();
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ResultData[];

      if (data.length > 0) {
        setResultData(data[0]); // İlk sonucu alıyoruz
      }
    };

    fetchData();
  }, []);

  if (!resultData) {
    return <Text>Loading...</Text>; // Yükleniyor durumu
  }

  const { result, name, date } = resultData;

  // Tarih nesnesini string'e çevirme
  const formattedDate = date?.toDate().toLocaleDateString(); // Eğer date bir Firestore Timestamp ise
  const resultText =
    typeof result === "object" ? JSON.stringify(result) : result; // Sonucu string'e çevirme

  return (
    <View style={styles.container}>
      {/* Geri gitme butonu */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Geri</Text>
      </TouchableOpacity>

      {/* Logo */}
      <Image
        source={require("@/assets/images/SYNOPSISLogo.png")}
        style={styles.logo}
      />

      {/* İçerik ScrollView içinde */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.result}>{resultText}</Text>
      </ScrollView>
    </View>
  );
};
export default Result;
