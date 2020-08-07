import * as React from 'react';
import { withApp } from '../../components/withApp';
import { DialogListComponent } from './components/DialogListComponent';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SSearchControler } from 'react-native-s/SSearchController';
import { Platform } from 'react-native';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { GlobalSearch } from './components/globalSearch/GlobalSearch';
import { ASDataView } from 'react-native-async-view/ASDataView';
import { DialogItemViewAsync } from 'openland-mobile/messenger/components/DialogItemViewAsync';
import { UploadManagerInstance } from 'openland-mobile/files/UploadManager';
import Alert from 'openland-mobile/components/AlertBlanket';
import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { GlobalSearchEntryKind } from 'openland-api/spacex.types';
import { SetTabContext } from './Home';

const DialogsComponent = React.memo((props: PageProps) => {
    const handlePress = React.useCallback((id: string, title: string) => {
        if (props.router.params.share) {
            Alert.builder().title(`Share with ${title}?`).button('Cancel', 'cancel').button('Share', 'default', async () => {
                if (props.router.params.share.files) {
                    for (let attach of props.router.params.share.files) {
                        let path = attach.split('/');
                        await UploadManagerInstance.registerMessageUpload(id, path[path.length - 1], attach, undefined);
                    }
                }

                if (props.router.params.share.strings) {
                    for (let s of props.router.params.share.strings) {
                        getMessenger().engine.getConversation(id).sendMessage(s, [], undefined);
                    }
                }
                getMessenger().history.navigationManager.pushAndRemove('Conversation', { id });

            }).show();
        } else if (props.router.params.pressCallback) {
            props.router.params.pressCallback(id, title);
        } else {
            getMessenger().history.navigationManager.push('Conversation', { id });
        }
    }, [props.router.params.share, props.router.params.pressCallback]);

    const handleMessagePress = React.useCallback((id: string) => {
        getMessenger().history.navigationManager.push('Message', { messageId: id });
    }, []);

    const setTab = React.useContext(SetTabContext);

    const dialogs = (props.router.params.share || props.router.params.pressCallback)
        ? new ASDataView(getMessenger().engine.dialogList.dataSource, (item) => {
            return (
                <DialogItemViewAsync item={item} onPress={(id, i) => handlePress(id, (i as DialogDataSourceItem).title)} showDiscover={() => false} />
            );
        }
        ) : getMessenger().getDialogs(setTab);

    const globalSearchValue = props.router.params.searchValue;

    return (
        <ZTrack event="mail_view">
            <SHeader title={props.router.params.title || (props.router.params.share ? 'Share with' : 'Chats')} />
            {!props.router.params.share && !props.router.params.title && (
                <SHeaderButton
                    title="New"
                    icon={require('assets/ic-add-24.png')}
                    onPress={() => props.router.push('Compose')}
                />
            )}

            {/* ugly fix - ensure list recreated for new page (reseting to root from > 1 stack)  */}
            {!globalSearchValue && (
                <SSearchControler
                    searchRender={(p) => (
                        <GlobalSearch
                            query={p.query}
                            router={props.router}
                            onGroupPress={handlePress}
                            onUserPress={handlePress}
                            kinds={(props.router.params.title || props.router.params.share) ? [GlobalSearchEntryKind.USER, GlobalSearchEntryKind.SHAREDROOM] : undefined}
                            onMessagePress={(props.router.params.title || props.router.params.share) ? undefined : handleMessagePress}
                        />
                    )}
                >
                    <DialogListComponent dialogs={dialogs} />
                </SSearchControler>
            )}
            {globalSearchValue && (
                <GlobalSearch
                    query={globalSearchValue}
                    router={props.router}
                    onMessagePress={handleMessagePress}
                    onUserPress={(id) => props.router.push('ProfileUser', { id: id })}
                />
            )}
        </ZTrack>
    );
});

DialogsComponent.displayName = 'Home';

export const HomeDialogs = withApp(DialogsComponent, { navigationAppearance: Platform.OS === 'android' ? 'small-hidden' : undefined });
HomeDialogs.displayName = 'HomeDialogs';