import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Hero } from './internal/Hero';
import { Founders } from './internal/Founders';
import { Heading } from './internal/Heading';
import { Email } from './internal/Email';
import { Page } from './components/Page';
import { ChatWithUs } from './internal/ChatWithUs';
import { Container } from './components/Container';
import { css } from 'linaria';

const box = css`
    padding: 90px 0;

    @media (min-width: 768px) and (max-width: 1599px) {
        padding: 70px 0;
    }

    @media (min-width: 400px) and (max-width: 767px) {
        padding: 40px 0;
    }

    @media (max-width: 399px) {
        padding: 20px 0;
    }
`;
const text = css`
    margin-top: 1em;
    font-size: 24px;
    line-height: 1.6;

    @media (min-width: 768px) and (max-width: 1599px) {
        font-size: 20px;
    }

    @media (min-width: 400px) and (max-width: 767px) {
        font-size: 18px;
    }

    @media (max-width: 399px) {
        font-size: 16px;
    }
`;

export const AboutPage = React.memo(() => (
    <Page>
        <XDocumentHead title="About Openland" disableBranding={true} />

        <Hero
            title="About Openland"
            image={{
                link: '/static/landing/about.png',
                width: 230,
                height: 210
            }}
        />

        <Container isSmall={true}>
            <div className={box}>
                <Heading title="Building the future of communities" />
                <p className={text}>
                    Openland is a new messenger for high-quality communities. Its communities are small, moderated, and are based on shared values. In premium communities, members are asked to pay a small monthly subscription to ensure active participation and to compensate organizers' work. Community experience is centered around conversations with experts, building community knowledge, sharing experiences among members, and starting new meaningful relationships. Openland has beautiful, ultra-fast apps for all desktop and mobile platforms.
                </p>
                <p className={text}>
                    The company was founded in 2017 and is based in San Francisco. Openland is
                    backed by 30 prominent venture investors, including Y Combinator, Gagarin
                    Capital, Sinai Ventures, Soma Capital, Liquid 2 Ventures, and Rainfall Ventures.
                </p>

                <Founders />
            </div>
        </Container>

        <ChatWithUs />
        <Email />
    </Page>
));
