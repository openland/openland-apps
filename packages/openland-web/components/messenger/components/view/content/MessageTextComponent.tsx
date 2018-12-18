import * as React from 'react';
import Glamorous from 'glamorous';
import { preprocessText, Span } from './utils/TextProcessor';
import { XLinkExternal } from 'openland-x/XLinkExternal';
import { MessageFull_mentions } from 'openland-api/Types';
import { emojify } from 'react-emojione';
import { XLink } from 'openland-x/XLink';
import {
    MentionComponentInner,
    removeEmojiFromText,
} from 'openland-x/XRichTextInput';
import { XButton } from 'openland-x/XButton';
import { XAvatar } from 'openland-x/XAvatar';
import { XView } from 'react-mental';
import { XPopper } from 'openland-x/XPopper';
import { XPopperContent } from 'openland-x/popper/XPopperContent';
import { css } from 'linaria';
import { isEmoji } from './utils/isEmoji';

export interface MessageTextComponentProps {
    alphaMentions?: any;
    mentions: MessageFull_mentions[] | null;
    message: string;
    isService: boolean;
    isEdited: boolean;
}

const Title = Glamorous.span({
    fontSize: 12,
    fontWeight: 600,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.67,
    letterSpacing: 'normal',
    color: '#000',
});

const SubTitle = Glamorous.span({
    opacity: 0.4,
    fontSize: 12,
    fontWeight: 600,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: '1.5',
    letterSpacing: 'normal',
    color: '#000',
});

const XButtonStyled = Glamorous(XButton)({
    borderRadius: 20,
    width: 68,
    height: 22,
});

type JoinedUserPopperRowProps = {
    title: string;
    subtitle: string;
    photo: string;
    id: string;
};

export const JoinedUserPopperRow = ({
    title,
    subtitle,
    photo,
    id,
}: JoinedUserPopperRowProps) => {
    return (
        <XView
            cursor="pointer"
            flexDirection="row"
            alignItems="center"
            hoverBackgroundColor="#f9f9f9"
            paddingLeft={16}
            paddingRight={16}
            width={393}
            height={36}
            path={'/mail/u/' + id}
        >
            <XAvatar
                style="user"
                cloudImageUuid={photo === null ? undefined : photo}
                objectName={title}
                objectId={id}
                size="m-small"
            />
            <XView marginLeft={12} flexDirection="column">
                <Title>{title}</Title>
            </XView>
            <XView marginLeft={9} flexDirection="column">
                <SubTitle>{subtitle}</SubTitle>
            </XView>
            <XView flexGrow={1} />
            <XButtonStyled
                text="Message"
                style="primary"
                size="tiny"
                path={'/mail/' + id}
            />
        </XView>
    );
};

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
    color: #99A2B0;
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

let emoji = (text: string, height: number) =>
    emojify(text, {
        style: {
            height: height,
            backgroundImage:
                'url(https://cdn.openland.com/shared/web/emojione-3.1.2-64x64.png)',
        },
    });

export let makeInternalLinkRelative = (url: string) => {
    let rel = url
        .replace('http://app.openland.com/', '/')
        .replace('https://app.openland.com/', '/')
        .replace('//app.openland.com/', '/')
        .replace('http://next.openland.com/', '/')
        .replace('https://next.openland.com/', '/')
        .replace('//next.openland.com/', '/');

    return rel;
};

export let isInternalLink = (url: string) => {
    return (
        url.includes('//app.openland.com/') ||
        url.includes('//next.openland.com/')
    );
};

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
            item.split(getMentionString(name)).forEach((splitted: any) =>
                arr.push(splitted),
            );
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
        const mention = mentions.find(
            (item: any) => removeEmojiFromText(item.name) === name,
        );
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
            <MentionComponentInner
                isYou={mention.isYou}
                user={mention}
                hasPopper
            >
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

const XPopperContentStyled = Glamorous(XPopperContent)({
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 0,
    paddingRight: 0,
});

export const OthersPopper = (props: any) => {
    return (
        <XPopper
            contentContainer={<XPopperContentStyled />}
            content={props.items.map((item: any, key: any) => {
                return <JoinedUserPopperRow {...item} key={key} />;
            })}
            showOnHover={true}
            placement="top"
        >
            <span
                style={{
                    cursor: 'pointer',
                    color: '#1790ff',
                }}
            >
                {props.children}
            </span>
        </XPopper>
    );
};

const LinkToRoom = ({ children, roomId }: any) => {
    return (
        <XLink
            className="link"
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
                        return (
                            __typename === 'UserMention' ||
                            __typename === 'SharedRoomMention'
                        );
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

            return (
                <>{getSplittedTextArray({ text, mentions: mentionsFinal })}</>
            );
        } catch (err) {
            return <span>{text}</span>;
        }
    }
}

export const MessageTextComponent = React.memo<MessageTextComponentProps>((props) => {

    // Preprocessing
    const preprocessed = React.useMemo(() => preprocessText(props.message), [props.message]);
    const messageText = props.message;
    const isInsane = messageText.startsWith('🌈') && messageText.endsWith('🌈');
    const isMouthpiece = messageText.startsWith('📣') && messageText.endsWith('📣');
    const isSingleEmoji = React.useMemo(() => isEmoji(messageText), [props.message]);
    const isBig = isSingleEmoji || messageText.length <= 302 &&
        messageText.startsWith(':') &&
        messageText.endsWith(':');
    const isTextSticker = !isSingleEmoji && isBig;

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
                } catch {
                    url = text;
                }

                return (
                    <XLink
                        className="link"
                        key={'link-' + i}
                        path={path}
                        onClick={(e: any) => e.stopPropagation()}
                    >
                        {url}
                    </XLink>
                );
            }

            return (
                <XLinkExternal
                    className="link"
                    key={'link-' + i}
                    href={v.link!!}
                    content={v.text!!}
                    showIcon={false}
                />
            );
        } else {
            let text = v.text!!;

            if (
                (props.mentions && props.mentions.length !== 0) ||
                (props.alphaMentions &&
                    props.alphaMentions.length !== 0)
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

            if (isTextSticker) {
                text = text.slice(1, text.length - 1);
            }

            if (isInsane || isMouthpiece) {
                text = text.replace(/🌈/g, '').replace(/📣/g, '');
            }

            let smileSize = isBig || isInsane || isMouthpiece ? 44 : 18;

            return (
                <span
                    style={
                        isInsane
                            ? {
                                background:
                                    'url(https://attachments-staging.keyframes.net/media/cover/zlqfwz/b6eea0e0-a93f-434d-bfd1-3e1de3eac571.gif)',
                                backgroundClip: 'text, border',
                                ...({
                                    WebkitBackgroundClip: 'text',
                                } as any),
                                color: 'transparent',
                            }
                            : {}
                    }
                    key={'text-' + i}
                >
                    {emoji(text, smileSize)}
                </span>
            );
        }
    });

    let wrapperClassName =
        props.isService
            ? TextServiceStyle
            : (isBig || isInsane || isMouthpiece)
                ? TextLargeStyle
                : TextStyle;
    return (
        <span className={wrapperClassName}>
            {parts}
            {props.isEdited && <span className={styleEditLabel}>(Edited)</span>}
        </span>
    );
});