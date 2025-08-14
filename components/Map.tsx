import { icons } from "@/constants";
import { calculateRegion, generateMarkersFromData } from "@/lib/map";
import { useDriverStore, useLocationStore } from "@/store";
import { MarkerData } from "@/types/type";
import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

// const directionsAPI = process.env.EXPO_PUBLIC_DIRECTIONS_API_KEY;
const directionsAPI = Constants.expoConfig?.extra?.GOOGLE_PLACES_API_KEY;
console.log("Directions API Key:", directionsAPI);

const Map = (map: any) => {
  const {
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();
  const { drivers, selectedDriver, loading, error, setDrivers, fetchDrivers } =
    useDriverStore();
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  useEffect(() => {
    console.log("🗺️ MapView mounted!");
    if (drivers.length === 0) {
      fetchDrivers();
    }
  }, []);

  useEffect(() => {
    if (!userLatitude || !userLongitude || drivers.length === 0) return;

    const newMarkers = generateMarkersFromData({
      data: drivers,
      userLatitude,
      userLongitude,
    });

    setMarkers(newMarkers);
  }, [drivers, userLatitude, userLongitude]);

  // useEffect(() => {
  //   if (
  //     markers.length > 0 &&
  //     destinationLatitude !== undefined &&
  //     destinationLongitude !== undefined
  //   ) {
  //     calculateDriverTimes({
  //       markers,
  //       userLatitude,
  //       userLongitude,
  //       destinationLatitude,
  //       destinationLongitude,
  //     }).then((drivers: any) => {
  //       setDrivers(drivers as MarkerData[]);
  //     });
  //   }
  // }, [markers, destinationLatitude, destinationLongitude]);

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  if (loading || (!userLatitude && !userLongitude))
    return (
      <View className="flex justify-between items-center w-full">
        <ActivityIndicator size="small" color="#000" />
      </View>
    );

  if (error)
    return (
      <View className="flex justify-between items-center w-full">
        <Text>Error: {error}</Text>
      </View>
    );

  return (
    <>
      <MapView
        key={map}
        className="w-full h-full rounded-2xl"
        provider={PROVIDER_DEFAULT}
        style={{ width: "100%", height: "100%" }}
        tintColor="black"
        mapType="mutedStandard"
        //showsPointsOfInterest={false}
        // initialRegion={region}
        region={region}
        showsUserLocation={true}
        userInterfaceStyle="light"
      >
        {userLatitude && userLongitude && (
          <Marker
            coordinate={{
              latitude: userLatitude,
              longitude: userLongitude,
            }}
            title="Your Location"
            image={icons.pin}
          />
        )}
        {markers.map((marker, index) => (
          <Marker
            key={`marker-${marker.id}-${index}`}
            // key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            image={
              selectedDriver === +marker.id
                ? icons.selectedMarker
                : icons.marker
            }
          />
        ))}
        {destinationLatitude && destinationLongitude && (
          <>
            <Marker
              key="destination"
              coordinate={{
                latitude: destinationLatitude,
                longitude: destinationLongitude,
              }}
              title="Destination"
              image={icons.pin}
            />
            <MapViewDirections
              origin={{
                latitude: userLatitude!,
                longitude: userLongitude!,
              }}
              destination={{
                latitude: destinationLatitude,
                longitude: destinationLongitude,
              }}
              apikey={directionsAPI!}
              strokeColor="#0286FF"
              strokeWidth={2}
            />
          </>
        )}
      </MapView>
    </>
  );
};

export default Map;
