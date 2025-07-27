import RideCard from "@/components/RideCard";
import { SignOutButton } from "@/components/SignOutButton";
import { images } from "@/constants";
import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const blankData: any = [];

const Home = () => {
  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        //data={recentRides?.slice(0, 5)}
        data={blankData}
        renderItem={({ item }) => <RideCard ride={item} />}
        keyExtractor={(item, index) => index.toString()}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {/* {!loading ? ( */}
            <>
              <Image
                source={images.noResult}
                className="w-40 h-40"
                alt="No recent rides found"
                resizeMode="contain"
              />
              <Text className="text-sm">No recent rides found</Text>
            </>
            {/* ) : (
              <ActivityIndicator size="small" color="#000" />
            )} */}
          </View>
        )}
        ListFooterComponent={
          <View className="px-5 py-10 h-screen">
            <Text>Home</Text>
            <SignOutButton />
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Home;
