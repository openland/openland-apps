import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import Logo from 'openland-unicorn/components/Logo';
import IcArrow from 'openland-icons/s/ic-chevron-16.svg';
import IcIos from 'openland-icons/s/ic-apple-16.svg';
import IcAndroid from 'openland-icons/s/ic-playmarket-24.svg';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { TextTitle1, TextBody, TextCaption, TextLabel1 } from 'openland-web/utils/TextStyles';

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
    margin-right: -16px;
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
    &:hover {
        text-decoration: none;
        color: var(--accentPrimary);
        & path {
            fill: var(--accentPrimary);
        }
    }
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
    <a
        className={buttonContainer}
        target="_blank"
        href={props.ios ? 'https://oplnd.com/ios' : 'https://oplnd.com/android'}
    >
        {props.ios ? <IcIos className={buttonIcon} /> : <IcAndroid className={buttonIcon} />}
        <div className={buttonTextContainer}>
            <div className={TextCaption}>{props.ios ? 'Download on the' : 'Get it on'}</div>
            <div className={TextLabel1}>{props.ios ? 'App Store' : 'Google Play'}</div>
        </div>
    </a>
);

export const AuthSidebarComponent = React.memo(() => (
    <div className={sidebarContainer}>
        <XView path={'/'} hoverTextDecoration="none">
            <div className={logoContainer}>
                <Logo className={logoStyle} />
                <div className={logoTitleContainer}>
                    <div className={cx(logoTitle, TextTitle1)}>Openland</div>
                    <UIcon icon={<IcArrow />} color="var(--foregroundTertiary)" />
                </div>
            </div>
        </XView>
        <div className={cx(logoSubtitle, TextBody)}>
            The best place to find and build inspiring communities
        </div>
        <DownloadButton ios={true} />
        <DownloadButton />
    </div>
));
