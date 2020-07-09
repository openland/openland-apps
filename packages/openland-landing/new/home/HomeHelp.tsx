import * as React from 'react';
import { css, cx } from 'linaria';
import { Container } from '../components/Container';

const box = css`
    padding: 180px 0 100px;

    @media (max-width: 767px) {
        display: none;
    }
`;

const title = css`
    font-weight: 800;
    font-size: 62px;
    line-height: 64px;
    margin: 0 0 40px;
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

    &:hover {
        box-shadow: 0px 4px 35px rgba(0, 0, 0, 0.07);
        background-color: #ffffff;
    }
`;

const itemImage = css`
    height: 198px;
    background-color: #F2DDE3;

    &.is-c2 {
        background-color: #F7CEAC;
    }

    &.is-c3 {
        background-color: #FFF0C9;
    }
`;

const itemInfo = css`
    padding: 19px 16px 22px 32px;
`;

const itemTag = css`
    text-transform: uppercase;
    opacity: 0.4;
    font-weight: 600;
    font-size: 15px;
    line-height: 20px;
    margin: 0 0 7px;
`;

const itemText = css`
    font-weight: 700;
    font-size: 26px;
    line-height: 32px;
    opacity: 0.85;
`;

export const HomeHelp = React.memo(() => (
    <div className={box}>
        <Container>
            <div className={title}>Always here to help</div>

            <div className={items}>
                <div className={item}>
                    <div className={itemImage} />
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
