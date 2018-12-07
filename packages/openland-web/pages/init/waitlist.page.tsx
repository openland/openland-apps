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

const Img = Glamorous.img({
    display: 'block',
    objectFit: 'contain',
    width: 520,
    height: 216,
    marginBottom: 64,
    '@media (max-height: 700px)': {
        width: 500,
    },
});

const InfoText = Glamorous.div({
    maxWidth: 426,
    margin: 'auto',
    marginBottom: 12,
    fontFamily: 'SFProText-Regular',
    fontSize: 14,
    lineHeight: 1.53,
    color: '#000',
    opacity: 0.8,
});

const MailText = Glamorous.span({
    fontFamily: 'SFProText-Semibold',
    fontSize: 13,
    marginBottom: 32,
});

const QuestionsSpan = Glamorous.span({
    opacity: 0.5,
    color: '#000',
});

const HelloA = Glamorous.a({
    color: '#1790ff',
    marginLeft: 2,
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
                            <QuestionsSpan>Questions?</QuestionsSpan>
                            <HelloA href="mailto:hello@openland.com">
                                hello@openland.com
                            </HelloA>
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
