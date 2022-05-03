import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { RefreshControl, View, Text, StyleSheet, Image, Dimensions, ActivityIndicator, ImageBackground } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-eva-icons';
import LottieView from 'lottie-react-native';
import Animated from 'react-native-reanimated';

const { width, height } = Dimensions.get('screen');

const SPACING = 10;
const ITEM_WIDTH = width - 100;

const COLORS = ["#79a6d2", "#ff884d", "#85adad", "#ff3377", "#d966ff", "#e67300", "#7575a3", "#cc6699", "#3f3d56"];
var INDEX = 0;
var BG_COLOR;

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const HomeScreen = ({ navigation }) => {

    var url = "https://hosteldashboards.herokuapp.com/hostel/getAllhostels";

    const [name, setName] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => {
            setRefreshing(false)
            getdata();
        });
    }, []);

    useEffect(() => {
        getdata();
    }, []);

    const getdata = async () => {
        setIsloading(true);
        const res = await fetch(`${url}`);
        if (res) {
            const data = await res.json();
            setName(data);
            setIsloading(false);
        } else {
            setIsloading(false);
        }
    }
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator color="#000066" size={40} />
            </View>
        )
    }

    const refreshData = () => {
        getdata();
    }

    return (
        <View style={{ width, height }}>

            <View style={styles.container}>
                <ScrollView style={{ backgroundColor: "transparent", zIndex: 10 }}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={["#f38172", "#3F3D56", "#F26161"]}
                            progressBackgroundColor="#fff"
                        />
                    }
                >
                    <ImageBackground source={require('../assets/darkForest.jpg')} resizeMode="cover" style={{ width: width, height: height / 3 }}>
                        <View style={styles.header}>
                            <TouchableOpacity>
                                <Icon name='menu' style={{ marginLeft: 20 }} width={24} height={24} fill="#fff" onPress={() => navigation.openDrawer()} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon name='refresh' style={{ marginRight: 20 }} width={30} height={30} fill="#fff" onPress={refreshData} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ backgroundColor: "transparent", height: 250 }}>
                            <Text style={{ color: "white", fontSize: 25, fontWeight: "bold", marginLeft: 20, marginTop: 20, letterSpacing: 0.8 }}>Where is My</Text>
                            <Text style={{ color: "white", fontSize: 25, fontWeight: "bold", marginLeft: 20, letterSpacing: 0.3 }}>Hostel?</Text>
                        </View>
                    </ImageBackground>

                    <View style={{ backgroundColor: "#fff", borderTopLeftRadius: 40, borderTopRightRadius: 40, flex: 1, marginTop: -50 }}>

                        <View style={{ marginLeft: 25, borderBottomColor: "#000033", borderBottomWidth: 3, width: 100, marginTop: 20 }} >
                            <Text style={{ color: "#000033", fontWeight: "bold" }}>Top Colleges</Text>
                        </View>

                        <View style={{ marginTop: 25 }}>

                            <ScrollView
                                horizontal
                                scrollEnabled
                                scrollEventThrottle={16}
                                decelerationRate="fast"
                                snapToAlignment="center"
                                snapToInterval={ITEM_WIDTH + SPACING * 2}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    paddingRight: width - ITEM_WIDTH - SPACING * 2,
                                }}
                                bounces={false}
                                style={{ marginBottom: height / 7.5, marginLeft: 10 }}
                            >

                                {
                                    name?.map((hostel, index) => (
                                        <>
                                            {
                                                hostel.hostels.length != 0 ? (
                                                    <View style={styles.cardView} key={index}>
                                                        <View>
                                                            <View style={{ marginLeft: 20, marginTop: 20 }}>
                                                                <View style={{ flexDirection: "row" }}>
                                                                    <Text style={{ fontSize: 40, color: "#000066", fontWeight: "bold" }}>{hostel.hostels[0].kms}</Text>
                                                                    <Text style={{ marginTop: 32, marginLeft: 5, fontWeight: "bold", color: "#54b9c4" }}>KM</Text>
                                                                    <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                                                                        <View style={{ backgroundColor: "#4290B5", height: 50, width: 150, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, justifyContent: "center", alignItems: "center" }}>
                                                                            <Text style={{ color: "#fff" }}>{hostel.hostels[0].hostel_name}</Text>
                                                                            <View style={{ backgroundColor: "white", borderRadius: 10, padding: 5, zIndex: 10, marginBottom: -30, marginTop: 10 }}>
                                                                                {/* <Modals name={hostel.college_name}/> */}
                                                                                <TouchableOpacity onPress={() => {
                                                                                    navigation.navigate('ViewMore', {
                                                                                        collegeName: hostel.college_name,
                                                                                    })
                                                                                }} style={styles.viewmore}>
                                                                                    <Text style={{ color: "#000", fontSize: 12 }}>View more</Text>
                                                                                </TouchableOpacity>
                                                                            </View>
                                                                        </View>
                                                                    </View>

                                                                </View>
                                                                <Text style={{ fontSize: 12, color: "#F26161" }}>From {hostel.college_name}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ borderBottomWidth: 1, borderBottomColor: "#b3e0e5", margin: 15 }} />
                                                        <View style={{ marginLeft: 20 }}>
                                                            <Text style={{ color: "#000066", fontWeight: "bold", fontSize: 12 }}>{hostel.hostels[0].rooms_available} Rooms are left</Text>
                                                            <View style={{ position: "absolute", right: 0, marginRight: 15 }}>
                                                                {
                                                                    hostel.hostels[0].boys && hostel.hostels[0].girls ? 
                                                                    (
                                                                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                                                                            <Text style={{ fontWeight: "bold" }}>Boy's & Girl's Hostel</Text>
                                                                        </View>
                                                                    ) 
                                
                                                                    : 
                                                                    hostel.hostels[0].boys ? 
                                                                    (
                                                                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                                                                            <Text style={{ fontWeight: "bold" }}>Boy's Hostel</Text>
                                                                        </View>
                                                                    ) 
                                                                    : 
                                                                    (
                                                                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                                                                            <Text style={{ fontWeight: "bold" }}>Girl's Hostel</Text>
                                                                        </View>
                                                                    )
                                                                }
                                                            </View>
                                                        </View>
                                                        <View style={{ marginLeft: 20, marginTop: 20 }}>
                                                            <TouchableOpacity onPress={() => {
                                                                navigation.navigate('MapScreen', {
                                                                    hostel_id: hostel.hostels[0].hostel_name,
                                                                    latitude: hostel.hostels[0].latitude,
                                                                    longitude: hostel.hostels[0].longitude,
                                                                    hostel_name: hostel.hostels[0].hostel_name,
                                                                    kms: hostel.hostels[0].kms,
                                                                    college_name: hostel.college_name,
                                                                    description: hostel.hostels[0].description,
                                                                    room_price: hostel.hostels[0].room_price
                                                                })
                                                            }} style={{ backgroundColor: "#b3e0e5", width: 140, height: 35, borderRadius: 30, justifyContent: "center", alignItems: "center" }}>
                                                                <Text style={{ color: "#000066", fontSize: 12 }}>View on map</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View style={{ position: "relative", marginLeft: 20, marginRight: 20, marginTop: 50, backgroundColor: '#00004d', height: 90, borderRadius: 10 }}>
                                                            <View style={[styles.backgroundImage]}>
                                                                <Image source={require('../assets/hostel2.png')} style={{ width: 200, height: 160, marginTop: -10, marginRight: -15 }} />
                                                            </View>

                                                            <Text style={{ color: "white", marginLeft: 20, marginTop: 10 }}>{hostel.hostels[0].manager_name}</Text>
                                                            <Text style={{ color: "white", marginLeft: 20, marginTop: 10 }}>+91 {hostel.hostels[0].helpline_no}</Text>
                                                        </View>
                                                    </View>
                                                )
                                                    :
                                                    (null)
                                            }

                                        </>
                                    ))
                                }

                            </ScrollView>
                        </View>
                    </View>

                </ScrollView>

            </View>
        </View>
    );

}


