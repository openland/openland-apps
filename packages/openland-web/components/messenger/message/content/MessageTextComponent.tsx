import * as React from 'react';
import { preprocessText } from '../../../../utils/TextProcessor';
import { MessageFull_alphaMentions } from 'openland-api/Types';
import { XView } from 'react-mental';
import { css } from 'linaria';
import { isEmoji } from '../../../../utils/isEmoji';
import { isInternalLink } from 'openland-web/utils/isInternalLink';
import { makeInternalLinkRelative } from 'openland-web/utils/makeInternalLinkRelative';
import { emoji } from 'openland-y-utils/emoji';
import { preprocessMentions } from './utils/preprocessMentions';
import { MentionComponentInner } from 'openland-x/XRichTextInput';
import { XMemo } from 'openland-y-utils/XMemo';

export interface MessageTextComponentProps {
    mentions?: MessageFull_alphaMentions[] | null;
    message: string;
    isEdited: boolean;
    isService?: boolean;
}

const LinkText = css`
    display: inline;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    & > a {
        display: inline;
    }
`;

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
    background: url(https://cdn.openland.com/shared/web/insane.gif);
    background-clip: text, border;
    -webkit-background-clip: text;
    color: transparent;
`;

export const MessageTextComponent = XMemo<MessageTextComponentProps>(props => {
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
                    <span key={'link-' + i} className={LinkText}>
                        <XView as="a" path={path} onClick={(e: any) => e.stopPropagation()}>
                            {url}
                        </XView>
                    </span>
                );
            }

            return (
                <span key={'link-' + i} className={LinkText}>
                    <XView as="a" href={v.link!!} target="_blank">
                        {v.text}
                    </XView>
                </span>
            );
        } else {
            let mentions = preprocessMentions(v.text!, null, props.mentions);
            let smileSize: 38 | 16 = isBig ? 38 : 16;

            let res: any[] = [];
            let i2 = 0;
            for (let m of mentions) {
                if (m.type === 'text') {
                    res.push(
                        <span
                            className={isInsane ? styleInsane : undefined}
                            key={'text-' + i + '-' + i2}
                        >
                            {emoji({
                                src: m.text,
                                size: smileSize,
                            })}
                        </span>,
                    );
                } else {
                    res.push(
                        <MentionComponentInner
                            key={'text-' + i + '-' + i2}
                            isYou={m.user.isYou}
                            user={m.user}
                            hasPopper={true}
                        >
                            {emoji({
                                src: m.text,
                                size: smileSize,
                            })}
                        </MentionComponentInner>,
                    );
                }

                i2++;
            }

            return res;
        }
    });

    return (
        <span className={isBig ? TextLargeStyle : TextStyle}>
            {parts}
            {props.isEdited && <span className={styleEditLabel}>(Edited)</span>}
        </span>
    );
});
