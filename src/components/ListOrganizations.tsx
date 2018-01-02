import * as React from 'react';
import { Organization } from '../api/Organizations';
import { Table } from 'semantic-ui-react';
import { XLink } from './X/XLink';

export function ListOrganizations(props: { developers: Organization[] }) {
    return (
        <Table celled={true} striped={true}>
            {props.developers.map(p => {
                return (
                    <Table.Row key={p.id}>
                        <Table.Cell><XLink path={'/organizations/' + p.slug}>{p.title}</XLink></Table.Cell>
                    </Table.Row>
                );
            })}
        </Table>
    );
}