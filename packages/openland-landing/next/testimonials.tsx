import * as React from 'react';
import { css } from 'linaria';
import Block from './block';
import Heading from './heading';

const root = css`
    margin-top: 173px;

    @media (min-width: 768px) and (max-width: 960px) {
        margin-top: 75px;
    }

    @media (max-width: 768px) {
        margin-top: 45px;
    }
`;

const card = css`
    background-color: #f7fafc;
    border-radius: 20px;
    overflow: hidden;

    display: flex;
    align-items: center;

    margin-top: 24px;

    @media (min-width: 768px) and (max-width: 960px) {
        flex-direction: column;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        border-radius: 0;
        margin: 0 auto;
        margin-top: 20px;
        background-color: initial;

        max-width: 509px;
    }
`;

const img = css`
    flex-shrink: 0;
    width: 393px;
    height: 339px;

    @media (max-width: 1600px) {
        width: 320px;
        height: auto;
    }

    @media (max-width: 960px) {
        display: none;
    }
`;

const imgNarrow = css`
    display: none;
    height: 339px;
    @media (max-width: 960px) {
        display: block;
    }

    @media (max-width: 768px) {
        max-width: 100%;
        height: auto;
        border-radius: 16px;
    }
`;

const content = css`
    padding: 23px 38px;

    @media (max-width: 768px) {
        padding: 38px 0;
        padding-top: 20px;
        padding-bottom: 38px;
    }
`;

const quotes = css`
    @media (max-width: 768px) {
        width: 25px
        height: 25px;
    }
`;

const text = css`
    margin-top: 10px;
    line-height: 1.6;

    @media (min-width: 1160px) {
        font-size: 24px;
    }

    @media (min-width: 960px) and (max-width: 1600px) {
        font-size: 18px;
    }

    @media (min-width: 768px) and (max-width: 960px) {
        font-size: 26px;
    }

    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

const author = css`
    margin-top: 30px;
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
    line-height: 1.5;
    @media (min-width: 1600px) {
        font-size: 24px;
    }

    @media (min-width: 960px) and (max-width: 1600px) {
        font-size: 18px;
    }

    @media (min-width: 768px) and (max-width: 960px) {
        font-size: 24px;
    }

    @media (max-width: 768px) {
        font-size: 18px;
    }
`;

const by = css`
    color: #9393a7;

    @media (min-width: 1600px) {
        font-size: 20px;
        line-height: 24px;
    }

    @media (min-width: 960px) and (max-width: 1600px) {
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

const headingWrapper = css`
    @media (max-width: 768px) {
        text-align: center;
    }
`;

export default () => (
    <div className={root}>
        <Block>
            <div className={headingWrapper}>
                <Heading>See your community thrive</Heading>
            </div>
            <div className={card}>
                <img src="/static/landing/testimonials.jpg" className={img} />
                <img src="/static/landing/testimonials-narrow.jpg" className={imgNarrow} />
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
                            <span className={by}>started by Yury Lifshits</span>
                        </div>
                    </div>
                </div>
            </div>
        </Block>
    </div>
);
