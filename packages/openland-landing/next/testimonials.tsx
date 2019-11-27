import * as React from 'react';
import { css } from 'linaria';
import Block from './block';
import Heading from './heading';

const root = css`
    margin-top: 175px;
`;

const card = css`
    background: #f7fafc;
    border-radius: 20px;
    overflow: hidden;

    display: flex;

    margin-top: 24px;
`;

const img = css`
    width: 393px;
    flex-basis: 393px;
    flex-shrink: 0;
    background: url('/static/landing/testimonials.jpg');
    background-placement: center center;
    background-size: cover;
`;

const content = css`
    padding: 38px;
`;

const quotes = css``;

const text = css`
    font-size: 26px;
    line-height: 1.6;
    margin-top: 15px;
`;

const author = css`
    margin-top: 27px;
    display: flex;
    align-items: center;
`;

const avatar = css`
    margin-right: 18px;
`;

const signature = css``;

const title = css`
    font-size: 24px;
`;

const by = css`
    font-size: 20px;
    color: #9393a7;
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
