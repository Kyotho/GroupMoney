import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
class AddCardScreen extends Component {
  state = {
    values: {
      number: ''
      // expiry: '',
      // cvc: '',
      // name: '',
      // postalCode: '',
      // type: ''
    }
  };

  // _onChange = formData => console.log(JSON.stringify(formData, null, ' '));
  // _onFocus = field => console.log('focusing', field);
  // _setUseLiteCreditCardInput = useLiteCreditCardInput =>
  //   this.setState({ useLiteCreditCardInput });

  // userNameChangedHandler = num => {
  //   this.setState(prevState => {
  //     return {
  //       values: {
  //         ...prevState.values,
  //         number: num
  //       }
  //     };
  //   });
  // };

  render() {
    return (
      <View style={styles.container}>
        <CreditCardInput
          autoFocus
          requiresName
          requiresCVC
          requiresPostalCode
          labelStyle={styles.label}
          inputStyle={styles.input}
          validColor={'black'}
          invalidColor={'red'}
          placeholderColor={'darkgray'}
          onFocus={this._onFocus}
          onChange={this._onChange}
        />
        <ButtonWithBackground
          color="#A3A3A3"
          onPress={() => console.log('aaaaaaaaa')}
        >
          <Text>Save it</Text>
        </ButtonWithBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  switch: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  container: {
    backgroundColor: '#F5F5F5',
    marginTop: 60
  },
  label: {
    color: 'black',
    fontSize: 12
  },
  input: {
    fontSize: 16,
    color: 'black'
  }
});

export default AddCardScreen;
