import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { withUserInfo } from 'openland-web/components/UserInfo';
import { withApp } from 'openland-web/components/withApp';
import { XView } from 'react-mental';
import { css, cx } from 'linaria';
import { useClient } from 'openland-web/utils/useClient';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XImage } from 'react-mental';
import { XTextArea } from 'openland-x/XTextArea';
import { XMutation } from 'openland-x/XMutation';
import { XInput } from 'openland-x/XInput';
import CheckIcon from 'openland-icons/ic-check.svg';
import ProfileIcon from 'openland-icons/ic-profile.svg';
import CloseIcon from 'openland-icons/ic-close-post.svg';
import ArrowDownIcon from 'openland-icons/ic-arrow-down.svg';
import CopiedIcon from 'openland-icons/ic-content-copy.svg';
import LinkedinIcon from 'openland-icons/linkedin-2.svg';
import TwitterIcon from 'openland-icons/twitter-2.svg';
import FacebookIcon from 'openland-icons/ic-fb.svg';

const letterSpasingClassName = css`
    letter-spacing: 0.9px;
`;

const textAlignCenterClassName = css`
    text-align: center;
`;

const profileIconClassName = css`
    & path:last-child {
        fill: #bfbfbf;
        fill-opacity: 1;
    }
`;

const InputClassName = css`
    border-radius: 8px !important;
    background: #f2f3f4 !important;
    border: none !important;
    &:focus-within {
        border: none !important;
        box-shadow: none !important;
    }
`;

const copyIconClassName = css`
    & path:last-child {
        fill: #a2d2ff !important;
    }
`;

interface CopyButtonProps {
    copied: boolean;
    onClick: () => void;
}

const CopyButton = (props: CopyButtonProps) => (
    <XView
        height={40}
        borderRadius={28}
        paddingLeft={20}
        paddingRight={20}
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        fontSize={13}
        fontWeight="600"
        backgroundColor={props.copied ? '#69d06d' : '#1790ff'}
        color="#fff"
        cursor="pointer"
        onClick={props.onClick}
    >
        {props.copied ? <CheckIcon /> : <CopiedIcon className={copyIconClassName} />}
        <XView marginLeft={10}>{props.copied ? 'Copied' : 'Copy'}</XView>
    </XView>
);

interface RenewInviteLinkButtonProps {
    id: string;
    onClick: () => void;
}

const RenewInviteLinkButton = (props: RenewInviteLinkButtonProps) => {
    const client = useClient();
    const id = props.id;
    let renew = async () => {
        await client.mutateOrganizationCreatePublicInvite({ organizationId: id });
        await client.refetchOrganizationPublicInvite({ organizationId: id });
    };

    return (
        <XMutation mutation={renew} onSuccess={props.onClick}>
            <XView
                height={40}
                borderRadius={28}
                paddingLeft={20}
                paddingRight={20}
                fontSize={14}
                marginRight={16}
                color="rgba(0, 0, 0, 0.5)"
                backgroundColor="#f4f4f4"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
            >
                <span className={textAlignCenterClassName}>Revoke</span>
            </XView>
        </XMutation>
    );
};

interface OwnerLinkComponentProps {
    inviteKey: string | null;
    footerNote?: boolean;
    useRevoke?: boolean;
    id?: string;
    inviteToApp?: boolean;
}

class OwnerLinkComponent extends React.Component<OwnerLinkComponentProps> {
    input?: any;
    timer: any;

    state = {
        copied: false,
        resetLink: false,
    };

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    private handleRef = (e: any) => {
        if (e === null) {
            return;
        }
        this.input = e;
    };

    private copy = () => {
        if (this.input && this.input.inputRef) {
            const isIos = window.navigator.userAgent.match(/iPhone|iPad|iPod/i);
            this.input.inputRef.inputRef.select();
            if (isIos) {
                this.input.inputRef.inputRef.setSelectionRange(0, 99999);
            }
            document.execCommand('copy');
            this.input.inputRef.inputRef.blur();
        }
        this.setState({
            copied: true,
        });

        this.timer = setTimeout(() => {
            this.setState({
                copied: false,
            });
        }, 1500);
    };

    private resetLink = () => {
        this.setState({
            copied: false,
            resetLink: true,
        });

        this.timer = setTimeout(() => {
            this.setState({
                copied: false,
                resetLink: false,
            });
        }, 3000);
    };

