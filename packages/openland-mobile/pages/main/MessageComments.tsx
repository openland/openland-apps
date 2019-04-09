import * as React from 'react';
import { withApp } from '../../components/withApp';
import { XMemo } from 'openland-y-utils/XMemo';
import { PageProps } from 'openland-mobile/components/PageProps';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { View, Text, TextStyle, NativeSyntheticEvent, TextInputSelectionChangeEventData, TouchableWithoutFeedback, Image } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { SScrollView } from 'react-native-s/SScrollView';
import { MessageInputBar } from './components/MessageInputBar';
import { DefaultConversationTheme, ConversationTheme } from './themes/ConversationThemeResolver';
import { MessageComments_messageComments_comments, FullMessage_GeneralMessage } from 'openland-api/Types';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { sortComments, getDepthOfComment } from 'openland-y-utils/sortComments';
import { MessageView } from 'openland-mobile/messenger/components/MessageView';
import { MobileMessenger } from 'openland-mobile/messenger/MobileMessenger';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { formatDate } from 'openland-mobile/utils/formatDate';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { reactionMap } from 'openland-mobile/messenger/components/AsyncMessageReactionsView';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { SenderView } from 'openland-mobile/messenger/components/SenderView';

interface MessageCommentsInnerProps {
    message: FullMessage_GeneralMessage;
    comments: MessageComments_messageComments_comments[];
    messenger: MobileMessenger;
}

interface MessageCommentsInnerState {
    text: string;
    theme: ConversationTheme;
}

class MessageCommentsInner extends React.Component<MessageCommentsInnerProps, MessageCommentsInnerState> {
    constructor(props: MessageCommentsInnerProps) {
        super(props);
        this.state = {
            text: '',
            theme: DefaultConversationTheme,
        };
    }

    handleAttach = () => {
        // temp ignore
    }

    handleSubmit = async () => {
        await getClient().mutateAddMessageComment({
            messageId: this.props.message.id,
            message: this.state.text,
            replyComment: null,
        });

        await getClient().refetchMessageComments({
            messageId: this.props.message.id,
        });

        this.setState({ text: '' });
    }

    handleTextChange = (src: string) => {
        this.setState({ text: src });
    }

    handleSelectionChange = (e: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
        // temp ignore
    }

    handleFocus = () => {
        // temp ignore
    }

    handleBlur = () => {
        // temp ignore
    }

    handleReactionPress = () => {
        let r = 'LIKE';
        let message = this.props.message;
        let engine = this.props.messenger.engine;
        let client = engine.client;

        startLoader();
            try {
                let remove = message.reactions && message.reactions.filter(userReaction => userReaction.user.id === engine.user.id && userReaction.reaction === r).length > 0;
                if (remove) {
                    client.mutateMessageUnsetReaction({ messageId: message.id!, reaction: reactionMap[r] });
                } else {
                    client.mutateMessageSetReaction({ messageId: message.id!, reaction: reactionMap[r] });
                }
            } catch (e) {
                Alert.alert(e.message);
            }
        stopLoader();
    }

    render () {
        const { message, comments, messenger } = this.props;
        const commentsElements = [];

        if (this.props.comments.length > 0) {
            const commentsMap = {};
    
            this.props.comments.forEach(comment => {
                commentsMap[comment.id] = comment;
            });
    
            const result = sortComments(comments, commentsMap);
    
            for (let commentEntry of result) {
                commentsElements.push(
                    <View key={commentEntry.id} marginLeft={20 * getDepthOfComment(commentEntry, commentsMap)}>
                        <MessageView message={commentEntry.comment} />
                    </View>
                );
            }
        }

        let likesCount = 0;
        let myLike = false;

        if (message.reactions) {
            let likes = message.reactions.filter(r => r.reaction === 'LIKE');

            likesCount = likes.length;

            likes.map(r => {
                if (r.user.id === getMessenger().engine.user.id) {
                    myLike = true;
                }
            });
        }

        const toolButtons = (
            <View alignItems="stretch" flexDirection="row" marginTop={10} flexGrow={1} justifyContent="flex-start">
                <TouchableWithoutFeedback onPress={this.handleReactionPress}>
                    <View backgroundColor="#f3f5f7" borderRadius={14} paddingHorizontal={7} height={28} flexDirection="row" alignItems="center" justifyContent="center">
                        {!myLike && <Image source={require('assets/ic-likes-24.png')} style={{ width: 24, height: 24 }} />}
                        {myLike && <Image source={require('assets/ic-likes-full-24.png')} style={{ width: 24, height: 24 }} />}
                        {likesCount > 0 && (
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: TextStyles.weight.medium,
                                    marginLeft: 2,
                                    marginRight: 1,
                                    opacity: 0.8
                                } as TextStyle}
                            >
                                {likesCount}
                            </Text>
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );

        return (
            <>
                <SHeader title="Comments" />
                <SScrollView flexGrow={1} paddingHorizontal={16}>
                    <SenderView sender={message.sender} date={message.date} />
                    <MessageView message={message} />

                    {toolButtons}
    
                    <View height={1} backgroundColor="#eff0f2" marginTop={20} />

                    <View marginTop={20} marginBottom={20}>
                        <Text style={{ fontSize: 16, color: '#99a2b0', fontWeight: TextStyles.weight.medium } as TextStyle}>COMMENTS: <Text style={{ color: '#b9c1cd' }}>{this.props.comments.length}</Text></Text>
                    </View>

                    {commentsElements}

                    <View height={60} />
                </SScrollView>

                <MessageInputBar
                    attachesEnabled={false}
                    onAttachPress={this.handleAttach}
                    onSubmitPress={this.handleSubmit}
                    onChangeText={this.handleTextChange}
                    onSelectionChange={this.handleSelectionChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    text={this.state.text}
                    theme={this.state.theme}
                    placeholder="Write a comment..."
                />
            </>
        );
    }
}

const MessageCommentsComponent = XMemo<PageProps>((props) => {
    const theme = React.useContext(ThemeContext);
    let channelId = props.router.params.flexibleId || props.router.params.id;
    let messageId = props.router.params.messageId;

    let messenger = getMessenger();
    let client = getClient();

    let engine = messenger.engine.getConversation(channelId);

    let message = client.useMessage({ messageId: messageId }).message as FullMessage_GeneralMessage;
    let comments = client.useMessageComments({ messageId: messageId }).messageComments.comments;

    return (
        <MessageCommentsInner
            message={message}
            comments={comments}
            messenger={messenger}
        />
    );
});

export const MessageComments = withApp(MessageCommentsComponent, { navigationAppearance: 'small', hideHairline: false });
