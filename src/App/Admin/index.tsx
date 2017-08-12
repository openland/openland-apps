import * as React from 'react';
import * as S from 'semantic-ui-react';

export default function () {
    return (
        <S.Container>
            <S.Menu>
                <S.MenuItem content="Cities" />
                <S.MenuItem content="Projects" />
            </S.Menu>
        </S.Container>
    );
}