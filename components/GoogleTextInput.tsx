import { icons } from "@/constants";
import { GoogleInputProps } from "@/types/type";
import Constants from "expo-constants";
import { useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import "react-native-get-random-values";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const googlePlacesApiKey = Constants.expoConfig?.extra?.GOOGLE_PLACES_API_KEY;

//const googlePlacesApiKey = process.env.GOOGLE_MAPS_API_KEY;
console.log("Google Places API Key:", googlePlacesApiKey);

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle}`}
    >
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder="Search"
        debounce={300} // ✅ must be a number
        minLength={2} // ✅ must be a number
        timeout={10000} // ✅ must be a number
        styles={{
          textInputContainer: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            marginHorizontal: 20,
            position: "relative",
            shadowColor: "#d4d4d4",
          },
          textInput: {
            backgroundColor: textInputBackgroundColor
              ? textInputBackgroundColor
              : "white",
            fontSize: 16,
            fontWeight: "600",
            marginTop: 5,
            width: "100%",
            borderRadius: 200,
          },
          listView: {
            backgroundColor: textInputBackgroundColor
              ? textInputBackgroundColor
              : "white",
            position: "relative",
            top: 0,
            width: "100%",
            borderRadius: 10,
            shadowColor: "#d4d4d4",
            zIndex: 99,
          },
        }}
        onPress={(data, details = null) => {
          setIsLoading(false);
          console.log("✅ Autocomplete onPress triggered");
          console.log("DATA:", data);
          console.log("DETAILS:", details);

          if (
            typeof details === "object" &&
            details?.geometry?.location &&
            "lat" in details.geometry.location &&
            "lng" in details.geometry.location
          ) {
            handlePress?.({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              address: data.description,
            });
          } else {
            console.warn("⚠️ Missing geometry details in response", details);
          }
        }}
        query={{
          key: googlePlacesApiKey,
          language: "en",
        }}
        GooglePlacesSearchQuery={{
          rankby: "distance",
          radius: 1000, // ✅ required if using 'distance'
        }}
        onFail={(error) => {
          console.warn("❌ Google Places Error:", error);
          setIsLoading(false);
        }}
        onNotFound={() => {
          console.log("🔍 No results found");
          setIsLoading(false);
        }}
        listEmptyComponent={() => (
          <Text style={{ padding: 10 }}>No places found</Text>
        )}
        listLoaderComponent={() => (
          <ActivityIndicator style={{ padding: 10 }} />
        )}
        enablePoweredByContainer={false}
        //nearbyPlacesAPI="none"
        keyboardShouldPersistTaps="handled"
        predefinedPlaces={[]}
        textInputProps={{
          onFocus: () => setIsLoading(true),
          placeholderTextColor: "gray",
          placeholder: initialLocation ?? "Where do you want to go?",
        }}
        renderLeftButton={() => (
          <View className="justify-center items-center w-6 h-6">
            <Image
              source={icon ? icon : icons.search}
              className="w-7 h-7 "
              resizeMode="contain"
            />
          </View>
        )}
      />
    </View>
  );
};

export default GoogleTextInput;
