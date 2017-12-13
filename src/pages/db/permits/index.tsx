import * as React from 'react';
import { DataList, DataListFilters, DataListSearch, DataListContent } from '../../../components/DataList';
import { withPermitsQuery, Permit } from '../../../api/Permits';
import { withInfiniteList } from '../../../components/withInfiniteList';
import { XBreadcrumbs, XBreadcrumbItem } from '../../../components/X/XBreadcrumbs';
import { withPage } from '../../../components/withPage';
import { Link } from '../../../components/Link';
import { XContainer } from '../../../components/X/XContainer';
import { Segment } from 'semantic-ui-react';
const PermitsItems = withInfiniteList<Permit>((item) => {
    return <Segment><Link path={'/db/permits/' + item.id}>{item.id}</Link></Segment>;
});

export default withPage(withPermitsQuery((props) => {
    return (
        <React.Fragment>
            <XContainer wide={true}>
                <XBreadcrumbs>
                    <XBreadcrumbItem path="/" title="Home" />
                    <XBreadcrumbItem path="/pipeline" title="Pipeline" />
                </XBreadcrumbs>
            </XContainer>
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