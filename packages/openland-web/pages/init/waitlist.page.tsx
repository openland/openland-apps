import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { MessagePage } from 'openland-web/components/MessagePage';
import { MessagePageContent } from 'openland-web/components/MessagePageContent';
import { withAppBase } from 'openland-web/components/withAppBase';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import { AuthRouter } from 'openland-web/pages/root/AuthRouter';
import { TextGlobal } from 'openland-text/TextGlobal';
import { InitTexts } from './_text';

const imageStyle = css`
    display: block;
    object-fit: contain;
    max-width: 520px;
    height: 216px;
    margin-bottom: 64px;
    pointer-events: none;
`;

const textAlignStyle = css`
    text-align: center;
`;

export default withAppBase('Waitlist', props => {
    return (
        <AuthRouter>
            <XDocumentHead
                title={InitTexts.need_info.pageTitle}
                titleSocial={InitTexts.socialPageTitle}
            />
            <XTrack event="waitlist_view">
                <MessagePage hideLegalText={true}>
                    <img
                        className={imageStyle}
                        src="/static/img/artwork-copy.png"
                        srcSet="/static/img/artwork-copy@2x.png 2x"
                    />
                    <MessagePageContent title={InitTexts.waitlist.title}>
                        <XView
                            alignItems="center"
                            alignSelf="center"
                            maxWidth={426}
                            marginBottom={12}
                            fontSize={14}
                            lineHeight={1.53}
                            color="#000"
                            opacity={0.8}
                        >
                            <span className={textAlignStyle}>{InitTexts.waitlist.content}</span>
                        </XView>
                        <XView
                            fontSize={13}
                            marginBottom={32}
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <XView color="#000" opacity={0.5} marginRight={2}>
                                Questions?
                            </XView>
                            <XView as="a" href="mailto:hello@openland.com" color="#1790ff">
                                hello@openland.com
                            </XView>
                        </XView>

                        <UButton
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
