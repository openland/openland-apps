import * as React from 'react';
import { withBuildingProjectsQuery, BuildingProject } from '../../../api/BuildingProjects';
import { withPage } from '../../../components/withPage';
import {
    DataList, DataListFilters, DataListContent, DataListRadio,
    DataListRadioItem, DataListSearch, DataListContentStats
} from '../../../components/DataList';
import { withInfiniteList } from '../../../components/withInfiniteList';
import { ListCard } from '../../../components/ListCard';
// import { DataListCard, DataListCardItem } from '../../../components/DataListCard';
import { DataListInvite } from '../../../components/DataListInvite';
// import { XLink } from '../../../components/X/XLink';
// import { XEnumeration } from '../../../components/X/XEnumerations';
import { withLoader } from '../../../components/withLoader';
import { XHead } from '../../../components/X/XHead';

export const PipelineItems = withInfiniteList<BuildingProject>(items => <ListCard cardData={items} cardType={'projects'} />);

export default withPage(withBuildingProjectsQuery(withLoader((props) => {

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
                <PipelineItems data={props.data} />
            </DataListContent>
        </DataList>
        </>
    );
})));