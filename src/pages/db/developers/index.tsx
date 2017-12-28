import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { Segment, Table } from 'semantic-ui-react';
import { withDevelopersQuery, withDeveloperAddMutation } from '../../../api/Developers';
import { withLoader } from '../../../components/withLoader';
import { XContainer } from '../../../components/X/XContainer';
import { XForm, XFormField, XFormSubmit, XFormGroup } from '../../../components/X/XForm';
import { XLink } from '../../../components/X/XLink';
import { XWriteAcces } from '../../../components/X/XWriteAccess';

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

export default withPage(withDevelopersQuery(withLoader((props) => {
    return (
        <div style={{ paddingTop: 32, paddingBottom: 32 }}>
            <XContainer wide={true}>
                <Segment>
                    <XWriteAcces>
                        <AddForm />
                    </XWriteAcces>
                    <Table celled={true} striped={true} >
                        {props.data.developers.map(p => {
                            return (
                                <Table.Row key={p.id}>
                                    <Table.Cell collapsing={true}><XLink path={'/developers/' + p.slug}>{p.slug}</XLink></Table.Cell>
                                    <Table.Cell>{p.title}</Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table>
                </Segment>
            </XContainer>
        </div>
    );
})));