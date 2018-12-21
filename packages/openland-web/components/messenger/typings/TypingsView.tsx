import * as React from 'react';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { XView } from 'react-mental';
import { css } from 'linaria';

const typingClassName = css`
    opacity: 0.5;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: -0.2px;
    color: rgb(51, 69, 98);
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
            <XView
                marginLeft={55}
                alignItems="flex-start"
                opacity={0.5}
                fontSize={12}
                fontWeight="600"
                color="#334562"
                marginTop={8}
                marginBottom={8}
            >
                <span className={typingClassName}>{typing}</span>
            </XView>
        );
    } else {
        return null;
    }
});
