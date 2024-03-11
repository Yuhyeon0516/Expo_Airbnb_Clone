import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
} from "react-native";
import React from "react";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

enum Strategy {
    Google = "oauth_google",
    Apple = "oauth_apple",
    Facebook = "oauth_facebook",
}

export default function Page() {
    useWarmUpBrowser();

    const router = useRouter();

    const { startOAuthFlow: googleAuth } = useOAuth({
        strategy: Strategy.Google,
    });
    const { startOAuthFlow: appleAuth } = useOAuth({
        strategy: Strategy.Apple,
    });
    const { startOAuthFlow: facebookAuth } = useOAuth({
        strategy: Strategy.Facebook,
    });

    async function onSelectAuth(strategy: Strategy) {
        const selectedAuth = {
            [Strategy.Google]: googleAuth,
            [Strategy.Apple]: appleAuth,
            [Strategy.Facebook]: facebookAuth,
        }[strategy];

        try {
            const { createdSessionId, setActive } = await selectedAuth();

            if (createdSessionId) {
                setActive!({ session: createdSessionId });
                router.back();
            }
        } catch (error) {
            console.error("OAuth error: ", error);
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                autoCapitalize="none"
                placeholder="이메일"
                style={[defaultStyles.inputField, { marginBottom: 30 }]}
            />
            <TouchableOpacity style={defaultStyles.btn}>
                <Text style={defaultStyles.btnText}>계속하기</Text>
            </TouchableOpacity>

            <View style={styles.seperatorView}>
                <View
                    style={{
                        flex: 1,
                        borderBottomColor: "#000",
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                />
                <Text style={styles.seperator}>또는</Text>
                <View
                    style={{
                        flex: 1,
                        borderBottomColor: "#000",
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                />
            </View>

            <View style={{ gap: 20 }}>
                <TouchableOpacity style={styles.btnOutline}>
                    <Ionicons
                        name="call-outline"
                        style={defaultStyles.btnIcon}
                        size={24}
                    />
                    <Text style={styles.btnOutlineText}>
                        전화번호로 계속하기
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btnOutline}
                    onPress={() => onSelectAuth(Strategy.Apple)}
                >
                    <Ionicons
                        name="logo-apple"
                        style={defaultStyles.btnIcon}
                        size={24}
                    />
                    <Text style={styles.btnOutlineText}>
                        Apple 계정으로 계속하기
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btnOutline}
                    onPress={() => onSelectAuth(Strategy.Google)}
                >
                    <Ionicons
                        name="logo-google"
                        style={defaultStyles.btnIcon}
                        size={24}
                    />
                    <Text style={styles.btnOutlineText}>
                        Google 계정으로 계속하기
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btnOutline}
                    onPress={() => onSelectAuth(Strategy.Facebook)}
                >
                    <Ionicons
                        name="logo-facebook"
                        style={defaultStyles.btnIcon}
                        size={24}
                    />
                    <Text style={styles.btnOutlineText}>
                        Facebook 계정으로 계속하기
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 26,
    },
    seperatorView: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        marginVertical: 30,
    },
    seperator: {
        fontFamily: "mon-sb",
        color: Colors.grey,
    },
    btnOutline: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: Colors.grey,
        height: 50,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingHorizontal: 10,
    },
    btnOutlineText: {
        color: "#000",
        fontSize: 16,
        fontFamily: "mon-sb",
    },
});
