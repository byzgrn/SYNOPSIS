import { StyleSheet } from "react-native";

import { colors } from "../../../../constants/Colors";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.darkbrown,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    padding: 25,
    margin: 20,
    marginTop: 50,
    backgroundColor: colors.brown,
    borderWidth: 2,
    borderColor: colors.grayish,
    borderRadius: 5,
  },
});
