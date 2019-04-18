import { canUseDOM } from './canUseDOM';
export const isElectron = canUseDOM && !!(global as any).require;