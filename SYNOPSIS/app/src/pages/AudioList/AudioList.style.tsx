import { StyleSheet } from "react-native";

import { colors } from "../../../../constants/Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkestbrown,
  },
  title: {
    fontWeight:'bold',
    color:colors.grayish,
    marginLeft:5,
    fontSize:20,
    textDecorationLine:'underline'
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
