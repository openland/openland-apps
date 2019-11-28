import * as React from 'react';
import { css, cx } from 'linaria';
import Block from './block';

const root = css``;

const features = css``;

export default () => (
    <div className={root}>
        <Block>
            <div className={features}>features</div>
        </Block>
    </div>
);
