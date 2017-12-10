import * as React from 'react';
import { DataList, DataListFilters, DataListSearch, DataListContent } from '../../../components/DataList';
import { Header } from '../../../components/Header';
import { withPermitsQuery, Permit } from '../../../api/Permits';
import { withInfiniteList } from '../../../components/withInfiniteList';
import { XBreadcrumbs, XBreadcrumbItem } from '../../../components/X/XBreadcrumbs';
import { withPage } from '../../../components/withPage';
import { DataListRow } from '../../../components/DataListRow';

const PermitsItems = withInfiniteList<Permit>((item) => {
    return <DataListRow>{item.id}</DataListRow>;
});

const Index = withPermitsQuery((props) => {
    return (
        <React.Fragment>
            <Header />
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
});

export default withPage(Index);