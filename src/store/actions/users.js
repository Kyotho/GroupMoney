import {
  SET_USERS,
  REMOVE_USER,
  SELECT_USER,
  DESELECT_USER,
  SET_TRANSACTIONS
} from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from './index';
import userImage from '../../assets/UnknownPersonImage.png';

export const addUser = (userName, phoneNumber) => {
  return dispatch => {
    //VERSION 1.0
    // const userData = {
    //   name: userName
    // };

    //   dispatch(uiStartLoading());

    //   fetch('https://group-money-777.firebaseio.com/users.json', {
    //     method: 'POST',
    //     body: JSON.stringify(userData)
    //   })
    //     .catch(err => {
    //       console.log(err);
    //       alert('Something went wrong, please try again!');
    //       dispatch(uiStopLoading());
    //     })
    //     .then(res =>
    //       res.json().then(parsedRes => {
    //         console.log(parsedRes);
    //         dispatch(uiStopLoading());
    //       })
    //     );
    // };

    //VERSION 2.0
    let authToken;
    dispatch(uiStartLoading());
    dispatch(authGetToken())
      .catch(() => {
        alert('No valid token found');
      })
      // .then(res => res.json())
      .then(token => {
        authToken = token;
      })
      .then(() => {
        const userData = {
          name: userName,
          phone: phoneNumber
          //image: userImage
        };

        return fetch(
          'https://group-money-777.firebaseio.com/users.json?auth=' + authToken,
          {
            method: 'POST',
            body: JSON.stringify(userData)
          }
        );
      })
      .then(resTwo =>
        resTwo.json().then(parsedRes => {
          console.log(parsedRes);
          dispatch(uiStopLoading());
        })
      )
      .catch(err => {
        console.log(err);
        alert('1 Something went wrong, please try again!');
        dispatch(uiStopLoading());
      });

    // let authToken;
    // dispatch(uiStartLoading());
    // dispatch(authGetToken())
    //   .catch(() => {
    //     alert('No valid token found');
    //   })
    //   // .then(res => res.json())
    //   .then(token => {
    //     authToken = token;
    //   })
    //   .then(() => {
    //     const userData = {
    //       name: userName,
    //       phone: phoneNumber
    //       //image: userImage
    //     };

    //     return fetch(
    //       'https://group-money-777.firebaseio.com/users.json?auth=' + authToken,
    //       {
    //         method: 'POST',
    //         body: JSON.stringify(userData)
    //       }
    //     );
    //   })
    //   .then(resTwo =>
    //     resTwo.json().then(parsedRes => {
    //       console.log(parsedRes);
    //       dispatch(uiStopLoading());
    //     })
    //   )
    //   .catch(err => {
    //     console.log(err);
    //     alert('1 Something went wrong, please try again!');
    //     dispatch(uiStopLoading());
    //   });

    // VERSION 3.0
    //   fetch('https://group-money-777.firebaseio.com/users.json', {
    //     method: 'POST',
    //     body: JSON.stringify(userData)
    //   })
    //     .catch(err => {
    //       console.log(err);
    //       alert('Something went wrong, please try again!');
    //       dispatch(uiStopLoading());
    //     })
    //     .then(res =>
    //       res.json().then(parsedRes => {
    //         console.log(parsedRes);
    //         dispatch(uiStopLoading());
    //       })
    //     );
    // };

    // const userData = {
    //   name: userName
    // };
    // let authToken;
    // dispatch(uiStartLoading());
    // dispatch(authGetToken())
    //   .catch(() => {
    //     alert('No valid token found');
    //   })
    //   .then(token => {
    //     authToken = token;
    //     return fetch(
    //       'https://us-central1-group-money-777.cloudfunctions.net/storeImage',
    //       {
    //         method: 'POST',
    //         body: JSON.stringify({
    //           image: userImage,
    //           headers: {
    //             Authorization: 'Bearer' + authToken
    //           }
    //         })
    //       }
    //     );
    //   })
    //   .then(res => res.json())
    //   .then(parsedRes => {
    //     const userData = {
    //       name: userName,
    //       location: location,
    //       image: userImage
    //     };
    //     return fetch(
    //       'https://group-money-777.firebaseio.com/users.json?auth=' + authToken,
    //       {
    //         method: 'POST',
    //         body: JSON.stringify(userData)
    //       }
    //     );
    //   })
    //   .then(res =>
    //     res.json().then(parsedRes => {
    //       console.log(parsedRes);
    //       dispatch(uiStopLoading());
    //     })
    //   )
    //   .catch(err => {
    //     console.log(err);
    //     alert('Something went wrong, please try again!');
    //     dispatch(uiStopLoading());
    //   });
  };
};

// export const payMe = (userName, phoneNumber) => {
//   return dispatch => {
//     let authToken;
//     dispatch(uiStartLoading());
//     dispatch(authGetToken())
//       .catch(() => {
//         alert('No valid token found');
//       })
//       // .then(res => res.json())
//       .then(token => {
//         authToken = token;
//       })
//       .then(() => {
//         const userData = {
//           name: userName,
//           phone: phoneNumber
//           //image: userImage
//         };

