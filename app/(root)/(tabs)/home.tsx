import RideCard from "@/components/RideCard";
import { SignOutButton } from "@/components/SignOutButton";
import { recentRides } from "@/data/rides";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        data={recentRides?.slice(0, 5)}
        renderItem={({ item }) => <RideCard ride={item} />}
        keyExtractor={(item, index) => index.toString()}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListFooterComponent={
          <View className="px-5 py-10">
            <Text>Home</Text>
            <SignOutButton />
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Home;
