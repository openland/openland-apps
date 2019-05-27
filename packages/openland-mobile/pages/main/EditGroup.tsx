import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { ZForm } from '../../components/ZForm';
import { View } from 'react-native';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZAvatarPickerInputsGroup } from 'openland-mobile/components/ZAvatarPickerInputsGroup';
import { ZTextInput } from 'openland-mobile/components/ZTextInput';

const EditGroupComponent = XMemo<PageProps>((props) => {
    let ref = React.useRef<ZForm | null>(null);
    let group = getClient().useRoom({ id: props.router.params.id }, { fetchPolicy: 'network-only' }).room;

    if (group && group.__typename === 'SharedRoom') {
        let currentPhoto = group.photo.startsWith('ph://') ? undefined : group.photo;

        return (
            <>
                <SHeader title="Edit group info" />
                <SHeaderButton title="Save" onPress={() => { ref.current!.submitForm(); }} />
                <ZForm
                    ref={ref}
                    action={async src => {
                        let client = getClient();

                        if (src.input.photoRef && src.input.photoRef.uuid === currentPhoto) {
                            src.input.photoRef = undefined;
                        }

                        await client.mutateRoomUpdate(src);

                        await client.refetchRoom({ id: props.router.params.id });
                    }}
                    defaultData={{
                        input: {
                            title: group.title,
                            photoRef: group.photo.startsWith('ph://') ? undefined : {
                                uuid: group.photo
                            },
                            description: group.description,
                        },
                    }}
                    staticData={{
                        roomId: props.router.params.id,
                    }}
                    onSuccess={() => {
                        props.router.back();
                    }}
                >
                    <ZAvatarPickerInputsGroup avatarField="input.photoRef">
                        <ZTextInput
                            placeholder="Group name"
                            field="input.title"
                            autoFocus={true}
                        />
                    </ZAvatarPickerInputsGroup>
                    <View height={20} />
                    <ZTextInput
                        field="input.description"
                        placeholder="What is this group about?"
                        multiline={true}
                    />
                </ZForm>
            </>
        )
    } else {
        return null;
    }
});

export const EditGroup = withApp(EditGroupComponent, { navigationAppearance: 'small' });
