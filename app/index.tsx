import { useAuth } from "@clerk/clerk-expo";
import { Href, Redirect } from "expo-router";
import "../global.css";

const Welcome = "/(auth)/welcome" as Href;

const Page = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) return <Redirect href="/(root)/(tabs)/home" />;

  return <Redirect href={Welcome} />;
};

export default Page;
