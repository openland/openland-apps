import * as React from 'react';
import { css, cx } from 'linaria';
import { Container } from '../components/Container';

const box = css`
    padding: 180px 0 100px;

    @media (min-width: 768px) and (max-width: 1199px) {
        padding: 99px 0 100px;
    }

    @media (max-width: 767px) {
        display: none;
    }

    opacity: 0;
    transform: translateY(100px);
    transition: transform cubic-bezier(0, 0, 0.2, 1) 300ms, opacity cubic-bezier(0, 0, 0.2, 1) 300ms;

    &.in-viewport {
        opacity: 1;
        transform: translateY(0);
    }
`;

const title = css`
    font-weight: 800;
    font-size: 62px;
    line-height: 64px;
    margin: 0 0 40px;

    @media (min-width: 768px) and (max-width: 1199px) {
        font-size: 40px;
        line-height: 44px;
        margin: 0 0 25px;
    }
`;

const items = css`
    display: flex;
    justify-content: space-between;
`;

const item = css`
    width: 359px;
    border-radius: 32px;
    overflow: hidden;
    background-color: #F7F8F9;
    cursor: pointer;
    transition: 150ms all ease;

    @media (min-width: 768px) and (max-width: 1199px) {
        width: 234px;
        border-radius: 12px;
    }

    &:hover {
        box-shadow: 0px 4px 35px rgba(0, 0, 0, 0.07);
        background-color: #ffffff;
    }
`;

const itemImage = css`
    height: 198px;

    @media (min-width: 768px) and (max-width: 1199px) {
        height: 130px;
    }

    &.is-c1 {
        background: #F2DDE3 url(https://cdn.openland.com/shared/landing/start/home-article-01.png) no-repeat;
        background-image: -webkit-image-set(
            url(https://cdn.openland.com/shared/landing/start/home-article-01.png) 1x,
            url(https://cdn.openland.com/shared/landing/start/home-article-01@2x.png) 2x
        );
        background-size: 100% 100%;
    }

    &.is-c2 {
        background: #F7CEAC url(https://cdn.openland.com/shared/landing/start/home-article-02.png) no-repeat;
        background-image: -webkit-image-set(
            url(https://cdn.openland.com/shared/landing/start/home-article-02.png) 1x,
            url(https://cdn.openland.com/shared/landing/start/home-article-02@2x.png) 2x
        );
        background-size: 100% 100%;
    }

    &.is-c3 {
        background: #FFF0C9 url(https://cdn.openland.com/shared/landing/start/home-article-03.png) no-repeat;
        background-image: -webkit-image-set(
            url(https://cdn.openland.com/shared/landing/start/home-article-03.png) 1x,
            url(https://cdn.openland.com/shared/landing/start/home-article-03@2x.png) 2x
        );
        background-size: 100% 100%;
    }
`;

const itemInfo = css`
    padding: 19px 16px 22px 32px;

    @media (min-width: 768px) and (max-width: 1199px) {
        padding: 12px 16px;
    }
`;

const itemTag = css`
    text-transform: uppercase;
    opacity: 0.4;
    font-weight: 600;
    font-size: 15px;
    line-height: 20px;
    margin: 0 0 7px;

    @media (min-width: 768px) and (max-width: 1199px) {
        font-size: 10px;
        line-height: 14px;
        margin: 0 0 4px;
    }
`;

const itemText = css`
    font-weight: 700;
    font-size: 26px;
    line-height: 32px;
    opacity: 0.85;

    @media (min-width: 768px) and (max-width: 1199px) {
        font-size: 16px;
        line-height: 20px;
    }
`;

export const HomeHelp = React.forwardRef((props: {}, ref: React.Ref<HTMLDivElement>) => (
    <div ref={ref} className={box}>
        <Container>
            <div className={title}>Always here to help</div>

            <div className={items}>
                <div className={item}>
                    <div className={cx(itemImage, 'is-c1')} />
                    <div className={itemInfo}>
                        <div className={itemTag}>Manifesto</div>
                        <div className={itemText}>Why the world needs a&nbsp;new&nbsp;social network</div>
                    </div>
                </div>

                <div className={item}>
                    <div className={cx(itemImage, 'is-c2')} />
                    <div className={itemInfo}>
                        <div className={itemTag}>Welcome guide</div>
                        <div className={itemText}>Making friends through communities</div>
                    </div>
                </div>

                <div className={item}>
                    <div className={cx(itemImage, 'is-c3')} />
                    <div className={itemInfo}>
                        <div className={itemTag}>Organizers</div>
                        <div className={itemText}>Building communities on&nbsp;Openland</div>
                    </div>
                </div>
            </div>
        </Container>
    </div>
));
