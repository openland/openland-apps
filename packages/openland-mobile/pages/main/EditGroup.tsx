import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZInput } from 'openland-mobile/components/ZInput';
import { ZAvatarPicker } from 'openland-mobile/components/ZAvatarPicker';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { useField } from 'openland-form/useField';
import { useForm } from 'openland-form/useForm';
import { KeyboardAvoidingScrollView } from 'openland-mobile/components/KeyboardAvoidingScrollView';
import { SharedRoomKind } from 'openland-api/spacex.types';
import { useShortnameField } from 'openland-y-utils/form/useShortnameField';

const EditGroupComponent = XMemo<PageProps>((props) => {
    const client = getClient();
    const group = client.useRoomWithoutMembers({ id: props.router.params.id }, { fetchPolicy: 'network-only' }).room;

    if (!group || group.__typename !== 'SharedRoom') {
        return null;
    }

    const typeString = group.isChannel ? 'channel' : 'group';
    const hasShortname = group.kind === SharedRoomKind.PUBLIC;
    const form = useForm();

    const titleField = useField('title', group.title, form);
    const descriptionField = useField('description', group.description || '', form);
    const initialShortname = group.shortname || '';
    const shortnameField = useShortnameField('shortname', initialShortname, form);

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
                const shortnameData = {
                    id: props.router.params.id,
                    shortname: shortnameField.value,
                };
                const promises: Promise<any>[] = [client.mutateRoomUpdate(variables)];
                if (hasShortname && shortnameField.value !== initialShortname) {
                    promises.push(client.mutateSetRoomShortname(shortnameData));
                }
                
                await Promise.all(promises);
                await client.refetchRoomWithoutMembers({ id: props.router.params.id });

                props.router.back();
            } catch (e) {
                console.warn('error', e);
                props.router.back();
            }
        });

    return (
        <>
            <SHeader title={`Edit ${typeString}`} />
            <SHeaderButton title="Save" onPress={handleSave} />
            <KeyboardAvoidingScrollView>
                <ZListGroup header={null} alignItems="center">
                    <ZAvatarPicker size="xx-large" field={photoField} />
                </ZListGroup>
                <ZListGroup header="Info" headerMarginTop={0}>
                    <ZInput
                        placeholder="Name"
                        field={titleField}
                    />
                    <ZInput
                        field={descriptionField}
                        placeholder="Description"
                        multiline={true}
                    />
                    {hasShortname && (
                        <ZInput
                            placeholder="Shortname"
                            field={shortnameField}
                        />
                    )}
                </ZListGroup>
            </KeyboardAvoidingScrollView>
        </>
    );
});

export const EditGroup = withApp(EditGroupComponent, { navigationAppearance: 'small' });
