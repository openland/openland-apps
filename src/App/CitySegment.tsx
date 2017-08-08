import * as React from 'react';
import * as S from 'semantic-ui-react';
import Markdown from 'react-markdown';

export function CitySegment() {
    const subtitle = 'Track, analyze and make decisions about San Francisco housing performance.';
    return (
        <div style={{ paddingTop: 16 }}>
            <S.Container>
                <S.Segment.Group>
                    <S.Segment>
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
                        <S.Menu pointing={true} secondary={true}>
                            <S.Menu.Item name="Home" active={true} />
                            <S.Menu.Item name="Benchmarks" />
                            <S.Menu.Item name="Reports" />
                            <S.Menu.Item name="Datasets" />
                            <S.Menu.Item name="Discussions" />
                        </S.Menu>
                        <Markdown source={'asdasdasd'} />
                    </S.Segment>
                </S.Segment.Group>
            </S.Container>
        </div>
    );
}