import * as React from 'react';
import { XView } from 'react-mental';
import { OthersPopper } from './OthersPopper';
import { UserPopper } from './UserPopper';
import { MessageTextComponent } from './MessageTextComponent';
import { MentionComponentInnerText } from 'openland-x/XRichTextInput';
import { css } from 'linaria';
import { XLink } from 'openland-x/XLink';

const roomLinkClassName = css`
    color: #1790ff;
`;

const LinkToRoom = ({ children, roomId }: any) => {
    return (
        <XLink
            className={roomLinkClassName}
            path={`/mail/${roomId}`}
            onClick={(e: any) => e.stopPropagation()}
        >
            {children}
        </XLink>
    );
};
const spanWithWhiteSpacesClassName = css`
    white-space: pre;
    text-align: center;
`;

const SpanWithWhiteSpaces = ({ children }: { children: any }) => (
    <span className={spanWithWhiteSpacesClassName}>{children}</span>
);

const MentionedUser = ({ user, isYou }: { user: any; isYou: boolean }) => {
    return (
        <UserPopper user={user} isMe={isYou} noCardOnMe startSelected={false}>
            <MentionComponentInnerText isYou={isYou}>{user.name}</MentionComponentInnerText>
        </UserPopper>
    );
};

const Container = ({ children }: { children: any }) => (
    <XView flexDirection="column" alignItems="center">
        <XView flexDirection="row" alignItems="center" color={'#99a2b0'}>
            <SpanWithWhiteSpaces>{children}</SpanWithWhiteSpaces>
        </XView>
    </XView>
);

// Service Messages

export const TextServiceMessageFallback = ({ message }: { message: string }) => {
    return (
        <Container>
            <MessageTextComponent message={message} isEdited={false} isService={true} />
        </Container>
    );
};

export const KickServiceServiceMessage = TextServiceMessageFallback;
export const PhotoChangeServiceMessage = TextServiceMessageFallback;
export const TitleChangeServiceMessage = TextServiceMessageFallback;

export const JoinOneServiceMessage = ({
    firstUser,
    myUserId,
}: {
    firstUser: any;
    myUserId: string;
}) => (
    <Container>
        🙌
        <MentionedUser user={firstUser} isYou={myUserId === firstUser.id} /> joined the room
    </Container>
);

export const JoinTwoServiceMessage = ({
    firstUser,
    secondUser,
    myUserId,
}: {
    firstUser: any;
    secondUser: any;
    myUserId: string;
}) => (
    <Container>
        🙌
        <MentionedUser user={firstUser} isYou={myUserId === firstUser.id} /> joined the room along
        with <MentionedUser user={secondUser} isYou={myUserId === secondUser.id} />
    </Container>
);

export const JoinManyServiceMessage = ({
    firstUser,
    otherUsers,
    myUserId,
}: {
    firstUser: any;
    otherUsers: any;
    myUserId: string;
}) => {
    return (
        <Container>
            🙌
            <MentionedUser user={firstUser} isYou={myUserId === firstUser.id} /> joined the room
            along with{' '}
            <span>
                <OthersPopper
                    show={true}
                    items={otherUsers.map(({ id, name, photo, primaryOrganization }: any) => ({
                        title: name,
                        subtitle: primaryOrganization ? primaryOrganization.name : '',
                        photo,
                        id,
                    }))}
                >
                    {otherUsers.length} others
                </OthersPopper>
            </span>
        </Container>
    );
};

type PostServiceMessageProps = {
    postAuthorUser: any;
    responderUser: any;
    chat: {
        id: string;
        title: string;
    };
    postTitle: string;
    myUserId: string;
};

const isRespondToPostServiceMessage = (message: string) => {
    return message.includes('is responding to your post') && message.includes('Now you can chat!');
};

export const RespondToPostServiceMessage = ({
    postAuthorUser,
    responderUser,
    chat,
    postTitle,
    myUserId,
}: PostServiceMessageProps) => {
    const amIPostAuthor = myUserId === postAuthorUser.id;
    return (
        <Container>
            🙌
            <MentionedUser user={postAuthorUser} isYou={amIPostAuthor} /> —{' '}
            <MentionedUser user={responderUser} isYou={!amIPostAuthor} /> is responding to your post{' '}
            <strong>“{postTitle}“</strong> in <LinkToRoom roomId={chat.id}>{chat.title}</LinkToRoom>
            .
            <br />
            Now you can chat!
        </Container>
    );
};

