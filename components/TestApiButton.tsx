import { fetchAPI } from "@/lib/fetch";
import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk();
  const router = useRouter();

  const handleApi = async () => {
    try {
      await fetchAPI("/(api)/test", {
        method: "GET",
      });
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <TouchableOpacity onPress={handleApi}>
      <Text>Test API</Text>
    </TouchableOpacity>
  );
};