//         return fetch(
//           'https://group-money-777.firebaseio.com/users.json?auth=' + authToken,
//           {
//             method: 'POST',
//             body: JSON.stringify(userData)
//           }
//         );
//       })
//       .then(resTwo =>
//         resTwo.json().then(parsedRes => {
//           console.log(parsedRes);
//           dispatch(uiStopLoading());
//         })
//       )
//       .catch(err => {
//         console.log(err);
//         alert('1 Something went wrong, please try again!');
//         dispatch(uiStopLoading());
//       });

//     };
//   };

export const getUsers = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        return fetch(
          'https://group-money-777.firebaseio.com/users.json?auth=' + token
        );
      })
      .catch(() => {
        alert('No valid token found');
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
      })
      .catch(err => {
        alert('2 Something went wrong, sorry.');
        console.log(err);
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
    //dispatching authGetToken
    dispatch(authGetToken())
      //catch any token errors
      .catch(() => {
        alert('No valid token found');
        //then we get the token if we dont have any error
      })
      .then(token => {
        // then we dispatch removeUser to DELETE LOCALY
        dispatch(removeUser(key));
        //DELETING REQUEST
        return fetch(
          'https://group-money-777.firebaseio.com/users/' +
            key +
            '.json?auth=' +
            token,
          {
            method: 'DELETE'
          }
        );
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log('Done!');
      })
      .catch(err => {
        alert(' 3 Something went wrong, sorry.');
        console.log(err);
      });
  };
};

export const removeUser = key => {
  return {
    type: REMOVE_USER,
    key: key
  };
};

export const addTransaction = (userName, phoneNumber) => {
  return dispatch => {
    let authToken;
    dispatch(uiStartLoading());
    dispatch(authGetToken())
      .catch(() => {
        alert('No valid token found');
      })
      // .then(res => res.json())
      .then(token => {
        authToken = token;
      })
      .then(() => {
        const userData = {
          name: userName,
          phone: phoneNumber
          //image: userImage
        };

        // pokazuje jakie dane zostaly wsadzone w dany obiekt
        // console.log(userData);
        return fetch(
          'https://group-money-777.firebaseio.com/transactions.json?auth=' +
            authToken,
          {
            method: 'POST',
            body: JSON.stringify(userData)
          }
        );
      })
      .then(resTwo =>
        resTwo.json().then(parsedRes => {
          // pokazuje jaki key w bazie danych zostal dodany
          console.log(parsedRes);
          dispatch(uiStopLoading());
        })
      )
      .catch(err => {
        console.log(err);
        alert('2 Something went wrong, please try again!');
        dispatch(uiStopLoading());
      });
  };
};

export const addBill = (userName, phoneNumber) => {
  return dispatch => {
    let authToken;
    dispatch(uiStartLoading());
    dispatch(authGetToken())
      .catch(() => {
        alert('No valid token found');
      })
      // .then(res => res.json())
      .then(token => {
        authToken = token;
      })
      .then(() => {
        const userData = {
          name: userName,
          phone: phoneNumber
          //image: userImage
        };

        // pokazuje jakie dane zostaly wsadzone w dany obiekt
        // console.log(userData);
        return fetch(
          'https://group-money-777.firebaseio.com/transactions.json?auth=' +
            authToken,
          {
            method: 'POST',
            body: JSON.stringify(userData)
          }
        );
      })
      .then(resTwo =>
        resTwo.json().then(parsedRes => {
          // pokazuje jaki key w bazie danych zostal dodany
          console.log(parsedRes);
          dispatch(uiStopLoading());
        })
      )
      .catch(err => {
        console.log(err);
        alert('2 Something went wrong, please try again!');
        dispatch(uiStopLoading());
      });
  };
};

export const getTransactions = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        return fetch(
          'https://group-money-777.firebaseio.com/users/-LS-iToEGuQ_GOI8RT8Q/transactions/json?auth=' +
            token
        );
      })
      .catch(() => {
        alert('No valid token found');
      })
      .then(res => res.json())
      .then(parsedRes => {
        const addedTransactions = [];
        for (let key in parsedRes) {
          addedTransactions.push({
            ...parsedRes[key],
            // image: userImage,
            key: key
          });
        }
        dispatch(setTransactions(addedTransactions));
      })
      .catch(err => {
        alert('3 Something went wrong, sorry.');
        console.log(err);
      });
  };
};

export const setTransactions = addedTransactions => {
  return {
    type: SET_TRANSACTIONS,
    addedTransactions: addedTransactions
  };
};

// export const selectUser = key => {
//   return {
//     type: SELECT_USER,
//     key: key
//   };
// };

// export const transactionUsers = userName => {
//   dispatch => {
//     const transaction = {
//       notification: userName
//     };
//     dispatch(uiStartLoading());
//     dispatch(selectUser(key));
//     return fetch(
//       'https://group-money-777.firebaseio.com/users/' + key + '/.json',
//       {
//         method: 'POST',
//         body: JSON.stringify(transaction)
//       }
//     )
//       .catch(err => console.log(err))
//       .then(res => res.json())
//       .then(parsedRes => {
//         console.log(parsedRes);
//       });
//   };
// };

export const selectUser = key => {
  return {
    type: SELECT_USER,
    userKey: key
  };
};

export const deselectUser = () => {
  return {
    type: DESELECT_USER
  };
};
