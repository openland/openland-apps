import * as React from 'react';
import { Permit } from '../api/Permits';
import { Table } from 'semantic-ui-react';
import { XLink } from './X/XLink';
import { XDate } from './X/XDate';
import { PermitStatus } from './PermitStatus';
import { formatDuration } from '../utils/date';

export function ListPermits(props: { permits: Permit[] }) {
    return (
        <Table striped={true}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell collapsing={true}>Permit Id</Table.HeaderCell>
                    <Table.HeaderCell collapsing={true}>Created</Table.HeaderCell>
                    <Table.HeaderCell collapsing={true}>Approved</Table.HeaderCell>
                    <Table.HeaderCell collapsing={true}>Status</Table.HeaderCell>
                    <Table.HeaderCell collapsing={true}>Type</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {props.permits.map((item) => (
                    <Table.Row key={item.id}>
                        <Table.Cell collapsing={true}>
                            <XLink path={'/permits/' + item.id}>{item.id}</XLink>
                        </Table.Cell>
                        <Table.Cell collapsing={true}>
                            {item.createdAt && (<XDate date={item.createdAt}/>)}
                        </Table.Cell>
                        <Table.Cell collapsing={true}>
                            {item.approvalTime && formatDuration(item.approvalTime)}
                        </Table.Cell>
                        <Table.Cell collapsing={true}>
                            {item.status && <PermitStatus status={item.status}/>}
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
}