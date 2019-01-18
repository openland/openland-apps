import * as React from 'react';
import { ServiceMessageDefault } from './service/ServiceMessageDefault';
import { ServiceMessageLeft } from './service/ServiceMessageLeft';
import { ServiceMessageJoin } from './service/ServiceMessageJoin';
import { ServiceMessagePhotoChanged } from './service/ServiceMessagePhotoChanged';
import { ServiceMessageTitleChanged } from './service/ServiceMessageTitleChanged';
import { ServiceMessageReplyDefault } from './service/ServiceMessageReplyDefault';
import { ServiceMessageReplyJobApply } from './service/ServiceMessageReplyJobApply';
import { ServiceMessageReplyJobRecommend } from './service/ServiceMessageReplyJobRecommend';
import { ServiceMessageReplyStartupRecommend } from './service/ServiceMessageReplyStartupRecommend';

const isRespondToPostServiceMessage = (message: string) => {
    return message.includes('is responding to your post') && message.includes('Now you can chat!');
};
const isOfficeHourseServiceMessage = isRespondToPostServiceMessage;
const isJobOpportunityApplyTextServiceMessage = (message: string) => {
    return (
        message.includes('is interested in your job opportunity') &&
        message.includes('as the next step, please, tell')
    );
};
const isJobOpportunityRecomendTextServiceMessage = (message: string) => {
    return (
        message.includes('is looking to recommend a candidate in response to your post') &&
        message.includes('please, describe your recommended candidate, how well do you know')
    );
};
const isRequestForStartupsApplyTextServiceMessage = isRespondToPostServiceMessage;
const isRequestForStartupsRecomendTextServiceMessage = (message: string) => {
    return message.includes('is interested to make a recommendation following up to your post');
};

type ServiceMessageType = 'JOIN' | 'POST' | 'KICK' | 'PHOTO_CHANGE' | 'TITLE_CHANGE';

type PostMessageType = 'BLANK' | 'JOB_OPPORTUNITY' | 'REQUEST_FOR_STARTUPS' | 'OFFICE_HOURS';
type PostMessageSubType = 'APPLY_TEXT' | 'RECOMMEND_TEXT' | null;

const ServiceMessageComponentByTypes = ({
    typesObject,
    otherParams,
}: {
    typesObject: {
        type: ServiceMessageType;
        postMessageType?: PostMessageType;
        postMessageSubType?: PostMessageSubType;
    };
    otherParams: any;
}) => {
    if (typesObject.type === 'POST') {
        const {
            postMessageType,
            postMessageSubType,
        }: {
            postMessageType: PostMessageType;
            postMessageSubType: PostMessageSubType;
        } = typesObject as {
            postMessageType: PostMessageType;
            postMessageSubType: PostMessageSubType;
        };

        const message = otherParams.message;
        const postTitle = message.substring(message.lastIndexOf('“') + 1, message.lastIndexOf('”'));

        const postServiceProps = {
            postAuthorUser: otherParams.alphaMentions[0].user,
            responderUser: otherParams.alphaMentions[1].user,
            chat: otherParams.alphaMentions[2].sharedRoom,
            postTitle,
            myUserId: otherParams.myUserId,
        };

        if (postMessageType === 'BLANK') {
            return <ServiceMessageReplyDefault {...postServiceProps} />;
        } else if (postMessageType === 'JOB_OPPORTUNITY') {
            if (postMessageSubType === 'APPLY_TEXT') {
                return <ServiceMessageReplyJobApply {...postServiceProps} />;
            } else if (postMessageSubType === 'RECOMMEND_TEXT') {
                return <ServiceMessageReplyJobRecommend {...postServiceProps} />;
            }
        } else if (postMessageType === 'OFFICE_HOURS') {
            return <ServiceMessageReplyDefault {...postServiceProps} />;
        } else if (postMessageType === 'REQUEST_FOR_STARTUPS') {
            if (postMessageSubType === 'APPLY_TEXT') {
                return <ServiceMessageReplyDefault {...postServiceProps} />;
            } else if (postMessageSubType === 'RECOMMEND_TEXT') {
                return <ServiceMessageReplyStartupRecommend {...postServiceProps} />;
            }
        }
    } else if (typesObject.type === 'JOIN') {
        return (
            <ServiceMessageJoin
                joinedByUser={otherParams.senderUser}
                myUserId={otherParams.myUserId}
                serviceMetadata={otherParams.serviceMetadata}
                alphaMentions={otherParams.alphaMentions}
            />
        );
    } else if (typesObject.type === 'KICK') {
        return (
            <ServiceMessageLeft
                kickedByUser={otherParams.senderUser}
                kickedUser={otherParams.serviceMetadata.user}
                myUserId={otherParams.myUserId}
            />
        );
    } else if (typesObject.type === 'PHOTO_CHANGE') {
        return <ServiceMessagePhotoChanged />;
    } else if (typesObject.type === 'TITLE_CHANGE') {
        return <ServiceMessageTitleChanged newRoomName={otherParams.serviceMetadata.title} />;
    }

    return <ServiceMessageDefault message={otherParams.message} />;
};

