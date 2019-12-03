import * as React from 'react';
import { css } from 'linaria';
import Block from './block';
import Heading from './heading';
import Founders from './aboutFounders';

const root = css``;

const founders = css`
    padding: 90px 0;

    @media (min-width: 768px) and (max-width: 1920px) {
        padding: 70px 0;
    }

    @media (min-width: 400px) and (max-width: 768px) {
        padding: 40px 0;
    }

    @media (max-width: 400px) {
        padding: 20px 0;
    }
`;
const text = css`
    margin-top: 1em;
    font-size: 26px;
    line-height: 1.6;

    @media (min-width: 768px) and (max-width: 1920px) {
        font-size: 20px;
    }

    @media (min-width: 400px) and (max-width: 768px) {
        font-size: 18px;
    }

    @media (max-width: 400px) {
        font-size: 16px;
    }
`;

const foundersBlock = css`
    margin-top: 4em;

    & > * + * {
        margin-top: 2em;
    }
`;

export default () => (
    <div className={root}>
        <Block>
            <div className={founders}>
                <Heading>Building the future of communities</Heading>
                <p className={text}>
                    Openland is a modern platform for chat communities. Anyone can start a community
                    as a simple chat and add more activies as it grows. Openland provides tools for
                    sharing and organizing community knowledge and connecting community members via
                    1-1 introductions.
                </p>
                <p className={text}>
                    The company was founded in 2017 and is based in San Francisco. Openland is
                    backed by 30 prominent venture investors, including Y Combinator, Gagarin
                    Capital, Sinai Ventures, Soma Capital, Liquid 2 Ventures, and Rainfall Ventures.
                </p>

                <div className={foundersBlock}>
                    <Heading>Founders</Heading>
                    <Founders />
                </div>
            </div>
        </Block>
    </div>
);
