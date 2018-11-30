import * as React from 'react';
import { MessageFull_mentions } from 'openland-api/Types';
import { getEmojiRegex } from 'openland-y-utils/getEmojiRegex';

export const removeEmojiFromText = (str: string) => {
    return str.replace(getEmojiRegex(), '').trim();
};

const getMentionString = (str: string) => {
    return `@${removeEmojiFromText(str)}`;
};

type MentionComponentInnerTextProps = {
    className?: string;
    mention: MessageFull_mentions;
    hasPopper?: boolean;
    children?: any;
    inCompose?: boolean;
};

const MentionComponentInnerText = ({
    mention,
    inCompose,
    children,
}: {
    mention: MessageFull_mentions;
    inCompose?: boolean;
    children?: any;
}) => {
    const paddings = inCompose
        ? {
              paddingTop: 1,
              paddingBottom: 1,
              paddingLeft: 3,
              paddingRight: 3,
          }
        : {};

    let style;

    if (mention.isYou) {
        style = {};
    }

    if (mention.isYou) {
        style = {
            ...paddings,
            backgroundColor: '#fff6e5',
            color: '#1790ff',
        };
    } else {
        style = {
            ...paddings,
            color: '#1790ff',
        };
    }

    return <span style={style}>{children}</span>;
};

export class MentionComponentInner extends React.Component<
    MentionComponentInnerTextProps
> {
    render() {
        // const { mention, hasPopper } = this.props;
        return (
            <MentionComponentInnerText
                mention={this.props.mention}
                inCompose={this.props.inCompose}
            >
                {this.props.children}
            </MentionComponentInnerText>
        );
    }
}

type textBeforeMentionAndMentionT = {
    textBeforeMention: string;
    mention: MessageFull_mentions | null;
};

const getArrayOfPairsTextBeforeMentionAndMention = ({
    messageText,
    mentions,
}: {
    messageText: string;
    mentions: MessageFull_mentions[];
}): textBeforeMentionAndMentionT[] => {
    let mentionMatchesMap: { [key: number]: string } = {};
    let endText = messageText;

    let result = [];
    for (let i = 0; i < mentions.length; i++) {
        const mention = mentions[i];
        const mentionString = getMentionString(mention.name);
        const mentionIndex = endText.indexOf(mentionString);
        mentionMatchesMap[mentionIndex] = mentionString;
        const begining = endText.slice(0, mentionIndex);
        const end = endText.slice(mentionIndex + mentionString.length);

        result.push({
            textBeforeMention: begining,
            mention,
        });

        endText = end;
    }

    result.push({
        textBeforeMention: endText,
        mention: null,
    });

    return result;
};

export class MessageWithMentionsTextComponent extends React.PureComponent<{
    text: string;
    mentions: MessageFull_mentions[];
}> {
    render() {
        const { text, mentions } = this.props;

        return (
            <>
                {getArrayOfPairsTextBeforeMentionAndMention({
                    messageText: text,
                    mentions,
                }).map(
                    (
                        {
                            textBeforeMention,
                            mention,
                        }: textBeforeMentionAndMentionT,
                        key: number,
                    ) => {
                        return (
                            <span key={key}>
                                {textBeforeMention}
                                {mention && (
                                    <MentionComponentInner
                                        mention={mention}
                                        hasPopper
                                    >
                                        {mention.name}
                                    </MentionComponentInner>
                                )}
                            </span>
                        );
                    },
                )}
            </>
        );
    }
}
