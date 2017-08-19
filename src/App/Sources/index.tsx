import * as React from 'react';
import * as S from 'semantic-ui-react';
import { withDatasetsQuery } from '../../api/';
import { withLoader } from '../Components/withLoader';
const DatasetsRender = withDatasetsQuery(withLoader((props) => {
    var datasets = props.data.datasets.map((d) => {
        return (
            <S.Item onClick={() => { window.open(d.url, '_blank'); }} key={d.id}>
                <S.Item.Image src="/img/sf.jpg" size="tiny" />
                <S.Item.Content verticalAlign="middle">
                    <S.Item.Header>{d.name}</S.Item.Header>
                    <S.Item.Description>{d.description}</S.Item.Description>
                    <S.Item.Meta><S.Label size="small">{d.kind.toUpperCase()}</S.Label></S.Item.Meta>
                </S.Item.Content>
            </S.Item>
        );
    });

    return (
        <S.Container style={{ paddingTop: 32 }}>
            <S.Header
                as="h3"
                content="Data Sources used in this project"
                attached={'top'}
                block={true}
            />
            <S.Segment attached={'bottom'}>
                <S.Grid>
                    <S.GridColumn width={4}>
                        <S.Menu pointing={true} vertical={true} secondary={true} fluid={true}>
                            <S.MenuItem active={true} as="a">All</S.MenuItem>
                            <S.MenuItem as="a">Datasets</S.MenuItem>
                            <S.MenuItem as="a">Documents</S.MenuItem>
                        </S.Menu>
                    </S.GridColumn>
                    <S.GridColumn stretched={true} width={12}>
                        <S.Item.Group link={true} divided={true} unstackable={true}>
                            {datasets}
                        </S.Item.Group>
                    </S.GridColumn>
                </S.Grid>
            </S.Segment>
        </S.Container>
    );
}));

export default DatasetsRender;