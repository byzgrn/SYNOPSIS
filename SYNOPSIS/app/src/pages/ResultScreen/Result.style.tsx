import { colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: colors.darkestbrown,
  },
  logo: {
    marginBottom: 20,
    width: 200,
    height: 200,
    objectFit: "contain",
    backgroundColor: colors.darkestbrown,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.dark,
  },
  date: {
    fontSize: 16,
    color: colors.grayish,
  },
  result: {
    marginVertical: 16,
    fontSize: 18,
    color: colors.dark,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 5,
    zIndex: 1,
  },
  backButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
  },
});
