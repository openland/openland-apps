import auth0 from 'auth0-js';

export default class {

    auth0 = new auth0.WebAuth({
        domain: 'statecraft.auth0.com',
        clientID: 'na0Pvis7KTzZWtzcIFT8MzIxtdpiLZc3',
        redirectUri: 'http://localhost:3000',
        audience: 'https://statecraft.auth0.com/userinfo',
        responseType: 'token id_token',
        scope: 'openid'
    });

    constructor() {
        //
    }

    login() {
        this.auth0.authorize({

        });
    }
}