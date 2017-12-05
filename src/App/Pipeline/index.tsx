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
import { BuildingProject, withBuildingProjectsQuery } from '../../api/BuildingProjects';
import { withInfiniteList } from '../XComponents/InfiniteList';

export const PipelineItems = withInfiniteList<BuildingProject>(item => {
    var units: number | undefined = undefined;
    var subtitle: string | undefined = undefined;
    if (item.proposedUnits !== undefined && item.existingUnits !== undefined) {
        units = item.proposedUnits!! - item.existingUnits!!;
    }
    if (item.extrasAddress && (item.extrasAddress !== item.name)) {
        subtitle = item.extrasAddress;
    }
    return (
        <ListCard
            key={item.id}
            title={item.name}
            newUnits={units}
            endYear={item.extrasYearEnd}
            subtitle={subtitle}
            picture={item.preview}
            verified={item.verified}
            url={item.extrasUrl}
            location={item.extrasLocation}
        >
            {item.extrasAddressSecondary && <ListCardItem title="Secondary address" value={item.extrasAddressSecondary} />}
            {item.extrasPermit && <ListCardItem title="Permit ID" value={item.extrasPermit} />}
            {item.extrasDeveloper && <ListCardItem title="Developer" value={item.extrasDeveloper} />}
            {item.extrasGeneralConstructor && <ListCardItem title="General contractor" value={item.extrasGeneralConstructor} />}
            {item.extrasComment && <ListCardItem title="Comment" value={item.extrasComment} />}
        </ListCard>
    );
});

export const Pipeline = withBuildingProjectsQuery((props) => {
    return (
        <Page>
            <Header />
            <PagedList>
                <PagedListFilters title="Pipeline Filters">
                    <PagedListSearch searchKey="filter" />
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
                <PagedListItems title={props.data.loading ? 'Pipeline' : 'Pipeline : ' + props.data.items.stats.newUnits + ' / ' + props.data.items.stats.newUnitsVerified}>
                    <PipelineItems data={props.data} />
                </PagedListItems>
            </PagedList>
        </Page>
    );
});