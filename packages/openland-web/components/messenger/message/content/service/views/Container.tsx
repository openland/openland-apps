import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';

const spanWithWhiteSpacesClassName = css`
    font-family: SFProText-Regular;
    white-space: pre-wrap;
    text-align: center;
    color: #7f7f7f;
    & > strong {
        font-family: SFProText-Semibold;
        color: #7f7f7f;
    }
`;

const SpanWithWhiteSpaces = ({ children }: { children: any }) => (
    <span className={spanWithWhiteSpacesClassName}>{children}</span>
);

export const Container = ({ children }: { children: any }) => (
    <XView flexDirection="column" alignItems="center">
        <XView flexDirection="row" alignItems="center" color={'#99a2b0'}>
            <SpanWithWhiteSpaces>{children}</SpanWithWhiteSpaces>
        </XView>
    </XView>
);