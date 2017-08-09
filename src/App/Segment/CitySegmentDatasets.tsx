import * as React from 'react';
import * as S from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';
import { withDatasetsQuery, DataSetsState } from '../../queries';

const DatasetsRender = withDatasetsQuery(function (props: DataSetsState &
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

    var datasets = props.data.city.segment.datasets.map((d) => {
        return (
            <S.Item onClick={() => { window.location.href = d.link; }}>
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
                content="Data Sources for out benchmarks"
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

export default function (props: RouteComponentProps<{ city: string, segment: string }>) {
    return (
        <DatasetsRender id={props.match.params.segment} city={props.match.params.city} {...props} />
    );
}