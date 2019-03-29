import * as React from 'react';
import Glamorous from 'glamorous';
import { MessagePageContent } from '../../components/MessagePageContent';
import { withAppBase } from '../../components/withAppBase';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import { InitTexts } from './_text';
import { useClient } from 'openland-web/utils/useClient';
import { RoomsInviteComponent } from '../../fragments/RoomsInviteComponent';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import * as Cookie from 'js-cookie';
import { XLoader } from 'openland-x/XLoader';
import { withRouter } from 'openland-x-routing/withRouter';
import { UserInfoContext } from 'openland-web/components/UserInfo';

const Root = Glamorous.div({
    display: 'flex',
    minHeight: '100vh',
    width: '100%',
    backgroundColor: '#ffffff',
    flexDirection: 'column',
});

const Content = Glamorous.div({
    flex: 1,
});

const InfoText = Glamorous.div({
    marginBottom: 15,
});

type InviteInfoInnerT = {
    variables: { invite: string };
    redirect: string;
    instantRedirect?: string;
};

export const InviteInfoInner = (props: any) => {
    const {
        variables,
        instantRedirect,
        redirect,
        loading,
    }: InviteInfoInnerT & { data: any; loading: any } = props;
    const client = useClient();

    const data = client.useWithoutLoaderRoomInviteInfo({
        invite: props.variables.invite,
    });

    if (data === null) {
        return null;
    }

    return (
        <>
            <XDocumentHead
                title={InitTexts.join.pageTitle}
                description={data.invite && data.invite.room ? data.invite.room.description : ''}
                titleSocial={
                    (data.invite && data.invite.room && data.invite.room.title) ||
                    InitTexts.socialPageTitle
                }
                imgUrl={
                    data.invite && data.invite.room
                        ? data.invite.room.socialImage || data.invite.room.photo
                        : undefined
                }
            />
            {instantRedirect && <XPageRedirect path={instantRedirect} />}
            {!instantRedirect && (
                <XTrack event="Join Room">
                    <Root>
                        <Content>
                            {data.invite && (
                                <RoomsInviteComponent
                                    noLogin={true}
                                    room={data.invite.room as any}
                                    invite={data.invite}
                                    inviteLink={variables.invite}
                                    signup={'/signup?redirect=' + encodeURIComponent(redirect)}
                                />
                            )}
                            {!data.invite && !loading && (
                                <MessagePageContent title="Join">
                                    <InfoText>{InitTexts.join.unableToFindInvite}</InfoText>
                                </MessagePageContent>
                            )}
                            {!data.invite && loading && <XLoader loading={true} />}
                        </Content>
                    </Root>
                </XTrack>
            )}
        </>
    );
};

export const SignInInvite = ({ invite }: { invite: string }) => {
    Cookie.set('x-openland-invite', invite, { path: '/' });

    let userCtx = React.useContext(UserInfoContext)!!;

    const instantRedirect = userCtx.isLoggedIn
        ? (userCtx.isCompleted ? '/mail/joinChannel/' : '/acceptChannelInvite/') + invite
        : undefined;

    return (
        <>
            <XDocumentHead
                title={InitTexts.invite.pageTitle}
                titleSocial={InitTexts.socialPageTitle}
            />
            <XTrack event="Invite">
                <InviteInfoInner
                    variables={{ invite }}
                    redirect={`/acceptChannelInvite/${invite}`}
                    instantRedirect={instantRedirect}
                />
            </XTrack>
        </>
    );
};

export default withAppBase(
    'Join Room',
    withRouter(props => {
        let invite = props.router.routeQuery.invite;

        return <SignInInvite invite={invite} />;
    }),
);
