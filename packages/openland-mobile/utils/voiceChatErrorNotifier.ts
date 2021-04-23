import * as React from 'react';
import Bugsnag from '@bugsnag/react-native';
import { MediaSessionState } from 'openland-engines/media/MediaSessionState';
import { Conference_conference_peers } from 'openland-api/spacex.types';
import { VoiceChatT } from 'openland-y-utils/voiceChat/voiceChatWatcher';

export type ReportCallErrorType = 'report-self-micro'
    | 'report-self-speaker'
    | 'report-self-loading'
    | 'report-user-loading';

type CallError = {
    type: ReportCallErrorType | 'system-user-loading' | 'system-participants-lists-unmatch' | 'system-user-out-of-call',
    info: any,
};

const notifyError = (error: CallError) => {
    Bugsnag.notify({
        name: error.type,
        message: JSON.stringify(error.info),
    });
};

export const useVoiceChatErrorNotifier = ({ callState, peers, appConnecting, voiceChat }: {
    callState: MediaSessionState | undefined,
    voiceChat: VoiceChatT,
    peers: Conference_conference_peers[] | undefined,
    appConnecting: boolean
}) => {
    const analyticsRef = React.useRef<any>({});
    analyticsRef.current = {
        callState,
        peers: peers,
        appConnecting: appConnecting,
        voiceChat
    };
    const reportUserLoading = React.useCallback((moreData: { userId: string, peersIds: string[] }) => {
        notifyError({
            type: 'system-user-loading',
            info: { ...moreData, ...analyticsRef.current },
        });
    }, []);
    const reportUserError = React.useCallback((type: ReportCallErrorType) => {
        notifyError({
            type,
            info: analyticsRef.current
        });
    }, []);
    React.useEffect(() => {
        if (
            voiceChat.speakers && voiceChat.speakers.length !== voiceChat.speakersCount
            || voiceChat.listeners && voiceChat.listeners.length !== voiceChat.listenersCount
        ) {
            notifyError({
                type: 'system-participants-lists-unmatch',
                info: analyticsRef.current
            });
        }
    }, [voiceChat.speakers, voiceChat.listeners, voiceChat.speakersCount, voiceChat.listenersCount]);

    const voiceChatRef = React.useRef<VoiceChatT>(voiceChat);
    voiceChatRef.current = voiceChat;
    React.useEffect(() => {
        let timerId: any;
        if (!voiceChat.me) {
            timerId = setTimeout(() => {
                if (!voiceChatRef.current.me) {
                    notifyError({
                        type: 'system-user-out-of-call',
                        info: { senderId: callState?.sender.id, ...analyticsRef.current }
                    });
                }
            }, 2000);
        }
        return () => {
            clearTimeout(timerId);
        };
    }, [voiceChat.me]);

    return { reportUserError, reportUserLoading };
};
