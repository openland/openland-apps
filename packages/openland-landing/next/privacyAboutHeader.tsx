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

const subheading = css`
    font-size: 24px;
    line-height: 1.2;
    text-align: center;
    margin-top: 12px;
    color: #525273;

    @media (min-width: 768px) and (max-width: 1140px) {
        font-size: 20px;
    }

    @media (min-width: 400px) and (max-width: 768px) {
        font-size: 18px;
    }

    @media (max-width: 400px) {
        font-size: 16px;
    }
`;

export default () => (
    <div className={root}>
        <Block>
            <div className={aboutHeader}>
                <img className={hero} src="/static/landing/about.png" alt="" />
                <Heading>Privacy Policy @ Openland</Heading>
                <div className={subheading}>Effective Date — July 9, 2018</div>
            </div>
        </Block>
    </div>
);
