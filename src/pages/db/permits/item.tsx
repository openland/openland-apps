import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { withPermitQuery, StatusChanged, FieldChanged } from '../../../api/Permits';
import { XContainer } from '../../../components/X/XContainer';
import { Segment, Header, Table, Form, Button } from 'semantic-ui-react';
import { XCounter } from '../../../components/X/XCounter';
import { XDiff } from '../../../components/X/XDiff';
export default withPage(withPermitQuery((props) => {
    return (
        <div className="x-in">
            <XContainer wide={true}>
                <Header attached="top">
                    Pipeline Database
                </Header>
                <Segment attached="bottom">
                    PermitId: {props.data.permit.id}
                    <div>Status: {props.data.permit.status} {props.data.permit.statusUpdatedAt}</div>
                    <div>Type: {props.data.permit.type} {props.data.permit.typeWood}</div>
                    {props.data.permit.streetNumbers!!.map((s) =>
                        (<div key={s.streetId}>Address: {s.streetNumber} {s.steetNumberSuffix} {s.streetName} {s.streetNameSuffix}</div>))
                    }
                    {props.data.permit.proposedStories && (
                        <div>Stories: <XCounter value={props.data.permit.proposedStories} oldValue={props.data.permit.existingStories} /></div>
                    )}
                    {props.data.permit.proposedUnits &&
                        (<div>Units: <XCounter value={props.data.permit.proposedUnits} oldValue={props.data.permit.existingUnits} /></div>)
                    }
                    <div> Description: {props.data.permit.description}</div>
                    <div> Proposed Use: {props.data.permit.proposedUse}</div>
                </Segment>
                <Header attached="top">
                    Updates
                </Header>
                <Segment attached="bottom">
                    <Table celled={true} striped={true}>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Field</Table.HeaderCell>
                                <Table.HeaderCell>Change</Table.HeaderCell>
                                <Table.HeaderCell>Date</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {props.data.permit.events.map((p, i) => {
                                if (p.__typename === 'PermitEventStatus') {
                                    let s = (p as StatusChanged);
                                    return (
                                        <Table.Row key={'ind_' + i}>
                                            <Table.Cell collapsing={true}>
                                                Status Changed
                                            </Table.Cell>
                                            <Table.Cell>
                                                {s.oldStatus} -> {s.newStatus}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {s.date}
                                            </Table.Cell>
                                        </Table.Row>
                                    );
                                } else if (p.__typename === 'PermitEventFieldChanged') {
                                    let s = (p as FieldChanged);
                                    return (
                                        <Table.Row key={'ind_' + i}>
                                            <Table.Cell collapsing={true}>
                                                {s.fieldName}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {s.fieldName === 'description' && (
                                                    <XDiff oldValue={s.oldValue} newValue={s.newValue} />
                                                )}
                                                {s.fieldName !== 'description' && (
                                                    <span>{s.oldValue} -> {s.newValue}</span>
                                                )}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {}
                                            </Table.Cell>
                                        </Table.Row>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                        </Table.Body>
                    </Table>
                    <Form>
                        <Form.TextArea />
                        <Button content="Add Reply" icon="edit" primary={true} />
                    </Form>
                </Segment>
            </XContainer>
        </div>
    );
}));