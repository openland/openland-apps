import * as React from 'react';
import { XView } from 'react-mental';
import { withAppProfile } from 'openland-web/api/withAppProfile';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { XVertical } from 'openland-x-layout/XVertical';
import { XInput } from 'openland-x/XInput';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XTextArea } from 'openland-x/XTextArea';
import { TextProfiles } from 'openland-text/TextProfiles';

export const CreateAppModal = withAppProfile(props => {
    return (
        <XModalForm
            useTopCloser={true}
            submitBtnText="Create"
            title={TextProfiles.App.create}
            targetQuery="createApp"
            defaultAction={async data => {
                await props.createApp({
                    variables: {
                        name: data.input.name,
                        shortname: data.input.shortname,
                        photoRef: data.input.photoRef,
                        about: data.input.about,
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
                            title={TextProfiles.App.inputs.name}
                            autofocus={true}
                        />
                        <XInput
                            field="input.shortname"
                            size="large"
                            title={TextProfiles.App.inputs.shortname}
                        />
                    </XVertical>
                </XView>
            </XView>

            <XTextArea
                valueStoreKey="fields.input.about"
                placeholder={TextProfiles.App.inputs.about}
                resize={false}
            />
        </XModalForm>
    );
});
