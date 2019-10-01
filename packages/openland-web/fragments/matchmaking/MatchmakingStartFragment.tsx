import * as React from 'react';
import { css } from 'linaria';
import { XViewRouterContext } from 'react-mental';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { useClient } from 'openland-web/utils/useClient';

const mainContainer = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
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

export const MatchmakingStartFragment = React.memo(() => {
    const router = React.useContext(XViewRouterContext)!;
    const unicorn = useUnicorn();
    const chatId = unicorn.query.roomId;
    const client = useClient();
    const data = client.useMatchmakingRoom({ peerId: chatId }).matchmakingRoom;
    const haveQuestions = !!(data && data.questions && data.questions.length);
    const firstQuestionId = haveQuestions && data!.questions![0].id;
    const onStart = () => {
        router.navigate(`/matchmaking/${chatId}/ask/${firstQuestionId}`);
    };

    return (
        <Page flexGrow={1}>
            <UHeader backgroundColor="#f0caca" />
            <div className={mainContainer}>
                <div className={cardsContainer}>
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
                        <span className={redText}>2</span> Explore people
                    </div>
                    <div>
                        <span className={redText}>3</span> Chat!
                    </div>
                </div>
                <UButton
                    text="Continue"
                    size="large"
                    square={true}
                    alignSelf="center"
                    onClick={onStart}
                />
            </div>
        </Page>
    );
});
