import * as React from 'react';
import { XView } from 'react-mental';
import { css, cx } from 'linaria';

import { MediaSessionTrackAnalyzerManager } from 'openland-engines/media/MediaSessionTrackAnalyzer';
import { VoiceChatT } from 'openland-engines/VoiceChatEngine';
import { VoiceChatParticipantStatus, VoiceChatSpeaker } from 'openland-api/spacex.types';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { ImgWithRetry } from 'openland-web/components/ImgWithRetry';
import { TextLabel2, TextStyles } from 'openland-web/utils/TextStyles';
import IcAdd from 'openland-icons/s/ic-add-36.svg';

import { showInviteToRoom } from './showInviteToRoom';
import { showRaisedHands } from './showRaisedHands';
import { RoomUser } from './RoomUser';

const buttonLabelStyle = cx(
    TextLabel2,
    css`
        color: var(--foregroundPrimary);
        text-align: center;
    `,
);

const speakersGridStyle = css`
    margin: 0 -9px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const RaisedHandsButton = (props: { raisedHands: number; roomId: string }) => {
    const { raisedHands, roomId } = props;

    return (
        <XView
            alignItems="center"
            padding={8}
            hoverBackgroundColor="var(--backgroundTertiaryTrans)"
            hoverBorderRadius={8}
            marginHorizontal={4}
            hoverCursor="pointer"
            onClick={() => showRaisedHands({ roomId })}
        >
            <XView
                width={80}
                height={80}
                backgroundColor="#F8F2E1"
                justifyContent="center"
                alignItems="center"
                borderRadius={100}
                marginTop={8}
                marginBottom={10}
            >
                <ImgWithRetry
                    src="//cdn.openland.com/shared/rooms/wave-hand-36.png"
                    srcSet="//cdn.openland.com/shared/rooms/wave-hand-36@2x.png 2x, //cdn.openland.com/shared/rooms/wave-hand-36@3x.png 3x"
                />
                {raisedHands > 0 && (
                    <XView
                        position="absolute"
                        bottom={0}
                        right={0}
                        width={24}
                        height={24}
                        zIndex={2}
                        borderRadius={12}
                        backgroundColor="var(--backgroundPrimary)"
                        justifyContent="center"
                        alignItems="center"
                        color="var(--foregroundPrimary)"
                        {...TextStyles.Detail}
                    >
                        {raisedHands > 9 ? `9+` : raisedHands}
                    </XView>
                )}
            </XView>
            <div className={buttonLabelStyle}>Raised hands</div>
        </XView>
    );
};

const InviteButton = React.memo((props: { roomId: string }) => (
    <XView
        alignItems="center"
        padding={8}
        marginHorizontal={4}
        hoverBackgroundColor="var(--backgroundTertiaryTrans)"
        hoverBorderRadius={8}
        hoverCursor="pointer"
    >
        <XView
            width={80}
            height={80}
            backgroundColor="var(--backgroundTertiaryTrans)"
            hoverBackgroundColor="var(--backgroundTertiaryHoverTrans)"
            justifyContent="center"
            alignItems="center"
            cursor="pointer"
            borderRadius={100}
            marginTop={8}
            marginBottom={10}
            onClick={() => showInviteToRoom({ roomId: props.roomId })}
        >
            <UIcon icon={<IcAdd />} size={36} color="var(--foregroundSecondary)" />
        </XView>
        <div className={buttonLabelStyle}>Invite</div>
    </XView>
));

interface RoomSpeakerUserProps {
    peersIds: string[];
    analyzer: MediaSessionTrackAnalyzerManager;
    isLoading?: boolean;
    isMuted?: boolean;
    id: string;
    name: string;
    photo: string | null;
    roomId: string;
    userStatus: VoiceChatParticipantStatus;
    selfStatus?: VoiceChatParticipantStatus;
    selfId?: string;
}

const RoomSpeakerUser = React.memo((props: RoomSpeakerUserProps) => {
    const { peersIds, analyzer, isLoading, isMuted, ...other } = props;
    const isTalking = analyzer.usePeers(peersIds);
    const state = isLoading ? 'loading' : isMuted ? 'muted' : isTalking ? 'talking' : undefined;

    return <RoomUser state={state} {...other} />;
});

interface RoomSpeakersProps {
    room: VoiceChatT;
    analyzer: MediaSessionTrackAnalyzerManager;
    showInviteButton: boolean;
    speakers: {
        isMuted: boolean;
        isLoading: boolean;
        peersIds: string[];
        speaker: VoiceChatSpeaker;
    }[];
}

export const RoomSpeakers = React.memo((props: RoomSpeakersProps) => {
    const { room, analyzer, showInviteButton, speakers } = props;

    return (
        <div className={speakersGridStyle}>
            {speakers.map(({ speaker, isMuted, isLoading, peersIds }) => (
                <RoomSpeakerUser
                    key={speaker.id}
                    name={speaker.user.firstName}
                    id={speaker.user.id}
                    isLoading={isLoading}
                    isMuted={isMuted}
                    analyzer={analyzer}
                    photo={speaker.user.photo}
                    roomId={room.id}
                    selfId={room.me?.user.id}
                    peersIds={peersIds}
                    selfStatus={room.me?.status}
                    userStatus={speaker.status}
                />
            ))}
            {speakers.length <= 8 && room.me?.status === VoiceChatParticipantStatus.ADMIN && (
                <>
                    <RaisedHandsButton raisedHands={room.handRaisedCount} roomId={room.id} />
                    {showInviteButton && <InviteButton roomId={room.id} />}
                </>
            )}
        </div>
    );
});
