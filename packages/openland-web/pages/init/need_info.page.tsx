import * as React from 'react';
import { MessagePage } from 'openland-web/components/MessagePage';
import { MessagePageContent } from 'openland-web/components/MessagePageContent';
import { withAppBase } from 'openland-web/components/withAppBase';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { AuthRouter } from 'openland-web/pages/root/AuthRouter';
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
