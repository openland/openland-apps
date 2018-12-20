import * as React from 'react';
import { MessageFull_mentions } from 'openland-api/Types';
import { MentionComponentInner, removeEmojiFromText } from 'openland-x/XRichTextInput';

function indexes(source: string, find: string) {
    let result = [];
    for (let i = 0; i < source.length; ++i) {
        if (source.substring(i, i + find.length) === find) {
            result.push(i);
        }
    }
    return result;
}

const getMentionString = (str: string) => {
    return `@${removeEmojiFromText(str)}`;
};

const getSplittedTextArray = ({ text, mentions }: any) => {
    let splittedTextArray: any = [text];
    let mentionMatchesMap: any = {};
    mentions.forEach(({ name }: any) => {
        // splitting message
        const arr: any = [];
        splittedTextArray.forEach((item: any) => {
            item.split(getMentionString(name)).forEach((splitted: any) => arr.push(splitted));
        });

        splittedTextArray = arr;

        // matching mentions
        const result = indexes(text, removeEmojiFromText(name));
        result.forEach(index => {
            mentionMatchesMap[index] = removeEmojiFromText(name);
        });
    });

    const mentionMatchesArray: any = [];

    Object.keys(mentionMatchesMap)
        .sort((a: any, b: any) => a - b)
        .forEach(key => {
            mentionMatchesArray.push(mentionMatchesMap[key]);
        });

    const splittedArray: any = [];
    mentions.forEach(({ name }: any) => {
        splittedArray.push(text.split(getMentionString(name)));
    });

    const getMentionByName = (name: string) => {
        const mention = mentions.find((item: any) => removeEmojiFromText(item.name) === name);
        if (!mention) {
            throw Error('no mention was found');
        }
        return mention;
    };

    return splittedTextArray.map((textItem: any, key: any) => {
        const mention = mentionMatchesArray[key]
            ? getMentionByName(mentionMatchesArray[key])
            : null;

        if (mention && mention.component) {
            const Component = mention.component;
            return (
                <span key={key}>
                    {textItem}
                    <Component {...mention.props} />
                </span>
            );
        }

        let mentionElement = mention && (
            <MentionComponentInner isYou={mention.isYou} user={mention} hasPopper>
                {mentionMatchesArray[key]}
            </MentionComponentInner>
        );

        return (
            <span key={key}>
                {textItem}
                {mentionElement}
            </span>
        );
    });
};

export class MessageWithMentionsTextComponent extends React.PureComponent<{
    alphaMentions: any;
    text: string;
    mentions?: MessageFull_mentions[] | null;
}> {
    render() {
        const { text, mentions, alphaMentions } = this.props;

        try {
            let mentionsFinal = mentions || [];
            if (alphaMentions) {
                mentionsFinal = alphaMentions
                    .filter(({ __typename }: any) => {
                        return __typename === 'UserMention';
                    })
                    .map((item: any) => {
                        if (item.__typename === 'UserMention') {
                            return item.user;
                        }
                    });
            }

            return <>{getSplittedTextArray({ text, mentions: mentionsFinal })}</>;
        } catch (err) {
            return <span>{text}</span>;
        }
    }
}
