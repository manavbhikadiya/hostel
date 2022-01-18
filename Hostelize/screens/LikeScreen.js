import { NavigationContainer, useLinkProps } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { View,Text,StyleSheet,Dimensions,Image, ImageBackground,Animated } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { Button } from 'react-native-paper';
import { Icon } from 'react-native-eva-icons';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Modals from './Modals';


const {width,height} = Dimensions.get("window")

const ITEM_SIZE = 320
var scale;

const LikeScreen =  ({route,navigation}) =>{

    const scrollY = React.useRef(new Animated.Value(0)).current;


    const [data,setData] = useState([]);

    var url = "https://manavapi.herokuapp.com/hostel";


    useEffect(()=>{
        getdata();
    },[]);


    const getdata = () =>{
        
        fetch(`${url}`)
        .then(response => response.json())
        .then(data=>setData(data));
    }

    const setInputRange = (val) =>{
        const inputRange = [
            -1,
            0,
            ITEM_SIZE * val,
            ITEM_SIZE * (val + 2)
        ]
    
        scale = scrollY.interpolate({
            inputRange,
            outputRange:[1,1,1,0]
        })  
     }
    
    return(
        <View style={styles.container}> 
            <View style={styles.header}>
            <Icon style={{marginLeft:20}} name='menu' fill="#000000" width={25} height={25} onPress={()=>navigation.openDrawer()}/>
            </View>
            <View style={{flex:1}}>
                <Animated.ScrollView
                 onScroll={Animated.event(
                    [{ nativeEvent:{contentOffset:{y:scrollY}}}],
                    {useNativeDriver:true}
                )}
                >
                    {
                        data.map((hostel,index)=>(
                            setInputRange(index),
                            <Animated.View style={[styles.card,{transform:[{scale}]}]}>
                                <Text>Hello</Text>
                            </Animated.View>
                        ))
                    }
                </Animated.ScrollView>
            </View>
     </View>
    );
}

const LikeStack = createStackNavigator();


const LikeStackScreen = ({navigation}) =>{

    return(
        <LikeStack.Navigator headerMode="none">
            <LikeStack.Screen name="LikeScreen" component={LikeScreen}></LikeStack.Screen>
        </LikeStack.Navigator>
    )
}

export default LikeStackScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        // justifyContent:"center",
        // alignItems:"center",
        backgroundColor:"#fff"
    },
    header:{
        flexDirection:"row",
        marginTop:45,
        backgroundColor:"#fff",
        justifyContent:"space-between",
    
    },
    title:{
        fontSize:20,
        fontWeight:"bold",
        marginTop:-4,
        color:"#ff4d4d"
    },
    bodyContainer:{
        flex:1,
    },
    image:{
        width:"100%",
        height:200,
        resizeMode: 'cover'
    },
   card:{
       backgroundColor:"red",
       height:300,
       marginTop:20,
   }
})