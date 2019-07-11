import * as React from 'react';
import { XView } from 'react-mental';
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

export const AppBarDesktop = React.memo((props: { selected: number, setSelected: (index: number) => void }) => {
    return (
        <XView height="100%" width="100%" backgroundColor={ThemeLightBlue.backgroundTertiary} paddingTop={2}>
            <XView width={64} height={64} alignItems="center" justifyContent="center">
                <img src="/static/img/logo.png" srcSet="/static/img/logo@2x.png" width={36} height={36} />
            </XView>
            <XView
                width={64}
                height={54}
                alignItems="center"
                justifyContent="center"
                hoverBackgroundColor={ThemeLightBlue.backgroundTertiaryHover}
                cursor="pointer"
                onClick={() => props.setSelected(0)}
            >
                {props.selected !== 0 && (<DiscoverIcon />)}
                {props.selected === 0 && (<DiscoverActiveIcon />)}
            </XView>
            <XView
                width={64}
                height={54}
                alignItems="center"
                justifyContent="center"
                hoverBackgroundColor={ThemeLightBlue.backgroundTertiaryHover}
                cursor="pointer"
                onClick={() => props.setSelected(1)}
            >
                {props.selected !== 1 && (<ChatIcon />)}
                {props.selected === 1 && (<ChatActiveIcon />)}
            </XView>
            <XView
                width={64}
                height={54}
                alignItems="center"
                justifyContent="center"
                hoverBackgroundColor={ThemeLightBlue.backgroundTertiaryHover}
                cursor="pointer"
                onClick={() => props.setSelected(2)}
            >
                {props.selected !== 2 && (<ProfileIcon />)}
                {props.selected === 2 && (<ProfileActiveIcon />)}
            </XView>
            <div
                className={selectorStyle}
                style={{ transform: `translateY(${props.selected * 54}px)` }}
            />
        </XView>
    );
});