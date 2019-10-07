import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { useClient } from 'openland-mobile/utils/useClient';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import AlertBlanket from 'openland-mobile/components/AlertBlanket';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { KeyboardAvoidingScrollView } from 'openland-mobile/components/KeyboardAvoidingScrollView';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { ZAvatarPicker } from 'openland-mobile/components/ZAvatarPicker';
import { ZInput } from 'openland-mobile/components/ZInput';
import { ZPickField } from 'openland-mobile/components/ZPickField';

const FeedChannelEditComponent = React.memo((props: PageProps) => {
    const { router } = props;
    const { id } = router.params;
    const client = useClient();

    const channel = client.useFeedChannel({ id }, { fetchPolicy: 'network-only' }).channel;

    const form = useForm();
    const titleField = useField('title', channel.title, form);
    const aboutField = useField('about', channel.about || '', form);

    const currentPhoto = channel.photo === null ? undefined : channel.photo;
    const defaultPhotoValue = channel.photo === null ? null : { uuid: channel.photo };
    const photoField = useField('photoRef', defaultPhotoValue, form);

    const handleSave = () => {
        if (titleField.value === '') {
            AlertBlanket.builder().title(`Please enter a name for this channel`).button('GOT IT!').show();
            return;
        }

        form.doAction(async () => {
            await client.mutateFeedChannelUpdate({
                id,
                title: titleField.value,
                about: aboutField.value,

                ...(
                    photoField.value &&
                    photoField.value.uuid !== currentPhoto &&
                    { photoRef: photoField.value }
                )
            });

            router.back();
        });
    };

    return (
        <>
            <SHeader title="Edit channel" />
            <SHeaderButton title="Save" onPress={handleSave} />
            <KeyboardAvoidingScrollView>
                <ZListGroup header={null} alignItems="center">
                    <ZAvatarPicker size="xx-large" field={photoField} />
                </ZListGroup>
                <ZListGroup header={null}>
                    <ZInput
                        placeholder="Name"
                        field={titleField}
                        autoFocus={true}
                    />
                    <ZInput
                        placeholder="About"
                        field={aboutField}
                        multiline={true}
                    />
                </ZListGroup>
                <ZListGroup header="Shortname" headerMarginTop={0}>
                    <ZPickField
                        label="Shortname"
                        // value={profile.shortname ? '@' + profile.shortname : undefined}
                        path="SetChannelShortname"
                        pathParams={{ id }}
                    />
                </ZListGroup>
            </KeyboardAvoidingScrollView>
        </>
    );
});

export const FeedChannelEdit = withApp(FeedChannelEditComponent, { navigationAppearance: 'small' });
