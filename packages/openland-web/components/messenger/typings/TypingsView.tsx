import * as React from 'react';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { XView } from 'react-mental';

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
                opacity={0.5}
                fontSize={12}
                fontWeight="600"
                color="#334562"
                marginTop={8}
                marginBottom={8}
            >
                {typing}
            </XView>
        );
    } else {
        return null;
    }
});
