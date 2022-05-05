import React, {useEffect, useState} from 'react';
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
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const {width, height} = Dimensions.get('window');
import {createStackNavigator} from '@react-navigation/stack';
import {Icon} from 'react-native-eva-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const scale = width / 320;

const normalize = size => {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

const ProfileScreen = ({navigation}) => {
  const [initialData, setInitialData] = useState([]);
  const [username, setUserName] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [email, setEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [profileImage, setImage] = useState('https://picsum.photos/200');

  AsyncStorage.getItem('imagepath')
    .then(req => JSON.parse(req))
    .then(json => setImage(json))
    .catch(error => Alert.alert(error));

  const handleEmail = email => {
    setEmail(email);
  };

  const handleuserName = userName => {
    setUserName(userName);
  };

  const handleMobile = mobile => {
    setMobile(mobile);
  };

  AsyncStorage.getItem('userID')
    .then(res => {
      setUserId(res);
    })
    .catch(e => {
      setUserId(null);
    });

  useEffect(() => {
    getUserData();
  }, [userId]);

  const getUserData = () => {
    setIsDataLoading(true);
    axios
      .get(`https://hosteldashboards.herokuapp.com/user/getUserData/${userId}`)
      .then(res => {
        setInitialData(res.data);
        setIsDataLoading(false);
      })
      .catch(e => {
        Alert.alert('Error Occure', 'Please try again later.', [
          {
            text: 'Cancel',
            onPress: () => navigation.navigate('HomeScreen'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => navigation.navigate('HomeScreen')},
        ]);
        setIsDataLoading(false);
      });
  };

  const submitData = () => {
    setIsLoading(true);
    axios
      .post(`https://hosteldashboards.herokuapp.com/user/update/${userId}`, {
        name: username,
        email: email,
        mobile: mobile,
      })
      .then(res => {
        Alert.alert('Success', 'Profile Updated', [
          {
            text: 'Cancel',
            onPress: () => navigation.navigate('HomeScreen'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => navigation.navigate('HomeScreen')},
        ]);
        setIsLoading(false);
      })
      .catch(() => {
        Alert.alert(
          'Authenticaion Error',
          'Unable to Signup. Please try again later.',
          [
            {
              text: 'Cancel',
              onPress: () => navigation.navigate('HomeScreen'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => navigation.navigate('HomeScreen')},
          ],
        );
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.container}>
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.HeadingContainer}>
          <Text style={styles.headingText}>Profile Setting</Text>
        </View>
        <View style={styles.profileImageContainer}>
          {initialData ? (
            <View style={styles.profileImage}>
              <Image
                source={{uri: profileImage}}
                style={styles.profile_image}
              />
            </View>
          ) : (
            <View style={styles.profileImage}>
              <Image
                source={require('../assets/profile_1.jpeg')}
                style={styles.profile_image}
              />
            </View>
          )}
        </View>
        {isDataLoading ? (
          <ActivityIndicator color="#000066" size={40} />
        ) : (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholderTextColor={'#000'}
              placeholder="Name"
              defaultValue={initialData.name}
              value={username}
              onChangeText={val => handleuserName(val)}
            />
            <TextInput
              style={styles.input}
              placeholderTextColor={'#000'}
              placeholder="Email"
              defaultValue={initialData.email}
              value={email}
              onChangeText={val => handleEmail(val)}
            />
            <TextInput
              style={styles.input}
              placeholderTextColor={'#000'}
              placeholder="Mobile"
              defaultValue={initialData.mobile}
              value={mobile}
              onChangeText={val => handleMobile(val)}
            />
            <TouchableOpacity onPress={submitData}>
              {isLoading ? (
                <Animated.View style={styles.loginButton}>
                  <ActivityIndicator color="#fff" size={30} />
                </Animated.View>
              ) : (
                <Animated.View style={styles.loginButton}>
                  <Text style={styles.signInText}>Update Profile</Text>
                </Animated.View>
              )}
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const ProfileStack = createStackNavigator();

const ProfileStackScreen = ({navigation, route}) => {
  return (
    <ProfileStack.Navigator headerMode="none">
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}></ProfileStack.Screen>
    </ProfileStack.Navigator>
  );
};

export default ProfileStackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    marginTop: 45,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  HeadingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  headingText: {
    fontSize: normalize(21),
    fontStyle: 'normal',
    color: '#232323',
    fontWeight: 'bold',
    marginLeft: 20,
  },
  profileImageContainer: {
    width: width,
    height: hp(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
  profile_image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  formContainer: {
    alignItems: 'center',
  },
  input: {
    width: wp(85),
    height: 40,
    margin: 12,
    padding: 10,
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    color: '#737373',
  },
  loginButton: {
    width: wp(60),
    height: hp(4.8),
    marginBottom: 50,
    backgroundColor: '#000066',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    shadowColor: '#999999',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    marginTop: 15,
  },
  signInText: {
    color: '#fff',
    fontSize: normalize(14.5),
    fontWeight: 'bold',
  },
});
