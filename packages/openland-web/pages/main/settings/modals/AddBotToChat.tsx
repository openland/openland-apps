import * as React from 'react';
import { XView } from 'react-mental';
import { withAppProfile } from 'openland-web/api/withAppProfile';
import { AppFull } from 'openland-api/Types';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { XInput } from 'openland-x/XInput';
import { TextProfiles } from 'openland-text/TextProfiles';
import { DirectoryContent } from 'openland-web/pages/main/directory/components/DirectoryNavigation';
import { RoomsWithSort } from 'openland-web/fragments/RoomsExploreComponent';

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
            <XView flexDirection="column">
                <XInput field="input.name" size="large" title={App.inputs.name} />
                <DirectoryContent
                    CardsComponent={RoomsWithSort}
                    searchPlaceholder={'Search rooms'}
                    noQueryText={'Featured rooms'}
                    hasQueryText={'Rooms'}
                    sortOptions={{
                        label: 'Sort by',
                        values: [
                            { label: 'Members count', value: 'membersCount' },
                            { label: 'Creation date', value: 'createdAt' },
                        ],
                    }}
                />
            </XView>
        </XModalForm>
    );
}) as React.ComponentType<{
    apps: AppFull[];
}>;
