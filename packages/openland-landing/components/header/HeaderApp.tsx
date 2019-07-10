import * as React from 'react';
import { XView } from 'react-mental';
import AndroidIcon from 'openland-icons/landing/ic_android.svg';
import IosIcon from 'openland-icons/landing/ic_ios.svg';
import LinuxIcon from 'openland-icons/landing/ic_linux.svg';
import WindowsIcon from 'openland-icons/landing/ic_win.svg';
import MacOSIcon from 'openland-icons/landing/ic_mac.svg';
import { LandingLinks } from '../_links';

const AppIcons = {
    ios: <IosIcon />,
    android: <AndroidIcon />,
    linux: <LinuxIcon />,
    windows: <WindowsIcon />,
    macos: <MacOSIcon />,
};

interface HeaderAppProps {
    system: 'ios' | 'android' | 'macos' | 'windows' | 'linux';
}

export const HeaderApp = (props: HeaderAppProps) => (
    <XView
        as="a"
        href={LandingLinks.apps[props.system]}
        target="_blank"
        alignItems="center"
        justifyContent="center"
        width={48}
        height={40}
        hoverOpacity={0.7}
    >
        {AppIcons[props.system]}
    </XView>
);