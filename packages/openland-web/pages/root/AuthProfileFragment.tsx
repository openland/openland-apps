import * as React from 'react';
import { css, cx } from 'linaria';
import { GetUser_user_User } from 'openland-api/Types';
import Logo from 'openland-unicorn/components/Logo';
import IcArrow from 'openland-icons/s/ic-chevron-16.svg';
import IcIos from 'openland-icons/s/ic-apple-16.svg';
import IcAndroid from 'openland-icons/s/ic-android-16.svg';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { emoji } from 'openland-y-utils/emoji';
import { TextTitle1, TextBody, TextCaption, TextLabel1 } from 'openland-web/utils/TextStyles';

const rootContainer = css`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
`;

const sidebarContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--backgroundTertiary);
    padding: 112px;
    user-select: none;
`;

const logoContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const logoTitleContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const logoTitle = css`
    color: var(--foregroundPrimary);
    margin-right: 8px;
    padding-bottom: 4px;
`;

const logoSubtitle = css`
    text-align: center;
    max-width: 210px;
    align-self: center;
    color: var(--foregroundSecondary);
    margin-bottom: 32px;
`;

const logoStyle = css`
    width: 96px;
    height: 96px;
`;

const userInfoContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    
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

const buttonContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-shrink: 0;
    width: 200px;
    background-color: var(--backgroundTertiaryTrans);
    border-radius: 8px;
    margin-bottom: 16px;
    cursor: pointer;
    padding: 8px 0 8px 16px;
    color: var(--foregroundSecondary);
`;

const buttonIcon = css`
    width: 24px;
    height: 24px;
    & path {
        fill: var(--foregroundSecondary);
    }
`;

const buttonTextContainer = css`
    margin-left: 16px;
    display: flex;
    flex-direction: column;
`;

const DownloadButton = (props: { ios?: boolean }) => (
    <div className={buttonContainer}>
        {props.ios ? <IcIos className={buttonIcon} /> : <IcAndroid className={buttonIcon} />}
        <div className={buttonTextContainer}>
            <div className={TextCaption}>{props.ios ? 'Download on the' : 'Get it on'}</div>
            <div className={TextLabel1}>{props.ios ? 'App Store' : 'Google Play'}</div>
        </div>
    </div>
);

export const AuthProfileFragment = React.memo((props: { user: GetUser_user_User }) => {
    return (
        <div className={rootContainer}>
            <div className={sidebarContainer}>
                <div className={logoContainer}>
                    <Logo className={logoStyle} />
                    <div className={logoTitleContainer}>
                        <div className={cx(logoTitle, TextTitle1)}>Openland</div>
                        <UIcon icon={<IcArrow />} color="var(--foregroundTertiary)" />
                    </div>
                </div>
                <div className={cx(logoSubtitle, TextBody)}>
                    The best place to find and build inspiring communities
                </div>
                <DownloadButton ios={true} />
                <DownloadButton />
            </div>
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
                <UButton text={`Message ${props.user.firstName}`} size="large" path={`/signin?redirect=%2Fmail%2F${props.user.id}`}/>
            </div>
        </div>
    );
});
