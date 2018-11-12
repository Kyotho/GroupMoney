import React, { Component } from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { deleteUser } from '../../store/actions/index';

class UserDetail extends Component {
  userDeletedHandler = () => {
    // onDeleteUser => dispatch z dolu
    this.props.onDeleteUser(this.props.selectedUser.key);
    // selectedUser -> selectedUser w SplitTheBill selectedUser: selUser
    this.props.navigator.pop();
  };

  // props.selectedUser => po zmianie UserDetail w klase musimy dodac this.props
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image
            source={this.props.selectedUser.image}
            style={styles.userImage}
          />
          <Text style={styles.userName}>{this.props.selectedUser.name}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={this.userDeletedHandler}>
            <View style={styles.deleteButton}>
              <Icon size={35} name="md-trash" color="red" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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

const mapDispatchToProps = dispatch => {
  return {
    onDeleteUser: key => dispatch(deleteUser(key))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(UserDetail);
