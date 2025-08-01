import { ConfigContext, ExpoConfig } from "@expo/config";
import * as dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config();

// Ensure that the GOOGLE_MAPS_API_KEY is set
if (!process.env.GOOGLE_MAPS_API_KEY) {
  throw new Error("Missing GOOGLE_MAPS_API_KEY in .env file");
}

export default ({ config }: ConfigContext): ExpoConfig => ({
  name: "Ryde", // required
  slug: "uber-clone", // required
  version: "1.0.0",
  orientation: "portrait",
  android: {
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
    },
  },
  ios: {
    config: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
  },
  plugins: [
    "expo-build-properties",
    [
      "react-native-maps",
      {
        androidGoogleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
        iosGoogleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
    ],
  ],
});
