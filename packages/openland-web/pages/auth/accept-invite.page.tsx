import * as React from 'react';
import { withApp } from 'openland-web/components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { TopBar } from '../components/TopBar';
import { XView } from 'react-mental';
import { XButton } from 'openland-x/XButton';
import { css } from 'linaria';
import ImgUnboardingStart from 'openland-icons/img_unboarding_start.svg';
import { BackSkipLogo } from '../components/BackSkipLogo';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { getPercentageOfOnboarding } from '../components/utils';

const backgroundClassName = css`
    background: white;
    width: 100%;
`;

export default withApp('Home', 'viewer', () => {
    const router = React.useContext(XRouterContext)!;

    return (
        <div className={backgroundClassName}>
            <XDocumentHead title="Discover" />
            <TopBar progressInPercents={getPercentageOfOnboarding(6)} />
            <XView marginBottom={150} marginTop={34}>
                <BackSkipLogo noSkip />
            </XView>

            <XView flexDirection="row" justifyContent="center">
                <XView flexDirection="column" alignSelf="center" alignItems="center">
                    <XView marginBottom={21}>
                        <ImgUnboardingStart />
                    </XView>
                    <XView fontSize={24} marginBottom={12}>
                        Discover Chat
                    </XView>
                    <XView fontSize={16} marginBottom={40}>
                        Find the right chats for you
                    </XView>

                    <XButton
                        text="Start"
                        style="primary"
                        size="default"
                        onClick={() => {
                            if (router) {
                                router.push('/onboarding/discover');
                            }
                        }}
                    />
                </XView>
            </XView>
        </div>
    );
});
