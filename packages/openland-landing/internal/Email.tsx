import * as React from 'react';
import { css } from 'linaria';
import { Container } from 'openland-landing/components/Container';

const box = css`
    padding: 160px 0;

    @media (min-width: 768px) and (max-width: 1599px) {
        padding: 120px 0;
    }

    @media (min-width: 400px) and (max-width: 767px) {
        padding: 80px 0;
    }

    @media (max-width: 399px) {
        padding: 40px 0;
    }
`;
const aboutHeader = css`
    text-align: center;
    padding-top: 20px;
`;

const heading = css`
    font-size: 56px;
    font-weight: bold;
    line-height: 1.2;
    color: #272750;

    @media (min-width: 768px) and (max-width: 1599px) {
        font-size: 50px;
    }

    @media (min-width: 420px) and (max-width: 767px) {
        font-size: 40px;
    }

    @media (max-width: 419px) {
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
    margin-top: 0.7em;
    font-size: 24px;
    line-height: 29px;
    color: #9393a7;

    @media (min-width: 768px) and (max-width: 1599px) {
        font-size: 22px;
    }

    @media (min-width: 420px) and (max-width: 767px) {
        font-size: 20px;
    }

    @media (max-width: 419px) {
        font-size: 16px;
    }
`;

export const Email = React.memo(() => (
    <div className={box}>
        <Container>
            <div className={aboutHeader}>
                <a href="mailto:hello@openland.com" className={heading}>
                    hello@openland.com
                </a>
                <div className={subheading}>San Francisco + Remote</div>
            </div>
        </Container>
    </div>
));