import { createStackNavigator } from '@react-navigation/stack';
import React, { useState,useEffect } from 'react';
import { RefreshControl,View,Text,StyleSheet,Image, Dimensions } from 'react-native';
import { ScrollView,TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-eva-icons';
import LottieView from 'lottie-react-native';
import Modals from './Modals';
import Animated, { color } from 'react-native-reanimated';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const {width,height} = Dimensions.get('screen');

const SPACING = 10;
const ITEM_WIDTH = width-100;

const COLORS = ["#79a6d2","#ff884d","#85adad","#ff3377","#d966ff","#e67300","#7575a3","#cc6699","#3f3d56"];
var INDEX = 0;
var BG_COLOR;
const HomeScreen =  ({navigation}) =>{



// try run




    var url = "https://manavapi.herokuapp.com/hostel";

    const [name,setName] = useState([]);
    const [isLoading,setIsloading] = useState(true);
   

    useEffect(()=>{
        getdata();
        sendData();
        setTimeout(async() => {
            setIsloading(false);
        },5000);
    },[]);    

    const ename="Manav";
    const email="manav@gmail.com";

    const sendData = async() =>{

        const res = await fetch('http://192.168.160.102:8000/add',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:ename,
                email:email
            })
        });
        
        if(res){
            console.log("Data send successfully");
        }else{
            console.log("Data not send successsfully");
        }

// axios.post('http://localhost:8000/add', { name:ename,email:email })
//         .then(response => console.log(response.data));


    }



    const getdata = () =>{
        
    fetch(`${url}`)
    .then(response => response.json())
    .then(data=>setName(data));
    }
    if(isLoading){
        return(
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <LottieView source={require('../assets/lf30_editor_nkzu6xve.json')} autoPlay loop />
            </View>
        )
    }
    
    const getColor = () =>{
        if(COLORS.length-1 == INDEX){
            INDEX = 0;
        }
        else{
            INDEX++;
        }
        BG_COLOR = COLORS[INDEX];

        return BG_COLOR
    }

    return(
       <View style={{width,height}}>
           
            <View style={styles.container}>
               <ScrollView style={{backgroundColor:"#228A6B"}}
               showsVerticalScrollIndicator={false}
               >
                    <View style={styles.header}> 
                            <TouchableOpacity>
                                    {/* <MaterialCommunityIcons style={{marginLeft:20}} name="menu" color="white" size={25} onPress={()=>navigation.openDrawer()}/> */}
                                    {/* <MaterialCommunityIcons name="rocket" size={30} color="#900" /> */}
                                    <Icon name='menu' style={{marginLeft:20}} width={24} height={24} fill="#fff" onPress={()=>navigation.openDrawer()} />
                            </TouchableOpacity>
                    </View>
                  <View style={{backgroundColor:"#228A6B",height:250}}>
                       <Text style={{color:"white",fontSize:25,fontWeight:"bold",marginLeft:20,marginTop:20,letterSpacing:0.8}}>Where is My</Text>
                       <Text style={{color:"white",fontSize:25,fontWeight:"bold",marginLeft:20,letterSpacing:0.3}}>Hostel?</Text>
                      <View style={{marginTop:25}}>

                        <Image source={require('../assets/hostel3.png')} style={{width:300,height:200,marginTop:-50}}/>
                      </View>
                   </View>
                       
                   <View style={{backgroundColor:"#fff",borderTopLeftRadius:40,borderTopRightRadius:40,flex:1}}>
                        
                        <View style={{marginLeft:25,borderBottomColor:"#000033",borderBottomWidth:3,width:100,marginTop:20}} >
                             <Text style={{color:"#000033",fontWeight:"bold"}}>Top Colleges</Text> 
                        </View>

                        <View style={{marginTop:25}}>

                            <ScrollView 
                                horizontal
                                scrollEnabled
                                scrollEventThrottle={16} 
                                decelerationRate="fast" 
                                snapToAlignment="center" 
                                snapToInterval={ITEM_WIDTH+SPACING*2}
                                showsHorizontalScrollIndicator={false} 
                                contentContainerStyle={{
                                    paddingRight:width - ITEM_WIDTH - SPACING * 2,
                                }}
                                bounces={false}
                                style={{marginBottom:height/7.5,marginLeft:10}}
                                >
                                
                                {
                                    name.map((hostel,index)=>(
                                        getColor(),
                                        <View style={styles.cardView} key={index}>
                                    <View>
                                    <View style={{marginLeft:20,marginTop:20}}>
                                        <View style={{flexDirection:"row"}}>
                                                <Text style={{fontSize:40,color:"#228A6B",fontWeight:"bold"}}>3.2</Text>
                                                <Text style={{marginTop:32,marginLeft:5,fontWeight:"bold",color:"#228A6B"}}>KM</Text>
                                                <View style={{flex:1,flexDirection:"row-reverse"}}>
                                                    <View style={{backgroundColor:BG_COLOR,height:50,width:150,borderTopLeftRadius:10,borderBottomLeftRadius:10,justifyContent:"center",alignItems:"center"}}>
                                                    <Text style={{color:"#fff"}}>{hostel.hostels[0].hostel_name}</Text>
                                                    <View style={{backgroundColor:"white",borderRadius:10,padding:5,zIndex:10,marginBottom:-30,marginTop:10}}>
                                                        {/* <Modals name={hostel.college_name}/> */}
                                                        <TouchableOpacity onPress={()=>{navigation.navigate('ViewMore',{
                                                            collegeName : hostel.college_name,
                                                        })}} style={styles.viewmore}>
                                                            <Text style={{color:"#000",fontSize:12}}>View more</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    </View>
                                                </View>
                                                
                                        </View>
                                            <Text style={{fontSize:12,color:"#F26161"}}>From {hostel.college_name}</Text> 
                                    </View>
                                    </View>
                                    <View style={{borderBottomWidth:1,borderBottomColor:"#228A6B",margin:15}}/>
                                    <View style={{marginLeft:20}}>
                                            <Text style={{color:"#228A6B",fontWeight:"bold",fontSize:12}}>8 Rooms are left</Text>
                                        <View style={{position:"absolute",right:0,marginRight:15}}>
                                            <View style={{justifyContent:"center",alignItems:"center"}}>
                                               <Text style={{fontWeight:"bold"}}>Boy's Hostel</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{marginLeft:20,marginTop:20}}>
                                        <TouchableOpacity onPress={()=>{navigation.navigate('ViewMore',{
                                            collegeName : hostel.college_name,
                                            color : BG_COLOR,
                                        })}} style={{backgroundColor:"#F26161",width:140,height:35,borderRadius:30,justifyContent:"center",alignItems:"center"}}>
                                            <Text style={{color:"white",fontSize:12}}>View on map</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{position:"relative",marginLeft:20,marginRight:20,marginTop:50,backgroundColor:BG_COLOR,height:90,borderRadius:10}}>
                                        <View style={[styles.backgroundImage]}>
                                            <Image source={require('../assets/hostel2.png')} style={{width:200,height:160,marginTop:-10,marginRight:-15}}/>
                                        </View>
                                    
                                        <Text style={{color:"white",marginLeft:20,marginTop:10}}>Naren Patel</Text>
                                        <Text style={{color:"white",marginLeft:20,marginTop:10}}>+91 63 543 277 45</Text>  
                                    </View>
                                </View>
                                    ))
                                }

                            </ScrollView>
                        </View>
                    </View>
                        
                </ScrollView>
                    
            </View>
       </View>
    );

}


