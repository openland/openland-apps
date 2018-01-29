import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { withOrganizationsQuery, withOrganizationAddMutation } from '../../../api/Organizations';
import { XForm, XFormField, XFormSubmit, XFormGroup } from '../../../components/X/XForm';
import { XWriteAcces } from '../../../components/X/XWriteAccess';
// import { OrganizationDataListCard } from '../../../components/DataListCard';
import { InfiniteListContainer } from '../../../components/withInfiniteList'; // XInfiniteListItem
import { ListCard } from '../../../components/ListCard';
import {
    DataList, DataListFilters, DataListContent, DataListRadio,
    DataListRadioItem, DataListSearch
} from '../../../components/DataList';
import { withLoader } from '../../../components/withLoader';
import { XHead } from '../../../components/X/XHead';

import {
    ListCardContainer,
    ListCardImageElement,
    ListCardTopBarElement,
    ListCardDownBarElement
} from '../../../components/NewListCard';

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
                    <ListCardContainer>
                        <ListCardImageElement>
                            <img src="https://www.wmj.ru/imgs/2016/12/05/09/929194/d1bbd77c2612ef45eee03defa5c373710d7c56e8.jpg"/>
                        </ListCardImageElement>
                        <div className="x-card--box">
                            <ListCardTopBarElement>
                                <div className="x-card--title">
                                    Card Title
                                </div>
                                <div className="x-card--description">
                                    Card Description
                                </div>
                            </ListCardTopBarElement>
                            <ListCardDownBarElement>
                                <div className="x-card--details">
                                    Card Details
                                </div>
                            </ListCardDownBarElement>
                        </div>
                    </ListCardContainer>
                </InfiniteListContainer>

                <ListCard cardData={data} cardType={'organizations'} />
            </DataListContent>
        </DataList>
        </>
    );
})));