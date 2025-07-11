import {View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import {images} from "@/constants";

const CartButton = () => {
    const totalItems = 10;
    return (
        <TouchableOpacity className={"cart-btn"} onPress={() => console.log('pressed')}>
            <Image
            source={images.bag}
            className="size-5"
            resizeMode={'contain'}
            />
            {totalItems > 0 && (
                <View className="cart-badge">
                    <Text className="text-xs text-white">{totalItems}</Text>
                </View>
            )}
        </TouchableOpacity>
    )
}
export default CartButton
