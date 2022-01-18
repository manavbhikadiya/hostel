import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, Dimensions, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
// import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../component/Context';
import { Icon } from 'react-native-eva-icons';
import LottieView from 'lottie-react-native';

const {width,height} = Dimensions.get("window");



const LoginScreen = ({ navigation }) => {

    const [data,setData] = React.useState({
        username:'',
        password:''
    })

    const {signIn} = React.useContext(AuthContext);

    const textInputChange=(val) =>{

        if(val.length !== 0){
            setData({
                ...data,
                username:val
            })
        }

    }

    const passwordChange = (val) =>{
        if(val.length !== 0){
            setData({
                ...data,
                password:val,
            })
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.slider}>
            <Image source={require('../assets/hostelback.jpg')} 
                style={styles.fixed}
            />        
            <View style={styles.header}>
                <View style={styles.textConatiner}>
                    <Text style={styles.appname}>Where is my</Text>
                    <Text style={styles.appname}>hostel</Text>
                    <Text style={styles.tagline}>check into another world</Text>
                </View>
            </View>
            </View>
            <View style={styles.footer}>
                <View style={{...StyleSheet.absoluteFillObject,backgroundColor:"#228A6B",opacity:0.9}}/>
                
                <View style={{position:"relative",flex:1,backgroundColor:"white",borderTopLeftRadius:75,justifyContent:"center",alignItems:"center"}}>
                    <Image source={require('../assets/location.png')} style={styles.imagestyle} />
                    <LottieView source={require('../assets/building.json')} style={{position:"absolute",width:270,height:270,bottom:-30,left:-20}}  autoPlay loop />

                    <Animatable.View style={styles.loginContainer}
                    animation="flipInX"
                    >
                        <View style={styles.loginsec}>
                            <View style={styles.widgetContainer}>
                                <Text style={{color:"#F26161",fontSize:30,fontWeight:"bold",letterSpacing:0.5,marginTop:5}}>Welcome!</Text>
                            </View>
                        </View>
                        <View style={styles.cardbody}>
                            <TextInput
                                placeholder="Username"
                                placeholderTextColor="#228A6B"
                                onChangeText={(val)=>textInputChange(val)}
                                style={{color:"#228A6B",borderBottomWidth:1,marginTop:15,height:50,width:width/1.5,borderBottomColor:"#228A6B"}}
                            />
                            <TextInput
                                placeholder="Password"
                                placeholderTextColor="#228A6B"
                                secureTextEntry={true}
                                onChangeText={(val)=>passwordChange(val)}
                                style={{color:"#228A6B",borderBottomWidth:1,marginTop:15,height:50,width:width/1.5,borderBottomColor:"#228A6B"}}
                            />
                            <TouchableOpacity style={[styles.loginbutton,{width:156,marginTop:25}]}
                                onPress={()=>{signIn()}}
                            >
                                <Text style={[styles.text,{color:"#fff"}]}>Login</Text>
                            </TouchableOpacity>
                            <Text
                                style={{marginTop:20,color:"#228A6B"}}
                                onPress={()=>navigation.navigate('RegisterScreen')}
                                >Not register yet? <Text style={{color:"#F26161"}}>Register Now</Text></Text>
                            <View style={styles.socialMediaContainer}>
                            <Icon name='google' style={{margin:15}} width={35} height={35} fill="red"/>
                            <Icon name='facebook' style={{margin:15}} width={35} height={35} fill="#115497"/>
                            <Icon name='twitter' style={{margin:15}} width={35} height={35} fill="#55ACEE"/>
                            </View>
                        </View>
                    </Animatable.View>
                </View>
            </View>
        </View>
    )

}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    slider:{
        height:260,
        backgroundColor:"#228A6B",
        borderBottomRightRadius:75,
        position:"relative"
    },
    footer:{
        flex:1,
    },
    imagestyle: {
        position: "absolute", 
        bottom: -24, 
        width: 200, 
        height: 200, 
        right: 0
    },
    loginContainer:{
        borderRadius:25,
        backgroundColor:"#fff",
        marginTop:-260,
        width:width/1.2,
        height:450,
        shadowColor: "#f2f2f2",
        shadowOffset:{
        width: 0,
        height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    loginsec:{
        borderRadius:25,
        display:"flex",
        backgroundColor:"#fff",
        flexDirection:"column",
        width:width/1.2,
        height:80,
        
    },
    widgetContainer:{
        flex:1,
        height:50,
        backgroundColor:"#fff",
        display:"flex",
        flexDirection:"row",
        margin:20,
        justifyContent:"center",
        alignItems:"center",
        
    },
    cardbody:{
        flex:1,
        backgroundColor:"#fff",
        overflow:"hidden",
        borderBottomLeftRadius:25,
        borderBottomRightRadius:25,
        alignItems:"center"
    },
    loginbuttonContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    signupbuttonContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        
    },
    loginbutton:{
        backgroundColor:"#228A6B",
        width:99,
        height:32,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:30,
    },
    signupbutton:{
        backgroundColor:"#fff",
        width:99,
        height:32,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:30,
    },
    text:{
        fontSize:14,
        fontWeight:"bold"
    },
    
 fixed: {
    position: 'absolute',
    overflow:"hidden",
    width:"100%",
    height:"100%",
    borderBottomRightRadius:75,
  },
  header:{
    backgroundColor:"#228A6B",
    opacity:0.8,
    flex:1,
    borderBottomRightRadius:75,
    display:"flex",
    justifyContent:"flex-start",
    alignItems:"flex-end",
  },
  textConatiner:{
      marginTop:50,
      marginRight:50
  },
  appname:{
      color:"#fff",
      fontSize:25,
      fontWeight:"bold",
      fontFamily:"Roboto",
  },
  tagline:{
    color:"#F1A790",
    fontSize:12,
    letterSpacing:2,
    textTransform:"uppercase",
    marginTop:10,
    fontWeight:"bold",
},
textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
},
socialMediaContainer:{
    backgroundColor:"#fff",
    marginTop:10,
    height:100,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    padding:10,
},
})
