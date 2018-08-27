import '../../globals';
import * as React from 'react';
import { withApp } from '../../components/withApp';
import { withSuperAccountAdd } from '../../api/withSuperAccountAdd';
import { withRouter } from 'openland-x-routing/withRouter';
import { XHeader } from 'openland-x/XHeader';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { XButton } from 'openland-x/XButton';
import { XTable } from 'openland-x/XTable';
import { XForm } from 'openland-x-forms/XForm';
import { XSwitcher } from 'openland-x/XSwitcher';
import { XModalForm } from 'openland-x-modal/XModalForm';
import glamorous from 'glamorous';
import { XFormField } from 'openland-x-forms/XFormField';
import { withQueryLoader } from '../../components/withQueryLoader';
import { withSuperAccounts } from '../../api/withSuperAccounts';
import { XHorizontal } from 'openland-x-layout/XHorizontal';

const AddAccountForm = withSuperAccountAdd((props) => {
    return (
        <XModalForm
            title="Add new organization"
            target={<XButton text="Add organization" />}
            submitMutation={props.add}
            mutationDirect={true}
            actionName="Add"
        >
            <XFormField title="Organization Name">
                <XForm.Text field="title" />
            </XFormField>
        </XModalForm>
    );
});

const XSwitcherMargin = glamorous(XSwitcher)({
    marginLeft: 24
});

export default withApp('Super Organizations', 'super-admin', withSuperAccounts(withQueryLoader(withRouter((props) => {

    let orgs = props.data.superAccounts;
    let orgsCurrentTab = orgs.filter((o) => o.state === (props.router.query.orgState || 'ACTIVATED'));

    return (
        <DevToolsScaffold title="Organizations">
            <XHeader text="Organizations" description={orgs.length + ' total'}>
                <AddAccountForm />
            </XHeader>

            <XSwitcherMargin flatStyle={true}>
                <XSwitcher.Item query={{ field: 'orgState' }} count={orgs.filter((o) => o.state === 'ACTIVATED').length}>ACTIVATED</XSwitcher.Item>
                <XSwitcher.Item query={{ field: 'orgState', value: 'PENDING' }} count={orgs.filter((o) => o.state === 'PENDING').length}>PENDING</XSwitcher.Item>
                <XSwitcher.Item query={{ field: 'orgState', value: 'SUSPENDED' }} count={orgs.filter((o) => o.state === 'SUSPENDED').length}>SUSPENDED</XSwitcher.Item>
            </XSwitcherMargin>

            <XTable>
                <XTable.Header>
                    <XTable.Cell>Title</XTable.Cell>
                    <XTable.Cell>State</XTable.Cell>
                    <XTable.Cell>{}</XTable.Cell>
                </XTable.Header>
                <XTable.Body>
                    {orgsCurrentTab.map((v) => (
                        <XTable.Row key={v.id} noHover={true}>
                            <XTable.Cell>{v.title}</XTable.Cell>
                            <XTable.Cell>{v.state}</XTable.Cell>
                            <XTable.Cell>
                                <XHorizontal justifyContent="flex-end">
                                    <XButton path={'/super/orgs/' + v.id} style="ghost" text="Settings" />
                                    <XButton path={'/directory/o/' + v.orgId} style="ghost" text="Profile" />
                                </XHorizontal>
                            </XTable.Cell>
                        </XTable.Row>
                    ))}
                </XTable.Body>
            </XTable>

        </DevToolsScaffold>
    );
}))));