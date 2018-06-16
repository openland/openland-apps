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
import { InitTexts } from './_text';

const InfoText = Glamorous.div({
    marginBottom: 15
});

export default withAppBase('Need Info', (props) => {
    return (
        <AuthRouter>
            <XDocumentHead title={InitTexts.need_info.pageTitle} titleSocial={InitTexts.socialPageTitle} />
            <XTrack event="View Need Info">
                <MessagePage>
                    <MessagePageContent title={InitTexts.need_info.title}>
                        <InfoText>{InitTexts.need_info.content}</InfoText>
                        <XButton path="/auth/logout" text={TextGlobal.signOut} style="primary" alignSelf="center" />
                    </MessagePageContent>
                </MessagePage>
            </XTrack>
        </AuthRouter>
    );
});