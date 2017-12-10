import * as React from 'react';
import { withData } from '../../../utils/withData';
import { DataList, DataListFilters, DataListSearch } from '../../../components/DataList';
import { Header } from '../../../components/Header';

const Index = () => {
    return (
        <React.Fragment>
            <Header />
            <DataList>
                <DataListFilters title="Pipeline Filters">
                    <DataListSearch searchKey="filter" />
                </DataListFilters>
                {/* <DataListContent title="Pipeline" totalProjects={props.data.items ? props.data.items.stats.totalProjects : 0} totalProjectsVerified={props.data.items ? props.data.items.stats.totalProjectsVerified : 0} newUnits={props.data.items ? props.data.items.stats.newUnits : 0} newUnitsVerified={props.data.items ? props.data.items.stats.newUnitsVerified : 0}>
                    <PipelineItems data={props.data} />
                </DataListContent> */}
            </DataList>
        </React.Fragment>
    );
};

export default withData(Index);