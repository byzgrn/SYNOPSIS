import { StyleSheet} from "react-native";

import {colors} from "../../constants/Colors";


export default StyleSheet.create({
    inner_container: {
        flex: 1,
        padding: 7,
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15,
        color:colors.grayish,
    },
    square: {
        flex:1,
        flexDirection:'row',
        backgroundColor: colors.darkbrown,
        borderColor: colors.darkestbrown,
        borderWidth: 3,
        borderRadius: 10,
        margin: 3,
    },

    buttonsLocation: {
        flexDirection: 'row',
        width: 100,
        justifyContent: 'flex-end',
        alignSelf:'flex-end',
        padding: 3,
    },
    buttonContainer: {
        paddingRight: 0,
    },
  
})