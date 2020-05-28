import * as React from 'react';
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
import * as Cookie from 'js-cookie';
import { Wrapper } from '../onboarding/components/wrapper';
import {
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
import { ResolvedInvite } from 'openland-api/spacex.types';
import { trackEvent } from 'openland-x-analytics';

const captionText = css`
    color: var(--foregroundTertiary);
    text-align: center;
    margin-top: 32px;
`;

const captionLink = css`
    font-weight: 600;
    color: var(--foregroundTertiary);

    &:hover {
        color: var(--foregroundTertiary);
    }
`;

type ProfileFormData = {
    firstName: string | null;
    lastName: string | null;
    photoRef: StoredFileT | null;
};

type EnterYourOrganizationPageProps = {
    initialProfileFormData?: ProfileFormData | null;
};

const CreateProfileFormInnerWeb = (props: EnterYourOrganizationPageProps & { prefill: any }) => {
    const isMobile = useIsMobile();
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

            const inviteKey =
                Cookie.get('x-openland-invite') || Cookie.get('x-openland-app-invite');

            if (props.initialProfileFormData) {
                await client.mutateProfileUpdate({
                    input: formData,
                    inviteKey,
                });
            } else {
                await client.mutateProfileCreate({
                    input: formData,
                    inviteKey,
                });
            }
            await client.mutateCreateOrganization({
                input: {
                    personal: false,
                    name: firstName.value.trim(),
                },
            });

            let inviteInfo: ResolvedInvite | undefined;
            let isPremium = false;
            if (inviteKey) {
                inviteInfo = await client.queryResolvedInvite({ key: inviteKey });
                if (inviteInfo.invite?.__typename === 'RoomInvite') {
                    isPremium = inviteInfo.invite.room.isPremium;
                }
                if (!isPremium) {
                    await client.mutateRoomJoinInviteLink({
                        invite: inviteKey,
                    });
                }
            }
            await client.refetchProfile();
            await client.refetchProfilePrefill();
            await client.refetchAccount();
            trackEvent('registration_complete');
            if (isPremium) {
                window.location.href = `/invite/${inviteKey}`;
            } else {
                window.location.href = '/';
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

    return (
        <FormLayout>
            <Title text="New account" />
            <Subtitle text="Introduce yourself" maxWidth={isMobile ? 230 : undefined} />
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
                text={InitTexts.create_profile.next}
                onClick={handleNext}
            />
            <p className={cx(TextCaption, captionText, textClassName)}>
                By creating an account you are accepting our{' '}
                <ULink path="/terms" className={captionLink}>
                    Terms&nbsp;of&nbsp;service
                </ULink>{' '}
                and{' '}
                <ULink path="/privacy" className={captionLink}>
                    Privacy&nbsp;policy
                </ULink>
            </p>
        </FormLayout>
    );
};

const IntroduceYourselfPageInner = (props: EnterYourOrganizationPageProps) => {
    const client = useClient();
    let router = React.useContext(XRouterContext)!;

    if (canUseDOM) {
        localStorage.setItem('isnewuser', 'newuser');
    }

    const profile = client.useProfile();
    const data = client.useProfilePrefill();

    let usePhotoPrefill =
        Cookie.get('auth-type') !== 'email' && Cookie.get('auth-type') !== 'phone';
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
            <XDocumentHead title="New account" />
            <AuthHeaderConfig
                onBack={() => {
                    router.replace('/auth/logout');
                }}
                mobileTransparent={true}
            />
            <CreateProfileFormInnerWeb
                prefill={prefill}
                initialProfileFormData={initialProfileFormData}
                {...props}
            />
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
