import * as React from 'react';
import { withApp } from 'openland-web/components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { TopBar } from '../components/TopBar';
import { XView } from 'react-mental';
import { css, cx } from 'linaria';
import { BackSkipLogo } from '../components/BackSkipLogo';
import { getPercentageOfOnboarding } from '../components/utils';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { XButton } from 'openland-x/XButton';
import { XErrorMessage } from 'openland-x/XErrorMessage';
import { XInput } from 'openland-x/XInput';
import { XTrack } from 'openland-x-analytics/XTrack';
import { InitTexts } from 'openland-web/pages/init/_text';
import {
    ContentWrapper,
    Title,
    ButtonsWrapper,
    SubTitle,
} from 'openland-web/pages/init/components/SignComponents';
import { trackEvent } from 'openland-x-analytics';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { useClient } from 'openland-web/utils/useClient';
import * as Cookie from 'js-cookie';

const organizationInputClassName = css`
    width: 300px;
    @media (max-width: 450px) {
        width: 250px;
    }
`;

const organizationInputErrorClassName = css`
    display: flex;
    align-self: flex-start;
`;

const ShowOrgError = ({ message }: { message: string }) => {
    const [onceRender, setOnceRender] = React.useState(false);

    if (!onceRender) {
        trackEvent('signup_org_error');

        setOnceRender(true);
    }

    return (
        <div className={cx(organizationInputClassName, organizationInputErrorClassName)}>
            <XErrorMessage message={message} />
        </div>
    );
};

const CreateOrganizationFormInner = (props: { roomView: boolean; inviteKey?: string | null }) => {
    let router = React.useContext(XRouterContext)!;
    const client = useClient();
    const form = useForm();
    const { roomView } = props;

    let organizationField = useField('input.organization', '', form, [
        {
            checkIsValid: (value: string) => value !== '',
            text: InitTexts.auth.organizationIsEmptyError,
        },
    ]);
    const doConfirm = React.useCallback(() => {
        form.doAction(async () => {
            let result = await client.mutateCreateOrganization({
                input: {
                    personal: false,
                    name: organizationField.value,
                    // id: data.id,
                },
            });

            const inviteKey = Cookie.get('x-openland-app-invite');
            if (inviteKey) {
                await client.mutateOrganizationActivateByInvite({
                    inviteKey,
                });
            }
            await client.refetchAccount();

            trackEvent('registration_complete');
            Cookie.set('x-openland-org', result.organization.id, { path: '/' });

            window.location.href = '/onboarding/start';
        });
    }, [organizationField.value]);

    const subtitle = 'Find your organization or create a new one ';

    return (
        <XView alignItems="center" flexGrow={1} justifyContent="center" marginTop={-100}>
            <XTrack event="signup_org_view">
                <ContentWrapper>
                    <Title roomView={roomView} className="title">
                        {InitTexts.create_organization.title}
                    </Title>
                    <SubTitle className="subtitle">{subtitle}</SubTitle>

                    <ButtonsWrapper marginBottom={84} marginTop={34}>
                        <XVertical alignItems="center" separator="none">
                            <XVertical separator="none" alignItems="center">
                                <XHorizontal alignItems="center" separator="none">
                                    <XInput
                                        invalid={!!form.error}
                                        size="large"
                                        title="Organization name"
                                        dataTestId="organization"
                                        flexGrow={1}
                                        className={organizationInputClassName}
                                        {...organizationField.input}
                                    />
                                </XHorizontal>
                                {form.error && <ShowOrgError message={form.error} />}
                            </XVertical>

                            <XView marginTop={50}>
                                <XButton
                                    dataTestId="continue-button"
                                    style="primary"
                                    text={InitTexts.create_organization.continue}
                                    size="large"
                                    onClick={doConfirm}
                                />
                            </XView>
                        </XVertical>
                    </ButtonsWrapper>
                </ContentWrapper>
            </XTrack>
        </XView>
    );
};

export const EnterYourOrganizationPage = ({ inviteKey }: { inviteKey?: string | null }) => {
    let router = React.useContext(XRouterContext)!;

    return (
        <XView backgroundColor="white" flexGrow={1}>
            <XDocumentHead title="Discover" />
            <TopBar progressInPercents={getPercentageOfOnboarding(4)} />
            <XView marginTop={34}>
                <BackSkipLogo
                    onBack={() => {
                        router.replace('/auth2/introduce-yourself');
                    }}
                    onSkip={() => {
                        router.push('/onboarding/start');
                    }}
                />
            </XView>

            <CreateOrganizationFormInner roomView={false} inviteKey={inviteKey} />
        </XView>
    );
};

export default withApp('Home', 'viewer', () => {
    return <EnterYourOrganizationPage />;
});
