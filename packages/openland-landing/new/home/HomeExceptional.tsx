import * as React from 'react';
import { css } from 'linaria';
import { Container } from '../components/Container';
import VideoIcon from './icons/ic_video_28.svg';
import BotsIcon from './icons/ic_bots_28.svg';
import CommunitiesIcon from './icons/ic_communities_28.svg';
import ContactsIcon from './icons/ic_contacts_28.svg';
import DiscoverIcon from './icons/ic_discover_28.svg';
import MessagingIcon from './icons/ic_messaging_28.svg';
import PaymentsIcon from './icons/ic_payments_28.svg';
import AppearanceIcon from './icons/ic_appearance_24.svg';

const wrapper = css`
    @media (max-width: 767px) {
        display: none;
    }
`;

const box = css`
    padding: 48px 0 50px;
    background: #F2F3F5;
    border-radius: 44px;

    @media (min-width: 768px) and (max-width: 1199px) {
        padding: 31px 0 28px;
        border-radius: 32px;
    }
`;

const title = css`
    font-weight: 800;
    font-size: 54px;
    line-height: 64px;
    margin: 0 0 4px;
    text-align: center;

    @media (min-width: 768px) and (max-width: 1199px) {
        font-size: 34px;
        line-height: 40px;
        margin: 0 0 5px;
    }
`;

const text = css`
    font-size: 26px;
    line-height: 46px;
    color: var(--foregroundSecondary);
    margin: 0 0 28px;
    text-align: center;

    @media (min-width: 768px) and (max-width: 1199px) {
        font-size: 16px;
        line-height: 24px;
        margin: 0 0 20px;
    }
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

    @media (min-width: 768px) and (max-width: 1199px) {
        width: 600px; height: 378px;
        border-radius: 14px;
        margin: 0 auto 17px;
    }
`;

const features = css`
    display: flex;
    justify-content: center;
    padding: 24px 0 0 38px;

    @media (min-width: 768px) and (max-width: 1199px) {
        padding: 12px 0 0 26px;
    }
`;

const feature = css`
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
    opacity: 0.8;
    padding: 0 40px 0 36px;
    position: relative;

    @media (min-width: 768px) and (max-width: 1199px) {
        font-size: 11px;
        line-height: 20px;
        padding: 0 24px;
    }

    svg {
        position: absolute;
        top: 0; left: 0;
        width: 28px; height: 28px;

        @media (min-width: 768px) and (max-width: 1199px) {
            top: 1px;
            width: 18px; height: 18px;
        }
    }
`;

export const HomeExceptional = React.memo(() => (
    <div className={wrapper}>
        <Container>
            <div className={box}>
                <div className={title}>Exceptional apps</div>
                <div className={text}>Beautiful, simple, and ultra-fast</div>
                <div className={screenshot} />
                <div className={features}>
                    <div className={feature}><MessagingIcon />Messaging</div>
                    <div className={feature}><VideoIcon />Video chat</div>
                    <div className={feature}><CommunitiesIcon />Communities</div>
                    <div className={feature}><ContactsIcon />Contacts</div>
                </div>
                <div className={features}>
                    <div className={feature}><DiscoverIcon />Discover</div>
                    <div className={feature}><PaymentsIcon />Payments</div>
                    <div className={feature}><BotsIcon />Bots</div>
                    <div className={feature}><AppearanceIcon />Color themes</div>
                </div>
            </div>
        </Container>
    </div>
));
