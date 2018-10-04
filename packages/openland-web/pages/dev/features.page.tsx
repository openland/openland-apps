import * as React from 'react';
import { withApp } from '../../components/withApp';
import { withFeatureFlags } from '../../api/withFeatureFlags';
import { withFeatureFlagAdd } from '../../api/withFeatureFlagAdd';
import { XHeader } from 'openland-x/XHeader';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { XTable } from 'openland-x/XTable';
import { XForm } from 'openland-x-forms/XForm';
import { XModalForm } from 'openland-x-modal/XModalForm';
import { XButton } from 'openland-x/XButton';
import { XFormField } from 'openland-x-forms/XFormField';
import { withQueryLoader } from '../../components/withQueryLoader';

const AddFeatureForm = withFeatureFlagAdd((props) => {
    return (
        <XModalForm
            title="Adding Feature"
            submitMutation={props.add}
            mutationDirect={true}
            actionName="Add"
            target={<XButton text="Add feature" />}
        >
            <XFormField title="Key">
                <XForm.Text field="key" placeholder="format: awesome-feature" />
            </XFormField>
            <XFormField title="Title">
                <XForm.Text field="title" placeholder="ex. Advanced Feature" />
            </XFormField>
        </XModalForm>
    );
});

export default withApp('Super Features', ['super-admin', 'software-developer'], withFeatureFlags(withQueryLoader((props) => {
    return (
        <DevToolsScaffold title="Feature flags">
            <XHeader text="Feature flags">
                <AddFeatureForm />
            </XHeader>
            <XTable>
                <XTable.Header>
                    <XTable.Cell>Key</XTable.Cell>
                    <XTable.Cell>Title</XTable.Cell>
                </XTable.Header>
                <XTable.Body>
                    {props.data.featureFlags.map((v) => (
                        <XTable.Row>
                            <XTable.Cell>{v.key}</XTable.Cell>
                            <XTable.Cell>{v.title}</XTable.Cell>
                        </XTable.Row>
                    ))}
                </XTable.Body>
            </XTable>
        </DevToolsScaffold>
    );
})));