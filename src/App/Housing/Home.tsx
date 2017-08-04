import * as React from 'react';
import { Segment, Container, Header, Menu, Label, Grid } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import { Doughnut, Item } from '../Components/Doughnut';
// import Counter from '../Components/Counter';

export default function () {
    return (
        <div className="ver">
            <div className="housing-bg">
                <Container text={true} textAlign="center">
                    <Header
                        inverted={true}
                        as="h1"
                        content="San Francisco Housing Performance Portal"
                        style={{marginTop: 32}}
                    />
                    <Header
                        inverted={true}
                        as="h3"
                        content="Track, analyze and make decisions about San Francisco housing performance."
                    />

                    <Menu compact={true} style={{ marginTop: 80 }}>
                        <Menu.Item to="/app/zoning" as={NavLink}>Zoning</Menu.Item>
                        <Menu.Item to="/app/pipeline" as={NavLink}>Pipeline</Menu.Item>
                        <Menu.Item disabled={true}>Permits</Menu.Item>
                        <Menu.Item disabled={true}>Finance</Menu.Item>
                        <Menu.Item disabled={true}>Policy</Menu.Item>
                        <Menu.Item disabled={true}>Homeless</Menu.Item>
                    </Menu>
                </Container>
            </div>
            <Container>
                <Header
                    as="h2"
                    content="San Francisco now"
                    disabled={true}
                    style={{ paddingTop: 32, paddingLeft: 8 }}
                />
                <Grid columns={3}>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment padded={true}>
                                <Label attached="top left">Race</Label>
                                <Doughnut>
                                    <Item title="White" value={48.5} />
                                    <Item title="Black" value={6.1} />
                                    <Item title="American Indian" value={0.5} />
                                    <Item title="Japanese" value={1.3} />
                                    <Item title="Chinese" value={21.4} />
                                    <Item title="Filipino" value={4.5} />
                                    <Item title="Other Non-White" value={17.8} />
                                </Doughnut>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment padded={true}>
                                <Label attached="top left">Age</Label>
                                <Doughnut>
                                    <Item title="0-14" value={89964} />
                                    <Item title="15-24" value={95224} />
                                    <Item title="25-44" value={301802} />
                                    <Item title="45-59" value={163515} />
                                    <Item title="60+" value={154730} />
                                </Doughnut>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment padded={true}>
                                <Label attached="top left">All Units</Label>
                                <Doughnut>
                                    <Item title="No Bedroom" value={13.8} />
                                    <Item title="1 Bedroom" value={27.1} />
                                    <Item title="2 Bedrooms" value={30.9} />
                                    <Item title="3 Bedrooms" value={19.1} />
                                    <Item title="4 Bedroom" value={6.6} />
                                    <Item title="5 or more Bedrooms" value={2.6} />
                                </Doughnut>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                {/* <Segment>
                    
                </Segment> */}
                {/* <Segment.Group vertical={true}>
                    
                    <h1>Zoning <a href="#">read more...</a></h1>
                </Segment.Group> */}
            </Container>

            <div style={{ height: 260 }} />

            {/* <div className="card-row">
                <div className="card-4">
                    <Doughnut>
                        <Item title="Hispanic" value={120} />
                        <Item title="Russian" value={120} />
                        <Item title="Black" value={120} />
                    </Doughnut>
                </div>
                <div className="card-2">
                    <Counter name="Counter1" value="123" />
                </div>
                <div className="card-2">
                    <Counter name="Counter1" value="123" />
                </div>
                <div className="card-2">
                    <Counter name="Counter1" value="123" />
                </div>
            </div>
            <h1>Pipeline <a href="#">read more...</a></h1>
            <div className="card-row">
                <div className="card-4">
                    <Doughnut>
                        <Item title="Hispanic" value={120} />
                        <Item title="Russian" value={120} />
                        <Item title="Black" value={120} />
                    </Doughnut>
                </div>
                <div className="card-2">
                    <Counter name="Counter1" value="123" />
                </div>
                <div className="card-2">
                    <Counter name="Counter1" value="123" />
                </div>
                <div className="card-2">
                    <Counter name="Counter1" value="123" />
                </div>
            </div> */}
        </div>
    );
}