import * as React from 'react';
import { preprocessText } from '../../../../../utils/TextProcessor';
import { MessageFull_mentions } from 'openland-api/Types';
import { emojify } from 'react-emojione';
import { XLink } from 'openland-x/XLink';
import { MentionComponentInner, removeEmojiFromText } from 'openland-x/XRichTextInput';
import { XView } from 'react-mental';
import { css } from 'linaria';
import { isEmoji } from '../../../../../utils/isEmoji';
import { isInternalLink } from 'openland-web/utils/isInternalLink';
import { makeInternalLinkRelative } from 'openland-web/utils/makeInternalLinkRelative';
import { OthersPopper } from './OthersPopper';
export interface MessageTextComponentProps {
    alphaMentions?: any;
    mentions: MessageFull_mentions[] | null;
    message: string;
    isService: boolean;
    isEdited: boolean;
}

const TextStyle = css`
    display: inline;
    white-space: pre-wrap;
    word-wrap: break-word;
    max-width: 100%;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 0;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.8);
`;

const TextLargeStyle = css`
    display: inline;
    white-space: pre-wrap;
    word-wrap: break-word;
    max-width: 100%;
    font-size: 36px;
    min-height: 44px;
    line-height: 40px;
    letter-spacing: -0.5;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
`;

const TextServiceStyle = css`
    display: inline;
    white-space: pre-wrap;
    word-wrap: break-word;
    max-width: 100%;
    font-size: 13px;
    line-height: 22px;
    letter-spacing: 0;
    font-weight: 400;
    text-align: center;
    color: #99a2b0;
`;

const styleEditLabel = css`
    display: inline-block;
    vertical-align: baseline;
    color: rgba(0, 0, 0, 0.4);
    font-size: 13px;
    font-weight: 400;
    line-height: 22px;
    padding-left: 6px;
`;

const styleInsane = css`
    background: url(/static/insane.gif);
    background-clip: text, border;
    -webkit-background-clip: text;
    color: transparent;
`;

let emoji = (text: string, height: number) =>
    emojify(text, {
        style: {
            height: height,
            backgroundImage: 'url(https://cdn.openland.com/shared/web/emojione-3.1.2-64x64.png)',
        },
    });

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

const roomLinkClassName = css`
    color: #1790ff;
`;

export const LinkToRoom = ({ children, roomId }: any) => {
    return (
        <XLink
            className={roomLinkClassName}
            path={`/mail/${roomId}`}
            onClick={(e: any) => e.stopPropagation()}
        >
            {children}
        </XLink>
    );
};

class MessageWithMentionsTextComponent extends React.PureComponent<{
    alphaMentions: any;
    text: string;
    mentions: MessageFull_mentions[] | null;
    isService: boolean;
}> {
    render() {
        const { text, mentions, alphaMentions, isService } = this.props;

        try {
            let mentionsFinal = mentions || [];
            if (alphaMentions) {
                mentionsFinal = alphaMentions
                    .filter(({ __typename }: any) => {
                        return __typename === 'UserMention' || __typename === 'SharedRoomMention';
                    })
                    .map((item: any) => {
                        if (item.__typename === 'UserMention') {
                            return item.user;
                        } else if (item.__typename === 'SharedRoomMention') {
                            return {
                                name: item.sharedRoom.title,
                                component: LinkToRoom,
                                props: {
                                    roomId: item.sharedRoom.id,
                                    children: item.sharedRoom.title,
                                },
                            };
                        }
                    });
            }

            if (isService) {
                let serviceMessageType;
                if (
                    text.indexOf('joined') !== -1 &&
                    text.indexOf('along with') !== -1 &&
                    text.indexOf('others') !== -1
                ) {
                    serviceMessageType = 'join_many';
                }

                if (serviceMessageType === 'join_many') {
                    const [firstMention, ...otherMentions] = mentionsFinal;

                    const items = otherMentions.map(
                        ({ name, primaryOrganization, photo, id }: any) => {
                            return {
                                title: name,
                                subtitle: primaryOrganization.name,
                                photo,
                                id,
                            };
                        },
                    );

                    mentionsFinal = [
                        firstMention,
                        {
                            name: `${otherMentions.length} others`,
                            component: OthersPopper,
                            props: {
                                items,
                                children: `${otherMentions.length} others`,
                            },
                        } as any,
                    ];

                    const finalText = text.replace(
                        `${otherMentions.length} others`,
                        `@${otherMentions.length} others`,
                    );

                    return (
                        <>
                            {getSplittedTextArray({
                                text: finalText,
                                mentions: mentionsFinal,
                            })}
                        </>
                    );
                }
            }

            return <>{getSplittedTextArray({ text, mentions: mentionsFinal })}</>;
        } catch (err) {
            return <span>{text}</span>;
        }
    }
}

export const MessageTextComponent = React.memo<MessageTextComponentProps>(props => {
    // Preprocessing

    var messageText = props.message;
    const isInsane = messageText.startsWith('🌈') && messageText.endsWith('🌈');
    const isMouthpiece = messageText.startsWith('📣') && messageText.endsWith('📣');
    const isSingleEmoji = React.useMemo(() => isEmoji(messageText), [props.message]);
    const isBig =
        isSingleEmoji ||
        isInsane ||
        isMouthpiece ||
        (messageText.length <= 302 && messageText.startsWith(':') && messageText.endsWith(':'));
    const isTextSticker = !isSingleEmoji && isBig;
    if (isInsane || isMouthpiece) {
        messageText = messageText.replace(/🌈/g, '').replace(/📣/g, '');
    } else if (isTextSticker) {
        messageText = messageText.slice(1, messageText.length - 1);
    }
    const preprocessed = React.useMemo(() => preprocessText(messageText), [messageText]);

    // Rendering
    let parts = preprocessed.map((v, i) => {
        if (v.type === 'new_line') {
            return <br key={'br-' + i} />;
        } else if (v.type === 'link') {
            if (v.link && isInternalLink(v.link)) {
                let path = v.link;
                let text = v.text || path;

                path = makeInternalLinkRelative(path);

                let url: string;

                try {
                    url = decodeURI(text);
                } catch (err) {
                    url = text;
                }

                return (
                    <XView
                        as="a"
                        key={'link-' + i}
                        path={path}
                        onClick={(e: any) => e.stopPropagation()}
                    >
                        {url}
                    </XView>
                );
            }

            return (
                <XView as="a" key={'link-' + i} href={v.link!!} target="_blank">
                    {v.text}
                </XView>
            );
        } else {
            let text = v.text!!;

            if (
                (props.mentions && props.mentions.length !== 0) ||
                (props.alphaMentions && props.alphaMentions.length !== 0)
            ) {
                return (
                    <MessageWithMentionsTextComponent
                        key={'text-' + i}
                        text={text}
                        mentions={props.mentions}
                        alphaMentions={props.alphaMentions}
                        isService={props.isService}
                    />
                );
            }

            let smileSize = isBig ? 44 : 18;

            return (
                <span className={isInsane ? styleInsane : undefined} key={'text-' + i}>
                    {emoji(text, smileSize)}
                </span>
            );
        }
    });

    let wrapperClassName = props.isService ? TextServiceStyle : isBig ? TextLargeStyle : TextStyle;
    return (
        <span className={wrapperClassName}>
            {parts}
            {props.isEdited && <span className={styleEditLabel}>(Edited)</span>}
        </span>
    );
});
