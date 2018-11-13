import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Animated
} from 'react-native';
import { connect } from 'react-redux';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import UserList from '../../components/UserList/UserList';
import { getUsers } from '../../store/actions/index';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
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
        // <Animated.View
        //   style={{
        //     opacity: this.state.usersAnim
        //   }}
        // >
        <View>
          <View style={styles.heading}>
            <HeadingText style={styles.headingText}>
              Select from the list of friends with whom you want to split the
              bill
            </HeadingText>
          </View>
          <View style={styles.list}>
            <UserList
              addedUsers={this.props.addedUsers}
              onItemSelected={this.itemSelectedHandler}
            />
          </View>
          <View style={styles.nextStepButton}>
            <ButtonWithBackground color="#A3A3A3">
              <Text>Next Step</Text>
            </ButtonWithBackground>
          </View>
        </View>
        // </Animated.View>
      );
    }
    return <View style={styles.container}>{content}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
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
  },
  textContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    width: '80%',
    marginLeft: 30
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
  },
  nextStepButton: {
    width: '30%',
    // alignItems: 'center',
    // justifyContent: 'center'
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15
  },
  nextStepButtonText: {
    // marginLeft: 'auto',
    // marginRight: 'auto',
    // alignItems: 'center',
    // justifyContent: 'center'
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
