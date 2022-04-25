import React, { useState } from 'react';
import { StyleSheet, Text, View, Button,Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';

const SplashScreen = ({ navigation }) => {

    return (
       
            <View style={styles.container}>  
                
                <Animatable.Text 
                animation="bounceInUp"
                style={styles.tagname}>
                where is my hostel
                </Animatable.Text>
                <Animatable.Text 
                animation="slideInLeft"
                style={styles.tagline}>check into another world</Animatable.Text>
                <Text style={styles.powerdby}>powerd by kathiyawadi coders</Text>
               
            </View>    
    )

}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    tagname:{
        color:"#000066",
        fontSize:30,
    },
    tagline:{
        color:"#000",
        fontSize:12,
        letterSpacing:2,
        textTransform:"uppercase",
        marginTop:10,
    },
    powerdby:{
        color:"#000066",
        fontSize:10,
        position:"absolute",
        bottom:10,
    }
})
