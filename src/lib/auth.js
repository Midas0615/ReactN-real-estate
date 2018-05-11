import Auth0 from 'react-native-auth0';

const AUTH0_DOMAIN = 'realestate05.auth0.com';
const CLIENT_ID = 'OkAQj_7BN8JNZpO-o2O30hI31a4CmvbY';

const auth0 = new Auth0({
  domain: `${AUTH0_DOMAIN}`,
  clientId: `${CLIENT_ID}` 
});

export {
  auth0,
  AUTH0_DOMAIN,
  CLIENT_ID
};
