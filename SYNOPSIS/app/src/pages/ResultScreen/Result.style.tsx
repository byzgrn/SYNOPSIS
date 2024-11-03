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
    fontSize: 18,
    color: colors.grayish,
    alignSelf:'flex-start',
    fontWeight:'bold',
    textDecorationLine:'underline',
    marginLeft:-12,
    marginBottom:10
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
  section: {
    marginBottom: 16,
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 8,
    color:colors.grayish
  },
  content: {
    fontSize: 16,
    marginBottom: 4,
    color:colors.dark
  },
});
