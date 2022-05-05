import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeStackScreen from './screens/HomeScreen';
import ProfileStackScreen from './screens/ProfileScreen';
import LikeStackScreen from './screens/LikeScreen';
import SearchStackScreen from './screens/SearchScreen';
import {Icon} from 'react-native-eva-icons';
import {
  faHomeLg,
  faSearch,
  faHeart,
  faBook,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import PrivacyPolicyStackScreen from './screens/SettingsScreen';

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = ({style}) => {
  return (
    // <Animated.View style={style}>
    <Tab.Navigator
      initialRouteName="HomeScreen"
      activeColor="#4290B5"
      inactiveColor="#000066"
      barStyle={{
        position: 'absolute',
        paddingBottom: 0,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        borderStyle: 'solid',
        borderWidth: 0,
        borderRadius: 40,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
      }}
      labeled={false}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#fff',
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon icon={faHomeLg} size={18} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="SearchScreen"
        component={SearchStackScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarColor: '#fff',
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon icon={faSearch} size={18} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="LikeScreen"
        component={LikeStackScreen}
        options={{
          tabBarLabel: 'LikeScreen',
          tabBarColor: '#fff',
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon icon={faHeart} size={18} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyStackScreen}
        options={{
          tabBarLabel: 'PrivacyPolicy',
          tabBarColor: '#fff',
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon icon={faBook} size={18} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="ProfileScreen"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#fff',
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon icon={faUser} size={18} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
    // </Animated.View>
  );
};

export default MainTabScreen;
