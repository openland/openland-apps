import * as React from 'react';
import { XView } from 'react-mental';
import DiscoverIcon from './icon_discover.svg';
import ChatIcon from './icon_chat.svg';
import ProfileIcon from './icon_profile.svg';
import { ThemeLightBlue } from 'openland-y-utils/themes';

export const AppBarMobile = React.memo(() => {
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
            >
                <DiscoverIcon />
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
            >
                <ChatIcon />
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
            >
                <ProfileIcon />
            </XView>
        </XView>
    );
});