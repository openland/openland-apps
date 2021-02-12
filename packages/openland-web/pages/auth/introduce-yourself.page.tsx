import * as React from 'react';
import createHistory from 'history/createBrowserHistory';
import { XView } from 'react-mental';
import { css, cx } from 'linaria';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { StoredFileT, UAvatarUploadField } from 'openland-web/components/unicorn/UAvatarUpload';
import { InitTexts } from 'openland-web/pages/init/_text';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { useClient } from 'openland-api/useClient';
import {
    Wrapper,
    Title,
    Subtitle,
    FormLayout,
    AuthActionButton,
    AuthInputWrapper,
    useShake,
    textClassName,
} from './components/authComponents';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { UInput } from 'openland-web/components/unicorn/UInput';
import { useWithWidth } from 'openland-web/hooks/useWithWidth';
import { AuthHeaderConfig } from './root.page';
import { ULink } from 'openland-web/components/unicorn/ULink';
import { TextCaption } from 'openland-web/utils/TextStyles';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { trackEvent } from 'openland-x-analytics';

type ProfileFormData = {
    firstName: string | null;
    lastName: string | null;
    photoRef: StoredFileT | null;
};

type EnterYourOrganizationPageProps = {
    initialProfileFormData?: ProfileFormData | null;
};

const CreateProfileFormInnerWeb = (props: EnterYourOrganizationPageProps) => {
    const router = React.useContext(XRouterContext)!;
    const signupRedirect = router.query.redirect;
    const isMobile = useIsMobile();
    const [sending, setSending] = React.useState(false);
    const client = useClient();
    const form = useForm();

    let firstName = useField<string>(
        'input.firstName',
        (props.initialProfileFormData && props.initialProfileFormData.firstName) || '',
        form,
    );
    let lastName = useField<string>(
        'input.lastName',
        (props.initialProfileFormData && props.initialProfileFormData.lastName) || '',
        form,
    );
    let photoRef = useField<StoredFileT | null>(
        'input.photoRef',
        (props.initialProfileFormData && props.initialProfileFormData.photoRef) || null,
        form,
    );

    const doConfirm = React.useCallback(() => {
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

            setSending(true);

            if (props.initialProfileFormData) {
                await client.mutateProfileUpdate({
                    input: formData,
                });
            } else {
                await client.mutateProfileCreate({
                    input: formData,
                });
                await client.mutateBetaDiscoverSkip({ selectedTagsIds: [] });
            }
            await client.mutateCreateOrganization({
                input: {
                    personal: false,
                    name: firstName.value.trim(),
                },
            });

            await Promise.all([
                client.refetchProfile(),
                client.refetchProfilePrefill(),
                client.refetchAccount(),
            ]);
            trackEvent('registration_complete');
            if (signupRedirect) {
                createHistory({
                    forceRefresh: true,
                }).replace(signupRedirect);
            } else {
                createHistory({
                    forceRefresh: true,
                }).replace('/');
            }
        });
    }, [firstName.value, lastName.value, photoRef.value]);

    const [shakeClassName, shake] = useShake();
    const handleNext = React.useCallback(() => {
        if (firstName.input.value.trim() === '') {
            return shake();
        }
        doConfirm();
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

    const onBackClick = React.useCallback(async () => {
        client.mutateOnLogout().catch(e => console.error(e));
        window.location.href = '/';
    }, [client]);

    return (
        <FormLayout onBackClick={onBackClick}>
            <Title text="New account" />
            <Subtitle text="Introduce yourself" maxWidth={isMobile ? 230 : undefined} />
            <XView marginTop={32} marginBottom={16} alignSelf="center">
                <UAvatarUploadField field={photoRef} />
            </XView>

            <XView width={isSmallMobile ? '100%' : 320} alignSelf="center" marginBottom={16}>
                <AuthInputWrapper className={shakeClassName}>
                    <UInput
                        label="First name"
                        value={firstName.value}
                        flexGrow={1}
                        autofocus={true}
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
            <AuthActionButton
                loading={sending}
                text={InitTexts.auth.next}
                onClick={handleNext}
            />
        </FormLayout>
    );
};

const IntroduceYourselfPageInner = (props: EnterYourOrganizationPageProps) => {
    const client = useClient();
    const router = React.useContext(XRouterContext)!;

    if (canUseDOM) {
        localStorage.setItem('isnewuser', 'newuser');
    }

    const profile = client.useProfile();

    const initialProfileFormData = profile.profile
        ? {
            firstName: profile.profile.firstName,
            lastName: profile.profile.lastName,
            photoRef: profile.profile.photoRef,
        }
        : null;

    return (
        <Wrapper>
            <XDocumentHead title="New account" />
            <AuthHeaderConfig
                onBack={() => {
                    router.replace('/auth/logout');
                }}
                mobileTransparent={true}
            />
            <CreateProfileFormInnerWeb initialProfileFormData={initialProfileFormData} {...props} />
        </Wrapper>
    );
};

export const IntroduceYourselfPage = (props: EnterYourOrganizationPageProps) => {
    return (
        <React.Suspense fallback={null}>
            <IntroduceYourselfPageInner {...props} />
        </React.Suspense>
    );
};
