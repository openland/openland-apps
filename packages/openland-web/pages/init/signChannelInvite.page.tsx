import * as React from 'react';
import Glamorous from 'glamorous';
import { MessagePageContent } from '../../components/MessagePageContent';
import { withAppBase } from '../../components/withAppBase';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import { InitTexts } from './_text';
import { withChannelInviteInfo } from '../../api/withChannelInviteInfo';
import { RoomsInviteComponent } from '../../components/messenger/RoomsInviteComponent';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { withUserInfo } from '../../components/UserInfo';
import * as Cookie from 'js-cookie';
import { XLoader } from 'openland-x/XLoader';

const Root = Glamorous.div({
    display: 'flex',
    height: '100vh',
    width: '100%',
    backgroundColor: '#ffffff',
    flexDirection: 'column'
});

const Content = Glamorous.div({
    flex: 1,
});

const InfoText = Glamorous.div({
    marginBottom: 15
});

const HeaderWrapper = Glamorous.div({
    paddingLeft: 32,
    paddingTop: 19
});

const HeaderLogo = Glamorous.div({
    width: 145,
    height: 42,
    background: 'url(/static/X/signup/logo-2.svg) no-repeat',
    backgroundSize: '100% 100%'
});

const InviteInfo = withChannelInviteInfo((props) => {
    return (
        <>
            <XDocumentHead
                title={InitTexts.join.pageTitle}
                titleSocial={(props.data.invite && props.data.invite.channel) && props.data.invite.channel.description || InitTexts.socialPageTitle}
                imgUrl={(props.data.invite && props.data.invite.channel) ? props.data.invite.channel.socialImage : undefined}
            />
            {(props as any).instantRedirect && <XPageRedirect path={(props as any).instantRedirect} />}
            {!(props as any).instantRedirect &&
                <XTrack event="Join Room">
                    <Root>
                        <HeaderWrapper>
                            <HeaderLogo />
                        </HeaderWrapper>
                        <Content>
                            {props.data.invite && (
                                <RoomsInviteComponent
                                    noLogin={true}
                                    room={props.data.invite.channel}
                                    invite={props.data.invite}
                                    signup={'/signup?redirect=' + encodeURIComponent((props as any).redirect)}
                                />
                            )}
                            {!props.data.invite && !props.loading && (
                                <MessagePageContent title="Join">
                                    <InfoText>{InitTexts.join.unableToFindInvite}</InfoText>
                                </MessagePageContent>
                            )}
                            {!props.data.invite && props.loading && (
                                <XLoader loading={true} />
                            )}
                        </Content>
                    </Root>
                </XTrack>}
        </>
    );
}) as React.ComponentType<{ variables: { uuid: string }, redirect: string, instantRedirect?: string }>;

export default withAppBase('Join Room', withUserInfo((props) => {
    let uuid = props.router.routeQuery.uuid;

    Cookie.set('x-openland-invite', uuid, { path: '/' });

    return (
        <>
            <XDocumentHead title={InitTexts.invite.pageTitle} titleSocial={InitTexts.socialPageTitle} />
            <XTrack event="Invite">
                <InviteInfo variables={{ uuid: uuid }} redirect={'/acceptChannelInvite/' + uuid} instantRedirect={props.isLoggedIn ? (props.isCompleted ? '/mail/joinChannel/' : '/acceptChannelInvite/') + uuid : undefined} />
            </XTrack>
        </>
    );
}));