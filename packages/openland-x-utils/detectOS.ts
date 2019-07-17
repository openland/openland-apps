import { canUseDOM } from 'openland-y-utils/canUseDOM';

export type OS = 'Mac' | 'iOS' | 'Windows' | 'Android' | 'Linux';
export const detectOS = (): OS | null => {
    let os: OS | null = null;
    let userAgent = canUseDOM ? window.navigator.userAgent : '',
        platform = canUseDOM ? window.navigator.platform : '',
        macPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'];

    if (macPlatforms.indexOf(platform) !== -1) {
        os = 'Mac';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
    } else if (/Android/.test(userAgent)) {
        os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
        os = 'Linux';
    }

    return os;
};