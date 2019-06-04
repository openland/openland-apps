import * as React from 'react';
import { useClient } from 'openland-web/utils/useClient';

const useSetNotifiedFavIcon = () => {
    const [isNotifiedIconSetted, setIsNotifiedIconSetted] = React.useState(false);

    const favicons: any = document.getElementsByClassName('favicon');
    const favIconPath16 = '/static/img/favicon/favicon-16x16.png?v=2';
    const favIconPath32 = '/static/img/favicon/favicon-32x32.png?v=2';
    const favIconNotifyPath16 = '/static/img/favicon/favicon-notify-16x16.png?v=2';
    const favIconNotifyPath32 = '/static/img/favicon/favicon-notify-32x32.png?v=2';

    React.useEffect(() => {
        if (isNotifiedIconSetted) {
            favicons[0].href = favIconNotifyPath32;
            favicons[1].href = favIconNotifyPath16;
        } else {
            favicons[0].href = favIconPath32;
            favicons[1].href = favIconPath16;
        }
    }, [isNotifiedIconSetted]);

    return {
        isNotifiedIconSetted,
        setIsNotifiedIconSetted,
    };
};

const useIsActiveTab = () => {
    const [isActiveTab, setIsActiveTab] = React.useState(false);

    setInterval(() => {
        if (isActiveTab !== !document.hidden) {
            setIsActiveTab(!document.hidden);
        }
    }, 1000);

    return {
        isActiveTab,
    };
};

export const useFaviconChecker = () => {
    const { isActiveTab } = useIsActiveTab();
    const { setIsNotifiedIconSetted } = useSetNotifiedFavIcon();
    const client = useClient();
    const counter = client.useGlobalCounter();

    React.useEffect(() => {
        setIsNotifiedIconSetted(!!counter.alphaNotificationCounter.unreadCount && isActiveTab);
    }, [counter, isActiveTab]);
    return null;
};
