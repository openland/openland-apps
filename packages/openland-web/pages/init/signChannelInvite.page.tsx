import * as React from 'react';
import Glamorous from 'glamorous';
import { MessagePageContent } from '../../components/MessagePageContent';
import { withAppBase } from '../../components/withAppBase';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import { InitTexts } from './_text';
import { withChannelInviteInfo } from '../../api/withChannelInviteInfo';
import { RoomsInviteComponent } from '../../fragments/RoomsInviteComponent';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { withUserInfo } from '../../components/UserInfo';
import * as Cookie from 'js-cookie';
import { XLoader } from 'openland-x/XLoader';
import { withRouter } from 'openland-x-routing/withRouter';

const Root = Glamorous.div({
    display: 'flex',
    height: '100vh',
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

const HeaderWrapper = Glamorous.div({
    paddingLeft: 32,
    paddingTop: 19,
});

const HeaderLogo = Glamorous.div({
    width: 145,
    height: 42,
    background: 'url(/static/X/signup/logo-2.svg) no-repeat',
    backgroundSize: '100% 100%',
});

type InviteInfoInner = {
    variables: { invite: string };
    redirect: string;
    instantRedirect?: string;
};

export const InviteInfoInner = (props: any) => {
    const {
        data,
        variables,
        instantRedirect,
        redirect,
        loading,
    }: InviteInfoInner & { data: any; loading: any } = props;
    return (
        <>
            <XDocumentHead
                title={InitTexts.join.pageTitle}
                titleSocial={
                    (data.invite && data.invite.room && data.invite.room.description) ||
                    InitTexts.socialPageTitle
                }
                imgUrl={data.invite && data.invite.room ? data.invite.room.photo : undefined}
            />
            {instantRedirect && <XPageRedirect path={instantRedirect} />}
            {!instantRedirect && (
                <XTrack event="Join Room">
                    <Root>
                        <HeaderWrapper>
                            <HeaderLogo />
                        </HeaderWrapper>
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

export const InviteInfo = withChannelInviteInfo(InviteInfoInner) as React.ComponentType<
    InviteInfoInner
>;

export default withAppBase(
    'Join Room',
    withRouter(
        withUserInfo(props => {
            let invite = props.router.routeQuery.invite;

            Cookie.set('x-openland-invite', invite, { path: '/' });

            return (
                <>
                    <XDocumentHead
                        title={InitTexts.invite.pageTitle}
                        titleSocial={InitTexts.socialPageTitle}
                    />
                    <XTrack event="Invite">
                        <InviteInfo
                            variables={{ invite: invite }}
                            redirect={'/acceptChannelInvite/' + invite}
                            instantRedirect={
                                props.isLoggedIn
                                    ? (props.isCompleted
                                          ? '/mail/join/'
                                          : '/acceptChannelInvite/') + invite
                                    : undefined
                            }
                        />
                    </XTrack>
                </>
            );
        }),
    ),
);
