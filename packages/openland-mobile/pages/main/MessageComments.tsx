import * as React from 'react';
import { withApp } from '../../components/withApp';
import { XMemo } from 'openland-y-utils/XMemo';
import { PageProps } from 'openland-mobile/components/PageProps';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { Dimensions } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { extractContent } from 'openland-mobile/messenger/components/AsyncMessageContentView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { formatDate } from 'openland-mobile/utils/formatDate';
import { ASAvatar } from 'openland-mobile/messenger/components/ASAvatar';
import { ASText } from 'react-native-async-view/ASText';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { SDeferred } from 'react-native-s/SDeferred';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { ASView } from 'react-native-async-view/ASView';

const MessageCommentsComponent = XMemo<PageProps>((props) => {
    const theme = React.useContext(ThemeContext);
    let id = props.router.params.flexibleId || props.router.params.id;
    let messenger = getMessenger();
    let engine = messenger.engine.getConversation(id);

    let message: DataSourceMessageItem = props.router.params.message;
    
    let { topContent, bottomContent } = extractContent({
        message,
        engine,
        onDocumentPress: messenger.handleDocumentClick,
        onMediaPress: messenger.handleMediaClick,
        onUserPress: messenger.handleAvatarClick,
        theme: theme,
    }, Dimensions.get('screen').width - 16);

    return (
        <>
            <SHeader title="Comments" />
            <SDeferred>
                <ASSafeAreaView>
                    <ASView>
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
                                        {message.sender.primaryOrganization &&
                                            <ASText fontSize={13} fontWeight={TextStyles.weight.medium} color="#99a2b0">
                                                {' ' + message.sender.primaryOrganization.name}
                                            </ASText>}
                                    </ASText>
                                    <ASText fontSize={14} marginTop={5} color="#99a2b0">{formatDate(message.date)}</ASText>
                                </ASFlex>
                            </ASFlex>

                            {topContent}
                            {bottomContent}
                        </ASFlex>
                    </ASView>
                </ASSafeAreaView>
            </SDeferred>
        </>
    );
});

export const MessageComments = withApp(MessageCommentsComponent, { navigationAppearance: 'small', hideHairline: false });
