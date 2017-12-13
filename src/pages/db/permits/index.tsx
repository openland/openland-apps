import * as React from 'react';
import { DataList, DataListFilters, DataListSearch, DataListContent } from '../../../components/DataList';
import { withPermitsQuery, Permit } from '../../../api/Permits';
import { withInfiniteList } from '../../../components/withInfiniteList';
import { withPage } from '../../../components/withPage';
import { Link } from '../../../components/Link';
import { Segment } from 'semantic-ui-react';

const PermitsItems = withInfiniteList<Permit>((item) => {
    return <Segment><Link path={'/db/permits/' + item.id}>{item.id}</Link></Segment>;
});

export default withPage(withPermitsQuery((props) => {
    return (
        <React.Fragment>
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