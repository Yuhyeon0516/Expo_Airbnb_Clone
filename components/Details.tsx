import {
    View,
    FlatList,
    ListRenderItem,
    TouchableOpacity,
    StyleSheet,
    Image,
    Text,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import { Link } from "expo-router";
import { Detail } from "@/types/Detail";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { numberWithComma } from "@/util/util";
import {
    BottomSheetFlatList,
    BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";

type DetailsProps = {
    details: any[];
    category: string;
    refresh: number;
};

export default function Details({ details, category, refresh }: DetailsProps) {
    const [loading, setLoading] = useState(false);
    const flatListRef = useRef<BottomSheetFlatListMethods>(null);

    useEffect(() => {
        if (refresh) {
            flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
        }
    }, [refresh]);

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 200);
    }, [category]);

    return (
        <View style={defaultStyles.container}>
            <BottomSheetFlatList
                ref={flatListRef}
                data={loading ? [] : details}
                renderItem={renderRow}
                ListHeaderComponent={
                    <Text style={styles.info}>방 {details.length}개</Text>
                }
            />
        </View>
    );
}

function renderRow({ item }: { item: Detail }) {
    return (
        <Link href={`/detail/${item.id}`} asChild>
            <TouchableOpacity>
                <Animated.View
                    style={styles.detail}
                    entering={FadeInRight}
                    exiting={FadeOutLeft}
                >
                    <Image
                        source={{ uri: item.medium_url }}
                        style={styles.image}
                    />
                    <TouchableOpacity
                        style={{ position: "absolute", right: 30, top: 30 }}
                    >
                        <Ionicons
                            name="heart-outline"
                            size={24}
                            color={"#000"}
                        />
                    </TouchableOpacity>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                fontFamily: "mon-sb",
                                flexShrink: 2,
                            }}
                        >
                            {item.name}
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                flexShrink: 1,
                            }}
                        >
                            <Ionicons name="star" size={16} />
                            <Text style={{ fontFamily: "mon-sb" }}>
                                {item.review_scores_rating / 20}
                            </Text>
                        </View>
                    </View>

                    <Text style={{ fontFamily: "mon" }}>{item.room_type}</Text>

                    <View style={{ flexDirection: "row", gap: 4 }}>
                        <Text style={{ fontFamily: "mon-sb" }}>
                            ₩ {numberWithComma(item.price * 1324)}원
                        </Text>
                        <Text style={{ fontFamily: "mon" }}>/박</Text>
                    </View>
                </Animated.View>
            </TouchableOpacity>
        </Link>
    );
}

const styles = StyleSheet.create({
    detail: {
        padding: 16,
        gap: 10,
        marginVertical: 16,
    },
    image: {
        width: "100%",
        height: 300,
        borderRadius: 10,
    },
    info: {
        textAlign: "center",
        fontFamily: "mon-sb",
        fontSize: 16,
        marginTop: 4,
    },
});
