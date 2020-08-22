import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { NotificationCenterEmpty } from 'openland-mobile/notificationCenter/NotificationCenterEmpty';
import { SHeader } from 'react-native-s/SHeader';
import { ActiveTabContext } from './Home';
import { NotificationsList } from 'openland-mobile/notificationCenter/NotificationsList';

const NotificationCenterWrapper = React.memo((props: PageProps) => {
    const engine = getMessenger().engine.notificationCenter;
    const tabEnabled = React.useContext(ActiveTabContext);
    const [, setDsGeneration] = React.useState(0);

    React.useEffect(() => {
        return engine.dataSource.dumbWatch(() => setDsGeneration(cur => cur + 1));
    }, []);

    React.useEffect(() => {
        return tabEnabled ? engine.subscribe() : () => { /* */ };
    }, [tabEnabled]);

    const isEmpty = engine.dataSource.getSize() === 0 && engine.dataSource.isInited();

    return (
        <React.Fragment key={'nc-' + isEmpty}>
            <SHeader title="Notifications" />
            {isEmpty && <NotificationCenterEmpty />}
            {!isEmpty && <NotificationsList />}
        </React.Fragment>
    );
});

export const NotificationCenter = withApp(NotificationCenterWrapper);