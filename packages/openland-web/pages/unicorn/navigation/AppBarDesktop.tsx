import * as React from 'react';
import { XView } from 'react-mental';
import AppLogo from './app_logo.svg';
import DiscoverIcon from './icon_discover.svg';
import ChatIcon from './icon_chat.svg';
import ProfileIcon from './icon_profile.svg';
import { ThemeLightBlue } from 'openland-y-utils/themes';

export const AppBarDesktop = React.memo(() => {
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
            >
                <DiscoverIcon />
            </XView>
            <XView 
                width={64} 
                height={54} 
                alignItems="center" 
                justifyContent="center"
                hoverBackgroundColor={ThemeLightBlue.backgroundTertiaryHover}
                cursor="pointer"
            >
                <ChatIcon />
            </XView>
            <XView 
                width={64} 
                height={54} 
                alignItems="center" 
                justifyContent="center"
                hoverBackgroundColor={ThemeLightBlue.backgroundTertiaryHover}
                cursor="pointer"
            >
                <ProfileIcon />
            </XView>
        </XView>
    );
});