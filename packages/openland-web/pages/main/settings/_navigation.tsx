import * as React from 'react';
import { XView } from 'react-mental';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';
import { Sidebar } from '../../../components/Sidebar';

export const Navigation = (props: { title: string; children?: any }) => (
    <>
        <XDocumentHead title={props.title} />
        <Scaffold>
            <Scaffold.Menu>
                <Sidebar title="Settings">
                    <Sidebar.Item path="/settings/profile" arrow={true}>
                        Profile
                    </Sidebar.Item>
                    <Sidebar.Item path="/settings/notifications" arrow={true}>
                        Notifications
                    </Sidebar.Item>
                    <Sidebar.Item path="/settings/dev" arrow={true}>
                        Developer keys
                    </Sidebar.Item>
                </Sidebar>
            </Scaffold.Menu>
            <Scaffold.Content padding={false}>
                <XView flexShrink={0}>{props.children}</XView>
            </Scaffold.Content>
        </Scaffold>
    </>
);
