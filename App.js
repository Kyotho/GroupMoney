import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import AuthScreen from './src/screens/Auth/Auth';
import SplitTheBillScreen from './src/screens/SplitTheBill/SplitTheBill';
import AddUserScreen from './src/screens/AddUser/AddUser';
import UserProfileScreen from './src/screens/UserProfile/UserProfile';
import configureStore from './src/store/configureStore';
import UserDetailScreen from './src/screens/UserDetail/UserDetail';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';
import SetBillScreen from './src/screens/SetBill/SetBill';
import AddCardScreen from './src/screens/AddCard/AddCard';
import AddPhoneScreen from './src/screens/AddPhone/AddPhone';
import TransactionsScreen from './src/screens/Transactions/Transactions';

const store = configureStore();

// REGISTER SCREENS
Navigation.registerComponent(
  'group-money.AuthScreen',
  () => AuthScreen,
  store,
  Provider
);
Navigation.registerComponent(
  'group-money.SplitTheBillScreen',
  () => SplitTheBillScreen,
  store,
  Provider
);
Navigation.registerComponent(
  'group-money.AddUserScreen',
  () => AddUserScreen,
  store,
  Provider
);
Navigation.registerComponent(
  'group-money.UserProfileScreen',
  () => UserProfileScreen,
  store,
  Provider
);
Navigation.registerComponent(
  'group-money.UserDetailScreen',
  () => UserDetailScreen,
  store,
  Provider
);
Navigation.registerComponent(
  'group-money.SetBillScreen',
  () => SetBillScreen,
  store,
  Provider
);
Navigation.registerComponent(
  'group-money.AddCardScreen',
  () => AddCardScreen,
  store,
  Provider
);
Navigation.registerComponent(
  'group-money.AddPhoneScreen',
  () => AddPhoneScreen,
  store,
  Provider
);
Navigation.registerComponent(
  'group-money.TransactionsScreen',
  () => TransactionsScreen,
  store,
  Provider
);
Navigation.registerComponent('group-money.SideDrawer', () => SideDrawer);

//START APP
Navigation.startSingleScreenApp({
  screen: {
    screen: 'group-money.AuthScreen',
    title: 'Login'
  }
  // appStyle: {
  //   orientation: 'portrait'
  // }
});
