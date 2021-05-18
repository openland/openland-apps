import copy from 'copy-to-clipboard';
import { cx, css } from 'linaria';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { TextBody, TextStyles } from 'openland-web/utils/TextStyles';
import { showModalBox } from 'openland-x/showModalBox';
import * as React from 'react';
import { XView } from 'react-mental';
import { SharedRoomKind } from 'openland-api/spacex.types';
import { useClient } from 'openland-api/useClient';
import { XLoader } from 'openland-x/XLoader';
import { MessengerContext } from 'openland-engines/MessengerEngine';

const linkStyle = css`
    flex-grow: 1;
    height: 40px;
    border-radius: 8px;
    padding: 8px 40px 8px 16px;
    background-color: var(--backgroundTertiaryTrans);
    color: var(--foregroundPrimary);
    text-overflow: ellipsis;
    overflow: hidden;
`;

const InviteToRoom = React.memo((props: { hide: () => void }) => {
    const { hide } = props;
    const [copied, setCopied] = React.useState(false);
    const client = useClient();
    const [roomInviteLink, setRoomInviteLink] = React.useState<string | undefined>();
    const [loading, setLoading] = React.useState(false);
    const messenger = React.useContext(MessengerContext)!;
    const voiceChatData = messenger.voiceChat.useVoiceChat();
    let timeoutId: any;

    React.useEffect(() => {
        (async () => {
            if (
                voiceChatData?.parentRoom?.kind === SharedRoomKind.GROUP &&
                !roomInviteLink &&
                !loading
            ) {
                setLoading(true);
                const invite = await client.queryRoomInviteLink(
                    { roomId: voiceChatData.parentRoom.id },
                    { fetchPolicy: 'network-only' },
                );

                setRoomInviteLink(invite.link);
                setLoading(false);
            }
        })();
    }, [voiceChatData?.parentRoom, roomInviteLink, loading]);

    const inviteEntity = (voiceChatData?.parentRoom || voiceChatData?.me!.user)!;
    const link = roomInviteLink
        ? `https://openland.com/invite/${roomInviteLink}`
        : `https://openland.com/${inviteEntity.shortname || inviteEntity.id}`;

    const handleCopy = () => {
        setCopied(true);
        if (timeoutId) {
            window.clearTimeout(timeoutId);
        }
        copy(link, { format: 'text/plain' });
        setTimeout(() => {
            setCopied(false);
        }, 1500);
    };
    if (!voiceChatData) {
        return null;
    }
    return (
        <XView>
            <XView
                paddingHorizontal={24}
                paddingVertical={12}
                color="var(--foregroundPrimary)"
                {...TextStyles.Title3}
            >
                Share room link
            </XView>
            <XView flexDirection="row" paddingHorizontal={24} marginBottom={24}>
                <div className={cx(linkStyle, TextBody)}>
                    {loading ? <XLoader loading={true} transparentBackground={true} /> : link}
                </div>
            </XView>
            <XModalFooter>
                <UButton text="Cancel" style="tertiary" size="large" onClick={hide} />
                <UButton
                    text={copied ? 'Copied' : 'Copy'}
                    style={copied ? 'success' : 'primary'}
                    size="large"
                    loading={loading}
                    onClick={handleCopy}
                />
            </XModalFooter>
        </XView>
    );
});

export const showInviteToRoom = (props: { roomId: string }) => {
    showModalBox({ title: 'Invite people', width: 480 }, (ctx) => (
        <InviteToRoom hide={ctx.hide} />
    ));
};
