import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { XViewRouterContext } from 'react-mental';
import { Page } from 'openland-unicorn/Page';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { useClient } from 'openland-api/useClient';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { TextBody, TextTitle1 } from 'openland-web/utils/TextStyles';
import PicConfeti from './components/confeti.svg';

const confetiStyle = css`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    margin: auto;
    z-index: -1;
`;

const mainContainer = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
`;

const titleStyle = css`
    color: var(--foregroundPrimary);
    display: flex;
    justify-content: center;
`;

const subtitleStyle = css`
    color: var(--foregroundSecondary);
    display: flex;
    justify-content: center;
    margin-top: 8px;
    margin-bottom: 60px;
`;

const userCardContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 206px;
    width: 100%;
    align-self: center;
    background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.7) 100%), #f2f3f5;
    box-shadow: 0px 3px 24px rgba(0, 0, 0, 0.12);
    border-radius: 12px;
    padding: 45px 22px 22px 22px;
`;

export const MatchmakingCreatedFragment = React.memo(() => {
    const router = React.useContext(XViewRouterContext)!;
    const unicorn = useUnicorn();
    const chatId = unicorn.query.roomId;
    const client = useClient();
    const data = client.useMatchmakingRoom({ peerId: chatId }).matchmakingRoom;

    const haveMyData = data && data.myProfile;

    if (!haveMyData) {
        return null;
    }

    const onStart = () => {
        router.navigate(`/matchmaking/${chatId}/users`);
    };

    return (
        <Page flexGrow={1} track="matchmaking_profile_created" padded={true}>
            <XView flexGrow={1}>
                <XView flexGrow={1}>
                    <div className={mainContainer}>
                        <PicConfeti className={confetiStyle} />
                        <div className={cx(TextTitle1, titleStyle)}>Profile created</div>
                        <div className={cx(TextBody, subtitleStyle)}>
                            You can always update your profile later
                        </div>
                        <div className={userCardContainer}>
                            <UAvatar
                                title={data!.myProfile!.user.name}
                                id={data!.myProfile!.user.id}
                                photo={data!.myProfile!.user.photo}
                                size="large"
                            />
                            <XView
                                width="70%"
                                backgroundColor="#E86CB6"
                                borderRadius={10}
                                marginTop={20}
                                marginBottom={30}
                                height={18}
                            />
                            <XView
                                width="100%"
                                alignSelf="flex-start"
                                backgroundColor="#E1E4EA"
                                borderRadius={8}
                                marginBottom={13}
                                height={12}
                            />
                            <XView
                                width="80%"
                                alignSelf="flex-start"
                                backgroundColor="#E1E4EA"
                                borderRadius={8}
                                marginBottom={13}
                                height={12}
                            />
                            <XView
                                width="60%"
                                alignSelf="flex-start"
                                backgroundColor="#E1E4EA"
                                borderRadius={8}
                                marginBottom={13}
                                height={12}
                            />
                            <XView
                                width="90%"
                                alignSelf="flex-start"
                                backgroundColor="#E1E4EA"
                                borderRadius={8}
                                height={12}
                            />
                        </div>
                    </div>
                </XView>
                <UButton
                    text="See my matches"
                    size="large"
                    alignSelf="center"
                    onClick={onStart}
                    marginBottom={60}
                    marginTop={20}
                />
            </XView>
        </Page>
    );
});
