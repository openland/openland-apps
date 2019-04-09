import * as React from 'react';
import { MessageComments_messageComments_comments_comment } from 'openland-api/Types';
import { View, Text, TextStyle, StyleSheet } from 'react-native';
import { MessageView } from './MessageView';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { formatDate } from 'openland-mobile/utils/formatDate';

const styles = StyleSheet.create({
    senderName: {
        fontSize: 13,
        fontWeight: TextStyles.weight.medium,
        color: '#0084fe',
        lineHeight: 15
    } as TextStyle,
    date: {
        color: '#99a2b0',
        fontSize: 13,
        fontWeight: TextStyles.weight.medium,
        lineHeight: 15,
    } as TextStyle,
    reply: {
        color: '#0084fe',
        fontSize: 13,
        fontWeight: TextStyles.weight.medium,
        lineHeight: 15,
        marginLeft: 12
    } as TextStyle
});

export interface CommentViewProps {
    comment: MessageComments_messageComments_comments_comment;
    depth: number;
    onReplyPress: (comment: MessageComments_messageComments_comments_comment) => void;
}

export const CommentView = React.memo<CommentViewProps>((props) => {
    const { comment, depth } = props;
    const { sender, date, reactions } = comment;

    const marginLeft = (depth > 0) ? ((15 * depth) + 57) : 0;

    let avatar = (
        <View marginRight={depth === 0 ? 10 : 6}>
            <ZAvatar
                size={depth === 0 ? 32 : 16}
                src={sender.photo}
                placeholderKey={sender.id}
                placeholderTitle={sender.name}
            />
        </View>
    );

    let tools = (
        <View flexDirection="row" marginTop={4}>
            <Text style={styles.date}>{formatDate(parseInt(comment.date, 10))}</Text>
            <Text style={styles.reply} onPress={() => props.onReplyPress(comment)}>Reply</Text>
        </View>
    );

    if (depth === 0) {
        return (
            <View marginLeft={marginLeft} flexDirection="row" marginBottom={16}>
                {avatar}

                <View flexGrow={1}>
                    <Text style={[styles.senderName, { marginBottom: 1 }]}>{sender.name}</Text>
                    <MessageView message={comment} />

                    {tools}
                </View>
                <View width={44} height={20} backgroundColor="red" />
            </View>
        );
    }

    return (
        <View marginLeft={marginLeft} flexDirection="row" marginBottom={16}>
            <View flexGrow={1}>
                <View flexDirection="row" marginBottom={3}>
                    {avatar}

                    <Text style={styles.senderName}>{sender.name}</Text>
                </View>
                <MessageView message={comment} />

                {tools}
            </View>
            <View width={44} height={20} backgroundColor="red" />
        </View>
    );
});