import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { withApp } from 'openland-web/components/withApp';
import { InputField } from 'openland-web/components/InputField';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { TopBar } from '../components/TopBar';
import { BackSkipLogo } from '../components/BackSkipLogo';
import { getPercentageOfOnboarding } from '../components/utils';
import { XVertical } from 'openland-x-layout/XVertical';
import { XButton } from 'openland-x/XButton';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { XAvatarFormFieldComponent, StoredFileT } from 'openland-x/XAvatarUpload';
import {
    Title,
    ButtonsWrapper,
    SubTitle,
    ContentWrapper,
    RoomSignupContainer,
} from 'openland-web/pages/init/components/SignComponents';
import { InitTexts } from 'openland-web/pages/init/_text';
import { XTrack } from 'openland-x-analytics/XTrack';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { useClient } from 'openland-web/utils/useClient';
import * as Cookie from 'js-cookie';
import { XShortcuts } from 'openland-x/XShortcuts';
import { XInput } from 'openland-x/XInput';
import { XErrorMessage2 } from 'openland-x/XErrorMessage2';
import { RoomContainerParams } from './root.page';
import { Wrapper } from '../onboarding/components/wrapper';

export type ProfileFormData = {
    firstName: string | null;
    lastName: string | null;
    photoRef: StoredFileT | null;
};

type EnterYourOrganizationPageProps = {
    initialProfileFormData?: ProfileFormData | null;
};

type IntroduceYourselfPageOuterProps = {
    roomView: boolean;
    roomContainerParams: RoomContainerParams;
    initialProfileFormData?: ProfileFormData | null;
    isMobile: boolean;
};

const textAlignClassName = css`
    text-align: center;
`;

const CreateProfileFormInnerWeb = (
    props: EnterYourOrganizationPageProps & { prefill: any; isMobile: boolean },
) => {
    const [sending, setSending] = React.useState(false);
    const client = useClient();
    let router = React.useContext(XRouterContext)!;
    const form = useForm();
    const { prefill } = props;

    let firstName = useField<string>(
        'input.firstName',
        (prefill && prefill.firstName) ||
            (props.initialProfileFormData && props.initialProfileFormData.firstName) ||
            '',
        form,
        [
            {
                checkIsValid: (value: string) => !!value.trim(),
                text: `Please enter your name`,
            },
        ],
    );
    let lastName = useField<string>(
        'input.lastName',
        (prefill && prefill.lastName) ||
            (props.initialProfileFormData && props.initialProfileFormData.lastName) ||
            '',
        form,
    );
    let photoRef = useField<StoredFileT | null>(
        'input.photoRef',
        (props.initialProfileFormData && props.initialProfileFormData.photoRef) || null,
        form,
    );

    const doConfirm = React.useCallback(
        () => {
            form.doAction(async () => {
                const formData = {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    photoRef: photoRef.value
                        ? {
                              ...(photoRef.value as any),
                              isImage: undefined,
                              width: undefined,
                              height: undefined,
                              crop: undefined,
                              __typename: undefined,
                          }
                        : undefined,
                };

                if (props.initialProfileFormData) {
                    await client.mutateProfileUpdate({
                        input: formData,
                    });
                } else {
                    await client.mutateProfileCreate({
                        input: formData,
                    });
                }
                await client.refetchProfile();
                await client.refetchProfilePrefill();
                await client.refetchAccount();

                if (firstName.value) {
                    setSending(true);

                    if (Cookie.get('x-openland-org-invite')) {
                        const orgInvite = Cookie.get('x-openland-org-invite');
                        Cookie.remove('x-openland-org-invite');
                        window.location.href = `/join/${orgInvite}`;
                    } else {
                        router.push('/authorization/enter-your-organization');
                    }
                }
            });
        },
        [firstName.value, lastName.value, photoRef.value],
    );

    const onEnter = () => {
        doConfirm();
    };

    const button = (
        <XButton
            loading={sending}
            dataTestId="continue-button"
            style="primary"
            text={InitTexts.create_profile.continue}
            size="large"
            onClick={doConfirm}
        />
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
            <XView
                alignItems="center"
                flexGrow={1}
                paddingHorizontal={20}
                justifyContent="center"
                marginTop={-100}
            >
                <XTrack event="signup_profile_view">
                    <XView fontSize={24} color="#000" fontWeight="600" marginBottom={12}>
                        {InitTexts.create_profile.title}
                    </XView>
                    <XView
                        fontSize={16}
                        color="#000"
                        marginBottom={36}
                        maxWidth={props.isMobile ? 230 : undefined}
                    >
                        <span className={textAlignClassName}>
                            {InitTexts.create_profile.subTitle}
                        </span>
                    </XView>
                    <XView marginBottom={20}>
                        <XAvatarFormFieldComponent
                            size="default"
                            {...photoRef.input}
                            initialUrl={prefill ? prefill.picture : undefined}
                            darkMode
                        />
                    </XView>

                    <XView width={props.isMobile ? '100%' : 360} maxWidth={360} marginBottom={20}>
                        <XView width={props.isMobile ? '100%' : 360} maxWidth={360}>
                            <InputField
                                height={56}
                                title="First name"
                                dataTestId="first-name"
                                flexGrow={1}
                                field={firstName}
                                hideErrorText
                            />
                        </XView>
                        {firstName.input.invalid &&
                            firstName.input.errorText && (
                                <XErrorMessage2 message={firstName.input.errorText} />
                            )}
                    </XView>

                    <XView width={props.isMobile ? '100%' : 360} maxWidth={360}>
                        <XView width={props.isMobile ? '100%' : 360} maxWidth={360}>
                            <InputField
                                height={56}
                                title="Last name"
                                dataTestId="last-name"
                                flexGrow={1}
                                field={lastName}
                                hideErrorText
                            />
                        </XView>
                        {lastName.input.invalid &&
                            lastName.input.errorText && (
                                <XErrorMessage2 message={lastName.input.errorText} />
                            )}
                    </XView>
                    {!props.isMobile && (
                        <XView
                            alignItems="center"
                            marginTop={
                                firstName.input.invalid && firstName.input.errorText ? 14 : 40
                            }
                        >
                            {button}
                        </XView>
                    )}
                    {props.isMobile && (
                        <XView alignItems="center" position="absolute" bottom={30}>
                            {button}
                        </XView>
                    )}
                </XTrack>
            </XView>
        </XShortcuts>
    );
};

