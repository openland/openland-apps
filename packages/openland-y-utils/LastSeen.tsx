import * as React from 'react';

export const useLastSeen = (online: boolean) => {
    const [update, setUpdate] = React.useState<Date>(new Date());

    React.useLayoutEffect(
        () => {
            let timer: any = null;
            if (!online) {
                timer = setInterval(() => {
                    setUpdate(new Date());
                }, 1000);
            }
            return () => clearInterval(timer);
        },
        [update, online],
    );
};