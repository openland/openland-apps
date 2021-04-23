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
    type: ReportCallErrorType | 'system-user-loading' | 'system-participants-lists-unmatch',
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
    const reportUserLoading = React.useCallback(() => {
        notifyError({
            type: 'system-user-loading',
            info: analyticsRef.current
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
    return { reportUserError, reportUserLoading };
};
