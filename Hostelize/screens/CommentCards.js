import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const CommentCards = () => {
  return (
    <View style={styles.commentSection}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{fontWeight: 'bold'}}>Manav Bhikadiya</Text>
      </View>
      <View>
        <Text>
          This hostel is amazing. They provide all the amenities that they shows
          in the application.
        </Text>
      </View>
    </View>
  );
};
export default CommentCards;
const styles = StyleSheet.create({
  commentSection: {
    width: 300,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
    marginTop: 5,
    borderRadius: 10,
    marginBottom: 5,
    paddingVertical: 10,
  },
});
