import React, { useState } from 'react';
import { StyleSheet, Text, View, Button,Image,TouchableOpacity,Dimensions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
// import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { Icon } from 'react-native-eva-icons';
import LottieView from 'lottie-react-native';


const {width,height} = Dimensions.get("screen");

const RegisterScreen = ({navigation }) => {

    const [data,setData] = React.useState({
        username:'',
        password:'',
        email:'',
    })

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

    const emailChange = (val) =>{
        if(val.length !== 0){
            setData({
                ...data,
                email:val,
            })
        }
    }

    return (
        <View style={styles.container}>
           {/* <Animatable.Image 
            animation="fadeInUp"
            source={require('../assets/forest.png')} style={styles.imagestyle}/> */}
            <LottieView source={require('../assets/lf30_editor_pt5gthg7.json')} style={{position:"absolute",width:250,height:250,bottom:-12,left:0}}  autoPlay loop />
           <Animatable.View
           animation="flipInX"
           style={styles.loginContainer}>
                <View style={{position:"absolute",backgroundColor:"#F1B4B4",height:100,width:100,borderRadius:25,marginTop:-50,marginLeft:-30}}/>
                <View style={styles.loginsec}>
                    <View style={styles.widgetContainer}>
                        <View style={styles.loginbuttonContainer}>
                            <Animatable.Text 
                            animation="slideInLeft"
                            style={{
                                color:"#228A6B",
                                fontSize:30,
                                fontWeight:"bold",
                                marginLeft:30
                                }}>Sign up
                            </Animatable.Text>
                        </View>
                        <View style={styles.signupbuttonContainer}>
                            <Image source={require('../assets/bulb.png')} style={{marginTop:10,marginLeft:25}}/>
                        </View>
                    </View>
                </View>
                <View style={{
                        position:"absolute",
                        backgroundColor:"#F1B4B4",
                        height:100,
                        width:100,
                        borderRadius:25,
                        marginTop:400,
                        right:-30,
                        }}/>
                <View style={styles.cardbody}>
                    <TextInput
                        placeholder="Username"
                        placeholderTextColor="#228A6B"
                        onChangeText={(val)=>textInputChange(val)}
                        style={{color:"#228A6B",borderBottomWidth:1,marginTop:15,height:50,width:width/1.5,borderBottomColor:"#228A6B"}}
                    />
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#228A6B"
                        onChangeText={(val)=>emailChange(val)}
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
                         onPress={()=>navigation.navigate('SplashScreen')}
                    >
                        <Text style={[styles.text,{color:"#fff"}]}>Sign up</Text>
                    </TouchableOpacity>
                    <View style={styles.socialMediaContainer}>
                    <Icon name='google' style={{margin:15}} width={35} height={35} fill="red"/>
                            <Icon name='facebook' style={{margin:15}} width={35} height={35} fill="#115497"/>
                            <Icon name='twitter' style={{margin:15}} width={35} height={35} fill="#55ACEE"/>
                    </View>
                    
                </View>
            </Animatable.View>
        </View>
    )

}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        alignItems: 'center',
        justifyContent: 'center',
        position:"relative",
    },
    imagestyle: {
        position: "absolute", 
        bottom: 0, 
        width: 205, 
        height: 200, 
        left: 1
    },
    loginContainer:{
        position:"relative",
        borderRadius:25,
        backgroundColor:"#fff",
        marginTop:-100,
        width:width/1.2,
        height:460,
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
        
    },
    cardbody:{
        flex:1,
        backgroundColor:"#fff",
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
        flex:0.5,
        justifyContent:"center",
        alignItems:"center"
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
      fontFamily:"Roboto"
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
    marginTop:20,
    height:100,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    padding:10,
},
})
