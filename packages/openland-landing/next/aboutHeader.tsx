import * as React from 'react';
import { css } from 'linaria';
import Block from './block';
import Heading from './heading';

const root = css`
    background-color: #f7fafc;
`;
const aboutHeader = css`
    text-align: center;
    padding-bottom: 50px;
    padding-top: 20px;
`;

const hero = css`
    width: 230px;
    height: auto;
    margin-bottom: 30px;
`;

export default () => (
    <div className={root}>
        <Block>
            <div className={aboutHeader}>
                <img className={hero} src="/static/landing/about.png" alt="" width="230" height="210" />
                <Heading>About Openland</Heading>
            </div>
        </Block>
    </div>
);
