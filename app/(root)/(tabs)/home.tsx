import { SignOutButton } from "@/components/SignOutButton";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView className="bg-general-500">
      <Text>Home</Text>
      <SignOutButton />
    </SafeAreaView>
  );
};

export default Home;
