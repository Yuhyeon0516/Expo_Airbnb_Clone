import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Share,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import detailData from "@/assets/data/airbnb-listings.json";
import Animated, {
    SlideInDown,
    interpolate,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset,
} from "react-native-reanimated";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { defaultStyles } from "@/constants/Styles";

type PageParams = {
    id: string;
};

export default function Page() {
    const { id } = useLocalSearchParams<PageParams>();
    const detail = detailData.find((item) => item.id === id)!;
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const navigation = useNavigation();

    const scrollOffset = useScrollViewOffset(scrollRef);

    async function onPressShare() {
        try {
            await Share.share({
                title: detail.name,
                url: detail.listing_url,
            });
        } catch (error) {
            console.error("Share error: ", error);
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackground: () => (
                <Animated.View style={[styles.header, headerAnimatedStyle]} />
            ),
            headerRight: () => (
                <View style={styles.bar}>
                    <TouchableOpacity
                        style={styles.roundButton}
                        onPress={onPressShare}
                    >
                        <Ionicons
                            name="share-outline"
                            size={22}
                            color={"#000"}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.roundButton}>
                        <Ionicons
                            name="heart-outline"
                            size={22}
                            color={"#000"}
                        />
                    </TouchableOpacity>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity
                    style={styles.roundButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back" size={24} color={"#000"} />
                </TouchableOpacity>
            ),
        });
    }, []);

    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-300, 0, 300],
                        [-300 / 2, 0, 300 * 0.75]
                    ),
                },
                {
                    scale: interpolate(
                        scrollOffset.value,
                        [-300, 0, 300],
                        [2, 1, 1]
                    ),
                },
            ],
        };
    });

    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(scrollOffset.value, [0, 300 / 1.5], [0, 1]),
        };
    });

    return (
        <View style={styles.container}>
            <Animated.ScrollView
                ref={scrollRef}
                contentContainerStyle={{ paddingBottom: 100 }}
                scrollEventThrottle={16}
            >
                <Animated.Image
                    source={{ uri: detail.xl_picture_url! }}
                    style={[imageAnimatedStyle, styles.image]}
                />

                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{detail.name}</Text>
                    <Text style={styles.location}>
                        {detail.smart_location} 의 {detail.room_type}
                    </Text>
                    <Text style={styles.rooms}>
                        {detail.guests_included} 게스트 · {detail.bedrooms} 침실
                        · {detail.beds} 침대 · {detail.bathrooms} 화장실
                    </Text>
                    <View style={{ flexDirection: "row", gap: 4 }}>
                        <Ionicons name="star" size={16} />
                        <Text style={styles.ratings}>
                            {(detail.review_scores_rating ?? 0) / 20} ·{" "}
                            {detail.number_of_reviews} reviews
                        </Text>
                    </View>
                    <View style={styles.divider} />

                    <View style={styles.hostView}>
                        <Image
                            source={{ uri: detail.host_picture_url }}
                            style={styles.host}
                        />

                        <View>
                            <Text style={{ fontWeight: "500", fontSize: 16 }}>
                                호스트: {detail.host_name}
                            </Text>
                            <Text>호스팅 경력: {detail.host_since} ~</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.description}>{detail.description}</Text>
                </View>
            </Animated.ScrollView>

            <Animated.View
                style={defaultStyles.footer}
                entering={SlideInDown.delay(200)}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <TouchableOpacity style={styles.footerText}>
                        <Text style={{ fontFamily: "mon-sb" }}>
                            ₩ {(detail.price ?? 0) * 1324}원
                        </Text>
                        <Text style={{ fontFamily: "mon" }}>/박</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[defaultStyles.btn, { paddingHorizontal: 30 }]}
                    >
                        <Text style={defaultStyles.btnText}>예약하기</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    image: {
        width: "100%",
        height: 300,
    },
    infoContainer: {
        padding: 24,
        backgroundColor: "#fff",
    },
    name: {
        fontSize: 26,
        fontWeight: "bold",
        fontFamily: "mon-sb",
    },
    location: {
        fontSize: 18,
        marginTop: 10,
        fontFamily: "mon-sb",
    },
    rooms: {
        fontSize: 16,
        color: Colors.grey,
        marginVertical: 4,
        fontFamily: "mon",
    },
    ratings: {
        fontSize: 16,
        fontFamily: "mon-sb",
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.grey,
        marginVertical: 16,
    },
    host: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: Colors.grey,
    },
    hostView: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    footerText: {
        height: "100%",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    footerPrice: {
        fontSize: 18,
        fontFamily: "mon-sb",
    },
    roundButton: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        color: Colors.primary,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.grey,
    },
    bar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },
    header: {
        backgroundColor: "#fff",
        height: 100,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.grey,
    },
    description: {
        fontSize: 16,
        marginTop: 10,
        fontFamily: "mon",
    },
});
