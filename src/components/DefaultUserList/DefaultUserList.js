import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import DefaultListItem from '../DefaultListItem/DefaultListItem';

const defaultUserList = props => {
  return (
    <FlatList
      style={[styles.listContainer, props.style]}
      data={props.addedUsers}
      extraData={this.state}
      renderItem={info => (
        <DefaultListItem
          userName={info.item.name}
          userImage={info.item.image}
          // onItemPressed={() => props.onItemSelected(info.item.key)}

          // onItemPressed={() => console.log(info.item.key)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: '100%'
  }
});

export default defaultUserList;
