import * as React from 'react';
import { Table } from 'semantic-ui-react';
import { XLink } from './X/XLink';
import { BuildingProject } from '../api/BuildingProjects';

export function ListProjects(props: { projects: BuildingProject[] }) {
    return (
        <Table celled={true} striped={true}>
            {props.projects.map(p => {
                return (
                    <Table.Row key={p.id}>
                        <Table.Cell><XLink path={'/projects/' + p.slug}>{p.name}</XLink></Table.Cell>
                    </Table.Row>
                );
            })}
        </Table>
    );
}