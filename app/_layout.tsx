import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
    initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        mon: require("../assets/fonts/Montserrat-Regular.ttf"),
        "mon-sb": require("../assets/fonts/Montserrat-SemiBold.ttf"),
        "mon-b": require("../assets/fonts/Montserrat-Bold.ttf"),
    });

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    const router = useRouter();

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
                name="(modals)/login"
                options={{
                    title: "로그인",
                    headerTitleStyle: {
                        fontFamily: "mon-sb",
                    },
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="close-outline" size={28} />
                        </TouchableOpacity>
                    ),
                    presentation: "modal",
                }}
            />
            <Stack.Screen
                name="detail/[id]"
                options={{
                    headerTitle: "",
                }}
            />
            <Stack.Screen
                name="(modals)/booking"
                options={{
                    presentation: "transparentModal",
                    animation: "fade",
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="close-outline" size={28} />
                        </TouchableOpacity>
                    ),
                }}
            />
        </Stack>
    );
}
