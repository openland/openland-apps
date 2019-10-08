import * as React from 'react';
import { XView } from 'react-mental';
import { withApp } from 'openland-web/components/withApp';
import { InputField } from 'openland-web/components/InputField';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { TopBar } from '../components/TopBar';
import { BackSkipLogo } from '../components/BackSkipLogo';
import { getPercentageOfOnboarding } from '../components/utils';
import { XButton } from 'openland-x/XButton';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { StoredFileT, UAvatarUploadField } from 'openland-web/components/unicorn/UAvatarUpload';
import { InitTexts } from 'openland-web/pages/init/_text';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { useClient } from 'openland-web/utils/useClient';
import * as Cookie from 'js-cookie';
import { XErrorMessage2 } from 'openland-x/XErrorMessage2';
import { RoomContainerParams } from './root.page';
import { Wrapper } from '../onboarding/components/wrapper';
import { CreateProfileFormInnerRoom } from './components/createProfileFormInnerRoom';
import { Title, Subtitle, ContinueButtonContainer } from './components/authComponents';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';

export type ProfileFormData = {
    firstName: string | null;
    lastName: string | null;
    photoRef: StoredFileT | null;
};

export type EnterYourOrganizationPageProps = {
    initialProfileFormData?: ProfileFormData | null;
};

type IntroduceYourselfPageOuterProps = {
    roomView: boolean;
    roomContainerParams: RoomContainerParams;
    initialProfileFormData?: ProfileFormData | null;
    isMobile: boolean;
};

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
                    firstName: firstName.value.trim(),
                    lastName: lastName.value.trim(),
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

    useShortcuts({ keys: ['Enter'], callback: doConfirm });

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

        <XView
            alignItems="center"
            flexGrow={1}
            paddingHorizontal={20}
            justifyContent="center"
            marginTop={-100}
        >
            <Title text={InitTexts.create_profile.title} />
            <Subtitle
                text={InitTexts.create_profile.subTitle}
                maxWidth={props.isMobile ? 230 : undefined}
            />
            <XView marginBottom={20}>
                <UAvatarUploadField
                    field={photoRef}
                    initialUrl={prefill ? prefill.picture : undefined}
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
                        hideErrorText={true}
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
                        hideErrorText={true}
                    />
                </XView>
                {lastName.input.invalid &&
                    lastName.input.errorText && (
                        <XErrorMessage2 message={lastName.input.errorText} />
                    )}
            </XView>
            <ContinueButtonContainer
                marginTop={firstName.input.invalid && firstName.input.errorText ? 14 : 40}
                isMobile={props.isMobile}
                button={button}
            />
        </XView>
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
                    <CreateProfileFormInnerRoom
                        prefill={usePhotoPrefill && data ? data.prefill : null}
                        initialProfileFormData={initialProfileFormData}
                        roomContainerParams={roomContainerParams!!}
                    />
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
