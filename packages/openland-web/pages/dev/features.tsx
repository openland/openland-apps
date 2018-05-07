import '../../globals';
import * as React from 'react';
import { withApp } from '../../components/withApp';
import { withFeatureFlags, withFeatureFlagAdd } from '../../api/';
import { XModalTargeted } from '../../components/X/XModalTargeted';
import { XForm } from '../../components/X/XForm';
import { XHeader } from '../../components/X/XHeader';
import { DevToolsScaffold } from '../../components/DevToolsScaffold';
import { XButton } from 'openland-x/XButton';
import { XTable } from 'openland-x/XTable';
import { XFooter } from 'openland-x/XFooter';

const AddFeatureForm = withFeatureFlagAdd((props) => {
    return (
        <XForm submitMutation={props.add} mutationDirect={true}>
            <XForm.Field title="Key">
                <XForm.Text field="key" placeholder="format: awesome-feature" />
            </XForm.Field>
            <XForm.Field title="Title">
                <XForm.Text field="title" placeholder="ex. Advanced Feature" />
            </XForm.Field>
            <XFooter>
                <XForm.Submit style="primary" text="Add"/>
            </XFooter>
        </XForm>
    );
});

export default withApp('Super Features', ['super-admin', 'software-developer'], withFeatureFlags((props) => {
    return (
        <DevToolsScaffold title="Feature flags">
            <XHeader text="Feature flags">
                <XModalTargeted fullScreen={false} title="Adding Feature">
                    <XModalTargeted.Target>
                        <XButton text="Add Feature"/>
                    </XModalTargeted.Target>
                    <XModalTargeted.Content>
                        <AddFeatureForm />
                    </XModalTargeted.Content>
                </XModalTargeted>
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
}));