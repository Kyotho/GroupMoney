// import { SELECT_USER, DESELECT_USER } from '../actions/actionTypes';

// const initialState = {
//   selectedUsers: []
// };

// const reducer = (state = initialState, action) => {
//   switch (action.type) {

//     // case SELECT_USER:
//     //   return {
//     //     ...state,
//     //     addedUsers: state.addedUsers.filter(user => {
//     //       return user.key !== action.key;
//     //     })
//     //   };

//     case SELECT_USER:
//       return {
//         ...state,
//         selectedUsers = props.state.addedUsers.find(addedUser => {
//           return addedUser.key === action.userKey;
//         })

//         }

//       case DESELECT_USER:
//       return {
//         ...state,
//         selectedUsers: state.selectedUsers.map(function(item, i) {
//           if (item.key === key) {
//             users.splice(i, 1);
//           }
//         })
//       };

//     default:
//       return state;
//   }
// };

// export default reducer;
