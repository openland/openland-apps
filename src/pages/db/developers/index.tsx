import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { Segment, Table, Button } from 'semantic-ui-react';
import { withDevelopersQuery, withDeveloperAddMutation, withDeveloperRemoveMutation } from '../../../api/Developers';
import { withLoader } from '../../../components/withLoader';
import { XContainer } from '../../../components/X/XContainer';
import { XForm, XFormField, XFormSubmit, XFormGroup } from '../../../components/X/XForm';
import { withLiveMutation } from '../../../components/withLifeMutation';

const AddForm = withDeveloperAddMutation((props) => {
    return (
        <XForm mutate={props.mutate!!}>
            <XFormGroup>
                <XFormField name="slug" hint="Short Name" />
                <XFormField name="title" hint="Name of developer" />
                <XFormSubmit title="Add Developer" />
            </XFormGroup>
        </XForm>
    );
});

const DeleteButton = withDeveloperRemoveMutation(withLiveMutation((props) => {
    if (!props.loading && props.error) {
        return (
            <Button
                icon="warning"
                content={'Again?'}
                size="mini"
                color="yellow"
                onClick={props.action}
                loading={props.loading}
            />
        );
    }
    return (
        <Button
            icon="edit"
            content={'Delete'}
            size="mini"
            onClick={props.action}
            loading={props.loading}
        />
    );
}));

export default withPage(withDevelopersQuery(withLoader((props) => {
    return (
        <React.Fragment>
            <div style={{ paddingTop: 32, paddingBottom: 32 }}>
                <XContainer wide={true}>
                    <Segment>
                        <AddForm />
                        <Table celled={true} striped={true} >
                            {props.data.developers.map(p => {
                                return (
                                    <Table.Row key={p.id}>
                                        <Table.Cell collapsing={true}>{p.slug}</Table.Cell>
                                        <Table.Cell>{p.title}</Table.Cell>
                                        <Table.Cell collapsing={true}>
                                            <DeleteButton slug={p.slug} />
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table>
                    </Segment>
                </XContainer>
            </div>
        </React.Fragment>
    );
})));