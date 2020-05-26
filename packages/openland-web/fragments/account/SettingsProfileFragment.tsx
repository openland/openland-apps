import * as React from 'react';
import { css, cx } from 'linaria';
import { TextBody } from 'openland-web/utils/TextStyles';
import { useForm } from 'openland-form/useForm';
import { useClient } from 'openland-api/useClient';
import { useField } from 'openland-form/useField';
import { XView } from 'react-mental';
import { USelectField } from 'openland-web/components/unicorn/USelect';
import { sanitizeImageRef } from 'openland-y-utils/sanitizeImageRef';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { StoredFileT, UAvatarUploadField } from 'openland-web/components/unicorn/UAvatarUpload';
import { UInput, UInputField } from 'openland-web/components/unicorn/UInput';
import { UTextAreaField } from 'openland-web/components/unicorn/UTextArea';
import { FormSection } from './components/FormSection';
import { FormWrapper } from './components/FormWrapper';
import { FormFooter } from './components/FormFooter';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { AppConfig } from 'openland-y-runtime/AppConfig';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { XModalContent } from 'openland-web/components/XModalContent';

const modalSubtitle = css`
    color: var(--foregroundPrimary);
    margin-bottom: 20px;
    white-space: pre-wrap;
    word-wrap: break-word;
    max-width: 320px;
`;

const PairPhoneModalContent = React.memo((props: { phone: string; hide: () => void }) => {
    const [confirmState, setConfirmState] = React.useState(false);
    const [validCode, setValidCode] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [sessionState, setSessionState] = React.useState<null | string>(null);
    const client = useClient();

    const userPhoneParse = props.phone.match(/\d/g);
    const userPhone = userPhoneParse && userPhoneParse.join('');

    const handleConfirm = async () => {
        setConfirmState(true);
        const data = await client.mutateSendPhonePairCode({ phone: `+${userPhone}` });
        setSessionState(data.sendPhonePairCode);
    };

    const handleSave = async () => {
        if (sessionState) {
            setLoading(true);
            await client.mutatePairPhone({
                sessionId: sessionState,
                confirmationCode: validCode
            });
            await client.refetchProfile();
            setLoading(false);
            props.hide();
        }
    };

    const subtitleText = !confirmState
        ? `Are you sure you want to pair this phone +${userPhone} ?`
        : 'Enter confirm code';

    return (
        <>
            <XModalContent>
                <div className={cx(modalSubtitle, TextBody)}>{subtitleText}</div>
                {confirmState && <UInput type="number" label="Code" value={validCode} onChange={setValidCode} />}
            </XModalContent>
            <XModalFooter>
                <UButton text="Cancel" style="tertiary" size="large" onClick={() => props.hide()} />
                <UButton
                    text={confirmState ? 'Save' : 'Pair'}
                    style="primary"
                    size="large"
                    onClick={confirmState ? handleSave : handleConfirm}
                    loading={loading}
                />
            </XModalFooter>
        </>
    );
});

const showPairPhoneModal = (phone: string) => {
    showModalBox(
        {
            width: 400,
            title: 'Pair phone',
        },
        (ctx) => <PairPhoneModalContent phone={phone} hide={ctx.hide} />,
    );
};

