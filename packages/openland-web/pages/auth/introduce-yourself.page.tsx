import * as React from 'react';
import { XView } from 'react-mental';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { StoredFileT, UAvatarUploadField } from 'openland-web/components/unicorn/UAvatarUpload';
import { InitTexts } from 'openland-web/pages/init/_text';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { useClient } from 'openland-web/utils/useClient';
import * as Cookie from 'js-cookie';
import { Wrapper } from '../onboarding/components/wrapper';
import { Title, Subtitle, FormLayout, AuthActionButton, AuthInputWrapper, useShake } from './components/authComponents';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { UInput } from 'openland-web/components/unicorn/UInput';
import { useWithWidth } from 'openland-web/hooks/useWithWidth';
import { AuthHeaderConfig } from './root.page';

export type ProfileFormData = {
    firstName: string | null;
    lastName: string | null;
    photoRef: StoredFileT | null;
};

export type EnterYourOrganizationPageProps = {
    initialProfileFormData?: ProfileFormData | null;
};

type IntroduceYourselfPageOuterProps = {
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
                if (firstName.value.trim() === '') {
                    return;
                }
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

    const [shakeClassName, shake] = useShake();
    const handleNext = React.useCallback(() => {
        doConfirm();
        if (firstName.input.value.trim() === '') {
            shake();
        }
    }, [shakeClassName, doConfirm]);
    useShortcuts({ keys: ['Enter'], callback: handleNext });
    const [width] = useWithWidth();
    const isSmallMobile = width && width < 400;

    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [shakeClassName]);

    return (
        <FormLayout>
            <Title text={InitTexts.create_profile.title} />
            <Subtitle
                text={InitTexts.create_profile.subTitle}
                maxWidth={props.isMobile ? 230 : undefined}
            />
            <XView marginTop={32} marginBottom={16} alignSelf="center">
                <UAvatarUploadField
                    field={photoRef}
                    initialUrl={prefill ? prefill.picture : undefined}
                />
            </XView>

            <XView width={isSmallMobile ? '100%' : 320} alignSelf="center" marginBottom={16}>
                <AuthInputWrapper className={shakeClassName}>
                    <UInput
                        label="First name"
                        value={firstName.value}
                        flexGrow={1}
                        ref={inputRef}
                        onChange={firstName.input.onChange}
                    />
                </AuthInputWrapper>
            </XView>

            <XView width={isSmallMobile ? '100%' : 320} alignSelf="center">
                <AuthInputWrapper>
                    <UInput
                        label="Last name"
                        value={lastName.value}
                        flexGrow={1}
                        onChange={lastName.input.onChange}
                    />
                </AuthInputWrapper>
            </XView>
            <AuthActionButton loading={sending} text={InitTexts.create_profile.next} onClick={handleNext} />
        </FormLayout>

    );
};

export const IntroduceYourselfPageInner = ({ isMobile }: IntroduceYourselfPageOuterProps) => {
    const client = useClient();
    let router = React.useContext(XRouterContext)!;

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
        <Wrapper>
            <XDocumentHead title="What’s your name?" />
            <AuthHeaderConfig
                onBack={
                    () => {
                        router.replace('/auth/logout');
                    }
                }
            />
            <CreateProfileFormInnerWeb
                prefill={prefill}
                initialProfileFormData={initialProfileFormData}
                isMobile={isMobile}
            />
        </Wrapper>
    );
};

export const IntroduceYourselfPage = (props: IntroduceYourselfPageOuterProps) => {
    return (
        <React.Suspense fallback={null}>
            <IntroduceYourselfPageInner {...props} />
        </React.Suspense>
    );
};
