import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class SideDrawer extends Component {
  render() {
    return (
      <View
        style={[
          styles.container,
          { width: Dimensions.get('window').width * 0.8 }
          //nie dodaje width do styles poniewaz tu zostaja jako obiekt javascript i jest width dynamicznie kalkulowany w przypadku obracania ekranu
        ]}
      >
        <TouchableOpacity>
          <View style={styles.logOutContainer}>
            <Icon
              style={styles.ItemIcon}
              name="md-log-out"
              size={30}
              color="white"
            />
            <Text style={styles.logoutText}>Sign Out</Text>
          </View>
          <View style={styles.sideDrawerMenu}>
            <Icon
              style={styles.ItemIcon}
              name="md-card"
              size={30}
              color="white"
            />
            <Text style={styles.drawerItem}>ADD CARD</Text>
          </View>
          <View style={styles.sideDrawerMenu}>
            <Icon
              style={styles.ItemIcon}
              name="md-settings"
              size={30}
              color="white"
            />
            <Text style={styles.drawerItem}>SETTINGS</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    backgroundColor: '#2D2D2D',
    // backgroundColor: '#2B0404', ten jest szary, a ten nizej bordowy ciemny
    flex: 1
  },
  logOutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9E9E9E',
    padding: 10,
    marginBottom: 30
  },
  ItemIcon: {
    marginLeft: 15,
    marginRight: 30
  },
  logoutText: {
    color: 'white'
  },
  sideDrawerMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  drawerItem: {
    color: 'white'
  }
});

export default SideDrawer;
