import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Animated from 'react-native-reanimated';
import MainTabScreen from '../MainTabScreen';
import ViewMore from './ViewMoreScreen';
import MapScreen from './MapScreen';
import PaymentScreen from './PaymentScreen';

const ScreenStack = createStackNavigator();

const Screen = ({navigation, style}) => {
  return (
    <Animated.View
      style={[{flex: 1, overflow: 'hidden', elevation: 50}, style]}>
      <ScreenStack.Navigator headerMode="none">
        <ScreenStack.Screen name="HomeDrawer" component={MainTabScreen} />
        <ScreenStack.Screen name="ViewMore" component={ViewMore} />
        <ScreenStack.Screen name="MapScreen" component={MapScreen} />
        <ScreenStack.Screen name="PaymentScreen" component={PaymentScreen} />
      </ScreenStack.Navigator>
    </Animated.View>
  );
};

export default Screen;
