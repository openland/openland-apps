import * as React from 'react';
import { XLink } from './X/XLink';
import { PermitStatus } from './PermitStatus';
import { formatDuration } from '../utils/date';
import { InfiniteListContainer, XInfiniteListItem } from './withInfiniteList';
import { XCounter } from './X/XCounter';
import { PermitType } from './PermitType';
import { XCard } from './X/XCard';
import { Links } from '../Links';
import { PermitShortFragment } from '../api/Types';

export function ListPermits(props: { permits: PermitShortFragment[]; hideCounter?: boolean }) {
    return (
        <InfiniteListContainer>
            {props.permits.map((item) => (
                <XInfiniteListItem key={item.id}>
                    <XCard>
                        <div className="x-permit--in">
                            <XLink path={Links.area('sf').permit(item.id).view} className="x-permit--id">
                                {item.id}
                            </XLink>

                            <div className="x-permit--keys">
                                {item.streetNumbers!!.length > 0 && (
                                    <div className="x-permcard--key">
                                        <span>
                                            {item.streetNumbers!![0].streetNumber + (item.streetNumbers!![0].streetNumberSuffix ? item.streetNumbers!![0].streetNumberSuffix!! : '') +
                                                ' ' + item.streetNumbers!![0].streetName + (item.streetNumbers!![0].streetNameSuffix ? ' ' + item.streetNumbers!![0].streetNameSuffix : '')}
                                        </span>
                                        Address
                                    </div>
                                )}

                                {item.proposedUnits && (
                                    <div className="x-permcard--key">
                                        <span><XCounter value={item.proposedUnits!!} oldValue={item.existingUnits} /></span>
                                        Units
                                    </div>
                                )}

                                {item.approvalTime != null && (
                                    <div className="x-permcard--key">
                                        <span>{formatDuration(item.approvalTime)}</span>
                                        Approval time
                                    </div>
                                )}
                            </div>

                            <div className="x-permit--wrap">
                                {item.status && <PermitStatus status={item.status} date={item.statusUpdatedAt} />}
                            </div>
                        </div>

                        <div className="x-permit--box">
                            <div className="x-permit--type"><PermitType type={item.type!!} /></div>
                            <div className="x-permit--text">{item.description}</div>

                            <XLink path={Links.area('sf').permit(item.id).view}
                                className="x-permit--btn"><span>View details</span></XLink>
                        </div>
                    </XCard>
                </XInfiniteListItem>
            ))}
        </InfiniteListContainer>
    );
}