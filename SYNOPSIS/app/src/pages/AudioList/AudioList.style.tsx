import { StyleSheet } from "react-native";

import {colors} from "../../../../constants/Colors";


export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.brown,
    },
    buttonContainer: {
      flexDirection: 'row',
     justifyContent:'flex-end',
      marginTop: 40,
      margin: 10,
  }
  });