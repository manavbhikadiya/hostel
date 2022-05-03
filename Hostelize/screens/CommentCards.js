import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const CommentCards = (props) => {
  return (
    <View style={styles.commentSection}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{fontWeight: 'bold'}}>{props.commenter_name}</Text>
      </View>
      <View>
        <Text>
          {props.comment}
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
