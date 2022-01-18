//@ refresh
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState,useEffect } from 'react';
import { RefreshControl,View,Text,StyleSheet,Image, Dimensions,Animated,ScrollView, TouchableOpacity, TextInput, Linking } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import * as Animatable from 'react-native-animatable';


const {width,height} = Dimensions.get('screen');

var BG_COLOR = "#fff" 

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

const SearchScreen =  ({navigation}) =>{


    const [name,setName] = useState([]);
   
    const [data,setData] = useState({
        search:''
    });

    const [refreshing, setRefreshing] = React.useState(false);

    const Search = (val) =>{
        if(val.length !== 0){
            setData({
                ...data,
                search:val,
            })
        }
    }

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
        setRefreshing(false)
        setData({
            ...data,
            search:'',
        })    
    });
  }, []);

  
    return(
        <View style={styles.container}>
            <Image source={require('../assets/hostelback.jpg')} style={styles.backgroundImage} blurRadius={80} />
            <View style={styles.header}>
                <Icon style={{marginLeft:20}} name='menu' fill="#000000" width={25} height={25} onPress={()=>navigation.openDrawer()}/>
                <TextInput
                        placeholder="Search"
                        placeholderTextColor="#fff"
                        autoCompleteType="name"
                        onChangeText={(val)=>Search(val)}
                        style={{color:"#fff",borderBottomWidth:1.5,marginTop:-10,height:50,width:width-100,borderBottomColor:"#fff",marginLeft:20,}}
                    />
            </View>
            <View style={{flex:1}}>
                
                <ScrollView
                showsVerticalScrollIndicator={false}
                style={{backgroundColor:"transparent"}}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={["#228A6B", "#3F3D56", "#F26161"]}
                        progressBackgroundColor="#fff"
                    />
                    }
                >
                    {
                        name.filter((hostel,index)=>{
                            if(data.search == ''){
                                return hostel
                            }else if(hostel.college_name.toLowerCase().includes(data.search.toLowerCase())){
                                return hostel
                            }
                        }).map((hostel)=>(
                            hostel.hostels.map((hostels,index)=>(
                                <View style={styles.cardcontainer} key={index}>
                                <Animatable.View style={[styles.fixed,{padding:1}]}
                                    animation="fadeInUp"
                                >
                                    <Image style={{width:120,height:120}} source={require('../assets/tree.png')}/>
                                </Animatable.View>
                                    <View style={styles.sections}>
                                        <Text style={styles.collegename}>{hostel.college_name}</Text>
                                        <Text style={styles.hostelname}>{hostels.hostel_name}</Text>
                                        <Text style={styles.roomleft}>8 rooms are left</Text>
                                        <Text style={styles.managername}>{hostels.manager_name}</Text>
                                    </View>
                                    <View style={styles.sections}>
                                        <Text style={styles.km}>3.2km</Text>
                                        <Text style={styles.from}>From {hostel.college_name}</Text>
                                        <View style={{flexDirection:"row",marginTop:20}}>
                                                <Icon name='phone' fill="#228A6B" width={15} height={15}/>    
                                            <Text style={styles.helpline}>Help Line</Text>
                                        </View>
                                        <Text style={styles.contactnumber}>+91{hostel.helpline_no}</Text>
                                       
                                            <TouchableOpacity style={styles.callNow} onPress={()=>Linking.openURL(`tel:${hostel.helpline_no}`)} >
                                                <Icon name="phone-call" width={20} height={20} fill="#fff" />
                                                <Text style={{fontSize:12,marginLeft:10,fontWeight:"bold"}}>Call Now</Text>
                                            </TouchableOpacity>
                                        
                                    </View>
                                    <Animatable.View style={[styles.sections,{alignItems:"center"}]}
                                        animation="bounceIn"
                                    >
                                        <TouchableOpacity onPress={()=>navigation.navigate('ProfileScreen',{
                                            latitude: 27.7215,
                                            longitude: 85.32,
                                            latitudeDelta: 0.09,
                                            longitudeDelta: 0.0921,
                                            name:hostel.college_name,
                                        })} style={{backgroundColor:"#F26161",width:120,height:35,borderRadius:30,justifyContent:"center",alignItems:"center"}}>
                                            <Text style={{color:"white",fontSize:12}}>View on map</Text>
                                        </TouchableOpacity>
                                    </Animatable.View>
                                </View>
                            ))
                        ))
                    }
                    
                </ScrollView>
            </View>
        </View>
    );
}

const SearchStack = createStackNavigator();


const SearchStackScreen = ({navigation,route}) =>{

    return(
        <SearchStack.Navigator headerMode="none">
            <SearchStack.Screen name="SearchScreen" component={SearchScreen}>
            </SearchStack.Screen>
        </SearchStack.Navigator>
    )
}


export default SearchStackScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",
    },
    header:{
        flexDirection:"row",
        marginTop:45,
        backgroundColor:"transparent",
        
    },
    title:{
        fontSize:20,
        fontWeight:"bold",
        marginTop:-4,
        color:"#ff4d4d"
    },
    cardcontainer:{
        position:"relative",
        flexDirection:"row",
        padding:15,
        marginTop:20,
        borderRadius:10,
        backgroundColor:'rgba(255,255,255,1.2)',
        opacity:0.8,
        elevation:10,
        margin:15,
    },
    sections:{
        flex:1,
        backgroundColor:"transparent",
    },
    collegename:{
        color:"#228A6B",
        fontSize:18,
        fontWeight:"bold",
        textTransform:"uppercase"
    },
    hostelname:{
        color:"#666699",
        fontSize:15,
        marginTop:5,
        fontWeight:"bold",
    },
    roomleft:{
        color:"#ff4d4d",
        fontWeight:"bold",
        fontSize:12,
        marginTop:8,
    },
    km:{
        color:"#3f3d56",
        fontSize:20,
        fontWeight:"bold",
    },
    from:{
        color:"#9494b8",
        fontSize:13,
        marginTop:3
    },
    searchBar:{
        backgroundColor:"#fff",
        marginTop:20,
        marginBottom:10,
        elevation:24,
        padding:5,
        justifyContent:"center",
        alignItems:"center",
        height:65
    },
    managername:{
        fontSize:14,
        marginTop:5.5,
        color:"#000",
        fontWeight:"200"
    },
    helpline:{
        color:"#000",
        fontSize:15,
        marginTop:-5,
        fontWeight:"300",
        marginLeft:10,
    },
    fixed: {
        position: 'absolute',
        right:10,
        bottom:0
      },
      callNow:{
          flexDirection:"row",
          justifyContent:"center",
          alignItems:"center",
          height:35,
          marginTop:10,
          padding:10,
          backgroundColor:"#33cc33",
          borderRadius:30,
          shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width:width,
        height:height
      },
})