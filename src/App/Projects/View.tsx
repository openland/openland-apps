import * as React from 'react';
import { withLoader } from '../Components/withLoader';
import { withProjectQuery } from '../../api/';
import * as S from 'semantic-ui-react';
import * as C from '../Components';

const ViewRender = withProjectQuery(withLoader((props) => {
    return (
        <C.Page title="Projects">
            <S.Segment attached={true}>
                <S.Grid>
                    <S.Grid.Row>
                        <S.Grid.Column width={2}>
                            <S.Image src="/img/sf.jpg" size="small" />
                        </S.Grid.Column>
                        <S.Grid.Column width={14}>
                            <S.Header
                                as="h1"
                                content={props.data.project.name}
                                textAlign="left"
                                style={{ marginTop: 16 }}
                            />
                            <S.Header
                                as="h3"
                                content={'Some Description'}
                                textAlign="left"
                                style={{ marginTop: 16, opacity: 0.6 }}
                            />
                        </S.Grid.Column>
                    </S.Grid.Row>
                </S.Grid>
            </S.Segment>
            <S.Menu attached={'bottom'}>
                <S.MenuItem content="Summary" as="a" />
                <S.MenuItem content="Documents" as="a" />
                <S.MenuItem content="Metrics" as="a" />
                <S.MenuItem content="Datasets" as="a" />
            </S.Menu>
            <S.Segment>
                <S.Header as="h4" content="Message" />
                <S.Input />
            </S.Segment>
            <S.Segment>
                <S.Feed>
                    <S.Feed.Event>
                        <S.Feed.Label>
                            <S.Icon name="pencil" />
                        </S.Feed.Label>
                        <S.Feed.Content>
                            <S.Feed.Date>Today</S.Feed.Date>
                            <S.Feed.Summary>
                                You posted on your friend <a>Stevie Feliciano's</a> wall.
                            </S.Feed.Summary>
                        </S.Feed.Content>
                    </S.Feed.Event>
                </S.Feed>
            </S.Segment>
        </C.Page>
    );
}));

export default ViewRender;