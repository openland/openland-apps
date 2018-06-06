import '../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { MessagePage } from '../../components/MessagePage';
import { MessagePageContent } from '../../components/MessagePageContent';
import { withAppBase } from '../../components/withAppBase';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import { AuthRouter } from '../../components/AuthRouter';
import { TextGlobal } from 'openland-text/TextGlobal';
import { XButton } from 'openland-x/XButton';

const InfoText = Glamorous.div({
    marginBottom: 15
});

export default withAppBase((props) => {
    return (
        <AuthRouter>
            <XDocumentHead title="Need Info" titleSocial="Openland - land acquisition platfom" />
            <XTrack event="View Need Info">
                <MessagePage>
                    <MessagePageContent title="We need more info">
                        <InfoText>To continue working with system we need more information from you</InfoText>
                        <XButton path="/auth/logout" text={TextGlobal.signOut} style="primary" alignSelf="center"/>
                    </MessagePageContent>
                </MessagePage>
            </XTrack>
        </AuthRouter>
    );
});