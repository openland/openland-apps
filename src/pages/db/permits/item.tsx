import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { withPermitQuery, StatusChanged, FieldChanged } from '../../../api/Permits';
import { XContainer } from '../../../components/X/XContainer';
import { Segment, Header, Table, Form, Button, Icon, Step } from 'semantic-ui-react';
import { XCounter } from '../../../components/X/XCounter';
import { XDiff } from '../../../components/X/XDiff';
import { XDate } from '../../../components/X/XDate';
import { ListPermits } from '../../../components/ListPermits';

function ChangeRender(props: { change: FieldChanged }) {
    if (props.change.oldValue === null) {
        return <span><Icon name="plus" color="green" /> {props.change.newValue}</span>;
    } else if (props.change.newValue === null) {
        return <span><Icon name="minus" color="red" /> {props.change.newValue}</span>;
    } else {
        if (props.change.fieldName === 'description') {
            return <XDiff oldValue={props.change.oldValue} newValue={props.change.newValue} />;
        } else {
            return <span>{props.change.oldValue} -> {props.change.newValue}</span>;
        }
    }
}

export default withPage(withPermitQuery((props) => {
    return (
        <div className="x-in">
            <XContainer wide={true}>
                <Header attached="top">
                    Pipeline Database
                </Header>
                <Segment attached="bottom">
                    PermitId: <a href={props.data.permit.governmentalUrl} target="_blank">{props.data.permit.id}</a>
                    <div>
                        <Step.Group>
                            <Step>
                                <Icon name="puzzle" />
                                <Step.Content>
                                    <Step.Title>Approval</Step.Title>
                                    <Step.Description>Waiting to approval</Step.Description>
                                </Step.Content>
                            </Step>
                            <Step disabled={props.data.permit.status !== 'COMPLETED' && props.data.permit.status !== 'ISSUED'}>
                                <Icon name="configure" />
                                <Step.Content>
                                    <Step.Title>Construction</Step.Title>
                                    <Step.Description>Construction is in progress</Step.Description>
                                </Step.Content>
                            </Step>
                            <Step disabled={props.data.permit.status !== 'COMPLETED'}>
                                <Icon name="gift" />
                                <Step.Content>
                                    <Step.Title>Completed</Step.Title>
                                    <Step.Description>Construction completed</Step.Description>
                                </Step.Content>
                            </Step>
                        </Step.Group>
                    </div>
                    <div>Status: {props.data.permit.status} {props.data.permit.statusUpdatedAt}</div>
                    {props.data.permit.filedAt && (<div>Filed <XDate date={props.data.permit.filedAt} large={true} /></div>)}
                    {props.data.permit.createdAt && (<div>Created <XDate date={props.data.permit.createdAt} large={true} /></div>)}
                    {props.data.permit.issuedAt && (<div>Issued <XDate date={props.data.permit.issuedAt} large={true} /></div>)}
                    {props.data.permit.startedAt && (<div>Started <XDate date={props.data.permit.startedAt} large={true} /></div>)}
                    {props.data.permit.expiresAt && (<div>Expires <XDate date={props.data.permit.expiresAt} large={true} /></div>)}
                    {props.data.permit.expiredAt && (<div>Expired <XDate date={props.data.permit.expiredAt} large={true} /></div>)}
                    {props.data.permit.completedAt && (<div>Completed <XDate date={props.data.permit.completedAt} large={true} /></div>)}
                    {props.data.permit.fasterThan !== undefined && (props.data.permit.fasterThan >= 50) && (<div>Faster Than {props.data.permit.fasterThan}% of projects of the same type</div>)}
                    {props.data.permit.fasterThan !== undefined && (props.data.permit.fasterThan < 50) && (<div>Slower Than {100 - props.data.permit.fasterThan}% of projects of the same type</div>)}

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

                <Segment>
                    <ListPermits permits={props.data.permit.relatedPermits} />
                </Segment>

                <Header attached="top">
                    Updates
                </Header>
                <Segment attached="bottom">
                    <Table celled={true} striped={true}>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Date</Table.HeaderCell>
                                <Table.HeaderCell>Field</Table.HeaderCell>
                                <Table.HeaderCell>Change</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {props.data.permit.events.map((p, i) => {
                                if (p.__typename === 'PermitEventStatus') {
                                    let s = (p as StatusChanged);
                                    return (
                                        <Table.Row key={'ind_' + i}>
                                            <Table.Cell collapsing={true}>
                                                {s.date}
                                            </Table.Cell>
                                            <Table.Cell collapsing={true}>
                                                Status Changed
                                            </Table.Cell>
                                            <Table.Cell>
                                                {s.oldStatus} -> {s.newStatus}
                                            </Table.Cell>
                                        </Table.Row>
                                    );
                                } else if (p.__typename === 'PermitEventFieldChanged') {
                                    let s = (p as FieldChanged);
                                    return (
                                        <Table.Row key={'ind_' + i}>
                                            <Table.Cell collapsing={true}>
                                                None
                                            </Table.Cell>
                                            <Table.Cell collapsing={true}>
                                                {s.fieldName}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <ChangeRender change={s} />
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
                        <Button content="Add Comment" icon="edit" primary={true} />
                    </Form>
                </Segment>
            </XContainer>
        </div>
    );
}));