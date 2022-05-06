import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Linking,
  TouchableOpacity,
  RefreshControl,
  ImageBackground,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {Icon} from 'react-native-eva-icons';
import {ScrollView} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import {faUser, faPhone} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import axios from 'axios';
import {Rating} from 'react-native-ratings';
import Modals from './Modals';
import AsyncStorage from '@react-native-community/async-storage';

const {width, height} = Dimensions.get('window');

const DURATION = 1000;

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const ViewMore = ({navigation, route}) => {
  const [name, setName] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [isCommentAdded, setIsCommentAdded] = useState(false);
  const [comment, setReview] = useState(null);
  const [commenter_name, setCommenterName] = useState(null);
  const [hostelId, setHostelId] = useState(null);
  //rote params
  const {collegeName} = route.params;

  var url = 'https://hosteldashboards.herokuapp.com/hostel/getAllhostels';

  useEffect(() => {
    getdata();
  }, []);

  const getdata = () => {
    setIsloading(true);
    axios
      .get(`${url}`)
      .then(res => {
        setName(res.data);
        setIsloading(false);
      })
      .catch(e => {
        setIsloading(false);
      });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false), getdata();
    });
  }, []);

  const handleReview = val => {
    setReview(val);
  };

  AsyncStorage.getItem('name')
    .then(res => {
      setCommenterName(res);
    })
    .catch(e => {
      setCommenterName(null);
    });

  const submitReview = hostel_id => {
    setIsCommentAdded(true);
    setHostelId(hostel_id);
    axios
      .post('https://hosteldashboards.herokuapp.com/hostel/addComment', {
        commenter_name,
        comment,
        hostel_id,
      })
      .then(res => {
        setIsCommentAdded(false);
        setReview(null);
      })
      .catch(e => {
        setIsCommentAdded(false);
        setReview(null);
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/darkForest2.jpg')}
        resizeMode="cover"
        style={{width: width, height: height / 2.5}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              style={{marginTop: 20, marginLeft: 30}}
              name="arrow-back"
              width={30}
              height={30}
              fill="#fff"
            />
          </TouchableOpacity>
          <Animatable.Text
            style={styles.college}
            animation="fadeInDown"
            duration={DURATION}>
            {collegeName}
          </Animatable.Text>
        </View>
      </ImageBackground>
      <Animatable.View style={styles.footer} animation="fadeInUp" DURATION>
        {isLoading ? (
          <ActivityIndicator color="#000066" size={40} />
        ) : (
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
            }>
            <Animatable.View
              style={styles.buttonContainer}
              animation="bounceIn"
              duration={DURATION}></Animatable.View>
            {name.map(hostel =>
              collegeName === hostel.college_name
                ? hostel.hostels.map(hostelname => (
                    <Animatable.View
                      style={styles.itemContainer}
                      animation="fadeInUp">
                      <View
                        style={{
                          width: width / 1.2,
                          backgroundColor: '#fff',
                          paddingHorizontal: 10,
                          marginTop: 5,
                          borderRadius: 10,
                          marginBottom: 5,
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={{fontWeight: 'bold', fontSize: 17}}>
                            {hostelname.hostel_name}
                          </Text>
                          <Text
                            style={{
                              marginLeft: 50,
                              fontSize: 20,
                              fontWeight: 'bold',
                              color: '#003366',
                            }}>
                            {hostelname.kms} KM
                          </Text>
                        </View>
                        <View style={styles.detailContainer}>
                          <FontAwesomeIcon
                            icon={faUser}
                            size={18}
                            color="#f38172"
                            style={{marginRight: 8}}
                          />
                          <Text style={styles.detailHeading}>
                            Hostel Manager:{' '}
                          </Text>
                          <Text style={styles.detailNameText}>
                            {hostelname.manager_name}
                          </Text>
                        </View>
                        <View style={styles.detailContainer}>
                          <FontAwesomeIcon
                            icon={faPhone}
                            size={15}
                            color="green"
                            style={{marginRight: 8, marginTop: 2}}
                          />
                          <Text style={styles.detailHeading}>Contact: </Text>
                          <Text style={styles.detailNameText}>
                            {' '}
                            +91 {hostelname.helpline_no}
                          </Text>
                          <TouchableOpacity
                            onPress={() =>
                              Linking.openURL(`tel:${hostelname.helpline_no}`)
                            }
                            style={[
                              styles.socialButton,
                              {backgroundColor: '#00cc44'},
                            ]}>
                            <FontAwesomeIcon
                              icon={faPhone}
                              size={15}
                              color="#fff"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={styles.girlsandboys}>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('MapScreen', {
                              hostel_id: hostelname.hostel_name,
                              latitude: hostelname.latitude,
                              longitude: hostelname.longitude,
                              hostel_name: hostelname.hostel_name,
                              kms: hostelname.kms,
                              college_name: hostel.college_name,
                              description: hostelname.description,
                              room_price: hostelname.room_price
                            });
                          }}>
                          <View style={styles.mapButton}>
                            <Text style={styles.mapText}>View on Map</Text>
                          </View>
                        </TouchableOpacity>
                        {hostelname.girls && hostelname.boys ? (
                          <Text>Girl's & Boy's Hostel</Text>
                        ) : hostelname.boys ? (
                          <Text>Boy's Hostel</Text>
                        ) : (
                          <Text>Girl's Hostel</Text>
                        )}
                        <Text style={styles.detailHeading}>
                          ₹{hostelname.room_price}/ year
                        </Text>
                      </View>
                      <View style={styles.writeReviewContainer}>
                        <TextInput
                          style={styles.input}
                          placeholder="Write your review..."
                          placeholderTextColor={'#000'}
                          onChangeText={val => handleReview(val)}
                          value={comment}
                        />
                        {isCommentAdded && hostelname._id == hostelId ? (
                          <ActivityIndicator color="#000066" size={30} />
                        ) : (
                          <TouchableOpacity
                            style={styles.postButton}
                            onPress={() => submitReview(hostelname._id)}>
                            <Text style={styles.postText}>Post</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                      <View style={styles.comment}>
                        <Rating
                          type="custom"
                          style={{
                            paddingVertical: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          ratingColor="#000066"
                          ratingTextColor="red"
                          imageSize={20}
                        />
                        <Modals
                          college_id={hostel._id}
                          hostel_id={hostelname._id}
                        />
                      </View>

                      <View style={styles.border}></View>
                    </Animatable.View>
                  ))
                : null,
            )}
          </ScrollView>
        )}
      </Animatable.View>
    </View>
  );
};

export default ViewMore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
  },
  footer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 1,
    marginTop: -50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  socialButton: {
    width: 50,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  itemContainer: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#990000',
    marginLeft: 40,
    marginRight: 40,
  },
  college: {
    marginTop: 40,
    marginLeft: 30,
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  detailContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  detailHeading: {
    color: '#000',
    fontWeight: 'bold',
  },
  mapButton: {
    width: 100,
    height: 35,
    backgroundColor: '#4290B5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#999999',
    shadowOffset: {
      width: 0,
      height: 12,
      shadowOpacity: 0.58,
      shadowRadius: 16.0,
      elevation: 24,
    },
  },
  mapText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  comment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemContainer: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#990000',
    marginLeft: 40,
    marginRight: 40,
  },
  college: {
    marginTop: 40,
    marginLeft: 30,
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  detailContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  detailHeading: {
    color: '#000',
    fontWeight: 'bold',
  },
  mapButton: {
    width: 100,
    height: 35,
    backgroundColor: '#4290B5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#999999',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  mapText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  girlsandboys: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  writeReviewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    width: width / 1.5,
    height: 40,
    margin: 12,
    padding: 10,
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    color: '#737373',
  },
  postButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  postText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000066',
  },
});
