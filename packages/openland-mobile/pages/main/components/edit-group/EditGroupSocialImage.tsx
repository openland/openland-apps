import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { useField } from 'openland-form/useField';
import { useForm } from 'openland-form/useForm';
import { SScrollView } from 'react-native-s/SScrollView';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZAvatarPicker } from 'openland-mobile/components/ZAvatarPicker';
import { ZSocialPickerRender } from 'openland-mobile/components/ZSocialPickerRender';
import { EditPageHeader } from '../EditPageHeader';
import { useText } from 'openland-mobile/text/useText';

const EditGroupSocialImageComponent = React.memo((props: PageProps) => {
    const theme = React.useContext(ThemeContext);
    const client = getClient();
    const { t } = useText();
    const group = client.useRoomChat(
        { id: props.router.params.id },
        { fetchPolicy: 'network-only' },
    ).room;

    if (!group || group.__typename !== 'SharedRoom') {
        return null;
    }

    const form = useForm();

    const socialImageField = useField(
        'socialImageRef',
        group.socialImage ? { uuid: group.socialImage } : null,
        form,
    );

    const handleSave = () =>
        form.doAction(async () => {
            try {
                if (socialImageField.value && socialImageField.value.uuid !== group.socialImage) {
                    await client.mutateRoomUpdate({
                        roomId: props.router.params.id,
                        input: {
                            socialImageRef: socialImageField.value,
                        },
                    });
                }
                if (!socialImageField.value) {
                    await client.mutateRoomUpdate({
                        roomId: props.router.params.id,
                        input: {
                            socialImageRef: null,
                        },
                    });
                }
                await client.refetchRoomChat({ id: props.router.params.id });

                props.router.back();
            } catch (e) {
                console.warn('error', e);
                props.router.back();
            }
        });

    return (
        <>
            <SHeaderButton title={t('save', 'Save')} onPress={handleSave} />
            <SScrollView>
                <EditPageHeader
                    icon={require('assets/ic-gallery-glyph-48.png')}
                    tint={theme.tintGreen}
                    title={t('socialSharingImage', 'Social sharing image')}
                    description={t('socialSharingImageDescription', 'Choose an image for sharing invite to the group on social networks')}
                />
                <ZListGroup header={null} alignItems="center">
                    <ZAvatarPicker
                        id={props.router.params.id}
                        field={socialImageField}
                        render={ZSocialPickerRender}
                        pickSize={{ width: 1200, height: 630 }}
                        fullWidth={true}
                        hidePhotoIndicator={true}
                        clearable={true}
                    />
                </ZListGroup>
            </SScrollView>
        </>
    );
});

export const EditGroupSocialImage = withApp(EditGroupSocialImageComponent, {
    navigationAppearance: 'small',
});
