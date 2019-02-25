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
import { XMemo } from 'openland-y-utils/XMemo';
import { ASDataView } from 'react-native-async-view/ASDataView';
import { ThemeProvider } from '../../themes/ThemeContext';
import { DialogItemViewAsync } from 'openland-mobile/messenger/components/DialogItemViewAsync';
import { UploadManagerInstance } from 'openland-mobile/files/UploadManager';
import { Alert } from 'openland-mobile/components/AlertBlanket';

const DialogsComponent = XMemo<PageProps>((props) => {
    let handleShareDialogClick = React.useCallback((id: string) => {

        for (let attach of (props.router.params.share.files || [])) {
            // todo: resolve attah type
            // todo: resolve size
            // TODO: get real size native?
            Alert.alert(JSON.stringify({ id, attach }));
            // wtf, hardcoded works (looks like path is case sensitive, but path comes lowercase from native side, wtf, wtf, wtf)
            // attach = 'file:///Users/kor_ka/Library/Developer/CoreSimulator/Devices/76F31094-CD99-4A03-89C2-FC876C6056A3/data/Containers/Shared/AppGroup/501B8433-1F33-4D92-AAE5-BBC2A6F963BD/share/IMG_0003.JPG';
            UploadManagerInstance.registerUpload(id, 'file', attach, 100);
        }

        getMessenger().history.navigationManager.push('Conversation', { id });
    }, [props.router.params.share]);

    let dialogs = props.router.params.share ? new ASDataView(getMessenger().engine.dialogList.dataSource, (item) => {
        return (
            <ThemeProvider>
                <DialogItemViewAsync item={item} onPress={handleShareDialogClick} />
            </ThemeProvider>
        );
    }) : undefined;
    return (
        <>
            {Platform.OS === 'ios' && (
                <SHeader title={props.router.params.share ? 'Share to' : 'Messages'} />
            )}
            {Platform.OS === 'android' && (
                <CenteredHeader title="Messages" padding={98} />
            )}
            {!props.router.params.share && <SHeaderButton
                title="New"
                icon={Platform.OS === 'ios' ? require('assets/ic-compose-26.png') : require('assets/ic-edit.png')}
                onPress={() => props.router.push('Compose')}
            />}

            {props.router.params.share && (
                <DialogListComponent dialogs={dialogs!} />
            )}

            {/* ugly fix - ensure list recreated for new page (reseting to root from > 1 stack)  */}
            {!props.router.params.share && (<SSearchControler
                key={props.router.key + new Date().getTime()}
                searchRender={(p) => (<GlobalSearch query={p.query} router={props.router} />)}
            >
                <DialogListComponent dialogs={getMessenger().dialogs} />
            </SSearchControler>
            )}
        </>
    );
});

export const HomeDialogs = withApp(DialogsComponent, { navigationAppearance: Platform.OS === 'android' ? 'small-hidden' : undefined });