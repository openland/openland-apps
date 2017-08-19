import * as React from 'react';
import * as S from 'semantic-ui-react';
import * as X from '../Components';
import Markdown from 'react-markdown';

const intro = `
San Francisco is a unique city with it's own main problems. One of the main problems here is a affordable housing.
`;

const data = [
    { year: 1977, value: 2 },
    { year: 1978, value: 4 },
    { year: 1979, value: 21 },
    { year: 1980, value: 19 },

    { year: 1981, value: 83 },
    { year: 1982, value: 73 },
    { year: 1983, value: 111 },
    { year: 1984, value: 75 },
    { year: 1985, value: 152 },
    { year: 1986, value: 65 },
    { year: 1987, value: 47 },
    { year: 1988, value: 55 },
    { year: 1989, value: 41 },
    { year: 1990, value: 50 },
    { year: 1991, value: 49 },
    { year: 1992, value: 47 },

    { year: 1993, value: 22 },
    { year: 1994, value: 21 },
    { year: 1995, value: 42 },
    { year: 1996, value: 25 },
    { year: 1997, value: 35 },
    { year: 1998, value: 42 },

    { year: 1999, value: 43 },
    { year: 2000, value: 86 },
    { year: 2001, value: 57 },
    { year: 2002, value: 37 },
    { year: 2003, value: 20 },
    { year: 2004, value: 42 },

    { year: 2005, value: 52 },
    { year: 2006, value: 49 },
    { year: 2007, value: 31 },
    { year: 2008, value: 17 },
    { year: 2009, value: 13 },

    { year: 2010, value: 32 },
    { year: 2011, value: 29 },
    { year: 2012, value: 39 },
    { year: 2013, value: 54 },
    { year: 2014, value: 62 },

    { year: 2015, value: 64 },
    { year: 2016, value: 95 },
    { year: 2017, value: 27 }
];

const dataUnits = [
    { year: 1977, value: 2 },
    { year: 1978, value: 4 },
    { year: 1979, value: 21 },
    { year: 1980, value: 19 },

    { year: 1981, value: 83 },
    { year: 1982, value: 73 },
    { year: 1983, value: 111 },
    { year: 1984, value: 75 },
    { year: 1985, value: 152 },
    { year: 1986, value: 65 },
    { year: 1987, value: 47 },
    { year: 1988, value: 55 },
    { year: 1989, value: 41 },
    { year: 1990, value: 50 },
    { year: 1991, value: 49 },
    { year: 1992, value: 47 },

    { year: 1993, value: 22 },
    { year: 1994, value: 21 },
    { year: 1995, value: 42 },
    { year: 1996, value: 25 },
    { year: 1997, value: 35 },
    { year: 1998, value: 42 },

    { year: 1999, value: 43 },
    { year: 2000, value: 86 },
    { year: 2001, value: 57 },
    { year: 2002, value: 37 },
    { year: 2003, value: 20 },
    { year: 2004, value: 42 },

    { year: 2005, value: 52 },
    { year: 2006, value: 49 },
    { year: 2007, value: 31 },
    { year: 2008, value: 17 },
    { year: 2009, value: 13 },

    { year: 2010, value: 32 },
    { year: 2011, value: 29 },
    { year: 2012, value: 39 },
    { year: 2013, value: 54 },
    { year: 2014, value: 62 },

    { year: 2015, value: 64 },
    { year: 2016, value: 95 },
    { year: 2017, value: 27 }
];

export default function () {

    const subtitle = 'Track, analyze and make decisions about San Francisco performance.';
    const pageTitle = 'San Francisco Performance Portal';

    var records = data.map((iter) => {
        return <X.Item title={'' + iter.year} value={iter.value} />;
    });
    var unitRecords = dataUnits.map((iter) => {
        return <X.Item title={'' + iter.year} value={iter.value} />;
    });
    return (
        <S.Container style={{paddingTop: 32}}>
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
            <S.Segment>
                <S.Grid divided="vertically" padded={true}>
                    <S.GridRow>
                        <S.GridColumn width={4}>
                            <S.Header
                                as="h4"
                                content="Root Problems"
                            />

                            <div style={{ whiteSpace: 'nowrap' }}>
                                <S.Icon name="warning" color="red" /> Shortage of affordable housing
                                    </div>
                            <div style={{ whiteSpace: 'nowrap' }}>
                                <S.Icon name="warning" color="red" /> 7499 homeless on the streets
                                    </div>
                        </S.GridColumn>
                        <S.GridColumn width={12}>
                            <S.Header
                                as="h4"
                                content="Introduction"
                            />
                            <Markdown source={intro} />
                        </S.GridColumn>
                    </S.GridRow>
                </S.Grid>
            </S.Segment>
            <S.Header as="h2">
                <S.HeaderContent>
                    Key Benchmarks
                        <S.HeaderSubheader>
                        <a href="#">View All</a>
                    </S.HeaderSubheader>
                </S.HeaderContent>
            </S.Header>

            <S.Grid columns={12} stretched={true}>
                <S.Grid.Row>
                    <S.GridColumn width={5}>
                        <S.Segment>
                            <S.Label attached="top">New Building Permits</S.Label>
                            <X.LineChart title="Year">
                                {records}
                            </X.LineChart>
                        </S.Segment>
                    </S.GridColumn>
                    <S.GridColumn width={5}>
                        <S.Segment>
                            <S.Label attached="top">New Unit Permits</S.Label>
                            <X.LineChart title="Year">
                                {unitRecords}
                            </X.LineChart>
                        </S.Segment>
                    </S.GridColumn>
                    <S.GridColumn width={5}>
                        <S.Segment>
                            <S.Label attached="top">New Unit Permits</S.Label>
                            <X.LineChart title="Year">
                                {unitRecords}
                            </X.LineChart>
                        </S.Segment>
                    </S.GridColumn>
                </S.Grid.Row>
            </S.Grid>
        </S.Container>
    );
}