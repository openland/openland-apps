import { canUseDOM } from 'openland-x-utils/canUseDOM';
import * as url from 'url-parse';
declare global {
    interface Window { server: { endpoint: string; }; }
}

export const API_ENDPOINT_DIRECT = (process.env.API_ENDPOINT ? process.env.API_ENDPOINT + '/api' : 'http://localhost:9000/api');
export const API_ENDPOINT = (canUseDOM ? '/graphql' : API_ENDPOINT_DIRECT);
let parsed = url(API_ENDPOINT_DIRECT);
export const API_WS_ENDPOINT = (parsed.protocol === 'https' ? 'wss' : 'ws') + '://' + parsed.host + '/api';
export const API_AUTH_ENDPOINT = (canUseDOM ? '/authenticate' : (process.env.API_ENDPOINT ? process.env.API_ENDPOINT + '/auth' : 'http://localhost:9000/auth'));