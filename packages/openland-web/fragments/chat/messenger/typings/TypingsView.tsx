import * as React from 'react';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { XView } from 'react-mental';
import { css } from 'linaria';
import { XMemo } from 'openland-y-utils/XMemo';
import { emoji } from 'openland-y-utils/emoji';

const typingClassName = css`
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
        content = (
            <XView
                alignItems="flex-start"
                marginTop={8}
                marginBottom={8}
            >
                <div className={typingClassName}>{emoji(typing)}</div>
            </XView>
        );
    }

    return (
        <XView
            alignItems="center"
            width="100%"
            flexShrink={0}
            position="absolute"
            backgroundColor="#fff"
            bottom={0}
            left={0}
            paddingLeft={32}
            paddingRight={32}
        >
            <XView
                alignItems="flex-start"
                width="100%"
                maxHeight={33}
                maxWidth={980}
            >
                {content}
            </XView>
        </XView>
    );
});
