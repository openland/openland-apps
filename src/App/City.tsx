import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';

import { Loader } from 'semantic-ui-react';

import { withCityQuery, CityState } from '../queries';

import CityHeader from './CityHeader';
import CityFooter from './Footer';
import { CityHome } from './CityHome';
import { CitySegment } from './Segment/CitySegment';

const CityRender = withCityQuery(function (props: CityState) {
    if (props.data.loading) {
        return <Loader size="big" active={true} />;
    } else if (props.data.error != null) {
        return (
            <div>
                {props.data.error.message}
            </div>
        );
    } else if (props.data.city == null) {
        return (
            <div>
                City not found
            </div>
        );
    } else {
        return (
            <div>
                <CityHeader title={props.data.city.name} me={props.data.me} />
                <Route exact={true} path="/city/:city/" component={CityHome} />
                <Route path="/city/:city/:segment" component={CitySegment} />
                <CityFooter />
            </div>
        );
    }
});

function City(props: RouteComponentProps<{ city: string }>) {
    return (
        <CityRender id={props.match.params.city} />
    );
}

export default City;