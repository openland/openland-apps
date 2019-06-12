import * as React from 'react';
import { withApp } from '../../components/withApp';
import { XMemo } from 'openland-y-utils/XMemo';
import { PageProps } from 'openland-mobile/components/PageProps';
import { Text } from 'react-native';
import { SScrollView } from 'react-native-s/SScrollView';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { NotificationCenterHeader } from './components/NotificationCenterHeader';

const NotificationCenterComponent = XMemo<PageProps>((props) => {
    const theme = React.useContext(ThemeContext);

    return (
        <>
            <NotificationCenterHeader theme={theme} />
            <SScrollView>
                <Text>Notifications</Text>
            </SScrollView>
        </>
    );
});

export const NotificationCenter = withApp(NotificationCenterComponent, { navigationAppearance: 'small', hideBackText: true, hideHairline: true });