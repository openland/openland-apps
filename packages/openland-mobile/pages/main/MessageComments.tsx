import * as React from 'react';
import { withApp } from '../../components/withApp';
import { XMemo } from 'openland-y-utils/XMemo';
import { PageProps } from 'openland-mobile/components/PageProps';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { View, Text, TextStyle, NativeSyntheticEvent, TextInputSelectionChangeEventData } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { SScrollView } from 'react-native-s/SScrollView';
import { MessageInputBar } from './components/MessageInputBar';
import { DefaultConversationTheme, ConversationTheme } from './themes/ConversationThemeResolver';
import { MessageComments_messageComments_comments } from 'openland-api/Types';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { sortComments, getDepthOfComment } from 'openland-y-utils/sortComments';

interface MessageCommentsInnerProps {
    messageId: string;
    senderHeader: any;
    messageContent: any;
    toolButtons: any;
    comments: MessageComments_messageComments_comments[]
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
            messageId: this.props.messageId,
            message: this.state.text,
            replyComment: null,
        });

        await getClient().refetchMessageComments({
            messageId: this.props.messageId,
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

    render () {
        const commentsElements = [];

        if (this.props.comments.length > 0) {
            const commentsMap = {};
    
            this.props.comments.forEach(comment => {
                commentsMap[comment.id] = comment;
            });
    
            const result = sortComments(this.props.comments, commentsMap);
    
            for (let comment of result) {
                commentsElements.push(
                    <View key={comment.id} marginLeft={20 * getDepthOfComment(comment, commentsMap)}>
                        <Text>{comment.comment.message}</Text>
                    </View>
                );
            }
        }

        return (
            <>
                <SHeader title="Comments" />
                <SScrollView flexGrow={1} paddingHorizontal={16}>
                    {this.props.senderHeader}
                    {this.props.messageContent}
                    {this.props.toolButtons}
    
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

    let comments = client.useMessageComments({ messageId: messageId }).messageComments.comments;

    // message.isOut = false;
    // message.attachTop = true;
    
    // let { topContent } = extractContent({
    //     message,
    //     engine,
    //     onDocumentPress: messenger.handleDocumentClick,
    //     onMediaPress: messenger.handleMediaClick,
    //     onUserPress: messenger.handleAvatarClick,
    //     theme: theme,
    // }, Dimensions.get('screen').width - 16, undefined, true);

    // let likesCount = 0;
    // let myLike = false;

    // if (message.reactions) {
    //     let likes = message.reactions.filter(r => r.reaction === 'LIKE');

    //     likesCount = likes.length;

    //     likes.map(r => {
    //         if (r.user.id === getMessenger().engine.user.id) {
    //             myLike = true;
    //         }
    //     });
    // }

    const topContent = undefined;
    const senderHeader = undefined; // (
    //     <TouchableWithoutFeedback onPress={() => messenger.handleAvatarClick(message.senderId)}>
    //         <View alignItems="stretch" marginTop={15} marginBottom={15} flexDirection="row">
    //             <View marginRight={15}>
    //                 <ZAvatar
    //                     size={40}
    //                     src={message.senderPhoto}
    //                     placeholderKey={message.senderId}
    //                     placeholderTitle={message.senderName}
    //                 />
    //             </View>
    //             <View flexDirection="column">
    //                 <Text style={{ fontSize: 15, fontWeight: TextStyles.weight.medium, color: '#000' } as TextStyle}>{message.senderName}
    //                     {message.sender.primaryOrganization &&
    //                         <Text style={{ fontSize: 13, fontWeight: TextStyles.weight.medium, color: '#99a2b0'} as TextStyle}>
    //                             {' ' + message.sender.primaryOrganization.name}
    //                         </Text>}
    //                 </Text>
    //                 <Text style={{ fontSize: 14, marginTop: 5, color: '#99a2b0' }}>{formatDate(message.date)}</Text>
    //             </View>
    //         </View>
    //     </TouchableWithoutFeedback>
    // );

    const toolButtons = undefined; // (
    //     <View alignItems="stretch" flexDirection="row" marginTop={10} flexGrow={1} justifyContent="flex-start">
    //         <TouchableWithoutFeedback onPress={() => messenger.handleReactionSetUnset(message, 'LIKE')}>
    //             <View backgroundColor="#f3f5f7" borderRadius={14} paddingHorizontal={7} height={28} flexDirection="row" alignItems="center" justifyContent="center">
    //                 {!myLike && <Image source={require('assets/ic-likes-24.png')} style={{ width: 24, height: 24 }} />}
    //                 {myLike && <Image source={require('assets/ic-likes-full-24.png')} style={{ width: 24, height: 24 }} />}
    //                 {likesCount > 0 && (
    //                     <Text
    //                         style={{
    //                             fontSize: 14,
    //                             fontWeight: TextStyles.weight.medium,
    //                             marginLeft: 2,
    //                             marginRight: 1,
    //                             opacity: 0.8
    //                         } as TextStyle}
    //                     >
    //                         {likesCount}
    //                     </Text>
    //                 )}
    //             </View>
    //         </TouchableWithoutFeedback>
    //     </View>
    // );

    return (
        <MessageCommentsInner
            messageId={messageId}
            senderHeader={senderHeader}
            messageContent={topContent}
            toolButtons={toolButtons}
            comments={comments}
        />
    );
});

export const MessageComments = withApp(MessageCommentsComponent, { navigationAppearance: 'small', hideHairline: false });
