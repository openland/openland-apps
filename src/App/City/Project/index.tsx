import * as React from 'react';
import * as S from 'semantic-ui-react';

import SegmentHome from './Home';
import SegmentBench from './Benchmarks';
import SegmentDatasets from './Datasets';
import { Route } from 'react-router-dom';
import { withProjectQuery } from '../../../api/';

export const CitySegment = withProjectQuery((props) => {
    if (props.data.loading) {
        return <S.Loader size="big" active={true} />;
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
    } else if (props.data.city.project == null) {
        return (
            <div>
                Segment not found
            </div>
        );
    }
    return (
        <div style={{ paddingTop: 16 }}>
            <S.Container>
                <Route exact={true} path="/city/:cityId/:projectId/" component={SegmentHome} />
                <Route exact={true} path="/city/:cityId/:projectId/benchmarks" component={SegmentBench} />
                <Route exact={true} path="/city/:cityId/:projectId/sources" component={SegmentDatasets} />
            </S.Container>
        </div>
    );
});