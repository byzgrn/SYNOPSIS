import { StyleSheet } from "react-native";

import {colors} from '../../constants/Colors';

const base_style = StyleSheet.create({
    container: {
        padding: 8,
        margin: 10,
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
    },
    button_container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 17,

    },
});

export default {
    primary: StyleSheet.create({
        ...base_style,
        container: {
            ...base_style.container,
            backgroundColor: colors.darkestbrown, 
            borderColor: colors.grayish,

        },
        title: {
            ...base_style.title,
            color: colors.grayish, 
        },
    }),

    secondary: StyleSheet.create({
        ...base_style,
        container: {
            ...base_style.container,
            backgroundColor: colors.grayish, 
            borderColor: colors.darkestbrown,

        },
        title: {
            ...base_style.title,
            color: colors.darkestbrown,
        },
    }),


    little: StyleSheet.create({
        ...base_style,
        container: {
            ...base_style.container,
            paddingVertical:5,
            paddingHorizontal:10,
            margin: 5,
            backgroundColor: colors.grayish,
            borderColor: colors.darkestbrown,

        },
        title: {
            ...base_style.title,
            color: colors.darkestbrown,
        },
    }),

}