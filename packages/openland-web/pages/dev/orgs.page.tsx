import * as React from 'react';
import { withApp } from '../../components/withApp';
import { XHeader } from 'openland-x/XHeader';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { XButton } from 'openland-x/XButton';
import { XTable } from 'openland-x/XTable';
import { XForm } from 'openland-x-forms/XForm';
import { XSwitcher } from 'openland-x/XSwitcher';
import { XModalForm } from 'openland-x-modal/XModalForm';
import { XFormField } from 'openland-x-forms/XFormField';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XView } from 'react-mental';
import { useXRouter } from 'openland-x-routing/useXRouter';
import { useClient } from 'openland-web/utils/useClient';
import { MutationFunc } from 'react-apollo';

const AddAccountForm = () => {
    const client = useClient();

    const mutate = async ({ variables: { title } }: { variables: { title: string } }) => {
        await client.mutateSuperAccountAdd({
            title,
        });

        await client.refetchSuperAccounts();
    };

    return (
        <XModalForm
            title="Add new organization"
            target={<XButton text="Add organization" />}
            submitMutation={mutate as MutationFunc<{}>}
            mutationDirect={true}
            actionName="Add"
        >
            <XFormField title="Organization Name">
                <XForm.Text field="title" />
            </XFormField>
        </XModalForm>
    );
};

export default withApp('Super Organizations', 'super-admin', () => {
    const client = useClient();
    const orgs = client.useSuperAccounts().superAccounts;
    const router = useXRouter();
    let orgsCurrentTab = orgs.filter(o => o.state === (router.query.orgState || 'ACTIVATED'));

    return (
        <DevToolsScaffold title="Organizations">
            <XHeader text="Organizations" description={orgs.length + ' total'}>
                <AddAccountForm />
            </XHeader>

            <XView marginLeft={24}>
                <XSwitcher style="flat">
                    <XSwitcher.Item
                        query={{ field: 'orgState' }}
                        counter={orgs.filter(o => o.state === 'ACTIVATED').length}
                    >
                        ACTIVATED
                    </XSwitcher.Item>
                    <XSwitcher.Item
                        query={{ field: 'orgState', value: 'PENDING' }}
                        counter={orgs.filter(o => o.state === 'PENDING').length}
                    >
                        PENDING
                    </XSwitcher.Item>
                    <XSwitcher.Item
                        query={{
                            field: 'orgState',
                            value: 'SUSPENDED',
                        }}
                        counter={orgs.filter(o => o.state === 'SUSPENDED').length}
                    >
                        SUSPENDED
                    </XSwitcher.Item>
                </XSwitcher>
            </XView>
            <XTable>
                <XTable.Header>
                    <XTable.Cell>Title</XTable.Cell>
                    <XTable.Cell>State</XTable.Cell>
                    <XTable.Cell>{}</XTable.Cell>
                </XTable.Header>
                <XTable.Body>
                    {orgsCurrentTab.map(v => (
                        <XTable.Row key={v.id} noHover={true}>
                            <XTable.Cell>{v.title}</XTable.Cell>
                            <XTable.Cell>{v.state}</XTable.Cell>
                            <XTable.Cell>
                                <XHorizontal justifyContent="flex-end">
                                    <XButton
                                        path={'/super/orgs/' + v.id}
                                        style="ghost"
                                        text="Settings"
                                    />
                                    <XButton
                                        path={'/directory/o/' + v.orgId}
                                        style="ghost"
                                        text="Profile"
                                    />
                                </XHorizontal>
                            </XTable.Cell>
                        </XTable.Row>
                    ))}
                </XTable.Body>
            </XTable>
        </DevToolsScaffold>
    );
});
