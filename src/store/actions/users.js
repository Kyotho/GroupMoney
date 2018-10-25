import { ADD_USER, DELETE_USER } from './actionTypes';

export const addUser = userName => {
  return {
    type: ADD_USER,
    userName: userName
  };
};

export const deleteUser = () => {
  return {
    type: DELETE_USER
  };
};
