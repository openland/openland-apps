import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { Container } from '../components/Container';

const root = css`
`;

const features = css`
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 27px;

    @media (max-width: 767px) {
        grid-template-columns: auto;
        max-width: 400px;
        margin: 0 auto;
    }
`;

const feature = css`
    padding: 36px 60px 40px 40px;
    border-radius: 24px;
    background: linear-gradient(0deg, #F7F8F9, #F7F8F9);

    @media (min-width: 768px) and (max-width: 1199px) {
        padding: 30px;
    }

    @media (max-width: 767px) {
        padding: 20px 30px;
    }
`;

const featureHeader = css`
    display: flex;
    align-items: center;
`;

const icon = css`
    margin-right: 20px;
`;

const name = css`
    font-size: 26px;
    line-height: 1.2;
    font-weight: 600;

    @media (min-width: 768px) and (max-width: 1199px) {
        font-size: 20px;
    }

    @media (max-width: 767px) {
        font-size: 18px;
    }
`;

const text = css`
    font-size: 24px;
    line-height: 36px;
    margin-top: 21px;

    @media (min-width: 768px) and (max-width: 1199px) {
        font-size: 20px;
    }

    @media (max-width: 767px) {
        font-size: 16px;
        line-height: 26px;
    }
`;

const link = css`
    display: inline-block;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    margin-top: 20px;

    position: relative;

    @media (min-width: 768px) and (max-width: 1199px) {
        font-size: 20px;
    }

    @media (max-width: 767px) {
        font-size: 16px;
    }

    &,
    &:hover,
    &:focus {
        text-decoration: none;
        color: #248bf2;
    }

    &:after {
        display: inline-block;
        content: '';

        background: url('https://cdn.openland.com/shared/landing/arrow-about.svg') no-repeat;
        background-size: contain;

        transform: translateY(-50%);

        position: absolute;
        top: 50%;

        width: 15px;
        height: 15px;
        right: -20px;
    }

    will-change: opacity;
    transition: opacity 0.2s;

    &:hover {
        transition: opacity 0.01s;
        opacity: 0.8;
    }

    cursor: pointer;
`;

const title = css`
    font-weight: 800;
    font-size: 46px;
    line-height: 58px;
    margin: 0 0 28px;

    @media (min-width: 768px) and (max-width: 1199px) {
        font-size: 38px;
        line-height: 42px;
        margin: 0 0 20px;
    }

    @media (max-width: 767px) {    
        font-size: 30px;
        line-height: 34px;
        margin: 0 0 12px;
    }
`;

interface FeatureProps {
    title: string;
    icon: string;
    link: string;
    text: string;
}

const Feature = React.memo((props: FeatureProps) => (
    <div className={feature}>
        <div className={featureHeader}>
            <img
                className={icon}
                src={props.icon}
                width="64"
                height="64"
            />
            <div className={name}>{props.title}</div>
        </div>
        <p className={text}>
            {props.text}
        </p>
        <span className={link}>
            <XView path={props.link}>
                Join chat
            </XView>
        </span>
    </div>
));

export const ChatWithUs = React.memo(() => (
    <div className={root}>
        <Container isSmall={true}>
            <div className={title}>Chat with us</div>
            <div className={features}>
                <Feature
                    title="Openland Careers"
                    icon="/static/landing/icons/careers-2.svg"
                    link="/invite/8GbujwA"
                    text="Explore open positions or design your own role in our team"
                />
                <Feature
                    title="Help and Feedback"
                    icon="/static/landing/icons/support-2.svg"
                    link="/invite/zOF5IpZ"
                    text="Get support, ask for features, and share your ideas for Openland"
                />
                <Feature
                    title="Openland News"
                    icon="/static/landing/icons/news-2.svg"
                    link="/invite/Iqx4dPt"
                    text="Follow our journey to the future of&nbsp;community organizing"
                />
                <Feature
                    title="Community Creators"
                    icon="/static/landing/icons/community-2.svg"
                    link="/invite/XaQDsnQ"
                    text="Get inspiration and learn from the&nbsp;best community organizers"
                />
            </div>
        </Container>
    </div>
));