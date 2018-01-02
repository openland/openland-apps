import * as React from 'react';
import { Developer } from '../api/Developers';
import { Table } from 'semantic-ui-react';
import { XLink } from './X/XLink';

export function ListDevelopers(props: { developers: Developer[] }) {
    return (
        <Table celled={true} striped={true}>
            {props.developers.map(p => {
                return (
                    <Table.Row key={p.id}>
                        <Table.Cell><XLink path={'/organization/' + p.slug}>{p.title}</XLink></Table.Cell>
                    </Table.Row>
                );
            })}
        </Table>
    );
}