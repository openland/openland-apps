import * as React from 'react';
import * as S from 'semantic-ui-react';
import { withDatasetsQuery } from '../../../api/';

const DatasetsRender = withDatasetsQuery((props) => {

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

    var datasets = props.data.city.project.datasets.map((d) => {
        return (
            <S.Item onClick={() => { window.open(d.link, '_blank'); }} key={d.id}>
                <S.Item.Image src="/img/sf.jpg" size="tiny" />
                <S.Item.Content verticalAlign="middle">
                    <S.Item.Header>{d.name}</S.Item.Header>
                    <S.Item.Description>{d.description}</S.Item.Description>
                </S.Item.Content>
            </S.Item>
        );
    });

    return (
        <div>
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
                            <S.MenuItem as="a">Reports</S.MenuItem>
                        </S.Menu>
                    </S.GridColumn>
                    <S.GridColumn stretched={true} width={12}>
                        <S.Item.Group link={true} divided={true} unstackable={true}>
                            {datasets}
                        </S.Item.Group>
                    </S.GridColumn>
                </S.Grid>
            </S.Segment>
        </div>
    );
});

export default DatasetsRender;