import CustomButton from "@/components/CustomButton";
import { Href, router } from "expo-router";
// import DriverCard from "@/components/DriverCard";
import RideLayout from "@/components/RideLayout";

const bookRide = `/(root)/book-ride` as Href;

const ConfirmRide = () => {
  // console.log("drivers", drivers);
  // console.log("selectedDriver", selectedDriver);

  return (
    <RideLayout title={"Choose a Driver"} snapPoints={["35%", "65%"]}>
      <CustomButton
        title="Select Ride"
        onPress={() => router.push(bookRide)}
        className="mt-5 mb-8"
      />
    </RideLayout>
  );
};

export default ConfirmRide;
