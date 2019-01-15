import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { MainNavigation } from './Navigation';
import { withQueryLoader } from '../../../components/withQueryLoader';
import { withMyApps } from 'openland-web/api/withMyApps';
import { XView } from 'react-mental';
import { XAppCard } from 'openland-x/cards/XAppCard';
import { XCreateCard } from 'openland-x/cards/XCreateCard';
import { withAppProfile } from 'openland-web/api/withAppProfile';
import { AppFull } from 'openland-api/Types';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { sanitizeImageRef } from 'openland-y-utils/sanitizeImageRef';
import { XVertical } from 'openland-x-layout/XVertical';
import { XInput } from 'openland-x/XInput';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XMenuItem } from 'openland-x/XMenuItem';
import { XTextArea } from 'openland-x/XTextArea';

const CreateAppModal = withAppProfile(props => {
    return (
        <XModalForm
            useTopCloser={true}
            submitBtnText="Create"
            title="Create app"
            targetQuery="createApp"
            defaultAction={async data => {
                await props.createApp({
                    variables: {
                        name: data.input.name,
                        shortname: data.input.shortname,
                    },
                });
            }}
            defaultData={{
                input: {
                    name: '',
                    shortname: '',
                },
            }}
        >
            <XVertical>
                <XInput field="input.name" size="large" title="Name" autofocus={true} />
                <XInput field="input.shortname" size="large" title="Shortname" />
            </XVertical>
        </XModalForm>
    );
});

const EditAppModal = withAppProfile(props => {
    let app = (props as any).apps.filter(
        (a: AppFull) => a.id === props.router.query.editApp || '',
    )[0];
    if (!app) {
        return null;
    }
    return (
        <XModalForm
            title="Edit app"
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
                        <XInput field="input.name" size="large" title="Name" />
                        <XInput field="input.shortname" size="large" title="Shortname" />
                    </XVertical>
                </XView>
            </XView>

            <XTextArea valueStoreKey="fields.input.about" placeholder="About" resize={false} />
        </XModalForm>
    );
}) as React.ComponentType<{
    apps: AppFull[];
}>;

export default withApp(
    'My Apps',
    'viewer',
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
                        text="Create app"
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
                                        Edit app
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
