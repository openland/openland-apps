import * as React from 'react';
import { withBuildingProjectsQuery, BuildingProject } from '../../../api/BuildingProjects';
import { withPage } from '../../../components/withPage';
import {
    DataList, DataListFilters, DataListContent, DataListRadio,
    DataListRadioItem, DataListSearch, DataListContentStats
} from '../../../components/DataList';
import { withInfiniteList, XInfiniteListItem } from '../../../components/withInfiniteList';
import { DataListCard, DataListCardItem } from '../../../components/DataListCard';
import { DataListInvite } from '../../../components/DataListInvite';
import { XLink } from '../../../components/X/XLink';
import { XEnumeration } from '../../../components/X/XEnumerations';

export const PipelineItems = withInfiniteList<BuildingProject>(items => {
    return items.map((item) => {
        var units: number | undefined = undefined;
        var subtitle: string | undefined = undefined;
        if (item.proposedUnits !== undefined && item.existingUnits !== undefined) {
            units = item.proposedUnits!! - item.existingUnits!!;
        }
        if (item.extrasAddress && (item.extrasAddress.toLowerCase() !== item.name.toLowerCase())) {
            subtitle = item.extrasAddress;
        }
        return (
            <XInfiniteListItem key={item.id}>
                <DataListCard
                    title={item.name}
                    newUnits={units}
                    endYear={item.extrasYearEnd}
                    subtitle={subtitle}
                    picture={item.preview}
                    verified={item.verified}
                    url={item.extrasUrl}
                    location={item.extrasLocation}
                    slug={item.slug}
                >
                    {item.extrasAddressSecondary && (
                        <DataListCardItem title="Secondary address">{item.extrasAddressSecondary}</DataListCardItem>
                    )}
                    {item.developers!!.length > 0 && (
                        <DataListCardItem title="Developers">
                            <XEnumeration>
                                {item.developers!!.map((d) => (
                                    <XLink path={'/organizations/' + d.slug}>{d.title}</XLink>
                                ))}
                            </XEnumeration>
                        </DataListCardItem>
                    )}
                    {item.constructors!!.length > 0 && (
                        <DataListCardItem title="Contractors">
                            <XEnumeration>
                                {item.constructors!!.map((d) => (
                                    <XLink path={'/organizations/' + d.slug}>{d.title}</XLink>
                                ))}
                            </XEnumeration>
                        </DataListCardItem>
                    )}

                    {item.extrasComment && (
                        <DataListCardItem title="Comment">{item.extrasComment}</DataListCardItem>
                    )}

                    {/*<XWriteAcces>*/}
                    {/*<DataListCardItem title="View"><XLink*/}
                    {/*path={'/projects/' + item.slug}>{'View Project'}</XLink></DataListCardItem>*/}
                    {/*</XWriteAcces>*/}
                </DataListCard>
            </XInfiniteListItem>
        );
    });
});

export default withPage(withBuildingProjectsQuery((props) => {
    return (
        <DataList>
            <DataListFilters title="Construction projects">
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
    );
}));