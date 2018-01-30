import { canUseDOM } from './environment';

declare global {
    interface Window { server: { endpoint: string; }; }
}

export const API_ENDPOINT = (canUseDOM ? '/graphql' : (process.env.API_ENDPOINT ? process.env.API_ENDPOINT + '/api' : 'http://localhost:9000/api'));