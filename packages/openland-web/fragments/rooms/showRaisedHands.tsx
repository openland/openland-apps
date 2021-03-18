import { VoiceChatParticipant } from 'openland-api/spacex.types';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { UPresence } from 'openland-web/components/unicorn/UPresence';
import { showModalBox } from 'openland-x/showModalBox';
import { XScrollView3 } from 'openland-x/XScrollView3';
import * as React from 'react';
import { useClient } from 'openland-api/useClient';
import { JoinButton } from '../discover/components/JoinButton';
import { XView } from 'react-mental';
import { ImgWithRetry } from 'openland-web/components/ImgWithRetry';
import { css, cx } from 'linaria';
import { TextBody, TextTitle1 } from 'openland-web/utils/TextStyles';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { UButton } from 'openland-web/components/unicorn/UButton';

interface RaisedHandsProps {
    roomId: string;
    raisedHands: VoiceChatParticipant[];
}

const UserItem = React.memo((props: { roomId: string, participant: VoiceChatParticipant, hide: () => void }) => {
    const { user } = props.participant;
    const client = useClient();
    const promoteUser = React.useCallback(async () => {
        await client.mutateVoiceChatPromote({ id: props.roomId, uid: user.id });
    }, []);
    return (
        <UListItem
            title={user.name}
            description={<UPresence user={user} />}
            avatar={{ photo: user.photo, id: user.id, title: user.name, online: user.online }}
            rightElement={(
                <JoinButton
                    onClick={promoteUser}
                />
            )}
        />
    );
});

const titleStyle = cx(TextTitle1, css`
    color: var(--foregroundPrimary);
    text-align: center;
    margin-top: 16px;
`);

const subtitleStyle = cx(TextBody, css`
    color: var(--foregroundSecondary);
    text-align: center;
    margin-top: 8px;
    margin-bottom: 40px;
`);

const emptyImgStyle = css`
    height: 200px;
    margin-top: 40px;
`;

const RaisedHands = React.memo((props: RaisedHandsProps & { hide: () => void }) => {
    const { raisedHands, roomId, hide } = props;

    return (
        <XView>
            {raisedHands.length > 0 ? (
                <XScrollView3 minHeight={200}>
                    {raisedHands.map(x => <UserItem key={x.id} roomId={roomId} participant={x} hide={hide} />)}
                </XScrollView3>
            ) : (
                <XView alignItems="center">
                    <ImgWithRetry
                        className={emptyImgStyle}
                        src="/static/X/art-empty.png"
                        srcSet="/static/X/art-empty@2x.png 2x"
                    />
                    <div className={titleStyle}>
                        All quiet
                    </div>
                    <div className={subtitleStyle}>
                        No one raised their hand
                    </div>
                </XView>
            )}
            <XModalFooter>
                <UButton text="Close" style="primary" size="large" onClick={hide} />
            </XModalFooter>
        </XView>
    );
});

export const showRaisedHands = (props: RaisedHandsProps) => {
    showModalBox({ title: 'Raised Hands', width: 480 }, ctx => (
        <RaisedHands {...props} hide={ctx.hide} />
    ));
};
