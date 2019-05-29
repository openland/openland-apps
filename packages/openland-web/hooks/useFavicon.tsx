import * as React from 'react';
import { useClient } from 'openland-web/utils/useClient';

export const FavIconChecker = () => {
    const [previewCount, setPreviewCount] = React.useState<null | number>(null);
    const client = useClient();
    const counter = client.useGlobalCounter();

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

    const changeFavicon = () => {
        favicons[0].href = favIconNotifyPath32;
        favicons[1].href = favIconNotifyPath16;
    };

    React.useEffect(
        () => {
            let timer: any = null;
            if (document.hasFocus()) {
                localStorage.setItem('fav', 'false');
                stopInterval(timer);
            }
            if (!document.hasFocus() && previewCount) {
                if (localStorage.getItem('fav') !== 'true') {
                    localStorage.setItem('fav', 'true');
                    timer = setInterval(() => {
                        changeFavicon();
                        if (document.hasFocus()) {
                            localStorage.setItem('fav', 'false');
                            stopInterval(timer);
                        }
                        if (localStorage.getItem('fav') === 'false') {
                            stopInterval(timer);
                        }
                    }, 1000);
                }
            }
            setPreviewCount(counter.alphaNotificationCounter.unreadCount);
            return;
        },
        [counter],
    );
    return null;
};
