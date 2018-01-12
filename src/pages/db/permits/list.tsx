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
// import { Tab } from 'semantic-ui-react';
// import { resolveActionPath } from '../../../utils/routing';
// import { XBarChart } from '../../../components/X/XBarChart';

const PermitsItems = withPagedList<Permit>((props) => <ListPermits permits={props.items}/>);
// const tabs = [null, 'stats'];
export default withPage(withPermitsPagedQuery((props) => {

    // let index = 0;
    // if (props.router.query && props.router.query!!.tab === 'stats') {
    //     index = 1;
    // }

    return (
        <DataList>
            <DataListFilters title="Pipeline Filters">
                <DataListSearch searchKey="filter"/>
                <DataListRadio radioKey="sort" title="Sort By">
                    <DataListRadioItem title="Creation date" reset={['page']}/>
                    <DataListRadioItem title="Last action date" reset={['page']} itemKey="STATUS_CHANGE_TIME"/>
                    <DataListRadioItem title="Completion date" reset={['page']} itemKey="COMPLETE_TIME"/>
                    <DataListRadioItem title="Issuing date" reset={['page']} itemKey="ISSUED_TIME"/>
                    <DataListRadioItem title="Approval time ascending" reset={['page']} itemKey="APPROVAL_TIME_ASC"/>
                    <DataListRadioItem title="Approval time descending" reset={['page']} itemKey="APPROVAL_TIME_DESC"/>
                </DataListRadio>
                <DataListRadio radioKey="type" title="Type">
                    <DataListRadioItem title="All" reset={['page']}/>
                    <DataListRadioItem title="New construction" itemKey="NEW_CONSTRUCTION" reset={['page']}/>
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
                <DataListRadio radioKey="fromPipeline" title="From Pipeline">
                    <DataListRadioItem title="All" reset={['page']}/>
                    <DataListRadioItem title="Only from Pipeline" itemKey="true" reset={['page']}/>
                </DataListRadio>
                <DataListInvite/>
            </DataListFilters>
            <DataListContent>
                {/*<Tab activeIndex={index}*/}
                {/*onTabChange={(e, a) => props.router.push(resolveActionPath({*/}
                {/*router: props.router,*/}
                {/*query: {field: 'tab', value: tabs[a.activeIndex!!]}*/}
                {/*}))}*/}
                {/*panes={[*/}
                {/*{*/}
                {/*menuItem: 'Records', render: () => (*/}
                {/*<PermitsItems data={props.data}/>*/}
                {/*)*/}
                {/*},*/}
                {/*{*/}
                {/*menuItem: 'Stats',*/}
                {/*render: () => (*/}
                {/*<Tab.Pane>*/}
                {/*<h3>Approval time percentile (project/days)</h3>*/}
                {/*<XBarChart data={props.data.items.stats.approvalTimes}/>*/}
                {/*<h3>Approval time distribution (units/days)</h3>*/}
                {/*<XBarChart data={props.data.items.stats.approvalDistribution}/>*/}
                {/*</Tab.Pane>*/}
                {/*)*/}
                {/*}*/}
                {/*]}/>*/}
                <PermitsItems data={props.data}/>
            </DataListContent>
        </DataList>
    );
}));