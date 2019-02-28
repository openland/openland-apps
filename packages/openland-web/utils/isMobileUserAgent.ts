import { canUseDOM } from 'openland-y-utils/canUseDOM';
export let isMobileUserAgent = /iPhone|iPad|iPod|Android|BlackBerry|BB10|Silk|Mobi/i.test(
    canUseDOM ? navigator.userAgent : '',
);