export const CreateProfileFormInnerRoom = (
    props: EnterYourOrganizationPageProps & { prefill: any },
) => {
    const [sending, setSending] = React.useState(false);
    const client = useClient();
    let router = React.useContext(XRouterContext)!;
    const form = useForm();
    const { prefill } = props;

    let firstName = useField<string>(
        'input.firstName',
        (prefill && prefill.firstName) ||
            (props.initialProfileFormData && props.initialProfileFormData.firstName) ||
            '',
        form,
        [
            {
                checkIsValid: (value: string) => !!value.trim(),
                text: `Please enter your name`,
            },
        ],
    );
    let lastName = useField<string>(
        'input.lastName',
        (prefill && prefill.lastName) ||
            (props.initialProfileFormData && props.initialProfileFormData.lastName) ||
            '',
        form,
    );
    let photoRef = useField<StoredFileT | null>(
        'input.photoRef',
        (props.initialProfileFormData && props.initialProfileFormData.photoRef) || null,
        form,
    );

    const doConfirm = React.useCallback(
        () => {
            form.doAction(async () => {
                const formData = {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    photoRef: photoRef.value
                        ? {
                              ...(photoRef.value as any),
                              isImage: undefined,
                              width: undefined,
                              height: undefined,
                              crop: undefined,
                              __typename: undefined,
                          }
                        : undefined,
                };

                if (props.initialProfileFormData) {
                    await client.mutateProfileUpdate({
                        input: formData,
                    });
                } else {
                    await client.mutateProfileCreate({
                        input: formData,
                    });
                }
                await client.refetchProfile();
                await client.refetchProfilePrefill();
                await client.refetchAccount();

                if (firstName.value) {
                    setSending(true);

                    if (Cookie.get('x-openland-org-invite')) {
                        const orgInvite = Cookie.get('x-openland-org-invite');
                        Cookie.remove('x-openland-org-invite');
                        window.location.href = `/join/${orgInvite}`;
                    } else {
                        router.push('/authorization/enter-your-organization');
                    }
                }
            });
        },
        [firstName.value, lastName.value, photoRef.value],
    );

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
            <XView>
                <XTrack event="signup_profile_view">
                    <ContentWrapper noPadding={true}>
                        <Title roomView={true}>{InitTexts.create_profile.title}</Title>
                        <SubTitle>{InitTexts.create_profile.subTitle}</SubTitle>
                        <ButtonsWrapper marginTop={40} width="100%">
                            <XVertical alignItems="center">
                                <XView marginBottom={10}>
                                    <XAvatarFormFieldComponent
                                        size="default"
                                        {...photoRef.input}
                                        initialUrl={prefill ? prefill.picture : undefined}
                                    />
                                </XView>

                                <XView maxWidth={500}>
                                    <XView width={330}>
                                        <XInput
                                            invalid={!!form.error}
                                            size="large"
                                            title="First name"
                                            dataTestId="first-name"
                                            flexGrow={1}
                                            {...firstName.input}
                                        />
                                    </XView>
                                    {firstName.input.invalid &&
                                        firstName.input.errorText && (
                                            <XErrorMessage2 message={firstName.input.errorText} />
                                        )}
                                </XView>

                                <XView>
                                    <XView width={330}>
                                        <XInput
                                            invalid={!!form.error}
                                            size="large"
                                            title="Last name"
                                            dataTestId="last-name"
                                            flexGrow={1}
                                            {...lastName.input}
                                        />
                                    </XView>
                                    {lastName.input.invalid &&
                                        lastName.input.errorText && (
                                            <XErrorMessage2 message={lastName.input.errorText} />
                                        )}
                                </XView>
                                <XView marginTop={70 - 8} paddingBottom={84}>
                                    <ButtonsWrapper>
                                        <XButton
                                            loading={sending}
                                            dataTestId="continue-button"
                                            style="primary"
                                            text={InitTexts.create_profile.continue}
                                            size="large"
                                            onClick={doConfirm}
                                        />
                                    </ButtonsWrapper>
                                </XView>
                            </XVertical>
                        </ButtonsWrapper>
                    </ContentWrapper>
                </XTrack>
            </XView>
        </XShortcuts>
    );
};

