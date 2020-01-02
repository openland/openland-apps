import * as React from 'react';
import copy from 'copy-to-clipboard';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { useClient } from 'openland-web/utils/useClient';
import { XMutation } from 'openland-x/XMutation';
import { trackEvent } from 'openland-x-analytics';
import { TextBody } from 'openland-web/utils/TextStyles';
import { useCaptionPopper } from 'openland-web/components/CaptionPopper';
import IcRevoke from 'openland-icons/s/ic-refresh-24.svg';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { UButton } from 'openland-web/components/unicorn/UButton';

interface RenewInviteLinkButtonProps {
    id: string;
    isGroup: boolean;
    isOrganization: boolean;
}

const renewContainer = css`
    position: absolute;
    cursor: pointer;
    right: 14px;
    top: 11px;
`;

const RenewInviteLinkButton = (props: RenewInviteLinkButtonProps) => {
    const [show] = useCaptionPopper({ text: 'Revoke link' });
    const client = useClient();
    const id = props.id;
    let renew = undefined;

    if (props.isGroup) {
        renew = async () => {
            await client.mutateRoomRenewInviteLink({ roomId: id });
            await client.refetchRoomInviteLink({ roomId: id });
        };
    } else if (props.isOrganization) {
        renew = async () => {
            await client.mutateOrganizationCreatePublicInvite({ organizationId: id });
            await client.refetchOrganizationPublicInvite({ organizationId: id });
        };
    }

    return (
        <XMutation mutation={renew}>
            <div className={renewContainer} onMouseEnter={show}>
                <UIcon icon={<IcRevoke />} size={20} />
            </div>
        </XMutation>
    );
};

const linkStyle = css`
    flex-grow: 1;
    height: 40px;
    border-radius: 8px;
    padding: 8px 16px 8px 8px;
    padding-right: 40px;
    background-color: var(--backgroundTertiary);
    color: var(--foregroundPrimary);
    text-overflow: ellipsis;
    overflow: hidden;
`;

interface OwnerLinkComponentProps {
    id?: string;
    invite: string;
    isGroup: boolean;
    isChannel?: boolean;
    isOrganization: boolean;
    isCommunity?: boolean;
    isAppInvite?: boolean;
    hideRevoke?: boolean;
}

const OwnerLink = (props: OwnerLinkComponentProps) => {
    const [copied, setCopied] = React.useState(false);

    let invitePart = '/invite/';
    if (props.isOrganization || props.isCommunity) {
        invitePart = '/join/';
    }
    const invitePath = 'https://openland.com' + invitePart + props.invite;

    const copyPath = () => {
        const objType = props.isAppInvite
            ? 'toApp'
            : props.isGroup
                ? props.isChannel
                    ? 'channel'
                    : 'group'
                : props.isCommunity
                    ? 'community'
                    : 'organization';

        trackEvent('invite_link_action', { invite_type: objType, action_type: 'link_copied' });
        copy(invitePath);
        setCopied(true);

        const t = setTimeout(() => {
            setCopied(false);
        }, 1500);

        return () => clearTimeout(t);
    };

    return (
        <XView flexDirection="row" alignItems="center">
            <XView
                flexDirection="row"
                alignItems="center"
                flexGrow={1}
                flexShrink={1}
                marginRight={8}
            >
                <div className={cx(linkStyle, TextBody)}>{invitePath}</div>
                {props.id &&
                    !props.hideRevoke && (
                        <RenewInviteLinkButton
                            id={props.id}
                            isGroup={props.isGroup}
                            isOrganization={props.isOrganization}
                        />
                    )}
            </XView>
            <UButton
                text={copied ? 'Copied' : 'Copy'}
                style={copied ? 'success' : 'primary'}
                size="large"
                square={true}
                onClick={copyPath}
            />
        </XView>
    );
};

type OwnerLinkT = {
    id?: string;
    inviteKey?: string;
    isGroup: boolean;
    isChannel?: boolean;
    isOrganization: boolean;
    isCommunity?: boolean;
    isAppInvite?: boolean;
    hideRevoke?: boolean;
};

export const OwnerLinkComponent = (props: OwnerLinkT) => {
    const client = useClient();
    let data = null;
    let link = props.inviteKey;

    if (props.id && props.isGroup) {
        data = client.useRoomInviteLink({ roomId: props.id });
        link = data.link;
    } else if (props.id && props.isOrganization) {
        data = client.useWithoutLoaderOrganizationPublicInvite({
            organizationId: props.id,
        });
        link = data && data.publicInvite ? data.publicInvite.key : undefined;
    }

    return (
        <OwnerLink
            invite={link || ''}
            id={props.id}
            isGroup={props.isGroup}
            isChannel={props.isChannel}
            isOrganization={props.isOrganization}
            isCommunity={props.isCommunity}
            hideRevoke={props.hideRevoke}
            isAppInvite={props.isAppInvite}
        />
    );
};
