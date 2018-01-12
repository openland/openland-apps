import * as React from 'react';
import { Permit } from '../api/Permits';
import { XLink } from './X/XLink';
import { XDate } from './X/XDate';
import { PermitStatus } from './PermitStatus';
import { formatDuration } from '../utils/date';
import { InfiniteListContainer, XInfiniteListItem } from './withInfiniteList';
import { XCounter } from './X/XCounter';
import { PermitType } from './PermitType';

export function ListPermits(props: { permits: Permit[] }) {
    return (
        <InfiniteListContainer>
            {props.permits.map((item) => (
                <XInfiniteListItem key={item.id}>
                    <div className="x-permit">
                        <div className="x-permit--in">
                            <div className="x-permit--id">{item.id}</div>
                            <div className="x-permit--address">
                                {item.streetNumbers!!.length > 0 && (
                                    item.streetNumbers!![0].streetNumber + (item.streetNumbers!![0].steetNumberSuffix ? item.streetNumbers!![0].steetNumberSuffix!! : '') +
                                    ' ' + item.streetNumbers!![0].streetName + (item.streetNumbers!![0].streetNameSuffix ? ' ' + item.streetNumbers!![0].streetNameSuffix : '')
                                )}
                                <div className="x-permit--counter visible-sm visible-md visible-lg">
                                    {item.proposedUnits && (<span><XCounter value={item.proposedUnits!!}
                                                                            oldValue={item.existingUnits}/></span>)}
                                    {item.proposedUnits && 'units'}
                                </div>
                            </div>
                            <div className="x-permit--counter hidden-sm hidden-md hidden-lg">
                                {item.proposedUnits && (
                                    <span><XCounter value={item.proposedUnits!!}
                                                    oldValue={item.existingUnits}/></span>
                                )}
                                {item.proposedUnits && 'units'}
                            </div>
                            <div className="x-permit--info">
                                {item.status &&
                                <div className="x-permit--status"><PermitStatus status={item.status}/></div>}
                                {/*item.statusUpdatedAt && (<div className="x-permit--date"><XDate date={item.statusUpdatedAt}/></div>)*/}
                                {item.createdAt && (
                                    <div className="x-permit--date">
                                        <XDate date={item.createdAt} format={'date'}/>
                                    </div>
                                )}
                                {item.approvalTime != null && (<div className="x-permit--time">Approval
                                    time <span>{formatDuration(item.approvalTime)}</span></div>)}
                            </div>
                        </div>

                        <div className="x-permit--box">
                            <div className="x-permit--type"><PermitType type={item.type!!}/></div>
                            <div className="x-permit--text">{item.description}</div>

                            <XLink path={'/permits/' + item.id}
                                   className="x-permit--btn"><span>View details</span></XLink>
                        </div>
                    </div>
                </XInfiniteListItem>
            ))}
        </InfiniteListContainer>
    );
}