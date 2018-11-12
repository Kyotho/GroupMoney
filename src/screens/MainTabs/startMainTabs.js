import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
  Promise.all([
    Icon.getImageSource('md-share', 30),
    Icon.getImageSource('md-contact', 30),
    Icon.getImageSource('md-person-add', 30),
    Icon.getImageSource('md-menu', 30)
  ]).then(sources => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: 'group-money.SplitTheBillScreen',
          label: 'Split the Bill',
          title: 'Split the Bill',
          icon: sources[0],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[3],
                title: 'Menu',
                id: 'sideDrawerToggle'
              }
            ]
          }
        },
        {
          screen: 'group-money.UserProfileScreen',
          label: 'User Profile',

          title: 'User Profile',
          icon: sources[1],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[3],
                title: 'Menu',
                id: 'sideDrawerToggle'
              }
            ]
          }
        },
        {
          screen: 'group-money.AddUserScreen',
          label: 'Add User',
          title: 'Add User',
          icon: sources[2],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[3],
                title: 'Menu',
                id: 'sideDrawerToggle'
              }
            ]
          }
        }
      ],
      appStyle: {
        // tabBarSelectedButtonColor: '#630909',
        tabBarSelectedButtonColor: 'black'
      },
      drawer: {
        left: {
          screen: 'group-money.SideDrawer',
          // fixedWidth: '100%',
          // animated: false
          percentOfScreenWidth: 0.8
          //  disableOpenGesture: false
          // (this line for swiping enabled)
        }
      }
    });
  });
};

export default startTabs;
