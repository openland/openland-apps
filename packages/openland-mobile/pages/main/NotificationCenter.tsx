import * as React from 'react';
import { withApp } from '../../components/withApp';
import { XMemo } from 'openland-y-utils/XMemo';
import { PageProps } from 'openland-mobile/components/PageProps';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { NotificationCenterHeader } from './components/notificationCenter/NotificationCenterHeader';
import { ASListView } from 'react-native-async-view/ASListView';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';

const NotificationCenterComponent = XMemo<PageProps>((props) => {
    const theme = React.useContext(ThemeContext);

    return (
        <>
            <NotificationCenterHeader theme={theme} />
            <ASSafeAreaContext.Consumer>
                {area => (
                    <>
                        <ASListView
                            contentPaddingTop={area.top}
                            contentPaddingBottom={area.bottom}
                            dataView={getMessenger().notifications}
                            style={{ flexGrow: 1 }}
                            headerPadding={4}
                        />
                    </>
                )}
            </ASSafeAreaContext.Consumer>
        </>
    );
});

export const NotificationCenter = withApp(NotificationCenterComponent, { navigationAppearance: 'small', hideBackText: true, hideHairline: true });