import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
  Promise.all([
    Icon.getImageSource('md-share', 30),
    Icon.getImageSource('md-contact', 30),
    Icon.getImageSource('md-person-add', 30)
  ]).then(sources => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: 'group-money.SplitTheBillScreen',
          label: 'Split the Bill',
          title: 'Split the Bill',
          icon: sources[0]
        },
        {
          screen: 'group-money.UserProfileScreen',
          label: 'User Profile',
          title: 'User Profile',
          icon: sources[1]
        },
        {
          screen: 'group-money.AddUserScreen',
          label: 'Add User',
          title: 'Add User',
          icon: sources[2]
        }
      ]
    });
  });
};

export default startTabs;
