import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Onboarding from 'react-native-onboarding-swiper';

const Skip = ({...props}) => {
  return (
    <TouchableOpacity {...props} style={{marginHorizontal: 10}}>
      <Text style={{color: '#000'}}>Skip</Text>
    </TouchableOpacity>
  );
};

const Next = ({...props}) => {
  return (
    <TouchableOpacity {...props} style={{marginHorizontal: 10}}>
      <Text style={{color: '#000'}}>Next</Text>
    </TouchableOpacity>
  );
};

const Done = ({...props}) => {
  return (
    <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
      <Text>Done</Text>
    </TouchableOpacity>
  );
};

const OnBoarding = ({navigation}) => {
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      bottomBarHeight={60}
      showPagination={true}
      controlStatusBar={true}
      bottomBarHighlight={false}
      controlStatusBar={false}
      onSkip={() => navigation.replace('LoginScreen')}
      onDone={() => navigation.navigate('LoginScreen')}
      pages={[
        {
          backgroundColor: '#a6e4d0',
          image: (
            <Image
              style={{width: 250, height: 250}}
              source={require('../assets/sketor.png')}
            />
          ),
          title: 'User-Friendly',
          subtitle: 'Easy to use',
        },

        {
          backgroundColor: '#ffcc66',
          image: (
            <Image
              style={{width: 250, height: 250}}
              source={require('../assets/book.png')}
            />
          ),
          title: 'Relaxed',
          subtitle: 'Feel relaxed Hostelize automatic find hostels',
        },

        {
          backgroundColor: '#e9bcbe',
          image: (
            <Image
              style={{width: 250, height: 250}}
              source={require('../assets/hey.png')}
            />
          ),
          title: 'Admin Support',
          subtitle: 'Owners can manage their hostel with hostelize.com',
        },

        {
          backgroundColor: '#ccccff',
          image: (
            <Image
              style={{width: 350, height: 250}}
              source={require('../assets/hostel2.png')}
            />
          ),
          title: 'Easy Locate',
          subtitle:
            'Find out desired hostel by searching it application provide most of the hostel',
        },
      ]}
    />
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a6e4d0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
