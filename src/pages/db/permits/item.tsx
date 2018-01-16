import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { FieldChanged, StatusChanged, withPermitQuery } from '../../../api/Permits';
import { XContainer } from '../../../components/X/XContainer';
import { XWrap } from '../../../components/X/XWrap';
import { XRow } from '../../../components/X/XRow';
import { ListPermits } from '../../../components/ListPermits';
import { PermitType } from '../../../components/PermitType';
import { XCounter } from '../../../components/X/XCounter';
import { formatDuration } from '../../../utils/date';
import { XDate } from '../../../components/X/XDate';
import { Icon } from 'semantic-ui-react';
import { XDiff } from '../../../components/X/XDiff';
import { PermitStatus } from '../../../components/PermitStatus';
import { XColumn } from '../../../components/X/XColumn';
import { withLoader } from '../../../components/withLoader';

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

export default withPage(withPermitQuery(withLoader((props) => {

    let progress = 1;
    let filedDate = <span>TBD</span>;
    if (props.data.permit.filedAt) {
        filedDate = <XDate date={props.data.permit.filedAt} />;
    }

    let issuedDate = <span>TBD</span>;
    if (props.data.permit.issuedAt) {
        progress = 2;
        issuedDate = <XDate date={props.data.permit.issuedAt} />;
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

    let map = 'https://maps.googleapis.com/maps/api/staticmap?center=37.7718238831,-122.4038848877&zoom=16&size=500x500&key=AIzaSyAZNqmyhPrPT5gRDMljsEwwyYwDuWIMIZY';
    if (props.data.permit.streetNumbers!!.length > 0) {
        let streetNumber = props.data.permit.streetNumbers!![0];
        let address = streetNumber.streetNumber + '' + (streetNumber.streetNumberSuffix ? streetNumber.streetNumberSuffix!! : '') +
            ' ' + streetNumber.streetName + (streetNumber.streetNameSuffix ? ' ' + streetNumber.streetNameSuffix!! : '') + ', San Francisco, CA, USA';
        map = 'https://maps.googleapis.com/maps/api/staticmap?center=' + encodeURIComponent(address) + '&zoom=18&size=500x500&key=AIzaSyAZNqmyhPrPT5gRDMljsEwwyYwDuWIMIZY';
    }

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
                                            <div
                                                className="x-permcard--key">{props.data.permit.streetNumbers!!.length > 0 && (
                                                    <span>
                                                        {props.data.permit.streetNumbers!![0].streetNumber + (props.data.permit.streetNumbers!![0].streetNumberSuffix ? props.data.permit.streetNumbers!![0].streetNumberSuffix!! : '') +
                                                            ' ' + props.data.permit.streetNumbers!![0].streetName + (props.data.permit.streetNumbers!![0].streetNameSuffix ? ' ' + props.data.permit.streetNumbers!![0].streetNameSuffix : '')}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-sm-3">
                                            {props.data.permit.proposedUnits && (
                                                <><span><XCounter value={props.data.permit.proposedUnits!!}
                                                    oldValue={props.data.permit.existingUnits} /></span> units</>
                                            )}
                                        </div>
                                        <div className="col-xs-12 col-sm-3">
                                            {props.data.permit.approvalTime != null && (
                                                <div className="x-permcard--key">Approval
                                                        time <span>{formatDuration(props.data.permit.approvalTime)}</span>
                                                </div>
                                            )}
                                        </div>
                                    </XRow>
                                </div>

                                <div className="x-permcard--box">
                                    <div className="x-permcard--col">
                                        <div className="x-permcard--type"><PermitType
                                            type={props.data.permit.type!!} />
                                        </div>
                                    </div>
                                    <div className="x-permcard--col">
                                        <div className="x-permcard--text">{props.data.permit.description}</div>
                                    </div>
                                    <div className="x-permcard--col">
                                        <a href={props.data.permit.governmentalUrl} target="_blank"
                                            className="x-permcard--btn"><span><i
                                                className="icon-share" />SF DBI Record</span></a>
                                    </div>
                                </div>

                                <div className="x-permcard--dates">
                                    <XRow>
                                        <div className="col-xs-12 col-sm-3">
                                            <div className="x-permcard--label">Key dates</div>
                                        </div>
                                        <div className="col-xs-12 col-sm-3">
                                            <div className="x-permcard--status"><span>{filedDate}</span>Filed</div>
                                        </div>
                                        <div className="col-xs-12 col-sm-3">
                                            <div
                                                className={'x-permcard--status' + (progress < 2 ? ' is-disabled' : '')}>
                                                <span>{issuedDate}</span>Issued
                                                </div>
                                        </div>
                                        <div className="col-xs-12 col-sm-3">
                                            <div
                                                className={'x-permcard--status' + (progress < 3 ? ' is-disabled' : '')}>
                                                <span>{completedDate}</span>{completedTitle}
                                            </div>
                                        </div>
                                    </XRow>
                                </div>

                                <div className={'x-permcard--progress' + (' is-s' + progress)} />

                                {/*<div className=" x-permcard--progress is-s1" />*/}
                                {/*<div className=" x-permcard--progress is-s3" />*/}
                            </div>
                        </div>

                        <div className=" col-xs-12 col-md-3 hidden-xs hidden-sm">
                            <div className=" x-permcard--map"
                                style={{ backgroundImage: 'url(' + map + ')' }} />
                            {/*<div className=" x-permcard--map no-photo" />*/}
                        </div>
                    </XRow>
                </XWrap>

                <XRow>
                    <XColumn cols={9} mobile={12}>
                        <XWrap title=" More permits for the address">
                            <ListPermits permits={props.data.permit.relatedPermits} />
                        </XWrap>
                    </XColumn>
                    {props.data.permit.events.length > 0 && (
                        <XColumn cols={3} mobile={12}>
                            <XWrap title=" Permit updates">
                                <div className=" x-updates">
                                    {props.data.permit.events.map((p, i) => {
                                        if (p.__typename === 'PermitEventStatus') {
                                            let s = (p as StatusChanged);
                                            return (
                                                <div className=" x-update" key={'update-' + i}>
                                                    <div className=" x-update--date">{s.date}, Status</div>
                                                    <div className=" x-update--text"><PermitStatus
                                                        status={s.oldStatus} /> -> <PermitStatus
                                                            status={s.newStatus} />
                                                    </div>
                                                </div>
                                            );
                                        } else if (p.__typename === 'PermitEventFieldChanged') {
                                            let s = (p as FieldChanged);
                                            return (
                                                <div className=" x-update" key={'update-' + i}>
                                                    <div className=" x-update--date">{s.date}, {s.fieldName}</div>
                                                    <div className=" x-update--text"><ChangeRender change={s} />
                                                    </div>
                                                </div>
                                            );
                                        } else {
                                            return null;
                                        }
                                    })}
                                </div>
                            </XWrap>
                        </XColumn>
                    )}
                </XRow>
            </XContainer>
        </div>
    );
})));