const HomeStack = createStackNavigator();


const HomeStackScreen = ({ navigation, style }) => {

    return (
        <Animated.View style={[{ flex: 1 }, style]}>
            <HomeStack.Navigator headerMode="none">
                <HomeStack.Screen name="HomeScreen" component={HomeScreen}></HomeStack.Screen>
            </HomeStack.Navigator>
        </Animated.View>
    )
}


export default HomeStackScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchbar: {
        marginLeft: 8,
        marginRight: 8,
    },
    mainContainer: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        marginTop: 45,
        backgroundColor: "transparent",
        justifyContent: "space-between",

    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: -4,
        color: "#ff4d4d"
    },
    itemContainer: {
        height: 120,
        flexDirection: "row",
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderBottomColor: "#e6e6e6",
        marginTop: 10,
    },
    imageContainer: {
        flex: 1,
        justifyContent: "space-around"
    },
    discContainer: {
        flex: 2.5,
    },
    itemName: {
        fontSize: 17,
        fontWeight: "800",
        color: "#262626",
        textAlign: "left",
        marginLeft: 20,
    },
    itemPrice: {

        fontSize: 12,
        fontWeight: "300",
        color: "#4d4d4d",
        textAlign: "left",
        marginLeft: 20,
        marginTop: 10,
    },
    cartButton: {

        width: 150,
        height: 40,
        color: "#262626",
        borderRadius: 30,
        borderStyle: "solid",
        borderColor: "#ff4d4d",
        borderWidth: 1.5,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginLeft: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
    image: {
        flex: 1,
        width: 94,
        height: 100,
        marginRight: 10,
    },
    cardView: {
        flex: 1,
        // width-20
        width: ITEM_WIDTH,
        height: height / 2.3,
        backgroundColor: "#FFFFFF",
        margin: 10,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
        marginBottom: 100
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: "row-reverse",
        flexWrap: "wrap-reverse",
        marginRight: 20
    },
    footer: {
        flex: 3,
        position: "relative",
        backgroundColor: 'red',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    headers: {
        flex: 1.5,
        position: "relative"
    },
    searchbar: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 30,
        backgroundColor: "#054242",
        marginBottom: 20,
    },
    modalContent: {
        backgroundColor: "white",
        width: 350,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
    },
    collegeLogo: {
        marginTop: -50,
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    viewmore: {
        padding: 8,
        backgroundColor: "#f2f2f2",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderRadius: 10,
    }
})