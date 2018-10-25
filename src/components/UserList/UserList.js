import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ListItem from '../ListItem/ListItem';

const userList = props => {
  return (
    <FlatList
      style={styles.listContainer}
      data={props.addedUsers}
      renderItem={info => (
        <ListItem
          userName={info.item.name}
          userImage={info.item.image}
          onItemPressed={() => props.onItemSelected(info.item.key)}
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