    render() {
        const { copied, resetLink } = this.state;
        const { props } = this;
        const { inviteToApp } = props;
        const invitePath = inviteToApp ? 'invite/' : 'join/';
        return (
            <XView flexDirection="column" flexGrow={1} alignSelf="stretch" marginBottom={90}>
                <XView flexDirection="column" alignItems="center" flexGrow={1} overflow="hidden">
                    <XView flexDirection="column" alignSelf="stretch">
                        <XInput
                            size="large"
                            flexGrow={1}
                            ref={this.handleRef}
                            className={InputClassName}
                            value={'https://openland.com/' + invitePath + props.inviteKey}
                        />
                        {(props.footerNote || resetLink) && (
                            <XView
                                fontSize={12}
                                color={resetLink ? '#20a825' : 'rgba(0, 0, 0, 0.5)'}
                                marginLeft={16}
                                marginBottom={10}
                                marginTop={5}
                                alignSelf="flex-start"
                            >
                                {resetLink
                                    ? 'The previous link is revoked and a new one has been created'
                                    : 'Anyone can use this link to join your organization'}
                            </XView>
                        )}
                    </XView>
                    <XView flexDirection="row" alignItems="center" marginTop={20}>
                        {props.useRevoke &&
                            props.id && (
                                <RenewInviteLinkButton onClick={this.resetLink} id={props.id} />
                            )}
                        <CopyButton copied={copied} onClick={this.copy} />
                    </XView>
                </XView>
            </XView>
        );
    }
}

const SocialButtonClassName = css`
    width: 36px;
    height: 36px;
    background-color: #e8f4ff;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    cursor: pointer;
    & svg path {
        transition: all 0.2s ease;
        fill: #1790ff;
    }
    &:hover {
        background-color: #1790ff;
    }
    &:hover svg path {
        fill: #fff;
    }
`;

const SocialButton = (props: { icon: any }) => (
    <div className={SocialButtonClassName}>{props.icon}</div>
);

const WritePostBlock = () => {
    const [copied, setCopied] = React.useState(false);
    const textAreaRef: any = React.useRef();
    const copyText = () => {
        if (copied) {
            return;
        }
        if (textAreaRef && textAreaRef.current) {
            const isIos = window.navigator.userAgent.match(/iPhone|iPad|iPod/i);
            textAreaRef.current.textAreaRef.textAreaRef.select();
            if (isIos) {
                textAreaRef.current.textAreaRef.textAreaRef.setSelectionRange(0, 99999);
            }
            document.execCommand('copy');
            textAreaRef.current.textAreaRef.textAreaRef.blur();
        }
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1500);
    };
    return (
        <XView
            flexDirection="column"
            alignItems="center"
            marginTop={115}
            flexGrow={1}
            alignSelf="stretch"
            marginBottom={92}
        >
            <XView fontSize={18} color="#000" fontWeight="600" marginBottom={20}>
                <span className={textAlignCenterClassName}>Write a post</span>
            </XView>
            <XView flexGrow={1} alignSelf="stretch">
                <XTextArea
                    flexGrow={1}
                    height={140}
                    resize={false}
                    mode="modern"
                    padding={16}
                    ref={textAreaRef}
                />
            </XView>
            <XView marginTop={28} flexDirection="row" alignItems="flex-start">
                <XView flexDirection="column" alignItems="center" marginRight={24}>
                    <XView fontSize={14} color="#000" marginBottom={14}>
                        Copy text
                    </XView>
                    <CopyButton copied={copied} onClick={copyText} />
                </XView>
                <XView flexDirection="column" alignItems="center" marginLeft={24}>
                    <XView fontSize={14} color="#000" marginBottom={14}>
                        Share this post on
                    </XView>
                    <XView
                        flexDirection="row"
                        alignItems="center"
                        width={132}
                        paddingTop={3}
                        justifyContent="space-between"
                    >
                        <SocialButton icon={<FacebookIcon />} />
                        <SocialButton icon={<LinkedinIcon />} />
                        <SocialButton icon={<TwitterIcon />} />
                    </XView>
                </XView>
            </XView>
        </XView>
    );
};

interface ShowInviteInputButton {
    title: string;
    onClick: () => void;
}

const InviteAcceptedBlock = (props: { accepted: number }) => (
    <XView
        alignSelf="center"
        alignItems="center"
        flexDirection="row"
        backgroundColor="#EAF4FE"
        borderRadius={40}
        paddingTop={4}
        paddingBottom={3}
        paddingHorizontal={10}
        color="#248bf2"
        fontSize={14}
        marginTop={20}
    >
        {props.accepted} invites accepted
    </XView>
);

const ShowInviteInputButton = (props: ShowInviteInputButton) => (
    <XView
        flexDirection="row"
        alignItems="center"
        fontSize={18}
        fontWeight="600"
        color="#000"
        cursor="pointer"
        alignSelf="center"
        onClick={props.onClick}
    >
        <XView>{props.title}</XView>
        <XView marginLeft={8} flexDirection="row" alignItems="center">
            <ArrowDownIcon />
        </XView>
    </XView>
);

