import * as React from 'react';
import { Container, Header, Grid, Segment, Label, Card as Card2, Image, Progress } from 'semantic-ui-react';
// import { NavLink } from 'react-router-dom';

import { Doughnut, Item } from '../Components/Doughnut';
import { Card } from '../Components/Card';

const SourceHousingElement = { title: 'Housing Element 2014', link: '#' };
const VoteStyle: React.CSSProperties = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'block',
    marginTop: 4,
    marginBottom: 4
};
export default function () {

    return (
        <div className="ver">
            <div className="housing-bg">
                <Container text={true} textAlign="center">
                    <Header
                        inverted={true}
                        as="h1"
                        content="San Francisco Housing Performance Portal"
                        style={{ marginTop: 32 }}
                    />
                    <Header
                        inverted={true}
                        as="h3"
                        content="Track, analyze and make decisions about San Francisco housing performance."
                    />

                    {/* <Menu compact={true} style={{ marginTop: 80 }}>
                        <Menu.Item to="/app/zoning" as={NavLink}>Zoning</Menu.Item>
                        <Menu.Item to="/app/pipeline" as={NavLink}>Pipeline</Menu.Item>
                        <Menu.Item disabled={true}>Permits</Menu.Item>
                        <Menu.Item disabled={true}>Finance</Menu.Item>
                        <Menu.Item disabled={true}>Policy</Menu.Item>
                        <Menu.Item disabled={true}>Homeless</Menu.Item>
                    </Menu> */}

                    <Progress 
                        inverted={true} 
                        percent={56} 
                        indicating={true} 
                        progress={true} 
                        style={{ marginTop: 80 }} 
                    />
                    <Header
                        inverted={true}
                        as="h4"
                        content="Milestone: Q4 Report"
                        style={{ marginTop: -10 }}
                    />
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
                    <Grid.Row stretched={true}>
                        <Grid.Column>
                            <Card
                                title="Race"
                                source={SourceHousingElement}
                                description="Race disctribution in SanFrancisco"
                            >
                                <Doughnut>
                                    <Item title="White" value={48.5} />
                                    <Item title="Black" value={6.1} />
                                    <Item title="American Indian" value={0.5} />
                                    <Item title="Japanese" value={1.3} />
                                    <Item title="Chinese" value={21.4} />
                                    <Item title="Filipino" value={4.5} />
                                    <Item title="Other Non-White" value={17.8} />
                                </Doughnut>
                            </Card>
                        </Grid.Column>
                        <Grid.Column>
                            <Card title="Age" source={SourceHousingElement}>
                                <Doughnut>
                                    <Item title="0-14" value={89964} />
                                    <Item title="15-24" value={95224} />
                                    <Item title="25-44" value={301802} />
                                    <Item title="45-59" value={163515} />
                                    <Item title="60+" value={154730} />
                                </Doughnut>
                            </Card>
                        </Grid.Column>
                        <Grid.Column>
                            <Card2>
                                <Image src="/img/tom.jpg" />
                                <Card2.Content>
                                    <Card2.Header>Tom Paris</Card2.Header>
                                    <Card2.Description>
                                        Tom Paris is the son of Starfleet Admiral Owen Paris and a scion of a
                                        family with a long history of illustrious service in Starfleet. Following
                                        in his family's tradition, Paris attended Starfleet Academy sometime in the
                                        2350s and majored in astrophysics. A gifted pilot, Paris earned an assignment
                                        to the Academy's honor squadron.
                                    </Card2.Description>
                                </Card2.Content>
                            </Card2>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Card title="Unit Sizes" source={SourceHousingElement}>
                                <Doughnut>
                                    <Item title="No Bedroom" value={13.8} />
                                    <Item title="1 Bedroom" value={27.1} />
                                    <Item title="2 Bedrooms" value={30.9} />
                                    <Item title="3 Bedrooms" value={19.1} />
                                    <Item title="4 Bedroom" value={6.6} />
                                    <Item title="5 or more Bedrooms" value={2.6} />
                                </Doughnut>
                            </Card>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment style={{ height: 160 }} padded={true}>
                                <Label attached="top left">Top Requests</Label>
                                <div style={VoteStyle}>
                                    <Label
                                        color="teal"
                                        content="32"
                                        size="small"
                                        circular={true}
                                    />
                                    Income by House size
                                </div>
                                <div style={VoteStyle}>
                                    <Label
                                        color="teal"
                                        content="32"
                                        size="small"
                                        circular={true}
                                    />
                                    Income by House size
                                </div>
                                <div style={VoteStyle}>
                                    <Label
                                        color="teal"
                                        content="32"
                                        size="small"
                                        circular={true}
                                    />
                                    Income by House size asd asd asd asd asd asd
                                </div>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>

            <div style={{ height: 260 }} />
        </div>
    );
}