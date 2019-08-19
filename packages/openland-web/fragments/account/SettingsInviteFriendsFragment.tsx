import * as React from 'react';
import { XView } from 'react-mental';
import { css, cx } from 'linaria';
import { useClient } from 'openland-web/utils/useClient';
import { XImage } from 'react-mental';
import { XTextArea } from 'openland-x/XTextArea';
import { XInput } from 'openland-x/XInput';
import CheckIcon from 'openland-icons/ic-check.svg';
import CopiedIcon from 'openland-icons/ic-content-copy.svg';
import LinkedInIcon from 'openland-icons/linkedin-2.svg';
import TwitterIcon from 'openland-icons/twitter-2.svg';
import FacebookIcon from 'openland-icons/ic-fb.svg';
import { XModalController } from 'openland-x/showModal';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { Page } from 'openland-unicorn/Page';

const textAlignCenterClassName = css`
    text-align: center;
`;

const InputClassName = css`
    font-size: 15px !important;
    border-radius: 8px !important;
    background: #f9f9f9 !important;
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
    bright?: boolean;
    text?: string;
}

const CopyButton = (props: CopyButtonProps) => (
    <XView
        height={40}
        borderRadius={8}
        paddingLeft={20}
        paddingRight={20}
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        fontSize={13}
        fontWeight="600"
        backgroundColor={props.copied ? '#69d06d' : props.bright ? '#e8f4ff' : '#1790ff'}
        color={props.copied ? '#fff' : props.bright ? '#1790ff' : '#fff'}
        cursor="pointer"
        onClick={props.onClick}
    >
        {props.copied ? (
            <CheckIcon />
        ) : (
            <CopiedIcon className={cx(!props.bright && copyIconClassName)} />
        )}
        <XView marginLeft={10}>{props.copied ? 'Copied' : props.text ? props.text : 'Copy'}</XView>
    </XView>
);

interface OwnerLinkComponentProps {
    inviteKey: string | null;
    id?: string;
}

class OwnerLinkComponent extends React.Component<OwnerLinkComponentProps> {
    input?: any;
    timer: any;

    state = {
        copied: false,
    };

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    private handleRef = (e: any) => {
        if (e === null) {
            return;
        }
        this.input = e;
    }

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
    }

    render() {
        const { copied } = this.state;
        const { props } = this;
        return (
            <XView flexDirection="row" flexShrink={0} flexGrow={1} alignSelf="stretch">
                <XView
                    flexDirection="row"
                    alignItems="center"
                    flexGrow={1}
                    flexShrink={1}
                    marginRight={12}
                >
                    <XInput
                        size="large"
                        flexGrow={1}
                        ref={this.handleRef}
                        className={InputClassName}
                        value={'https://openland.com/invite/' + props.inviteKey}
                    />
                </XView>
                <XView flexDirection="row" alignItems="center" flexShrink={0}>
                    <CopyButton copied={copied} onClick={this.copy} />
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

const WritePostBlock = (props: { inviteKey: string, isMobile: boolean }) => {
    const sharingUrl = 'https://openland.com/invite/' + props.inviteKey;
    const sharingText =
        "Check out Openland, an invitation-only community where founders helping founders. There are chats for any industry, location, and priority task. If you need help with investor intros, customers, hiring, or tech choices — that's the place! Invite to join:\n";
    const sharingTextFull = sharingText + sharingUrl;
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
    const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${sharingUrl}`;
    const linkedinHref = `https://www.linkedin.com/shareArticle?mini=false&url=${sharingUrl}`;
    const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURI(sharingTextFull)}`;

    const redirect = (href: string) => {
        window.open(href, '_blank');
    };
    return (
        <XView flexDirection="column" alignItems="center" flexGrow={0} alignSelf="stretch">
            <XView fontSize={18} color="#000" fontWeight="600" marginBottom={20}>
                <span className={textAlignCenterClassName}>Write a post</span>
            </XView>
            <XView flexGrow={1} alignSelf="stretch">
                <XTextArea
                    value={sharingTextFull}
                    onChange={() => null}
                    flexGrow={1}
                    height={props.isMobile ? 230 : 180}
                    resize={false}
                    mode="modern"
                    padding={16}
                    ref={textAreaRef}
                />
                <XView
                    position="absolute"
                    width="100%"
                    height="100%"
                    top={0}
                    left={0}
                    padding={16}
                    borderRadius={8}
                    backgroundColor="#f9f9f9"
                    fontSize={15}
                    lineHeight={1.6}
                    color="rgba(0, 0, 0, 0.9)"
                >
                    <span style={{ whiteSpace: 'pre-wrap', letterSpacing: 0.4 }}>
                        {sharingTextFull}
                    </span>
                </XView>
            </XView>
            <XView
                marginTop={24}
                alignSelf="stretch"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
            >
                <CopyButton copied={copied} onClick={copyText} text="Copy text" bright />
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
                            onClick={() => redirect(facebookHref)}
                        />
                        <SocialButton
                            icon={<LinkedInIcon />}
                            onClick={() => redirect(linkedinHref)}
                        />
                        <SocialButton
                            icon={<TwitterIcon />}
                            onClick={() => redirect(twitterHref)}
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
                    <OwnerLinkComponent inviteKey={openlandInvite} />
                </XView>
                <WritePostBlock inviteKey={openlandInvite} isMobile={isMobile} />
            </XView>
        </XView>
    );
};

export const InviteFriendsFragment = React.memo(() => (
    <Page>
        <InviteFriendsComponent onSettingPage />
    </Page>
));
