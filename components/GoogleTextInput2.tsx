import Constants from "expo-constants";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GoogleTextInput2 = ({ handlePress, icon, containerStyle }: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = Constants.expoConfig?.extra?.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return <Text>Search disabled: missing API key</Text>;
  }

  return (
    <View style={[styles.container]}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
          key: apiKey,
          language: "en",
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
