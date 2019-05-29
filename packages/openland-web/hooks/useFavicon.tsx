import * as React from 'react';
import { useClient } from 'openland-web/utils/useClient';

export const FavIconChecker = () => {
    const client = useClient();
    const counter = client.useGlobalCounter();

    const lcGet = (str: string) => localStorage.getItem(str);
    const lcSet = (key: string, value: string) => localStorage.setItem(key, value);

    const favicons: any = document.getElementsByClassName('favicon');
    const favIconPath16 = '/static/img/favicon/favicon-16x16.png?v=2';
    const favIconPath32 = '/static/img/favicon/favicon-32x32.png?v=2';
    const favIconNotifyPath16 = '/static/img/favicon/favicon-notify-16x16.png?v=2';
    const favIconNotifyPath32 = '/static/img/favicon/favicon-notify-32x32.png?v=2';

    const stopInterval = (timer: any) => {
        clearInterval(timer);
        favicons[0].href = favIconPath32;
        favicons[1].href = favIconPath16;
    };

    React.useEffect(
        () => {
            let timer: any = null;
            if (document.hasFocus()) {
                lcSet('favicon_change', 'false');
                stopInterval(timer);
            } else if (!document.hasFocus() && lcGet('favicon_change') !== 'true') {
                lcSet('favicon_change', 'true');
                timer = setInterval(() => {
                    favicons[0].href = favIconNotifyPath32;
                    favicons[1].href = favIconNotifyPath16;
                    if (document.hasFocus()) {
                        lcSet('favicon_change', 'false');
                        stopInterval(timer);
                    }
                    if (!document.hasFocus() && lcGet('favicon_change') === 'false') {
                        stopInterval(timer);
                    }
                }, 1000);
            }
            return;
        },
        [counter],
    );
    return null;
};
