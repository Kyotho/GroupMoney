import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import { getUsers } from '../../store/actions/index';
import userImage from '../../assets/UnknownPersonImage.png';
import { connect } from 'react-redux';

class UserProfileScreen extends Component {
  // KOLOR MENU DOLNEGO
  static navigatorStyle = {
    navBarButtonColor: '#2B0404'
  };

  constructor(props) {
    // funkcjonalnosc sideDrawera
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);

    this.state = {
      selectedItems: []
    };
  }

  componentDidMount() {
    this.props.onLoadUsers();
  }

  // SIDE DRAWER
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

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  optionFirstSelectedHandler = () => {
    // pushowanie strony AddCardScreen
    this.props.navigator.push({
      screen: 'group-money.AddCardScreen'
    });
  };

  optionSecondSelectedHandler = () => {
    // pushowanie strony AddPhoneScreen
    this.props.navigator.push({
      screen: 'group-money.AddPhoneScreen'
    });
  };

  optionThirdSelectedHandler = () => {
    // pushowanie strony AddPhoneScreen
    this.props.navigator.push({
      screen: 'group-money.TransactionsScreen'
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={userImage} style={styles.userImage} />
        <View style={styles.optionsContainer}>
          <TouchableOpacity onPress={this.optionFirstSelectedHandler}>
            <View style={styles.optionFirst}>
              <Text style={styles.optionsText}>Add card</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.optionSecondSelectedHandler}>
            <View style={styles.optionFirst}>
              <Text style={styles.optionsText}>Add phone number</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.optionThirdSelectedHandler}>
            <View style={styles.optionTwo}>
              <Text style={styles.optionsText}>Transactions</Text>
            </View>
          </TouchableOpacity>
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
  userImage: {
    width: 200,
    height: 200,
    borderRadius: 180,
    marginBottom: 40,
    marginTop: 10,
    borderColor: 'black',
    borderWidth: 1
  },
  optionsContainer: {
    width: '100%',
    marginBottom: 100
  },
  optionFirst: {
    padding: 15,
    borderColor: '#bbb',
    borderTopWidth: 1
  },
  optionTwo: {
    padding: 15,
    borderColor: '#bbb',
    borderBottomWidth: 1,
    borderTopWidth: 1
  },
  optionsText: {
    marginLeft: 20,
    fontSize: 15,
    fontWeight: 'bold'
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onLoadUsers: () => dispatch(getUsers())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(UserProfileScreen);
