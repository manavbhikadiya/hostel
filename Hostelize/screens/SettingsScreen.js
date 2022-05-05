import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Actionsheet from './Actionsheet';
import {Icon} from 'react-native-eva-icons';
import ProfileStackScreen from './ProfileScreen';
import HomeStackScreen from './HomeScreen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AsyncStorage from '@react-native-community/async-storage';

const Tab = createMaterialTopTabNavigator();

const PrivacyPolicy = ({navigation}) => {
  useEffect(() => {
    AsyncStorage.getItem('somekey')
      .then(req => JSON.parse(req))
      .then(json => console.log(json))
      .catch(error => console.log('error!'));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          style={{marginLeft: 20}}
          name="menu"
          fill="#000000"
          width={25}
          height={25}
          onPress={() => navigation.openDrawer()}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.PoliciesContainer}>
          <Text style={styles.privacyPolcy}>Privacy policy</Text>
          <Text style={styles.human}>HUMAN-FRIENDLY</Text>
          <View style={styles.humancontainer}>
            <Text style={styles.text}>
              Our human-friendly Terms of Service for the Tribevibe platform
              prevails over the detailed one, which specifies all rights and
              obligations for both you and Tribevibe in more complex legalese.
            </Text>
            <Text style={[styles.text, {marginTop: 30}]}>
              In the event of a contradiction between the two documents, the
              "human-friendly" Terms of Service shall prevail. That means no
              nasty surprises if you read only the human-friendly version.
            </Text>
          </View>
          <Text style={styles.human}>Last Upadted: June 24 ,2021</Text>
          <Text style={styles.admin}>Admin</Text>
          <Text style={styles.adminsection}>
            Hostel oweners can register their application with the hostelize. We
            provide free service to join our community. Click on the following
            link
          </Text>
          <Text
            style={[styles.adminsection, {color: '#0000b3', marginTop: 0}]}
            onPress={() =>
              Linking.openURL('https://manavbhikadiya.github.io/Laravel/')
            }>
            https://hosteldashboards.herokuapp.com/
          </Text>
          <Text style={[styles.adminsection]}>
            Admin can handle their hostel data in this website theyy can enter
            the college name hostel name and other services to make it visible
            to the students
          </Text>
          <Text style={styles.admin}>Updates</Text>
          <Text style={[styles.adminsection]}>
            Automatically update the data of the application whenever there is
            something change in the application it will automatically reflect.
            UI & UX design Updates should be given by the playstore.
          </Text>

          <Text style={styles.admin}>Feedback</Text>
          <View style={styles.feedbackContainer}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Email."
                placeholderTextColor="#000066"
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                style={[styles.textArea, styles.TextInput]}
                underlineColorAndroid="transparent"
                placeholder="Type something"
                placeholderTextColor="#000066"
                numberOfLines={10}
                multiline={true}
              />
            </View>

            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => {
                Linking.openURL('mailto:manavbhikadiya@gmail.com');
              }}>
              <Icon name="email" width={25} height={25} fill="#fff" />
              <Text style={styles.loginText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const PrivacyPolicyStack = createStackNavigator();

const PrivacyPolicyStackScreen = ({navigation}) => {
  return (
    <PrivacyPolicyStack.Navigator headerMode="none">
      <PrivacyPolicyStack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}></PrivacyPolicyStack.Screen>
    </PrivacyPolicyStack.Navigator>
  );
};

export default PrivacyPolicyStackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    marginTop: 45,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: -4,
    color: '#ff4d4d',
  },
  PoliciesContainer: {
    flex: 1,
  },
  privacyPolcy: {
    fontSize: 30,
    color: '#3f3d56',
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
  },
  human: {
    marginTop: 10,
    color: '#b3b3b3',
    marginLeft: 20,
    fontWeight: '100',
  },
  humancontainer: {
    margin: 20,
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
  },
  text: {
    color: '#00004d',
    fontSize: 15,
  },
  admin: {
    color: '#3f3d56',
    marginTop: 15,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  adminsection: {
    margin: 20,
    color: '#666666',
  },
  inputView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '70%',
    height: 45,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color: '#000066',
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    flexDirection: 'row',
    width: '50%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#000066',
  },
  loginText: {
    color: '#fff',
    marginLeft: 10,
  },
  feedbackContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#f2f2f2',
    margin: 20,
    padding: 20,
    borderRadius: 8,
    marginBottom: 100,
  },
});
