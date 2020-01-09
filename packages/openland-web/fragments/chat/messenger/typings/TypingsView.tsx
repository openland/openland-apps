import * as React from 'react';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { css, cx } from 'linaria';
import { XMemo } from 'openland-y-utils/XMemo';
import { emoji } from 'openland-y-utils/emoji';
import { TextBody } from 'openland-web/utils/TextStyles';
import { ULink } from 'openland-web/components/unicorn/ULink';

const typingWrapper = css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex-direction: column;
    flex-shrink: 0;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
`;

const typingContent = css`
    display: flex;
    align-items: flex-start;
    width: 100%;
    max-height: 33px;
    max-width: 824px;
    padding-left: 72px;
    padding-right: 72px;
`;

const typingText = css`
    align-items: flex-start;
    margin-top: 8px;
    margin-bottom: 8px;
    color: var(--foregroundSecondary);
`;

export interface TypingsViewProps {
    conversationId: string;
}

export const TypingsView = XMemo<TypingsViewProps>(props => {
    let messeger = React.useContext(MessengerContext);
    let [typing, setTyping] = React.useState<string | null>(null);
    // TODO replace with TypingUser
    const [typingArr, setTypingArr] = React.useState<any[]>([]);

    React.useEffect(
        () => {
            return messeger.getTypings(props.conversationId).subcribe((typings, users) => {
                if (typings) {
                    setTyping(typings);
                    setTypingArr(users || []);
                } else {
                    setTyping(null);
                    setTypingArr([]);
                }
            });
        },
        [props.conversationId],
    );

    console.log(typingArr);

    let content: any = null;

    if (typing) {
        content = <div className={cx(typingText, TextBody)}>{emoji(typing)}</div>;
    }

    return (
        <div className={typingWrapper}>
            {/* <div className={typingContent}>{content}</div> */}
            <div className={typingContent}>
                {typingArr.map(user => (
                    <ULink path={`/${user.userId}`} key={user.userId}>
                        {emoji(user.userName)}
                    </ULink>
                ))}
            </div>
        </div>
    );
});
