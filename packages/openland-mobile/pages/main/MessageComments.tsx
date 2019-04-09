import * as React from 'react';
import { withApp } from '../../components/withApp';
import { XMemo } from 'openland-y-utils/XMemo';
import { PageProps } from 'openland-mobile/components/PageProps';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { Dimensions, View, TouchableOpacity, Text, TextStyle } from 'react-native';
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
import { ZAvatar } from 'openland-mobile/components/ZAvatar';

const MessageCommentsComponent = XMemo<PageProps>((props) => {
    const theme = React.useContext(ThemeContext);
    let id = props.router.params.flexibleId || props.router.params.id;
    let messenger = getMessenger();
    let engine = messenger.engine.getConversation(id);

    let message: DataSourceMessageItem = props.router.params.message;

    message.isOut = false;
    message.attachTop = true;
    
    let { topContent } = extractContent({
        message,
        engine,
        onDocumentPress: messenger.handleDocumentClick,
        onMediaPress: messenger.handleMediaClick,
        onUserPress: messenger.handleAvatarClick,
        theme: theme,
    }, Dimensions.get('screen').width - 16, undefined, true);

    return (
        <>
            <SHeader title="Comments" />
            <SDeferred>
                <ASSafeAreaView>
                    <View flexGrow={1} flexDirection="column" alignItems="stretch" marginLeft={8} marginRight={8}>
                        <TouchableOpacity onPress={() => messenger.handleAvatarClick(message.senderId)}>
                            <View alignItems="stretch" marginTop={15} marginBottom={15} flexDirection="row">
                                <View marginRight={15}>
                                    <ZAvatar
                                        size={40}
                                        src={message.senderPhoto}
                                        placeholderKey={message.senderId}
                                        placeholderTitle={message.senderName}
                                    />
                                </View>
                                <View flexDirection="column">
                                    <Text style={{ fontSize: 15, fontWeight: TextStyles.weight.medium, color: '#000' } as TextStyle}>{message.senderName}
                                        {message.sender.primaryOrganization &&
                                            <Text style={{ fontSize: 13, fontWeight: TextStyles.weight.medium, color: '#99a2b0'} as TextStyle}>
                                                {' ' + message.sender.primaryOrganization.name}
                                            </Text>}
                                    </Text>
                                    <Text style={{ fontSize: 14, marginTop: 5, color: '#99a2b0' }}>{formatDate(message.date)}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        {topContent}
                    </View>
                </ASSafeAreaView>
            </SDeferred>
        </>
    );
});

export const MessageComments = withApp(MessageCommentsComponent, { navigationAppearance: 'small', hideHairline: false });