export const InviteFriendsFragment = ({ asModalContent }: { asModalContent?: boolean }) => {
    const client = useClient();

    const user = client.useProfile();
    const profile = user.profile!;

    const data = client.useOrganizationPublicInvite({
        organizationId: profile.primaryOrganization!!.id,
    });

    const { invite: openlandInvite } = client.useAccountAppInvite();

    const primaryOrganizationInvite = data.publicInvite!!.key;
    const primaryOrganizationId = profile.primaryOrganization!!.id;
    const primaryOrganizationName = profile.primaryOrganization!!.name;
    const primaryOrganizationMembersCount = profile.primaryOrganization!!.membersCount;
    const [inviteLink, showInviteLink] = React.useState(false);
    const [inviteTeam, showInviteTeam] = React.useState(false);
    const router = React.useContext(XRouterContext)!;

    const isMobile = useIsMobile() || undefined;
    const invitesAccepted = true;
    return (
        <XView
            flexDirection="row"
            position="relative"
            flexGrow={1}
            justifyContent="center"
            paddingLeft={isMobile ? 40 : 0}
            paddingRight={isMobile ? 40 : 0}
            backgroundColor="#fff"
        >
            {!asModalContent && (
                <XView position="absolute" right={20} top={20} zIndex={100}>
                    <XView
                        onClick={() => {
                            router.replace(`/mail`);
                        }}
                        href={'/mail'}
                        cursor="pointer"
                        alignItems="center"
                        justifyContent="center"
                        padding={8}
                        width={32}
                        height={32}
                        borderRadius={50}
                        hoverBackgroundColor="rgba(0, 0, 0, 0.05)"
                    >
                        <CloseIcon />
                    </XView>
                </XView>
            )}
            <XView position="absolute" top={19} left={32}>
                <XImage src="/static/landing/logotype.svg" width={145} height={42} />
            </XView>
            <XView
                flexDirection="column"
                alignItems="center"
                width={isMobile ? '100%' : 354}
                marginTop={83}
                paddingBottom={40}
            >
                <XView fontSize={24} fontWeight="600" color="#000">
                    <span className={cx(textAlignCenterClassName, letterSpasingClassName)}>
                        Invite friends to Openland
                    </span>
                </XView>
                <XView fontSize={16} color="#000" marginTop={18}>
                    <span className={textAlignCenterClassName}>
                        Share access to Openland community
                    </span>
                </XView>
                {invitesAccepted && <InviteAcceptedBlock accepted={5} />}
                <WritePostBlock />
                {!inviteLink && (
                    <XView marginBottom={20} flexGrow={1} alignSelf="stretch">
                        <ShowInviteInputButton
                            onClick={() => showInviteLink(true)}
                            title="Invite link"
                        />
                    </XView>
                )}
                {inviteLink && (
                    <XView flexGrow={1} alignSelf="stretch">
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
                        <OwnerLinkComponent inviteKey={openlandInvite} inviteToApp={true} />
                    </XView>
                )}
                {!inviteTeam && (
                    <ShowInviteInputButton
                        onClick={() => showInviteTeam(true)}
                        title="Invite teammates"
                    />
                )}
                {inviteTeam && (
                    <XView flexGrow={1} alignSelf="stretch">
                        <XView
                            flexDirection="row"
                            alignItems="center"
                            fontSize={18}
                            fontWeight="600"
                            color="#000"
                            alignSelf="center"
                        >
                            <span className={textAlignCenterClassName}>Invite teammates</span>
                        </XView>
                        <XView
                            flexDirection="row"
                            alignItems="center"
                            alignSelf="center"
                            marginBottom={16}
                        >
                            <XView
                                fontSize={14}
                                fontWeight="600"
                                color="#248bf2"
                                cursor="pointer"
                                path={'/directory/o/' + primaryOrganizationId}
                                marginRight={8}
                            >
                                {primaryOrganizationName}
                            </XView>
                            <XView flexDirection="row" alignItems="center">
                                <ProfileIcon className={profileIconClassName} />
                                <XView
                                    fontSize={12}
                                    fontWeight="600"
                                    color="#7a7a7a"
                                    marginLeft={2}
                                    paddingTop={2}
                                >
                                    {primaryOrganizationMembersCount}
                                </XView>
                            </XView>
                        </XView>
                        <OwnerLinkComponent
                            footerNote={true}
                            inviteKey={primaryOrganizationInvite}
                            id={primaryOrganizationId}
                            useRevoke={true}
                        />
                    </XView>
                )}
            </XView>
        </XView>
    );
};

export default withApp(
    'Invite People',
    'viewer',
    withUserInfo(() => {
        return (
            <>
                <XDocumentHead title={'Invite People'} />
                <InviteFriendsFragment />
            </>
        );
    }),
);
