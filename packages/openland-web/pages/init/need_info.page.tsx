import * as React from 'react';
import { MessagePage } from '../../components/MessagePage';
import { MessagePageContent } from '../../components/MessagePageContent';
import { withAppBase } from '../../components/withAppBase';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import { AuthRouter } from '../root/AuthRouter';
import { TextGlobal } from 'openland-text/TextGlobal';
import { XButton } from 'openland-x/XButton';
import { InitTexts } from './_text';
import { css } from 'linaria';

const InfoText = css`
    margin-bottom: 15px;
`;

export default withAppBase('Need Info', props => {
    return (
        <AuthRouter>
            <XDocumentHead
                title={InitTexts.need_info.pageTitle}
                titleSocial={InitTexts.socialPageTitle}
            />
            <MessagePage>
                <MessagePageContent title={InitTexts.need_info.title}>
                    <div className={InfoText}>{InitTexts.need_info.content}</div>
                    <XButton
                        path="/auth/logout"
                        text={TextGlobal.signOut}
                        style="primary"
                        alignSelf="center"
                    />
                </MessagePageContent>
            </MessagePage>
        </AuthRouter>
    );
});
