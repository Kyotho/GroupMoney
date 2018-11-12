import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../assets/d.jpg';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import validate from '../../utility/validation';
import { tryAuth } from '../../store/actions/index';

class AuthScreen extends Component {
  state = {
    viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
    authMode: 'login',
    controls: {
      email: {
        value: '',
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: '',
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false
      },
      confirmPassword: {
        value: '',
        valid: false,
        validationRules: {
          equalTo: 'password'
        },
        touched: false
      }
    }
  };

  // ADDING EVENT LISTENER TO CHANGE STYLES
  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.updateStyles);
  }

  // REMOVING EVENT LISTENER, NEED TO CLEAN MEMORY LEAK
  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateStyles);
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === 'login' ? 'signup' : 'login'
      };
    });
  };

  // FUNCTION TO CHANGE WINDOW FOR PORTRAIT OR LANDSCAPE
  updateStyles = dims => {
    this.setState({
      viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape'
    });
  };

  loginHandler = () => {
    const authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    };
    this.props.onLogin(authData);

    startMainTabs();
  };

  // METHOD FOR UPDATING THE STATE
  updateInputState = (key, value) => {
    let comparedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      comparedValue = {
        ...comparedValue,
        equalTo: equalValue
      };
    }

    if (key === 'password') {
      // const equalControl = 'password';
      // const equalValue = this.state.controls[equalControl].value;
      comparedValue = {
        ...comparedValue,
        equalTo: value
      };
    }

    // key = passowrd, email ...
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid:
              key === 'password'
                ? validate(
                    prevState.controls.confirmPassword.value,
                    prevState.controls.confirmPassword.validationRules,
                    comparedValue
                  )
                : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
              comparedValue
            ),
            touched: true
          }
        }
      };
    });
  };

  render() {
    let headingText = null;
    let confirmPasswordControl = null;

    if (this.state.viewMode === 'portrait') {
      headingText = (
        <View style={{ marginBottom: '15%', marginTop: '5%' }}>
          <MainText>
            <HeadingText>Future is here! Enjoy us!</HeadingText>
          </MainText>
        </View>
      );
    }

    if (this.state.authMode === 'signup') {
      confirmPasswordControl = (
        <DefaultInput
          placeholderTextColor="white"
          placeholder="Confirm Password"
          style={styles.input}
          value={this.state.controls.confirmPassword.value}
          onChangeText={val => this.updateInputState('confirmPassword', val)}
          valid={this.state.controls.confirmPassword.valid}
          touched={this.state.controls.confirmPassword.touched}
          secureTextEntry
        />
      );
    }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <ImageBackground
            style={styles.backgroundImage}
            source={backgroundImage}
          >
            {/* wyrzucanie nad klawiature contentu */}
            <KeyboardAvoidingView style={styles.container} behavior="padding">
              {headingText}
              <ButtonWithBackground
                color="#A3A3A3"
                onPress={this.switchAuthModeHandler}
              >
                <Text>
                  Switch to{' '}
                  {this.state.authMode === 'login' ? 'Sign Up' : 'Login'}
                </Text>
              </ButtonWithBackground>
              {/* po co inputContainer? zeby caly kontener inputow byl bardziej reusable w innych komponentach*/}

              <View style={styles.inputContainer}>
                {/* EMAIL INPUT */}
                <DefaultInput
                  placeholderTextColor="white"
                  placeholder="Your E-mail Address"
                  style={styles.input}
                  value={this.state.controls.email.value}
                  onChangeText={val => this.updateInputState('email', val)}
                  valid={this.state.controls.email.valid}
                  touched={this.state.controls.email.touched}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                />
                {/* mozemy uzyc tu placeholdera ot tak bo w defaultinput uzylismy
          spread operator dla propsow */}
                {/* PASSWORD INPUT */}
                <DefaultInput
                  placeholderTextColor="white"
                  placeholder="Password"
                  style={styles.input}
                  value={this.state.controls.password.value}
                  onChangeText={val => this.updateInputState('password', val)}
                  valid={this.state.controls.password.valid}
                  touched={this.state.controls.password.touched}
                  secureTextEntry
                />
                {confirmPasswordControl}
              </View>

              <ButtonWithBackground
                color="#A3A3A3"
                onPress={this.loginHandler}
                // disabled={
                //   !this.state.controls.password.valid ||
                //   (!this.state.controls.confirmPassword.valid &&
                //     this.state.authMode === 'signup') ||
                //   !this.state.controls.email.valid
                // }
              >
                <Text>Submit</Text>
              </ButtonWithBackground>
            </KeyboardAvoidingView>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center'
    //backgroundColor: 'rgba(0,0,0,0.6)'
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'rgba(0,0, 0, 0.6)',
    borderColor: 'white',
    borderWidth: 2,
    color: 'white',
    borderRadius: 5
  },
  backgroundImage: {
    flex: 1
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onLogin: authData => dispatch(tryAuth(authData))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AuthScreen);
