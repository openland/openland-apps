import * as React from 'react';
import { Permit, withPermitsPagedQuery } from '../../../api/Permits';
import { withPage } from '../../../components/withPage';
import { ListPermits } from '../../../components/ListPermits';
import {
    DataList, DataListContent, DataListFilters, DataListRadio, DataListRadioItem,
    DataListSearch
} from '../../../components/DataList';
import { withPagedList } from '../../../components/withPagedList';
import { Footer } from '../../../components/Footer';

const PermitsItems = withPagedList<Permit>((props) => <ListPermits permits={props.items}/>);
export default withPage(withPermitsPagedQuery((props) => {
    return (
        <>
            <DataList>
                <DataListFilters title="Building Permits">
                    <DataListSearch searchKey="filter"/>
                    <DataListRadio radioKey="sort" title="Sort By">
                        <DataListRadioItem title="Filing date" reset={['page']}/>
                        <DataListRadioItem title="Last action date" reset={['page']} itemKey="STATUS_CHANGE_TIME"/>
                        <DataListRadioItem title="Completion date" reset={['page']} itemKey="COMPLETE_TIME"/>
                        <DataListRadioItem title="Issuing date" reset={['page']} itemKey="ISSUED_TIME"/>
                        <DataListRadioItem title="Approval time ascending" reset={['page']}
                                           itemKey="APPROVAL_TIME_ASC"/>
                        <DataListRadioItem title="Approval time descending" reset={['page']}
                                           itemKey="APPROVAL_TIME_DESC"/>
                    </DataListRadio>
                    <DataListRadio radioKey="type" title="Type">
                        <DataListRadioItem title="All" reset={['page']}/>
                        <DataListRadioItem title="New constructions" itemKey="NEW_CONSTRUCTION" reset={['page']}/>
                        <DataListRadioItem title="Demolitions" itemKey="DEMOLITIONS" reset={['page']}/>
                    </DataListRadio>
                    <DataListRadio radioKey="issuedYear" title="Issued">
                        <DataListRadioItem title="All" reset={['page']}/>
                        <DataListRadioItem title="Last 5 years" reset={['page']} itemKey="2012"/>
                        <DataListRadioItem title="Last 10 years" reset={['page']} itemKey="2007"/>
                    </DataListRadio>
                    <DataListRadio radioKey="minUnits" title="Project size">
                        <DataListRadioItem title="All" reset={['page']}/>
                        <DataListRadioItem title="10+ units" itemKey="10" reset={['page']}/>
                        <DataListRadioItem title="50+ units" itemKey="50" reset={['page']}/>
                        <DataListRadioItem title="100+ units" itemKey="100" reset={['page']}/>
                    </DataListRadio>
                    <DataListRadio radioKey="fromPipeline" title="Segments">
                        <DataListRadioItem title="All" reset={['page']}/>
                        <DataListRadioItem title="Housing Pipeline" itemKey="true" reset={['page']}/>
                    </DataListRadio>
                </DataListFilters>
                <DataListContent>
                    <div className="x-in--title hidden-xs">
                        <div>{props.data.items.pageInfo.itemsCount}<span>Permits</span></div>
                    </div>
                    <PermitsItems data={props.data}/>
                </DataListContent>
            </DataList>
            <Footer/>
        </>
    );
}));