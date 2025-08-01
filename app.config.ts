import { ConfigContext, ExpoConfig } from "@expo/config";
import * as dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config();

const googleKey: string = process.env.GOOGLE_MAPS_API_KEY || "";

// Ensure that the GOOGLE_MAPS_API_KEY is set
if (!process.env.GOOGLE_MAPS_API_KEY) {
  throw new Error("Missing GOOGLE_MAPS_API_KEY in .env file");
}

export default ({ config }: ConfigContext): ExpoConfig => ({
  name: "Ryde", // required
  slug: "uber-clone", // required
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon1.png",
  scheme: "uberclone",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,

  web: {
    bundler: "metro",
    output: "server",
    favicon: "./assets/images/favicon.png",
  },

  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: "https://uber.com/",
    },
    eas: {
      projectId: "aaa3379f-2976-43bd-aa87-e6ca215026d0",
    },
  },

  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon1.png",
      backgroundColor: "#ffffff",
    },
    edgeToEdgeEnabled: true,
    package: "com.devcrew.uberclone",
    config: {
      googleMaps: {
        apiKey: googleKey,
      },
    },
  },
  ios: {
    supportsTablet: true,
    config: {
      googleMapsApiKey: googleKey,
    },
  },
  plugins: [
    [
      "expo-router",
      {
        origin: "https://uber.com/",
      },
    ],
    "expo-build-properties",
    [
      "react-native-maps",
      {
        androidGoogleMapsApiKey: googleKey,
        iosGoogleMapsApiKey: googleKey,
      },
    ],
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
    ],
    "expo-secure-store",
  ],
});
