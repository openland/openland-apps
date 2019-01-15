import * as React from 'react';
import { XView } from 'react-mental';
import { withAppProfile } from 'openland-web/api/withAppProfile';
import { AppFull } from 'openland-api/Types';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { sanitizeImageRef } from 'openland-y-utils/sanitizeImageRef';
import { XVertical } from 'openland-x-layout/XVertical';
import { XInput } from 'openland-x/XInput';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XTextArea } from 'openland-x/XTextArea';
import { TextProfiles } from 'openland-text/TextProfiles';

export const EditAppModal = withAppProfile(props => {
    let app = (props as any).apps.filter(
        (a: AppFull) => a.id === props.router.query.editApp || '',
    )[0];
    if (!app) {
        return null;
    }
    return (
        <XModalForm
            title={TextProfiles.App.edit}
            targetQuery="editApp"
            defaultData={{
                input: {
                    name: app.name,
                    shortname: app.shortname,
                    photoRef: sanitizeImageRef(app.photoRef),
                    about: app.about,
                },
            }}
            defaultAction={async data => {
                await props.updateApp({
                    variables: {
                        appId: app.id,
                        input: {
                            name: data.input.name,
                            shortname: data.input.shortname,
                            photoRef: data.input.photoRef,
                            about: data.input.about,
                        },
                    },
                });
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
}) as React.ComponentType<{
    apps: AppFull[];
}>;
