import * as React from 'react';
import * as S from 'semantic-ui-react';

export default function () {
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
                            <S.Item>
                                <S.Item.Image src="/img/sf.jpg" size="tiny" />
                                <S.Item.Content verticalAlign="middle">
                                    <S.Item.Header>Housing dataset</S.Item.Header>
                                    <S.Item.Description>Population dataset</S.Item.Description>
                                </S.Item.Content>
                            </S.Item>
                            <S.Item>
                                <S.Item.Image src="/img/sf.jpg" size="tiny" />
                                <S.Item.Content verticalAlign="middle">
                                    <S.Item.Header>Housing dataset</S.Item.Header>
                                    <S.Item.Description>Population dataset</S.Item.Description>
                                </S.Item.Content>
                            </S.Item>
                            <S.Item>
                                <S.Item.Image src="/img/sf.jpg" size="tiny" />
                                <S.Item.Content verticalAlign="middle">
                                    <S.Item.Header>Housing dataset</S.Item.Header>
                                    <S.Item.Description>Population dataset</S.Item.Description>
                                </S.Item.Content>
                            </S.Item>
                            <S.Item>
                                <S.Item.Image src="/img/sf.jpg" size="tiny" />
                                <S.Item.Content verticalAlign="middle">
                                    <S.Item.Header>Housing dataset</S.Item.Header>
                                    <S.Item.Description>Population dataset</S.Item.Description>
                                </S.Item.Content>
                            </S.Item>
                        </S.Item.Group>
                    </S.GridColumn>
                </S.Grid>
            </S.Segment>
        </div>
    );
}