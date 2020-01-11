import * as React from 'react';
import { XView } from 'react-mental';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { BackSkipLogo } from '../components/BackSkipLogo';
import { Wrapper } from '../onboarding/components/wrapper';
import { Title, Subtitle, FormLayout } from './components/authComponents';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { completeAuth } from './complete.page';
import { ULink } from 'openland-web/components/unicorn/ULink';

export const ConfirmNewUser = () => {
    let router = React.useContext(XRouterContext)!;
    const isMobile = useIsMobile();
    const email = localStorage.getItem('authUserEmail');
    const complete = React.useCallback(() => {
        if (router.path.endsWith('google')) {
            let token = localStorage.getItem("pendingOpenlandToken");
            if (token) {
                completeAuth(token);
            } else {
                console.error('inconsistent state');
            }
        } else if (router.path.endsWith('email')) {
            router.replace('/authorization/ask-activation-code');
        } else {
            console.error('unknown state');
        }
    }, []);

    return (
        <Wrapper>
            <XDocumentHead title="First time here?" />
            <BackSkipLogo
                onBack={() => {
                    router.replace('/authorization/signin');
                }}
                onSkip={null}
                noLogo={!!isMobile}
            />

            <FormLayout
                top={
                    <>
                        <Title text="First time here?" />
                        <XView color="var(--foregroundSecondary)" marginBottom={32} marginTop={8}>
                            <Subtitle text={`${email} is new at Openland. Been here before? `} ><ULink path="/authorization/signin">Change email</ULink></Subtitle>
                        </XView>
                    </>
                }
                bottom={<UButton text="Create account" onClick={complete} />}
            />
        </Wrapper>
    );
};
