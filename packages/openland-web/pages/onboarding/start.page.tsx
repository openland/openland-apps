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
import { useClient } from 'openland-web/utils/useClient';

const textAlignClassName = css`
    text-align: center;
`;

export const DiscoverStart = ({
    onSkip,
    onStartClick,
    noTopBar,
    noBackSkipLogo,
    onLogin,
}: {
    onSkip: ((event: React.MouseEvent<Element, MouseEvent>) => void) | null;
    onStartClick: (event: React.MouseEvent<Element, MouseEvent>) => void;
    noTopBar?: boolean;
    noBackSkipLogo?: boolean;
    onLogin?: boolean;
}) => {
    const isMobile = useIsMobile();
    const button = <XButton text="Start" style="primary" size="large" onClick={onStartClick} />;
    return (
        <XView flexGrow={1}>
            <XDocumentHead title="Discover" />
            {!noTopBar && <TopBar progressInPercents={getPercentageOfOnboarding(6)} />}
            {!noBackSkipLogo && (
                <BackSkipLogo onBack={null} onSkip={onSkip} noLogo={!!isMobile} />
            )}
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
                    Discover chats
                </XView>
                <XView fontSize={16} marginBottom={40}>
                    {!onLogin && (
                        <span className={textAlignClassName}>
                            Find the most useful chats
                            <br />
                            based on your interests and needs
                        </span>
                    )}
                    {onLogin && (
                        <span className={textAlignClassName}>
                            Your account is created!
                            <br />
                            Now, let’s find chats based on your interests
                        </span>
                    )}
                </XView>
                {!isMobile && <XView alignItems="center">{button}</XView>}
                {isMobile && (
                    <XView alignItems="center" position="absolute" bottom={30}>
                        {button}
                    </XView>
                )}
            </XView>
        </XView>
    );
};

export default withApp('Home', 'viewer', () => {
    const router = React.useContext(XRouterContext)!;
    const client = useClient();

    const onSkip = React.useCallback(async () => {
        await client.mutateBetaDiscoverSkip({ selectedTagsIds: [] });
        router.push('/');
    }, []);

    const onStartClick = React.useCallback(() => {
        router.push('/onboarding/discover');
    }, []);

    return (
        <React.Suspense fallback={null}>
            <DiscoverStart onSkip={onSkip} onStartClick={onStartClick} onLogin={true} />
        </React.Suspense>
    );
});
