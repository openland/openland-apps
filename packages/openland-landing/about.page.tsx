import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Founders } from './internal/Founders';
import { Email } from './internal/Email';
import { Page } from './components/Page';
import { ChatWithUs } from './internal/ChatWithUs';
import { Container } from './components/Container';
import { css } from 'linaria';

const box = css`
    padding: 80px 0 149px;

    @media (min-width: 768px) and (max-width: 1199px) {
        padding: 80px 0 90px;
    }

    @media (max-width: 767px) {
        padding: 36px 0 60px;
    }
`;

const heading = css`
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    text-align: center;
    margin: 0 0 24px;
    color: var(--foregroundSecondary);

    @media (min-width: 768px) and (max-width: 1199px) {
        font-size: 24px;
        line-height: 32px;
        margin: 0 0 24px;
    }

    @media (max-width: 767px) {
        font-size: 20px;
        line-height: 28px;
        margin: 0 0 16px;
    }
`;

const subheading = css`
    font-weight: 700;
    font-size: 64px;
    line-height: 52px;
    text-align: center;
    margin: 0 0 40px;

    @media (min-width: 768px) and (max-width: 1199px) {
        font-size: 58px;
        line-height: 52px;
    }

    @media (max-width: 767px) {
        font-size: 46px;
        line-height: 48px;
        margin: 0 0 20px;
    }
`;

const text = css`
    font-size: 22px;
    line-height: 36px;
    margin: 0 0 12px;

    &:last-of-type {
        margin: 0;
    }

    @media (max-width: 767px) {
        font-size: 16px;
        line-height: 26px;
    }
`;

const hero = css`
    background: linear-gradient(180deg, #F7F8F9 0%, #F7F8F9 100%);
    height: 262px;
    position: relative;

    @media (max-width: 767px) {
        height: 162px;
    }

    &:before {
        content: "";
        display: block;
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: url(https://cdn.openland.com/shared/landing/start/about-hero.png) no-repeat;
        background-image: -webkit-image-set(
            url(https://cdn.openland.com/shared/landing/start/about-hero.png) 1x,
            url(https://cdn.openland.com/shared/landing/start/about-hero@2x.png) 2x
        );
        background-size: auto 190px;
        background-position: bottom center;

        @media (max-width: 767px) {
            background-size: auto 131px;
        }
    }
`;

export const AboutPage = React.memo(() => (
    <Page>
        <XDocumentHead title="About Openland" disableBranding={true} />

        <div className={hero} />

        <Container isSmall={true}>
            <div className={box}>
                <div className={heading}>About Openland</div>
                <div className={subheading}>Building the future of social</div>
                <div>
                    <div className={text}>
                        Openland is&nbsp;a&nbsp;modern social network built for people, not advertisers. It&nbsp;is&nbsp;focused on&nbsp;fundamental human needs: making new friends, safe self-expression, and learning from other people. Openland is&nbsp;a&nbsp;home for some of&nbsp;the most active and supportive chat communities on&nbsp;the Internet. Anyone can start and grow their own community on&nbsp;Openland, for free.
                    </div>
                    <div className={text}>
                        Openland was founded in&nbsp;2017 and is&nbsp;based in&nbsp;San Francisco. The company is&nbsp;backed by&nbsp;30&nbsp;prominent venture investors, including Y&nbsp;Combinator, Gagarin Capital, Sinai Ventures, Soma Capital, Liquid 2&nbsp;Ventures, and Rainfall Ventures.
                    </div>
                </div>

                <Founders />
            </div>
        </Container>

        <ChatWithUs />
        <Email />
    </Page>
));
