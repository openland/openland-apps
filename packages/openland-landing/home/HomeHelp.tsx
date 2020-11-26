import * as React from 'react';
import { css } from 'linaria';
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
    background-color: var(--backgroundPrimaryHover);
    display: block;
    transition: 150ms all ease;
    color: var(--foregroundPrimary) !important;
    text-decoration: none!important;

    @media (min-width: 768px) and (max-width: 1199px) {
        width: 234px;
        border-radius: 12px;
    }

    &:hover {
        box-shadow: 0px 4px 35px rgba(0, 0, 0, 0.07);
        background-color: #ffffff;
        color: var(--foregroundPrimary) !important;
    }
`;

const itemImage = css`
    height: 198px;

    @media (min-width: 768px) and (max-width: 1199px) {
        height: 130px;
    }

    img {
        display: block;
        width: 100%; height: 100%;
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
                <a href="https://www.notion.so/openland/Openland-Product-Updates-636c05fad9ec4579ac4b4b8bca0bfe59" target="_blank" className={item}>
                    <div className={itemImage}>
                        <img
                            src="https://cdn.openland.com/shared/landing/start/home-article-01.png"
                            srcSet="https://cdn.openland.com/shared/landing/start/home-article-01@2x.png 2x"
                            alt=""
                        />
                    </div>
                    <div className={itemInfo}>
                        <div className={itemTag}>What's New</div>
                        <div className={itemText}>Openland Product Updates</div>
                    </div>
                </a>

                <a href="https://www.notion.so/openland/Openland-User-Guide-2af553fb409a42c296651e708d5561f3" target="_blank" className={item}>
                    <div className={itemImage}>
                        <img
                            src="https://cdn.openland.com/shared/landing/start/home-article-02.png"
                            srcSet="https://cdn.openland.com/shared/landing/start/home-article-02@2x.png 2x"
                            alt=""
                        />
                    </div>
                    <div className={itemInfo}>
                        <div className={itemTag}>Product</div>
                        <div className={itemText}>Openland User Guide</div>
                    </div>
                </a>

                <a href="https://www.notion.so/openland/Community-building-guide-4ab523afd827403c802d21ca22dcb143" target="_blank" className={item}>
                    <div className={itemImage}>
                        <img
                            src="https://cdn.openland.com/shared/landing/start/home-article-03.png"
                            srcSet="https://cdn.openland.com/shared/landing/start/home-article-03@2x.png 2x"
                            alt=""
                        />
                    </div>
                    <div className={itemInfo}>
                        <div className={itemTag}>Organizers</div>
                        <div className={itemText}>Building communities on&nbsp;Openland</div>
                    </div>
                </a>
            </div>
        </Container>
    </div>
));
