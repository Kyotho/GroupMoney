import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import usersReducer from './reducers/users';
import addedUsers from './reducers/users';
import ui from './reducers/ui';
import auth from './reducers/auth';
import selectedUsers from './reducers/selectedUser';

// import selectedUser from './reducers/selectedUser';
const rootReducer = combineReducers({
  // addedUsers: usersReducer, uzywajac tej samej nazwy dla reducera i dla stanu skracamy zapis w combineReducers wypisujac reducery po przecinku
  addedUsers,
  ui,
  auth,
  selectedUsers
});

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
