import GoogleTextInput2 from "@/components/GoogleTextInput2";
import { icons } from "@/constants";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//console.log("API Key in Profile:", googlePlacesApiKey);

const Profile = () => {
  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    //setDestinationLocation(location);
    console.log("Destination selected:", location);

    //router.push("/(root)/find-ride");
  };
  return (
    <SafeAreaView>
      <Text>Profile</Text>
      <View style={{ zIndex: 100 }}>
        <GoogleTextInput2
          icon={icons.search}
          containerStyle="bg-white shadow-md shadow-neutral-300"
          handlePress={handleDestinationPress}
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
