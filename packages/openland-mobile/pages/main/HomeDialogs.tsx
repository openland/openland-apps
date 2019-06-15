import * as React from 'react';
import { withApp } from '../../components/withApp';
import { DialogListComponent } from './components/DialogListComponent';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SSearchControler } from 'react-native-s/SSearchController';
import { Platform } from 'react-native';
import { CenteredHeader } from './components/CenteredHeader';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { GlobalSearch } from './components/globalSearch/GlobalSearch';
import { XMemo } from 'openland-y-utils/XMemo';
import { ASDataView } from 'react-native-async-view/ASDataView';
import { DialogItemViewAsync } from 'openland-mobile/messenger/components/DialogItemViewAsync';
import { UploadManagerInstance } from 'openland-mobile/files/UploadManager';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { MainHeaderButtons } from './components/MainHeaderButtons';

const DialogsComponent = XMemo<PageProps>((props) => {
    const theme = React.useContext(ThemeContext);

    let handlePress = React.useCallback((id: string, title: string) => {
        if (props.router.params.share) {
            Alert.builder().title('Openland').message('Share with ' + title + '?').button('Cancel', 'cancel').button('Ok', 'default', async () => {
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
        } else if (props.router.params.pressCallback) {
            props.router.params.pressCallback(id, title);
        } else {
            getMessenger().history.navigationManager.push('Conversation', { id });
        }
    }, [props.router.params.share, props.router.params.callback]);

    let dialogs = (props.router.params.share || props.router.params.pressCallback) ? new ASDataView(getMessenger().engine.dialogList.dataSource, (item) => {
        return (
            <DialogItemViewAsync item={item} onPress={(id, i) => handlePress(id, (i as DialogDataSourceItem).title)} />
        );
    }) :
        getMessenger().dialogs
        ;

    return (
        <ZTrack event="mail_view">
            {Platform.OS === 'ios' && (
                <SHeader title={props.router.params.title || (props.router.params.share ? 'Share with' : 'Messages')} />
            )}
            {Platform.OS === 'android' && (
                <>
                    {(props.router.params.share || props.router.params.title) && <SHeader title={props.router.params.title || 'Share with'} />}
                    {!props.router.params.share && !props.router.params.title && <CenteredHeader title="Messages" padding={98} />}
                </>
            )}
            {!props.router.params.share && !props.router.params.title && (
                <MainHeaderButtons theme={theme} router={props.router} />
            )}

            {/* ugly fix - ensure list recreated for new page (reseting to root from > 1 stack)  */}
            <SSearchControler
                searchRender={(p) => (<GlobalSearch query={p.query} router={props.router} onGroupPress={handlePress} onUserPress={handlePress} />)}
            >
                <DialogListComponent dialogs={dialogs} />
            </SSearchControler>
        </ZTrack>
    );
});

DialogsComponent.displayName = 'Home';

export const HomeDialogs = withApp(DialogsComponent, { navigationAppearance: Platform.OS === 'android' ? 'small-hidden' : undefined });
HomeDialogs.displayName = 'HomeDialogs';