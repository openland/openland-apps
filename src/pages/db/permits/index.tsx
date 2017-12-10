import * as React from 'react';
import { DataList, DataListFilters, DataListSearch, DataListContent } from '../../../components/DataList';
import { withPermitsQuery, Permit } from '../../../api/Permits';
import { withInfiniteList } from '../../../components/withInfiniteList';
import { XBreadcrumbs, XBreadcrumbItem } from '../../../components/X/XBreadcrumbs';
import { withPage } from '../../../components/withPage';
import { DataListRow } from '../../../components/DataListRow';
import { Link } from '../../../components/Link';

const PermitsItems = withInfiniteList<Permit>((item) => {
    return <DataListRow><Link path={'/db/permits/' + item.id}>{item.id}</Link></DataListRow>;
});

export default withPage(withPermitsQuery((props) => {
    return (
        <React.Fragment>
            <XBreadcrumbs>
                <XBreadcrumbItem path="/" title="Home" />
                <XBreadcrumbItem path="/pipeline" title="Pipeline" />
            </XBreadcrumbs>
            <DataList>
                <DataListFilters title="Pipeline Filters">
                    <DataListSearch searchKey="filter" />
                </DataListFilters>
                <DataListContent>
                    <PermitsItems data={props.data} />
                </DataListContent>
            </DataList>
        </React.Fragment>
    );
}));