import * as React from 'react';
import { css, cx } from 'linaria';
import { XViewRouterContext } from 'react-mental';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { useClient } from 'openland-web/utils/useClient';
import { UserInfoContext } from 'openland-web/components/UserInfo';

const outerContainer = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
`;

const mainContainer = css`
    max-height: 850px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
`;

const mainContainerDesktop = css`
    display: flex;
    flex-direction: column;
    flex-shrink: 1;
    flex-grow: 1;
`;

const cardsContainer = css`
    height: 310px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    flex-grow: 1;
    background-color: #f0caca;
    margin-bottom: 56px;
`;

const desktopCardsContainer = css`
    border-radius: 16px;
    width: 360px;
    height: 308px;
    align-self: center;
`;

const desktopCardsContainerNoLogin = css`
    margin-top: 20px;
`;

const cardIcon = css`
    width: 280px;
    height: 230px;
    object-fit: contain;
`;

const descriptionStyle = css`
    font-size: 24px;
    line-height: 42px;
    color: var(--foregroundPrimary);
    margin-bottom: 50px;
    align-self: center;
`;

const redText = css`
    color: #cf087f;
    width: 20px;
    display: inline-block;
    text-align: center;
`;

export const MatchmakingStartComponent = (props: { onStart: () => void }) => {
    const isMobile = useLayout() === 'mobile';
    const userContext = React.useContext(UserInfoContext)!!;
    return (
        <div className={outerContainer}>
            <div className={isMobile ? mainContainer : mainContainerDesktop}>
                <div
                    className={cx(
                        cardsContainer,
                        !isMobile && desktopCardsContainer,
                        !isMobile && !userContext.user && desktopCardsContainerNoLogin,
                    )}
                >
                    <img
                        className={cardIcon}
                        src="https://cdn.openland.com/shared/web/matchmaking/cards@1x.png"
                        srcSet="https://cdn.openland.com/shared/web/matchmaking/cards@2x.png 2x"
                    />
                </div>
                <div className={descriptionStyle}>
                    <div>
                        <span className={redText}>1</span> Introduce yourself
                    </div>
                    <div>
                        <span className={redText}>2</span> Explore members
                    </div>
                    <div>
                        <span className={redText}>3</span> Chat!
                    </div>
                </div>
                <UButton
                    text="Continue"
                    size="large"
                    alignSelf="center"
                    onClick={props.onStart}
                    marginBottom={60}
                    marginTop={20}
                />
            </div>
        </div>
    );
};

export const MatchmakingStartFragment = React.memo(() => {
    const router = React.useContext(XViewRouterContext)!;
    const isMobile = useLayout() === 'mobile';
    const unicorn = useUnicorn();
    const chatId = unicorn && unicorn.query.roomId;
    const client = useClient();
    const data = client.useMatchmakingRoom({ peerId: chatId }).matchmakingRoom;
    const haveQuestions = !!(data && data.questions && data.questions.length);
    const firstQuestionId = haveQuestions && data!.questions![0].id;
    const onStart = () => {
        router.navigate(`/matchmaking/${chatId}/ask/${firstQuestionId}`);
    };

    return (
        <Page flexGrow={1} style="wide" track="matchmaking_start">
            <UHeader backgroundColor={isMobile ? '#f0caca' : undefined} />
            <MatchmakingStartComponent onStart={onStart} />
        </Page>
    );
});
