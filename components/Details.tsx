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

type DetailsProps = {
    details: any[];
    category: string;
};

export default function Details({ details, category }: DetailsProps) {
    const [loading, setLoading] = useState(false);
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 200);
    }, [category]);

    const renderRow: ListRenderItem<Detail> = ({ item }) => (
        <Link href={`/detail/${item.id}`} asChild>
            <TouchableOpacity>
                <View style={styles.detail}>
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
                        <Text style={{ fontSize: 16, fontFamily: "mon-sb" }}>
                            {item.name}
                        </Text>
                        <View style={{ flexDirection: "row" }}>
                            <Ionicons name="star" size={16} />
                            <Text style={{ fontFamily: "mon-sb" }}>
                                {item.review_scores_rating / 20}
                            </Text>
                        </View>
                    </View>

                    <Text style={{ fontFamily: "mon" }}>{item.room_type}</Text>

                    <View style={{ flexDirection: "row", gap: 4 }}>
                        <Text style={{ fontFamily: "mon-sb" }}>
                            ₩ {item.price * 1324}원
                        </Text>
                        <Text style={{ fontFamily: "mon" }}>/박</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    );

    return (
        <View style={[defaultStyles.container, { marginTop: 130 }]}>
            <FlatList
                ref={flatListRef}
                data={loading ? [] : details}
                renderItem={renderRow}
            />
        </View>
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
});
