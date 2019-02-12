import * as React from 'react';
import { withApp } from '../../components/withApp';
import { DialogListComponent } from './components/DialogListComponent';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { SSearchControler } from 'react-native-s/SSearchController';
import { Platform } from 'react-native';
import { CenteredHeader } from './components/CenteredHeader';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { GlobalSearch } from './components/globalSearch/GlobalSearch';

const DialogsComponent = React.memo<PageProps>((props) => {
    return (
        <>
            {Platform.OS === 'ios' && (
                <SHeader title="Messages" />
            )}
            {Platform.OS === 'android' && (
                <CenteredHeader title="Messages" padding={98} />
            )}
            <SHeaderButton
                title="New"
                icon={Platform.OS === 'ios' ? require('assets/ic-compose-26.png') : require('assets/ic-edit.png')}
                onPress={() => props.router.push('Compose')}
            />

            {/* ugly fix - ensure list recreated for new page (reseting to root from > 1 stack)  */}
            <SSearchControler
                key={props.router.key + new Date().getTime()}
                searchRender={(p) => (<GlobalSearch query={p.query} router={props.router} />)}
            >
                <DialogListComponent dialogs={getMessenger().dialogs} />
            </SSearchControler>
        </>
    );
});

export const HomeDialogs = withApp(DialogsComponent, { navigationAppearance: Platform.OS === 'android' ? 'small-hidden' : undefined });