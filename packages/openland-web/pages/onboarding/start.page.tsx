import * as React from 'react';
import { css } from 'linaria';
import { withApp } from 'openland-web/components/withApp';
import { XView } from 'react-mental';
import ImgUnboardingStart from 'openland-icons/img-onboarding-start.svg';
import { BackSkipLogo } from '../components/BackSkipLogo';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { useClient } from 'openland-web/utils/useClient';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { FormLayout, Title, Subtitle, AuthActionButton } from '../auth/components/authComponents';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';

const avatarWrapper = css`
    position: absolute;
    top: 39px;
    left: 50%;
    transform: translateX(-50%);
`;

const confetti = css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    opacity: 0.48;
    width: 100%;
    height: 83%;
    object-fit: cover;
    z-index: -1;
`;

export const DiscoverStart = ({
    onSkip,
    onStartClick,
    noBackSkipLogo,
    onLogin,
}: {
    onSkip: ((event: React.MouseEvent<Element, MouseEvent>) => void) | null;
    onStartClick: (event: React.MouseEvent<Element, MouseEvent>) => void;
    noBackSkipLogo?: boolean;
    onLogin?: boolean;
}) => {
    const client = useClient();
    const { profile, user } = client.useProfile();
    const { id } = user || {};
    const { firstName, lastName, photoRef } = profile || {};
    const { uuid } = photoRef || {};
    const fullName = [firstName, lastName].filter(Boolean).join(' ');
    const subtitle = onLogin
        ? 'Your account is ready and it’s time to find interesting communities to join'
        : 'Find the most useful chats based on your interests and needs';

    return (
        <XView flexGrow={1} flexShrink={1}>
            {!noBackSkipLogo && <BackSkipLogo onBack={null} onSkip={onSkip} />}
            <FormLayout>
                <Title text="You’re on board!" />
                <Subtitle text={subtitle} />
                <XView position="relative" marginTop={32} alignSelf="center">
                    <div className={avatarWrapper}>
                        <UAvatar uuid={uuid} title={fullName} id={id!!} />
                    </div>
                    <ImgUnboardingStart />
                    <AuthActionButton text="Discover communities" onClick={onStartClick} />
                </XView>
            </FormLayout>
            <img
                className={confetti}
                srcSet="https://cdn.openland.com/shared/onboarding/confetti.png, https://cdn.openland.com/shared/onboarding/confetti@2x.png 2x"
            />
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
            <XDocumentHead title="You’re on board!" />
            <DiscoverStart onSkip={onSkip} onStartClick={onStartClick} onLogin={true} />
        </React.Suspense>
    );
});
