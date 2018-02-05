import * as React from 'react';
import { withPermits } from '../../../api';
import { withPage } from '../../../components/Navigation/withPage';
import { XList, XListItem } from '../../../components/X/XList';
import { CardPermit } from '../../../components/CardPermit';
import { DataList } from '../../../components/Incubator/DataList';
import { withPagedList } from '../../../components/Base/withPagedList';
import { withLoader } from '../../../components/Base/withLoader';
import { XHead } from '../../../components/X/XHead';
import { PermitShortFragment } from '../../../api/Types';
import { XPageContent } from '../../../components/X/XPageContent';

const PermitsItems = withPagedList<PermitShortFragment>((props) => (
    <XList>
        {props.items.map((item) => <XListItem key={item.id}><CardPermit permit={item} /></XListItem>)}
    </XList>
));

export default withPage(withPermits(withLoader((props) => {
    return (
        <>
        <XHead title={['Statecraft', 'San Francisco', 'Permits']} />
        <XPageContent>
            <DataList>
                <DataList.Filters title="Building Permits">
                    <DataList.Search searchKey="filter" />
                    <DataList.Radio radioKey="sort" title="Sort By">
                        <DataList.RadioItem title="Filing date" reset={['page']} />
                        <DataList.RadioItem title="Last action date" reset={['page']} itemKey="STATUS_CHANGE_TIME" />
                        <DataList.RadioItem title="Completion date" reset={['page']} itemKey="COMPLETE_TIME" />
                        <DataList.RadioItem title="Issuing date" reset={['page']} itemKey="ISSUED_TIME" />
                        <DataList.RadioItem title="Approval time ascending" reset={['page']}
                            itemKey="APPROVAL_TIME_ASC" />
                        <DataList.RadioItem title="Approval time descending" reset={['page']}
                            itemKey="APPROVAL_TIME_DESC" />
                    </DataList.Radio>
                    <DataList.Radio radioKey="type" title="Type">
                        <DataList.RadioItem title="All" reset={['page']} />
                        <DataList.RadioItem title="New constructions" itemKey="NEW_CONSTRUCTION" reset={['page']} />
                        <DataList.RadioItem title="Demolitions" itemKey="DEMOLITIONS" reset={['page']} />
                    </DataList.Radio>
                    <DataList.Radio radioKey="issuedYear" title="Issued">
                        <DataList.RadioItem title="All" reset={['page']} />
                        <DataList.RadioItem title="Last 5 years" reset={['page']} itemKey="2012" />
                        <DataList.RadioItem title="Last 10 years" reset={['page']} itemKey="2007" />
                    </DataList.Radio>
                    <DataList.Radio radioKey="minUnits" title="Project size">
                        <DataList.RadioItem title="All" reset={['page']} />
                        <DataList.RadioItem title="10+ units" itemKey="10" reset={['page']} />
                        <DataList.RadioItem title="50+ units" itemKey="50" reset={['page']} />
                        <DataList.RadioItem title="100+ units" itemKey="100" reset={['page']} />
                    </DataList.Radio>
                    <DataList.Radio radioKey="fromPipeline" title="Segments">
                        <DataList.RadioItem title="All" reset={['page']} />
                        <DataList.RadioItem title="Housing Pipeline" itemKey="true" reset={['page']} />
                    </DataList.Radio>
                </DataList.Filters>
                <DataList.Content>
                    <DataList.Stats>
                        <DataList.Stats.Record counter={props.data.items.pageInfo.itemsCount} title="Permits" />
                    </DataList.Stats>
                    <PermitsItems data={props.data} />
                </DataList.Content>
            </DataList>
        </XPageContent>
        </>
    );
})));