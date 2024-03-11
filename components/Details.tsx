import { View, Text } from "react-native";
import React, { useEffect } from "react";

type DetailsProps = {
    details: any[];
    category: string;
};

export default function Details({ details, category }: DetailsProps) {
    useEffect(() => {
        console.log(details.length);
    }, [details]);

    return (
        <View style={{ flex: 1, marginTop: 130 }}>
            <Text>Details</Text>
        </View>
    );
}
