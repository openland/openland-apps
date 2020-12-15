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
import { getRateAppInfo, showRateAppModal, setRateAppInfo } from './modals/RateApp';
import { SUPER_ADMIN } from '../Init';

const DialogsComponent = React.memo((props: PageProps) => {
    const messenger = getMessenger();

    const handlePress = React.useCallback((id: string, title: string) => {
        if (props.router.params.share) {
            Alert.builder().title(`Share with ${title}?`).button('Cancel', 'cancel').button('Share', 'default', async () => {
                if (props.router.params.share.files) {
                    let filesMeta: { name: string, path: string }[] = [];
                    for (let attach of props.router.params.share.files) {
                        let path = attach.split('/');
                        filesMeta.push({ name: path[path.length - 1], path: attach });
                    }
                    try {
                        await UploadManagerInstance.registerMessageUploads(id, filesMeta, undefined);
                    } catch (err) { /**/ }
                }

                if (props.router.params.share.strings) {
                    for (let s of props.router.params.share.strings) {
                        messenger.engine.getConversation(id).sendMessage(s, [], undefined);
                    }
                }
                messenger.history.navigationManager.pushAndRemove('Conversation', { id });

            }).show();
        } else if (props.router.params.pressCallback) {
            props.router.params.pressCallback(id, title);
        } else {
            messenger.history.navigationManager.push('Conversation', { id });
        }
    }, [props.router.params.share, props.router.params.pressCallback]);

    const handleMessagePress = React.useCallback((id: string) => {
        messenger.handleCommentsPress(id);
    }, []);

    const setTab = React.useContext(SetTabContext);

    const dialogs = (props.router.params.share || props.router.params.pressCallback)
        ? new ASDataView(messenger.engine.dialogList.dataSource, (item) => {
            return (
                <DialogItemViewAsync item={item} onPress={(id, i) => handlePress(id, (i as DialogDataSourceItem).title)} showDiscover={() => false} />
            );
        }
        ) : messenger.getDialogs(setTab);

    const globalSearchValue = props.router.params.searchValue;

    React.useEffect(() => {
        (async () => {
            if (!SUPER_ADMIN) {
                return;
            }
            try {
                let [rateAppMeta, { shouldAskForAppReview }] = await Promise.all([
                    getRateAppInfo(),
                    messenger.engine.client.queryShouldAskForAppReview({ fetchPolicy: 'network-only' })
                ]);

                if (rateAppMeta.stopShowingRating || !shouldAskForAppReview) {
                    return;
                }

                if (rateAppMeta.appOpenedCount === 2) {
                    setTimeout(() => {
                        showRateAppModal();
                        setRateAppInfo(prevInfo => ({ appOpenedCount: prevInfo.appOpenedCount + 1, firstSeenTimestamp: Date.now() }));
                    }, 5000);
                    return;
                }

                let twoDaysInMs = 48 * 3.6e6;
                if (rateAppMeta.firstSeenTimestamp && (Date.now() - rateAppMeta.firstSeenTimestamp > twoDaysInMs)) {
                    setTimeout(() => {
                        showRateAppModal();
                        setRateAppInfo(prevInfo => ({ appOpenedCount: prevInfo.appOpenedCount + 1, stopShowingRating: true }));
                    }, 5000);
                    return;
                }

                setRateAppInfo(prevInfo => ({ appOpenedCount: prevInfo.appOpenedCount + 1 }));
            } catch (e) { /**/ }
        })();
    }, []);

    return (
        <ZTrack event="mail_view">
            <SHeader title={props.router.params.title || (props.router.params.share ? 'Share with' : 'Chats')} searchPlaceholder="Chats, messages, and more" />
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