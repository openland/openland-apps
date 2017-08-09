import * as React from 'react';
import * as S from 'semantic-ui-react';

export default function () {
    return (
        <div
            style={{
                display: 'flex',
                height: 260, alignItems: 'center', justifyContent: 'flex-end',
                marginBottom: 64,
                flexDirection: 'column'
            }}
        >
            <S.Header as="h4" content="Statecraft LLC, San Francisco, 2017" />
            <a href="mailto:hello@statecraft.one">hello@statecraft.one</a>
        </div>
    );
}