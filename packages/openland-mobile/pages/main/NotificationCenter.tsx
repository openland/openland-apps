import * as React from 'react';
import { withApp } from '../../components/withApp';
import { XMemo } from 'openland-y-utils/XMemo';
import { PageProps } from 'openland-mobile/components/PageProps';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { NotificationCenterHeader } from './components/notificationCenter/NotificationCenterHeader';
import { ASListView } from 'react-native-async-view/ASListView';
import { ASDataView } from 'react-native-async-view/ASDataView';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { NotificationCenterItemAsync } from './components/notificationCenter/NotificationCenterItemAsync';
import { Alert } from 'openland-mobile/components/AlertBlanket';

const NotificationCenterComponent = XMemo<PageProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const [ sampleData, setSampleData ] = React.useState();

    const handlePress = React.useCallback((id: string) => {
        Alert.alert('onPress: ' + id);
    }, []);

    const handleLongPress = React.useCallback((id: string) => {
        Alert.alert('onLongPress: ' + id);
    }, []);

    React.useEffect(() => {
        setSampleData(new ASDataView(getMessenger().engine.dialogList.dataSource, (item) => {
            return <NotificationCenterItemAsync item={item} onPress={handlePress} onLongPress={handleLongPress} />;
        }));
    }, []);

    return (
        <>
            <NotificationCenterHeader theme={theme} />
            <ASSafeAreaContext.Consumer>
                {area => (
                    <>
                        {sampleData && (
                            <ASListView
                                contentPaddingTop={area.top}
                                contentPaddingBottom={area.bottom}
                                dataView={sampleData}
                                style={{ flexGrow: 1 }}
                                headerPadding={4}
                            />
                        )}
                    </>
                )}
            </ASSafeAreaContext.Consumer>
        </>
    );
});

export const NotificationCenter = withApp(NotificationCenterComponent, { navigationAppearance: 'small', hideBackText: true, hideHairline: true });