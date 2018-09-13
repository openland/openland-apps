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
    maxWidth: 350,
    margin: 'auto',
    marginBottom: 42,
    marginTop: 10,

    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.53,
    letterSpacing: -0.4,
    color: '#334562',
    opacity: 0.8,
});

const Img = Glamorous.img({
    display: 'block',
    objectFit: 'contain',
    width: 616,
    margin: 'auto',
    marginBottom: 58,
    '@media (max-height: 700px)': {
        width: 500,
    }
});

const MailText = Glamorous.span({
    color: '#334562',
    fontSize: 14,
    opacity: 0.5,
    marginTop: 30,
    fontWeight: 500,
});

const ButtonGroup = Glamorous.div({
    display: 'flex',
    justifyContent: 'space-between',
    width: 370,
    margin: 'auto',
    '& > a': {
        width: '50%',

        '&:first-child': {
            marginRight: 6
        },
        '&:last-child': {
            marginLeft: 6
        }
    }
});

export default withAppBase('Waitlist', (props) => {
    return (
        <AuthRouter>
            <XDocumentHead title={InitTexts.need_info.pageTitle} titleSocial={InitTexts.socialPageTitle} />
            <XTrack event="View Waitlist">
                <MessagePage hideLegalText={true}>
                    <Img src="/static/img/img-moreinfo.png" srcSet="/static/img/img-moreinfo@2x.png 2x" />
                    <MessagePageContent title={InitTexts.waitlist.title}>
                        <InfoText>{InitTexts.waitlist.content}</InfoText>
                        <ButtonGroup>
                            <XButton path="/auth/logout" text={TextGlobal.signOut} style="primary" alignSelf="center" size="medium" flexGrow={1} />
                        </ButtonGroup>
                        <MailText>Questions? <a href="mailto:hello@openland.com">hello@openland.com</a></MailText>
                    </MessagePageContent>
                </MessagePage>
            </XTrack>
        </AuthRouter>
    );
});