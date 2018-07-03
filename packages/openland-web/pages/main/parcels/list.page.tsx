import '../../init';
import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { withParcels } from '../../../api/withParcels';
import { TableParcels } from '../../../components/TableParcels';
import { XHeader } from 'openland-x/XHeader';
import { Scaffold } from '../../../components/Scaffold';
import { withRouter } from 'openland-x-routing/withRouter';
import { XButton } from 'openland-x/XButton';
import { XFooter } from 'openland-x/XFooter';
import { XLoader } from 'openland-x/XLoader';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XVertical } from 'openland-x-layout/XVertical';
import { withQueryLoader } from '../../../components/withQueryLoader';

const Content = withParcels(withQueryLoader((props) => {
    return (
        <>
            <XDocumentHead title={['Parcels']} />
            <Scaffold>
                <Scaffold.Content>
                    <XHeader
                        text="Something"
                        description={props.data.items.pageInfo.itemsCount + ' parcels found'}
                    />
                    <XVertical>
                        <XLoader loading={props.loading || false} />
                        <TableParcels items={props.data.items.edges.map((v) => v.node)} showCity={false} />
                        <XFooter text={props.data.items.pageInfo.itemsCount + ' items'}>
                            {props.data.items.pageInfo.currentPage > 1 && (
                                <XButton text="Prev" query={{ field: 'page', value: (props.data.items.pageInfo.currentPage - 1).toString() }} />
                            )}
                            {(props.data.items.pageInfo.currentPage < props.data.items.pageInfo.pagesCount - 1) && (
                                <XButton text="Next" query={{ field: 'page', value: (props.data.items.pageInfo.currentPage + 1).toString() }} />
                            )}
                        </XFooter>
                    </XVertical>
                </Scaffold.Content>
            </Scaffold>
        </>
    );
}));

export default withApp('Parcels', 'viewer', withRouter((props) => {
    let city = props.router.query.city || 'nyc';
    let cityName = city === 'sf' ? 'San Francisco' : 'New York';
    let countyName = city === 'sf' ? 'San Francisco' : 'New York';
    let stateName = city === 'sf' ? 'CA' : 'NY';
    // console.warn(city);
    // let defaultCity = 'sf';
    // if (props.roles.find((v) => v === 'feature-city-nyc-force')) {
    //     defaultCity = 'nyc';
    // }

    return (<Content variables={{ state: stateName, county: countyName, city: cityName }} />);
}));