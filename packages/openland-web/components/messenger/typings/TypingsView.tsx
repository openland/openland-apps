import * as React from 'react';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { XView } from 'react-mental';
import { css } from 'linaria';

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

export const TypingsView = React.memo<TypingsViewProps>(props => {
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

    if (typing) {
        return (
            <XView marginLeft={53} alignItems="flex-start" marginTop={8} marginBottom={8}>
                <div className={typingClassName}>{typing}</div>
            </XView>
        );
    } else {
        return null;
    }
});
