import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { withOrganizationsQuery, withOrganizationAddMutation } from '../../../api/Organizations';
import { XForm, XFormField, XFormSubmit, XFormGroup } from '../../../components/X/XForm';
import { XWriteAcces } from '../../../components/X/XWriteAccess';
// import { OrganizationDataListCard } from '../../../components/DataListCard';
import { InfiniteListContainer, XInfiniteListItem } from '../../../components/withInfiniteList';
import { XCloudImage } from '../../../components/X/XCloudImage';
import { XLink } from '../../../components/X/XLink';
// import { ListCard } from '../../../components/ListCard';
import {
    DataList, DataListFilters, DataListContent, DataListRadio,
    DataListRadioItem, DataListSearch
} from '../../../components/DataList';
import { withLoader } from '../../../components/withLoader';
import { XHead } from '../../../components/X/XHead';

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
                                url: '/projects/' + project.slug,
                                picture: project.preview
                            };
                        }

                        let projectsLenght: number = item.constructorIn!!.length + item.developerIn!!.length

                        return (
                            <XInfiniteListItem key={item.id}>
                                <div className="x-card-test organization">
                                    <div className="x-card-photo">
                                        <XLink path={'/organizations/' + item.slug}>
                                            {item.logo && (<XCloudImage src={item.logo} maxWidth={140} maxHeight={140}/>)}
                                            {!item.logo && (<div className="x-card--photo no-photo">{}</div>)}
                                        </XLink>
                                    </div>
                                    <div className="x-card-box">
                                        <div className="x-card-topRow">
                                            <div className="x-card-title">
                                                <div className="title">{item.title}</div>
                                                <div className="description">{subtitle}</div>
                                            </div>
                                            <div className="x-card-link">
                                                <div className="link-icon">1</div>
                                            </div>
                                        </div>
                                        <div className="x-card-bottomRow">
                                            <div className="x-card-count">
                                                <div className="count-title">{projectsLenght}</div>
                                                <div className="count-description">recent projects</div>
                                            </div>
                                            {featured && (
                                                <div className="x-card-project">
                                                    <div className="project-img">
                                                        <img src={featured.picture.retina}/>
                                                    </div>
                                                    <div className="project-description">
                                                        <div className="title">{featured.title}</div>
                                                        <div className="description">featured project</div>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="x-card-details">
                                                <a className="show">VIEW PROFILE</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </XInfiniteListItem>
                        )
                    })}
                </InfiniteListContainer>
            </DataListContent>
        </DataList>
        </>
    );
})));