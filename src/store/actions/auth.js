import { AsyncStorage } from 'react-native';

import { TRY_AUTH, AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs';
// import { TokenExpiredError } from 'jsonwebtoken';
import App from '../../../App';

const API_KEY = 'AIzaSyD1jJm1MHGYE0C30iqy2RUS9KeWefCdPGY';

export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading());
    // var database = firebase.database();
    // function writeUserData(userId, name, email, imageUrl) {
    //   firebase.database().ref('users/' + userId).set({
    //     username: name,
    //     email: email
    //     //some more user data
    //   });
    // }
    let url =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
      API_KEY;
    if (authMode === 'signup') {
      url =
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
        API_KEY;
    }

    fetch(
      'https://awesome-places-1511248766522.firebaseio.com/users.json?auth=',
      {
        method: 'POST',
        body: JSON.stringify({
          email: authData.email,
          password: authData.password
        })
      }
    );
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .catch(err => {
        console.log(err);
        alert('Authentication failed, please try again!');
        dispatch(uiStopLoading());
      })
      .then(res => res.json())
      .then(parsedRes => {
        dispatch(uiStopLoading());
        console.log(parsedRes);
        //jesli idToken bedzie pusty wyswietl alert w innym wypadku przejdz dalej
        if (!parsedRes.idToken) {
          alert('Authentication failed, please try again!');
        } else {
          //jesli email i haslo pasuja przejdz dalej
          dispatch(
            authStoreToken(
              parsedRes.idToken,
              parsedRes.expiresIn,
              parsedRes.refreshToken
            )
          );
          startMainTabs();
        }
      });

    // .then(user => {
    //   firebase
    //     .database()
    //     .ref('loggedUsers/' + user.uid)
    //     .set({
    //       email: authData.email,
    //       password: authData.password
    //     });
    // });

    //startMainTabs();
  };
};

export const authStoreToken = (token, expiresIn, refreshToken) => {
  return dispatch => {
    dispatch(authSetToken(token));
    const now = new Date();
    const expiryDate = now.getTime() + expiresIn * 1000;
    AsyncStorage.setItem('gp:auth:token', token);
    AsyncStorage.setItem('gp:auth:expiryDate', expiryDate.toString());
    AsyncStorage.setItem('gp:auth:refreshToken', refreshToken);
  };
};

// export const authStoreToken = token => {
//   return dispatch => {
//     dispatch(authSetToken(token));

//     AsyncStorage.setItem('gp:auth:token', token);

//   };
// };

export const authSetToken = token => {
  return {
    type: AUTH_SET_TOKEN,
    token: token
  };
};

export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.token;
      if (!token) {
        let fetchedToken;
        AsyncStorage.getItem('gp:auth:token')
          .catch(err => reject())
          .then(tokenFromStorage => {
            fetchedToken = tokenFromStorage;
            if (!tokenFromStorage) {
              reject();
              return;
            }
            AsyncStorage.getItem('gp:auth:expiryDate');
            // jesli nie znajdziemy gp:auth:expiryDate expiryDate bedzie null a parsedExpiryDate nie bedzie liczba
          })
          .then(expiryDate => {
            const parsedExpiryDate = new Date(parseInt(expiryDate));
            const now = new Date();
            if (parsedExpiryDate > now) {
              dispatch(authSetToken(fetchedToken));
              resolve(fetchedToken);
            } else {
              reject();
            }
          })
          .catch(err => reject());
      } else {
        resolve(token);
      }
    });
    return promise
      .catch(err => {
        return AsyncStorage.getItem('gp:auth:refreshToken')
          .then(refreshToken => {
            return fetch(
              'https://securetoken.googleapis.com/v1/token?key=' + API_KEY,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'grant_type=refresh_token&refresh_token=' + refreshToken
              }
            );
          })
          .then(res => res.json())
          .then(parsedRes => {
            if (parsedRes.id_token) {
              console.log('Refresh token worked');
              dispatch(
                authStoreToken(
                  parsedRes.id_token,
                  parsedRes.expires_in,
                  parsedRes.refresh_token
                )
              );
              return parsedRes.id_token;
            } else {
              // dojdziemy tutaj tylko wtedy gdy mamy blad przy promise.catch err wyzej
              dispatch(authClearStorage());
            }
          });
      })
      .then(token => {
        if (!token) {
          throw new Error();
        } else {
          return token;
        }
      });
  };
};

export const authAutoSignIn = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        startMainTabs();
      })
      .catch(err => console.log('failed to fetch token'));
  };
};

export const authClearStorage = () => {
  return dispatch => {
    AsyncStorage.removeItem('gp:auth:token');
    AsyncStorage.removeItem('gp:auth:expiryDate');
    return AsyncStorage.removeItem('gp:auth:refreshToken');
  };
};

// export const authLogout = () => {
//   return dispatch => {
//     dispatch(authClearStorage()).then(() => {
//       App();
//     });
//     dispatch(authRemoveToken());
//   };
// };

// export const authRemoveToken = () => {
//   return {
//     type: AUTH_REMOVE_TOKEN
//   };
// };

// firebase.auth().createUserWithEmailAndPassword(authData)
// .then((user) => {
//     firebase.database().ref('users/' + user.uid).set({
//       email: authData.email,
//       password: authData.password,
//     })
// })
// .then(user => loginUserSuccess(dispatch, user))
// .catch((error) => {
//     createUserFail(dispatch)
//     console.log(error);
// });
