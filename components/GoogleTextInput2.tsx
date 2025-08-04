import Constants from "expo-constants";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import "react-native-get-random-values";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GoogleTextInput2 = ({ handlePress, icon, containerStyle }: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = Constants.expoConfig?.extra?.GOOGLE_PLACES_API_KEY;
  console.log("Google Places API Key:", apiKey);

  if (!apiKey) {
    return <Text>Search disabled: missing API key</Text>;
  }

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search for a location"
        fetchDetails={true}
        minLength={2}
        debounce={300}
        query={{ key: apiKey, language: "en" }}
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
        styles={{
          textInput: {
            fontSize: 16,
            padding: 10,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#ccc",
          },
        }}
        predefinedPlaces={[]}
        textInputProps={{
          onFocus: () => setIsLoading(true),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});

export default GoogleTextInput2;
