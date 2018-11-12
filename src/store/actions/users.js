import { SET_USERS, REMOVE_USER } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';
import userImage from '../../assets/UnknownPersonImage.png';

export const addUser = userName => {
  // return {
  //   type: ADD_USER,
  //   userName: userName
  // };
  return dispatch => {
    const userData = {
      name: userName
    };

    dispatch(uiStartLoading());

    fetch('https://group-money-777.firebaseio.com/users.json', {
      method: 'POST',
      body: JSON.stringify(userData)
    })
      .catch(err => {
        console.log(err);
        alert('Something went wrong, please try again!');
        dispatch(uiStopLoading());
      })
      .then(res =>
        res.json().then(parsedRes => {
          console.log(parsedRes);
          dispatch(uiStopLoading());
        })
      );
  };
};

export const getUsers = () => {
  return dispatch => {
    fetch('https://group-money-777.firebaseio.com/users.json')
      .catch(err => {
        alert('Something went wrong, sorry.');
        console.log(err);
      })
      .then(res => res.json())
      .then(parsedRes => {
        const addedUsers = [];
        for (let key in parsedRes) {
          addedUsers.push({
            ...parsedRes[key],
            image: userImage,
            key: key
          });
        }
        dispatch(setUsers(addedUsers));
      });
  };
};

export const setUsers = addedUsers => {
  return {
    type: SET_USERS,
    addedUsers: addedUsers
  };
};

export const deleteUser = key => {
  return dispatch => {
    //DELETING LOCALY
    dispatch(removeUser(key));
    //DELETING REQUEST
    fetch('https://group-money-777.firebaseio.com/users/' + key + '.json', {
      method: 'DELETE'
    })
      .catch(err => {
        alert('Something went wrong, sorry.');
        console.log(err);
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log('Done!');
      });
  };
};

export const removeUser = key => {
  return {
    type: REMOVE_USER,
    key: key
  };
};
