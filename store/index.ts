import { DriverStore, LocationStore, MarkerData } from "@/types/type";
import { create } from "zustand";

type TimestampStore = {
  timestamp: number | null;
  setTimestamp: (value: number) => void;
  reset: () => void;
};

export const useLocationStore = create<LocationStore>((set) => ({
  userLatitude: null,
  userLongitude: null,
  userAddress: null,
  destinationLatitude: null,
  destinationLongitude: null,
  destinationAddress: null,
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      userLatitude: latitude,
      userLongitude: longitude,
      userAddress: address,
    }));

    // if driver is selected and now new location is set, clear the selected driver
    const { selectedDriver, clearSelectedDriver } = useDriverStore.getState();
    if (selectedDriver) clearSelectedDriver();
  },

  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      destinationLatitude: latitude,
      destinationLongitude: longitude,
      destinationAddress: address,
    }));

    // if driver is selected and now new location is set, clear the selected driver
    const { selectedDriver, clearSelectedDriver } = useDriverStore.getState();
    if (selectedDriver) clearSelectedDriver();
  },
}));

export const useDriverStore = create<DriverStore>((set) => ({
  drivers: [] as MarkerData[],
  selectedDriver: null,
  loading: false,
  error: null,
  setSelectedDriver: (driverId: number) =>
    set(() => ({ selectedDriver: driverId })),
  setDrivers: (drivers: MarkerData[]) => set(() => ({ drivers })),
  clearSelectedDriver: () => set(() => ({ selectedDriver: null })),
  fetchDrivers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/(api)/driver");
      const json = await response.json();

      if (json?.data) {
        set({ drivers: json.data, loading: false });
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Driver fetch error:", err);
      set({ error: "Failed to load drivers", loading: false });
    }
  },
}));

export const useTimestampStore = create<TimestampStore>((set) => ({
  timestamp: null,

  setTimestamp: (value) => set({ timestamp: value }),
  reset: () => set({ timestamp: null }),
}));
