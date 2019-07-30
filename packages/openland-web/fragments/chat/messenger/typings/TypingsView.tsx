import * as React from 'react';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { css } from 'linaria';
import { XMemo } from 'openland-y-utils/XMemo';
import { emoji } from 'openland-y-utils/emoji';

const typingWrapper = css`
    display: flex;
    align-items: center;
    width: 100%;
    flex-direction: column;
    flex-shrink: 0;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    padding-left: 80px;
    padding-right: 80px;
`;

const typingContent = css`
    display: flex;
    align-items: flex-start;
    width: 100%;
    max-height: 33px;
    max-width: 750px;
`;

const typingText = css`
    align-items: flex-start;
    margin-top: 8px;
    margin-bottom: 8px;
    opacity: 0.5;
    font-size: 13px;
    font-weight: normal;
    font-style: normal;
    line-height: normal;
    color: #000000;
`;

export interface TypingsViewProps {
    conversationId: string;
}

export const TypingsView = XMemo<TypingsViewProps>(props => {
    let messeger = React.useContext(MessengerContext);
    let [typing, setTyping] = React.useState<string | null>(null);

    React.useEffect(
        () => {
            return messeger.getTypings(props.conversationId).subcribe(typings => {
                if (typings) {
                    setTyping(typings);
                } else {
                    setTyping(null);
                }
            });
        },
        [props.conversationId],
    );

    let content: any = null;

    if (typing) {
        content = <div className={typingText}>{emoji(typing)}</div>;
    }

    return (
        <div className={typingWrapper}>
            <div className={typingContent}>{content}</div>
        </div>
    );
});
