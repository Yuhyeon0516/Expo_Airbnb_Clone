import { View } from "react-native";
import React, { useMemo, useState } from "react";
import { Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import Details from "@/components/Details";
import { exploreCategories } from "@/constants/ExploreCategories";
import listingData from "@/assets/data/airbnb-listings.json";

export default function Page() {
    const [category, setCategory] = useState(exploreCategories[0].name);
    const items = useMemo(() => listingData as any, []);

    function onDataChanged(category: string) {
        setCategory(category);
    }

    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen
                options={{
                    header: () => (
                        <ExploreHeader onCategoryChanged={onDataChanged} />
                    ),
                }}
            />
            <Details details={items} category={category} />
        </View>
    );
}
