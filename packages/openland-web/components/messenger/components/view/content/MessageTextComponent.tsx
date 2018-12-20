import * as React from 'react';
import { preprocessText } from '../../../../../utils/TextProcessor';
import { MessageFull_mentions } from 'openland-api/Types';
import { emojify } from 'react-emojione';
import { XView } from 'react-mental';
import { css } from 'linaria';
import { isEmoji } from '../../../../../utils/isEmoji';
import { isInternalLink } from 'openland-web/utils/isInternalLink';
import { makeInternalLinkRelative } from 'openland-web/utils/makeInternalLinkRelative';
import { MessageWithMentionsTextComponent } from './MessageWithMentionsTextComponent';

export interface MessageTextComponentProps {
    alphaMentions?: any;
    mentions?: MessageFull_mentions[] | null;
    message: string;
    isEdited: boolean;
    isService?: boolean;
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

export const MessageTextComponent = React.memo<MessageTextComponentProps>(props => {
    // Preprocessing

    var messageText = props.message;
    var isService = props.isService;
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

    let wrapperClassName = isService ? TextServiceStyle : isBig ? TextLargeStyle : TextStyle;
    return (
        <span className={wrapperClassName}>
            {parts}
            {props.isEdited && <span className={styleEditLabel}>(Edited)</span>}
        </span>
    );
});
