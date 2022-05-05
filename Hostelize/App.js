import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import RootStackScreen from './screens/RootStackScreen';
import SplashScreen from './screens/SplashScreen';
import {AuthContext} from './component/Context';
import Animated from 'react-native-reanimated';
import Screens from './screens/Screens';
import AsyncStorage from '@react-native-community/async-storage';

const Drawer = createDrawerNavigator();

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  const [progress, setProgress] = useState(new Animated.Value(0));

  console.disableYellowBox = true;

  useEffect(() => {
    isUserLogin();
  });

  const isUserLogin = async () => {
    try {
      const userID = await AsyncStorage.getItem('userID');
      if (userID != null) {
        setUserToken(userID);
      } else {
        setUserToken(null);
      }
    } catch (error) {
      console.log(error);
      setUserToken(null);
    }
  };

  const authContext = React.useMemo(
    () => ({
      signIn: async () => {
        const userID = await AsyncStorage.getItem('userID');
        if (userID != null) {
          setUserToken(userID);
        } else {
          setUserToken(null);
        }
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userID');
          setUserToken(null);
        } catch (error) {
          console.log(error);
        }
      },
      signUp: async () => {
        const userID = await AsyncStorage.getItem('userID');
        if (userID != null) {
          setUserToken(userID);
        } else {
          setUserToken(null);
        }
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        <SplashScreen />
      </View>
    );
  }

  // LogBox.ignoreAllLogs()

  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 40],
  });
  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  const ScreenStyle = {borderRadius, transform: [{scale}]};

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken !== null ? (
          <Drawer.Navigator
            drawerType="slide"
            overlayColor="transparent"
            drawerStyle={{width: '50%'}}
            contentContainerStyle={{flex: 1}}
            drawerContentOptions={{
              activeBackgroundColor: 'transparent',
              activeTintColor: 'red',
              inactiveTintColor: 'red',
              labelStyle: {
                color: '#000066',
              },
            }}
            sceneContainerStyle={{
              backgroundColor: '#b3e0e5',
            }}
            drawerContent={props => {
              setProgress(props.progress);
              return <DrawerContent {...props} />;
            }}>
            <Drawer.Screen name="HomeDrawer">
              {props => <Screens {...props} style={ScreenStyle} />}
            </Drawer.Screen>
          </Drawer.Navigator>
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
