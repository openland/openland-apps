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
import confetti from 'canvas-confetti';

const avatarWrapper = css`
    position: absolute;
    top: 39px;
    left: 50%;
    transform: translateX(-50%);
`;

const useConfetti = () => {
    const confettiDuration = 2000;
    const end = Date.now() + confettiDuration;
    const colors = ['#CC99FF', '#A9D1F7', '#B4F0A7', '#FFFFBF', '#FFDFBE', '#FFB1B0'];
    let fireworksTimeout: any;
    let snowTimeout: any;
    const reset = () => {
        clearTimeout(fireworksTimeout);
        clearTimeout(snowTimeout);
    };

    const snow = () => {
        colors.forEach(color => {
            confetti({
                particleCount: 1,
                startVelocity: 0,
                ticks: 1000,
                origin: {
                    x: Math.random(),
                    y: -0.1
                },
                colors: [color],
            });
        });

        if (Date.now() < end + confettiDuration * 2) {
            snowTimeout = setTimeout(() => requestAnimationFrame(snow), 100);
        }
    };

    const fireworks = () => {
        confetti({
            particleCount: colors.length,
            angle: 60,
            spread: 55,
            origin: {
                x: 0
            },
            ticks: 1000,
            colors,
            zIndex: 1000,
            decay: 0.92,
        });
        confetti({
            particleCount: colors.length,
            angle: 120,
            spread: 55,
            origin: {
                x: 1
            },
            ticks: 1000,
            colors,
            zIndex: 1000,
            decay: 0.92,
        });
        if (Date.now() < end) {
            fireworksTimeout = setTimeout(() => requestAnimationFrame(fireworks), 100);
        }
    };

    const start = () => {
        fireworks();

        snowTimeout = setTimeout(() => snow(), confettiDuration);
    };

    return [start, reset];
};

export const DiscoverStart = ({
    onSkip,
    onStartClick,
    noBackSkipLogo,
    onLogin,
}: {
    onSkip?: ((event: React.MouseEvent<Element, MouseEvent>) => void);
    onStartClick: (event: React.MouseEvent<Element, MouseEvent>) => void;
    noBackSkipLogo?: boolean;
    onLogin?: boolean;
}) => {
    const client = useClient();
    const { profile, user } = client.useProfile();
    const { id } = user || { id: undefined };
    const { firstName, lastName, photoRef } = profile || { firstName: '', lastName: '', photoRef: null };
    const { uuid } = photoRef || { uuid: undefined };
    const fullName = [firstName, lastName].filter(Boolean).join(' ');
    const subtitle = onLogin
        ? 'Your account is ready and it’s time to find interesting communities to join'
        : 'Find the most useful chats based on your interests and needs';

    const [start, reset] = useConfetti();

    React.useEffect(() => {
        if (onLogin) {
            start();
            return reset;
        }
    }, []);

    const handleStartClick = React.useCallback((event) => {
        onStartClick(event);
        if (onLogin) {
            reset();
        }
    }, [onStartClick]);

    return (
        <XView flexGrow={1} flexShrink={1}>
            {!noBackSkipLogo && <BackSkipLogo onSkip={onSkip} />}
            <FormLayout>
                <Title text="You’re on board!" />
                <Subtitle text={subtitle} />
                <XView position="relative" marginTop={32} alignSelf="center">
                    <div className={avatarWrapper}>
                        <UAvatar uuid={uuid} title={fullName} id={id!!} />
                    </div>
                    <ImgUnboardingStart />
                    <AuthActionButton text="Discover communities" onClick={handleStartClick} />
                </XView>
            </FormLayout>
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
