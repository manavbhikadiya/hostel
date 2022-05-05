import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  PixelRatio,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Icon} from 'react-native-eva-icons';
import {ScrollView} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const {width, height} = Dimensions.get('window');

const scale = width / 320;

const normalize = size => {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const LikeScreen = ({route, navigation}) => {
  const [userId, setUserId] = useState(null);
  const [favHostels, setFavHostels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    getUserId();
    getFavouriteData();
  }, []);

  const getUserId = async () => {
    const id = await AsyncStorage.getItem('userID');
    setUserId(id);
  };
  getUserId();

  const getFavouriteData = async () => {
    setIsLoading(true);
    axios
      .get(
        `https://hosteldashboards.herokuapp.com/hostel/getFavouriteHostels/626105b7d617fb1a97addd12`,
      )
      .then(res => {
        setFavHostels(res.data);
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
      });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      getFavouriteData();
    });
  }, []);

  return (
    <View style={styles.HomeScreenContainer}>
      <View style={styles.header}>
        <Icon
          style={{marginLeft: 20}}
          name="menu"
          fill="#000000"
          width={25}
          height={25}
          onPress={() => navigation.openDrawer()}
        />
      </View>
      <View style={styles.nearBySectionContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#000066', '#3F3D56', '#F26161']}
              progressBackgroundColor="#fff"
            />
          }>
          <View style={styles.NearByViewAll}>
            <Text style={styles.headerText}>Favourites</Text>
          </View>
          {isLoading ? (
            <ActivityIndicator color="#000066" size={40} />
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              {favHostels?.map((hostels, index) => (
                <TouchableOpacity>
                  <View style={styles.nearbyCard} key={index}>
                    <View style={styles.heartContainer}>
                      <FontAwesomeIcon
                        style={styles.heartIcon}
                        icon={faHeart}
                      />
                    </View>
                    <View style={styles.nearbyHostelImageContainer}>
                      <Image
                        style={styles.nearbyHostelImage}
                        source={{uri: hostels.hostel_image}}
                      />
                    </View>
                    <View style={styles.nearBydescription}>
                      <Text style={styles.hostelName}>
                        {hostels.hostel_name}
                      </Text>
                      <View style={styles.priceContainer}>
                        <Text style={styles.priceText}>
                          ₹{hostels.room_price} / Year
                        </Text>
                      </View>
                      <View style={styles.roomsAvailableContainer}>
                        <Text style={styles.roomsAvailableText}>
                          {hostels.rooms_available} Rooms Available
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const LikeStack = createStackNavigator();

const LikeStackScreen = ({navigation}) => {
  return (
    <LikeStack.Navigator headerMode="none">
      <LikeStack.Screen
        name="LikeScreen"
        component={LikeScreen}></LikeStack.Screen>
    </LikeStack.Navigator>
  );
};

export default LikeStackScreen;

const styles = StyleSheet.create({
  HomeScreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    marginTop: 45,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  //Nearby section container
  nearBySectionContainer: {
    marginTop: 10,
    paddingHorizontal: 30,
  },
  NearByViewAll: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: normalize(21),
    fontStyle: 'normal',
    color: '#232323',
    fontWeight: 'bold',
  },
  viewAllText: {
    color: '#bfbfbf',
    fontSize: normalize(16),
    fontStyle: 'normal',
  },
  nothingContainer: {
    height: height / 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newSearchButton: {
    width: width / 2,
    height: 40,
    backgroundColor: '#f38172',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 8,
  },
  newSearchText: {
    fontSize: normalize(14),
    fontWeight: 'bold',
    color: '#fff',
  },
  searchImage: {
    width: 150,
    height: 100,
  },
  nearbyCard: {
    marginTop: 25,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  nearbyHostelImageContainer: {
    width: wp(30),
    height: hp(15),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nearbyHostelImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  nearBydescription: {
    width: wp(50),
    height: hp(10),
    padding: 10,
    marginLeft: 10,
    borderRadius: 20,
  },
  hostelName: {
    fontSize: normalize(16),
    fontStyle: 'normal',
    color: '#242424',
    fontWeight: 'bold',
  },
  priceContainer: {
    marginTop: 20,
  },
  priceText: {
    fontSize: normalize(14),
    fontWeight: 'bold',
    color: '#737373',
  },
  roomsAvailableContainer: {
    marginTop: 10,
  },
  roomsAvailableText: {
    color: '#333333',
  },
  heartContainer: {
    width: wp(8),
    height: wp(8),
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  heartIcon: {
    color: '#ff8080',
  },
});
