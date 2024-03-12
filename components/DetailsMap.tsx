import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import listingDataGeo from "@/assets/data/airbnb-listings.geo.json";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useRouter } from "expo-router";
import { numberWithComma } from "@/util/util";
import MapView from "react-native-map-clustering";

type DetailsMapProps = {
    details: typeof listingDataGeo;
};

const INITIAL_REGION = {
    latitude: 51.51855232809643,
    longitude: -0.18027644712090468,
    latitudeDelta: 9,
    longitudeDelta: 9,
};

function DetailsMap({ details }: DetailsMapProps) {
    const router = useRouter();

    function onPressMarker(detailId: string) {
        router.push(`/detail/${detailId}`);
    }

    function renderCluster(cluster: any) {
        const { id, geometry, onPress, properties } = cluster;
        const points = properties.point_count;

        return (
            <Marker
                key={`cluster-${id}`}
                onPress={onPress}
                coordinate={{
                    longitude: geometry.coordinates[0],
                    latitude: geometry.coordinates[1],
                }}
            >
                <View style={styles.marker}>
                    <Text
                        style={{
                            color: "#000",
                            textAlign: "center",
                            fontFamily: "mon-sb",
                        }}
                    >
                        {points}
                    </Text>
                </View>
            </Marker>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                animationEnabled={false}
                style={StyleSheet.absoluteFill}
                showsUserLocation
                showsMyLocationButton
                provider={PROVIDER_GOOGLE}
                initialRegion={INITIAL_REGION}
                clusterColor="#fff"
                clusterTextColor="#000"
                clusterFontFamily="mon-sb"
                renderCluster={renderCluster}
            >
                {details.features.map((item) => (
                    <Marker
                        key={item.properties.id}
                        onPress={() => onPressMarker(item.properties.id)}
                        coordinate={{
                            latitude: Number(item.properties.latitude),
                            longitude: Number(item.properties.longitude),
                        }}
                    >
                        <View style={styles.marker}>
                            <Text style={styles.markerText}>
                                ₩{" "}
                                {numberWithComma(
                                    (item.properties.price ?? 0) * 1320
                                )}
                            </Text>
                        </View>
                    </Marker>
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    marker: {
        backgroundColor: "#fff",
        padding: 6,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
    },
    markerText: {
        fontSize: 14,
        fontFamily: "mon-sb",
    },
});

export default memo(DetailsMap);
