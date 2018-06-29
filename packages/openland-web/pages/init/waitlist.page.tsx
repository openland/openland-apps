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
import { TextGlobal } from 'openland-text/TextGlobal';
import { XButton } from 'openland-x/XButton';
import { InitTexts } from './_text';

const InfoText = Glamorous.div({
    maxWidth: 357,
    margin: 'auto',
    marginBottom: 15
});

const Img = Glamorous.img({
    display: 'block',
    objectFit: 'contain',
    width: 616,
    margin: 'auto',
    marginBottom: 53,
    '@media (max-height: 700px)': {
        width: 500,
    }
});

const MailText = Glamorous.span({
    color: '#334562',
    fontSize: 14,
    opacity: 0.5,
    marginTop: 30
});

export default withAppBase('Waitlist', (props) => {
    return (
        <AuthRouter>
            <XDocumentHead title={InitTexts.need_info.pageTitle} titleSocial={InitTexts.socialPageTitle} />
            <XTrack event="View Waitlist">
                <MessagePage>
                    <Img src="/static/img/img-moreinfo.png" srcSet="/static/img/img-moreinfo@2x.png 2x" />
                    <MessagePageContent title={InitTexts.waitlist.title}>
                        <InfoText>{InitTexts.waitlist.content}</InfoText>
                        <XButton path="/auth/logout" text={TextGlobal.signOut} style="primary" alignSelf="center" />
                        <MailText>Questions? <a href="mailto:hello@openland.com">hello@openland.com</a></MailText>
                    </MessagePageContent>
                </MessagePage>
            </XTrack>
        </AuthRouter>
    );
});