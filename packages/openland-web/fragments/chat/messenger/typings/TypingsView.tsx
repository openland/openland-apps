import * as React from 'react';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { css, cx } from 'linaria';
import { XMemo } from 'openland-y-utils/XMemo';
import { emoji } from 'openland-y-utils/emoji';
import { TextBody } from 'openland-web/utils/TextStyles';
import { ULink } from 'openland-web/components/unicorn/ULink';
// import { useUserPopper } from 'openland-web/components/EntityPoppers';
import { TypingsUser } from 'openland-engines/messenger/Typings';
import Lottie from 'react-lottie';
import { XView } from 'react-mental';

import { getJSON } from 'openland-y-utils/lottie/getJSON';
import { TypingType } from 'openland-api/spacex.types';

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
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    max-height: 33px;
    max-width: 824px;
    padding-left: 72px;
    padding-right: 72px;
    color: var(--foregroundSecondary);
`;

const userLink = css`
    &,
    &:hover,
    &:focus,
    &:active {
        color: inherit;
        text-decoration: none;
    }
`;

export interface TypingsViewProps {
    conversationId: string;
}

const UserLink = (props: TypingsUser) => {
    return (
        <ULink path={`/${props.userId}`} className={cx(TextBody, userLink)}>
            {emoji(props.userName)}
        </ULink>
    );
};

export const TypingsView = XMemo<TypingsViewProps>(props => {
    let messeger = React.useContext(MessengerContext);
    const [typingArr, setTypingArr] = React.useState<TypingsUser[]>([]);
    const [typingType, setTypingType] = React.useState<string>('');

    React.useEffect(
        () => {
            return messeger.getTypings(props.conversationId).subcribe((_, users, typingAction) => {
                setTypingArr(users || []);

                let typingActionString = 'typing';

                switch (typingAction) {
                    case TypingType.TEXT: typingActionString = 'typing'; break;
                    case TypingType.FILE: typingActionString = 'sending a file'; break;
                    case TypingType.PHOTO: typingActionString = 'sending a photo'; break;
                    case TypingType.STICKER: typingActionString = 'picking a sticker'; break;
                    case TypingType.VIDEO: typingActionString = 'uploading a video'; break;
                    default: typingActionString = 'typing'; break;
                }

                setTypingType(typingActionString);
            });
        },
        [props.conversationId],
    );

    const dots = (
        <XView width={20} marginRight={8} marginTop={1} alignItems="center">
            <Lottie
                isStopped={false}
                isPaused={false}
                height={20}
                width={20}
                options={{
                    animationData: getJSON('typing', '#878A91'),
                    loop: true
                }}
            />
        </XView>
    );

    const slider = (
        <XView width={20} marginRight={8} marginTop={1} alignItems="center">
            <Lottie
                isStopped={false}
                isPaused={false}
                height={20}
                width={20}
                options={{
                    animationData: getJSON('file', '#878A91'),
                    loop: true
                }}
            />
        </XView>
    );

    return (
        <div className={typingWrapper}>
            <div className={cx(typingContent, TextBody)}>

                {typingArr.length === 1 && (
                    <>
                        { slider }
                        <UserLink {...typingArr[0]} />
                        &nbsp;is {typingType}
                    </>
                )}

                {typingArr.length === 2 && (
                    <>
                        { dots }
                        <UserLink {...typingArr[0]} />
                        &nbsp;and&nbsp;
                        <UserLink {...typingArr[1]} />
                        &nbsp;are {typingType}
                    </>
                )}

                {typingArr.length === 3 && (
                    <>
                        { dots }
                        <UserLink {...typingArr[0]} />
                        ,&nbsp;
                        <UserLink {...typingArr[1]} />
                        &nbsp;and&nbsp;
                        <UserLink {...typingArr[2]} />
                        &nbsp;are {typingType}
                    </>
                )}

                {typingArr.length > 3 && (
                    <>
                        { dots }
                        <UserLink {...typingArr[0]} />
                        ,&nbsp;
                        <UserLink {...typingArr[1]} />
                        &nbsp;and&nbsp;
                        {typingArr.length - 2}
                        &nbsp;more are {typingType}
                    </>
                )}
            </div>
        </div>
    );
});
