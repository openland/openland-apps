import * as React from 'react';
import copy from 'copy-to-clipboard';
import { XView } from 'react-mental';
import { css, cx } from 'linaria';
import { useClient } from 'openland-web/utils/useClient';
import { XImage } from 'react-mental';
import LinkedInIcon from 'openland-icons/linkedin-2.svg';
import TwitterIcon from 'openland-icons/twitter-2.svg';
import FacebookIcon from 'openland-icons/ic-fb.svg';
import { XModalController } from 'openland-x/showModal';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { OwnerLinkComponent } from 'openland-web/fragments/invite/OwnerLinkComponent';
import { TextBody } from 'openland-web/utils/TextStyles';
import { Page } from 'openland-unicorn/Page';
import { trackEvent } from 'openland-x-analytics';

const textAlignCenterClassName = css`
    text-align: center;
`;

const socialTextStyle = css`
    width: 100%;
    padding: 16px;
    border-radius: 8px;
    background-color: var(--backgroundTertiary);
    color: var(--foregroundPrimary);
    white-space: pre-wrap;
`;

const SocialButtonClassName = css`
    width: 36px;
    height: 36px;
    background-color: #e8f4ff;
    border-radius: 50px;
    display: flex !important;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    cursor: pointer;
    & svg {
        height: 18px;
        width: 18px;
    }
    & svg path {
        opacity: 1;
        transition: all 0.2s ease;
        fill: #1790ff;
    }
    &:hover {
        background-color: #1790ff;
    }
    &:hover svg path {
        opacity: 1;
        fill: #fff;
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
        "Check out Openland, an invitation-only community where founders helping founders. There are chats for any industry, location, and priority task. If you need help with investor intros, customers, hiring, or tech choices — that's the place! Invite to join:\n";
    const sharingTextFull = sharingText + sharingUrl;
    const [copied, setCopied] = React.useState(false);
    const copyText = () => {
        if (copied) {
            return;
        }
        trackEvent('invite_link_action', {
            invite_type: 'Openland',
            action_type: 'post_copied'
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
            <XView fontSize={18} color="#000" fontWeight="600" marginBottom={20}>
                <span className={textAlignCenterClassName}>Write a post</span>
            </XView>
            <XView flexGrow={1} alignSelf="stretch">
                <div className={cx(socialTextStyle, TextBody)}>{sharingTextFull}</div>
            </XView>
            <XView
                marginTop={24}
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
                    <XView fontSize={14} color="#000" marginRight={16}>
                        Share on
                    </XView>
                    <XView
                        flexDirection="row"
                        alignItems="center"
                        width={132}
                        paddingTop={3}
                        justifyContent="space-between"
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

const InviteAcceptedBlock = (props: { accepted: number }) => (
    <XView
        alignSelf="center"
        alignItems="center"
        flexDirection="row"
        backgroundColor="#EFF9F1"
        flexGrow={0}
        borderRadius={40}
        paddingVertical={4}
        paddingHorizontal={14}
        color="#5ccc6e"
        fontSize={14}
        fontWeight="600"
        marginTop={18}
    >
        {props.accepted} {`${props.accepted === 1 ? 'invite' : 'invites'} accepted`}
    </XView>
);

interface InviteFriendsFragmentProps {
    modalContext?: XModalController;
    onSettingPage?: boolean;
}

export const InviteFriendsComponent = (props: InviteFriendsFragmentProps) => {
    const client = useClient(),
        inviteCount = client.useMySuccessfulInvitesCount(),
        { invite: openlandInvite } = client.useAccountAppInvite(),
        isMobile = useLayout() === 'mobile';

    React.useEffect(() => {
        trackEvent('invite_friends_view');
    }, []);

    return (
        <XView
            flexDirection="row"
            position="relative"
            flexGrow={1}
            flexShrink={1}
            justifyContent="center"
            paddingLeft={isMobile ? 20 : 0}
            paddingRight={isMobile ? 20 : 0}
            backgroundColor="#fff"
        >
            {props.modalContext && (
                <XView position={isMobile ? 'absolute' : 'fixed'} top={19} left={32}>
                    <XImage src="/static/landing/logotype.svg" width={145} height={42} />
                </XView>
            )}
            <XView
                flexDirection="column"
                alignItems="center"
                width={isMobile ? '100%' : 420}
                maxWidth={420}
                marginTop={isMobile ? (props.onSettingPage ? undefined : 120) : 32}
                paddingBottom={40}
            >
                <XView fontSize={24} fontWeight="600" color="#000" flexGrow={0}>
                    <span className={textAlignCenterClassName}>Invite friends to Openland</span>
                </XView>
                {inviteCount.mySuccessfulInvitesCount > 0 && (
                    <InviteAcceptedBlock accepted={inviteCount.mySuccessfulInvitesCount} />
                )}
                <XView flexGrow={0} alignSelf="stretch" marginTop={142} marginBottom={78}>
                    <XView
                        flexDirection="row"
                        alignItems="center"
                        fontSize={18}
                        fontWeight="600"
                        color="#000"
                        alignSelf="center"
                        marginBottom={16}
                    >
                        <span className={textAlignCenterClassName}>Invite link</span>
                    </XView>
                    <OwnerLinkComponent
                        inviteKey={openlandInvite}
                        isGroup={false}
                        isOrganization={false}
                        hideRevoke={true}
                        isAppInvite={true}
                    />
                </XView>
                <WritePostBlock inviteKey={openlandInvite} isMobile={isMobile} />
            </XView>
        </XView>
    );
};

export const InviteFriendsFragment = React.memo(() => (
    <Page track="account_invite">
        <InviteFriendsComponent onSettingPage={true} />
    </Page>
));
