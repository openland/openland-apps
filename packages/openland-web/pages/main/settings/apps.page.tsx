import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { MainNavigation } from './Navigation';
import { withQueryLoader } from '../../../components/withQueryLoader';
import { withMyApps } from 'openland-web/api/withMyApps';
import { XView } from 'react-mental';
import { XAppCard } from 'openland-x/cards/XAppCard';
import { XCreateCard } from 'openland-x/cards/XCreateCard';
import { XMenuItem } from 'openland-x/XMenuItem';
import { CreateAppModal } from 'openland-web/components/apps/CreateAppModal';
import { EditAppModal } from 'openland-web/components/apps/EditAppModal';
import { TextProfiles } from 'openland-text/TextProfiles';

export default withApp(
    'My Apps',
    'feature-non-production',
    withMyApps(
        withQueryLoader(props => (
            <MainNavigation title="My Apps">
                <XView
                    paddingTop={20}
                    paddingBottom={20}
                    paddingLeft={30}
                    paddingRight={30}
                    flexGrow={1}
                >
                    <XView fontSize={18} fontWeight="600" color="#000000" marginBottom={20}>
                        My Apps
                    </XView>

                    <XCreateCard
                        query={{
                            field: 'createApp',
                            value: 'true',
                        }}
                        text={TextProfiles.App.create}
                    />

                    {props.data.apps.map(app => (
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
                                        {TextProfiles.App.edit}
                                    </XMenuItem>
                                </>
                            }
                        />
                    ))}
                </XView>

                <CreateAppModal />
                <EditAppModal apps={props.data.apps} />
            </MainNavigation>
        )),
    ),
);
