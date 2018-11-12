import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  TouchableNativeFeedback
} from 'react-native';

const buttonWithBackground = props => {
  const content = (
    <View
      style={[
        styles.button,
        { backgroundColor: props.color },
        props.disabled ? styles.disabled : null
      ]}
    >
      <Text
        style={[styles.textButton, props.disabled ? styles.disabledText : null]}
      >
        {props.children}
      </Text>
    </View>
  );

  if (props.disabled) {
    return content;
  }

  return (
    <TouchableNativeFeedback onPress={props.onPress}>
      {content}
    </TouchableNativeFeedback>
  );
};
//style={{, fontWeight: 'bold' }}
const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black'
  },
  textButton: {
    color: 'black',
    fontWeight: 'bold'
  },
  disabled: {
    backgroundColor: '#aaa',
    borderColor: 'black'
  },
  disabledText: {
    color: '#7F7F7F'
  }
});

export default buttonWithBackground;
