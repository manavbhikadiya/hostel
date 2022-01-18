import React, { useState,useRef, useEffect } from 'react';
import { View,Text,StyleSheet, Button,Dimensions,Image,Linking, TouchableOpacity,RefreshControl } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AsyncStorage from '@react-native-community/async-storage';
import {Icon} from 'react-native-eva-icons';
import { ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';


const {width,height} = Dimensions.get('window');

const DURATION=1000;

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }


const ViewMore = ({navigation,route}) => {

    const [name,setName] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    //rote params
    const {collegeName} = route.params;

    var url = "https://manavapi.herokuapp.com/hostel";

    useEffect(()=>{

        getdata();

    },[]);

    const getdata = () =>{
        
    fetch(`${url}`)
    .then(response => response.json())
    .then(data=>setName(data));        
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => {
            setRefreshing(false),
            getdata();
        });
      }, []);

    return(
        <View style={[styles.container,{backgroundColor:"#ffa64d"}]}> 
            <View style={[styles.header,{backgroundColor:"#ffa64d"}]}>
            <LottieView source={require('../assets/viewmore.json')} style={{position:"absolute",width:270,height:270,bottom:height/3.3,right:10}}  autoPlay loop />
                <TouchableOpacity onPress={()=>navigation.goBack()} >
                    <Icon style={{marginTop:20,marginLeft:30}} name="arrow-back" width={30} height={30} fill="#4d0000" />
                </TouchableOpacity>
                <Animatable.Text style={styles.college}
                    animation="fadeInDown"
                    duration={DURATION}
                >{collegeName}</Animatable.Text>
            </View>
            <Animatable.View style={styles.footer}
                animation="fadeInUp"
                DURATION
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    bouncesZoom={true}
                    refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        progressBackgroundColor="#fff"
                    />
                    }
                >
                <Animatable.View style={styles.buttonContainer}
                    animation="bounceIn"
                    duration={DURATION}
                >
                    <TouchableOpacity onPress={()=>Linking.openURL('tel:6354327745')}  style={[styles.socialButton,{backgroundColor:"#00cc44"}]}>
                        <Icon  name="phone-call" width={23} height={23} fill="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>Linking.openURL('mailto:manavbhikadiya@gmail.com')} style={[styles.socialButton,{backgroundColor:"#ff4d4d"}]}>
                        <Icon  name="email" width={23} height={23} fill="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>Linking.openURL('whatsapp://send? &phone=916354327745')} style={[styles.socialButton,{backgroundColor:"#339966"}]}>
                        <Icon  name="message-circle" width={23} height={23} fill="#fff" />
                    </TouchableOpacity>
                </Animatable.View>
                    {name.map((hostel)=>(
                        collegeName === hostel.college_name ?
                        hostel.hostels.map((hostelname)=>(
                        <Animatable.View style={styles.itemContainer}
                            animation="fadeInUp"
                        >
                            <View style={{width:width/1.2,backgroundColor:"#fff",paddingHorizontal:10,marginTop:5,borderRadius:10,marginBottom:5}}>
                                <View style={{flexDirection:"row"}}>
                                    <Text style={{fontWeight:"bold"}}>{hostelname.hostel_name}</Text>
                                    <Text style={{marginLeft:120,fontSize:20,fontWeight:"bold",color:"#003366"}}>1.3 KM</Text>
                                </View>
                                <View>
                                    <Text>Hostel Manager : {hostelname.manager_name}</Text>
                                    <Text>Contact No: 6353545645</Text>
                                </View>
                            </View>
                            <View style={styles.border}></View>
                        </Animatable.View>
                        ))
                        :null
                    ))}
                </ScrollView>
            </Animatable.View>
        </View>
    );
  }


export default ViewMore;

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    header:{
        flex:1,
    },
    footer:{
        position:"absolute",
        bottom:0,
        width:width,
        height:height/1.5,
        backgroundColor:"#fff",
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        padding:20,
        alignItems:"center"
    }
    ,buttonContainer:{
        flexDirection:'row',
        justifyContent:"center",
        alignItems:"center",
        marginTop:50,
    },
    socialButton:{
        width:60,
        height:60,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:50,
        marginHorizontal:15
    },
    itemContainer:{
        flex:1,
        padding:20,
        marginTop:20,
    },
    border:{
        borderBottomWidth:1,
        borderBottomColor:"#990000",
        marginLeft:40,
        marginRight:40,
    },
    college:{
        marginTop:40,
        marginLeft:30,
        fontSize:30,
        color:"#000066",
        fontWeight:"bold",
    }
})