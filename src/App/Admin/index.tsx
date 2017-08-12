import * as React from 'react';
import * as S from 'semantic-ui-react';
import { Route } from 'react-router';
import { withAdminCities } from '../../api/';

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
            <Route path="/admin/">
                <AdminCities />
            </Route>
            <Route path="/admin/:cityId/" />
        </S.Container>
    );
}