export const SettingsProfileFragment = React.memo(() => {
    const form = useForm();
    const client = useClient();
    const layout = useLayout();
    const shortnameMinLength = AppConfig.isSuperAdmin() ? 3 : 5;
    const shortnameMaxLength = 16;

    const { profile, user } = client.useProfile();
    const { phone } = client.useAuthPoints().authPoints;

    const organizations = client.useMyOrganizations();

    if (!user || !profile) {
        return null;
    }

    const firstNameField = useField('input.firstName', profile.firstName || '', form, [
        {
            checkIsValid: (value) => !!value && value.length > 0,
            text: 'Please enter your name',
        },
    ]);
    const lastNameField = useField('input.lastName', profile.lastName || '', form);
    const avatarField = useField<StoredFileT | undefined | null>(
        'input.avatar',
        sanitizeImageRef(profile.photoRef),
        form,
    );
    const primaryOrganizationField = useField(
        'input.primaryOrganization',
        profile.primaryOrganization && profile.primaryOrganization.id,
        form,
    );

    const aboutField = useField('input.about', profile.about || '', form);
    const locationField = useField('input.location', profile.location || '', form);
    const usernameField = useField('input.username', user.shortname || '', form, [
        {
            checkIsValid: (value) =>
                !!value && value.length > 0 ? value.length >= shortnameMinLength : true,
            text: 'Username must have at least ' + shortnameMinLength + ' characters.',
        },
        {
            checkIsValid: (value) =>
                !!value && value.length > 0 ? value.length < shortnameMaxLength : true,
            text: 'Username must have no more than ' + shortnameMaxLength + ' characters.',
        },
        {
            checkIsValid: (value) =>
                !!value && value.length > 0 ? !!value.match('^[a-z0-9_]+$') : true,
            text: 'A username can only contain a-z, 0-9, and underscores.',
        },
    ]);
    const phoneNumberField = useField('input.phoneNumber', profile.phone || '', form);
    const emailField = useField('input.email', profile.email || '', form);
    const websiteField = useField('input.website', profile.website || '', form);
    const linkedinField = useField('input.linkedin', profile.linkedin || '', form);
    const instagramField = useField('input.instagram', profile.instagram || '', form);
    const twitterField = useField('input.twitter', profile.twitter || '', form);
    const facebookField = useField('input.facebook', profile.facebook || '', form);

    const doConfirm = () => {
        form.doAction(async () => {
            await client.mutateProfileUpdate({
                input: {
                    firstName: firstNameField.value,
                    lastName: lastNameField.value,
                    primaryOrganization: primaryOrganizationField.value,
                    about: aboutField.value,
                    photoRef: sanitizeImageRef(avatarField.value),
                    email: emailField.value,
                    website: websiteField.value,
                    linkedin: linkedinField.value,
                    instagram: instagramField.value,
                    phone: phoneNumberField.value,
                    location: locationField.value,
                    twitter: twitterField.value,
                    facebook: facebookField.value,
                },
            });

            if (user.shortname !== usernameField.value) {
                await client.mutateSetUserShortname({
                    shortname: usernameField.value,
                });
            }

            await client.refetchAccount();
            await client.refetchMyOrganizations();
        });
    };

    const organizationsWithoutCommunity = organizations.myOrganizations.filter(
        (i) => !i.isCommunity,
    );

    // Temp && ugly fix for users with community as primary organizations
    if (
        profile.primaryOrganization &&
        organizationsWithoutCommunity.filter((i) => i.id === profile.primaryOrganization!.id)
            .length <= 0
    ) {
        organizationsWithoutCommunity.unshift(profile.primaryOrganization as any);
    }

    const avatarUploadComponent = (
        <XView>
            <UAvatarUploadField field={avatarField} />
        </XView>
    );

    return (
        <Page track="user_profile_edit">
            <UHeader title="Profile" maxWidth={550} />
            <FormWrapper>
                <XView flexDirection="row" flexGrow={1}>
                    <XView flexGrow={1} flexShrink={1}>
                        {layout === 'mobile' && (
                            <XView alignItems="center">{avatarUploadComponent}</XView>
                        )}
                        <FormSection title="Info">
                            <XView marginBottom={16}>
                                <UInputField label="First name" field={firstNameField} />
                            </XView>
                            <XView marginBottom={16}>
                                <UInputField label="Last name" field={lastNameField} />
                            </XView>
                            <XView marginBottom={16}>
                                <USelectField
                                    field={primaryOrganizationField}
                                    label="Primary organization"
                                    options={organizationsWithoutCommunity.map((org: any) => ({
                                        value: org.id,
                                        label: org.name,
                                    }))}
                                />
                            </XView>
                            <XView marginBottom={16}>
                                <UTextAreaField
                                    placeholder="About"
                                    field={aboutField}
                                    resize={false}
                                />
                            </XView>
                            <UInputField label="Location" field={locationField} />
                        </FormSection>
                        <FormSection title="Username">
                            <UInputField
                                label="Username"
                                field={usernameField}
                                invalid={!!form.error}
                                errorText={form.error}
                            />
                        </FormSection>
                        <FormSection title="Contacts">
                            <XView marginBottom={16}>
                                <UInputField
                                    prefix="+"
                                    label="Phone number"
                                    field={phoneNumberField}
                                />
                                {!phone && !!phoneNumberField.value.trim() && (
                                    <XView
                                        fontSize={15}
                                        color="#248BF2"
                                        marginLeft={16}
                                        marginTop={8}
                                        cursor="pointer"
                                        alignSelf="flex-start"
                                        onClick={() => showPairPhoneModal(phoneNumberField.value)}
                                    >
                                        Pair this phone
                                    </XView>
                                )}
                            </XView>
                            <XView marginBottom={16}>
                                <UInputField label="Email" field={emailField} />
                            </XView>
                            <XView marginBottom={16}>
                                <UInputField label="Website" field={websiteField} />
                            </XView>
                            <XView marginBottom={16}>
                                <UInputField label="Instagram" field={instagramField} />
                            </XView>
                            <XView marginBottom={16}>
                                <UInputField label="Twitter" field={twitterField} />
                            </XView>
                            <XView marginBottom={16}>
                                <UInputField label="Facebook" field={facebookField} />
                            </XView>
                            <UInputField label="LinkedIn" field={linkedinField} />
                        </FormSection>
                        <FormFooter>
                            <UButton
                                text="Save changes"
                                size="large"
                                alignSelf="flex-start"
                                onClick={doConfirm}
                                loading={form.loading}
                            />
                        </FormFooter>
                    </XView>
                    {layout === 'desktop' && (
                        <XView marginLeft={16} marginTop={48}>
                            {avatarUploadComponent}
                        </XView>
                    )}
                </XView>
            </FormWrapper>
        </Page>
    );
});
