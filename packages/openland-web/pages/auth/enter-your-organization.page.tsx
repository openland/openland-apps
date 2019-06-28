import * as React from 'react';
import { XView } from 'react-mental';
import { withApp } from 'openland-web/components/withApp';
import { InputField } from 'openland-web/components/InputField';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { TopBar } from '../components/TopBar';
import { css, cx } from 'linaria';
import { BackSkipLogo } from '../components/BackSkipLogo';
import { getPercentageOfOnboarding } from '../components/utils';
import { XVertical } from 'openland-x-layout/XVertical';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { XButton } from 'openland-x/XButton';
import { XErrorMessage } from 'openland-x/XErrorMessage';
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
import { XShortcuts } from 'openland-x/XShortcuts';
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
    const [sending, setSending] = React.useState(false);
    const client = useClient();
    const form = useForm();
    const { roomView } = props;

    let organizationField = useField('input.organization', '', form, [
        {
            checkIsValid: (value: string) => value !== '',
            text: InitTexts.auth.organizationIsEmptyError,
        },
    ]);
    const doConfirm = React.useCallback(
        () => {
            form.doAction(async () => {
                if (organizationField.value) {
                    setSending(true);
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
                        await client.refetchAccount();
                        Cookie.set('x-openland-org', result.organization.id, { path: '/' });

                        trackEvent('registration_complete');
                        window.location.href = '/onboarding/start';
                    } else {
                        window.location.href = '/';
                        trackEvent('registration_complete');
                    }
                }
            });
        },
        [organizationField.value],
    );

    const subtitle = 'Find your organization or create a new one ';

    const onEnter = () => {
        doConfirm();
    };

    return (
        <XShortcuts
            handlerMap={{
                ENTER: onEnter,
            }}
            keymap={{
                ENTER: {
                    osx: ['enter'],
                    windows: ['enter'],
                },
            }}
        >
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
                                    <XVertical alignItems="center" separator="none">
                                        <InputField
                                            title="Organization name"
                                            dataTestId="organization"
                                            flexGrow={1}
                                            className={organizationInputClassName}
                                            field={organizationField}
                                        />
                                    </XVertical>
                                    {/*{form.error && <ShowOrgError message={form.error} />}*/}
                                </XVertical>

                                <XView marginTop={50}>
                                    <XButton
                                        loading={sending}
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
        </XShortcuts>
    );
};

export const EnterYourOrganizationPage = ({
    inviteKey,
    roomView,
}: { inviteKey?: string | null } & { roomView: boolean }) => {
    let router = React.useContext(XRouterContext)!;

    return (
        <XView backgroundColor="white" flexGrow={1}>
            <XDocumentHead title="Discover" />
            {!roomView && (
                <>
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
                </>
            )}

            <CreateOrganizationFormInner roomView={roomView} inviteKey={inviteKey} />
        </XView>
    );
};

export default withApp('Home', 'viewer', () => {
    return <EnterYourOrganizationPage roomView={false} />;
});
