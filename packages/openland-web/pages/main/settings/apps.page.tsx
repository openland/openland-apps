import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { withQueryLoader } from '../../../components/withQueryLoader';
import { withMyApps } from 'openland-web/api/withMyApps';
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

const { App } = TextProfiles;

export default withApp(
    'My Apps',
    'feature-non-production',
    withMyApps(
        withQueryLoader(({ data: { apps } }) => (
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

                    {apps.map(app => (
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
                <AddBotToChat apps={apps} />
                <EditAppModal apps={apps} />
            </SettingsNavigation>
        )),
    ),
);
