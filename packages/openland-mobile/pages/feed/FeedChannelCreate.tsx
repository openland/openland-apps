import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { useClient } from 'openland-api/useClient';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import AlertBlanket from 'openland-mobile/components/AlertBlanket';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { KeyboardAvoidingScrollView } from 'openland-mobile/components/KeyboardAvoidingScrollView';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { ZAvatarPicker } from 'openland-mobile/components/ZAvatarPicker';
import { ZInput } from 'openland-mobile/components/ZInput';

const FeedChannelCreateComponent = React.memo((props: PageProps) => {
    const { action } = props.router.params;
    const client = useClient();
    const form = useForm();
    const photoField = useField('photoRef', null, form);
    const titleField = useField('title', '', form);
    const aboutField = useField('about', '', form);

    const handleSave = () => {
        if (titleField.value === '') {
            AlertBlanket.builder().title(`Please enter a name for this channel`).button('GOT IT!').show();
            return;
        }

        form.doAction(async () => {
            const channel = (await client.mutateFeedChannelCreate({
                title: titleField.value,
                photoRef: photoField.value,
                about: aboutField.value,
            })).channel;

            // await client.refetchFeedSubscriptions();

            if (action) {
                action(channel);

                props.router.back();
            } else {
                props.router.pushAndRemove('FeedChannel', { id: channel.id });
            }
        });
    };

    return (
        <>
            <SHeader title="New channel" />
            <SHeaderButton title="Create" onPress={handleSave} />
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
                        placeholder="Description"
                        field={aboutField}
                        multiline={true}
                    />
                </ZListGroup>
            </KeyboardAvoidingScrollView>
        </>
    );
});

export const FeedChannelCreate = withApp(FeedChannelCreateComponent, { navigationAppearance: 'small' });
