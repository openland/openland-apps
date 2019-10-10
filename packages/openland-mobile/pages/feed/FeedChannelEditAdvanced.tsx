import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { useClient } from 'openland-mobile/utils/useClient';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { KeyboardAvoidingScrollView } from 'openland-mobile/components/KeyboardAvoidingScrollView';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { SUPER_ADMIN } from '../Init';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { View, Text } from 'react-native';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZAvatarPicker } from 'openland-mobile/components/ZAvatarPicker';
import { ZSocialPickerRender } from 'openland-mobile/components/ZSocialPickerRender';

const FeedChannelEditAdvancedComponent = React.memo((props: PageProps) => {
    const { router } = props;
    const { id } = router.params;
    const client = useClient();
    const theme = React.useContext(ThemeContext);

    const channel = client.useFeedChannel({ id }, { fetchPolicy: 'network-only' }).channel;

    const form = useForm();
    const socialImageField = useField('socialImageRef', channel.socialImage ? { uuid: channel.socialImage } : null, form);
    const globalField = useField('global', channel.isGlobal, form);

    const handleSave = () => {
        form.doAction(async () => {
            await client.mutateFeedChannelUpdate({
                id,
                title: channel.title,

                ...SUPER_ADMIN && { global: globalField.value },
                ...(
                    socialImageField.value &&
                    socialImageField.value.uuid !== channel.socialImage &&
                    { socialImageRef: socialImageField.value }
                )
            });

            await client.refetchFeedChannel({ id });

            router.back();
        });
    };

    return (
        <>
            <SHeader title="Advanced settings" />
            <SHeaderButton title="Save" onPress={handleSave} />
            <KeyboardAvoidingScrollView>
                <View style={{ paddingHorizontal: 16, marginTop: 27 }}>
                    <Text style={{ ...TextStyles.Title2, marginBottom: 11, color: theme.foregroundPrimary }}>Social sharing image</Text>
                    <Text style={{ ...TextStyles.Body, marginBottom: 24, color: theme.foregroundPrimary }}>Choose an image to display when sharing invite to the group on social networks</Text>
                    <ZAvatarPicker field={socialImageField} render={ZSocialPickerRender} pickSize={{ width: 1200, height: 630 }} />
                </View>

                {SUPER_ADMIN && (
                    <ZListGroup header="Superadmin">
                        <ZListItem
                            text="Auto-subscribe all"
                            onToggle={globalField.input.onChange}
                            toggle={globalField.value}
                        />
                    </ZListGroup>
                )}
            </KeyboardAvoidingScrollView>
        </>
    );
});

export const FeedChannelEditAdvanced = withApp(FeedChannelEditAdvancedComponent, { navigationAppearance: 'small' });
