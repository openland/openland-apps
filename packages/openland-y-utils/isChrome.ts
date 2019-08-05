import { canUseDOM } from 'openland-y-utils/canUseDOM';
export const isChrome = canUseDOM && !!(window as any).chrome && (!!(window as any).chrome.webstore || !!(window as any).chrome.runtime);