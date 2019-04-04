import * as React from 'react';
import { withApp } from 'openland-web/components/withApp';
import { XView } from 'react-mental';
import { XAppCard } from 'openland-x/cards/XAppCard';
import { XCreateCard } from 'openland-x/cards/XCreateCard';
import { XMenuItem } from 'openland-x/XMenuItem';
import { CreateAppModal } from 'openland-web/pages/main/settings/modals/CreateAppModal';
import { AddBotToChat } from 'openland-web/pages/main/settings/modals/AddBotToChat';
import { EditAppModal } from 'openland-web/pages/main/settings/modals/EditAppModal';
import { TextProfiles } from 'openland-text/TextProfiles';
import { SettingsNavigation } from './components/SettingsNavigation';
import { Content } from './components/SettingComponents';
import { useClient } from 'openland-web/utils/useClient';
import { XLoader } from 'openland-x/XLoader';

const { App } = TextProfiles;

export default withApp('My Apps', 'feature-non-production', () => {
    const client = useClient();
    const data = client.useWithoutLoaderMyApps();
    if (!data) {
        return <XLoader loading={true} />;
    }

    return (
        <SettingsNavigation title="My Apps">
            <Content>
                <XView fontSize={18} fontWeight="600" color="#000000" marginBottom={20}>
                    My Apps
                </XView>

                <XCreateCard
                    query={{
                        field: 'createApp',
                        value: 'true',
                    }}
                    text={App.create}
                />

                {data.apps.map(app => (
                    <XAppCard
                        key={'app_' + app.id}
                        app={app}
                        extraMenu={
                            <>
                                <XMenuItem
                                    query={{
                                        field: 'editApp',
                                        value: app.id,
                                    }}
                                >
                                    {App.edit}
                                </XMenuItem>
                                <XMenuItem
                                    query={{
                                        field: 'addBotToChat',
                                        value: app.id,
                                    }}
                                >
                                    {App.addBotToChat}
                                </XMenuItem>
                            </>
                        }
                    />
                ))}
            </Content>

            <CreateAppModal />
            <AddBotToChat apps={data.apps} />
            <EditAppModal apps={data.apps} />
        </SettingsNavigation>
    );
});
