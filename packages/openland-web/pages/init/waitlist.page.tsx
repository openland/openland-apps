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
    fontFamily: 'SFProText-Regular',
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
    width: 520,
    height: 216,
    '@media (max-height: 700px)': {
        width: 500,
    },
});

const MailText = Glamorous.span({
    color: '#334562',
    fontFamily: 'SFProText-Regular',
    fontSize: 14,
    opacity: 0.5,
    marginTop: 30,
    fontWeight: 500,
});

export default withAppBase('Waitlist', props => {
    return (
        <AuthRouter>
            <XDocumentHead
                title={InitTexts.need_info.pageTitle}
                titleSocial={InitTexts.socialPageTitle}
            />
            <XTrack event="View Waitlist">
                <MessagePage hideLegalText={true}>
                    <Img
                        src="/static/img/artwork-copy.png"
                        srcSet="/static/img/artwork-copy@2x.png 2x"
                    />
                    <MessagePageContent title={InitTexts.waitlist.title}>
                        <InfoText>{InitTexts.waitlist.content}</InfoText>
                        <MailText>
                            Questions?{' '}
                            <a href="mailto:hello@openland.com">
                                hello@openland.com
                            </a>
                        </MailText>

                        <XButton
                            path="/auth/logout"
                            text={TextGlobal.signOut}
                            style="primary"
                            alignSelf="center"
                            flexGrow={1}
                        />
                    </MessagePageContent>
                </MessagePage>
            </XTrack>
        </AuthRouter>
    );
});
