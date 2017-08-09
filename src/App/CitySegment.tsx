import * as React from 'react';
import * as S from 'semantic-ui-react';

import SegmentHome from './CitySegmentHome';
import SegmentBench from './CitySegmentBenchmarks';
import SegmentDatasets from './CitySegmentDatasets';
import { Route, RouteComponentProps } from 'react-router-dom';

export function CitySegment(props: RouteComponentProps<{ city: string, segment: string }>) {
    const subtitle = 'Track, analyze and make decisions about San Francisco housing performance.';
    const currentRoot = '/city/' + props.match.params.city + '/' + props.match.params.segment;
    function navigateTo(page: string) {
        props.history.push(currentRoot + page);
    }
    function navigationMenu(title: string, page: string) {
        var isActive = props.location.pathname === (currentRoot + page);
        return <S.Menu.Item name={title} active={isActive} as="a" onClick={() => navigateTo(page)} />;
    }
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
                                    content="San Francisco Performance Dashboard"
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
                <S.Menu attached="bottom">
                    {navigationMenu('Overview', '')}
                    {navigationMenu('Benchmarks', '/benchmarks')}
                    {navigationMenu('Data Sources', '/datasets')}
                    {/* <S.Menu.Item name="Reports" /> */}
                    {/* <S.Menu.Item name="Discussions" /> */}
                </S.Menu>

                <Route exact={true} path="/city/:city/:segment/" component={SegmentHome} />
                <Route exact={true} path="/city/:city/:segment/benchmarks" component={SegmentBench} />
                <Route exact={true} path="/city/:city/:segment/datasets" component={SegmentDatasets} />
            </S.Container>
        </div>
    );
}