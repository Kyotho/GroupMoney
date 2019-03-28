import {
  SET_USERS,
  REMOVE_USER,
  SELECT_USER,
  DESELECT_USER,
  SET_TRANSACTIONS
} from '../actions/actionTypes';

const initialState = {
  addedUsers: [],
  selectedUsers: [],
  selected: null,
  addedTransactions: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        addedUsers: action.addedUsers
        //adddedUsers(state wyzej): action.addedUsers(z users/actions z setUsers)
      };

    // usuwanie userow w layoutcie
    case REMOVE_USER:
      return {
        ...state,
        addedUsers: state.addedUsers.filter(user => {
          return user.key !== action.key;
        })
      };

    // case SELECT_USER:
    //   return {
    //     ...state,
    //     addedUsers: state.addedUsers.filter(user => {
    //       return user.key !== action.key;
    //     })
    //   };

    case SELECT_USER:
      // let users = [];
      return {
        ...state,
        selectedUsers: [
          ...state.selectedUsers,
          state.addedUsers.find(addedUser => {
            return addedUser.key === action.userKey;
          })
        ]

        // ...state,
        // selected: state.addedUsers.find(user => {
        //   return user.key === action.userKey;
        // })
      };

    case DESELECT_USER:
      return {
        // ten sposob usuwa wszystko z tablicy prawidlowo
        ...state,
        selectedUsers: state.selectedUsers.filter(user => {
          return user.key !== action.userKey;
        }),
        selectedUsers: []

        // ...state,
        // selectedUsers: state.selectedUsers.filter(user => {
        //   return user.key !== state.selectedUsers.key;
        // }),
        // selected: null
      };
    case SET_TRANSACTIONS:
      return {
        ...state,
        addedTransactions: action.addedTransactions
        //adddedUsers(state wyzej): action.addedUsers(z users/actions z setUsers)
      };

    default:
      return state;
  }
};

export default reducer;