const HomeStack = createStackNavigator();


const HomeStackScreen = ({navigation,style}) =>{

    return(
        <Animated.View style={[{flex:1},style]}>
            <HomeStack.Navigator headerMode="none">
                <HomeStack.Screen name="HomeScreen" component={HomeScreen}></HomeStack.Screen>
            </HomeStack.Navigator>
        </Animated.View>
    )
}


export default HomeStackScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#228A6B",
        
    },
    searchbar:{
        marginLeft:8,
        marginRight:8,
    },
    mainContainer:{
        flex:1,
    },
    header:{
        flexDirection:"row",
        marginTop:45,
        backgroundColor:"#228A6B",
        justifyContent:"space-between",
         
    },
    title:{
        fontSize:20,
        fontWeight:"bold",
        marginTop:-4,
        color:"#ff4d4d"
    },
    itemContainer:{
        height:120,
        flexDirection:"row",
        borderStyle:"solid",
        borderBottomWidth:1,
        borderBottomColor:"#e6e6e6",
        marginTop:10,
    },
    imageContainer:{
        flex:1,
        justifyContent:"space-around"
    },
    discContainer:{
        flex:2.5,
    },
    itemName:{
        fontSize:17,
        fontWeight:"800",
        color:"#262626",
        textAlign:"left",
        marginLeft:20,
    },
    itemPrice:{

        fontSize:12,
        fontWeight:"300",
        color:"#4d4d4d",
        textAlign:"left",
        marginLeft:20,
        marginTop:10,
    },
    cartButton:{

        width:150,
        height:40,
        color:"#262626",
        borderRadius:30,
        borderStyle:"solid",
        borderColor:"#ff4d4d",
        borderWidth:1.5,
        backgroundColor:"white",
        justifyContent:"center",
        alignItems:"center",
        marginTop:10,
        marginLeft:20,
        paddingLeft:10,
        paddingRight:10,
        paddingTop:10,
        paddingBottom:10,
    },
    image:{
        flex:1,
        width:94,
        height:100,
        marginRight:10,
    },
    cardView:{
        flex:1,
        // width-20
        width:ITEM_WIDTH,
        height:height/2.3,
        backgroundColor:"#FFFFFF",
        margin:10,
        borderRadius:30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        
        elevation: 8,
        marginBottom:100
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection:"row-reverse",
        flexWrap:"wrap-reverse",
        marginRight:20
      },
      footer: {
        flex: 3,
        position:"relative",
        backgroundColor: 'red',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    headers: {
        flex: 1.5,
        position:"relative"
    },
    searchbar:{
        marginTop:20,
        marginLeft:20,
        marginRight:20,
        borderRadius:30,
        backgroundColor:"#054242",
        marginBottom:20,
    },
    modalContent:{
        backgroundColor:"white",
        width:350,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:15,
    },
    collegeLogo:{
    marginTop:-50,
    width:100,
    height:100,
    borderRadius:50,
    backgroundColor:"white",
    justifyContent:"center",
    alignItems:"center"
},
viewmore:{
    padding:8,
    backgroundColor:"#f2f2f2",
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
borderRadius:10,
}
})