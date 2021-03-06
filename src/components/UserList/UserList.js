import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import ListItem from '../ListItem/ListItem';

const userList = props => {
  return (
    <FlatList
      style={[styles.listContainer, props.style]}
      data={props.addedUsers}
      extraData={this.state}
      renderItem={info => (
        <ListItem
          userName={info.item.name}
          userImage={info.item.image}
          onItemPressed={() => props.onItemSelected(info.item.key)}
          onCheckboxSelect={() => props.onCheckboxSelect(info.item.key)}
          onCheckboxDeSelect={() => props.onCheckboxDeSelect(info.item.key)}
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

export default userList;
