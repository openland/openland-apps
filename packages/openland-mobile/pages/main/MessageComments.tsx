import * as React from 'react';
import { withApp } from '../../components/withApp';
import { XMemo } from 'openland-y-utils/XMemo';
import { PageProps } from 'openland-mobile/components/PageProps';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { View, Text, TextStyle, NativeSyntheticEvent, TextInputSelectionChangeEventData, TouchableWithoutFeedback, Image, Platform } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { SScrollView } from 'react-native-s/SScrollView';
import { MessageInputBar } from './components/MessageInputBar';
import { DefaultConversationTheme, ConversationTheme } from './themes/ConversationThemeResolver';
import { MessageComments_messageComments_comments, FullMessage_GeneralMessage, MessageComments_messageComments_comments_comment, CommentWatch_event_CommentUpdateSingle_update } from 'openland-api/Types';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { sortComments, getDepthOfComment } from 'openland-y-utils/sortComments';
import { MessageView } from 'openland-mobile/messenger/components/MessageView';
import { MobileMessenger } from 'openland-mobile/messenger/MobileMessenger';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { reactionMap } from 'openland-mobile/messenger/components/AsyncMessageReactionsView';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { SenderView } from 'openland-mobile/messenger/components/SenderView';
import { CommentView } from 'openland-mobile/messenger/components/CommentView';
import { SequenceModernWatcher } from 'openland-engines/core/SequenceModernWatcher';

interface MessageCommentsInnerProps {
    message: FullMessage_GeneralMessage;
    comments: MessageComments_messageComments_comments[];
    messenger: MobileMessenger;
}

interface MessageCommentsInnerState {
    text: string;
    theme: ConversationTheme;
    replyTo: MessageComments_messageComments_comments_comment | undefined;
}

class MessageCommentsInner extends React.Component<MessageCommentsInnerProps, MessageCommentsInnerState> {
    constructor(props: MessageCommentsInnerProps) {
        super(props);
        this.state = {
            text: '',
            theme: DefaultConversationTheme,
            replyTo: undefined
        };
    }

    handleAttach = () => {
        // temp ignore
    }

    handleSubmit = async () => {
        await getClient().mutateAddMessageComment({
            messageId: this.props.message.id,
            message: this.state.text,
            replyComment: this.state.replyTo ? this.state.replyTo.id : null,
        });

        this.setState({ text: '', replyTo: undefined });
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

    handleReplyPress = (comment: MessageComments_messageComments_comments_comment) => {
        this.setState({ replyTo: comment });
    }

    handleReplyClear = () => {
        this.setState({ replyTo: undefined });
    }

    render () {
        const { message, comments } = this.props;
        const { replyTo } = this.state;
        const commentsElements = [];

        if (this.props.comments.length > 0) {
            const commentsMap = {};
    
            this.props.comments.forEach(comment => {
                commentsMap[comment.id] = comment;
            });
    
            const result = sortComments(comments, commentsMap);
    
            for (let commentEntry of result) {
                commentsElements.push(<CommentView key={commentEntry.id} comment={commentEntry.comment} depth={getDepthOfComment(commentEntry, commentsMap)} onReplyPress={this.handleReplyPress} />);
            }
        }

        let likesCount = message.reactions.length;
        let myLike = false;

        message.reactions.map(r => {
            if (r.user.id === getMessenger().engine.user.id) {
                myLike = true;
            }
        });

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

        const replyView = replyTo ? (
            <View marginLeft={Platform.OS === 'android' ? 12 : 15} paddingLeft={8} marginRight={Platform.OS === 'android' ? 12 : 52} borderLeftColor="#0084fe" borderLeftWidth={2} marginTop={10} marginBottom={4} flexDirection="row">
                <View flexGrow={1}>
                    <Text style={{ color: '#0084fe', fontSize: 14, lineHeight: 20, marginBottom: 1, fontWeight: TextStyles.weight.medium } as TextStyle} numberOfLines={1}>{replyTo.sender.name}</Text>
                    <Text style={{ color: '#99a2b0', fontSize: 14 }} numberOfLines={1}>{replyTo.message}</Text>
                </View>
                <TouchableWithoutFeedback onPress={this.handleReplyClear}>
                    <View marginLeft={11} width={18} height={38} alignItems="center" justifyContent="center">
                        <Image source={require('assets/ic-cancel-gray-18.png')} style={{ tintColor: '#b9c1cd', width: 18, height: 18 }} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        ) : undefined;

        return (
            <>
                <SHeader title="Comments" />
                <SScrollView flexGrow={1} paddingHorizontal={16}>
                    <SenderView sender={message.sender} date={message.date} />
                    <MessageView message={message} />

                    {toolButtons}

                    {comments.length > 0 && (
                        <>
                            <View height={1} backgroundColor="#eff0f2" marginTop={20} />

                            <View marginTop={20} marginBottom={20}>
                                <Text style={{ fontSize: 16, color: '#99a2b0', fontWeight: TextStyles.weight.medium } as TextStyle}>COMMENTS: <Text style={{ color: '#b9c1cd' }}>{this.props.comments.length}</Text></Text>
                            </View>

                            {commentsElements}

                            <View height={50} />
                        </>
                    )}

                    {comments.length === 0 && (
                        <View flexGrow={1} flexShrink={1} alignItems="center" justifyContent="center" paddingVertical={40}>
                            <Image source={require('assets/img-empty.png')} style={{ width: 224, height: 224, marginBottom: 30 }} />
                            <Text style={{ fontSize: 15, color: 'rgba(0, 0, 0, 0.4)' }}>Write the first comment</Text>
                        </View>
                    )}
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
                    topContent={replyView}
                />
            </>
        );
    }
}

const MessageCommentsComponent = XMemo<PageProps>((props) => {
    let messageId = props.router.params.messageId;

    let messenger = getMessenger();
    let client = getClient();

    let message = client.useMessage({ messageId: messageId }).message as FullMessage_GeneralMessage;
    let comments = client.useMessageComments({ messageId: messageId }).messageComments.comments;

    const updateHandler = async (event: CommentWatch_event_CommentUpdateSingle_update) => {
        if (event.__typename === 'CommentReceived') {
            await client.refetchMessageComments({ messageId });
        }
    };

    React.useEffect(() => {
        const watcher = new SequenceModernWatcher('comment messageId:' + messageId, client.subscribeCommentWatch({ peerId: messageId }), client.client, updateHandler, undefined, { peerId: messageId }, null );

        return () => {
            watcher.destroy();
        };
    });

    return (
        <MessageCommentsInner
            message={message}
            comments={comments}
            messenger={messenger}
        />
    );
});

export const MessageComments = withApp(MessageCommentsComponent, { navigationAppearance: 'small', hideHairline: false });
