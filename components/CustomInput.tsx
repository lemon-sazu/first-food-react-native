import {View, Text, TextInput} from 'react-native'
import React, {useState} from 'react'
import {CustomInputProps} from "@/lib/type";
import cn from "clsx";

const CustomInput = ({
    placeholder="",
    value,
    onChangeText,
    label,
    secureTextEntry,
    keyboardType="default"
}:CustomInputProps) => {
    const [IsFocused, setIsFocused] = useState(false);
    return (
        <View className={'w-full'}>
            <Text className={'label'}>{label}</Text>
            <TextInput
            autoCapitalize={"none"}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn('input', IsFocused? 'border-primary': 'border-gray-300')}
            />
        </View>
    )
}
export default CustomInput
