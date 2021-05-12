import * as React from 'react';

type ChangedProps = { key: string, prev: any, current: any }[];

export const useChangedProps = (cb: (changedProps: ChangedProps) => void, props: Object) => {
    const prevProps = React.useRef(props);
    React.useEffect(() => {
        const changedProps = Object.entries(props).map(([key, val]) => {
            if (prevProps.current[key] !== val) {
                return { key, prev: prevProps.current[key], current: val };
            } else {
                return null;
            }
        }).filter(Boolean) as ChangedProps;

        cb(changedProps);
        prevProps.current = props;
    }, [props]);
};
