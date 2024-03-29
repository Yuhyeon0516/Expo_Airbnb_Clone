import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ModalHeaderText from "@/components/ModalHeaderText";
import Colors from "@/constants/Colors";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
    async getToken(key: string) {
        try {
            return SecureStore.getItemAsync(key);
        } catch (error) {
            return null;
        }
    },
    async saveToken(key: string, value: string) {
        try {
            return SecureStore.setItemAsync(key, value);
        } catch (error) {
            return;
        }
    },
};

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

    return (
        <ClerkProvider
            publishableKey={CLERK_PUBLISHABLE_KEY!}
            tokenCache={tokenCache}
        >
            <RootLayoutNav />
        </ClerkProvider>
    );
}

function RootLayoutNav() {
    const router = useRouter();
    const { isLoaded, isSignedIn } = useAuth();

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push("/(modals)/login");
        }
    }, [isLoaded]);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
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
                        headerTransparent: true,
                        headerBackTitleVisible: false,
                    }}
                />
                <Stack.Screen
                    name="(modals)/booking"
                    options={{
                        presentation: "transparentModal",
                        animation: "fade",
                        headerTransparent: true,
                        headerTitle: () => <ModalHeaderText />,
                        headerLeft: () => (
                            <TouchableOpacity
                                onPress={() => router.back()}
                                style={{
                                    backgroundColor: "#fff",
                                    borderColor: Colors.grey,
                                    borderRadius: 20,
                                    borderWidth: 1,
                                    padding: 4,
                                }}
                            >
                                <Ionicons name="close-outline" size={22} />
                            </TouchableOpacity>
                        ),
                    }}
                />
            </Stack>
        </GestureHandlerRootView>
    );
}
