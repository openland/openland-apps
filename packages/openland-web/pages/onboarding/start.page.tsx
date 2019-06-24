import * as React from 'react';
import { withApp } from 'openland-web/components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { TopBar } from './TopBar';
import { XView, XImage } from 'react-mental';
import { XButton } from 'openland-x/XButton';
import { css } from 'linaria';
import ImgUnboardingStart from 'openland-icons/img_unboarding_start.svg';

const backgroundClassName = css`
    background: white;
    width: 100%;
`;

export default withApp('Home', 'viewer', () => {
    return (
        <div className={backgroundClassName}>
            <XDocumentHead title="Discover" />
            <TopBar progress={0.5} />

            <XView flexDirection="row" justifyContent="center" marginTop={34}>
                <XView flexDirection="column" alignSelf="center" alignItems="center">
                    <XView marginBottom={150}>
                        <XImage src="/static/landing/logotype.svg" width={145} height={42} />
                    </XView>
                    <XView marginBottom={21}>
                        <ImgUnboardingStart />
                    </XView>
                    <XView fontSize={24} marginBottom={12}>
                        Discover Chat
                    </XView>
                    <XView fontSize={16} marginBottom={40}>
                        Find the right chats for you
                    </XView>

                    <XButton text="Start" style="primary" size="default" />
                </XView>
            </XView>
        </div>
    );
});
