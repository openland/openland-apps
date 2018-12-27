import * as React from 'react';
import { XView } from 'react-mental';

interface HeaderAppsItemProps {
    path: string;
    icon: any;
}

export const HeaderAppsItem = (props: HeaderAppsItemProps) => (
    <XView
        as="a"
        path={props.path}
        target="_blank"
        alignItems="center"
        justifyContent="center"
        width={51}
        height={40}
        hoverOpacity={0.7}
    >
        {props.icon}
    </XView>
);
