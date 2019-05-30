import * as React from 'react';
import { XView } from 'react-mental';
import CopiedIcon from 'openland-icons/ic-content-copy.svg';
import CheckIcon from 'openland-icons/ic-check.svg';
import { css } from 'linaria';
import { XVertical } from 'openland-x-layout/XVertical';
import { XInput } from 'openland-x/XInput';
import { useClient } from 'openland-web/utils/useClient';
import { XMutation } from 'openland-x/XMutation';

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
        if (this.input && this.input.inputRef) {
            this.input.inputRef.inputRef.select();
        }
        document.execCommand('copy');
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
        return (
            <XVertical width="100%" flexGrow={1} separator={2}>
                {props.appInvite && (
                    <XView flexDirection="column">
                        <XView flexDirection="row" alignItems="center">
                            <XView flexDirection="row" alignItems="center" flexGrow={1}>
                                <XInput
                                    size="large"
                                    flexGrow={1}
                                    ref={this.handleRef}
                                    className={InputClassName}
                                    value={'https://openland.com/invite/' + props.appInvite}
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
                                fontSize={14}
                                fontWeight="600"
                                backgroundColor={copied ? '#69d06d' : '#1790ff'}
                                color="#ffffff"
                                cursor="pointer"
                                onClick={this.copy}
                                marginLeft={12}
                            >
                                {copied ? (
                                    <CheckIcon />
                                ) : (
                                    <CopiedIcon className={CopyIconClassName} />
                                )}
                                <XView marginLeft={10}>{copied ? 'Copied' : 'Copy'}</XView>
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
