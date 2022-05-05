import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon} from 'react-native-eva-icons';
import CommentCards from './CommentCards';
import axios from 'axios';

const {width, height} = Dimensions.get('screen');

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Modals = props => {
  const [visible, setVisibility] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const toggleModal = () => {
    if (visible == false) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  };

  useEffect(() => {
    getAllComments();
  }, []);

  const getAllComments = () => {
    setIsLoading(true);
    axios
      .get(
        `https://hosteldashboards.herokuapp.com/hostel/getComments/${props.college_id}/${props.hostel_id}`,
      )
      .then(res => {
        setComments(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        console.log('error');
        setIsLoading(false);
      });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      getAllComments();
      setRefreshing(false);
    });
  }, []);

  return (
    <View>
      <Modal
        isVisible={visible}
        style={{justifyContent: 'center', alignItems: 'center'}}
        animationIn="flipInX"
        animationInTiming={800}
        animationOut="flipOutX"
        animationOutTiming={800}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.commentsHeading}>Comments</Text>
            <View style={styles.close}>
              <Icon
                name="close"
                width={24}
                height={24}
                fill="#fff"
                onPress={toggleModal}
              />
            </View>
          </View>
          <View style={styles.scrollContainer}>
            {isLoading ? (
              <ActivityIndicator color="#000066" size={40} />
            ) : (
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={['#000066', '#3F3D56', '#F26161']}
                    progressBackgroundColor="#fff"
                  />
                }>
                {comments.length != 0 ? (
                  comments.map((comments, index) => (
                    <CommentCards
                      key={index}
                      commenter_name={comments.commenter_name}
                      comment={comments.comment}
                    />
                  ))
                ) : (
                  <Text style={styles.emptyComments}>No Comments found</Text>
                )}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
      <View style={styles.textImage}>
        <TouchableOpacity onPress={toggleModal}>
          <Text style={styles.Title}>View All Comments</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Modals;

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    width: width - 50,
    height: height / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  textImage: {
    padding: 5,
  },
  commentsHeading: {
    color: '#000066',
    fontSize: 20,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 10,
  },
  close: {
    marginLeft: 0,
    marginTop: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    backgroundColor: '#000066',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  header: {
    flexDirection: 'row',
    width: 250,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  commentSection: {
    width: 300,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
    marginTop: 5,
    borderRadius: 10,
    marginBottom: 5,
    paddingVertical: 10,
  },
  emptyComments: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
