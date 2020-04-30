import * as React from 'react';
import { css } from 'linaria';
import Block from './smallBlock';
import Heading from './heading';
import Founders from './aboutFounders';

const root = css``;

const founders = css`
    padding: 90px 0;

    @media (min-width: 768px) and (max-width: 1600px) {
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
    font-size: 24px;
    line-height: 1.6;

    @media (min-width: 768px) and (max-width: 1600px) {
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
                    Openland is a new messenger for high-quality communities. Its communities are small, moderated, and are based on shared values. In premium communities, members are asked to pay a small monthly subscription to ensure active participation and to compensate organizers' work. Community experience is centered around conversations with experts, building community knowledge, sharing experiences among members, and starting new meaningful relationships. Openland has beautiful, ultra-fast apps for all desktop and mobile platforms.
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
