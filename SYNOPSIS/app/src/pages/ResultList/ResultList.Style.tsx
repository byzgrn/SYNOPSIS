import { StyleSheet } from "react-native";
import { colors } from "../../../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.darkbrown,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop:20 ,
    marginLeft:0,
    color:colors.dark,
    textDecorationLine:'underline'
  },
  resultCard: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.grayish,
    marginBottom: 10,
  },
  resultDate: {
    fontSize: 16,
  },
  resultFileName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  logo: {
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 40,
    width: 200,
    height: 200,
    objectFit: "contain",
  },
});

export default styles;
