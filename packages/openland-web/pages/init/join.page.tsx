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
import { withInviteInfo } from '../../api/withInviteInfo';
import { XButton } from 'openland-x/XButton';
import { switchOrganization } from '../../utils/switchOrganization';
import { InitTexts } from './_text';

const InfoText = Glamorous.div({
    marginBottom: 15
});

export default withAppBase('Join', withInviteInfo((props) => {
    return (
        <AuthRouter>
            <XDocumentHead title={InitTexts.join.pageTitle} titleSocial={InitTexts.socialPageTitle} />
            <XTrack event="Join">
                <MessagePage>
                    {props.data.invite && (
                        <MessagePageContent title={InitTexts.join.title}>
                            <InfoText>{props.data.invite.title}</InfoText>
                            {props.data.invite.joined && <XButton text={InitTexts.join.goButton} onClick={() => switchOrganization(props.data.invite!!.orgId)} style="primary" />}
                            {!props.data.invite.joined &&
                                <XButton
                                    text={InitTexts.join.joinButton}
                                    action={async () => {
                                        await props.doJoin({});
                                        switchOrganization(props.data.invite!!.orgId);
                                    }}
                                    style="primary"
                                />}
                            {/* <XButton path="/auth/logout" text={TextGlobal.signOut} style="primary" alignSelf="center" /> */}
                        </MessagePageContent>
                    )}
                    {!props.data.invite && (
                        <MessagePageContent title="Join">
                            <InfoText>{InitTexts.join.unableToFindInvite}</InfoText>
                        </MessagePageContent>
                    )}
                </MessagePage>
            </XTrack>
        </AuthRouter>
    );
}));