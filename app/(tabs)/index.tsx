import { View } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function Page() {
    return (
        <View>
            <Link href={"/(modals)/login"}>Login</Link>
            <Link href={"/(modals)/booking"}>Booking</Link>
            <Link href={"/detail/123"}>Detail</Link>
        </View>
    );
}
