import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import UserInput from '../../components/UserInput/UserInput';
import { addUser } from '../../store/actions';

class AddUserScreen extends Component {
  userAddedHandler = userName => {
    this.props.onAddUser(userName);
  };

  render() {
    return (
      <View>
        <UserInput onUserAdded={this.userAddedHandler} />
      </View>
    );
  }
}

mapDispatchToProps = dispatch => {
  return {
    onAddUser: userName => dispatch(addUser(userName))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AddUserScreen);
