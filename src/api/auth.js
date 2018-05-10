// import { loginSuccess, loginFailed } from '../redux/actions/auth';

// export function login(userData) {
//     return dispatch =>
//       fetch('http://api.realsafe.io/Auth/Local?email='+ userData.email+'&password=' + userData.password, {
//         method: 'get',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//         },
//       })
//       .then(response => {
//         console.log(response);
//         if (response.status >= 200 && response.status < 300 && response.ok) {
//           const object = Object.assign(userData, {isLoggedIn: response.ok});
//           dispatch(loginSuccess(object));
//         } else {
//           console.log('false');
//           const error = new Error(response.statusText);
//           error.response = response;
//           dispatch(loginError(error));
//           throw error;
//         }
//       })
//       .catch(error => { console.log('request failed', error); });
//   }

