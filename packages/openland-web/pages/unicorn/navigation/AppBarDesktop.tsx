import * as React from 'react';
import { XView } from 'react-mental';
import AppLogo from './app_logo.svg';
import DiscoverIcon from './icon_discover.svg';
import DiscoverActiveIcon from './icon_discover_active.svg';
import ChatIcon from './icon_chat.svg';
import ChatActiveIcon from './icon_chat_active.svg';
import ProfileIcon from './icon_profile.svg';
import ProfileActiveIcon from './icon_profile_active.svg';
import { ThemeLightBlue } from 'openland-y-utils/themes';
import { css } from 'linaria';

const selectorStyle = css`
    position: absolute;
    top: 70px;
    left: 0px;
    height: 48px;
    width: 3px;
    background-color: #1885F2;
    border-radius: 0px 100px 100px 0px;
    transition: transform 150ms cubic-bezier(0.4, 0.0, 0.2, 1);
`;

export const AppBarDesktop = React.memo(() => {
    let [selected, setSelected] = React.useState(0);
    return (
        <XView height="100%" width="100%" backgroundColor={ThemeLightBlue.backgroundTertiary} paddingTop={2}>
            <XView width={64} height={64} alignItems="center" justifyContent="center">
                <AppLogo />
            </XView>
            <XView
                width={64}
                height={54}
                alignItems="center"
                justifyContent="center"
                hoverBackgroundColor={ThemeLightBlue.backgroundTertiaryHover}
                cursor="pointer"
                onClick={() => setSelected(0)}
            >
                {selected !== 0 && (<DiscoverIcon />)}
                {selected === 0 && (<DiscoverActiveIcon />)}
            </XView>
            <XView
                width={64}
                height={54}
                alignItems="center"
                justifyContent="center"
                hoverBackgroundColor={ThemeLightBlue.backgroundTertiaryHover}
                cursor="pointer"
                onClick={() => setSelected(1)}
            >
                {selected !== 1 && (<ChatIcon />)}
                {selected === 1 && (<ChatActiveIcon />)}
            </XView>
            <XView
                width={64}
                height={54}
                alignItems="center"
                justifyContent="center"
                hoverBackgroundColor={ThemeLightBlue.backgroundTertiaryHover}
                cursor="pointer"
                onClick={() => setSelected(2)}
            >
                {selected !== 2 && (<ProfileIcon />)}
                {selected === 2 && (<ProfileActiveIcon />)}
            </XView>
            <div
                className={selectorStyle}
                style={{ transform: `translateY(${selected * 54}px)` }}
            />
        </XView>
    );
});