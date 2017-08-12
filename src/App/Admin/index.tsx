import * as React from 'react';
import * as S from 'semantic-ui-react';
import { Route } from 'react-router';
import { withAdminCities } from '../../api/';
import { AdminCity } from './City';

const AdminCities = withAdminCities((props) => {
    if (!props.data!!.loading && !props.data!!.error) {
        var cities = props.data!!.adminCities.map((city) => {
            return (
                <div>
                    {city.name}
                </div>
            );
        });
        return (
            <div>
                {cities}
            </div>
        );
    }
    return (
        <div>
            Loading...
        </div>
    );
});

export default function () {
    return (
        <S.Container>
            <Route exact={true} path="/admin/" component={AdminCities}/>
            <Route path="/admin/:cityId/" component={AdminCity} />
        </S.Container>
    );
}