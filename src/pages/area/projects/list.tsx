import * as React from 'react';
import * as classnames from 'classnames';
import {
    DataList, DataListFilters, DataListContent, DataListRadio,
    DataListRadioItem, DataListSearch, DataListContentStats
} from '../../../components/DataList';
import { DataListInvite } from '../../../components/DataListInvite';
import { Links } from '../../../Links';
import { InfiniteListContainer, XInfiniteListItem } from '../../../components/withInfiniteList';
import { XLink } from '../../../components/X/XLink';
import { withLoader } from '../../../components/withLoader';
import { XHead } from '../../../components/X/XHead';
import { withAreaPage } from '../../../components/withAreaPage';
import { ProjectShortFragment } from '../../../api/Types';
import { withPagedList } from '../../../components/withPagedList';
import { withBuildingProjects } from '../../../api';

const PipelineItems = withPagedList<ProjectShortFragment>((props) => (
    <InfiniteListContainer>
        {props.items.map((item: any) => {
            let units: number | undefined = undefined;
            let subtitle: string | undefined = undefined;
            if (item.proposedUnits !== undefined && item.existingUnits !== undefined) {
                units = item.proposedUnits!! - item.existingUnits!!;
            }
            if (item.extrasAddress && (item.extrasAddress.toLowerCase() !== item.name.toLowerCase())) {
                subtitle = item.extrasAddress;
            }

            return (
                <XInfiniteListItem key={item.id}>
                    <div className="x-card-test with-image wide-image">
                        <div className="x-card-photo">
                            <XLink>
                                <img src={item.preview.retina} />
                            </XLink>
                        </div>
                        <div className="x-card-box">
                            <div className="x-card-row top">
                                <div className="x-card-title">
                                    <div className={classnames('title' + (item.verified ? ' is-checked' : ''))}>
                                        <XLink path={Links.area('sf').project(item.slug!!).view}>
                                            {item.name}
                                        </XLink>
                                    </div>
                                    {subtitle && (<div className="text">{subtitle}</div>)}
                                </div>
                                {item.extrasUrl && (
                                    <div className="x-card-link">
                                        <a className="x-card-btn" href={item.extrasUrl} target="_blank">
                                            <i className="icon-share" />
                                        </a>
                                    </div>
                                )}
                            </div>
                            <div className="x-card-row bottom">
                                <div className="x-card-count">
                                    <div className="title">{units}</div>
                                    <div className="text">Net new units</div>
                                </div>
                                <div className="x-card-count">
                                    <div className="title">{item.extrasYearEnd}</div>
                                    <div className="text">Expected completion</div>
                                </div>
                                <XLink
                                    className="x-card-details"
                                    path={Links.area('sf').project(item.slug!!).view}
                                >
                                    <span>Show details</span>
                                </XLink>
                            </div>
                        </div>
                    </div>
                </XInfiniteListItem>
            )
        })}
    </InfiniteListContainer>
));

export default withAreaPage(withBuildingProjects(withLoader((props) => {

    return (
        <>
        <XHead title={['Statecraft', 'San Francisco', 'Construction projects']} />
        <DataList>
            <DataListFilters title="Construction projects">
                <DataListSearch searchKey="filter" />
                <DataListRadio radioKey="year" title="Expected completion">
                    <DataListRadioItem title="All" itemKey="all" />
                    <DataListRadioItem title="2017" itemKey="2017" />
                    <DataListRadioItem title="2018" />
                    <DataListRadioItem title="2019+" itemKey="2019+" />
                </DataListRadio>
                <DataListRadio radioKey="minUnits" title="Project size">
                    <DataListRadioItem title="All" />
                    <DataListRadioItem title="10+ units" itemKey="10" />
                </DataListRadio>
                <DataListInvite />
            </DataListFilters>
            <DataListContent title="Pipeline">
                <DataListContentStats
                    totalProjects={props.data.items ? props.data.items.stats.totalProjects : 0}
                    totalProjectsVerified={props.data.items ? props.data.items.stats.totalProjectsVerified : 0}
                    newUnits={props.data.items ? props.data.items.stats.newUnits : 0}
                    newUnitsVerified={props.data.items ? props.data.items.stats.newUnitsVerified : 0}
                />
                {props.data.items && (<PipelineItems data={props.data} />)}
            </DataListContent>
        </DataList>
        </>
    );
})));