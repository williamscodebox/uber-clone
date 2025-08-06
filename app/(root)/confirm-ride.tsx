import { Href, router } from "expo-router";

import CustomButton from "@/components/CustomButton";
// import DriverCard from "@/components/DriverCard";
import RideLayout from "@/components/RideLayout";
import { useDriverStore } from "@/store";

const bookRide = `/(root)/book-ride` as Href;

const ConfirmRide = () => {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();
  // console.log("drivers", drivers);
  // console.log("selectedDriver", selectedDriver);

  return (
    <RideLayout title={"Choose a Driver"} snapPoints={["35%", "65%"]}>
      {/* <FlatList
        data={drivers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={
          ({ item, index }) => (
            <DriverCard
              item={item}
              selected={selectedDriver!}
              setSelected={() => setSelectedDriver(parseInt(item.id!, 10))}
            />
          )
          // item ? <View></View> : null
        }
        //  ListFooterComponent={() => <View className="mx-5 mt-10 mb-8"></View>}
      /> */}
      <CustomButton
        title="Select Ride"
        onPress={() => router.push(bookRide)}
        className="mt-5 mb-8"
      />
    </RideLayout>
  );
};

export default ConfirmRide;
