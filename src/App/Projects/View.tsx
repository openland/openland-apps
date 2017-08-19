import * as React from 'react';
import { withLoader } from '../Components/withLoader';
import { withProjectQuery } from '../../api/';
import * as S from 'semantic-ui-react';

const ViewRender = withProjectQuery(withLoader((props) => {
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
            Project
        </S.Container>
    );
}));

export default ViewRender;