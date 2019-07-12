import * as React from 'react';
import { XView } from 'react-mental';
import DiscoverIcon from './icon_discover.svg';
import DiscoverActiveIcon from './icon_discover_active.svg';
import ChatIcon from './icon_chat.svg';
import ChatActiveIcon from './icon_chat_active.svg';
import ProfileIcon from './icon_profile.svg';
import ProfileActiveIcon from './icon_profile_active.svg';
import { ThemeLightBlue } from 'openland-y-utils/themes';

export const AppBarMobile = React.memo((props: { selected: number, setSelected: (index: number) => void }) => {
    return (
        <XView height={52} backgroundColor={ThemeLightBlue.backgroundPrimary} flexDirection="row">
            <XView
                height={52}
                flexGrow={1}
                flexBasis={0}
                minWidth={0}
                alignItems="center"
                justifyContent="center"
                hoverBackgroundColor={ThemeLightBlue.backgroundPrimaryHover}
                cursor="pointer"
                onClick={() => props.setSelected(0)}
            >
                {props.selected === 0 && <DiscoverActiveIcon />}
                {props.selected !== 0 && <DiscoverIcon />}
            </XView>
            <XView
                height={52}
                flexGrow={1}
                flexBasis={0}
                minWidth={0}
                alignItems="center"
                justifyContent="center"
                hoverBackgroundColor={ThemeLightBlue.backgroundPrimaryHover}
                cursor="pointer"
                onClick={() => props.setSelected(1)}
            >
                {props.selected === 1 && <ChatActiveIcon />}
                {props.selected !== 1 && <ChatIcon />}
            </XView>
            <XView
                height={52}
                flexGrow={1}
                flexBasis={0}
                minWidth={0}
                alignItems="center"
                justifyContent="center"
                hoverBackgroundColor={ThemeLightBlue.backgroundPrimaryHover}
                cursor="pointer"
                onClick={() => props.setSelected(2)}
            >
                {props.selected === 2 && <ProfileActiveIcon />}
                {props.selected !== 2 && <ProfileIcon />}
            </XView>
        </XView>
    );
});