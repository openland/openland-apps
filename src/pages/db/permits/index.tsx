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
            <Table>
                <Table.Body>
                    {props.items.map((item) => (
                        <Table.Row key={item.id}>
                            <Table.Cell>
                                <XLink path={'/permits/' + item.id}>{item.id}</XLink>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
                <Table.Footer>
                    <Table.HeaderCell>
                        Total: {props.itemsCount} / {props.pagesCount} / {props.currentPage}
                        <XPaging totalPages={props.pagesCount} currentPage={props.currentPage} />
                        {/* <Menu floated="right" pagination={true}>
                            <Menu.Item as="a" icon={true}>
                                <Icon name="chevron left" />
                            </Menu.Item>
                            <Menu.Item as={XLink} query={{ field: 'page', value: '1' }}>1</Menu.Item>
                            <Menu.Item as="a">2</Menu.Item>
                            <Menu.Item as="a">3</Menu.Item>
                            <Menu.Item as="a">4</Menu.Item>
                            <Menu.Item as="a" icon={true}>
                                <Icon name="chevron right" />
                            </Menu.Item>
                        </Menu> */}
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