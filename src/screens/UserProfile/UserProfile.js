import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';

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
      <View style={styles.container}>
        <Text>UserProfileScreen UserProfileScreen UserProfileScreen</Text>
        <ButtonWithBackground>
          <Text>pedal</Text>
        </ButtonWithBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default UserProfileScreen;
