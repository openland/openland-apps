import * as React from 'react';
import { css } from 'linaria';
import { Container } from '../components/Container';

const wrapper = css`
    @media (max-width: 767px) {
        display: none;
    }
`;

const box = css`
    padding: 48px 0 50px;
    background: #F2F3F5;
    border-radius: 44px;
`;

const title = css`
    font-weight: 800;
    font-size: 54px;
    line-height: 64px;
    margin: 0 0 4px;
    text-align: center;
`;

const text = css`
    font-size: 26px;
    line-height: 46px;
    color: var(--foregroundSecondary);
    margin: 0 0 28px;
    text-align: center;
`;

const screenshot = css`
    width: 928px; height: 586px;
    border-radius: 20px;
    margin: 0 auto 26px;
    box-shadow: 0px 4.70932px 40.5751px rgba(0, 0, 0, 0.1);
    background: url(https://cdn.openland.com/shared/landing/start/home-exceptional.png) no-repeat;
    background-image: -webkit-image-set(
        url(https://cdn.openland.com/shared/landing/start/home-exceptional.png) 1x,
        url(https://cdn.openland.com/shared/landing/start/home-exceptional@2x.png) 2x
    );
    background-size: 100% 100%;
`;

const features = css`
    display: flex;
    justify-content: center;
    padding: 24px 0 0 38px;
`;

const feature = css`
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
    opacity: 0.8;
    padding: 0 40px 0 36px;
`;

export const HomeExceptional = React.memo(() => (
    <div className={wrapper}>
        <Container>
            <div className={box}>
                <div className={title}>Exceptional apps</div>
                <div className={text}>Beautiful, simple, and ultra-fast</div>
                <div className={screenshot} />
                <div className={features}>
                    <div className={feature}>Messaging</div>
                    <div className={feature}>Video chat</div>
                    <div className={feature}>Communities</div>
                    <div className={feature}>Contacts</div>
                </div>
                <div className={features}>
                    <div className={feature}>Discover</div>
                    <div className={feature}>Payments</div>
                    <div className={feature}>Bots</div>
                    <div className={feature}>Color themes</div>
                </div>
            </div>
        </Container>
    </div>
));
