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
import { RoomContainerParams } from './root.page';

type EnterYourOrganizationPageProps = { inviteKey?: string | null };

type EnterYourOrganizationPageOuterProps = {
    roomView: boolean;
    roomContainerParams: RoomContainerParams;
};

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

type processCreateOrganizationT = (a: { organizationFieldValue: string | null }) => void;

const CreateOrganizationFormInner = (props: {
    sending: boolean;
    roomView: boolean;
    inviteKey?: string | null;
    processCreateOrganization: processCreateOrganizationT;
}) => {
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
            await props.processCreateOrganization({
                organizationFieldValue: organizationField.value,
            });
        });
    }, [organizationField.value]);

    const subtitle = 'Give others context about your work';

    const onEnter = () => {
        doConfirm();
    };

    const errorText = organizationField.input.errorText;
    const isInvalid = !!errorText;

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
                                    <XView width={360}>
                                        <InputField
                                            title="Organization name"
                                            dataTestId="organization"
                                            flexGrow={1}
                                            className={organizationInputClassName}
                                            hideErrorText
                                            field={organizationField}
                                        />
                                        {isInvalid && <XErrorMessage2 message={errorText} />}
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
                                {isInvalid && <XErrorMessage2 message={errorText} />}
                            </XView>
                        )}

                        <XView
                            marginTop={
                                organizationField.input.invalid && organizationField.input.errorText
                                    ? 50 - 26
                                    : 50
                            }
                        >
                            <XButton
                                loading={props.sending}
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
    roomView,
    roomContainerParams,
}: EnterYourOrganizationPageProps & EnterYourOrganizationPageOuterProps) => {
    const client = useClient();
    let router = React.useContext(XRouterContext)!;
    const me = client.useAccount();
    const [sending, setSending] = React.useState(false);

    const processCreateOrganization = async ({
        organizationFieldValue,
    }: {
        organizationFieldValue: string | null;
    }) => {
        setSending(true);

        if (!organizationFieldValue) {
            if (me.me) {
                organizationFieldValue = me.me.name;
            }
        }
        if (!organizationFieldValue) {
            return;
        }
        let result = await client.mutateCreateOrganization({
            input: {
                personal: false,
                name: organizationFieldValue,
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
            Cookie.remove('x-openland-create-new-account');
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
            Cookie.remove('x-openland-create-new-account');
            window.location.href = `/mail/${room.join.id}`;
        } else {
            Cookie.remove('x-openland-create-new-account');
            window.location.href = '/';
            trackEvent('registration_complete');
        }
    };

    return (
        <XView backgroundColor="white" flexGrow={1}>
            <XDocumentHead title="Enter organization" />
            {!roomView && (
                <>
                    <TopBar progressInPercents={getPercentageOfOnboarding(4)} />
                    <XView marginTop={34}>
                        <BackSkipLogo
                            onBack={() => {
                                router.replace('/authorization/introduce-yourself');
                            }}
                            onSkip={async () => {
                                await processCreateOrganization({
                                    organizationFieldValue: null,
                                });
                            }}
                        />
                    </XView>
                    <CreateOrganizationFormInner
                        sending={sending}
                        roomView={roomView}
                        processCreateOrganization={processCreateOrganization}
                    />
                </>
            )}

            {roomView && (
                <RoomSignupContainer pageMode="CreateOrganization" {...roomContainerParams!!}>
                    <CreateOrganizationFormInner
                        sending={sending}
                        roomView={roomView}
                        processCreateOrganization={processCreateOrganization}
                    />
                </RoomSignupContainer>
            )}
        </XView>
    );
};

export default withApp('Home', 'viewer', () => {
    return null;
    // return <EnterYourOrganizationPage roomView={false} />;
});
