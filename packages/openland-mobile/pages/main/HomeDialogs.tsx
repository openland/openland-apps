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
import { ThemeProvider, useThemeGlobal } from '../../themes/ThemeContext';
import { DialogItemViewAsync } from 'openland-mobile/messenger/components/DialogItemViewAsync';
import { UploadManagerInstance } from 'openland-mobile/files/UploadManager';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';

const DialogsComponent = XMemo<PageProps>((props) => {
    let handleShareDialogClick = React.useCallback((id: string, dialog: DialogDataSourceItem) => {
        Alert.builder().title('Openland').message('Share with ' + dialog.title + '?').button('Cancel', 'cancel').button('Ok', 'default', async () => {

            if (props.router.params.share.files) {
                for (let attach of props.router.params.share.files) {
                    let path = attach.split('/');
                    UploadManagerInstance.registerUpload(id, path[path.length - 1], attach);
                }
            }

            if (props.router.params.share.strings) {
                for (let s of props.router.params.share.strings) {
                    getMessenger().engine.getConversation(id).sendMessage(s, []);
                }
            }

            getMessenger().history.navigationManager.pushAndRemove('Conversation', { id });
        }).show();

    }, [props.router.params.share]);

    let dialogs = props.router.params.share ? new ASDataView(getMessenger().engine.dialogList.dataSource, (item) => {
        return (
            <DialogItemViewAsync item={item} onPress={handleShareDialogClick} />
        );
    }) : undefined;
    return (
        <>
            {Platform.OS === 'ios' && (
                <SHeader title={props.router.params.share ? 'Share with' : 'Messages'} />
            )}
            {Platform.OS === 'android' && (
                <>
                    {props.router.params.share && <SHeader title="Share with" />}
                    {!props.router.params.share && < CenteredHeader title="Messages" padding={98} />}
                </>
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
            {!props.router.params.share && (
                <SSearchControler
                    key={props.router.key + new Date().getTime()}
                    searchRender={(p) => (<GlobalSearch query={p.query} router={props.router} />)}
                >
                    <DialogListComponent dialogs={getMessenger().dialogs} />
                </SSearchControler>
            )}
        </>
    );
});

DialogsComponent.displayName = 'Home';

export const HomeDialogs = withApp(DialogsComponent, { navigationAppearance: Platform.OS === 'android' ? 'small-hidden' : undefined });
HomeDialogs.displayName = 'HomeDialogs';