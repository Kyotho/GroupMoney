import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import UserList from '../../components/UserList/UserList';

class SplitTheBillScreen extends Component {
  render() {
    return (
      <View>
        <UserList addedUsers={this.props.addedUsers} />
        {/* this.props.addedUsers odnosi sie do data w UserList */}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    addedUsers: state.addedUsers.addedUsers
    // state.addedUsers.addedUsers pierwsze addedusers odnosi sie do configure store a drugie do users w reducers
  };
};

export default connect(
  mapStateToProps,
  null
)(SplitTheBillScreen);
