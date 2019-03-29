import * as React from 'react';
import { css } from 'linaria';
import { withAppBase } from '../../components/withAppBase';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import { AuthRouter } from '../root/AuthRouter';
import { InitTexts } from './_text';
import { XView } from 'react-mental';
import { useClient } from 'openland-web/utils/useClient';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { SignInInvite } from './signChannelInvite.page';
import { JoinComponent } from './join.page';

type typeOfInviteT = null | 'AppInvite' | 'RoomInvite' | 'InviteInfo';
const InviteComponent = ({
    invite,
    typeOfInvite,
}: {
    invite: string;
    typeOfInvite: typeOfInviteT;
}) => {
    if (typeOfInvite === 'RoomInvite') {
        return <SignInInvite invite={invite} />;
    }

    if (typeOfInvite === 'InviteInfo') {
        return <JoinComponent inviteKey={invite} />;
    }

    return (
        <XView flexDirection="column">
            <XView>{typeOfInvite ? typeOfInvite : 'not invite'}</XView>
        </XView>
    );
};

export default withAppBase('Join', props => {
    const client = useClient();
    let router = React.useContext(XRouterContext)!;

    const { invite } = router.routeQuery;

    const resolvedInvite = client.useWithoutLoaderResolvedInvite({
        key: invite,
    });

    let typeOfInvite: typeOfInviteT = null;
    if (resolvedInvite && resolvedInvite.invite) {
        if (resolvedInvite.invite.__typename === 'AppInvite') {
            typeOfInvite = 'AppInvite';
        } else if (resolvedInvite.invite.__typename === 'RoomInvite') {
            typeOfInvite = 'RoomInvite';
        } else if (resolvedInvite.invite.__typename === 'InviteInfo') {
            typeOfInvite = 'InviteInfo';
        }
    }

    return (
        <AuthRouter>
            <XDocumentHead
                title={InitTexts.join.pageTitle}
                titleSocial={InitTexts.socialPageTitle}
            />
            <XTrack event="Join" />
            <XView flexDirection="column">
                <InviteComponent invite={invite} typeOfInvite={typeOfInvite} />

                {/* <XView>
                    <a href="/resolveInvite/HaBFFH">AppInvite /resolveInvite/HaBFFH</a>
                </XView> */}
                <XView>
                    <a href="/resolveInvite/HM7MoON">RoomInvite /resolveInvite/HM7MoON</a>
                </XView>
                <XView>
                    <a href="/resolveInvite/FtpkMi">InviteInfo /resolveInvite/FtpkMi</a>
                </XView>
            </XView>
        </AuthRouter>
    );
});
