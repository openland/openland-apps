import { NativeModules } from 'react-native';

const Auth0Native = NativeModules.RNSAuth0;

interface Auth0Credentials {
    idToken?: string;
    accessToken?: string;
    expiresIn?: string;
    scope?: string;
    refreshToken?: string;
    tokenType?: string;
}

interface Auth0Error {
    code?: string;
    message?: string;
}

class Auth0Implementation {
    requestEmailAuth = async (email: string) => {
        return await new Promise<{ ok: boolean, error?: Auth0Error }>((resolve) => {
            Auth0Native.requestEmailAuth(email, (ok: boolean, error?: Auth0Error) => {
                resolve({ ok, error });
            });
        });
    }

    completeEmailAuth = async (email: string, code: string) => {
        return await new Promise<{ credentials?: Auth0Credentials, error?: Auth0Error }>((resolve) => {
            Auth0Native.completeEmailAuth(email, code, (credentials?: Auth0Credentials, error?: Auth0Error) => {
                resolve({ credentials, error });
            });
        });
    }
}

export const Auth0 = new Auth0Implementation();