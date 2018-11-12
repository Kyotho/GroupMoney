import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Animated
} from 'react-native';
import { connect } from 'react-redux';

import UserList from '../../components/UserList/UserList';
import { getUsers } from '../../store/actions/index';
// FIND PLACE

class SplitTheBillScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: '#2B0404'
  };

  state = {
    usersLoaded: false,
    removeAnim: new Animated.Value(1),
    usersAnim: new Animated.Value(0)
  };

  // funkcjonalnosc sideDrawera
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  componentDidMount() {
    this.props.onLoadUsers();
  }

  onNavigatorEvent = event => {
    // console.log(event);
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'sideDrawerToggle') {
        this.props.navigator.toggleDrawer({
          side: 'left'
        });
      }
    }
  };

  usersLoadedHandler = () => {
    Animated.timing(this.state.usersAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  usersSearchHandler = () => {
    Animated.timing(this.state.removeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      this.setState({
        usersLoaded: true
      });
      this.usersLoadedHandler();
    });
  };

  itemSelectedHandler = key => {
    const selUser = this.props.addedUsers.find(addedUser => {
      return addedUser.key === key;
    });

    // pushowanie strony UserDetail
    this.props.navigator.push({
      screen: 'group-money.UserDetailScreen',
      title: selUser.name,
      passProps: {
        // selectedUser odnosi sie do selectedUser w userDetail
        selectedUser: selUser
      }
    });
  };
  // name odnosi sie do users w reducers

  render() {
    let content = (
      <Animated.View
        style={{
          opacity: this.state.removeAnim,
          transform: [
            {
              scale: this.state.removeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [12, 1]
              })
            }
          ]
        }}
      >
        <TouchableOpacity onPress={this.usersSearchHandler}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Split the Bill</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );

    if (this.state.usersLoaded) {
      content = (
        <Animated.View
          style={{
            opacity: this.state.usersAnim
          }}
        >
          <UserList
            addedUsers={this.props.addedUsers}
            onItemSelected={this.itemSelectedHandler}
          />
        </Animated.View>
      );
    }
    return (
      <View style={this.state.usersLoaded ? null : styles.buttonContainer}>
        {content}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchButton: {
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 50,
    padding: 20
  },
  searchButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 26
  }
});

const mapStateToProps = state => {
  return {
    addedUsers: state.addedUsers.addedUsers
    // state.addedUsers.addedUsers pierwsze addedusers odnosi sie do configure store a drugie do users w reducers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadUsers: () => dispatch(getUsers())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SplitTheBillScreen);
