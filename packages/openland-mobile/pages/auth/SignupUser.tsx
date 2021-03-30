import * as React from 'react';
import { View } from 'react-native';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { next } from './signup';
import { ZAvatarPicker } from '../../components/ZAvatarPicker';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZInput } from 'openland-mobile/components/ZInput';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';
import { useField } from 'openland-form/useField';
import { useForm } from 'openland-form/useForm';
import { RegistrationContainer } from './RegistrationContainer';
import { ZButton } from 'openland-mobile/components/ZButton';
import { logout } from 'openland-mobile/utils/logout';
import { ZShaker } from 'openland-mobile/components/ZShaker';

const SignupUserComponent = React.memo((props: PageProps) => {
    const ref = React.useRef<{ shake: () => void }>(null);
    const prefill = getClient().useProfilePrefill().prefill;
    const profile = getClient().useProfile();
    const form = useForm({ disableAppLoader: true });
    const photoField = useField('photoRef', null, form);
    const firstNameField = useField('firstName', (prefill && prefill.firstName) || '', form);
    const lastNameField = useField('lastName', (prefill && prefill.lastName) || '', form);

    const initialProfileFormData = profile.profile
        ? {
            firstName: profile.profile.firstName,
            lastName: profile.profile.lastName,
            photoRef: profile.profile.photoRef,
        }
        : null;

    const handleSave = () => {
        const firstName = firstNameField.value.trim();
        if (!firstName) {
            if (ref && ref.current) {
                ref.current.shake();
            }
            return;
        }

        form.doAction(async () => {
            if (initialProfileFormData) {
                await getClient().mutateProfileUpdate({
                    input: {
                        firstName: firstName,
                        lastName: lastNameField.value.trim(),
                        photoRef: photoField.value
                    }
                });
            } else {
                await getClient().mutateProfileCreate({
                    input: {
                        firstName: firstName,
                        lastName: lastNameField.value.trim(),
                        photoRef: photoField.value
                    },
                });
            }
            await getClient().mutateCreateOrganization({
                input: {
                    name: firstName,
                    personal: false,
                    isCommunity: false,
                },
            });
            await Promise.all([
                getClient().mutateBetaDiscoverSkip({ selectedTagsIds: [] }),
                getClient().refetchAccount(),
            ]);
            await next(props.router);
        });
    };

    return (
        <ZTrack event="signup_profile_view">
            <RegistrationContainer
                title="Introduce yourself"
                subtitle="Help others recognize you"
                autoScrollToBottom={true}
                floatContent={
                    <ZButton
                        title="Save"
                        size="large"
                        onPress={handleSave}
                        loading={form.loading}
                    />
                }
            >
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <ZAvatarPicker
                        field={photoField}
                        initialUrl={(prefill && prefill.picture) || undefined}
                        size="xx-large"
                    />
                </View>
                <View style={{ marginTop: 16 }}>
                    <ZShaker ref={ref}>
                        <ZInput field={firstNameField} placeholder="First name" />
                    </ZShaker>
                    <ZInput
                        field={lastNameField}
                        placeholder="Last name"
                        description="Please, provide your name. This information is part of your public profile."
                    />
                </View>
            </RegistrationContainer>
        </ZTrack>
    );
});

export const SignupUser = withApp(SignupUserComponent, {
    navigationAppearance: 'small-hidden',
    backButtonRootFallback: logout,
});
