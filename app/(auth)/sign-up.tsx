import {View, Text, Alert} from 'react-native'
import React, {useState} from 'react'
import {Link, router} from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {createUser} from "@/lib/appwrite";

const SignUp = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    })
    const submit = async () => {
        const {name, email, password} = form;
        if(!name || !email || !password) return Alert.alert('Error','Please Insert Name, Email and Password')

        setIsSubmitting(true);
        try {
            // write appwrite logic

            await createUser({name, email, password});
            router.push('/')
        }catch (error:any) {
            Alert.alert('Error', error.message)
        }finally {
            setIsSubmitting(false);
        }
    }
    return (
        <View className={'gap-10 bg-white rounded-lg p-5 mt-5'}>

            <CustomInput
                placeholder={"Enter your Full Name"}
                label={"Full Name"}
                secureTextEntry={false}
                value={form.name}
                onChangeText={(text)=> setForm((prev)=> ({...prev, name: text}))}
            />
            <CustomInput
                placeholder={"Enter your email"}
                label={"Email"}
                secureTextEntry={false}
                keyboardType={"email-address"}
                value={form.email}
                onChangeText={(text)=> setForm((prev)=> ({...prev, email: text}))}
            />
            <CustomInput
                placeholder={"Enter your Password"}
                label={"Password"}
                secureTextEntry={false}
                value={form.password}
                onChangeText={(text)=> setForm((prev)=> ({...prev, password: text}))}
            />
            <CustomButton
                title={'Sign Up'}
                onPress={submit}
                isLoading={isSubmitting}
            />
            <View className={'flex justify-center mt-5 flex-row gap-2'}>
                <Text className={'base-regular text-gray-100'}>
                    Already have an account?
                </Text>
                <Link href={'/sign-in'} className={'base-bold text-primary'}> Sign In</Link>
            </View>
        </View>
    )
}
export default SignUp
