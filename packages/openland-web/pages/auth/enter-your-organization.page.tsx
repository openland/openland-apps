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
    RoomSignupContainer,
} from 'openland-web/pages/init/components/SignComponents';
import { trackEvent } from 'openland-x-analytics';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { useClient } from 'openland-web/utils/useClient';
import { XShortcuts } from 'openland-x/XShortcuts';
import * as Cookie from 'js-cookie';
import { XInput } from 'openland-x/XInput';
import IcInfo from 'openland-icons/ic-info.svg';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XPopper } from 'openland-x/XPopper';
import Glamorous from 'glamorous';
import { XErrorMessage2 } from 'openland-x/XErrorMessage2';

const InfoText = Glamorous.span({
    fontSize: 14,
});
const XIconWrapper = Glamorous.span({
    fontSize: 20,
    marginLeft: 11,

    '& svg': {
        marginBottom: -3,
    },

    '&:hover': {
        cursor: 'pointer',
        '& svg': {
            '& > g > path:last-child': {
                fill: '#1790ff',
                opacity: 1,
            },
        },
    },
});

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
    const doConfirm = React.useCallback(() => {
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

                if (Cookie.get('x-openland-app-invite')) {
                    // app invite invite
                    const inviteKey = Cookie.get('x-openland-app-invite')!!;
                    await client.mutateOrganizationActivateByInvite({
                        inviteKey,
                    });
                    await client.refetchAccount();

                    Cookie.set('x-openland-org', result.organization.id, { path: '/' });
                    trackEvent('registration_complete');
                    Cookie.remove('x-openland-app-invite');
                    window.location.href = '/onboarding/start';
                } else if (Cookie.get('x-openland-invite')) {
                    // room invite
                    const inviteKey = Cookie.get('x-openland-invite')!!;

                    const room = await client.mutateRoomJoinInviteLink({
                        invite: inviteKey,
                    });

                    await client.refetchAccount();

                    Cookie.set('x-openland-org', result.organization.id, { path: '/' });
                    trackEvent('registration_complete');

                    Cookie.remove('x-openland-invite');
                    window.location.href = `/mail/${room.join.id}`;
                } else {
                    window.location.href = '/';
                    trackEvent('registration_complete');
                }
            }
        });
    }, [organizationField.value]);

    const subtitle = 'Find your organization or create a new one ';

    const onEnter = () => {
        doConfirm();
    };

    const content = (
        <XTrack event="signup_org_view">
            <ContentWrapper>
                <Title roomView={roomView} className="title">
                    {InitTexts.create_organization.title}
                </Title>
                <SubTitle className="subtitle">{subtitle}</SubTitle>

                <ButtonsWrapper marginBottom={84} marginTop={34} width={350}>
                    <XVertical alignItems="center" separator="none">
                        <XVertical separator="none" alignItems="center">
                            <XVertical alignItems="center" separator="none">
                                {!roomView && (
                                    <XView>
                                        <InputField
                                            title="Organization name"
                                            dataTestId="organization"
                                            flexGrow={1}
                                            className={organizationInputClassName}
                                            field={organizationField}
                                        />
                                        {organizationField.input.invalid &&
                                            organizationField.input.errorText && (
                                                <XErrorMessage2
                                                    message={organizationField.input.errorText}
                                                />
                                            )}
                                    </XView>
                                )}
                            </XVertical>
                        </XVertical>
                        {roomView && (
                            <XView width={330}>
                                <XHorizontal alignItems="center" separator="none">
                                    <XInput
                                        invalid={!!form.error}
                                        size="large"
                                        title="Organization name"
                                        dataTestId="organization"
                                        flexGrow={1}
                                        {...organizationField.input}
                                    />
                                    <XPopper
                                        content={
                                            <InfoText>
                                                To register as an individual, simply enter your name
                                            </InfoText>
                                        }
                                        showOnHover={true}
                                        placement="top"
                                        style="dark"
                                    >
                                        <XIconWrapper>
                                            <IcInfo />
                                        </XIconWrapper>
                                    </XPopper>
                                </XHorizontal>
                                {organizationField.input.invalid &&
                                    organizationField.input.errorText && (
                                        <XErrorMessage2
                                            message={organizationField.input.errorText}
                                        />
                                    )}
                            </XView>
                        )}

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
    );
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
            {roomView && (
                <XView alignItems="center" flexGrow={1} justifyContent="center">
                    {content}
                </XView>
            )}
            {!roomView && (
                <XView alignItems="center" flexGrow={1} justifyContent="center" marginTop={-100}>
                    {content}
                </XView>
            )}
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

            {roomView && (
                <RoomSignupContainer pageMode="CreateOrganization">
                    <CreateOrganizationFormInner roomView={roomView} inviteKey={inviteKey} />
                </RoomSignupContainer>
            )}
        </XView>
    );
};

export default withApp('Home', 'viewer', () => {
    return <EnterYourOrganizationPage roomView={false} />;
});
