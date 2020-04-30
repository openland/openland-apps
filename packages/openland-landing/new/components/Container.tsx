import * as React from 'react';
import { css, cx } from 'linaria';

const box = css`
    margin: 0 auto;
    padding: 0 16px;
    box-sizing: border-box;

    @media (min-width: 1600px) {
        width: 1172px;

        &.is-small {
            width: 1027px;
        }
    }

    @media (min-width: 960px) and (max-width: 1599px) {
        width: 960px;
    }

    @media (min-width: 768px) and (max-width: 959px) {
        width: 768px;
    }

    @media (max-width: 767px) {
        min-width: 320px;
        max-width: 400px;

        &.in-header {
            max-width: initial;
        }
    }
`;

interface ContainerProps {
    isSmall?: boolean;
    inHeader?: boolean;
    children: any;
}

export const Container = React.memo((props: ContainerProps) => (
    <div className={cx(box, props.isSmall && 'is-small', props.inHeader && 'in-header')}>
        {props.children}
    </div>
));
