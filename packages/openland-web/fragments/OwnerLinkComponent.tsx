import * as React from 'react';
import { XView } from 'react-mental';
import CopiedIcon from 'openland-icons/ic-content-copy.svg';
import CheckIcon from 'openland-icons/ic-check.svg';
import { css } from 'linaria';
import { XVertical } from 'openland-x-layout/XVertical';
import { XInput } from 'openland-x/XInput';
import { useClient } from 'openland-web/utils/useClient';
import { XMutation } from 'openland-x/XMutation';
import { XModalController } from 'openland-x/showModal';
import { trackEvent } from 'openland-x-analytics';

const InputClassName = css`
    border-radius: 8px !important;
    background: #f2f3f4 !important;
    border: none !important;
    &:focus-within {
        border: none !important;
        box-shadow: none !important;
    }
`;

const CopyIconClassName = css`
    & path:last-child {
        fill: #a2d2ff !important;
    }
`;

interface RenewInviteLinkButtonProps {
    id: string;
    onClick: () => void;
    isRoom?: boolean;
    isOrganization?: boolean;
}

const RenewInviteLinkButton = (props: RenewInviteLinkButtonProps) => {
    const client = useClient();
    const id = props.id;
    let renew = undefined;

    if (props.isRoom) {
        renew = async () => {
            await client.mutateRoomRenewInviteLink({ roomId: id });
            await client.refetchRoomInviteLink({ roomId: id });
        };
    }

    if (props.isOrganization) {
        renew = async () => {
            await client.mutateOrganizationCreatePublicInvite({ organizationId: id });
            await client.refetchOrganizationPublicInvite({ organizationId: id });
        };
    }

    return (
        <XMutation mutation={renew} onSuccess={props.onClick}>
            <XView fontSize={14} color="rgba(0, 0, 0, 0.5)">
                Revoke
            </XView>
        </XMutation>
    );
};

interface OwnerLinkComponentProps {
    appInvite: string | null;
    onCopied?: () => void;
    footerNote?: string;
    useRevoke?: boolean;
    id?: string;
    isRoom?: boolean;
    isOrganization?: boolean;
    withoutInput?: boolean;
    modalContext?: XModalController;
}

export class OwnerLinkComponent extends React.Component<OwnerLinkComponentProps> {
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

    private copy = (e: any) => {
        const { props } = this;
        const objType = props.isRoom ? 'group' : props.isOrganization ? 'organization' : 'Openland';

        trackEvent('invite_link_action', { invite_type: objType, action_type: 'link_copied' });

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
            if (this.props.onCopied) {
                this.props.onCopied();
            }
            if (this.props.modalContext) {
                this.props.modalContext.hide();
            }
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
        const copyText = props.withoutInput ? 'Copy Invite Link' : 'Copy';
        const inviteHref = props.isOrganization ? 'join/' : 'invite/';
        return (
            <XVertical width="100%" flexGrow={1} separator={2}>
                {props.appInvite && (
                    <XView flexDirection="column">
                        <XView flexDirection="row" alignItems="center">
                            <XView
                                flexDirection="row"
                                alignItems="center"
                                flexGrow={1}
                                overflow="hidden"
                                width={props.withoutInput ? 40 : undefined}
                                position={props.withoutInput ? 'absolute' : undefined}
                                left={props.withoutInput ? -80 : undefined}
                            >
                                <XInput
                                    size="large"
                                    flexGrow={1}
                                    ref={this.handleRef}
                                    className={InputClassName}
                                    value={'https://openland.com/' + inviteHref + props.appInvite}
                                />
                                {props.useRevoke &&
                                    props.id &&
                                    (props.isOrganization || props.isRoom) && (
                                        <XView
                                            position="absolute"
                                            right={16}
                                            top={10}
                                            cursor="pointer"
                                        >
                                            <RenewInviteLinkButton
                                                onClick={this.resetLink}
                                                id={props.id}
                                                isOrganization={props.isOrganization}
                                                isRoom={props.isRoom}
                                            />
                                        </XView>
                                    )}
                            </XView>
                            <XView
                                height={40}
                                borderRadius={8}
                                paddingLeft={14}
                                paddingRight={14}
                                flexDirection="row"
                                alignItems="center"
                                justifyContent={props.withoutInput ? 'center' : 'flex-start'}
                                fontSize={14}
                                fontWeight="600"
                                backgroundColor={copied ? '#69d06d' : '#1790ff'}
                                color="#ffffff"
                                cursor="pointer"
                                onClick={this.copy}
                                marginLeft={props.withoutInput ? 0 : 12}
                                width={props.withoutInput ? '100%' : 'auto'}
                            >
                                {copied ? (
                                    <CheckIcon />
                                ) : (
                                    <CopiedIcon className={CopyIconClassName} />
                                )}
                                <XView marginLeft={10}>{copied ? 'Copied' : copyText}</XView>
                            </XView>
                        </XView>
                        {(props.footerNote || resetLink) && (
                            <XView
                                fontSize={12}
                                color={resetLink ? '#20a825' : 'rgba(0, 0, 0, 0.5)'}
                                marginLeft={16}
                                marginTop={5}
                            >
                                {resetLink
                                    ? 'The previous link is revoked and a new one has been created'
                                    : props.footerNote}
                            </XView>
                        )}
                    </XView>
                )}
            </XVertical>
        );
    }
}
