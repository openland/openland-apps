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
import { withLoader } from '../../../components/withLoader';
import Head from 'next/head';

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

export default withPage(withOrganizationsQuery(withLoader((props) => {

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
        <DataList>
            <Head>
                <title>Statecraft » San Francisco » Organizations</title>
                <meta property="og:title" content="Statecraft » San Francisco » Organizations" />
            </Head>

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
    );
})));