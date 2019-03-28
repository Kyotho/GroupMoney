import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import DefaultUserList from '../../components/DefaultUserList/DefaultUserList';
import {
  getTransactions,
  getUsers,
  selectUser,
  deselectUser
} from '../../store/actions/index';
import { connect } from 'react-redux';

class TransactionsScreen extends Component {
  // funkcjonalnosc sideDrawera
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  componentDidMount() {
    this.props.onLoadUsers();
    console.log(this.props.addedTransactions);
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

  // name odnosi sie do users w reducers

  selectedHandler = key => {
    this.props.onSelectUser(key);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <HeadingText style={styles.headingText}>
            This is Your latest transactions
          </HeadingText>
        </View>
        <View style={styles.list}>
          <DefaultUserList
            addedUsers={this.props.addedUsers}
            // onItemSelected={this.userSelectedHandler}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  heading: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  headingText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'gray'
  },
  list: {
    width: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '5%',
    borderWidth: 2,
    borderColor: 'black',
    height: '60%',
    borderRadius: 5
  }
});

const mapStateToProps = state => {
  return {
    addedUsers: state.addedUsers.addedUsers,
    selectedUsers: state.addedUsers.selectedUsers,
    selected: state.addedUsers.selected,
    addedTransactions: state.addedUsers.addedTransactions

    // state.addedUsers.addedUsers pierwsze addedusers odnosi sie do configure store a drugie do users w reducer

    // selectedUser: state.selectedUser.selectedUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadUsers: () => dispatch(getTransactions()),
    onSelectUser: key => dispatch(selectUser(key)),
    onDeselectUser: () => dispatch(deselectUser())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsScreen);
