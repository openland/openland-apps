import * as React from 'react';
import * as Cookie from 'js-cookie';
import { css, cx } from 'linaria';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { emoji } from 'openland-y-utils/emoji';
import { TextTitle1, TextBody } from 'openland-web/utils/TextStyles';
import { AuthPageContainer } from '../components/AuthPageContainer';
import { AuthResolveShortName_item_User } from 'openland-api/spacex.types';

const userInfoContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-self: stretch;
    flex-grow: 1;
    padding: 32px;
`;

const userName = css`
    color: var(--foregroundPrimary);
    margin-top: 32px;
    margin-bottom: 8px;
    text-align: center;
`;

const userSubtitle = css`
    text-align: center;
    max-width: 320px;
    align-self: center;
    color: var(--foregroundSecondary);
    margin-bottom: 32px;
`;

export const AuthProfileFragment = React.memo((props: { user: AuthResolveShortName_item_User }) => {
    return (
        <AuthPageContainer>
            <div className={userInfoContainer}>
                <UAvatar
                    title={props.user.name}
                    id={props.user.id}
                    photo={props.user.photo}
                    size="xx-large"
                    online={props.user.online}
                />
                <div className={cx(userName, TextTitle1)}>{emoji(props.user.name)}</div>
                <div className={cx(userSubtitle, TextBody)}>
                    {props.user.firstName} uses Openland. Want to reach them?
                    <br />
                    Join Openland and write a message
                </div>
                <UButton
                    text={`Message ${props.user.firstName}`}
                    size="large"
                    onClick={() => {
                        Cookie.set('x-signin-redirect', props.user.id, { path: '/' });
                        window.location.href = '/signin';
                    }}
                />
            </div>
        </AuthPageContainer>
    );
});