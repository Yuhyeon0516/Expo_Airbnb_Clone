import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import { exploreCategories } from "@/constants/ExploreCategories";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
import * as Haptics from "expo-haptics";

type ExploreHeaderProps = {
    onCategoryChanged: (category: string) => void;
};

export default function ExploreHeader({
    onCategoryChanged,
}: ExploreHeaderProps) {
    const itmesRef = useRef<Array<TouchableOpacity | null>>([]);
    const scrollViewRef = useRef<ScrollView>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    function selectCateogry(index: number) {
        const selected = itmesRef.current[index];
        setActiveIndex(index);

        selected?.measure((x) => {
            scrollViewRef.current?.scrollTo({
                x: x - 16,
                y: 0,
                animated: true,
            });
        });

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onCategoryChanged(exploreCategories[index].name);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={styles.container}>
                <View style={styles.actionRow}>
                    <Link href={"/(modals)/booking"} asChild>
                        <TouchableOpacity style={styles.searchBtn}>
                            <Ionicons name="search" size={24} />
                            <View>
                                <Text style={{ fontFamily: "mon-sb" }}>
                                    어디로 여행가세요?
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: "mon",
                                        color: Colors.grey,
                                    }}
                                >
                                    어디든지 ・ 언제든 일주일 ・ 게스트 추가
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </Link>

                    <TouchableOpacity style={styles.filterBtn}>
                        <Ionicons name="options-outline" size={24} />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        alignItems: "center",
                        gap: 20,
                        paddingHorizontal: 16,
                    }}
                    ref={scrollViewRef}
                >
                    {exploreCategories.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            ref={(el) => (itmesRef.current[index] = el)}
                            style={
                                activeIndex === index
                                    ? styles.categoriesBtnActive
                                    : styles.categoriesBtn
                            }
                            onPress={() => selectCateogry(index)}
                        >
                            <MaterialIcons
                                size={24}
                                name={item.icon as any}
                                color={
                                    activeIndex === index ? "#000" : Colors.grey
                                }
                            />
                            <Text
                                style={
                                    activeIndex === index
                                        ? styles.categoryTextActive
                                        : styles.categoryText
                                }
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        height: 130,
    },
    actionRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 24,
        paddingBottom: 16,
        gap: 10,
    },
    filterBtn: {
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.grey,
        borderRadius: 24,
    },
    searchBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderColor: "#c2c2c2",
        borderWidth: StyleSheet.hairlineWidth,
        flex: 1,
        padding: 14,
        borderRadius: 30,
        backgroundColor: "#fff",

        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: {
            width: 1,
            height: 1,
        },
    },
    categoryText: {
        fontSize: 14,
        fontFamily: "mon-sb",
        color: Colors.grey,
    },
    categoryTextActive: {
        fontSize: 14,
        fontFamily: "mon-sb",
        color: "#000",
    },
    categoriesBtn: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 8,
    },
    categoriesBtnActive: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderBottomColor: "#000",
        borderBottomWidth: 2,
        paddingBottom: 8,
    },
});
