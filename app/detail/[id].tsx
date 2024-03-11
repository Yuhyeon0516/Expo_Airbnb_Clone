import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

type PageParams = {
    id: string;
};

export default function Page() {
    const { id } = useLocalSearchParams<PageParams>();

    console.log(id);

    return (
        <View>
            <Text>Page</Text>
        </View>
    );
}
