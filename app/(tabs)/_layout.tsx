import React from "react";
import { Redirect, Slot, Tabs } from "expo-router";
import useAuthStore from "@/store/auth.store";
import { TabBarIconProps } from "@/lib/type";
import { Image, Text, View } from "react-native";
import { images } from "@/constants";
import cn from "clsx";

const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => (
  <View className={"tab-icon"}>
    <Image
      source={icon}
      className="size-7"
      resizeMode={"contain"}
      tintColor={focused ? "#FE8C00" : "#5D5F6D"}
    />
    <Text
      className={cn(
        "test-sm font-bold",
        focused ? "text-primary" : "text-gray-200",
      )}
      style={{ color: focused ? "#FE8C00" : "#5D5F6D" }}
    >
      {title}
    </Text>
  </View>
);
const _Layout = () => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Redirect href={"/sign-in"} />;
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopRightRadius: 50,
          borderTopLeftRadius: 50,
          borderBottomRightRadius: 50,
          borderBottomLeftRadius: 50,
          marginHorizontal: 20,
          height: 80,
          position: "absolute",
          backgroundColor: "#f2f2f2",
          shadowColor: "#1a1a1a",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={images.home} title={"Home"} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              icon={images.search}
              title={"Search"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={images.bag} title={"Cart"} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              icon={images.person}
              title={"Profile"}
            />
          ),
        }}
      />
    </Tabs>
  );
};
export default _Layout;
