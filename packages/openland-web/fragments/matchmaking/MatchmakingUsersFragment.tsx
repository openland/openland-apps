import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { XViewRouterContext } from 'react-mental';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { UButton } from 'openland-web/components/unicorn/UButton';
import AlertBlanket from 'openland-x/AlertBlanket';
import { useClient } from 'openland-web/utils/useClient';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { TextBody, TextTitle1, TextTitle2, TextTitle3 } from 'openland-web/utils/TextStyles';
import { showAddMembersModal } from 'openland-web/fragments/chat/showAddMembersModal';
import { MatchmakingRoom_matchmakingRoom_profiles } from 'openland-api/Types';

const secondaryCardContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 368px;
    width: 100%;
    align-self: center;
    border-radius: 18px;
    padding: 40px 40px 55px 40px;
    margin-bottom: 16px;
`;

const secondaryCardContainerInvite = css`
    background: linear-gradient(0deg, #617bee, #617bee), #4779ea;
    box-shadow: 0px 8px 24px rgba(23, 26, 31, 0.08), 0px 2px 8px rgba(23, 26, 31, 0.02);
`;

const secondaryCardContainerInstall = css`
    background: #200d48;
    box-shadow: 0px 8px 24px rgba(23, 26, 31, 0.08), 0px 2px 8px rgba(23, 26, 31, 0.02);
`;

const invitePic = css`
    max-width: 132px;
    max-height: 114px;
    margin-bottom: 20px;
    object-fit: contain;
`;

const installPic = css`
    max-width: 166px;
    max-height: 112px;
    margin-bottom: 24px;
    object-fit: contain;
`;

const secondaryCardTitle = css`
    color: #ffffff;
    margin-bottom: 8px;
    text-align: center;
`;

const secondaryCardText = css`
    color: #ffffff;
    margin-bottom: 16px;
    text-align: center;
`;

const secondaryCardInviteTextWidth = css`
    max-width: 190px;
`;

const secondaryCardInstallTextWidth = css`
    max-width: 210px;
`;

const inviteButtonStyle = css`
    color: #4b67e1;
    background-color: #fff;
    &:hover,
    &:active {
        background-color: #fff;
    }
`;

const installButtonStyle = css`
    color: #200d48;
    background-color: #fff;
    &:hover,
    &:active {
        background-color: #fff;
    }
`;

const InviteCard = (props: { chatId: string }) => (
    <div className={cx(secondaryCardContainer, secondaryCardContainerInvite)}>
        <img
            className={invitePic}
            src="https://cdn.openland.com/shared/web/matchmaking/invite@1x.png"
            srcSet="https://cdn.openland.com/shared/web/matchmaking/invite@2x.png 2x"
        />
        <div className={cx(TextTitle2, secondaryCardTitle)}>More people, more matches</div>
        <div className={cx(TextBody, secondaryCardText, secondaryCardInviteTextWidth)}>
            Help us grow and connect this community
        </div>
        <UButton
            text="Invite friends"
            className={inviteButtonStyle}
            onClick={() =>
                showAddMembersModal({ id: props.chatId, isGroup: true, isOrganization: false })
            }
        />
    </div>
);

const InstallCard = (props: { onInstall: () => void }) => (
    <div className={cx(secondaryCardContainer, secondaryCardContainerInstall)}>
        <img
            className={installPic}
            src="https://cdn.openland.com/shared/web/matchmaking/install@1x.png"
            srcSet="https://cdn.openland.com/shared/web/matchmaking/install@2x.png 2x"
        />
        <div className={cx(TextTitle2, secondaryCardTitle)}>Don’t miss new matches</div>
        <div className={cx(TextBody, secondaryCardText, secondaryCardInstallTextWidth)}>
            Get notified when new matches become available
        </div>
        <UButton text="Install app" className={installButtonStyle} onClick={props.onInstall} />
    </div>
);

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
    margin-bottom: 8px;
`;

const subtitleStyle = css`
    color: var(--foregroundSecondary);
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
`;

const usersCardsContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const userCardContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 368px;
    width: 100%;
    align-self: center;
    background: #fff;
    box-shadow: 0px 8px 24px rgba(23, 26, 31, 0.08), 0px 2px 8px rgba(23, 26, 31, 0.02);
    border-radius: 18px;
    padding: 56px 40px 70px 40px;
    margin-bottom: 16px;
`;

const userNameStyle = css`
    color: var(--foregroundPrimary);
    margin-top: 16px;
`;

const userOrgStyle = css`
    color: var(--foregroundTertiary);
    margin-bottom: 4px;
`;

const userTagsStyle = css`
    color: var(--foregroundPrimary);
    text-align: center;
    margin-bottom: 16px;
`;

interface UserCardProps {
    data: MatchmakingRoom_matchmakingRoom_profiles;
    chatId: string;
    acceptShowingModal: boolean;
    setAcceptShowingModal: Function;
}

const UserCard = React.memo((props: UserCardProps) => {
    const [prevButtonState] = React.useState(props.data.chatCreated);
    const [changeCreatedButton, setChangeCreatedButton] = React.useState(false);
    const client = useClient();
    const { user } = props.data;

    React.useEffect(
        () => {
            if (props.data.chatCreated !== prevButtonState) {
                setChangeCreatedButton(true);
            }
        },
        [props.data.chatCreated],
    );

    const showModal = () => {
        AlertBlanket.builder()
            .cancelable(false)
            .title('All new chats will be in your Openland inbox')
            .action(
                'Got it',
                async () => {
                    props.setAcceptShowingModal(false);
                },
                'primary',
            )
            .show();
    };

    const createChat = async () => {
        await client.mutateMatchmakingConnect({
            peerId: props.chatId,
            uid: user.id,
        });
        await client.refetchMatchmakingRoom({
            peerId: props.chatId,
        });
    };

    return (
        <div className={userCardContainer}>
            <UAvatar title={user.name} id={user.id} photo={user.photo} size="xx-large" />
            <div className={cx(TextTitle2, userNameStyle)}>{user.name}</div>
            {user.primaryOrganization && (
                <div className={cx(TextBody, userOrgStyle)}>{user.primaryOrganization.name}</div>
            )}
            <div className={cx(TextBody, userTagsStyle)}>
                <span>Interested in: </span>
                {props.data.answers.map((i, j) => {
                    if (i.__typename === 'MultiselectMatchmakingAnswer') {
                        return (
                            <span key={`answers_${j}_${user.id}`}>
                                {i.tags.map((k, n) => {
                                    if (n + 1 !== i.tags.length) {
                                        return <span key={`answer_${n}_${user.id}`}>{k}, </span>;
                                    }
                                    return <span key={`answer_${n}_${user.id}`}>{k}</span>;
                                })}
                            </span>
                        );
                    }
                    return null;
                })}
            </div>
            {props.data.chatCreated &&
                !changeCreatedButton && (
                    <UButton
                        text="Connected"
                        style="secondary"
                        onClick={
                            props.acceptShowingModal
                                ? () => {
                                      showModal();
                                      props.setAcceptShowingModal(false);
                                  }
                                : undefined
                        }
                    />
                )}
            {props.data.chatCreated &&
                changeCreatedButton && (
                    <UButton
                        text="Chat created"
                        style="success"
                        onClick={
                            props.acceptShowingModal
                                ? () => {
                                      showModal();
                                      props.setAcceptShowingModal(false);
                                  }
                                : undefined
                        }
                    />
                )}
            {!props.data.chatCreated && <UButton text="Connect" action={createChat} />}
        </div>
    );
});

const skipStyle = css`
    cursor: pointer;
    color: var(--foregroundSecondary);
`;

const TitleRender = (props: { onDone: () => void }) => {
    return (
        <XView flexGrow={1} flexDirection="row" justifyContent="flex-end" alignItems="center">
            <div onClick={props.onDone} className={cx(TextTitle3, skipStyle)}>
                Done
            </div>
        </XView>
    );
};

export const MatchmakingUsersFragment = React.memo(() => {
    const [acceptShowingModal, setAcceptShowingModal] = React.useState(true);
    const router = React.useContext(XViewRouterContext)!;
    const unicorn = useUnicorn();
    let chatId = unicorn.query.roomId;
    const fromGroup = unicorn.path.startsWith('/group/');
    if (fromGroup) {
        chatId = unicorn.query.id;
    }
    const client = useClient();
    const data = client.useMatchmakingRoom({ peerId: chatId }).matchmakingRoom;

    const haveMyData = data && data.myProfile;
    const haveOtherProfiles = data && data.profiles && data.profiles.length > 1;

    if (!haveMyData) {
        return null;
    }

    const onDone = () => {
        router.navigate(`/matchmaking/${chatId}/install`);
    };

    return (
        <Page flexGrow={1} track="matchmaking_users" padded={true}>
            <UHeader titleView={fromGroup ? undefined : <TitleRender onDone={onDone} />} />
            <XView flexGrow={1}>
                <XView flexGrow={1}>
                    <div className={mainContainer}>
                        <div className={cx(TextTitle1, titleStyle)}>Member profiles</div>
                        {haveOtherProfiles && (
                            <div className={cx(TextBody, subtitleStyle)}>
                                Choose people you want to chat with
                            </div>
                        )}
                        <div className={usersCardsContainer}>
                            {data!.profiles!.map((i, j, arr) => {
                                const arrLength = arr.length;
                                const showInviteCard = (j === 3 || arrLength === 2) && !(j > 3);
                                const showInstallCard = (j === 3 || arrLength === 2) && !(j > 3);

                                if (arrLength === 1) {
                                    return (
                                        <>
                                            <InviteCard chatId={chatId} />
                                            <InstallCard onInstall={onDone} />
                                        </>
                                    );
                                }
                                if (i.user.id !== data!.myProfile!.user.id) {
                                    return (
                                        <>
                                            <UserCard
                                                data={i}
                                                chatId={chatId}
                                                key={i.user.id}
                                                acceptShowingModal={acceptShowingModal}
                                                setAcceptShowingModal={setAcceptShowingModal}
                                            />
                                            {showInviteCard && <InviteCard chatId={chatId} />}
                                            {showInstallCard && <InstallCard onInstall={onDone} />}
                                        </>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                </XView>
            </XView>
        </Page>
    );
});
