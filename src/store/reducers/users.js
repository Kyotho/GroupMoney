import { ADD_USER, DELETE_USER } from '../actions/actionTypes';
import userImage from '../../assets/UnknownPersonImage.png';

const initialState = {
  addedUsers: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        addedUsers: state.addedUsers.concat({
          key: Math.random().toString(),
          name: action.userName,
          image: userImage
        })
      };

    case DELETE_USER:
      return {
        ...state,
        addedUsers: state.addedUsers.filter(user => {
          return user.key !== state.selectedUser.key;
        })
      };

    default:
      return state;
  }
};

export default reducer;
