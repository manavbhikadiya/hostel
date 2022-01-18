import React, { useState,useEffect } from 'react';
import { Text,View,StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-eva-icons';

const Modals = (props) =>{

    const [name,setName] = useState([]);

    var hostelname = [];

    var url = "https://manavapi.herokuapp.com/hostel";

    useEffect(()=>{

        getdata();

    },[]);

    const getdata = () =>{
        
    fetch(`${url}`)
    .then(response => response.json())
    .then(data=>setName(data));        
    }

    const [visible,setVisibility] = useState(false)

    const toggleModal = ()=>{

        if(visible == false){

            setVisibility(true);

        }
        else{
            setVisibility(false);
        }
    }
    
    return(
        <View>
            <Modal isVisible={visible} style={{justifyContent:"center",alignItems:"center"}}

            animationIn="flipInX"
            animationInTiming={800}
            animationOut="flipOutX"
            animationOutTiming={800}
            >
            <View style={styles.modalContent}>
              
                <View style={styles.close} >
                    <Icon name='close'  width={24} height={24} fill="#000" onPress={toggleModal} />
                </View>

                {/* {
                    name.map((hostel,index)=>(
                        hostel.hostels.map((hostelname,index)=>(
                            props.name === hostelname ?
                            <Text>{hostelname.hostel_name}</Text>
                            :
                            <Text>Hostel Not Found</Text>
                        ))
                    ))
                } */}

                <Text style={styles.collegeName}>{props.name}</Text>
                {
                    name.map((hostel)=>(
                        props.name === hostel.college_name ?
                        hostel.hostels.map((hostelname,index)=>(
                            
                            <View key={index} style={{width:300,backgroundColor:"#f2f2f2",paddingHorizontal:10,marginTop:5,borderRadius:10,marginBottom:5,paddingVertical:10}}>
                                <View style={{flexDirection:"row"}}>
                                    <Text style={{fontWeight:"bold"}}>{hostelname.hostel_name}</Text>
                                    <Text style={{marginLeft:100,fontSize:12}}>1.3 KM</Text>
                                </View>
                                <View>
                                    <Text>Hostel Manager : {hostelname.manager_name}</Text>
                                    <Text>Contact No: 6353545645</Text>
                                </View>
                            </View>
                            
                                ))
                            : null                        
                    ))
                }

                <TouchableOpacity style={{backgroundColor:"#99ccff",paddingHorizontal:20,paddingVertical:10,borderRadius:20,marginTop:10,marginBottom:10}}>
                    <Text>Book Hostel Now</Text>
                </TouchableOpacity>
            </View>
            </Modal>
            <View style={styles.textImage}>
                <TouchableOpacity onPress={toggleModal}>
                    <Text style={styles.Title}>View More</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Modals;

const styles = StyleSheet.create({
    modalContent:{
        backgroundColor:"white",
        width:350,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:15,
    },
    textImage:{
        padding:5
    },
    collegeName:{

        color:"#ff4d4d",
        fontSize:20,
        textTransform:"capitalize",
        fontWeight:"bold",
        letterSpacing:1,
        marginTop:10,
    },
    close:{
        marginLeft:280,
        marginTop:25,
        justifyContent:"center",
        alignItems:"center",
        width:30,
        height:30,
        backgroundColor:"#ffcc66",
        borderRadius:50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    }
})