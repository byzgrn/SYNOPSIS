import React from "react";
import { View, FlatList, Text, TouchableOpacity, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { firebase } from "../../firebase";
import styles from "./ResultList.Style";
import ResultCard from "@/components/ResultCard";

type RootStackParamList = {
  ResultList: { audioFileName: string; audioUrl: string };
  Result: { audioFileName: string; audioUrl: string };
};

type ResultListRouteProp = RouteProp<RootStackParamList, "ResultList">;
type ResultListNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Result"
>;

type Props = {
  route: ResultListRouteProp;
  navigation: ResultListNavigationProp;
};

export type ResultItem = {
  id: string;
  date: firebase.firestore.Timestamp;
  audioUrl: string;
  folderName: string;
  text: string;
};

const ResultList: React.FC<Props> = ({ route, navigation }) => {
  const { audioFileName, audioUrl } = route.params;
  const [results, setResults] = React.useState<ResultItem[]>([]);

  React.useEffect(() => {
    fetchResults();
  }, [audioFileName, audioUrl]);

  const fetchResults = async () => {
    try {
      const recordsRef = firebase.firestore().collection("records");
      const snapshot = await recordsRef
        .where("audioUrl", "==", audioUrl)
        .orderBy("date", "desc")
        .get();

      const resultsData: ResultItem[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<ResultItem, "id">),
      }));

      setResults(resultsData);
    } catch (error) {
      console.error("Error fetching results in resultList:", error);
    }
  };

  const renderResult = ({ item }: { item: ResultItem }) => (
    <ResultCard
      audioUrl={audioUrl}
      fileName={audioFileName}
      navigation={navigation}
    />
  );

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/SYNOPSISDarkBrownLogo.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Results for {audioFileName}</Text>
      <FlatList
        keyExtractor={(item) => item.id}
        data={results}
        renderItem={renderResult}
      />
    </View>
  );
};

export default ResultList;
