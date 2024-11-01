import { colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.darkestbrown,
  },
  logo: {
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 40,
  },
  scrollContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileItem: {
    alignItems: "center",
    margin: 10,
  },
  fileImage: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
  fileName: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    backgroundColor: colors.dark,
    padding: 5,
    borderRadius: 5,
  },
  addFileButton: {
    backgroundColor: colors.brown,
    color: colors.dark,
    height: 40,
    paddingHorizontal: 43,
    paddingTop: 10,
    alignSelf: "center",
  },
  input: {
    height: 40,
    borderColor: colors.darkestbrown,
    backgroundColor: colors.grayish,
    paddingHorizontal: 30,
    alignSelf: "center",
  },
});
