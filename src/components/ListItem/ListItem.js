import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  CheckBox
} from 'react-native';

class ListItem extends Component {
  constructor() {
    super();
    this.state = {
      checked: false
    };
  }

  onCheckboxPress() {
    this.setState({ checked: !this.state.checked });
    this.checkboxToggle();
  }

  checkboxToggle() {
    if (this.state.checked) {
      this.props.onCheckboxDeSelect();
    } else {
      this.props.onCheckboxSelect();
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onItemPressed}>
        <View style={styles.listItem}>
          <Image source={this.props.userImage} style={styles.userImage} />
          <Text>{this.props.userName}</Text>
          <CheckBox
            title="Click Here"
            value={this.state.checked}
            checked={this.state.checked}
            onValueChange={() => {
              this.onCheckboxPress();
            }}
            style={styles.checkBox}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    padding: 10,
    backgroundColor: '#eee',
    marginBottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 3
  },
  userImage: {
    marginRight: 8,
    height: 30,
    width: 30
  },
  checkBox: {
    alignSelf: 'flex-end'
  }
});

export default ListItem;
