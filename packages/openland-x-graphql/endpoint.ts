import { canUseDOM } from 'openland-x-utils/canUseDOM';

declare global {
    interface Window { server: { endpoint: string; }; }
}

export const API_ENDPOINT = (canUseDOM ? '/graphql' : (process.env.API_ENDPOINT ? process.env.API_ENDPOINT + '/api' : 'http://localhost:9000/api'));
export const API_ENDPOINT_WS = (canUseDOM ? (window.location.protocol === 'https' ? 'wss' : 'ws') + '://' + window.location.host + '/graphql' : null);
export const API_AUTH_ENDPOINT = (canUseDOM ? '/authenticate' : (process.env.API_ENDPOINT ? process.env.API_ENDPOINT + '/auth' : 'http://localhost:9000/auth'));