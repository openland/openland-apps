import * as React from 'react';
import { XView } from 'react-mental';
import { withAppProfile } from 'openland-web/api/withAppProfile';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { XVertical } from 'openland-x-layout/XVertical';
import { XInput } from 'openland-x/XInput';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XTextArea } from 'openland-x/XTextArea';
import { TextProfiles } from 'openland-text/TextProfiles';

const { App } = TextProfiles;

export const CreateAppModal = withAppProfile(({ createApp }) => {
    return (
        <XModalForm
            useTopCloser={true}
            submitBtnText="Create"
            title={App.create}
            targetQuery="createApp"
            defaultAction={async ({ input: { name, shortname, photoRef, about } }) => {
                await createApp({
                    variables: {
                        name,
                        shortname,
                        photoRef,
                        about,
                    },
                });
            }}
            defaultData={{
                input: {
                    name: '',
                    shortname: '',
                    photoRef: null,
                    about: '',
                },
            }}
        >
            <XView flexDirection="row" marginBottom={16}>
                <XAvatarUpload field="input.photoRef" size="small" />

                <XView flexGrow={1} paddingLeft={16}>
                    <XVertical>
                        <XInput
                            field="input.name"
                            size="large"
                            title={App.inputs.name}
                            autofocus={true}
                        />
                        <XInput field="input.shortname" size="large" title={App.inputs.shortname} />
                    </XVertical>
                </XView>
            </XView>

            <XTextArea
                valueStoreKey="fields.input.about"
                placeholder={App.inputs.about}
                resize={false}
            />
        </XModalForm>
    );
});
