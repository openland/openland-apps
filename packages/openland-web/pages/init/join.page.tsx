import '../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { MessagePage } from '../../components/MessagePage';
import { MessagePageContent } from '../../components/MessagePageContent';
import { withAppBase } from '../../components/withAppBase';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import { AuthRouter } from '../../components/AuthRouter';
import { withInviteInfo } from '../../api';
import { XButton } from 'openland-x/XButton';

const InfoText = Glamorous.div({
    marginBottom: 15
});

export default withAppBase(withInviteInfo((props) => {
    return (
        <AuthRouter>
            <XDocumentHead title="Join" titleSocial="Openland - land acquisition platfom" />
            <XTrack event="Join">
                <MessagePage>
                    {props.data.invite && (
                        <MessagePageContent title="Join">
                            <InfoText>{props.data.invite.title}</InfoText>
                            {props.data.invite.joined && <XButton text="Already Joined" enabled={false} style="primary"/>}
                            {!props.data.invite.joined && <XButton text="Join Organization" style="primary"/>}
                            {/* <XButton path="/auth/logout" text={TextGlobal.signOut} style="primary" alignSelf="center" /> */}
                        </MessagePageContent>
                    )}
                    {!props.data.invite && (
                        <MessagePageContent title="Join">
                            <InfoText>Unable to find invite</InfoText>
                            {/* <XButton path="/auth/logout" text={TextGlobal.signOut} style="primary" alignSelf="center" /> */}
                        </MessagePageContent>
                    )}
                </MessagePage>
            </XTrack>
        </AuthRouter>
    );
}));