import * as React from 'react';
import { withApp } from 'openland-web/components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { TopBar } from '../components/TopBar';
import { XView } from 'react-mental';
import { XButton } from 'openland-x/XButton';
import ImgUnboardingStart from 'openland-icons/img_unboarding_start.svg';
import { BackSkipLogo } from '../components/BackSkipLogo';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { getPercentageOfOnboarding } from '../components/utils';

export default withApp('Home', 'viewer', () => {
    const router = React.useContext(XRouterContext)!;

    return (
        <XView backgroundColor="white" flexGrow={1}>
            <XDocumentHead title="Discover" />
            <TopBar progressInPercents={getPercentageOfOnboarding(6)} />
            <XView marginTop={34}>
                <BackSkipLogo
                    onBack={
                        null
                        // () => {
                        //     router.replace('/authorization/enter-your-organization');
                        // }
                    }
                    onSkip={() => {
                        router.push('/');
                    }}
                />
            </XView>

            <XView alignItems="center" flexGrow={1} justifyContent="center" marginTop={-100}>
                <XView flexDirection="column" alignSelf="center" alignItems="center">
                    <XView marginBottom={21}>
                        <ImgUnboardingStart />
                    </XView>
                    <XView fontSize={24} marginBottom={12}>
                        Discover Chat
                    </XView>
                    <XView fontSize={16} marginBottom={40}>
                        Your account is created! Now, let’s find chats based on your interests
                    </XView>

                    <XButton
                        text="Start"
                        style="primary"
                        size="large"
                        path="/onboarding/discover"
                    />
                </XView>
            </XView>
        </XView>
    );
});
