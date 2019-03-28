import React from 'react';

import DefaultInput from '../UI/DefaultInput/DefaultInput';

const userInput = props => (
  <DefaultInput
    style={props.style}
    placeholder="Username"
    value={props.userData.value}
    valid={props.userData.valid}
    touched={props.userData.touched}
    onChangeText={props.onChangeText}
  />
);

export default userInput;
