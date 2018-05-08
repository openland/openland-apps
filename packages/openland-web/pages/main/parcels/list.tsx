import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { withParcels } from '../../../api/';
import { AppFilters } from '../../../components/App/AppFilters';
import { TableParcels } from '../../../components/TableParcels';
import { XHeader } from 'openland-x/XHeader';
import { Scaffold } from '../../../components/Scaffold';
import { CitySelector } from '../../../components/Incubator/CitySelector';
import { XHorizontal } from 'openland-x/XHorizontal';
import { withRouter } from 'openland-x-routing/withRouter';
import { XButton } from 'openland-x/XButton';
import { XFooter } from 'openland-x/XFooter';
import { XLoader } from 'openland-x/XLoader';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';

const Content = withParcels((props) => {
    let city = props.router.query.city || 'nyc';
    let cityName = city === 'sf' ? 'San Francisco' : 'New York';
    return (
        <>
            <XDocumentHead title={['Parcels']} />
            <Scaffold>
                <Scaffold.Content>
                    <XHeader text={
                        <CitySelector title={cityName} >
                            <CitySelector.Popper>
                                <XHorizontal>
                                    <XButton query={{ field: 'city', value: 'sf' }} style={city !== 'sf' ? 'default' : 'primary'} autoClose={true} text="San Francisco" />
                                    <XButton query={{ field: 'city', value: 'nyc' }} style={city !== 'sf' ? 'default' : 'primary'} autoClose={true} text="New York" />
                                </XHorizontal>
                            </CitySelector.Popper>
                        </CitySelector>}
                        description={props.data.items.pageInfo.itemsCount + ' parcels found'}>
                        <AppFilters
                            isActive={true}
                            onChange={(v) => props.router.pushQuery('query', v ? JSON.stringify(v) : undefined)}
                            city={cityName}
                        />
                    </XHeader>
                    <XLoader loading={props.data.loading || false}>
                        <TableParcels items={props.data.items.edges.map((v) => v.node)} showCity={false} />
                    </XLoader>
                    <XFooter text={props.data.items.pageInfo.itemsCount + ' items'}>
                        {props.data.items.pageInfo.currentPage > 1 && (
                            <XButton query={{ field: 'page', value: (props.data.items.pageInfo.currentPage - 1).toString() }}>Prev</XButton>
                        )}
                        {(props.data.items.pageInfo.currentPage < props.data.items.pageInfo.pagesCount - 1) && (
                            <XButton query={{ field: 'page', value: (props.data.items.pageInfo.currentPage + 1).toString() }}>Next</XButton>
                        )}
                    </XFooter>
                </Scaffold.Content>
            </Scaffold>
        </>
    );
});

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