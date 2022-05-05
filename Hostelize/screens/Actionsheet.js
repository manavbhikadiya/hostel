import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Animated} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Icon} from 'react-native-eva-icons';

const {width, height} = Dimensions.get('screen');

const Actionsheet = ({navigation}) => {
  const [alignment] = useState(new Animated.Value(0));
  const [toVal, setToval] = useState(1);

  const [arrow, setArrow] = useState('md-arrow-up');

  const bringUpActionsheet = () => {
    Animated.timing(alignment, {
      toValue: toVal,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const actionsheetInterpolate = alignment.interpolate({
    inputRange: [0, 1],
    outputRange: [-height / 2 + 140, 0],
  });

  const actionsheetStyle = {
    bottom: actionsheetInterpolate,
  };

  const gestureHandler = e => {
    if (toVal == 1) {
      setToval(0);
      bringUpActionsheet();
      setArrow('chevron-down');
    } else {
      setToval(1);
      bringUpActionsheet();
      setArrow('chevron-up');
    }
  };

  return (
    <Animated.View style={[styles.container, actionsheetStyle]}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity onPress={e => gestureHandler(e)}>
          <View style={styles.grabber}>
            <Icon
              name="book"
              fill="#000000"
              width={25}
              height={25}
              onPress={bringUpActionsheet}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginLeft: 10,
          marginRight: 10,
          marginTop: 10,
          backgroundColor: 'red',
        }}>
        <ScrollView>
          <View style={{backgroundColor: 'yellow'}}>
            <Text>Hello</Text>
          </View>
        </ScrollView>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height / 2,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 20,
    backgroundColor: '#cce6ff',
    marginHorizontal: 2,
  },
  grabber: {
    position: 'relative',
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: '#ff4d4d',
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Actionsheet;
