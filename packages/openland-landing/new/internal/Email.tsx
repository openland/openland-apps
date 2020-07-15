import * as React from 'react';
import { css } from 'linaria';
import { Container } from '../components/Container';

const box = css`
    padding: 140px 0;

    @media (min-width: 768px) and (max-width: 1199px) {
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
    font-weight: 800;
    font-size: 56px;
    line-height: 67px;
    color: var(--foregroundPrimary);

    @media (min-width: 768px) and (max-width: 1199px) {
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
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    color: var(--foregroundTertiary);
    margin: 20px 0 0;

    @media (min-width: 768px) and (max-width: 1199px) {
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