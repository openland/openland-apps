import { Platform } from 'react-native';

export const supportsAsyncRendering = Platform.OS === 'ios' || Platform.OS === 'android';