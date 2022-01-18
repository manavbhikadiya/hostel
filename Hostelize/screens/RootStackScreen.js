import React, { useEffect } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import OnBoarding from './OnBoarding'
import AsyncStorage from '@react-native-community/async-storage';
// import { Value } from 'react-native-reanimated';


const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) =>{


    const [isFirstLaunch,setIsFirstLaunch]  = React.useState(null);

    useEffect(()=>{
        AsyncStorage.getItem('alreadyLaunched').then(value =>{
            if(value == null){
                AsyncStorage.setItem('alreadyLaunched','true');
                setIsFirstLaunch(true);
            }
            else{
                setIsFirstLaunch(false)
            }
        })
    },[]);

    if(isFirstLaunch === null){
        return null
    }
    else if(isFirstLaunch === true){
        return(
            <RootStack.Navigator headerMode='none'>
            <RootStack.Screen name="OnBoarding" component={OnBoarding}/>
            <RootStack.Screen name="LoginScreen" component={LoginScreen}/>
            <RootStack.Screen name="RegisterScreen" component={RegisterScreen}/>
            </RootStack.Navigator>
        )
    }
    else{
        return(
            <RootStack.Navigator headerMode='none'>
            <RootStack.Screen name="LoginScreen" component={LoginScreen}/>
            <RootStack.Screen name="RegisterScreen" component={RegisterScreen}/>
            </RootStack.Navigator>
        )
    }


    
    

}

export default RootStackScreen;