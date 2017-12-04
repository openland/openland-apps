import * as React from 'react';
import { Header } from '../XComponents/Header';
import { PagedList, PagedListItems } from '../XComponents/PagedList';
import {
    PagedListFilters, PagedListSearch, PagedListFilterRadio,
    PagedListFilterRadioItem
} from '../XComponents/PagedListFilters';
import { ContributersInviteList } from '../XComponents/ContributersInviteList';
import { Page } from '../XComponents/Page';
import { ListCard, ListCardItem } from '../XComponents/ListCard';
import { InfiniteScroller } from '../XComponents/InfiniteScroller';
import { withLoader } from '../Components/withLoader';
import { withBuildingProjectsQuery } from '../../api/BuildingProjects';

export const PipelineItems = withBuildingProjectsQuery(withLoader(props => {
    return (
        <div>
            {props.data!!.items.edges.map(p => {
                var units: number | undefined = undefined;
                var subtitle: string | undefined = undefined;
                if (p.node.proposedUnits !== undefined && p.node.existingUnits !== undefined) {
                    units = p.node.proposedUnits!! - p.node.existingUnits!!;
                }
                if (p.node.extrasAddress && (p.node.extrasAddress !== p.node.name)) {
                    subtitle = p.node.extrasAddress;
                }
                return (
                    <ListCard
                        key={p.node.id}
                        title={p.node.name}
                        newUnits={units}
                        endYear={p.node.extrasYearEnd}
                        subtitle={subtitle}
                        picture={p.node.preview}
                        verified={p.node.verified}
                    >
                        {p.node.extrasPermit && <ListCardItem title="Permit ID" value={p.node.extrasPermit} />}
                        {p.node.extrasDeveloper && <ListCardItem title="Developer" value={p.node.extrasDeveloper} />}
                        {p.node.extrasAddress && <ListCardItem title="Address" value={p.node.extrasAddress} />}
                        {p.node.extrasAddressSecondary && <ListCardItem title="Address" value={p.node.extrasAddressSecondary} />}
                    </ListCard>
                );
            })}
            {props.data!!.items.pageInfo.hasNextPage && <InfiniteScroller onLoadMore={() => { props.data!!.loadMoreEntries(); }} />}
        </div>
    );
}));

export const Pipeline = withBuildingProjectsQuery(withLoader(props => {
    console.warn(location.search);
    return (
        <Page>
            <Header />
            <PagedList>
                <PagedListFilters title="Pipeline Filters">
                    <PagedListSearch />
                    <PagedListFilterRadio radioKey="year" title="Expected completion">
                        <PagedListFilterRadioItem title="All" />
                        <PagedListFilterRadioItem title="2017" itemKey="2017" />
                        <PagedListFilterRadioItem title="2018" itemKey="2018" />
                        <PagedListFilterRadioItem title="2019+" itemKey="2019+" />
                    </PagedListFilterRadio>
                    <PagedListFilterRadio radioKey="minUnits" title="Project size">
                        <PagedListFilterRadioItem title="All" />
                        <PagedListFilterRadioItem title="10+ units" itemKey="10" />
                    </PagedListFilterRadio>
                    <ContributersInviteList />
                </PagedListFilters>
                <PagedListItems title="Pipeline">
                    <PipelineItems />
                </PagedListItems>
            </PagedList>
        </Page>
    );
}));