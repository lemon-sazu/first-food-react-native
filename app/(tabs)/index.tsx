import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  Touchable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, offers } from "@/constants";
import { Fragment } from "react";
import cn from "clsx";
import CartButton from "@/components/CartButton";
import useAuthStore from "@/store/auth.store";

export default function Home() {
  const { user } = useAuthStore();
  console.log("User: ", JSON.stringify(user, null, 2));
  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={offers}
        keyExtractor={(item) => item.id.toString()} // good practice
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0;
          return (
            <View>
              <Pressable
                className={cn(
                  "offer-card",
                  isEven ? "flex-row-reverse" : "flex-row",
                )}
                style={{ backgroundColor: item.color }}
                android_ripple={{ color: "#fffff22" }}
              >
                {({ pressed }) => (
                  <Fragment>
                    <View className={"h-full w-1/2"}>
                      <Image source={item.image} className="w-full h-full" />
                    </View>
                    <View
                      className={cn(
                        "offer-card__info",
                        isEven ? "pl-10" : "pr-10",
                      )}
                    >
                      <Text className="h1-bold text-white leading-tight">
                        {item.title}
                      </Text>
                      <Image
                        source={images.arrowRight}
                        className="size-10"
                        resizeMode={"contain"}
                        tintColor={"white"}
                      />
                    </View>
                  </Fragment>
                )}
              </Pressable>
            </View>
          );
        }}
        ListHeaderComponent={() => (
          <View className={"flex-between flex-row w-full my-5"}>
            <View className={"flex-start"}>
              <Text className="small-bold text-primary uppercase">
                Deliver To
              </Text>
              <TouchableOpacity
                className={"flex-center flex-row gap-x-1 mt-0.5"}
              >
                <Text className={"paragraph-bold text-dark-100"}>Birampur</Text>
                <Image
                  source={images.arrowDown}
                  className="size-3"
                  resizeMode={"contain"}
                />
              </TouchableOpacity>
            </View>
            <View>
              <CartButton />
            </View>
          </View>
        )}
        contentContainerClassName={"pb-28 px-5"}
      />
    </SafeAreaView>
  );
}
