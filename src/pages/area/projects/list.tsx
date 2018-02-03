import * as React from 'react';
import {
    DataList, DataListFilters, DataListContent, DataListRadio,
    DataListRadioItem, DataListSearch, DataListContentStats
} from '../../../components/DataList';
import { DataListInvite } from '../../../components/DataListInvite';
import { InfiniteListContainer } from '../../../components/withInfiniteList';
import { ProjectsListCard } from '../../../components/ProjectsListCard';
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
                <ProjectsListCard
                    key={item.id}
                    id={item.id}
                    title={item.name}
                    newUnits={units}
                    subtitle={subtitle}
                    endYear={item.extrasYearEnd}
                    picture={item.preview}
                    verified={item.verified}
                    url={item.extrasUrl}
                    slug={item.slug}
                />
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