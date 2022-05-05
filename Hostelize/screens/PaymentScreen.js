import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  PixelRatio,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import {Icon} from 'react-native-eva-icons';
import CreditCardDisplay from 'react-native-credit-card-display';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window');

const scale = width / 320;

const normalize = size => {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

const PaymentScreen = ({route, navigation}) => {
  const {room_price, hostel_name} = route.params;

  const [cardNumber, setCardNumber] = useState(null);
  const [date, setDate] = useState(null);
  const [cvv, setCvv] = useState(null);
  const [cardHolderName, setCardHolderName] = useState(null);

  const handleCardNumber = cardNumbers => {
    setCardNumber(cardNumbers);
  };

  const handleCvv = Cvv => {
    setCvv(Cvv);
  };

  const handleDate = dateValid => {
    setDate(dateValid);
  };

  const handleHolderName = holderName => {
    setCardHolderName(holderName);
  };

  const payment = () => {
    Alert.alert(
      'Success',
      'Your Hostel is Bookd now. You will get your payment reciept shortly.',
      [{text: 'OK', onPress: () => navigation.navigate('HomeScreen')}],
    );
  };

  return (
    <>
      <View style={styles.paymentScreenContainer}>
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
        <View style={styles.paymentScreenBodyContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Book now</Text>
          </View>
          <Text style={{marginTop: 20, fontWeight: 'bold', color: '#000066'}}>
            Total Price: ₹{room_price}/year
          </Text>
        </View>
        <View style={styles.paymentCardContainer}>
          {!cardNumber || !date || !cvv || !cardHolderName ? (
            <CreditCardDisplay
              number={4242424242424242}
              cvc={800}
              expiration="11/25"
              name="John J. Doe"
              since="2004"
              width={width - 30}
              flipped={false}
              fontSize={20}
            />
          ) : (
            <CreditCardDisplay
              number={cardNumber}
              cvc={cvv}
              expiration="11/25"
              name={cardHolderName}
              since="2004"
              width={width - 30}
              flipped={false}
              fontSize={20}
            />
          )}
        </View>

        <View style={[styles.paymentScreenBodyContainer, {marginTop: 30}]}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Card Details</Text>
          </View>
        </View>
        <View style={[styles.paymentCardContainer, {marginTop: 20}]}>
          <TextInput
            style={styles.input}
            placeholderTextColor={'#000'}
            placeholder="Card Number"
            keyboardType="numeric"
            value={cardNumber}
            onChangeText={val => handleCardNumber(val)}
            maxLength={16}
          />
          <View style={styles.validThru}>
            <TextInput
              style={styles.validThruInput}
              placeholderTextColor={'#000'}
              placeholder="Date / year"
              keyboardType="numeric"
              value={date}
              onChangeText={val => handleDate(val)}
            />
            <TextInput
              style={styles.validThruInput}
              placeholderTextColor={'#000'}
              placeholder="CVV"
              keyboardType="numeric"
              maxLength={3}
              value={cvv}
              onChangeText={val => handleCvv(val)}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholderTextColor={'#000'}
            placeholder="Card Holder Name"
            keyboardType="text"
            value={cardHolderName}
            onChangeText={val => handleHolderName(val)}
          />
          <TouchableOpacity onPress={payment}>
            <View style={styles.paymentButton}>
              <Text style={styles.paymentText}>Pay Now</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default PaymentScreen;
const styles = StyleSheet.create({
  paymentScreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    marginTop: 45,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  //Nearby section container
  paymentScreenBodyContainer: {
    marginTop: 10,
    paddingHorizontal: 30,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: normalize(21),
    fontStyle: 'normal',
    color: '#232323',
    fontWeight: 'bold',
  },
  paymentCardContainer: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: wp(85),
    height: 40,
    margin: 12,
    padding: 10,
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    color: '#000066',
  },
  validThru: {
    flexDirection: 'row',
  },
  validThruInput: {
    width: 150,
    height: 40,
    margin: 12,
    padding: 10,
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    color: '#000066',
  },
  paymentButton: {
    width: wp(70),
    height: hp(4.8),
    backgroundColor: '#000066',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#999999',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    marginTop: 50,
  },
  paymentText: {
    color: '#fff',
    fontSize: normalize(14.5),
    fontWeight: 'bold',
  },
});
