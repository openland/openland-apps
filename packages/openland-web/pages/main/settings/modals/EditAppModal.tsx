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

const { App } = TextProfiles;

export const EditAppModal = withAppProfile(({ updateApp, apps, router: { query } }) => {
    let [app] = apps.filter((a: AppFull) => a.id === query.editApp || '');

    if (!app) {
        return null;
    }

    const { name, shortname, photoRef, about } = app;

    return (
        <XModalForm
            title={App.edit}
            targetQuery="editApp"
            defaultData={{
                input: {
                    name,
                    shortname,
                    about,
                    photoRef: sanitizeImageRef(photoRef),
                },
            }}
            defaultAction={async ({ input }) => {
                await updateApp({
                    variables: {
                        appId: app.id,
                        input: {
                            name: input.name,
                            shortname:
                                input.shortname === ''
                                    ? null
                                    : input.shortname === shortname
                                    ? undefined
                                    : input.shortname,
                            photoRef: input.photoRef,
                            about: input.about,
                        },
                    },
                });
            }}
        >
            <XView flexDirection="row" marginBottom={16}>
                <XAvatarUpload field="input.photoRef" size="small" />

                <XView flexGrow={1} paddingLeft={16}>
                    <XVertical>
                        <XInput field="input.name" size="large" title={App.inputs.name} />
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
}) as React.ComponentType<{
    apps: AppFull[];
}>;
