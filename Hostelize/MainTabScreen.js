import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeStackScreen from './screens/HomeScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileStackScreen from './screens/ProfileScreen';
import SettingsStackScreen from './screens/SettingsScreen';
import LikeStackScreen from './screens/LikeScreen';
import SearchStackScreen from './screens/SearchScreen';
import { Image,View,StyleSheet,Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import Animated from 'react-native-reanimated';
import PrivacyPolicyStackScreen from './screens/SettingsScreen';


const Tab = createMaterialBottomTabNavigator();

 
const MainTabScreen = ({style}) =>{

    return(
        // <Animated.View style={style}>
             <Tab.Navigator
            initialRouteName="HomeScreen"
            activeColor="#ff4d4d"
            inactiveColor="#228A6B"
            barStyle={{
                position:"absolute",
                paddingBottom:0,
                marginLeft:20,
                marginRight:20,
                marginBottom:20,
                borderStyle:"solid",
                borderWidth:12,
                borderRadius:40,
                borderColor:"#fff",
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 7,
                },
                shadowOpacity: 0.43,
                shadowRadius: 9.51,
                elevation: 15,

            }}
            labeled={false}
            >
          
           <Tab.Screen name="HomeScreen" component={HomeStackScreen}
                options={{
                tabBarLabel: 'Home',
                tabBarColor:'#fff',
                tabBarIcon: ({ color }) => (
                // <MaterialCommunityIcons name="home-outline" color={color} size={23} />
                <Icon name='home' width={24} height={24} fill={color}/>
                ),
            }}
            />

            <Tab.Screen name="SearchScreen" component={SearchStackScreen}
                options={{
                tabBarLabel: 'Search',
                tabBarColor:'#fff',
                tabBarIcon: ({ color }) => (
                <Icon name='search' width={24} height={24} fill={color}/>
                ),
            }}
            />

            <Tab.Screen name="LikeScreen" component={LikeStackScreen}
                options={{
                tabBarLabel: 'LikeScreen',
                tabBarColor:'#fff',
                tabBarIcon: ({ color }) => (
                // <MaterialCommunityIcons name="heart" color={color} size={24} />
                <Icon name='heart' width={24} height={24} fill={color}/>
                // <Image source={require('./assets/building.png')} style={{width:100,height:100,marginTop:-50}}/>
                ),
            }}
            
            />

            <Tab.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyStackScreen}
                options={{
                tabBarLabel: 'PrivacyPolicy',
                tabBarColor:'#fff',
                tabBarIcon: ({ color }) => (
                // <MaterialCommunityIcons name="settings-outline" color={color} size={24} />
                <Icon name='book-open' width={24} height={24} fill={color}/>
                ),
            }}
            />

            <Tab.Screen name="ProfileScreen" component={ProfileStackScreen}
                options={{
                tabBarLabel: 'Profile',
                tabBarColor:'#fff',
                tabBarIcon: ({ color }) => (
                // <MaterialCommunityIcons name="face-profile" color={color} size={24} />
                <Icon name='map' width={24} height={24} fill={color}/>

                ),
            }}
            />           
            </Tab.Navigator>
        // </Animated.View>
    );

}

export default MainTabScreen;
