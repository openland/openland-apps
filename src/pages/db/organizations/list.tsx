import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { withOrganizationsQuery, withOrganizationAddMutation } from '../../../api/Organizations';
import { XForm, XFormField, XFormSubmit, XFormGroup } from '../../../components/X/XForm';
import { XWriteAcces } from '../../../components/X/XWriteAccess';
import { OrganizationDataListCard } from '../../../components/DataListCard';
import { InfiniteListContainer, XInfiniteListItem } from '../../../components/withInfiniteList';
import {
    DataList, DataListFilters, DataListContent, DataListRadio,
    DataListRadioItem, DataListSearch
} from '../../../components/DataList';
import { Footer } from '../../../components/Footer';

const AddForm = withOrganizationAddMutation((props) => {
    return (
        <XForm mutate={props.add}>
            <XFormGroup>
                <XFormField name="slug" hint="Short Name"/>
                <XFormField name="title" hint="Name of developer"/>
                <XFormSubmit title="Add Developer"/>
            </XFormGroup>
        </XForm>
    );
});

export default withPage(withOrganizationsQuery((props) => {

    let data = props.data.organizations;
    if (props.router.query!!.type === 'developer') {
        data = data.filter((v) => v.isDeveloper);
    } else if (props.router.query!!.type === 'constructor') {
        data = data.filter((v) => v.isConstructor);
    }
    if (props.router.query!!.filter) {
        let q = (props.router.query!!.filter as string).trim().toLowerCase();
        if (q.length > 0) {
            data = data.filter((v) => v.title.toLowerCase().indexOf(q) >= 0);
        }
    }
    return (
        <>
            <DataList>
                <DataListFilters title="Organizations">
                    <DataListSearch searchKey="filter"/>
                    <DataListRadio radioKey="type" title="Organization Type">
                        <DataListRadioItem title="All"/>
                        <DataListRadioItem title="Developer" itemKey="developer"/>
                        <DataListRadioItem title="Contractor" itemKey="constructor"/>
                    </DataListRadio>

                    {/*<div className="x-join hidden-xs hidden-sm">*/}
                    {/*<div className="x-join--btn">*/}
                    {/*<a className="x-btn is-block is-outline" target="_blank" href="#">Add an organization</a>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                </DataListFilters>
                <DataListContent title="organizations">
                    <XWriteAcces>
                        <AddForm/>
                        <br/>
                    </XWriteAcces>

                    <div className="x-in--title hidden-xs">
                        <div>{data.length}<span>organizations</span></div>
                    </div>

                    <InfiniteListContainer>
                        {data.map(p => {
                            let subtitle = undefined;
                            if (p.isDeveloper) {
                                if (p.isConstructor) {
                                    subtitle = 'Developer and Contractor';
                                } else {
                                    subtitle = 'Developer';
                                }
                            } else {
                                subtitle = 'Contractor';
                            }

                            let project = null;
                            if (p.developerIn && p.developerIn.length > 0) {
                                project = p.developerIn!![0];
                            } else if (p.constructorIn && p.constructorIn.length > 0) {
                                project = p.constructorIn!![0];
                            }

                            let featured = undefined;
                            if (project !== null) {
                                featured = {
                                    title: project.name,
                                    url: '/projects/' + project.slug,
                                    picture: project.preview
                                };
                            }

                            return (
                                <XInfiniteListItem key={p.id}>
                                    <OrganizationDataListCard
                                        slug={p.slug}
                                        title={p.title}
                                        profile={'/organizations/' + p.slug}
                                        logo={p.logo}
                                        url={p.url}
                                        subtitle={subtitle}
                                        projects={p.constructorIn!!.length + p.developerIn!!.length}
                                        featuredProject={featured}
                                    />
                                </XInfiniteListItem>
                            );
                        })}
                    </InfiniteListContainer>
                </DataListContent>
            </DataList>
            <Footer/>
        </>
    );
}));