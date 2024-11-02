import { StyleSheet } from "react-native";

import { colors } from "../../../../constants/Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkestbrown,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 40,
    margin: 10,
  },
  logo: {
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 40,
    width:200,
    height:200,
    objectFit:"contain"
    
  },
});
