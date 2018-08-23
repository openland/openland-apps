import '../init';
import '../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { MessagePage } from '../../components/MessagePage';
import { MessagePageContent } from '../../components/MessagePageContent';
import { withAppBase } from '../../components/withAppBase';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import { AuthRouter } from '../../components/AuthRouter';
import { InitTexts } from './_text';
import { withChannelInviteInfo } from '../../api/withChannelInviteInfo';
import { ChannelsInviteComponent } from '../../components/messenger/ChannelsInviteComponent';
import { withRouter } from 'openland-x-routing/withRouter';

const InfoText = Glamorous.div({
    marginBottom: 15
});

const InviteInfo = withChannelInviteInfo((props) => {
    return (
        <>
            <XDocumentHead title={InitTexts.join.pageTitle} titleSocial={InitTexts.socialPageTitle} />
            <XTrack event="Join Channel">
                <MessagePage>
                    {props.data.invite && (
                        <ChannelsInviteComponent channel={props.data.invite.channel} signup={'/signin?redirect=' + encodeURIComponent((props as any).redirect)} />
                    )}
                    {!props.data.invite && (
                        <MessagePageContent title="Join">
                            <InfoText>{InitTexts.join.unableToFindInvite}</InfoText>
                        </MessagePageContent>
                    )}
                </MessagePage>
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