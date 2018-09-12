import '../init';
import '../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { MessagePageContent } from '../../components/MessagePageContent';
import { withAppBase } from '../../components/withAppBase';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import { InitTexts } from './_text';
import { withChannelInviteInfo } from '../../api/withChannelInviteInfo';
import { ChannelsInviteComponent } from '../../components/messenger/ChannelsInviteComponent';
import { Sidebar } from './components/signChannelInviteComponents';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { withUserInfo } from '../../components/UserInfo';
import { AuthRouter } from '../../components/AuthRouter';

const Root = Glamorous.div({
    display: 'flex',
    minHeight: '100vh',
    paddingLeft: 280,
});

const SideBarWrapper = Glamorous.div({
    position: 'fixed',
    top: 0,
    left: 0,
    maxHeight: '100vh'
});

const Content = Glamorous.div({
    flexGrow: 1,
});

const InfoText = Glamorous.div({
    marginBottom: 15
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
                <XTrack event="Join Channel">
                    <Root>
                        <SideBarWrapper>
                            <Sidebar />
                        </SideBarWrapper>
                        <Content>
                            {props.data.invite && (
                                <ChannelsInviteComponent
                                    noLogin={true}
                                    channel={props.data.invite.channel}
                                    invite={props.data.invite}
                                    signup={'/signup?redirect=' + encodeURIComponent((props as any).redirect)}
                                />
                            )}
                            {!props.data.invite && (
                                <MessagePageContent title="Join">
                                    <InfoText>{InitTexts.join.unableToFindInvite}</InfoText>
                                </MessagePageContent>
                            )}
                        </Content>
                    </Root>
                </XTrack>}
        </>
    );
}) as React.ComponentType<{ variables: { uuid: string }, redirect: string, instantRedirect?: string }>;

export default withAppBase('Join Channel', withUserInfo((props) => {
    let uuid = props.router.routeQuery.uuid;
    return (
        <AuthRouter>
            <XDocumentHead title={InitTexts.invite.pageTitle} titleSocial={InitTexts.socialPageTitle} />
            <XTrack event="Invite">
                <InviteInfo variables={{ uuid: uuid }} redirect={'/acceptChannelInvite/' + uuid} instantRedirect={props.isLoggedIn ? (props.isCompleted ? '/mail/joinChannel/' : '/acceptChannelInvite/') + uuid : undefined} />
            </XTrack>
        </AuthRouter>
    );
}));