import * as React from 'react';
import { Permit, withPermitsPagedQuery } from '../../../api/Permits';
import { withPage } from '../../../components/withPage';
import { ListPermits } from '../../../components/ListPermits';
import {
    DataList, DataListContent, DataListFilters, DataListRadio, DataListRadioItem,
    DataListSearch
} from '../../../components/DataList';
import { DataListInvite } from '../../../components/DataListInvite';
import { withPagedList } from '../../../components/withPagedList';

const PermitsItems = withPagedList<Permit>((props) => <ListPermits permits={props.items}/>);

export default withPage(withPermitsPagedQuery((props) => {
    return (
        <DataList>
            <DataListFilters title="Pipeline Filters">
                <DataListSearch searchKey="filter"/>
                <DataListRadio radioKey="sort" title="Sort">
                    <DataListRadioItem title="By Time" reset={['page']}/>
                    <DataListRadioItem title="Approval Time Descending" reset={['page']} itemKey="APPROVAL_TIME_DESC"/>
                    <DataListRadioItem title="Approval Time Ascending" reset={['page']} itemKey="APPROVAL_TIME_ASC"/>
                </DataListRadio>
                <DataListRadio radioKey="type" title="Type">
                    <DataListRadioItem title="All" reset={['page']}/>
                    <DataListRadioItem title="New Constructions" itemKey="NEW_CONSTRUCTION" reset={['page']}/>
                    <DataListRadioItem title="Demolitions" itemKey="DEMOLITIONS" reset={['page']}/>
                </DataListRadio>
                <DataListRadio radioKey="issuedYear" title="Issued Year">
                    <DataListRadioItem title="All" reset={['page']}/>
                    <DataListRadioItem title="Last 5 years" reset={['page']} itemKey="2012"/>
                    <DataListRadioItem title="Last 10 years" reset={['page']} itemKey="2007"/>
                </DataListRadio>
                <DataListRadio radioKey="minUnits" title="Project size">
                    <DataListRadioItem title="All" reset={['page']}/>
                    <DataListRadioItem title="10+ units" itemKey="10" reset={['page']}/>
                </DataListRadio>
                <DataListInvite/>
            </DataListFilters>
            <DataListContent>
                <PermitsItems data={props.data}/>
            </DataListContent>
        </DataList>
    );
}));