import * as React from 'react';
import { UHeader } from 'openland-unicorn/UHeader';
import { css } from 'linaria';
import { Page } from 'openland-unicorn/Page';
import { XView } from 'react-mental';

const containerStyle = css`
    height: 360px;
    color: white;
    font-weight: 400;
    font-size: 37px;
    line-height: 41px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    margin-left: 32px;
    margin-right: 32px;
    overflow: hidden;
    text-align: center;
    padding: 32px;
    position: relative;
`;

const dimmer = css`
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: white;
    opacity: 0.2;
    z-index: -1;
    border-radius: 16px;
`;

const bg = css`
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background: linear-gradient(163deg, #fc00ff, #00dbde);
    border-radius: 16px;
    filter: blur(18px);
    overflow: hidden;
    z-index: -2;
`;

export const FeedFragment = React.memo(() => {
    return (
        <>
            <Page style="wide">
                <XView paddingTop={16}>
                    <div className={containerStyle}>
                        <div className={bg} />
                        <div className={dimmer} />
                        <span>
                            Does anyone want to go surfing this weekend? (SF)
                        </span>
                    </div>
                </XView>
                <XView paddingTop={16}>
                    <div className={containerStyle}>
                        <div className={bg} />
                        <div className={dimmer} />
                        <span>
                            Samsung презентовал Galaxy Note10 и это ад перфекциониста
                        </span>
                    </div>
                </XView>
                <XView paddingTop={16}>
                    <div className={containerStyle}>
                        <div className={bg} />
                        <div className={dimmer} />
                        <span>
                        Гипотеза
Плохой UX авторизации с гуглом* в мобилке значительно снижает конверсию в регистрацию.
*пользователю надо ввести адрес почты и пароль от гугл аккаунта, в большинстве приложений при авторизации...
                        </span>
                    </div>
                </XView>
            </Page>
        </>
    );
});