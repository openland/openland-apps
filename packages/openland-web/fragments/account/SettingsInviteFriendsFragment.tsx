import * as React from 'react';
import copy from 'copy-to-clipboard';
import { XView, XViewProps } from 'react-mental';
import { css, cx } from 'linaria';
import { useClient } from 'openland-api/useClient';
import LinkedInIcon from 'openland-icons/s/ic-linkedin-24.svg';
import TwitterIcon from 'openland-icons/s/ic-twitter-24.svg';
import FacebookIcon from 'openland-icons/s/ic-facebook-24.svg';
import DoneIcon from 'openland-icons/s/ic-done-bold-16.svg';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { OwnerLinkComponent } from 'openland-web/fragments/invite/OwnerLinkComponent';
import { TextBody, TextStyles, TextTitle1 } from 'openland-web/utils/TextStyles';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { trackEvent } from 'openland-x-analytics';
import { plural } from 'openland-y-utils/plural';
import { UIcon } from 'openland-web/components/unicorn/UIcon';

const socialTextStyle = css`
    width: 100%;
    padding: 8px 16px;
    border-radius: 8px;
    background-color: var(--backgroundTertiaryTrans);
    color: var(--foregroundPrimary);
    white-space: pre-wrap;
`;

const SocialButtonClassName = css`
    width: 40px;
    height: 40px;
    background-color: var(--backgroundTertiaryTrans);
    border-radius: 50px;
    display: flex !important;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    cursor: pointer;

    & svg {
        height: 24px;
        width: 24px;
    }
    & svg path {
        opacity: 1;
        transition: all 0.2s ease;
        fill: var(--foregroundTertiary);
    }
    &:hover {
        background-color: var(--backgroundTertiaryHoverTrans);
    }
    &:not(:last-child) {
        margin-right: 8px;
    }
`;

interface SocialButtonProps {
    icon: any;
    onClick: () => void;
}

const SocialButton = (props: SocialButtonProps) => (
    <a className={SocialButtonClassName} onClick={props.onClick}>
        {props.icon}
    </a>
);

const WritePostBlock = (props: { inviteKey: string; isMobile: boolean }) => {
    const sharingUrl = 'https://openland.com/invite/' + props.inviteKey;
    const sharingText =
        "Check out Openland, a new community app. There are groups for almost every industry, professional role, skill, interest, and location. Openland is a great place to make new friends, expand your professional network, learn from pros, and get help for any challenge you face.\nInvite to join: ";
    const sharingTextFull = sharingText + sharingUrl;
    const [copied, setCopied] = React.useState(false);
    const copyText = () => {
        if (copied) {
            return;
        }
        trackEvent('invite_link_action', {
            invite_type: 'Openland',
            action_type: 'post_copied',
        });
        copy(sharingTextFull);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1500);
    };
    const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${sharingUrl}`;
    const linkedinHref = `https://www.linkedin.com/shareArticle?mini=false&url=${sharingUrl}`;
    const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURI(sharingTextFull)}`;

    const redirect = (href: string, targetName: string) => {
        trackEvent('invite_social_share_action', {
            share_action_type: targetName,
        });
        window.open(href, '_blank');
    };
    return (
        <XView flexDirection="column" alignItems="center" flexGrow={0} alignSelf="stretch">
            <XView flexGrow={1} alignSelf="stretch">
                <div className={cx(socialTextStyle, TextBody)}>{sharingTextFull}</div>
            </XView>
            <XView
                marginTop={16}
                alignSelf="stretch"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
            >
                <UButton
                    text={copied ? 'Copied' : 'Copy'}
                    style={copied ? 'success' : 'primary'}
                    size="large"
                    onClick={copyText}
                />
                <XView flexDirection="row" alignItems="center">
                    <XView {...TextStyles.Label1} color="var(--foregroundPrimary)" marginRight={16}>
                        {props.isMobile ? 'Share' : 'Share on'}
                    </XView>
                    <XView
                        flexDirection="row"
                        alignItems="center"
                    >
                        <SocialButton
                            icon={<FacebookIcon />}
                            onClick={() => redirect(facebookHref, 'facebook')}
                        />
                        <SocialButton
                            icon={<LinkedInIcon />}
                            onClick={() => redirect(linkedinHref, 'linkedin')}
                        />
                        <SocialButton
                            icon={<TwitterIcon />}
                            onClick={() => redirect(twitterHref, 'twitter')}
                        />
                    </XView>
                </XView>
            </XView>
        </XView>
    );
};

const headerTitleStyle = cx(TextTitle1, css`
    align-self: center;
    flex: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: var(--foregroundPrimary);
`);

const headerTitleFullscreenStyle = css`
    flex-grow: 0;
    flex-basis: auto;
    text-align: center;
    margin-bottom: 16px;
`;

const headerIconStyle = css`
    margin-right: 8px;
`;

export const InviteFriendsContent = (props: XViewProps) => {
    const client = useClient();
    const { invite: openlandInvite } = client.useAccountAppInvite();
    const isMobile = useLayout() === 'mobile';
    return (
        <XView flexGrow={1} marginTop={16} {...props}>
            <XView
                {...TextStyles.Title3}
                paddingVertical={12}
                color="var(--foregroundPrimary)"
            >
                Send link
            </XView>
            <OwnerLinkComponent
                inviteKey={openlandInvite}
                isGroup={false}
                isOrganization={false}
                hideRevoke={true}
                isAppInvite={true}
            />
            <XView
                {...TextStyles.Title3}
                paddingVertical={12}
                marginTop={32}
                color="var(--foregroundPrimary)"
            >
                Write post
            </XView >
            <WritePostBlock inviteKey={openlandInvite} isMobile={isMobile} />
        </XView >
    );
};

export const InviteFriendsFullscreen = () => {
    return (
        <XView flexGrow={1} flexShrink={1}>
            <XView flexGrow={1} flexShrink={1} alignSelf="center" justifyContent="center" width="100%" maxWidth={600} paddingHorizontal={16}>
                <div className={cx(headerTitleStyle, headerTitleFullscreenStyle)}>
                    Invite friends
                </div>
                <InviteFriendsContent flexGrow={0} justifyContent="center" />
            </XView>
        </XView>
    );
};

export const InviteFriendsFragment = React.memo(() => {
    const client = useClient();
    const inviteCount = client.useMySuccessfulInvitesCount();
    return (
        <Page track="account_invite">
            <UHeader
                documentTitle="Invite friends"
                titleView={(
                    <>
                        <div className={headerTitleStyle}>
                            Invite friends
                        </div>
                        {inviteCount.mySuccessfulInvitesCount > 0 && (
                            <XView
                                {...TextStyles.Label1}
                                alignSelf="center"
                                flexDirection="row"
                                alignItems="center"
                                color="var(--accentPositive)"
                                marginLeft={8}
                            >
                                <UIcon className={headerIconStyle} icon={<DoneIcon />} size={16} color="var(--accentPositive)" />
                                {plural(inviteCount.mySuccessfulInvitesCount, ['invite', 'invites'])} accepted
                            </XView>
                        )}
                    </>
                )}
            />
            <InviteFriendsContent />
        </Page>
    );
});
