import React, { useState } from "react";
import MapView from "react-native-maps";

// import { useDriverStore, useLocationStore } from "@/store";
import { MarkerData } from "@/types/type";
import { useEffect } from "react";

// const directionsAPI = process.env.EXPO_PUBLIC_DIRECTIONS_API_KEY;

const Map = () => {
  useEffect(() => {
    console.log("🗺️ MapView mounted!");
  }, []);
  // const {
  //   userLongitude,
  //   userLatitude,
  //   destinationLatitude,
  //   destinationLongitude,
  // } = useLocationStore();
  // const { selectedDriver, setDrivers } = useDriverStore();

  // const { data: drivers, loading, error } = useFetch<Driver[]>("/(api)/driver");
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  // useEffect(() => {
  //   if (Array.isArray(drivers)) {
  //     if (!userLatitude || !userLongitude) return;

  //     const newMarkers = generateMarkersFromData({
  //       data: drivers,
  //       userLatitude,
  //       userLongitude,
  //     });

  //     setMarkers(newMarkers);
  //   }
  // }, [drivers, userLatitude, userLongitude]);

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
  //     }).then((drivers) => {
  //       setDrivers(drivers as MarkerData[]);
  //     });
  //   }
  // }, [markers, destinationLatitude, destinationLongitude]);

  // const region = calculateRegion({
  //   userLatitude,
  //   userLongitude,
  //   destinationLatitude,
  //   destinationLongitude,
  // });

  // if (loading || (!userLatitude && !userLongitude))
  //   return (
  //     <View className="flex justify-between items-center w-full">
  //       <ActivityIndicator size="small" color="#000" />
  //     </View>
  //   );

  // if (error)
  //   return (
  //     <View className="flex justify-between items-center w-full">
  //       <Text>Error: {error}</Text>
  //     </View>
  //   );

  return (
    <MapView
      //className="w-full h-full rounded-2xl"
      // provider={PROVIDER_GOOGLE}
      // showsUserLocation={true}
      // showsMyLocationButton={true}
      // showsBuildings={true}
      style={{ width: 200, height: 200 }}
      region={{
        latitude: 43.001,
        longitude: -81.2,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}

      // showsPointsOfInterest={false}
      //initialRegion={region}
      // showsUserLocation={true}
      // userInterfaceStyle="light"
    >
      {/* {markers.map((marker, index) => (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.title}
          image={
            selectedDriver === +marker.id ? icons.selectedMarker : icons.marker
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
      )} */}
    </MapView>
  );
};

export default Map;
