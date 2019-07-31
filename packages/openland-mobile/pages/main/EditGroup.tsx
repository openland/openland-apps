import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZInput } from 'openland-mobile/components/ZInput';
import { ZAvatarPicker } from 'openland-mobile/components/ZAvatarPicker';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';
import { useField } from 'openland-form/useField';
import { useForm } from 'openland-form/useForm';
import { SScrollView } from 'react-native-s/SScrollView';

const EditGroupComponent = XMemo<PageProps>((props) => {
    const client = getClient();
    const group = client.useRoom({ id: props.router.params.id }, { fetchPolicy: 'network-only' }).room;
    
    if (!group || group.__typename !== 'SharedRoom') {
        return null;
    }
    
    const form = useForm();

    const titleField = useField('title', group.title, form);
    const descriptionField = useField('description', group.description || '', form);

    const currentPhoto = group.photo.startsWith('ph://') ? undefined : group.photo;
    const defaultPhotoValue = group.photo.startsWith('ph://') ? null : { uuid: group.photo };
    const photoField = useField('photoRef', defaultPhotoValue, form);

    const handleSave = () => 
        form.doAction(async () => {
            try {
                const variables = {
                    roomId: props.router.params.id,
                    input: {
                        title: titleField.value,
                        description: descriptionField.value,
                        ...(
                            photoField.value && 
                            photoField.value.uuid !== currentPhoto && 
                            { photoRef: photoField.value }
                        )
                    }
                };

                await client.mutateRoomUpdate(variables);
                await client.refetchRoom({ id: props.router.params.id });

                props.router.back();
            } catch (e) {
                console.warn('error', e);
                props.router.back();
            }
        });

    return (
        <>
            <SHeader title="Edit group info" />
            <SHeaderButton title="Save" onPress={handleSave} />
            <SScrollView>
                <ZListItemGroup header={null} alignItems="center">
                    <ZAvatarPicker size="xx-large" field={photoField} />
                </ZListItemGroup>
                <ZListItemGroup header="Info" headerMarginTop={0}>
                    <ZInput
                        placeholder="Group name"
                        field={titleField}
                    />
                    <ZInput
                        field={descriptionField}
                        placeholder="Description"
                        multiline={true}
                    />
                </ZListItemGroup>
            </SScrollView>
        </>
    );
});

export const EditGroup = withApp(EditGroupComponent, { navigationAppearance: 'small' });
