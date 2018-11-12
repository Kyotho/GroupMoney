import { SET_USERS, REMOVE_USER } from '../actions/actionTypes';

const initialState = {
  addedUsers: []
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

    default:
      return state;
  }
};

export default reducer;
