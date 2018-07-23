import { AppRegistry } from 'react-native';
import Routes from './routes';
import Auth0 from 'react-native-auth0';

export const Auth0Client = new Auth0({
    domain: 'auth.openland.com',
    clientId: 'v3R2Rr6D4LzzcWKHf91jwKJyDnEm4L96',
    // redirectUri: window.location.origin + '/auth/complete',
    // audience: 'https://statecraft.auth0.com/userinfo',
    // responseType: 'token id_token',
    // scope: 'openid profile email'
});

AppRegistry.registerComponent('openland', () => Routes);