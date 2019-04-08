import * as React from 'react';
import Glamorous from 'glamorous';
import { MessagePage } from '../../components/MessagePage';
import { MessagePageContent } from '../../components/MessagePageContent';
import { withAppBase } from '../../components/withAppBase';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import { AuthRouter } from '../root/AuthRouter';
import { TextGlobal } from 'openland-text/TextGlobal';
import { XButton } from 'openland-x/XButton';
import { InitTexts } from './_text';

const Img = Glamorous.img({
    display: 'block',
    objectFit: 'contain',
    maxWidth: 520,
    height: 216,
    marginBottom: 64,
    '@media (max-height: 750px)': {
        maxWidth: 500,
    },
});

const InfoText = Glamorous.div({
    maxWidth: 426,
    margin: 'auto',
    marginBottom: 12,
    fontSize: 14,
    lineHeight: 1.53,
    color: '#000',
    opacity: 0.8,
    textAlign: 'center',
});

const MailText = Glamorous.span({
    fontSize: 13,
    marginBottom: 32,
    display: 'flex',
    justifyContent: 'center',
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
            <XTrack event="waitlist_view">
                <MessagePage hideLegalText={true}>
                    <Img
                        src="/static/img/artwork-copy.png"
                        srcSet="/static/img/artwork-copy@2x.png 2x"
                    />
                    <MessagePageContent title={InitTexts.waitlist.title}>
                        <InfoText>{InitTexts.waitlist.content}</InfoText>
                        <MailText>
                            <QuestionsSpan>Questions?</QuestionsSpan>
                            <HelloA href="mailto:hello@openland.com">hello@openland.com</HelloA>
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
