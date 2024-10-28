import React, {useState} from 'react';
import { TextInput, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import {colors} from '../../constants/Colors';
import styles from './Input.style';

export type InputProps = {
    placeholder: string;
    onChangeText: (text: string) => void;
    value: string;
    icon?: keyof typeof Icon.glyphMap;
    isPasswordHidden?: boolean;
}

const Input = ({ placeholder, onChangeText, value, icon, isPasswordHidden }: InputProps) => {
    const [showPassword, setShowPassword] = useState(isPasswordHidden); 
    return (
        <View style={styles.container}> 
            <TextInput style={styles.input} placeholderTextColor={colors.darkestbrown} placeholder={placeholder} onChangeText={onChangeText} value={value} secureTextEntry={showPassword} />
            <Icon name={icon} size={25} color={colors.darkestbrown} onPress={() => {isPasswordHidden ? setShowPassword(!showPassword) : null}}/>
        </View>
    )
}

export default Input;