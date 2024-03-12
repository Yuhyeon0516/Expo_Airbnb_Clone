import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useMemo, useRef, useState } from "react";
import { Detail } from "@/types/Detail";
import BottomSheet from "@gorhom/bottom-sheet";
import Details from "./Details";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

type DetailsBottomSheetProps = {
    details: Detail[];
    category: string;
};

export default function DetailsBottomSheet({
    details,
    category,
}: DetailsBottomSheetProps) {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["10%", "100%"], []);
    const [refresh, setRefresh] = useState(0);

    function onPressShowMap() {
        bottomSheetRef.current?.collapse();
        setRefresh(refresh + 1);
    }

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            enablePanDownToClose={false}
            handleIndicatorStyle={{ backgroundColor: Colors.grey }}
            style={styles.sheetContainer}
        >
            <View style={{ flex: 1 }}>
                <Details
                    details={details}
                    category={category}
                    refresh={refresh}
                />
                <View style={styles.absoluteBtn}>
                    <TouchableOpacity
                        onPress={onPressShowMap}
                        style={styles.btn}
                    >
                        <Text style={{ fontFamily: "mon-sb", color: "#fff" }}>
                            지도
                        </Text>
                        <Ionicons name="map" size={20} color={"#fff"} />
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheet>
    );
}

const styles = StyleSheet.create({
    absoluteBtn: {
        position: "absolute",
        bottom: 30,
        width: "100%",
        alignItems: "center",
    },
    btn: {
        backgroundColor: Colors.dark,
        padding: 16,
        height: 50,
        borderRadius: 30,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    sheetContainer: {
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 1,
            height: 1,
        },
    },
});
