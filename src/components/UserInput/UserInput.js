import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';

class UserInput extends Component {
  state = {
    userName: ''
  };

  userNameChangedHandler = val => {
    this.setState({
      userName: val
    });
  };

  userNameSubmitHandler = () => {
    if (this.state.userName.trim() === '') {
      return;
    }

    this.props.onUserAdded(this.state.userName);

    // this.setState(prevState => {
    //   return {
    //     addedUsers: prevState.addedUsers.concat(prevState.userName)
    //   };
    // });
  };

  render() {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={{ width: 300 }}
          value={this.state.userName}
          onChangeText={this.userNameChangedHandler}
          placeholder="Enter a Username You look for"
          style={styles.placeInput}
        />
        <Button
          title="Add"
          style={styles.placeButton}
          onPress={this.userNameSubmitHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  placeInput: {
    width: '70%'
  },
  placeButton: {
    width: '30%'
  }
});

export default UserInput;
