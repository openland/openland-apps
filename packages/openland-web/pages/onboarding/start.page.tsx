import * as React from 'react';
import { css } from 'linaria';
import { withApp } from 'openland-web/components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { TopBar } from '../components/TopBar';
import { XView } from 'react-mental';
import { XButton } from 'openland-x/XButton';
import ImgUnboardingStart from 'openland-icons/img_unboarding_start.svg';
import { BackSkipLogo } from '../components/BackSkipLogo';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { getPercentageOfOnboarding } from '../components/utils';
import { Wrapper } from './components/wrapper';

const textAlignClassName = css`
    text-align: center;
`;

export default withApp('Home', 'viewer', () => {
    const router = React.useContext(XRouterContext)!;
    const isMobile = useIsMobile();
    const button = (
        <XButton text="Start" style="primary" size="large" path="/onboarding/discover" />
    );
    return (
        <Wrapper>
            <XDocumentHead title="Discover" />
            <TopBar progressInPercents={getPercentageOfOnboarding(6)} />
            <XView marginTop={isMobile ? 15 : 34}>
                <BackSkipLogo
                    onBack={null}
                    onSkip={() => {
                        router.push('/');
                    }}
                    noLogo={!!isMobile}
                />
            </XView>
            <XView
                alignItems="center"
                flexGrow={1}
                justifyContent="center"
                marginTop={-100}
                paddingHorizontal={20}
                flexDirection="column"
            >
                <XView marginBottom={21}>
                    <ImgUnboardingStart />
                </XView>
                <XView fontSize={24} marginBottom={12}>
                    Discover Chat
                </XView>
                <XView fontSize={16} marginBottom={40}>
                    <span className={textAlignClassName}>
                        Your account is created! <br />
                        Now, let’s find chats based on your interests
                    </span>
                </XView>
                {!isMobile && <XView alignItems="center">{button}</XView>}
                {isMobile && (
                    <XView alignItems="center" position="absolute" bottom={30}>
                        {button}
                    </XView>
                )}
            </XView>
        </Wrapper>
    );
});
