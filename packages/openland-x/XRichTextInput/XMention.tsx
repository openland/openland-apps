import * as React from 'react';
import { MessageFull_mentions } from 'openland-api/Types';
import { getEmojiRegex } from 'openland-y-utils/getEmojiRegex';
import { UserPopper } from 'openland-web/components/messenger/components/view/content/UserPopper';

export const removeEmojiFromText = (str: string) => {
    return str ? str.replace(getEmojiRegex(), '').trim() : '';
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

class MentionComponentInnerText extends React.PureComponent<{
    mention: MessageFull_mentions;
    inCompose?: boolean;
    children?: any;
}> {
    render() {
        const { mention, inCompose, children } = this.props;
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
    }
}

export class MentionComponentInner extends React.PureComponent<
    MentionComponentInnerTextProps
> {
    render() {
        const { hasPopper, mention } = this.props;
        if (hasPopper && mention) {
            return (
                <UserPopper
                    user={mention}
                    isMe={mention.isYou}
                    noCardOnMe
                    startSelected={false}
                >
                    <MentionComponentInnerText {...this.props} />
                </UserPopper>
            );
        } else {
            return <MentionComponentInnerText {...this.props} />;
        }
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
                                        {removeEmojiFromText(mention.name)}
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
