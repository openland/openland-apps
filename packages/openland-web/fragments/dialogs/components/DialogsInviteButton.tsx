import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink } from 'openland-x/XLink';
import InviteIcon from 'openland-icons/ic-invite-plus.svg';
import { XMemo } from 'openland-y-utils/XMemo';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { showModalBox } from 'openland-x/showModalBox';
import { InviteFriendsFragment } from 'openland-web/pages/main/mail/inviteFriends.page';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { trackEvent } from 'openland-x-analytics';
import { useClient } from 'openland-web/utils/useClient';

const InviteWrapper = Glamorous(XLink)({
    borderTop: '1px solid #ececec',
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#2196f3',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '16px',
    '&:hover': {
        textDecoration: 'none',
        backgroundColor: '#F9F9F9',
    },
    '& svg': {
        width: 16,
        height: 16,
        display: 'block',
        opacity: 0.6,
        marginRight: 6,
        '& *': {
            fill: '#2196f3',
        },
    },
    span: {
        display: 'block',
    },
});

const OrgInviteLoader = (props: { orgId: string }) => {
    useClient().useWithoutLoaderOrganizationPublicInvite({
        organizationId: props.orgId,
    });
    return null;
};

export const DialogsInviteButton = XMemo(() => {
    let router = React.useContext(XRouterContext)!;

    // preload links
    let profile = useClient().useWithoutLoaderProfile();
    useClient().useWithoutLoaderAccountAppInvite();

    return (
        <InviteWrapper
            onClick={() => {
                trackEvent('invite_view', { invite_type: 'general' });
                showModalBox({ fullScreen: true }, ctx => (
                    <XScrollView3 flexGrow={1} flexShrink={1} useDefaultScroll>
                        <InviteFriendsFragment asModalContent modalContext={ctx} />
                    </XScrollView3>
                ));
            }}
        >
            <InviteIcon />
            <span>Invite friends</span>
            {profile &&
                profile.profile &&
                profile.profile.primaryOrganization &&
                profile.profile.primaryOrganization.id && (
                    <OrgInviteLoader orgId={profile.profile.primaryOrganization.id} />
                )}
        </InviteWrapper>
    );
});
