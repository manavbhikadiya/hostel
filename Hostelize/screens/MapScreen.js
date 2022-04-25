import React, { cloneElement, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Animated,
  ScrollView,
  Platform,
  PixelRatio,
  Image,
  TouchableOpacity
} from "react-native";
import MapView, { Polyline } from "react-native-maps";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const { width, height } = Dimensions.get("window");
import { faLocationDot, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Icon } from 'react-native-eva-icons';

const scale = width / 320;

const normalize = (size) => {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

const MapScreen = ({ route, navigation }) => {
  const { hostel_id, latitude, longitude, hostel_name, kms, college_name } = route.params;

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} >
          <Icon style={{ marginTop: 20, marginLeft: 30 }} name="arrow-back" width={30} height={30} fill="#4d0000" />
        </TouchableOpacity>
        <ScrollView
          endFillColor="#fcfbfe"
          overScrollMode="never"
        >
          <View style={styles.hostelImageContainer}>
            <View style={styles.hostelImage}>
              <MapView
                style={styles.map}
                loadingEnabled={true}
                region={{
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.0005,
                }}
              >
                <MapView.Marker
                  coordinate={{ latitude: latitude, longitude: longitude }}
                  title={hostel_name}
                  description={`${kms} Km from ${college_name}`}
                >
                  <View style={styles.markerIcon}>
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      size={45}
                      color="#f38172"
                    />
                  </View>
                </MapView.Marker>
                <MapView.Marker
                  coordinate={{ latitude: latitude, longitude: longitude }}
                  title={hostel_name}
                  description={`${kms} Km from ${college_name}`}
                >
                  <View style={styles.markerIcon}>
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      size={45}
                      color="#f38172"
                    />
                  </View>
                </MapView.Marker>
                <Polyline
                  coordinates={[
                    { latitude: latitude, longitude: longitude },
                    { latitude: latitude, longitude: longitude },
                  ]}
                  strokeColor="#000"
                  strokeWidth={6}
                />
              </MapView>
            </View>
          </View>
          <View style={styles.bottomSection}>
            <View style={styles.sectionDiv}>
              <Text style={styles.sectionTitle}>Details / Description</Text>
              <Text style={styles.hostelName}>{hostel_name}</Text>
              {kms == 0 ? (
                <View style={styles.kmsContainer}>
                  <Text style={styles.fromText}>Within college</Text>
                </View>
              ) : (
                <View style={styles.kmsContainer}>
                  <Text style={styles.kmsText}>{kms} km</Text>
                  <Text style={styles.fromText}> From {college_name}</Text>
                </View>
              )}
              <View style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Book now</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default MapScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  hostelImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop:20
  },
  hostelImage: {
    width: wp(88),
    height: height / 1.5,
    backgroundColor: "yellow",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  map: {
    width: wp(88),
    height: height / 1.5,
    borderRadius: 20,
  },
  markerIcon: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSection: {
    marginTop: 20,
  },
  sectionDiv: {
    paddingHorizontal: 30,
  },
  sectionTitle: {
    fontSize: 23,
    fontStyle: "normal",
    color: "#232323",
    fontWeight: "bold",
  },
  hostelName: {
    fontSize: normalize(15),
    fontWeight: "normal",
    color: "#000",
    marginTop: 20,
  },
  kmsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  kmsText: {
    fontSize: normalize(20),
    fontWeight: "bold",
    color: "#f38172",
  },
  fromText: {
    fontSize: normalize(14),
    marginTop: 10,
    color: "#000",
    fontWeight: "bold",
  },
  bookButton: {
    marginTop: 35,
    backgroundColor: "#54b9c5",
    width: wp(80),
    height: hp(5),
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginBottom: 100
  },
  bookButtonText: {
    color: "#fff",
    fontSize: normalize(14),
    fontWeight: "bold",
  },
});
