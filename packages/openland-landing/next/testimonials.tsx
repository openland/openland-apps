import * as React from 'react';
import { css } from 'linaria';
import Block from './block';
import Heading from './heading';

const root = css`
    margin-top: 175px;
`;

const card = css`
    background-color: #f7fafc;
    border-radius: 20px;
    overflow: hidden;

    display: flex;

    margin-top: 24px;

    @media (min-width: 768px) and (max-width: 960px) {
        flex-direction: column;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        border-radius: 0;

        margin: 0 -20px;
        margin-top: 20px;

        background-color: initial;
    }
`;

const img = css`
    width: 393px;

    @media (min-width: 768px) and (max-width: 960px) {
        width: 100%;
        height: 358px;
    }

    @media (max-width: 768px) {
        width: 100%;
        height: 240px;
    }

    flex-shrink: 0;
    background: url('/static/landing/testimonials.jpg');
    background-size: cover;
`;

const content = css`
    padding: 38px;
`;

const quotes = css`
    @media (max-width: 768px) {
        width: 34px
        height: 34px;
    }
`;

const text = css`
    margin-top: 15px;

    @media (min-width: 1140px) {
        font-size: 26px;
        line-height: 44px;
    }

    @media (min-width: 960px) and (max-width: 1140px) {
        font-size: 22px;
        line-height: 38px;
    }

    @media (min-width: 768px) and (max-width: 960px) {
        font-size: 26px;
        line-height: 44px;
    }

    @media (max-width: 768px) {
        font-size: 16px;
        line-height: 26px;
    }
`;

const author = css`
    margin-top: 27px;
    display: flex;
    align-items: center;
`;

const avatar = css`
    margin-right: 18px;
    @media (max-width: 768px) {
        width: 50px;
        height: 50px;
    }
`;

const signature = css``;

const title = css`
    @media (min-width: 1140px) {
        font-size: 24px;
        line-height: 29px;
    }

    @media (min-width: 960px) and (max-width: 1140px) {
        font-size: 18px;
        line-height: 22px;
    }

    @media (min-width: 768px) and (max-width: 960px) {
        font-size: 24px;
        line-height: 29px;
    }

    @media (max-width: 768px) {
        font-size: 18px;
        line-height: 22px;
    }
`;

const by = css`
    color: #9393a7;

    @media (min-width: 1140px) {
        font-size: 20px;
        line-height: 24px;
    }

    @media (min-width: 960px) and (max-width: 1140px) {
        font-size: 16px;
        line-height: 19px;
    }

    @media (min-width: 768px) and (max-width: 960px) {
        font-size: 20px;
        line-height: 24px;
    }

    @media (max-width: 768px) {
        font-size: 15px;
        line-height: 18px;
    }
`;

export default () => (
    <div className={root}>
        <Block>
            <Heading>See your community thrive</Heading>
            <div className={card}>
                <div className={img} />
                <div className={content}>
                    <img
                        src="/static/landing/testimonials-quotes.svg"
                        className={quotes}
                        width="45"
                        height="45"
                    />
                    <p className={text}>
                        In <b>6 months</b> we grew to <b>4000+ founders, 300+ venture funds</b>, and
                        150+ local and sector-specific subgroups. Dozens of seed rounds raised after
                        community intros.
                    </p>
                    <div className={author}>
                        <img
                            src="/static/landing/testimonials-avatar.svg"
                            className={avatar}
                            width="60"
                            height="60"
                        />
                        <div className={signature}>
                            <h3 className={title}>Founders</h3>
                            <span className={by}>Started by Yury Lifshits</span>
                        </div>
                    </div>
                </div>
            </div>
        </Block>
    </div>
);
