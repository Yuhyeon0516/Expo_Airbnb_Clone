import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";

export default function ModalHeaderText() {
    const [active, setActive] = useState(0);

    return (
        <View
            style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}
        >
            <TouchableOpacity
                onPress={() => setActive(0)}
                style={{
                    borderBottomWidth: active === 0 ? 2 : 0,
                    paddingBottom: 3,
                    paddingHorizontal: 3,
                }}
            >
                <Text
                    style={{
                        fontFamily: "mon-sb",
                        fontSize: 18,
                        color: active === 0 ? "#000" : Colors.grey,
                    }}
                >
                    숙소
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setActive(1)}
                style={{
                    borderBottomWidth: active === 1 ? 2 : 0,
                    paddingBottom: 3,
                    paddingHorizontal: 3,
                }}
            >
                <Text
                    style={{
                        fontFamily: "mon-sb",
                        fontSize: 18,
                        color: active === 1 ? "#000" : Colors.grey,
                    }}
                >
                    체험
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({});
