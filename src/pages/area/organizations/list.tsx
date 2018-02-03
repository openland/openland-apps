import * as React from 'react';
import { withOrganizationAddMutation, withOrganizations } from '../../../api';
import { XForm, XFormField, XFormSubmit, XFormGroup } from '../../../components/X/XForm';
import { XWriteAcces } from '../../../components/X/XWriteAccess';
import { InfiniteListContainer } from '../../../components/withInfiniteList';
import { OrganizationsListCard } from '../../../components/OrganizationsListCard';
import {
    DataList, DataListFilters, DataListContent, DataListRadio,
    DataListRadioItem, DataListSearch
} from '../../../components/DataList';
import { withLoader } from '../../../components/withLoader';
import { XHead } from '../../../components/X/XHead';
import { withAreaPage } from '../../../components/withAreaPage';

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
        <DataList>
            <DataListFilters title="Organizations">
                <DataListSearch searchKey="filter" />
                <DataListRadio radioKey="type" title="Organization Type">
                    <DataListRadioItem title="All" />
                    <DataListRadioItem title="Developers" itemKey="developer" />
                    <DataListRadioItem title="Contractors" itemKey="constructor" />
                </DataListRadio>

                {/*<div className="x-join hidden-xs hidden-sm">*/}
                {/*<div className="x-join--btn">*/}
                {/*<a className="x-btn is-block is-outline" target="_blank" href="#">Add an organization</a>*/}
                {/*</div>*/}
                {/*</div>*/}
            </DataListFilters>
            <DataListContent title="organizations">
                <XWriteAcces>
                    <AddForm />
                    <br />
                </XWriteAcces>

                <div className="x-in--title hidden-xs">
                    <div>{data.length}<span>organizations</span></div>
                </div>

                <InfiniteListContainer>
                    {data.map((item: any) => {

                        let subtitle = undefined

                        if (item.isDeveloper) {
                            if (item.isConstructor) {
                                subtitle = 'Developer and Contractor'
                            } else {
                                subtitle = 'Developer'
                            }
                        } else {
                            subtitle = 'Contractor'
                        }

                        let project = null

                        if (item.developerIn && item.developerIn.length > 0) {
                            project = item.developerIn!![0]
                        } else if (item.constructorIn && item.constructorIn.length > 0) {
                            project = item.constructorIn!![0]
                        }

                        let featured = undefined;
                        if (project !== null) {
                            featured = {
                                title: project.name,
                                url: project.slug,
                                picture: project.preview
                            };
                        }

                        let projectsLenght: number = item.constructorIn!!.length + item.developerIn!!.length

                        return (
                            <OrganizationsListCard
                                key={item.id}
                                id={item.id}
                                slug={item.slug}
                                title={item.title}
                                subtitle={subtitle}
                                projects={projectsLenght}
                                logo={item.logo}
                                featuredProject={featured}
                                url={item.url}
                            />
                        )
                    })}
                </InfiniteListContainer>
            </DataListContent>
        </DataList>
        </>
    );
})));