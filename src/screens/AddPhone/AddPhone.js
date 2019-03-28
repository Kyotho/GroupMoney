import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';

class AddPhoneScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textView}>
          <HeadingText style={styles.heading}>
            Enter your phone number here
          </HeadingText>
        </View>
        <View>
          <DefaultInput placeholder="Phone Number" style={styles.input} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#bbb'
  },
  textView: {
    width: '80%'
  },
  heading: {
    fontSize: 20,
    color: 'white'
  },

  input: {
    backgroundColor: '#eee',
    borderColor: 'black',
    width: 200,
    borderWidth: 2,
    borderRadius: 5
  }
});

export default AddPhoneScreen;
