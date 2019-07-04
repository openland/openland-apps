import * as React from 'react';
import { css } from 'linaria';
import { XLoader } from 'openland-x/XLoader';
import { useClient } from 'openland-web/utils/useClient';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { withApp } from 'openland-web/components/withApp';
import { XView } from 'react-mental';
import LogoBig from 'openland-icons/logo-big.svg';
import { XButton } from 'openland-x/XButton';

const textAlignClassName = css`
    text-align: center;
`;

const AcceptInvite = ({
    inviter,
    onAcceptInvite,
    isMobile,
}: {
    signPath: string;
    inviter: { photo: string | null; name: string; id: string };
    onAcceptInvite: (event: React.MouseEvent<any, MouseEvent>) => void;
    isMobile: boolean;
}) => (
    <XView width="100%" backgroundColor="white" position={'relative'} justifyContent="center">
        <XView
            position="absolute"
            top={56}
            alignSelf="center"
            alignItems="center"
            flexDirection="row"
        >
            <XAvatar2
                size={32}
                id={inviter.id}
                title={inviter.name}
                src={inviter.photo || undefined}
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
                        Openland is a professional messenger designed
                        {!isMobile && <br />} to support all communication needs of a modern
                        business.
                        {!isMobile && <br />} Currently it's in invite-only mode.
                    </p>
                </XView>
            </XView>
            <XButton text="Accept invite" style="primary" size="large" onClick={onAcceptInvite} />
        </XView>
        <XView position="absolute" bottom={20} fontSize={14} opacity={0.5} alignSelf={'center'}>
            © 2019 Openland
        </XView>
    </XView>
);

export const AcceptInvitePage = (props: {
    variables: { inviteKey: string };
    onAcceptInvite: (event: React.MouseEvent<any, MouseEvent>) => void;
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

    let signPath = '/signup?redirect=' + encodeURIComponent((props as any).redirect);

    if (!inviter) {
        return <XLoader loading={true} />;
    }
    return (
        <AcceptInvite
            signPath={signPath}
            inviter={inviter}
            onAcceptInvite={props.onAcceptInvite}
            isMobile={props.isMobile}
        />
    );
};

export default withApp('Home', 'viewer', () => {
    return <div />;
});
