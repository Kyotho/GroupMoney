import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import UserInput from '../../components/UserInput/UserInput';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import validate from '../../utility/validation';

// import UserInput from '../../components/UserInput/UserInput';
import { addUser } from '../../store/actions';

// SHARE PLACE

class AddUserScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: '#2B0404'
  };

  state = {
    controls: {
      userName: {
        value: '',
        valid: false,
        touched: false,
        validationRules: {
          notEmpty: true
        }
      }
    }
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  // NAVIGATOR EVENT, side drawer
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

  userNameChangedHandler = val => {
    this.setState(prevState => {
      //  userName: val
      return {
        controls: {
          ...prevState.controls,
          userName: {
            ...prevState.controls.userName,
            value: val,
            valid: validate(val, prevState.controls.userName.validationRules)
          }
        }
      };
    });
  };

  userAddedHandler = () => {
    // sprawdzanie czy nie chcemy wprowadzic pustego miejsca w userName, trim() usuwa jakakolwiek biala przestrzen w inpucie, wiec "   " tez liczy sie jako blad/puste
    //if (this.state.userName.trim() !== '') {
    //  this.props.onAddUser(this.state.userName);
    this.props.onAddUser(this.state.controls.userName.value);
  };

  render() {
    let submitButton = (
      <ButtonWithBackground
        color="#A3A3A3"
        onPress={this.userAddedHandler}
        disabled={!this.state.controls.userName.valid}
      >
        <Text>Add Friend</Text>
      </ButtonWithBackground>
    );

    if (this.props.isLoading) {
      submitButton = <ActivityIndicator />;
    }
    return (
      <View style={styles.container}>
        <View style={styles.textView}>
          <MainText>
            <HeadingText style={styles.heading}>
              Add a Friend below via his phone number!
            </HeadingText>
          </MainText>
        </View>
        <UserInput
          style={styles.input}
          // userName={this.state.userName}
          userData={this.state.controls.userName}
          onChangeText={this.userNameChangedHandler}
        />
        {submitButton}
        {/* <Button title="add friend" onPress={this.userAddedHandler} /> */}
        {/* <UserInput onUserAdded={this.userAddedHandler} /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#C6C6C6'
  },
  input: {
    backgroundColor: '#eee',
    borderColor: 'black',
    width: '80%',
    borderWidth: 2,
    borderRadius: 5
  },
  textView: {
    width: '80%'
  },
  heading: {
    fontSize: 20
  }
});

const mapStateToProps = state => {
  return {
    //isLoading jest z ui/reducer
    isLoading: state.ui.isLoading
  };
};

mapDispatchToProps = dispatch => {
  return {
    onAddUser: userName => dispatch(addUser(userName))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUserScreen);
