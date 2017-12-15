import * as React from 'react';
import { Permit, withPermitsPagedQuery } from '../../../api/Permits';
import { withPage } from '../../../components/withPage';
import { XLink } from '../../../components/X/XLink';
import { Table, Dimmer, Loader, Segment } from 'semantic-ui-react';
import { withPagedList } from '../../../components/withPagedList';
import { XContainer } from '../../../components/X/XContainer';
import { XPaging } from '../../../components/X/XPaging';

const PermitsItems = withPagedList<Permit>((props) => {
    return (
        <div style={{ position: 'relative' }}>
            <Dimmer active={props.loading} inverted={true}>
                <Loader inverted={true} content="Loading" />
            </Dimmer>
            <Table celled={true} striped={true}>
                <Table.Header>
                    <Table.HeaderCell collapsing={true}>Permit Id</Table.HeaderCell>
                    <Table.HeaderCell>Permit Type</Table.HeaderCell>
                </Table.Header>
                <Table.Body>
                    {props.items.map((item) => (
                        <Table.Row key={item.id}>
                            <Table.Cell collapsing={true}>
                                <XLink path={'/permits/' + item.id}>{item.id}</XLink>
                            </Table.Cell>
                            <Table.Cell>
                                {item.type}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
                <Table.Footer>
                    <Table.HeaderCell colSpan="2">
                        Total: {props.itemsCount}
                        <XPaging totalPages={props.pagesCount} currentPage={props.currentPage} />
                    </Table.HeaderCell>
                </Table.Footer>
            </Table>
        </div>
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