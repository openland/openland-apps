import '../../globals';
import * as React from 'react';
import { withApp } from '../../components/withApp';
import { AppContent } from '../../components/App/AppContent';
import { XHead } from '../../components/X/XHead';
import { XCard } from '../../components/X/XCard';
import { XTable } from '../../components/X/XTable';
import { withFeatureFlags, withFeatureFlagAdd } from '../../api';
import { XModalTargeted } from '../../components/X/XModalTargeted';
import { XButton } from '../../components/X/XButton';
import { XForm } from '../../components/X/XForm';

const AddFeatureForm = withFeatureFlagAdd((props) => {
    return (
        <XForm submitMutation={props.add} mutationDirect={true}>
            <XForm.Field title="Key">
                <XForm.Text field="key" placeholder="format: awesome-feature" />
            </XForm.Field>
            <XForm.Field title="Title">
                <XForm.Text field="title" placeholder="ex. Advanced Feature" />
            </XForm.Field>
            <XCard.Footer>
                <XForm.Submit style="dark">Add</XForm.Submit>
            </XCard.Footer>
        </XForm>
    );
});

export default withApp('Super Features', ['super-admin', 'software-developer'], withFeatureFlags((props) => {
    return (
        <>
            <XHead title="Feature flags" />
            <AppContent>
                <XCard shadow="medium">
                    <XCard.Header text="Feature flags">
                        <XModalTargeted fullScreen={false} title="Adding Feature">
                            <XModalTargeted.Target>
                                <XButton>Add Feature</XButton>
                            </XModalTargeted.Target>
                            <XModalTargeted.Content>
                                <AddFeatureForm />
                            </XModalTargeted.Content>
                        </XModalTargeted>
                    </XCard.Header>
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
                </XCard>
            </AppContent>
        </>
    );
}));