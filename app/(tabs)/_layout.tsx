import {View, Text} from 'react-native'
import React from 'react'
import {Redirect, Slot} from "expo-router";

const _Layout = () => {
    const isAuthenticated = true;
    if (!isAuthenticated) return <Redirect href={'/sign-in'} />
    return <Slot/>
}
export default _Layout
