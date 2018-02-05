import * as React from 'react';
import { DataList } from '../../../components/DataList';
import { DataListInvite } from '../../../components/DataListInvite';
import { XList } from '../../../components/X/XList';
import { ProjectsListCard } from '../../../components/ProjectsListCard';
import { withLoader } from '../../../components/withLoader';
import { XHead } from '../../../components/X/XHead';
import { withAreaPage } from '../../../components/withAreaPage';
import { ProjectShortFragment } from '../../../api/Types';
import { withPagedList } from '../../../components/withPagedList';
import { withBuildingProjects } from '../../../api';
import { XPageContent } from '../../../components/X/XPageContent';

const PipelineItems = withPagedList<ProjectShortFragment>((props) => (
    <XList>
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
    </XList>
));

export default withAreaPage(withBuildingProjects(withLoader((props) => {
    return (
        <>
        <XHead title={['Statecraft', 'San Francisco', 'Construction projects']} />
        <XPageContent>
            <DataList>
                <DataList.Filters title="Construction projects">
                    <DataList.Search searchKey="filter" />
                    <DataList.Radio radioKey="year" title="Expected completion">
                        <DataList.RadioItem title="All" itemKey="all" />
                        <DataList.RadioItem title="2017" itemKey="2017" />
                        <DataList.RadioItem title="2018" />
                        <DataList.RadioItem title="2019+" itemKey="2019+" />
                    </DataList.Radio>
                    <DataList.Radio radioKey="minUnits" title="Project size">
                        <DataList.RadioItem title="All" />
                        <DataList.RadioItem title="10+ units" itemKey="10" />
                    </DataList.Radio>
                    <DataListInvite />
                </DataList.Filters>
                <DataList.Content>
                    <DataList.ContentStats
                        totalProjects={props.data.items ? props.data.items.stats.totalProjects : 0}
                        totalProjectsVerified={props.data.items ? props.data.items.stats.totalProjectsVerified : 0}
                        newUnits={props.data.items ? props.data.items.stats.newUnits : 0}
                        newUnitsVerified={props.data.items ? props.data.items.stats.newUnitsVerified : 0}
                    />
                    {props.data.items && (<PipelineItems data={props.data} />)}
                </DataList.Content>
            </DataList>
        </XPageContent>
        </>
    );
})));