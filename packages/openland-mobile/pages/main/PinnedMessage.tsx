import * as React from 'react';
import { withApp } from '../../components/withApp';
import { XMemo } from 'openland-y-utils/XMemo';
import { PageProps } from 'openland-mobile/components/PageProps';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { Room_room_SharedRoom, RoomTiny } from 'openland-api/Types';
import { Dimensions, Platform } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';
import { convertMessage, DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { extractContent } from 'openland-mobile/messenger/components/AsyncMessageContentView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { formatDate } from 'openland-mobile/utils/formatDate';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { ASListView } from 'react-native-async-view/ASListView';
import { ASDataView } from 'react-native-async-view/ASDataView';
import { DataSource } from 'openland-y-utils/DataSource';
import { ASAvatar } from 'openland-mobile/messenger/components/ASAvatar';
import { ASText } from 'react-native-async-view/ASText';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { delay } from 'openland-y-utils/timer';

const PinnedMessageComponent = XMemo<PageProps>((props) => {
    let id = props.router.params.flexibleId || props.router.params.id;
    let messenger = getMessenger();
    let engine = messenger.engine.getConversation(id);

    let sharedRoom: Room_room_SharedRoom = props.router.params.room;

    let handleManageClick = React.useCallback(() => {
        let builder = new ActionSheetBuilder();

        if (sharedRoom && sharedRoom.canEdit) {
            builder.action('Unpin', async () => {
                startLoader();
                try {
                    await messenger.engine.client.mutateUnpinMessage({ chatId: sharedRoom!.id })
                    props.router.back();
                } finally {
                    stopLoader();
                }
            });
        }

        builder.show();
    }, []);

    let message: any;
    if (sharedRoom && sharedRoom.pinnedMessage) {
        message = convertMessage(sharedRoom.pinnedMessage as any, sharedRoom.id, messenger.engine)
        message.isOut = false;
        message.attachTop = true;
    }

    let pinnedDataView: ASDataView<DataSourceMessageItem> | undefined;
    if (message) {
        let pinnedDs = new DataSource<DataSourceMessageItem>(() => false);
        pinnedDs.initialize([message], true);

        pinnedDataView = new ASDataView(pinnedDs, (item) => {
            let { topContnet, bottomContent } = extractContent({
                message: item as any, engine,
                onDocumentPress: messenger.handleDocumentClick,
                onMediaPress: messenger.handleMediaClick,
                onUserPress: messenger.handleAvatarClick,
            }, Dimensions.get('screen').width - 16);
            return (
                <ASFlex flexGrow={1} flexDirection="column" alignItems="stretch" marginLeft={8} marginRight={8}>

                    <ASFlex alignItems="stretch" marginTop={15} marginBottom={15} onPress={() => messenger.handleAvatarClick(message.senderId)} flexDirection="row">
                        <ASAvatar
                            marginRight={15}
                            size={40}
                            src={message.senderPhoto}
                            placeholderKey={message.senderId}
                            placeholderTitle={message.senderName}

                        />
                        <ASFlex flexDirection="column">
                            <ASText fontSize={15} fontWeight={TextStyles.weight.medium} color="#000">{message.senderName}
                                {sharedRoom && sharedRoom.pinnedMessage && sharedRoom.pinnedMessage.sender.primaryOrganization &&
                                    <ASText fontSize={13} fontWeight={TextStyles.weight.medium} color="#99a2b0">
                                        {' ' + sharedRoom.pinnedMessage.sender.primaryOrganization.name}
                                    </ASText>}
                            </ASText>
                            <ASText fontSize={14} marginTop={5} color="#99a2b0">{formatDate(message.date)}</ASText>
                        </ASFlex>

                    </ASFlex>
                    {topContnet}
                    {bottomContent}
                </ASFlex>
            );
        });

    }

    const manageIcon = Platform.OS === 'android' ? require('assets/ic-more-android-24.png') : require('assets/ic-more-24.png');

    return (
        <>
            <SHeader title="Pinned message" />
            {sharedRoom && sharedRoom.canEdit && <SHeaderButton title="Manage" icon={manageIcon} onPress={handleManageClick} />}

            {pinnedDataView && <ASSafeAreaContext.Consumer>
                {area => (
                    <ASListView
                        style={{ width: '100%', height: '100%' }}
                        dataView={pinnedDataView!}
                        contentPaddingBottom={area.bottom}
                        contentPaddingTop={area.top}
                    />
                )}
            </ASSafeAreaContext.Consumer>}

        </>
    );
});

export const PinnedMessage = withApp(PinnedMessageComponent, { navigationAppearance: 'small', hideBackText: true, hideHairline: false });
