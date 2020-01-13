import * as React from 'react';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { css, cx } from 'linaria';
import { XMemo } from 'openland-y-utils/XMemo';
import { emoji } from 'openland-y-utils/emoji';
import { TextBody } from 'openland-web/utils/TextStyles';
import { ULink } from 'openland-web/components/unicorn/ULink';
// import { useUserPopper } from 'openland-web/components/EntityPoppers';
import { TypingsUser } from 'openland-engines/messenger/Typings';

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
    color: var(--foregroundSecondary);
`;

export interface TypingsViewProps {
    conversationId: string;
}

const UserLink = (props: TypingsUser) => {
    return (
        <ULink path={`/${props.userId}`} className={TextBody}>
            {emoji(props.userName)}
        </ULink>
    );
};

export const TypingsView = XMemo<TypingsViewProps>(props => {
    let messeger = React.useContext(MessengerContext);
    const [typingArr, setTypingArr] = React.useState<TypingsUser[]>([]);

    React.useEffect(
        () => {
            return messeger.getTypings(props.conversationId).subcribe((_, users) => {
                setTypingArr(users || []);
            });
        },
        [props.conversationId],
    );

    return (
        <div className={typingWrapper}>
            <div className={cx(typingContent, TextBody)}>

                {typingArr.length === 1 && (
                    <>
                        <UserLink {...typingArr[0]} />
                        &nbsp;is typing...
                    </>
                )}

                {typingArr.length === 2 && (
                    <>
                        <UserLink {...typingArr[0]} />
                        &nbsp;and&nbsp;
                        <UserLink {...typingArr[1]} />
                        &nbsp;are typing...
                    </>
                )}

                {typingArr.length === 3 && (
                    <>
                        <UserLink {...typingArr[0]} />
                        ,&nbsp;
                        <UserLink {...typingArr[1]} />
                        &nbsp;and&nbsp;
                        <UserLink {...typingArr[2]} />
                        &nbsp;are typing...
                    </>
                )}

                {typingArr.length > 3 && (
                    <>
                        <UserLink {...typingArr[0]} />
                        ,&nbsp;
                        <UserLink {...typingArr[1]} />
                        &nbsp;and&nbsp;
                        {typingArr.length - 2}
                        &nbsp;more are typing...
                    </>
                )}
            </div>
        </div>
    );
});
