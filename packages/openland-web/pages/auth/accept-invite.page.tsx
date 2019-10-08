import * as React from 'react';
import { css } from 'linaria';
import { XLoader } from 'openland-x/XLoader';
import { useClient } from 'openland-web/utils/useClient';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { withApp } from 'openland-web/components/withApp';
import { XView } from 'react-mental';
import LogoBig from 'openland-icons/logo-big.svg';
import { XButton } from 'openland-x/XButton';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { UserInfoContext } from 'openland-web/components/UserInfo';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { XTrack } from 'openland-x-analytics/XTrack';

const textAlignClassName = css`
    text-align: center;
`;

const AcceptInvite = ({
    inviter
}: {
    inviter: { photo: string | null; name: string; id: string };
    isMobile: boolean;
}) => {
    const userInfo = React.useContext(UserInfoContext);
    const router = React.useContext(XRouterContext)!;
    const onAcceptInvite = React.useCallback(() => {
        if (!userInfo || !userInfo.isLoggedIn) {
            router.push('/authorization/create-new-account');
        } else {
            router.push('/mail');
        }
    }, []);
    return (<XView width="100%" backgroundColor="white" position={'relative'} justifyContent="center">
        <XTrack
            event="invite_landing_view"
            params={{ invite_type: "Openland" }}
        />
        <XView
            position="absolute"
            top={56}
            alignSelf="center"
            alignItems="center"
            flexDirection="row"
        >
            <UAvatar
                size="small"
                id={inviter.id}
                title={inviter.name}
                photo={inviter.photo}
            />
            <XView fontSize={16} color="#000000" marginLeft={12}>
                {inviter.name + ' invites you to join'}
            </XView>
        </XView>
        <XView alignSelf="center" alignItems="center">
            <XView marginBottom={24}>
                <LogoBig />
            </XView>

            <XView marginBottom={40}>
                <XView maxWidth={575} paddingHorizontal={20} fontSize={18} lineHeight={1.67}>
                    <p className={textAlignClassName}>
                        An invitation-only community <br /> for top startup founders, investors, and
                        engineers.
                    </p>
                </XView>
            </XView>
            <XButton text="Accept invite" style="primary" size="large" onClick={onAcceptInvite} />
        </XView>
        <XView position="absolute" bottom={20} fontSize={14} opacity={0.5} alignSelf={'center'}>
            © 2019 Openland
        </XView>
    </XView>);
};

export const AcceptInvitePage = (props: {
    variables: { inviteKey: string };
    isMobile: boolean;
}) => {
    const client = useClient();

    const resolvedInvite = client.useWithoutLoaderResolvedInvite({
        key: props.variables.inviteKey,
    });

    if (!resolvedInvite || !resolvedInvite.invite) {
        return <XLoader loading={true} />;
    }

    let inviter;

    if (resolvedInvite && resolvedInvite.invite) {
        if (resolvedInvite.invite.__typename === 'AppInvite') {
            inviter = resolvedInvite.invite.inviter;
        } else if (resolvedInvite.invite.__typename === 'RoomInvite') {
            inviter = resolvedInvite.invite.invitedByUser;
        } else if (resolvedInvite.invite.__typename === 'InviteInfo') {
            inviter = resolvedInvite.invite.creator;
        }
    }

    if (resolvedInvite.invite.__typename === 'RoomInvite') {
        return <XPageRedirect path={`/joinChannel/${props.variables.inviteKey}`} />;
    }

    if (resolvedInvite.invite.__typename === 'InviteInfo') {
        return <XPageRedirect path={`/signin/join/${props.variables.inviteKey}`} />;
    }

    if (!inviter) {
        return <XLoader loading={true} />;
    }
    return (
        <AcceptInvite
            inviter={inviter}
            isMobile={props.isMobile}
        />
    );
};

export default withApp('Home', 'viewer', () => {
    return <div />;
});
