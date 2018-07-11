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
import { XButton } from 'openland-x/XButton';
import { switchOrganization } from '../../utils/switchOrganization';
import { InitTexts } from './_text';
import { withInviteActivation } from '../../api/withInviteActivation';

const InfoText = Glamorous.div({
    marginBottom: 15
});

export default withAppBase('Invite', withInviteActivation((props) => {
    return (
        <AuthRouter>
            <XDocumentHead title={InitTexts.invite.pageTitle} titleSocial={InitTexts.socialPageTitle} />
            <XTrack event="Invite">
                <MessagePage>
                    {props.data.invite && (
                        <MessagePageContent title={InitTexts.invite.title + props.data.invite.title}>
                            <XButton
                                text={InitTexts.invite.joinButton}
                                action={async () => {
                                    await props.activate({});
                                    switchOrganization(props.data.invite!!.orgId);
                                }}
                                style="primary"
                            />
                        </MessagePageContent>
                    )}
                    {!props.data.invite && (
                        <MessagePageContent title="Invite">
                            <InfoText>{InitTexts.invite.unableToFindInvite}</InfoText>
                        </MessagePageContent>
                    )}
                </MessagePage>
            </XTrack>
        </AuthRouter>
    );
}));