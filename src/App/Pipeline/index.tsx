import * as React from 'react';
import { Header } from '../XComponents/Header';
import { PagedList, PagedListItems } from '../XComponents/PagedList';
import {
    PagedListFilters, PagedListSearch, PagedListFilterRadio,
    PagedListFilterRadioItem
} from '../XComponents/PagedListFilters';
import { ContributersInviteList } from '../XComponents/ContributersInviteList';
import { Page } from '../XComponents/Page';
import { ListCard } from '../XComponents/ListCard';
import { withLoader } from '../Components/withLoader';
import { withBuildingProjectsQuery } from '../../api/BuildingProjects';

export const Pipeline = withBuildingProjectsQuery(withLoader(props => {
    return (
        <Page>
            <Header />
            <PagedList>
                <PagedListFilters title="Pipeline Filters">
                    <PagedListSearch />
                    <PagedListFilterRadio title="Expected completion">
                        <PagedListFilterRadioItem title="All" checked={true} />
                        <PagedListFilterRadioItem title="2017" checked={false} />
                        <PagedListFilterRadioItem title="2018" checked={false} />
                        <PagedListFilterRadioItem title="2019+" checked={false} />
                    </PagedListFilterRadio>
                    <PagedListFilterRadio title="Project size">
                        <PagedListFilterRadioItem title="All" checked={true} />
                        <PagedListFilterRadioItem title="10+ units" checked={false} />
                    </PagedListFilterRadio>
                    <ContributersInviteList />
                </PagedListFilters>
                <PagedListItems title="Pipeline">
                    {props.data!!.items.edges.map(p => {
                        return (
                            <ListCard
                                key={p.node.id}
                                title={p.node.name}
                                newUnits={p.node.proposedUnits!! - p.node.existingUnits!!}
                                endYear={new Date(p.node.expectedCompletedAt!!).getFullYear()}
                                subtitle="150 VAN NESS AVE"
                            />
                        );
                    })}
                    {props.data!!.items.pageInfo.hasNextPage &&
                        (<a onClick={(e) => { e.preventDefault(); props.data!!.loadMoreEntries(); }}>Load More...</a>)}
                </PagedListItems>
            </PagedList>
        </Page>
    );
}));