import * as React from 'react';
import { withBuildingProjectsQuery, BuildingProject } from '../api/BuildingProjects';
import { withPage } from '../components/withPage';
import {
    DataList, DataListFilters, DataListContent, DataListRadio,
    DataListRadioItem, DataListSearch, DataListContentStats
} from '../components/DataList';
import { withInfiniteList } from '../components/withInfiniteList';
import { DataListCard, DataListCardItem } from '../components/DataListCard';
import { DataListInvite } from '../components/DataListInvite';

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
        <DataListCard
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
            {item.extrasAddressSecondary && <DataListCardItem title="Secondary address" value={item.extrasAddressSecondary} />}
            {item.extrasPermit && <DataListCardItem title="Permit ID" value={item.extrasPermit} />}
            {item.extrasDeveloper && <DataListCardItem title="Developer" value={item.extrasDeveloper} />}
            {item.extrasGeneralConstructor && <DataListCardItem title="General contractor" value={item.extrasGeneralConstructor} />}
            {item.extrasComment && <DataListCardItem title="Comment" value={item.extrasComment} />}
        </DataListCard>
    );
});

export default withPage(withBuildingProjectsQuery((props) => {
    return (
        <React.Fragment>
            <DataList>
                <DataListFilters title="Pipeline Filters">
                    <DataListSearch searchKey="filter" />
                    <DataListRadio radioKey="year" title="Expected completion">
                        <DataListRadioItem title="All" />
                        <DataListRadioItem title="2017" itemKey="2017" />
                        <DataListRadioItem title="2018" itemKey="2018" />
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
        </React.Fragment>
    );
}));