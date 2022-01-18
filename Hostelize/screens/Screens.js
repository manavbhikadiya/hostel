import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Animated from 'react-native-reanimated';
import MainTabScreen from '../MainTabScreen';
import HomeScreen from './HomeScreen';
// import HomeStackScreen from './HomeScreen';
import OnBoarding from './OnBoarding'
import ViewMore from './ViewMoreScreen';


const ScreenStack = createStackNavigator();

const Screen = ({navigation,style}) =>{
    return(
        <Animated.View style={[{flex:1,overflow:"hidden",elevation:50 },style]} >
            <ScreenStack.Navigator headerMode="none">
                <ScreenStack.Screen name="HomeDrawer" component={MainTabScreen}/>
                <ScreenStack.Screen name="ViewMore" component={ViewMore}/>
            </ScreenStack.Navigator>
        </Animated.View>
    )
}

export default Screen;