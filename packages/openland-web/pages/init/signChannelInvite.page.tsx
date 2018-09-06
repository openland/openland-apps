import '../init';
import '../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { MessagePageContent } from '../../components/MessagePageContent';
import { withAppBase } from '../../components/withAppBase';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import { AuthRouter } from '../../components/AuthRouter';
import { InitTexts } from './_text';
import { withChannelInviteInfo } from '../../api/withChannelInviteInfo';
import { ChannelsInviteComponent } from '../../components/messenger/ChannelsInviteComponent';
import { withRouter } from 'openland-x-routing/withRouter';

import { Sidebar } from './components/signChannelInviteComponents';

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
            <XDocumentHead title={InitTexts.join.pageTitle} titleSocial={props.data.invite && props.data.invite.channel.description || InitTexts.socialPageTitle} imgUrl={props.data.invite ? props.data.invite.channel.socialImage : undefined} />
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
            </XTrack>
        </>
    );
}) as React.ComponentType<{ variables: { uuid: string }, redirect: string }>;

export default withAppBase('Join Channel', withRouter((props) => {
    console.warn(String(props.router.query.redirect).split('/')[2]);

    return (
        <>
            <XDocumentHead title={InitTexts.invite.pageTitle} titleSocial={InitTexts.socialPageTitle} />
            <XTrack event="Invite">
                <InviteInfo variables={{ uuid: props.router.query.redirect.split('/')[2] }} redirect={props.router.query.redirect} />
            </XTrack>
        </>
    );
}));