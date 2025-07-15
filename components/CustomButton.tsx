import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native'
import React from 'react'
import {CustomButtonProps} from "@/lib/type";
import cn from "clsx";

const CustomButton = ({
    onPress,
    title="Custom Button",
    style,
    textStyle,
    leftIcon,
    isLoading=false
} :CustomButtonProps) => {
    return (
        <TouchableOpacity className={cn('custom-btn', style)} onPress={onPress}>
            {leftIcon && (typeof leftIcon === 'string' ? <Text>{leftIcon}</Text> : leftIcon)}
            <View className={'flex-center flex-row'}>
                {isLoading ? (
                    <ActivityIndicator size={'small'} color={'white'} />
                ) : (
                    <Text className={cn('text-white-100 paragraph-semibold', textStyle)}>{title}</Text>
                )}
            </View>
        </TouchableOpacity>
    )
}
export default CustomButton
