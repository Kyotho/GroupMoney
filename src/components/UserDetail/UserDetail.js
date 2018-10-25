import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const userDetail = props => {
  let modalContent = null;

  if (props.selectedUser) {
    modalContent = (
      <View>
        <Image source={props.selectedUser.image} style={styles.userImage} />
        <Text style={styles.userName}>{props.selectedUser.name}</Text>
      </View>
    );
  }

  return (
    <Modal
      onRequestClose={props.onModalClosed}
      visible={props.selectedUser !== null}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        {modalContent}
        <View>
          <TouchableOpacity onPress={props.onItemDeleted}>
            <View style={styles.deleteButton}>
              <Icon size={35} name="md-trash" color="red" />
            </View>
          </TouchableOpacity>
          <Button title={'Close'} onPress={props.onModalClosed} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 22
  },
  userImage: {
    width: 300,
    height: 300
  },
  userName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28
  },
  deleteButton: {
    alignItems: 'center'
  }
});

export default userDetail;
