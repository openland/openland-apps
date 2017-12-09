import { canUseDOM } from './environment';

declare global {
    interface Window { server: { endpoint: string; }; }
}

export const API_ENDPOINT = (canUseDOM ? window.server.endpoint : (process.env.API_ENDPOINT ? process.env.API_ENDPOINT : 'http://localhost:9000'));