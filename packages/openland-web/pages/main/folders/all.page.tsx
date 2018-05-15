import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { Scaffold } from '../../../components/Scaffold';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Sidebar } from '../../../components/Sidebar';
import { withFolders } from '../../../api';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { XLoader } from 'openland-x/XLoader';
import { XHeader } from 'openland-x/XHeader';
import { XModalForm } from 'openland-x-modal/XModalForm';
import { XForm } from 'openland-x-forms/XForm';

export default withApp('Folders', 'viewer', withFolders((props) => {
    return (
        <>
            <XDocumentHead title={['Folders']} />
            <Scaffold>
                <Scaffold.Menu>
                    <Sidebar title="Folders">
                        {props.data.folders.map((v) => (
                            <Sidebar.Item path={'/folders/' + v.id}>{v.name}</Sidebar.Item>
                        ))}
                        <XModalForm
                            title="Create folder"
                            actionName="Create"
                            target={<Sidebar.Item>New folder</Sidebar.Item>}
                        >
                            <XForm.Text autofocus={true} field="name" placeholder="Folder name like 'Tower Opportunity' or 'Interesting lots'" />
                        </XModalForm>
                    </Sidebar>
                </Scaffold.Menu>
                <Scaffold.Content>
                    {!props.router.routeQuery.folderId && <XLoader loading={true} />}
                    {!props.router.routeQuery.folderId && <XPageRedirect path={'/folders/' + props.data.folders[0].id} />}
                    {props.router.routeQuery.folderId && <>
                        <XHeader text="Folder" />
                    </>}
                </Scaffold.Content>
            </Scaffold>
        </>
    );
}));
