import * as React from 'react';
import { XContainer } from '../../../components/X/XContainer';
import { XWrap } from '../../../components/X/XWrap';
import { ListPermits } from '../../../components/ListPermits';
import { PermitType } from '../../../components/PermitType';
import { XCounter } from '../../../components/X/XCounter';
import { XLink } from '../../../components/X/XLink';
import { formatDuration } from '../../../utils/date';
import { XDate } from '../../../components/X/XDate';
import { Icon } from 'semantic-ui-react';
import { XDiff } from '../../../components/X/XDiff';
import { PermitStatus } from '../../../components/PermitStatus';
import { withLoader } from '../../../components/withLoader';
import { XHead } from '../../../components/X/XHead';
import { XCard } from '../../../components/X/XCard';
import { withAreaPage } from '../../../components/withAreaPage';
import { withPermit } from '../../../api';

function ChangeRender(props: {
    change: {
        __typename: 'PermitEventFieldChanged',
        fieldName: string,
        oldValue: string | null,
        newValue: string | null,
        date: string | null,
    }
}) {
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

export default withAreaPage(withPermit(withLoader((props) => {
    if (props.data.permit === null) {
        return <div />; // Hot Fix
    }
    let progress = 1;
    let filedDate = <span>TBD</span>;
    if (props.data.permit!!.filedAt) {
        filedDate = <XDate date={props.data.permit!!.filedAt!!} />;
    }

    let issuedDate = <span>TBD</span>;
    if (props.data.permit!!.issuedAt) {
        progress = 2;
        issuedDate = <XDate date={props.data.permit!!.issuedAt!!} />;
    }

    let completedDate = <span>TBD</span>;
    let completedTitle = 'Completed';
    if (['COMPLETED', 'EXPIRED', 'CANCELLED', 'DISAPPROVED', 'REVOKED', 'WITHDRAWN', 'SUSPENDED', 'UPHELD'].indexOf(props.data.permit.status!!) >= 0) {
        progress = 3;
        if (props.data.permit.statusUpdatedAt) {
            completedDate = <XDate date={props.data.permit.statusUpdatedAt} />;
        }

        switch (props.data.permit.status!!) {
            case 'EXPIRED':
                completedTitle = 'Expired';
                break;
            case 'DISAPPROVED':
                completedTitle = 'Disapproved';
                break;
            case 'REVOKED':
                completedTitle = 'Revoked';
                break;
            case 'WITHDRAWN':
                completedTitle = 'Withdrawn';
                break;
            case 'SUSPENDED':
                completedTitle = 'Suspended';
                break;
            case 'UPHELD':
                completedTitle = 'Upheld';
                break;
            case 'CANCELLED':
                completedTitle = 'Cancelled';
                break;
            case 'COMPLETED':
            default:
                completedTitle = 'Completed';
                break;
        }
    }

    let map = 'https://maps.googleapis.com/maps/api/staticmap?center=37.7718238831,-122.4038848877&zoom=15&size=500x500&scale=2&key=AIzaSyAZNqmyhPrPT5gRDMljsEwwyYwDuWIMIZY';
    if (props.data.permit.streetNumbers!!.length > 0) {
        let streetNumber = props.data.permit.streetNumbers!![0];
        let address = streetNumber.streetNumber + '' + (streetNumber.streetNumberSuffix ? streetNumber.streetNumberSuffix!! : '') +
            ' ' + streetNumber.streetName + (streetNumber.streetNameSuffix ? ' ' + streetNumber.streetNameSuffix!! : '') + ', San Francisco, CA, USA';
        map = 'https://maps.googleapis.com/maps/api/staticmap?center=' + encodeURIComponent(address) + '&zoom=15&size=640x640&scale=2&key=AIzaSyAZNqmyhPrPT5gRDMljsEwwyYwDuWIMIZY';
    }

    return (
        <>
        <XHead title={['Statecraft', 'San Francisco', 'Permits', props.data.permit.id]} />
        <div className="x-in">
            <div className="x-bigmap">
                <img className="x-bigmap--map" style={{ backgroundImage: `url(${map})` }} />
            </div>

            <XContainer wide={true}>
                <div className="row">
                    <div className="col-xs-12 col-xlg-10 col-xlg-offset-l-1">
                        <XWrap>
                            <XCard>
                                <div className="x-permcard--in">
                                    <div className="x-permcard--id">
                                        {props.data.permit.id}
                                    </div>

                                    <div className="x-permcard--keys">
                                        {props.data.permit.streetNumbers!!.length > 0 && (
                                            <div className="x-permcard--key">
                                                <span>
                                                    {props.data.permit.streetNumbers!![0].streetNumber + (props.data.permit.streetNumbers!![0].streetNumberSuffix ? props.data.permit.streetNumbers!![0].streetNumberSuffix!! : '') +
                                                        ' ' + props.data.permit.streetNumbers!![0].streetName + (props.data.permit.streetNumbers!![0].streetNameSuffix ? ' ' + props.data.permit.streetNumbers!![0].streetNameSuffix : '')}
                                                </span>
                                                Address
                                            </div>
                                        )}

                                        {props.data.permit.proposedUnits && (
                                            <div className="x-permcard--key">
                                                <span><XCounter value={props.data.permit.proposedUnits!!} oldValue={props.data.permit.existingUnits} /></span>
                                                Units
                                            </div>
                                        )}

                                        {props.data.permit.approvalTime != null && (
                                            <div className="x-permcard--key">
                                                <span>{formatDuration(props.data.permit.approvalTime)}</span>
                                                Approval time
                                            </div>
                                        )}
                                    </div>

                                    <XLink href={props.data.permit.governmentalUrl} className="x-permcard--btn">
                                        <span>
                                            <i className="icon-share" />
                                            SF DBI Record
                                        </span>
                                    </XLink>
                                </div>

                                <div className="x-permcard--box">
                                    <div className="x-permcard--type">
                                        <PermitType type={props.data.permit.type!!} />
                                    </div>

                                    <div className="x-permcard--text">
                                        {props.data.permit.description}
                                    </div>
                                </div>

                                <div className="x-permcard--dates">
                                    <div className="x-permcard--date">
                                        <div className="x-permcard--status">
                                            <i className="icon-filed" />
                                            <span>{filedDate}</span>
                                            Filed
                                        </div>
                                    </div>

                                    <div className="x-permcard--date">
                                        <div className={'x-permcard--status' + (progress < 2 ? ' is-disabled' : '')}>
                                            <i className="icon-issued" />
                                            <span>{issuedDate}</span>
                                            Issued
                                        </div>
                                    </div>

                                    <div className="x-permcard--date">
                                        <div className={'x-permcard--status' + (progress < 3 ? ' is-disabled' : '')}>
                                            <i className="icon-completed" />
                                            <span>{completedDate}</span>
                                            {completedTitle}
                                        </div>
                                    </div>
                                </div>

                                <div className={'x-permcard--progress' + (' is-s' + progress)} />
                            </XCard>
                        </XWrap>

                        {props.data.permit.events.length > 0 && (
                            <XWrap title="Permit updates">
                                <table className="x-updates">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Field</th>
                                            <th>Change</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.data.permit.events.map((p, i) => {
                                            if (p.__typename === 'PermitEventStatus') {
                                                return (
                                                    <tr key={'update-' + i}>
                                                        <td>{p.date}</td>
                                                        <td>Status</td>
                                                        <td>
                                                            <PermitStatus status={p.oldStatus} /><span className="x-updates--change">-></span><PermitStatus status={p.newStatus} />
                                                        </td>
                                                    </tr>
                                                );
                                            } else if (p.__typename === 'PermitEventFieldChanged') {
                                                return (
                                                    <tr key={'update-' + i}>
                                                        <td>{p.date}</td>
                                                        <td>{p.fieldName}</td>
                                                        <td>
                                                            <ChangeRender change={p} />
                                                        </td>
                                                    </tr>
                                                );
                                            } else {
                                                return null;
                                            }
                                        })}
                                    </tbody>
                                </table>
                            </XWrap>
                        )}

                        <XWrap title="More permits for the address">
                            <ListPermits permits={props.data.permit.relatedPermits} />
                        </XWrap>
                    </div>
                </div>
            </XContainer>
        </div>
        </>
    );
})));
