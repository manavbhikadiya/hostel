//@ refresh reset

import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, Alert} from 'react-native';
import {DrawerItem} from '@react-navigation/drawer';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Text,
  Drawer,
  TouchableRipple,
  Switch,
  useTheme,
} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import {AuthContext} from './component/Context';
import {Icon} from 'react-native-eva-icons';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const {width, height} = Dimensions.get('window');

const DrawerContent = ({props, navigation}) => {
  const {signOut} = React.useContext(AuthContext);

  const [image, setImage] = useState('https://picsum.photos/200');
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);

  AsyncStorage.getItem('imagepath')
    .then(req => JSON.parse(req))
    .then(json => setImage(json))
    .catch(error => Alert.alert(error));

  AsyncStorage.getItem('userID')
    .then(res => {
      setUserId(res);
    })
    .catch(e => {
      setUserId(null);
    });

  AsyncStorage.getItem('name')
    .then(res => {
      setName(res);
    })
    .catch(e => {
      setName(null);
    });

  AsyncStorage.getItem('email')
    .then(res => {
      setEmail(res);
    })
    .catch(e => {
      setEmail(null);
    });

  useEffect(() => {
    getUserId();
  }, []);

  const getUserId = async () => {
    const id = await AsyncStorage.getItem('userID');
    setUserId(id);
  };

  const takePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 70,
      height: 70,
      cropping: true,
    }).then(image => {
      // setImage(image.path);
      AsyncStorage.setItem('imagepath', JSON.stringify(image.path));
      axios
        .post(`https://hosteldashboards.herokuapp.com/user/upload/${userId}`)
        .then(res => {
          navigation.navigate('HomeScreen');
        })
        .catch(e => {
          navigation.navigate('HomeScreen');
        });
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity>
          <Icon
            name="close"
            fill="#000"
            width={25}
            height={25}
            style={{marginLeft: 10}}
            onPress={() => navigation.closeDrawer()}
          />
        </TouchableOpacity>
        <Title style={styles.title}>HostelX</Title>
      </View>
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 0}}>
        <Animatable.View style={styles.circle} animation="bounceIn">
          <Avatar.Image
            source={{
              uri: image,
            }}
            size={75}
          />
          <View style={{position: 'absolute', bottom: -5, right: -10}}>
            <TouchableOpacity onPress={takePhotoFromLibrary}>
              <Icon name="camera" width={35} height={35} fill="#000066" />
            </TouchableOpacity>
          </View>
        </Animatable.View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 15,
          }}>
          <Text style={[styles.title, {marginRight: -10}]}>{name}</Text>
          <Caption style={styles.caption}>{email}</Caption>
        </View>
      </View>
      <View style={{marginTop: 20}}>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({color, size}) => (
              <Icon
                name="home"
                fill="#ff4d4d"
                width={25}
                height={25}
                style={{marginLeft: 10}}
              />
            )}
            label={() => <Text style={{color: '#000066'}}>Home</Text>}
            onPress={() => {
              navigation.navigate('HomeScreen');
            }}
          />

          <DrawerItem
            icon={({color, size}) => (
              <Icon
                name="smiling-face"
                fill="#7070db"
                width={25}
                height={25}
                style={{marginLeft: 10}}
              />
            )}
            label={() => <Text style={{color: '#000066'}}>Profile</Text>}
            onPress={() => {
              navigation.navigate('ProfileScreen');
            }}
          />

          <DrawerItem
            icon={({color, size}) => (
              <Icon
                name="book-open"
                fill="#669999"
                width={25}
                height={25}
                style={{marginLeft: 10}}
              />
            )}
            label={() => <Text style={{color: '#000066'}}>Privacy</Text>}
            onPress={() => {
              navigation.navigate('PrivacyPolicy');
            }}
          />

          <DrawerItem
            icon={({color, size}) => (
              <Icon
                name="heart"
                fill="#595959"
                width={25}
                height={25}
                style={{marginLeft: 10}}
              />
            )}
            label={() => <Text style={{color: '#000066'}}>Likes</Text>}
            onPress={() => {
              navigation.navigate('LikeScreen');
            }}
          />

          <DrawerItem
            icon={({color, size}) => (
              <Icon
                name="search"
                fill="#9933ff"
                width={25}
                height={25}
                style={{marginLeft: 10}}
              />
            )}
            label={() => <Text style={{color: '#000066'}}>Search</Text>}
            onPress={() => {
              navigation.navigate('SearchScreen');
            }}
          />
        </Drawer.Section>

        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            icon={({color, size}) => (
              <Icon
                name="log-out"
                fill="#595959"
                width={25}
                height={25}
                style={{marginLeft: 10}}
              />
            )}
            label={() => <Text style={{color: '#000066'}}>Logout</Text>}
            onPress={() => {
              signOut();
            }}
          />
        </Drawer.Section>
      </View>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 25,
  },
  title: {
    fontSize: 16,
    marginTop: 0,
    fontWeight: 'bold',
    color: '#3f3d56',
    marginRight: 10,
  },
  caption: {
    fontSize: 11,
    lineHeight: 14,
  },
  row: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginLeft: 0,
    marginTop: 15,
  },
  bottomDrawerSection: {
    bottom: 0,
    marginLeft: 0,
  },
  preferences: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  container: {
    flex: 1,
    backgroundColor: '#b3e0e5',
  },
  slider: {
    height: 125,
    backgroundColor: '#b3e0e5',
    borderBottomRightRadius: 70,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: '#b3e0e5',
    borderTopLeftRadius: 70,
    // justifyContent:"center",
    alignItems: 'center',
  },
  circle: {
    width: 85,
    height: 85,
    backgroundColor: '#fff',
    borderRadius: 50,
    marginTop: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
