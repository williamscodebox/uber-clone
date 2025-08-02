import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import RideCard from "@/components/RideCard";
import { SignOutButton } from "@/components/SignOutButton";
import { icons, images } from "@/constants";
import { recentRides } from "@/data/rides";
import { useLocationStore } from "@/store";
import { useAuth, useUser } from "@clerk/clerk-expo";
import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const blankData: any = [];

const Home = () => {
  const [mapKey, setMapKey] = useState(new Date().getTime());
  const { user } = useUser();
  const { signOut } = useAuth();
  // const loading = false; // Placeholder for loading state
  const loading = false; // Placeholder for loading state
  //
  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  const handleSignOut = () => {
    // console.log("Signing out pressed");
    signOut();
    router.replace("/(auth)/sign-in");
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermission(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });
      console.log("Address:", address);

      setUserLocation({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
        //latitude: 37.78825,
        //longitude: -122.4324,
        address: `${address[0].name}, ${address[0].region}`,
      });
    })();
  }, []);

  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    //setDestinationLocation(location);
    console.log("Destination selected:", location);

    //router.push("/(root)/find-ride");
  };
  const test = () => {
    console.log("Test function called");
    if (Platform.OS === "android") {
      setMapKey(new Date().getTime());
      console.log("Map key updated for Android");
    }
  };
  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        data={recentRides?.slice(0, 5)}
        //data={blankData}
        renderItem={({ item }) => <RideCard ride={item} />}
        keyExtractor={(item, index) => index.toString()}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  alt="No recent rides found"
                  resizeMode="contain"
                />
                <Text className="text-sm">No recent rides found</Text>
              </>
            ) : (
              <ActivityIndicator
                className="mt-20 mb-20 pt-10"
                size="large"
                color="#000"
              />
            )}
          </View>
        )}
        ListHeaderComponent={
          <>
            <View className="flex flex-row items-center justify-between my-5">
              <Text className="text-2xl capitalize font-JakartaExtraBold">
                Welcome{" "}
                {user?.firstName ||
                  user?.emailAddresses[0].emailAddress.split("@")[0]}{" "}
                👋
              </Text>
              <TouchableOpacity
                onPress={handleSignOut}
                className="justify-center items-center w-10 h-10 rounded-full bg-white"
              >
                <Image source={icons.out} className="w-4 h-4" />
              </TouchableOpacity>
            </View>

            <GoogleTextInput
              icon={icons.search}
              containerStyle="bg-white shadow-md shadow-neutral-300"
              handlePress={handleDestinationPress}
            />

            <>
              <Text className="text-xl font-JakartaBold mt-5 mb-3">
                Your current location
              </Text>
              <View className="flex flex-row items-center bg-transparent h-[300px]">
                <Map key={mapKey} map={mapKey} />
              </View>
            </>

            <Text className="text-xl font-JakartaBold mt-5 mb-3">
              Recent Rides
            </Text>
          </>
        }
        ListFooterComponent={
          <View className="px-5 py-10 h-screen">
            <Text>Home</Text>
            <SignOutButton />
          </View>
        }
        onScroll={({ nativeEvent }) => {
          const yOffset = nativeEvent.contentOffset.y;
          if (yOffset <= 0) {
            setMapKey(new Date().getTime()); // Re-render the map
            console.log("Scrolled to top, refreshing map");
            test();
          }
        }}
        scrollEventThrottle={16} // Recommended for smoother tracking
      />
    </SafeAreaView>
  );
};

export default Home;
