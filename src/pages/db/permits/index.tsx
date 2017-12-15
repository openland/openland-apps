import * as React from 'react';
import { Permit, withPermitsPagedQuery } from '../../../api/Permits';
import { withPage } from '../../../components/withPage';
import { XLink } from '../../../components/X/XLink';
import { Table, Segment } from 'semantic-ui-react';
import { withPagedList } from '../../../components/withPagedList';
import { XContainer } from '../../../components/X/XContainer';
import { PermitStatus } from '../../../components/PermitStatus';

const PermitsItems = withPagedList<Permit>((props) => {
    return (
        <Table striped={true}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell collapsing={true}>Permit Id</Table.HeaderCell>
                    <Table.HeaderCell collapsing={true}>Created</Table.HeaderCell>
                    <Table.HeaderCell collapsing={true}>Status</Table.HeaderCell>
                    <Table.HeaderCell collapsing={true}>Type</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {props.items.map((item) => (
                    <Table.Row key={item.id}>
                        <Table.Cell collapsing={true}>
                            <XLink path={'/permits/' + item.id}>{item.id}</XLink>
                        </Table.Cell>
                        <Table.Cell collapsing={true}>
                            {item.createdAt}
                        </Table.Cell>
                        <Table.Cell collapsing={true}>
                            {item.status && <PermitStatus status={item.status} />}
                        </Table.Cell>
                        <Table.Cell collapsing={true}>
                            {item.type}
                        </Table.Cell>
                        <Table.Cell>
                            {item.description}
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
});

export default withPage(withPermitsPagedQuery((props) => {
    return (
        <React.Fragment>
            <div style={{ paddingBottom: 32, paddingTop: 32 }}>
                <XContainer wide={true}>
                    <Segment>
                        <PermitsItems data={props.data} />
                    </Segment>
                </XContainer>
            </div>
        </React.Fragment>
    );
}));