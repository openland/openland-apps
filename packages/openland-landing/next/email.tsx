import * as React from 'react';
import { css } from 'linaria';
import Block from './block';

const root = css`
    padding: 160px 0;

    @media (min-width: 768px) and (max-width: 1140px) {
        padding: 120px 0;
    }

    @media (min-width: 400px) and (max-width: 768px) {
        padding: 80px 0;
    }

    @media (max-width: 400px) {
        padding: 40px 0;
    }
`;
const aboutHeader = css`
    text-align: center;
    padding-top: 20px;
`;

const heading = css`
    font-weight: 800;
    font-size: 76px;
    line-height: 1.2;
    color: #272750;

    @media (min-width: 768px) and (max-width: 1140px) {
        font-size: 66px;
    }

    @media (min-width: 400px) and (max-width: 768px) {
        font-size: 40px;
    }

    @media (max-width: 400px) {
        font-size: 22px;
    }
`;

const subheading = css`
    margin-top: 0.5em;
    font-size: 40px;
    line-height: 48px;
    color: #9393a7;

    @media (min-width: 768px) and (max-width: 1140px) {
        font-size: 32px;
    }

    @media (min-width: 400px) and (max-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 400px) {
        font-size: 16px;
    }
`;

export default () => (
    <div className={root}>
        <Block>
            <div className={aboutHeader}>
                <div className={heading}>hello@openland.com</div>
                <div className={subheading}>San Francisco + Remote</div>
            </div>
        </Block>
    </div>
);
