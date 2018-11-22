import * as React from 'react';
import Glamorous from 'glamorous';
import { preprocessText, Span } from './utils/TextProcessor';
import { XLinkExternal } from 'openland-x/XLinkExternal';
import { MessageFull_mentions } from 'openland-api/Types';
import { emojify } from 'react-emojione';
import { XLink } from 'openland-x/XLink';
import emojiData from './data/emoji-data';

export interface MessageTextComponentProps {
    mentions: MessageFull_mentions[];
    message: string;
    isService: boolean;
    isEdited: boolean;
}

const TextWrapper = Glamorous.span<{ isService: boolean, big: boolean }>((props) => ({
    display: 'inline',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    fontSize: props.big ? 36 : 14,
    minHeight: props.big ? 44 : undefined,
    lineHeight: props.big ? '40px' : '22px',
    letterSpacing: props.big ? -0.5 : 0,
    fontWeight: props.big ? 600 : 400,
    color: props.isService ? '#99A2B0' : 'rgba(0, 0, 0, 0.8)',
    maxWidth: '98%',
    '& .link': {
        color: '#1790ff',
        '&:hover': {
            color: '#1790ff',
            textDecoration: 'underline'
        }
    }
}));

const EditLabel = Glamorous.span({
    display: 'inline-block',
    verticalAlign: 'baseline',
    color: 'rgba(0, 0, 0, 0.4)',
    fontSize: 13,
    fontWeight: 400,
    lineHeight: '22px',
    paddingLeft: 6,
});

let emoji = (text: string, height: number) => emojify(text, { style: { height: height, backgroundImage: 'url(https://cdn.openland.com/shared/web/emojione-3.1.2-64x64.png)' } });

export let makeInternalLinkRelative = (url: string) => {
    let rel = url.replace('http://app.openland.com/', '/')
        .replace('https://app.openland.com/', '/')
        .replace('//app.openland.com/', '/')
        .replace('http://next.openland.com/', '/')
        .replace('https://next.openland.com/', '/')
        .replace('//next.openland.com/', '/');

    return rel;
};

export let isInternalLink = (url: string) => {
    return url.includes('//app.openland.com/') || url.includes('//next.openland.com/');
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

const SimpleComponent = ({ children }: any) => {
    return <span style={{color: 'red'}}>{children}</span>;
};

class MessageWithMentionsTextComponent extends React.PureComponent<{
    text: string;
    mentions: MessageFull_mentions[];
}> {
  render() {
    const { text, mentions } = this.props;
      
    let splittedTextArray: any = [text];
    let mentionMatchesMap: any = {};
    mentions.forEach(({ name }: any) => {
        // splitting message
        const arr: any = [];
        splittedTextArray.forEach((item: any) => {
            item.split(`@${name}`).forEach((splitted: any) => arr.push(splitted));
        });

        splittedTextArray = arr;

        // matching mentions
        const result = indexes(text, name);
        result.forEach((index) => {
            mentionMatchesMap[index] = name;
        });
    });

    const mentionMatchesArray: any = [];

    Object.keys(mentionMatchesMap).sort((a: any, b: any) => a - b).forEach((key) => {
        mentionMatchesArray.push(mentionMatchesMap[key]);
    });

    const splittedArray: any = [];
    mentions.forEach(({ name }: any) => {
        splittedArray.push(text.split(`@${name}`));
    });

    return (
        <span>
            {splittedTextArray.map((textItem: any, key: any) => {
                return (<>
                    {textItem}
                    <SimpleComponent>
                        {mentionMatchesArray[key]}
                    </SimpleComponent>
                </>);
            })}
        </span>
    );
  }
}

export class MessageTextComponent extends React.PureComponent<MessageTextComponentProps> {
    private preprocessed: Span[];
    big = false;
    insane = false;
    mouthpiece = false;
    textSticker = false;

    constructor(props: MessageTextComponentProps) {
        super(props);
        this.preprocessed = preprocessText(props.message);

        let messageText = this.props.message;

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
                for (const [regExp, unicode] of emojiData.asciiToUnicode.entries()) {
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
            this.big = messageText.length <= 32 && messageText.startsWith(':') && messageText.endsWith(':');
            this.insane = messageText.startsWith('🌈') && messageText.endsWith('🌈');
            this.mouthpiece = messageText.startsWith('📣') && messageText.endsWith('📣');

            this.textSticker = this.big;
        }
    }
    componentWillUpdate(nextProps: MessageTextComponentProps) {
        this.preprocessed = preprocessText(nextProps.message);
    }

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

                    return <XLink className="link" key={'link-' + i} path={path} onClick={(e: any) => e.stopPropagation()}>{url}</XLink>;
                }

                return <XLinkExternal className="link" key={'link-' + i} href={v.link!!} content={v.text!!} showIcon={false} />;
            } else {
                let text = v.text!!;

                if (this.props.mentions && this.props.mentions.length !== 0) {
                    return <MessageWithMentionsTextComponent key={'text-' + i} text={text} mentions={this.props.mentions} />;
                }

                if (this.textSticker) {
                    text = text.slice(1, text.length - 1);
                }

                if (this.insane || this.mouthpiece) {
                    text = text.replace(/🌈/g, '').replace(/📣/g, '');
                }

                let smileSize = (this.big || this.insane || this.mouthpiece) ? 44 : 18;

                return (
                    <span
                        style={this.insane ? {
                            background: 'url(https://attachments-staging.keyframes.net/media/cover/zlqfwz/b6eea0e0-a93f-434d-bfd1-3e1de3eac571.gif)',
                            backgroundClip: 'text, border',
                            ...{ WebkitBackgroundClip: 'text' } as any,
                            color: 'transparent'
                        } : {}}
                        key={'text-' + i}
                    >
                        {emoji(text, smileSize)}
                    </span>
                );
            }
        });

        return (
            <TextWrapper big={this.big || this.insane || this.mouthpiece} isService={this.props.isService}>
                {parts}
                {this.props.isEdited && <EditLabel>(Edited)</EditLabel>}
            </TextWrapper>
        );
    }
}