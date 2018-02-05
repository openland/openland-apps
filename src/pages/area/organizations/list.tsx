import * as React from 'react';
import { withOrganizationAddMutation, withOrganizations } from '../../../api';
import { XForm, XFormField, XFormSubmit, XFormGroup } from '../../../components/X/XForm';
import { XWriteAcces } from '../../../components/X/XWriteAccess';
import { XList, XListItem } from '../../../components/X/XList';
import { OrganizationsListCard } from '../../../components/OrganizationsListCard';
import { DataList } from '../../../components/DataList';
import { withLoader } from '../../../components/withLoader';
import { XHead } from '../../../components/X/XHead';
import { withAreaPage } from '../../../components/withAreaPage';
import { XPageContent } from '../../../components/X/XPageContent';

const AddForm = withOrganizationAddMutation((props) => {
    return (
        <XForm mutate={props.add}>
            <XFormGroup>
                <XFormField name="slug" hint="Short Name" />
                <XFormField name="title" hint="Name of developer" />
                <XFormSubmit title="Add Developer" />
            </XFormGroup>
        </XForm>
    );
});

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
                    <XWriteAcces>
                        <AddForm />
                        <br />
                    </XWriteAcces>

                    <div className="x-in--title hidden-xs">
                        <div>{data.length}<span>organizations</span></div>
                    </div>

                    <XList>
                        {data.map((item: any) => {
                            return (
                                <XListItem key={item.id}>
                                    <OrganizationsListCard key={item.id} org={item} />
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