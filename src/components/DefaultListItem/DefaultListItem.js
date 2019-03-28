import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

class DefaultListItem extends Component {
  render() {
    return (
      // <TouchableOpacity onPress={this.props.onItemPressed}>
      <View style={styles.listItem}>
        <Image source={this.props.userImage} style={styles.userImage} />
        <Text>{this.props.userName}</Text>
      </View>
      // </TouchableOpacity>
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
  }
});

export default DefaultListItem;