const isOfficeHourseServiceMessage = isRespondToPostServiceMessage;
export const OfficeHourseServiceMessage = RespondToPostServiceMessage;

const isJobOpportunityApplyTextServiceMessage = (message: string) => {
    return (
        message.includes('is interested in your job opportunity') &&
        message.includes('as the next step, please, tell')
    );
};

export const JobOpportunityApplyTextServiceMessage = ({
    postAuthorUser,
    responderUser,
    chat,
    postTitle,
    myUserId,
}: PostServiceMessageProps) => {
    const amIPostAuthor = myUserId === postAuthorUser.id;
    return (
        <Container>
            🙌
            <MentionedUser user={postAuthorUser} isYou={amIPostAuthor} /> —{' '}
            <MentionedUser user={responderUser} isYou={!amIPostAuthor} /> is interested in your job
            opportunity <strong>“{postTitle}“</strong> in{' '}
            <LinkToRoom roomId={chat.id}>{chat.title}</LinkToRoom>.
            <br />
            <MentionedUser user={responderUser} isYou={!amIPostAuthor} /> — as the next step,
            please, tell <MentionedUser user={postAuthorUser} isYou={amIPostAuthor} /> — a little
            bit about yourself.
        </Container>
    );
};

const isJobOpportunityRecomendTextServiceMessage = (message: string) => {
    return (
        message.includes('is looking to recommend a candidate in response to your post') &&
        message.includes('please, describe your recommended candidate, how well do you know')
    );
};

export const JobOpportunityRecomendTextServiceMessage = ({
    postAuthorUser,
    responderUser,
    chat,
    postTitle,
    myUserId,
}: PostServiceMessageProps) => {
    const amIPostAuthor = myUserId === postAuthorUser.id;
    return (
        <Container>
            🙌
            <MentionedUser user={postAuthorUser} isYou={amIPostAuthor} /> —{' '}
            <MentionedUser user={responderUser} isYou={!amIPostAuthor} /> is looking to recommend a
            candidate in response to your post <strong>“{postTitle}“</strong> in{' '}
            <LinkToRoom roomId={chat.id}>{chat.title}</LinkToRoom>.
            <br />
            <MentionedUser user={postAuthorUser} isYou={amIPostAuthor} /> — as the next step,
            please, describe your recommended candidate, how well do you know them, and share any
            relevant links.
        </Container>
    );
};

const isRequestForStartupsApplyTextServiceMessage = isRespondToPostServiceMessage;
export const RequestForStartupsApplyTextServiceMessage = RespondToPostServiceMessage;

const isRequestForStartupsRecomendTextServiceMessage = (message: string) => {
    return message.includes('is interested to make a recommendation following up to your post');
};

export const RequestForStartupsRecomendTextServiceMessage = ({
    postAuthorUser,
    responderUser,
    chat,
    postTitle,
    myUserId,
}: PostServiceMessageProps) => {
    const amIPostAuthor = myUserId === postAuthorUser.id;
    return (
        <Container>
            🙌
            <MentionedUser user={postAuthorUser} isYou={amIPostAuthor} /> —{' '}
            <MentionedUser user={responderUser} isYou={!amIPostAuthor} /> is interested to make a
            recommendation following up to your post <strong>“{postTitle}“</strong> in{' '}
            <LinkToRoom roomId={chat.id}>{chat.title}</LinkToRoom>.
        </Container>
    );
};

type ServiceMessageType =
    | 'JOIN'
    | 'POST'
    | 'KICK'
    | 'PHOTO_CHANGE'
    | 'PHOTO_CHANGE'
    | 'TITLE_CHANGE';

type PostMessageType = 'BLANK' | 'JOB_OPPORTUNITY' | 'REQUEST_FOR_STARTUPS' | 'OFFICE_HOURS';
type PostMessageSubType = 'APPLY_TEXT' | 'RECOMMEND_TEXT' | null;
type JoinMessageType = 'ONE' | 'TWO' | 'MANY';

