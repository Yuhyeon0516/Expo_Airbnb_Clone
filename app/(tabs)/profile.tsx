import { View, Text, Button } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";

export default function Page() {
    const { signOut, isSignedIn } = useAuth();

    return (
        <View>
            <Button title="로그아웃" onPress={() => signOut()} />
            {!isSignedIn && (
                <Link href={"/(modals)/login"}>
                    <Text>로그인</Text>
                </Link>
            )}
        </View>
    );
}
