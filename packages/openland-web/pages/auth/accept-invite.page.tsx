import * as React from 'react';
import { XLoader } from 'openland-x/XLoader';
import { useClient } from 'openland-web/utils/useClient';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { XText } from 'openland-x/XText';
import { withApp } from 'openland-web/components/withApp';
import { XView } from 'react-mental';
import LogoBig from 'openland-icons/logo-big.svg';
import { SubTitle } from 'openland-web/pages/init/components/SignComponents';
import { XButton } from 'openland-x/XButton';

const InviterComponent = ({
    inviter,
}: {
    inviter: { photo: string | null; name: string; id: string };
}) => {
    return (
        <XVertical alignItems="center">
            <XHorizontal alignItems="center">
                <XAvatar2
                    size={32}
                    id={inviter.id}
                    title={inviter.name}
                    src={inviter.photo || undefined}
                />
                <XText fontSize={16} color="#000000">
                    {inviter.name + ' invites you to join'}
                </XText>
            </XHorizontal>
        </XVertical>
    );
};

const AcceptInvite = ({
    inviter,
    onAcceptInvite,
}: {
    inviter: { photo: string | null; name: string; id: string };
    onAcceptInvite: (event: React.MouseEvent<any, MouseEvent>) => void;
}) => {
    return (
        <XView width="100%" backgroundColor="white" position={'relative'} justifyContent="center">
            <XView position="absolute" top={56} alignSelf={'center'}>
                <InviterComponent inviter={inviter} />
            </XView>
            <XView alignSelf="center" alignItems="center">
                <XView marginBottom={24}>
                    <LogoBig />
                </XView>

                <XView marginBottom={40}>
                    <SubTitle
                        style={{
                            maxWidth: 535,
                        }}
                    >
                        <p>
                            Openland is a professional messenger designed
                            <br /> to support all communication needs of a modern business.
                            <br /> Currently it's in invite-only mode.
                        </p>
                    </SubTitle>
                </XView>

                <XButton text="Accept invite" style="primary" onClick={onAcceptInvite} />
            </XView>

            <XView position="absolute" bottom={20} fontSize={14} opacity={0.5} alignSelf={'center'}>
                © 2019 Openland
            </XView>
        </XView>
    );
};

export const AcceptInvitePage = (props: {
    variables: { inviteKey: string };
    onAcceptInvite: (event: React.MouseEvent<any, MouseEvent>) => void;
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
    return <AcceptInvite inviter={inviter} onAcceptInvite={props.onAcceptInvite} />;
};

export default withApp('Home', 'viewer', () => {
    return <div />;
});