const hackToGuessPostMessageType = (message: string) => {
    if (isRespondToPostServiceMessage(message)) {
        return {
            type: 'POST',
            postMessageType: 'BLANK',
        };
    } else if (isOfficeHourseServiceMessage(message)) {
        return {
            type: 'POST',
            postMessageType: 'OFFICE_HOURS',
        };
    } else if (isJobOpportunityApplyTextServiceMessage(message)) {
        return {
            type: 'POST',
            postMessageType: 'JOB_OPPORTUNITY',
            postMessageSubType: 'APPLY_TEXT',
        };
    } else if (isJobOpportunityRecomendTextServiceMessage(message)) {
        return {
            type: 'POST',
            postMessageType: 'JOB_OPPORTUNITY',
            postMessageSubType: 'RECOMMEND_TEXT',
        };
    } else if (isRequestForStartupsApplyTextServiceMessage(message)) {
        return {
            type: 'POST',
            postMessageType: 'REQUEST_FOR_STARTUPS',
            postMessageSubType: 'APPLY_TEXT',
        };
    } else if (isRequestForStartupsRecomendTextServiceMessage(message)) {
        return {
            type: 'POST',
            postMessageType: 'REQUEST_FOR_STARTUPS',
            postMessageSubType: 'RECOMMEND_TEXT',
        };
    }
    return null;
};

const resolveServiceMessageType = ({
    serviceMetadata,
    message,
}: {
    serviceMetadata: any;
    message: string;
}) => {
    if (serviceMetadata) {
        if (serviceMetadata.__typename === 'InviteServiceMetadata') {
            return {
                type: 'JOIN',
            };
        } else if (serviceMetadata.__typename === 'KickServiceMetadata') {
            return {
                type: 'KICK',
            };
        } else if (serviceMetadata.__typename === 'PhotoChangeServiceMetadata') {
            return {
                type: 'PHOTO_CHANGE',
            };
        } else if (serviceMetadata.__typename === 'TitleChangeServiceMetadata') {
            return {
                type: 'TITLE_CHANGE',
            };
        } else {
            return null;
            // throw `service message is unresolved ${serviceMetadata.__typename}`;
        }
    }
    // Post Service Messages does not pass serviceMetadata so I try to guess
    return hackToGuessPostMessageType(message);
};

export const ServiceMessageComponent = (params: {
    senderUser: any;
    serviceMetadata: any;
    message: string;
    alphaMentions: any;
    myUserId: string;
}) => {
    const typesObject = resolveServiceMessageType({
        serviceMetadata: params.serviceMetadata,
        message: params.message,
    }) as any;

    if (typesObject === null) {
        return <ServiceMessageDefault message={params.message} />;
    }

    return <ServiceMessageComponentByTypes typesObject={typesObject} otherParams={params} />;
};
