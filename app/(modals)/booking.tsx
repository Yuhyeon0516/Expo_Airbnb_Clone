import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Image,
} from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import Animated, {
    FadeIn,
    FadeOut,
    SlideInDown,
} from "react-native-reanimated";
import { defaultStyles } from "@/constants/Styles";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { Places } from "@/constants/Places";
// @ts-ignore
import DatePicker from "react-native-modern-datepicker";

const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);

const guestsGropus = [
    {
        name: "성인",
        text: "13세 이상",
        count: 0,
    },
    {
        name: "어린이",
        text: "2~12세",
        count: 0,
    },
    {
        name: "유아",
        text: "2세 미만",
        count: 0,
    },
    {
        name: "반려동물",
        text: "보조동물을 동반하시나요?",
        count: 0,
    },
];

export default function Page() {
    const router = useRouter();
    const [openCard, setOpenCard] = useState(0);
    const [selectedPlace, setSelectedPlace] = useState(0);
    const [groups, setGroups] = useState(guestsGropus);
    const today = new Date().toISOString().substring(0, 10);

    function onPressClearAll() {
        setSelectedPlace(0);
        setOpenCard(0);
    }

    return (
        <BlurView intensity={70} style={styles.container} tint="light">
            <View style={styles.card}>
                {openCard !== 0 && (
                    <AnimatedTouchableOpacity
                        onPress={() => setOpenCard(0)}
                        style={styles.cardPreview}
                        entering={FadeIn.duration(200)}
                        exiting={FadeOut.duration(200)}
                    >
                        <Text style={styles.previewText}>여행지</Text>
                        <Text style={styles.previewdData}>
                            {Places[selectedPlace].title}
                        </Text>
                    </AnimatedTouchableOpacity>
                )}

                {openCard === 0 && (
                    <Text style={styles.cardHeader}>여행지를 알려주세요</Text>
                )}
                {openCard === 0 && (
                    <Animated.View
                        entering={FadeIn}
                        exiting={FadeOut}
                        style={styles.cardBody}
                    >
                        <View style={styles.searchSection}>
                            <Ionicons
                                style={styles.searchIcon}
                                name="search"
                                size={20}
                                color="#000"
                            />
                            <TextInput
                                style={styles.inputField}
                                placeholder="여행지 검색"
                                placeholderTextColor={Colors.grey}
                            />
                        </View>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.placesContainer}
                        >
                            {Places.map((item, index) => (
                                <TouchableOpacity
                                    onPress={() => setSelectedPlace(index)}
                                    key={index}
                                >
                                    <Image
                                        source={item.img}
                                        style={
                                            selectedPlace == index
                                                ? styles.placeSelected
                                                : styles.place
                                        }
                                    />
                                    <Text
                                        style={{
                                            fontFamily: "mon",
                                            paddingTop: 6,
                                        }}
                                    >
                                        {item.title}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </Animated.View>
                )}
            </View>

            <View style={styles.card}>
                {openCard != 1 && (
                    <AnimatedTouchableOpacity
                        onPress={() => setOpenCard(1)}
                        style={styles.cardPreview}
                        entering={FadeIn.duration(200)}
                        exiting={FadeOut.duration(200)}
                    >
                        <Text style={styles.previewText}>날짜</Text>
                        <Text style={styles.previewdData}>일주일</Text>
                    </AnimatedTouchableOpacity>
                )}

                {openCard == 1 && (
                    <Text style={styles.cardHeader}>
                        여행 날짜는 언제인가요?
                    </Text>
                )}

                {openCard == 1 && (
                    <Animated.View style={styles.cardBody}>
                        <DatePicker
                            options={{
                                defaultFont: "mon",
                                headerFont: "mon-sb",
                                mainColor: Colors.primary,
                                borderColor: "transparent",
                            }}
                            current={today}
                            selected={today}
                            mode={"calendar"}
                        />
                    </Animated.View>
                )}
            </View>

            <View style={styles.card}>
                {openCard != 2 && (
                    <AnimatedTouchableOpacity
                        onPress={() => setOpenCard(2)}
                        style={styles.cardPreview}
                        entering={FadeIn.duration(200)}
                        exiting={FadeOut.duration(200)}
                    >
                        <Text style={styles.previewText}>여행자</Text>
                        <Text style={styles.previewdData}>게스트 추가</Text>
                    </AnimatedTouchableOpacity>
                )}

                {openCard == 2 && (
                    <Text style={styles.cardHeader}>게스트는 누구인가요?</Text>
                )}

                {openCard == 2 && (
                    <Animated.View style={styles.cardBody}>
                        {groups.map((item, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.guestItem,
                                    index + 1 < guestsGropus.length
                                        ? styles.itemBorder
                                        : null,
                                ]}
                            >
                                <View style={{ gap: 5 }}>
                                    <Text
                                        style={{
                                            fontFamily: "mon",
                                            fontSize: 16,
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: "mon",
                                            fontSize: 14,
                                            color: Colors.grey,
                                            textDecorationLine:
                                                index === 3
                                                    ? "underline"
                                                    : "none",
                                        }}
                                    >
                                        {item.text}
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        gap: 10,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => {
                                            const newGroups = [...groups];
                                            newGroups[index].count =
                                                newGroups[index].count > 0
                                                    ? newGroups[index].count - 1
                                                    : 0;

                                            setGroups(newGroups);
                                        }}
                                    >
                                        <Ionicons
                                            name="remove-circle-outline"
                                            size={26}
                                            color={
                                                groups[index].count > 0
                                                    ? Colors.grey
                                                    : "#cdcdcd"
                                            }
                                        />
                                    </TouchableOpacity>
                                    <Text
                                        style={{
                                            fontFamily: "mon",
                                            fontSize: 16,
                                            minWidth: 18,
                                            textAlign: "center",
                                        }}
                                    >
                                        {item.count}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            const newGroups = [...groups];
                                            newGroups[index].count++;
                                            setGroups(newGroups);
                                        }}
                                    >
                                        <Ionicons
                                            name="add-circle-outline"
                                            size={26}
                                            color={Colors.grey}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </Animated.View>
                )}
            </View>

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
                    <TouchableOpacity
                        onPress={onPressClearAll}
                        style={{ justifyContent: "center" }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                fontFamily: "mon-sb",
                                textDecorationLine: "underline",
                            }}
                        >
                            전체 해제
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={[
                            defaultStyles.btn,
                            { paddingRight: 20, paddingLeft: 50 },
                        ]}
                    >
                        <Ionicons
                            name="search-outline"
                            size={24}
                            color={"#fff"}
                            style={defaultStyles.btnIcon}
                        />
                        <Text style={defaultStyles.btnText}>검색</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </BlurView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 14,
        margin: 10,
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 2,
            height: 2,
        },
    },
    cardHeader: {
        fontFamily: "mon-b",
        fontSize: 24,
        padding: 20,
    },
    cardBody: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    cardPreview: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
    },
    searchSection: {
        height: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ABABAB",
        borderRadius: 8,
        marginBottom: 16,
    },
    searchIcon: {
        padding: 10,
    },
    inputField: {
        flex: 1,
        padding: 10,
        backgroundColor: "#fff",
    },
    placesContainer: {
        flexDirection: "row",
        gap: 25,
    },
    place: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    placeSelected: {
        borderColor: Colors.grey,
        borderWidth: 2,
        borderRadius: 10,
        width: 100,
        height: 100,
    },
    previewText: {
        fontFamily: "mon-sb",
        fontSize: 14,
        color: Colors.grey,
    },
    previewdData: {
        fontFamily: "mon-sb",
        fontSize: 14,
        color: Colors.dark,
    },
    guestItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 16,
    },
    itemBorder: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.grey,
    },
});