const ServiceMessageComponentByTypes = ({
    typesObject,
    otherParams,
}: {
    typesObject: {
        type: ServiceMessageType;
        postMessageType?: PostMessageType;
        postMessageSubType?: PostMessageSubType;
        joinMessageType?: JoinMessageType;
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
            chat: otherParams.alphaMentions[2],
            postTitle,
            myUserId: otherParams.myUserId,
        };

        if (postMessageType === 'BLANK') {
            return <RespondToPostServiceMessage {...postServiceProps} />;
        } else if (postMessageType === 'JOB_OPPORTUNITY') {
            if (postMessageSubType === 'APPLY_TEXT') {
                return <JobOpportunityApplyTextServiceMessage {...postServiceProps} />;
            } else if (postMessageSubType === 'RECOMMEND_TEXT') {
                return <JobOpportunityRecomendTextServiceMessage {...postServiceProps} />;
            }
        } else if (postMessageType === 'OFFICE_HOURS') {
            return <OfficeHourseServiceMessage {...postServiceProps} />;
        } else if (postMessageType === 'REQUEST_FOR_STARTUPS') {
            if (postMessageSubType === 'APPLY_TEXT') {
                return <RespondToPostServiceMessage {...postServiceProps} />;
            } else if (postMessageSubType === 'RECOMMEND_TEXT') {
                return <RequestForStartupsRecomendTextServiceMessage {...postServiceProps} />;
            }
        }
    } else if (typesObject.type === 'JOIN') {
        const {
            joinMessageType,
        }: {
            joinMessageType: JoinMessageType;
        } = typesObject as {
            joinMessageType: JoinMessageType;
        };
        if (joinMessageType === 'ONE') {
            return (
                <JoinOneServiceMessage
                    myUserId={otherParams.myUserId}
                    firstUser={otherParams.alphaMentions[0].user}
                />
            );
        } else if (joinMessageType === 'TWO') {
            return (
                <JoinTwoServiceMessage
                    myUserId={otherParams.myUserId}
                    firstUser={otherParams.alphaMentions[0].user}
                    secondUser={otherParams.alphaMentions[1].user}
                />
            );
        } else if (joinMessageType === 'MANY') {
            return (
                <JoinManyServiceMessage
                    myUserId={otherParams.myUserId}
                    firstUser={otherParams.alphaMentions[0].user}
                    otherUsers={otherParams.alphaMentions
                        .slice(1)
                        .map(({ user }: { user: any }) => {
                            return user;
                        })}
                />
            );
        }
    } else if (typesObject.type === 'KICK') {
        return <KickServiceServiceMessage message={otherParams.message} />;
    } else if (typesObject.type === 'PHOTO_CHANGE') {
        return <PhotoChangeServiceMessage message={otherParams.message} />;
    } else if (typesObject.type === 'TITLE_CHANGE') {
        return <TitleChangeServiceMessage message={otherParams.message} />;
    }

    return <TextServiceMessageFallback message={otherParams.message} />;
};

const resolveJoinMessageType = ({ alphaMentions }: { alphaMentions: any }) => {
    if (alphaMentions === null) {
        return null;
    }
    if (alphaMentions.length === 1) {
        return {
            type: 'JOIN',
            joinMessageType: 'ONE',
        };
    } else if (alphaMentions.length === 2) {
        return {
            type: 'JOIN',
            joinMessageType: 'TWO',
        };
    } else if (alphaMentions.length > 2) {
        return {
            type: 'JOIN',
            joinMessageType: 'MANY',
        };
    } else {
        return null;
    }
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
    alphaMentions,
}: {
    serviceMetadata: any;
    message: any;
    alphaMentions: any;
}) => {
    if (serviceMetadata) {
        if (serviceMetadata.__typename === 'InviteServiceMetadata') {
            return resolveJoinMessageType({ alphaMentions: alphaMentions });
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

export const ServiceMessage = (params: {
    serviceMetadata: any;
    message: any;
    alphaMentions: any;
}) => {
    const typesObject = resolveServiceMessageType({
        serviceMetadata: params.serviceMetadata,
        message: params.message,
        alphaMentions: params.alphaMentions,
    }) as any;

    if (typesObject === null) {
        return <div />;
    }

    return <ServiceMessageComponentByTypes typesObject={typesObject} otherParams={params} />;
};
