import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { withOrganizationsQuery, withOrganizationAddMutation } from '../../../api/Organizations';
import { withLoader } from '../../../components/withLoader';
import { XForm, XFormField, XFormSubmit, XFormGroup } from '../../../components/X/XForm';
import { XWriteAcces } from '../../../components/X/XWriteAccess';
import { OrganizationDataListCard } from '../../../components/DataListCard';
import { InfiniteListContainer, XInfiniteListItem } from '../../../components/withInfiniteList';
import {
    DataList, DataListFilters, DataListContent, DataListRadio,
    DataListRadioItem, DataListSearch
} from '../../../components/DataList';

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

export default withPage(withOrganizationsQuery(withLoader((props) => {
    return (
        <DataList>
            <DataListFilters title="Developers">
                <DataListSearch searchKey="filter" />
                <DataListRadio radioKey="sort" title="Sort by">
                    <DataListRadioItem title="A → Z" />
                    <DataListRadioItem title="Net new units" itemKey="new" />
                </DataListRadio>

                <div className="x-join hidden-xs hidden-sm">
                    <div className="x-join--btn">
                        <a className="x-btn is-block is-outline" target="_blank" href="#">Add an organization</a>
                    </div>
                </div>
            </DataListFilters>
            <DataListContent title="organizations">
                <XWriteAcces>
                    <AddForm/>
                    <br />
                </XWriteAcces>

                <div className="x-in--title hidden-xs">
                    <div>{props.data.organizations.length}<span>organizations</span></div>
                </div>

                <InfiniteListContainer>
                    {props.data.organizations.map(p => {
                        return (
                            <XInfiniteListItem key={p.id}>
                                <OrganizationDataListCard
                                    title={p.title}
                                    profile={'/organizations/' + p.slug}
                                    logo={p.logo}
                                    url="#"
                                    subtitle="Developer"
                                    projects={100}
                                    featuredProject={{
                                        title: 'Avalon Dogpatch',
                                        url: '/projects/',
                                        picture: { url: '//placehold.it/85x58', retina: '//placehold.it/170x116' }
                                    }}
                                />
                            </XInfiniteListItem>
                        );
                    })}
                </InfiniteListContainer>
            </DataListContent>
        </DataList>
    );
})));