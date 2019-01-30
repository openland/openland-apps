import * as React from 'react';
import { XView } from 'react-mental';
import { withAppProfile } from 'openland-web/api/withAppProfile';
import { AppFull } from 'openland-api/Types';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { XInput } from 'openland-x/XInput';
import { TextProfiles } from 'openland-text/TextProfiles';

const { App } = TextProfiles;

export const AddBotToChat = withAppProfile(({ updateApp, apps, router: { query } }) => {
    let [app] = apps.filter((a: AppFull) => a.id === query.addBotToChat || '');

    if (!app) {
        return null;
    }

    const { name } = app;

    return (
        <XModalForm
            title={App.addBotToChat}
            targetQuery="addBotToChat"
            defaultData={{
                input: {
                    name,
                },
            }}
            defaultAction={async ({ input }) => {
                await updateApp({
                    variables: {
                        appId: app.id,
                        input: {
                            name: input.name,
                        },
                    },
                });
            }}
        >
            <XView flexDirection="row" marginBottom={16}>
                <XInput field="input.name" size="large" title={App.inputs.name} />
            </XView>
        </XModalForm>
    );
}) as React.ComponentType<{
    apps: AppFull[];
}>;
