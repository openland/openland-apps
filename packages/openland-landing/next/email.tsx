import * as React from 'react';
import { css } from 'linaria';
import Block from './block';

const root = css`
    padding: 160px 0;

    @media (min-width: 768px) and (max-width: 1600px) {
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
    font-size: 56px;
    line-height: 67px;
    font-weight: bold;
    line-height: 1.2;
    color: #272750;

    @media (min-width: 768px) and (max-width: 1600px) {
        font-size: 50px;
    }

    @media (min-width: 420px) and (max-width: 768px) {
        font-size: 40px;
    }

    @media (max-width: 420px) {
        font-size: 22px;
    }
    transition: opacity 0.2s;
    &:hover,
    &:focus {
        color: #272750;
        text-decoration: none;
        transition: opacity 0.01s;
        opacity: 0.9;
    }
`;

const subheading = css`
    margin-top: 0.5em;
    font-size: 24px;
    line-height: 29px;
    color: #9393a7;

    @media (min-width: 768px) and (max-width: 1600px) {
        font-size: 22px;
    }

    @media (min-width: 420px) and (max-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 420px) {
        font-size: 16px;
    }
`;

export default () => (
    <div className={root}>
        <Block>
            <div className={aboutHeader}>
                <a href="mailto:hello@openland.com" className={heading}>
                    hello@openland.com
                </a>
                <div className={subheading}>San Francisco + Remote</div>
            </div>
        </Block>
    </div>
);
