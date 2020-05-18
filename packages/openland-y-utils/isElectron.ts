import { canUseDOM } from './canUseDOM';
export const isElectron = canUseDOM && !!(global as any).require;

export const isElectronWorker = () => navigator && navigator.userAgent.toLowerCase().includes(' electron/');