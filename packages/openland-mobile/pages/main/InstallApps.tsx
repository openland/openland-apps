import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { View, Share } from 'react-native';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

const InstallAppsComponent = XMemo<PageProps>((props) => {
    const theme = React.useContext(ThemeContext);

    let shareCallback = (message: string) => {
        Share.share({ message });
    };
    return (
        <>
            <SHeader title="Openland apps" hairline="hidden" />
            <ASSafeAreaView height="100%" width="100%">
                <ZListItem text="Mac" onPress={() => shareCallback('https://oplnd.com/mac')} leftIconColor={theme.accentColor} leftIcon={require('assets/install_app_mac-22.png')} />
                <ZListItem text="Windows" onPress={() => shareCallback('https://oplnd.com/windows')} leftIconColor={theme.accentColor} leftIcon={require('assets/install_app_windows-20.png')} />
                <ZListItem text="Linux" onPress={() => shareCallback('https://oplnd.com/linux')} leftIconColor={theme.accentColor} leftIcon={require('assets/install_app_linux-19.png')} />
            </ASSafeAreaView>

        </>
    );
});

export const InstallApps = withApp(InstallAppsComponent, { navigationAppearance: 'small' });