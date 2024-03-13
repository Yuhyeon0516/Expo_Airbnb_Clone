import {
    View,
    Text,
    Button,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";

export default function Page() {
    const { signOut, isSignedIn } = useAuth();
    const { user } = useUser();
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if (!user) {
            return;
        }

        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.emailAddresses[0].emailAddress);
    }, [user]);

    async function saveUser() {
        try {
            await user?.update({
                firstName: firstName!,
                lastName: lastName!,
            });
        } catch (error: any) {
            console.log(error);
        } finally {
            setEdit(false);
        }
    }

    async function changeProfileImage() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.75,
            base64: true,
        });

        if (!result.canceled) {
            const base64 = `data:image/png;base64,${result.assets[0].base64}`;

            user?.setProfileImage({
                file: base64,
            });
        }
    }

    return (
        <SafeAreaView style={defaultStyles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>프로필</Text>
                <Ionicons name="notifications-outline" size={26} />
            </View>

            {user && (
                <View style={styles.card}>
                    <TouchableOpacity onPress={changeProfileImage}>
                        <Image
                            source={{ uri: user.imageUrl }}
                            style={styles.avatar}
                        />
                    </TouchableOpacity>

                    <View style={{ flexDirection: "row", gap: 6 }}>
                        {edit ? (
                            <View style={styles.editRow}>
                                <TextInput
                                    placeholder="Last Name"
                                    value={lastName || ""}
                                    onChangeText={setLastName}
                                    style={[
                                        defaultStyles.inputField,
                                        { width: 100 },
                                    ]}
                                />
                                <TextInput
                                    placeholder="First Name"
                                    value={firstName || ""}
                                    onChangeText={setFirstName}
                                    style={[
                                        defaultStyles.inputField,
                                        { width: 100 },
                                    ]}
                                />
                                <TouchableOpacity onPress={saveUser}>
                                    <Ionicons
                                        name="checkmark-outline"
                                        size={24}
                                        color={Colors.dark}
                                    />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={styles.editRow}>
                                <Text
                                    style={{
                                        fontFamily: "mon-sb",
                                        fontSize: 22,
                                    }}
                                >
                                    {lastName}
                                    {firstName}
                                </Text>
                                <TouchableOpacity onPress={() => setEdit(true)}>
                                    <Ionicons
                                        name="create-outline"
                                        size={24}
                                        color={Colors.dark}
                                    />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                    <Text>이메일: {email}</Text>
                    <Text>가입일: {user.createdAt?.toLocaleDateString()}</Text>
                </View>
            )}

            {isSignedIn && (
                <Button
                    title="로그아웃"
                    onPress={() => signOut()}
                    color={Colors.dark}
                />
            )}

            {!isSignedIn && (
                <Link href={"/(modals)/login"} asChild>
                    <Button title="로그인" color={Colors.dark} />
                </Link>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        padding: 24,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    header: {
        fontFamily: "mon-sb",
        fontSize: 24,
    },
    card: {
        backgroundColor: "#fff",
        padding: 24,
        borderRadius: 16,
        marginHorizontal: 24,
        marginTop: 24,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        alignItems: "center",
        gap: 14,
        marginBottom: 24,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.grey,
    },
    editRow: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
});
