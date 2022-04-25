//@ refresh
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { RefreshControl, View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';


const { width, height } = Dimensions.get('screen');

var BG_COLOR = "#fff"

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const SearchScreen = ({ navigation }) => {

    const [name, setName] = useState([]);
    const [data, setData] = useState({
        search: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const [refreshing, setRefreshing] = React.useState(false);

    const Search = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                search: val,
            })
        }
    }

    var url = "https://hosteldashboards.herokuapp.com/hostel/getAllhostels";

    useEffect(() => {
        getdata();
    }, []);

    const getdata = () => {
        setIsLoading(true);
        // fetch(`${url}`)
        //     .then(response => response.json())
        //     .then(data => setName(data));
        axios.get(`${url}`)
            .then((res) => {
                setName(res.data);
                setIsLoading(false)
            })
            .catch((e) => {
                setIsLoading(false);
            })
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => {
            setRefreshing(false)
            getdata();
            setData({
                ...data,
                search: '',
            })
        });
    }, []);


    return (
        <View style={styles.container}>
            {/* <Image source={require('../assets/hostelback.jpg')} style={styles.backgroundImage} blurRadius={80} /> */}
            <View style={styles.header}>
                <Icon style={{ marginLeft: 20 }} name='menu' fill="#000000" width={25} height={25} onPress={() => navigation.openDrawer()} />
                <TextInput
                    placeholder="Search"
                    placeholderTextColor="#000066"
                    autoCompleteType="name"
                    onChangeText={(val) => Search(val)}
                    style={{ color: "#fff", borderBottomWidth: 1.5, marginTop: -10, height: 50, width: width - 100, borderBottomColor: "#000066", marginLeft: 20, }}
                />
            </View>
            <View style={{ flex: 1,justifyContent:"center" }}>

                {
                    isLoading ? (<ActivityIndicator color="#000066" size={40} />)
                        : (
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                style={{ backgroundColor: "transparent" }}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={onRefresh}
                                        colors={["#000066", "#3F3D56", "#F26161"]}
                                        progressBackgroundColor="#fff"
                                    />
                                }
                            >
                                {
                                    name.filter((hostel, index) => {
                                        if (data.search == '') {
                                            return hostel
                                        } else if (hostel.college_name.toLowerCase().includes(data.search.toLowerCase())) {
                                            return hostel
                                        }
                                    }).map((hostel) => (
                                        hostel.hostels.map((hostels, index) => (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    navigation.navigate('ViewMore', {
                                                        collegeName: hostel.college_name,
                                                    })
                                                }}
                                                style={{ backgroundColor: "#fff" }}
                                            >
                                                <View style={styles.cardcontainer} key={index}>
                                                    <Animatable.View style={styles.sections}
                                                        animation="fadeInUp"
                                                    >
                                                        <Image style={{ width: 100, height: 100, borderRadius: 20, marginBottom: 10 }} source={{ uri: hostels.hostel_image }} />
                                                    </Animatable.View>
                                                    <View style={[styles.sections, { paddingLeft: 10 }]}>
                                                        <Text style={styles.collegename}>{hostel.college_name}</Text>
                                                        <Text style={styles.hostelname}>{hostels.hostel_name}</Text>
                                                        <Text style={styles.roomleft}>{hostels.rooms_available} rooms are left</Text>
                                                        <Text style={styles.managername}>{hostels.manager_name}</Text>
                                                    </View>
                                                    <View style={[styles.sections, { paddingLeft: 10 }]}>
                                                        <Text style={styles.km}>{hostels.kms} km</Text>
                                                        <Text style={styles.from}>From {hostel.college_name}</Text>
                                                        <View style={{ flexDirection: "row", marginTop: 20 }}>
                                                            <Icon name='phone' fill="#000066" width={15} height={15} />
                                                            <Text style={styles.helpline}>Help Line</Text>
                                                        </View>
                                                        <Text style={styles.contactnumber}>+91{hostels.helpline_no}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        ))
                                    ))
                                }

                            </ScrollView>
                        )
                }
            </View>
        </View>
    );
}

const SearchStack = createStackNavigator();


const SearchStackScreen = ({ navigation, route }) => {

    return (
        <SearchStack.Navigator headerMode="none">
            <SearchStack.Screen name="SearchScreen" component={SearchScreen}>
            </SearchStack.Screen>
        </SearchStack.Navigator>
    )
}


export default SearchStackScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        marginTop: 45,
        backgroundColor: "transparent",

    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: -4,
        color: "#ff4d4d"
    },
    cardcontainer: {
        position: "relative",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        opacity: 0.8,
        elevation: 10,
        margin: 15,
    },
    sections: {
        flex: 1,
        backgroundColor: "transparent",
    },
    collegename: {
        color: "#000066",
        fontSize: 18,
        fontWeight: "bold",
        textTransform: "uppercase"
    },
    hostelname: {
        color: "#666699",
        fontSize: 15,
        marginTop: 5,
        fontWeight: "bold",
    },
    roomleft: {
        color: "#ff4d4d",
        fontWeight: "bold",
        fontSize: 12,
        marginTop: 8,
    },
    km: {
        color: "#3f3d56",
        fontSize: 20,
        fontWeight: "bold",
    },
    from: {
        color: "#9494b8",
        fontSize: 13,
        marginTop: 3
    },
    searchBar: {
        backgroundColor: "#fff",
        marginTop: 20,
        marginBottom: 10,
        elevation: 24,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        height: 65
    },
    managername: {
        fontSize: 14,
        marginTop: 5.5,
        color: "#000",
        fontWeight: "200"
    },
    helpline: {
        color: "#000",
        fontSize: 15,
        marginTop: -5,
        fontWeight: "300",
        marginLeft: 10,
    },
    fixed: {
        position: 'absolute',
        right: 10,
        bottom: 0
    },
    callNow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 35,
        marginTop: 10,
        padding: 10,
        backgroundColor: "#33cc33",
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: width,
        height: height
    },
})