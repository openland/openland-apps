import * as React from 'react';
import { css, cx } from 'linaria';
import { GetUser_user_User } from 'openland-api/Types';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { emoji } from 'openland-y-utils/emoji';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { TextTitle1, TextBody } from 'openland-web/utils/TextStyles';
import {
    AuthSidebarComponent,
    AuthMobileHeader,
} from 'openland-web/pages/root/AuthSidebarComponent';

const rootContainer = css`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
`;

const mainContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
`;

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
`;

const userSubtitle = css`
    text-align: center;
    max-width: 320px;
    align-self: center;
    color: var(--foregroundSecondary);
    margin-bottom: 32px;
`;

export const AuthProfileFragment = React.memo((props: { user: GetUser_user_User }) => {
    const isMobile = useIsMobile();
    return (
        <div className={rootContainer}>
            {!isMobile && <AuthSidebarComponent />}
            <div className={mainContainer}>
                {isMobile && <AuthMobileHeader />}
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
                        {props.user.firstName} uses Openland. Want to reach them? Join Openland and
                        write a message
                    </div>
                    <UButton
                        text={`Message ${props.user.firstName}`}
                        size="large"
                        path={`/signin?redirect=%2Fmail%2F${props.user.id}`}
                    />
                </div>
            </div>
        </div>
    );
});
