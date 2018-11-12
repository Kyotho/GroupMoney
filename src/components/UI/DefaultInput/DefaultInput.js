import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

// REUSUABLE DEFAULT INPUT

const defaultInput = props => (
  <TextInput
    {...props}
    style={[
      styles.textInput,
      props.style,
      !props.valid && props.touched ? styles.invalid : null
    ]}
    // styles.textInput jest najpierw egzekwowany a następnie style z innego komponentu gdzie uzyjemy defaultInput
    underlineColorAndroid="transparent"

    // uzywajac spread operator dla props nie musimy bindowac poszczegolnych propsow np props.placeholder
  />
);

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#eee',
    padding: 5,
    marginVertical: 8
  },
  invalid: {
    borderColor: '#820B0B',
    backgroundColor: 'black',
    borderWidth: 3
  }
});

export default defaultInput;
