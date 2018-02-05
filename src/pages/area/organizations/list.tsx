import * as React from 'react';
import { withOrganizations } from '../../../api';
import { XList, XListItem } from '../../../components/X/XList';
import { CardOrganization2 } from '../../../components/CardOrganization2';
import { DataList } from '../../../components/Incubator/DataList';
import { withLoader } from '../../../components/Base/withLoader';
import { XHead } from '../../../components/X/XHead';
import { withAreaPage } from '../../../components/Navigation/withAreaPage';
import { XPageContent } from '../../../components/X/XPageContent';

export default withAreaPage(withOrganizations(withLoader((props) => {

    let data = props.data.organizations;
    if (props.router.query!!.type === 'developer') {
        data = data.filter((v) => v.isDeveloper);
    } else if (props.router.query!!.type === 'constructor') {
        data = data.filter((v) => v.isConstructor);
    }
    data = data.slice(0).sort((a, b) => {
        let ac = a.constructorIn!!.length + a.developerIn!!.length;
        let bc = b.constructorIn!!.length + b.developerIn!!.length;
        if (ac < bc) {
            return 1;
        } else if (ac > bc) {
            return -1;
        }
        return a.title.localeCompare(b.title)
    });
    if (props.router.query!!.filter) {
        let q = (props.router.query!!.filter as string).trim().toLowerCase();
        if (q.length > 0) {
            data = data.filter((v) => v.title.toLowerCase().indexOf(q) >= 0);
        }
    }
    return (
        <>
        <XHead title={['Statecraft', 'San Francisco', 'Organizations']} />
        <XPageContent>
            <DataList>
                <DataList.Filters title="Organizations">
                    <DataList.Search searchKey="filter" />
                    <DataList.Radio radioKey="type" title="Organization Type">
                        <DataList.RadioItem title="All" />
                        <DataList.RadioItem title="Developers" itemKey="developer" />
                        <DataList.RadioItem title="Contractors" itemKey="constructor" />
                    </DataList.Radio>
                </DataList.Filters>
                <DataList.Content>
                    {/* <XWriteAcces>
                        <AddForm />
                        <br />
                    </XWriteAcces> */}
                    <DataList.Stats>
                        <DataList.Stats.Record counter={data.length} title="organizations" />
                    </DataList.Stats>
                    <XList>
                        {data.map((item: any) => {
                            return (
                                <XListItem key={item.id}>
                                    <CardOrganization2 key={item.id} org={item} />
                                </XListItem>
                            )
                        })}
                    </XList>
                </DataList.Content>
            </DataList>
        </XPageContent>
        </>
    );
})));