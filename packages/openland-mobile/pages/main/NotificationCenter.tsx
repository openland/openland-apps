import * as React from 'react';
import { withApp } from '../../components/withApp';
import { XMemo } from 'openland-y-utils/XMemo';
import { PageProps } from 'openland-mobile/components/PageProps';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { NotificationCenterHeader } from './components/NotificationCenterHeader';
import { ASListView } from 'react-native-async-view/ASListView';
import { ASDataView } from 'react-native-async-view/ASDataView';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';

const NotificationCenterComponent = XMemo<PageProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const [ sampleData, setSampleData ] = React.useState();

    React.useEffect(() => {
        setSampleData(new ASDataView(getMessenger().engine.dialogList.dataSource, (item) => {
            return (
                <ASFlex key={item.key}>
                    <ASText>{item.title}</ASText>
                </ASFlex>
            );
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