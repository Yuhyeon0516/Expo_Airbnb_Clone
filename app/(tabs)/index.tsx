import { View } from "react-native";
import React, { useMemo, useState } from "react";
import { Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import { exploreCategories } from "@/constants/ExploreCategories";
import listingData from "@/assets/data/airbnb-listings.json";
import DetailsMap from "@/components/DetailsMap";
import listingDataGeo from "@/assets/data/airbnb-listings.geo.json";
import DetailsBottomSheet from "@/components/DetailsBottomSheet";

export default function Page() {
    const [category, setCategory] = useState(exploreCategories[0].name);
    const items = useMemo(() => listingData as any, []);
    const geoItems = useMemo(() => listingDataGeo as any, []);

    function onDataChanged(category: string) {
        setCategory(category);
    }

    return (
        <View style={{ flex: 1, marginTop: 80 }}>
            <Stack.Screen
                options={{
                    header: () => (
                        <ExploreHeader onCategoryChanged={onDataChanged} />
                    ),
                }}
            />
            <DetailsMap details={geoItems} />
            <DetailsBottomSheet details={items} category={category} />
        </View>
    );
}
