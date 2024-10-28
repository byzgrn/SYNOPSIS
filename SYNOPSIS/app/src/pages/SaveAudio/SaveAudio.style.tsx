import { StyleSheet} from "react-native";

import {colors} from "../../../../constants/Colors";


export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.brown,
    alignItems:'center',
    justifyContent:'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
})