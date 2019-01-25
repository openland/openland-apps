import { canUseDOM } from 'openland-x-utils/canUseDOM';
export var isMobile = /iPhone|iPad|iPod|Android|BlackBerry|BB10|Silk|Mobi/i.test(canUseDOM ? navigator.userAgent : '');