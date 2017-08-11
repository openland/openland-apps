import * as React from 'react';
import * as S from 'semantic-ui-react';

import SegmentHome from './CitySegmentHome';
import SegmentBench from './CitySegmentBenchmarks';
import SegmentDatasets from './CitySegmentDatasets';
import { Route, RouteComponentProps } from 'react-router-dom';
import { withSegmentQuery, SegmentState } from '../../queries';

const SegmentRender = withSegmentQuery(function (props: SegmentState &
    RouteComponentProps<{ city: string, segment: string }>) {
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
    } else if (props.data.city.segment == null) {
        return (
            <div>
                Segment not found
            </div>
        );
    }

    const subtitle = 'Track, analyze and make decisions about San Francisco ' +
        props.data.city.segment.name + ' performance.';
    const pageTitle = 'San Francisco ' + props.data.city.segment.name + ' Performance Portal';

    // const currentRoot = '/city/' + props.match.params.city + '/' + props.match.params.segment;
    // function navigateTo(page: string) {
    //     props.history.push(currentRoot + page);
    // }
    // function navigationMenu(title: string, page: string, highlight: boolean = false) {
    //     var isActive = props.location.pathname === (currentRoot + page);
    //     return (
    //         <S.Menu.Item
    //             active={isActive}
    //             as="a"
    //             href={currentRoot + page}
    //             onClick={(e: {}) => {
    //                 (e as Event).preventDefault();
    //                 navigateTo(page);
    //             }}
    //         >
    //             {title}
    //             {highlight && (
    //                 <div
    //                     style={{
    //                         width: 6,
    //                         height: 6, borderRadius: 3, backgroundColor: 'red',
    //                         position: 'absolute',
    //                         top: 8,
    //                         right: 8
    //                     }}
    //                 />
    //             )}
    //         </S.Menu.Item>
    //     );
    // }
    return (
        <div style={{ paddingTop: 16 }}>
            <S.Container>
                <S.Segment attached={true}>
                    <S.Grid>
                        <S.Grid.Row>
                            <S.Grid.Column width={2}>
                                <S.Image src="/img/sf.jpg" size="small" />
                            </S.Grid.Column>
                            <S.Grid.Column width={14}>
                                <S.Header
                                    as="h1"
                                    content={pageTitle}
                                    textAlign="left"
                                    style={{ marginTop: 16 }}
                                />
                                <S.Header
                                    as="h3"
                                    content={subtitle}
                                    textAlign="left"
                                    style={{ marginTop: 16, opacity: 0.6 }}
                                />
                            </S.Grid.Column>
                        </S.Grid.Row>
                    </S.Grid>
                </S.Segment>


                <Route exact={true} path="/city/:city/:segment/" component={SegmentHome} />
                <Route exact={true} path="/city/:city/:segment/benchmarks" component={SegmentBench} />
                <Route exact={true} path="/city/:city/:segment/sources" component={SegmentDatasets} />
            </S.Container>
        </div>
    );

});

export function CitySegment(props: RouteComponentProps<{ city: string, segment: string }>) {
    return (
        <SegmentRender id={props.match.params.segment} city={props.match.params.city} {...props} />
    );
}