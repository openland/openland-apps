import * as React from 'react';
import Glamorous from 'glamorous';
import { preprocessText, Span } from './utils/TextProcessor';
import { XLinkExternal } from 'openland-x/XLinkExternal';
import { MessageFull_mentions } from 'openland-api/Types';
import { emojify } from 'react-emojione';
import { XLink } from 'openland-x/XLink';
import emojiData from './data/emoji-data';
import {
    MentionComponentInner,
    removeEmojiFromText,
} from 'openland-x/XRichTextInput';
import { XButton } from 'openland-x/XButton';
import { XAvatar } from 'openland-x/XAvatar';
import { XView } from 'react-mental';
import { XPopper } from 'openland-x/XPopper';
export interface MessageTextComponentProps {
    alphaMentions?: any;
    mentions: MessageFull_mentions[] | null;
    message: string;
    isService: boolean;
    isEdited: boolean;
}

const Title = Glamorous.span({
    fontFamily: 'SFProText-Semibold',
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
    fontFamily: 'SFProText-Semibold',
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
    userInfo: { photo: string; name: string; id: string };
};

export const JoinedUserPopperRow = ({
    title,
    subtitle,
    userInfo: { photo, name, id },
    onMessageClick,
}: JoinedUserPopperRowProps & { onMessageClick: Function }) => {
    return (
        <XView
            cursor="pointer"
            flexDirection="row"
            alignItems="center"
            hoverBackgroundColor="#f9f9f9"
            width={393}
            height={36}
        >
            <XAvatar
                // cloudImageUuid={photo || undefined}
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
                onClick={() => {
                    onMessageClick(id);
                }}
            />
        </XView>
    );
};

export const JoinedUsersPopper = ({
    items,
    onItemMessageClick,
}: {
    items: JoinedUserPopperRowProps[];
    onItemMessageClick: (id: string) => void;
}) => {
    return (
        <div>
            {items.map((item, key) => {
                return (
                    <JoinedUserPopperRow
                        {...item}
                        onMessageClick={onItemMessageClick}
                        key={key}
                    />
                );
            })}
        </div>
    );
};

const TextWrapper = Glamorous.span<{ isService: boolean; big: boolean }>(
    props => ({
        display: 'inline',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        maxWidth: '100%',
        fontSize: props.big ? 36 : 14,
        minHeight: props.big ? 44 : undefined,
        lineHeight: props.big ? '40px' : '22px',
        letterSpacing: props.big ? -0.5 : 0,
        fontWeight: props.big ? 600 : 400,
        textAlign: props.isService ? 'center' : undefined,
        color: props.isService ? '#99A2B0' : 'rgba(0, 0, 0, 0.8)',
        '& .link': {
            color: '#1790ff',
            '&:hover': {
                color: '#1790ff',
                textDecoration: 'underline',
            },
        },
    }),
);

const EditLabel = Glamorous.span({
    display: 'inline-block',
    verticalAlign: 'baseline',
    color: 'rgba(0, 0, 0, 0.4)',
    fontSize: 13,
    fontWeight: 400,
    lineHeight: '22px',
    paddingLeft: 6,
});

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

const asciiToUnicodeCache = new Map();

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

const OthersPopper = (props: any) => {
    return (
        <XPopper
            content={<JoinedUsersPopper {...props} />}
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
                text.indexOf('joined the room along with') !== -1 &&
                text.indexOf('others') !== -1
            ) {
                serviceMessageType = 'join_many';
            }

            if (serviceMessageType === 'join_many') {
                const [firstMention, ...otherMentions] = mentionsFinal;

                const onItemMessageClick = (id: number) => {
                    console.log(id);
                    console.log('onItemMessageClick');
                };

                const items = otherMentions.map(
                    ({ name, primaryOrganization, photo, id }: any) => {
                        return {
                            title: name,
                            subtitle: primaryOrganization.name,
                            userInfo: {
                                photo,
                                name,
                                id,
                            },
                        };
                    },
                );

                mentionsFinal = [
                    firstMention,
                    {
                        name: `${otherMentions.length} others`,
                        component: OthersPopper,
                        props: {
                            onItemMessageClick,
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
    }
}

export class MessageTextComponent extends React.PureComponent<
    MessageTextComponentProps
> {
    private preprocessed: Span[];
    big = false;
    insane = false;
    mouthpiece = false;
    textSticker = false;

    constructor(props: MessageTextComponentProps) {
        super(props);

        this.preprocessed = preprocessText(props.message);

        this.checkTextSticker(props);
    }

    componentWillUpdate(nextProps: MessageTextComponentProps) {
        this.preprocessed = preprocessText(nextProps.message);

        if (nextProps.message !== this.props.message) {
            this.checkTextSticker(nextProps);
        }
    }

    checkTextSticker = (p: MessageTextComponentProps) => {
        let messageText = p.message;

        let isShortnameSmile = false;
        let isUnicodeSmile = false;
        let isAsciiSmile = false;

        if (messageText.startsWith(':') && messageText.endsWith(':')) {
            isShortnameSmile = emojiData.shortToUnicode.has(messageText);
        }

        if (!isShortnameSmile) {
            isUnicodeSmile = emojiData.unicodeToShort.has(messageText);
        }

        if (!isShortnameSmile && !isUnicodeSmile) {
            if (asciiToUnicodeCache.has(messageText)) {
                isAsciiSmile = true;
            } else {
                for (const [
                    regExp,
                    unicode,
                ] of emojiData.asciiToUnicode.entries()) {
                    if (messageText.replace(regExp, unicode) === unicode) {
                        asciiToUnicodeCache.set(messageText, unicode);
                        isAsciiSmile = true;
                    }
                }
            }
        }

        if (isAsciiSmile || isShortnameSmile || isUnicodeSmile) {
            this.big = true;
        } else {
            this.big =
                messageText.length <= 302 &&
                messageText.startsWith(':') &&
                messageText.endsWith(':');
            this.insane =
                messageText.startsWith('🌈') && messageText.endsWith('🌈');
            this.mouthpiece =
                messageText.startsWith('📣') && messageText.endsWith('📣');

            this.textSticker = this.big;
        }
    };

    render() {
        let parts = this.preprocessed.map((v, i) => {
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
                    (this.props.mentions && this.props.mentions.length !== 0) ||
                    (this.props.alphaMentions &&
                        this.props.alphaMentions.length !== 0)
                ) {
                    return (
                        <MessageWithMentionsTextComponent
                            key={'text-' + i}
                            text={text}
                            mentions={this.props.mentions}
                            alphaMentions={this.props.alphaMentions}
                            isService={this.props.isService}
                        />
                    );
                }

                if (this.textSticker) {
                    text = text.slice(1, text.length - 1);
                }

                if (this.insane || this.mouthpiece) {
                    text = text.replace(/🌈/g, '').replace(/📣/g, '');
                }

                let smileSize =
                    this.big || this.insane || this.mouthpiece ? 44 : 18;

                return (
                    <span
                        style={
                            this.insane
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

        return (
            <TextWrapper
                big={this.big || this.insane || this.mouthpiece}
                isService={this.props.isService}
            >
                {parts}
                {this.props.isEdited && <EditLabel>(Edited)</EditLabel>}
            </TextWrapper>
        );
    }
}
