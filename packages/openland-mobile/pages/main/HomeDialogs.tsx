import * as React from 'react';
import ActionSheet from 'openland-mobile/components/ActionSheet';
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
import { ZLoader } from 'openland-mobile/components/ZLoader';

type DialogType = 'all' | 'unread' | 'groups' | 'private';

function showFilters(selected: DialogType, onSelect: (d: DialogType) => void) {
    const actionSheet = ActionSheet.builder();
    actionSheet.action(
        'All chats',
        () => onSelect('all'),
        false,
        require('assets/ic-message-24.png'),
        undefined,
        selected === 'all',
    );
    actionSheet.action(
        'Unread',
        () => onSelect('unread'),
        false,
        require('assets/ic-unread-24.png'),
        undefined,
        selected === 'unread',
    );
    actionSheet.action(
        'Direct',
        () => onSelect('private'),
        false,
        require('assets/ic-user-24.png'),
        undefined,
        selected === 'private',
    );
    actionSheet.action(
        'Groups',
        () => onSelect('groups'),
        false,
        require('assets/ic-group-24.png'),
        undefined,
        selected === 'groups',
    );
    actionSheet.show(true);
}

const ExperimentalDialogFragment = React.memo((props: { filter: DialogType }) => {
    const [inited, setInited] = React.useState(false);
    const messenger = getMessenger();
    const dialogs = React.useMemo(() => {
        return messenger.getExperimentalDialog(props.filter);
    }, [props.filter]);

    React.useEffect(() => {
        setInited(false);
        const timer = setTimeout(() => {
            setInited(true);
        }, 0);
        return () => clearTimeout(timer);
    }, [props.filter]);

    if (!dialogs || !inited) {
        return <ZLoader />;
    }

    return <DialogListComponent dialogs={dialogs} applyModes={[dialogs.key]} />;
});

const DefaultDialogs = React.memo(
    (props: PageProps & { handlePress: (id: string, title: string) => void }) => {
        const messenger = getMessenger();
        const setTab = React.useContext(SetTabContext);

        const dialogs =
            props.router.params.share || props.router.params.pressCallback
                ? new ASDataView(messenger.engine.dialogList.dataSource, (item) => {
                      return (
                          <DialogItemViewAsync
                              item={item}
                              onPress={(id, i) =>
                                  props.handlePress(id, (i as DialogDataSourceItem).title)
                              }
                              showDiscover={() => false}
                          />
                      );
                  })
                : messenger.getDialogs(setTab);

        return <DialogListComponent dialogs={dialogs} />;
    },
);

const DialogsComponent = React.memo((props: PageProps) => {
    const [dialogFilter, setDialogFilter] = React.useState<DialogType>('all');
    const messenger = getMessenger();

    const handlePress = React.useCallback(
        (id: string, title: string) => {
            if (props.router.params.share) {
                Alert.builder()
                    .title(`Share with ${title}?`)
                    .button('Cancel', 'cancel')
                    .button('Share', 'default', async () => {
                        if (props.router.params.share.files) {
                            let filesMeta: { name: string; path: string }[] = [];
                            for (let attach of props.router.params.share.files) {
                                let path = attach.split('/');
                                filesMeta.push({ name: path[path.length - 1], path: attach });
                            }
                            try {
                                await UploadManagerInstance.registerMessageUploads(
                                    id,
                                    filesMeta,
                                    undefined,
                                );
                            } catch (err) {
                                /**/
                            }
                        }

                        if (props.router.params.share.strings) {
                            for (let s of props.router.params.share.strings) {
                                messenger.engine.getConversation(id).sendMessage(s, [], undefined);
                            }
                        }
                        messenger.history.navigationManager.pushAndRemove('Conversation', { id });
                    })
                    .show();
            } else if (props.router.params.pressCallback) {
                props.router.params.pressCallback(id);
            } else {
                messenger.history.navigationManager.push('Conversation', { id });
            }
        },
        [props.router.params.share, props.router.params.pressCallback],
    );

    const handleMessagePress = React.useCallback((id: string) => {
        messenger.handleCommentsPress(id);
    }, []);

    const globalSearchValue = props.router.params.searchValue;

    const headerTitle =
        dialogFilter === 'unread'
            ? 'Unread'
            : dialogFilter === 'groups'
            ? 'Groups'
            : dialogFilter === 'private'
            ? 'Direct'
            : 'Chats';

    const enableExperimental = false;
        // !props.router.params.title ||
        // !props.router.params.share ||
        // messenger.engine.experimentalUpdates;

    return (
        <ZTrack event="mail_view">
            <SHeader
                titleAction={
                    enableExperimental
                        ? {
                              title: headerTitle,
                              active: true,
                              action: () => showFilters(dialogFilter, setDialogFilter),
                          }
                        : undefined
                }
                title={
                    props.router.params.title ||
                    (props.router.params.share ? 'Share with' : headerTitle)
                }
                searchPlaceholder="Chats, messages, and more"
            />
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
                            kinds={
                                props.router.params.title || props.router.params.share
                                    ? [GlobalSearchEntryKind.USER, GlobalSearchEntryKind.SHAREDROOM]
                                    : undefined
                            }
                            onMessagePress={
                                props.router.params.title || props.router.params.share
                                    ? undefined
                                    : handleMessagePress
                            }
                        />
                    )}
                >
                    {enableExperimental && <ExperimentalDialogFragment filter={dialogFilter} />}
                    {!enableExperimental && <DefaultDialogs {...props} handlePress={handlePress} />}
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

export const HomeDialogs = withApp(DialogsComponent, {
    navigationAppearance: Platform.OS === 'android' ? 'small-hidden' : undefined,
});
HomeDialogs.displayName = 'HomeDialogs';
