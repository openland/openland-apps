import * as React from 'react';
import { withPermits } from '../../../api';
import { formatDuration } from '../../../utils/date';
import { withPage } from '../../../components/withPage';
import { InfiniteListContainer, XInfiniteListItem } from '../../../components/withInfiniteList';
import { PermitType } from '../../../components/PermitType';
import { PermitStatusTest } from '../../../components/PermitStatus';
import { XLink } from '../../../components/X/XLink';

import {
    DataList, DataListContent, DataListFilters, DataListRadio, DataListRadioItem,
    DataListSearch
} from '../../../components/DataList';
import { withPagedList } from '../../../components/withPagedList';
import { withLoader } from '../../../components/withLoader';
import { XHead } from '../../../components/X/XHead';

import { XCounter } from '../../../components/X/XCounter';
import { Links } from '../../../Links';
import { PermitShortFragment } from '../../../api/Types';
import { XWriteAcces } from '../../../components/X/XWriteAccess';

const PermitsItems = withPagedList<PermitShortFragment>((props) => (
    <InfiniteListContainer>
        {props.items.map((item) => {
            return (
                <XInfiniteListItem key={item.id}>
                    <div className="x-card-test">
                        <div className="x-card-box">
                            <div className="x-card-row top">
                                <div className="x-card-title larger">
                                    <div className="title">
                                        <XLink path={Links.area('sf').permit(item.id).view}>
                                            <span>{item.id}</span>
                                        </XLink>
                                    </div>
                                    <XWriteAcces>
                                        <div style={{
                                            marginTop: '-28px', width: '100%',
                                            marginLeft: '32px',
                                            opacity: 0.7
                                        }}>
                                            {item.createdAt}
                                        </div>
                                    </XWriteAcces>
                                </div>
                                {item.streetNumbers!!.length > 0 && (
                                    <div className="x-card-count smaller">
                                        <div className="title">{
                                            item.streetNumbers!![0].streetNumber + (item.streetNumbers!![0].streetNumberSuffix ? item.streetNumbers!![0].streetNumberSuffix!! : '') +
                                            ' ' + item.streetNumbers!![0].streetName + (item.streetNumbers!![0].streetNameSuffix ? ' ' + item.streetNumbers!![0].streetNameSuffix : '')
                                        }
                                        </div>
                                        <div className="text">Address</div>
                                    </div>
                                )}

                                {item.proposedUnits && (
                                    <div className="x-card-count smaller">
                                        <div className="title">
                                            <XCounter value={item.proposedUnits!!} oldValue={item.existingUnits} />
                                        </div>
                                        <div className="text">Units</div>
                                    </div>
                                )}
                                {item.approvalTime != null && (
                                    <div className="x-card-count smaller">
                                        <div className="title">{formatDuration(item.approvalTime)}</div>
                                        <div className="text">Approval time</div>
                                    </div>
                                )}
                                {item.status && <PermitStatusTest status={item.status} date={item.statusUpdatedAt} />}
                            </div>
                            <div className="x-card-row bottom">
                                <div className="x-card-addition">
                                    <span>
                                        <PermitType type={item.type!!} />
                                    </span>
                                </div>
                                <div className="x-card-description">{item.description}</div>
                                <XLink
                                    className="x-card-details"
                                    path={Links.area('sf').permit(item.id).view}
                                >
                                    <span>View details</span>
                                </XLink>
                            </div>
                        </div>
                    </div>
                </XInfiniteListItem>
            )
        })}
    </InfiniteListContainer>
));

export default withPage(withPermits(withLoader((props) => {
    return (
        <>
        <XHead title={['Statecraft', 'San Francisco', 'Permits']} />
        <DataList>
            <DataListFilters title="Building Permits">
                <DataListSearch searchKey="filter" />
                <DataListRadio radioKey="sort" title="Sort By">
                    <DataListRadioItem title="Filing date" reset={['page']} />
                    <DataListRadioItem title="Last action date" reset={['page']} itemKey="STATUS_CHANGE_TIME" />
                    <DataListRadioItem title="Completion date" reset={['page']} itemKey="COMPLETE_TIME" />
                    <DataListRadioItem title="Issuing date" reset={['page']} itemKey="ISSUED_TIME" />
                    <DataListRadioItem title="Approval time ascending" reset={['page']}
                        itemKey="APPROVAL_TIME_ASC" />
                    <DataListRadioItem title="Approval time descending" reset={['page']}
                        itemKey="APPROVAL_TIME_DESC" />
                </DataListRadio>
                <DataListRadio radioKey="type" title="Type">
                    <DataListRadioItem title="All" reset={['page']} />
                    <DataListRadioItem title="New constructions" itemKey="NEW_CONSTRUCTION" reset={['page']} />
                    <DataListRadioItem title="Demolitions" itemKey="DEMOLITIONS" reset={['page']} />
                </DataListRadio>
                <DataListRadio radioKey="issuedYear" title="Issued">
                    <DataListRadioItem title="All" reset={['page']} />
                    <DataListRadioItem title="Last 5 years" reset={['page']} itemKey="2012" />
                    <DataListRadioItem title="Last 10 years" reset={['page']} itemKey="2007" />
                </DataListRadio>
                <DataListRadio radioKey="minUnits" title="Project size">
                    <DataListRadioItem title="All" reset={['page']} />
                    <DataListRadioItem title="10+ units" itemKey="10" reset={['page']} />
                    <DataListRadioItem title="50+ units" itemKey="50" reset={['page']} />
                    <DataListRadioItem title="100+ units" itemKey="100" reset={['page']} />
                </DataListRadio>
                <DataListRadio radioKey="fromPipeline" title="Segments">
                    <DataListRadioItem title="All" reset={['page']} />
                    <DataListRadioItem title="Housing Pipeline" itemKey="true" reset={['page']} />
                </DataListRadio>
            </DataListFilters>
            <DataListContent>
                <div className="x-in--title hidden-xs">
                    <div>{props.data.items.pageInfo.itemsCount}<span>Permits</span></div>
                </div>
                <PermitsItems data={props.data} />
            </DataListContent>
        </DataList>
        </>
    );
})));