export const IntroduceYourselfPageInner = ({
    roomView,
    roomContainerParams,
    isMobile,
}: IntroduceYourselfPageOuterProps) => {
    const client = useClient();

    if (canUseDOM) {
        localStorage.setItem('isnewuser', 'newuser');
    }

    const profile = client.useProfile();
    const data = client.useProfilePrefill();

    let usePhotoPrefill = Cookie.get('auth-type') !== 'email';
    const prefill = usePhotoPrefill && data ? data.prefill : null;

    const initialProfileFormData = profile.profile
        ? {
              firstName: profile.profile.firstName,
              lastName: profile.profile.lastName,
              photoRef: profile.profile.photoRef,
          }
        : null;

    return (
        <>
            {!roomView && (
                <Wrapper>
                    <XDocumentHead title="Introduce yourself" />
                    <TopBar progressInPercents={getPercentageOfOnboarding(3)} />
                    <XView marginTop={isMobile ? 15 : 34}>
                        <BackSkipLogo
                            onBack={
                                null
                                // () => {
                                //     router.replace('/authorization/ask-activation-code');
                                // }
                            }
                            onSkip={null}
                            noLogo={isMobile}
                        />
                    </XView>
                    <CreateProfileFormInnerWeb
                        prefill={prefill}
                        initialProfileFormData={initialProfileFormData}
                        isMobile={isMobile}
                    />
                </Wrapper>
            )}
            {roomView && (
                <XView backgroundColor="white" flexGrow={1}>
                    <XDocumentHead title="Introduce yourself" />
                    <RoomSignupContainer pageMode="CreateProfile" {...roomContainerParams!!}>
                        <CreateProfileFormInnerRoom
                            prefill={usePhotoPrefill && data ? data.prefill : null}
                            initialProfileFormData={initialProfileFormData}
                        />
                    </RoomSignupContainer>
                </XView>
            )}
        </>
    );
};

export const IntroduceYourselfPage = (props: IntroduceYourselfPageOuterProps) => {
    return (
        <React.Suspense fallback={null}>
            <IntroduceYourselfPageInner {...props} />
        </React.Suspense>
    );
};

export default withApp(
    'Home',
    'viewer',
    () => null,
    // <IntroduceYourselfPage roomView={false} />
);
