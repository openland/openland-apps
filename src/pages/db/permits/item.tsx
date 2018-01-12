import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { withPermitQuery, StatusChanged, FieldChanged } from '../../../api/Permits';
import { XContainer } from '../../../components/X/XContainer';
import { Segment, Header, Table, Form, Button, Icon } from 'semantic-ui-react';
import { XDiff } from '../../../components/X/XDiff';
import { XWrap } from '../../../components/X/XWrap';
import { XRow } from '../../../components/X/XRow';
import { ListPermits } from '../../../components/ListPermits';

function ChangeRender(props: { change: FieldChanged }) {
    if (props.change.oldValue === null) {
        return <span><Icon name="plus" color="green"/> {props.change.newValue}</span>;
    } else if (props.change.newValue === null) {
        return <span><Icon name="minus" color="red"/> {props.change.newValue}</span>;
    } else {
        if (props.change.fieldName === 'description') {
            return <XDiff oldValue={props.change.oldValue} newValue={props.change.newValue}/>;
        } else {
            return <span>{props.change.oldValue} -> {props.change.newValue}</span>;
        }
    }
}

export default withPage(withPermitQuery((props) => {
    return (
        <div className="x-in">
            <XContainer wide={true}>
                <XWrap>
                    <XRow>
                        <div className="col-xs-12 col-md-9">
                            <div className="x-permcard">
                                <div className="x-permcard--in">
                                    <XRow>
                                        <div className="col-xs-12 col-sm-3">
                                            <div className="x-permcard--id">{props.data.permit.id}</div>
                                        </div>
                                        <div className="col-xs-12 col-sm-3">
                                            <div className="x-permcard--key"><span>2660 3rd St</span></div>
                                        </div>
                                        <div className="col-xs-12 col-sm-3">
                                            <div className="x-permcard--key"><span>100</span> units</div>
                                        </div>
                                        <div className="col-xs-12 col-sm-3">
                                            <div className="x-permcard--key">Approval time <span>2 years</span></div>
                                        </div>
                                    </XRow>
                                </div>

                                <div className="x-permcard--box">
                                    <div className="x-permcard--col">
                                        <div className="x-permcard--type">New construction wood frame</div>
                                    </div>
                                    <div className="x-permcard--col">
                                        <div className="x-permcard--text">To erect 5 stories, 2 basement, 27 residential condominiums.</div>
                                    </div>
                                    <div className="x-permcard--col">
                                        <a href="#" className="x-permcard--btn"><span><i className="icon-share" />SF DBI Record</span></a>
                                    </div>
                                </div>

                                <div className="x-permcard--dates">
                                    <XRow>
                                        <div className="col-xs-12 col-sm-3">
                                            <div className="x-permcard--label">Key dates</div>
                                        </div>
                                        <div className="col-xs-12 col-sm-3">
                                            <div className="x-permcard--status"><span>Jan 11, 2015</span>Filed</div>
                                        </div>
                                        <div className="col-xs-12 col-sm-3">
                                            <div className="x-permcard--status"><span>Apr 23, 2015</span>Issued</div>
                                        </div>
                                        <div className="col-xs-12 col-sm-3">
                                            <div className="x-permcard--status is-disabled"><span>TBD</span>Completed</div>
                                        </div>
                                    </XRow>
                                </div>

                                <div className="x-permcard--progress is-s2" />

                                {/*<div className="x-permcard--progress is-s1" />*/}
                                {/*<div className="x-permcard--progress is-s3" />*/}
                            </div>
                        </div>

                        <div className="col-xs-12 col-md-3 hidden-xs hidden-sm">
                            <div className="x-permcard--map" style={{backgroundImage: 'url(https://maps.googleapis.com/maps/api/staticmap?center=37.7718238831,-122.4038848877&zoom=16&size=500x500&key=AIzaSyAZNqmyhPrPT5gRDMljsEwwyYwDuWIMIZY)'}} />
                            {/*<div className="x-permcard--map no-photo" />*/}
                        </div>
                    </XRow>
                </XWrap>

                {/*<Header attached="top">
                    Pipeline Database
                </Header>
                <Segment attached="bottom">
                    PermitId: <a href={props.data.permit.governmentalUrl} target="_blank">{props.data.permit.id}</a>
                    <div>
                        <Step.Group>
                            <Step>
                                <Icon name="puzzle"/>
                                <Step.Content>
                                    <Step.Title>Approval</Step.Title>
                                    <Step.Description>Waiting to approval</Step.Description>
                                </Step.Content>
                            </Step>
                            <Step
                                disabled={props.data.permit.status !== 'COMPLETED' && props.data.permit.status !== 'ISSUED'}>
                                <Icon name="configure"/>
                                <Step.Content>
                                    <Step.Title>Construction</Step.Title>
                                    <Step.Description>Construction is in progress</Step.Description>
                                </Step.Content>
                            </Step>
                            <Step disabled={props.data.permit.status !== 'COMPLETED'}>
                                <Icon name="gift"/>
                                <Step.Content>
                                    <Step.Title>Completed</Step.Title>
                                    <Step.Description>Construction completed</Step.Description>
                                </Step.Content>
                            </Step>
                        </Step.Group>
                    </div>
                    <div>Status: {props.data.permit.status} {props.data.permit.statusUpdatedAt}</div>
                    {props.data.permit.approvalTime && (
                        <div>Approved in {formatDuration(props.data.permit.approvalTime)}</div>)}
                    {props.data.permit.filedAt && (
                        <div>Filed <XDate date={props.data.permit.filedAt} large={true}/></div>)}
                    {props.data.permit.createdAt && (
                        <div>Created <XDate date={props.data.permit.createdAt} large={true}/></div>)}
                    {props.data.permit.issuedAt && (
                        <div>Issued <XDate date={props.data.permit.issuedAt} large={true}/></div>)}
                    {props.data.permit.startedAt && (
                        <div>Started <XDate date={props.data.permit.startedAt} large={true}/></div>)}
                    {props.data.permit.expiresAt && (
                        <div>Expires <XDate date={props.data.permit.expiresAt} large={true}/></div>)}
                    {props.data.permit.expiredAt && (
                        <div>Expired <XDate date={props.data.permit.expiredAt} large={true}/></div>)}
                    {props.data.permit.completedAt && (
                        <div>Completed <XDate date={props.data.permit.completedAt} large={true}/></div>)}
                    {props.data.permit.fasterThan !== undefined && (props.data.permit.fasterThan >= 50) && (
                        <div>Faster Than {props.data.permit.fasterThan}% of projects of the same type</div>)}
                    {props.data.permit.fasterThan !== undefined && (props.data.permit.fasterThan < 50) && (
                        <div>Slower Than {100 - props.data.permit.fasterThan}% of projects of the same type</div>)}

                    <div>Type: {props.data.permit.type} {props.data.permit.typeWood}</div>
                    {props.data.permit.streetNumbers!!.map((s) =>
                        (<div
                            key={s.streetId}>Address: {s.streetNumber} {s.steetNumberSuffix} {s.streetName} {s.streetNameSuffix}</div>))
                    }
                    {props.data.permit.proposedStories && (
                        <div>Stories: <XCounter value={props.data.permit.proposedStories}
                                                oldValue={props.data.permit.existingStories}/></div>
                    )}
                    {props.data.permit.proposedUnits &&
                    (<div>Units: <XCounter value={props.data.permit.proposedUnits}
                                           oldValue={props.data.permit.existingUnits}/></div>)
                    }
                    <div> Description: {props.data.permit.description}</div>
                    <div> Proposed Use: {props.data.permit.proposedUse}</div>
                </Segment>*/}

                <XRow>
                    <div className="col-xs-12 col-md-9">
                        <XWrap title="More permits for the address">
                            <ListPermits permits={props.data.permit.relatedPermits}/>
                        </XWrap>
                    </div>

                    <div className="col-xs-12 col-md-3">
                        <XWrap title="Permit updates">
                            <div className="x-updates">
                                <div className="x-update">
                                    <div className="x-update--date">2 days ago, description</div>
                                    <div className="x-update--text">This is a description of the text<span style={{backgroundColor: '#FDB9C0'}}>,</span> it got fixed. <span style={{backgroundColor: '#ACF2BD'}}>Also, we added a brand new line.</span><span style={{backgroundColor: '#FDB9C0'}}> And removed the old one.</span></div>
                                </div>
                                <div className="x-update">
                                    <div className="x-update--date">2 days ago, description</div>
                                    <div className="x-update--text">This is a description of the text<span style={{backgroundColor: '#FDB9C0'}}>,</span> it got fixed. <span style={{backgroundColor: '#ACF2BD'}}>Also, we added a brand new line.</span><span style={{backgroundColor: '#FDB9C0'}}> And removed the old one.</span></div>
                                </div>
                            </div>
                        </XWrap>
                    </div>
                </XRow>

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
                                                {s.date}
                                            </Table.Cell>
                                            <Table.Cell collapsing={true}>
                                                {s.fieldName}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <ChangeRender change={s}/>
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
                        <Form.TextArea/>
                        <Button content="Add Comment" icon="edit" primary={true}/>
                    </Form>
                </Segment>
            </XContainer>
        </div>
    );
}));