import React, { Component } from 'react';
import { View, Text } from 'react-native';

class UserProfileScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: '#2B0404'
  };

  // funkcjonalnosc sideDrawera
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = event => {
    console.log(event);
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'sideDrawerToggle') {
        this.props.navigator.toggleDrawer({
          side: 'left'
        });
      }
    }
  };

  render() {
    return (
      <View>
        <Text>UserProfileScreen UserProfileScreen UserProfileScreen</Text>
      </View>
    );
  }
}

export default UserProfileScreen;
