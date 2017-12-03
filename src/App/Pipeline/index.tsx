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
                        <PagedListFilterRadioItem title="All" name="completion" value="all" checked={true} />
                        <PagedListFilterRadioItem title="2017" name="completion" value="2017" checked={false} />
                        <PagedListFilterRadioItem title="2018" name="completion" value="2018" checked={false} />
                        <PagedListFilterRadioItem title="2019+" name="completion" value="2019" checked={false} />
                    </PagedListFilterRadio>
                    <PagedListFilterRadio title="Project size">
                        <PagedListFilterRadioItem title="All" name="size" value="all" checked={true} />
                        <PagedListFilterRadioItem title="10+ units" name="size" value="10" checked={false} />
                    </PagedListFilterRadio>
                    <ContributersInviteList />
                </PagedListFilters>
                <PagedListItems title="Pipeline">
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
                    {props.data!!.items.pageInfo.hasNextPage &&
                        (<a onClick={(e) => { e.preventDefault(); props.data!!.loadMoreEntries(); }}>Load More...</a>)}
                </PagedListItems>
            </PagedList>
        </Page>
    );
}));