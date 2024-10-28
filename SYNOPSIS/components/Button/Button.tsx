import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from './Button.style';

export type ButtonProps = {
    text: string;
    onPress: () => void | Promise<void> ;
    loading?: boolean;
    theme?: 'primary' | 'secondary' | 'little';
}

const Button = ({ text, onPress, loading, theme = 'primary' }:ButtonProps) => { 
    return (
        <TouchableOpacity style={styles[theme].container} onPress={onPress} disabled={loading}>
                <View style={styles[theme].button_container}>
                    <Text style={styles[theme].title}>{text}</Text>
                </View>
        </TouchableOpacity>
    );
}

export default Button;