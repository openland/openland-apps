import * as React from 'react';
import { XView } from 'react-mental';
import AndroidIcon from 'openland-icons/landing/android.svg';
import IosIcon from 'openland-icons/landing/ios.svg';

const AppPaths = {
    ios: 'https://oplnd.com/ios',
    android: 'https://oplnd.com/android_beta',
};

const AppIcons = {
    ios: <IosIcon />,
    android: <AndroidIcon />,
};

interface HeaderAppProps {
    system: 'ios' | 'android';
}

export const HeaderApp = (props: HeaderAppProps) => (
    <XView
        as="a"
        path={AppPaths[props.system]}
        target="_blank"
        alignItems="center"
        justifyContent="center"
        width={51}
        height={40}
        hoverOpacity={0.7}
    >
        {AppIcons[props.system]}
    </XView>
);
