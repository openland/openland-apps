import { self } from 'react-native-threads';

self.onmessage = (message: string) => {
    self.postMessage('Received: ' + message);
};