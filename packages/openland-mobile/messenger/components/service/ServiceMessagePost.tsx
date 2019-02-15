import * as React from 'react';
import { Container } from './views/Container';
import {
    UserShort,
    MessageFull_serviceMetadata_PostRespondServiceMetadata,
    RoomShort,
} from 'openland-api/Types';
import { UserWrapper } from './views/UserWrapper';
import { RoomWrapper } from './views/RoomWrapper';
import { ConversationTheme } from '../../../pages/main/themes/ConversationThemeResolver';

interface PostDefaultSeviceMessageProps {
    postAuthor: UserShort;
    responder: UserShort;
    chat: RoomShort;
    postTitle: string | null;

    onUserPress: (id: string) => void;
    onRoomPress: (id: string) => void;
    myUserId: string;
    theme: ConversationTheme;
}

const BlankRespondServiceMessage = (props: PostDefaultSeviceMessageProps) => {
    let { postAuthor, responder, chat, postTitle, onUserPress, onRoomPress, myUserId } = props;

    return (
        <Container theme={props.theme}>
            🙌 <UserWrapper theme={props.theme} user={postAuthor} onUserPress={onUserPress} myUserId={myUserId} /> —{' '}
            <UserWrapper theme={props.theme} user={responder} onUserPress={onUserPress} myUserId={myUserId} /> is
            responding to your post “{postTitle}” in{' '}
            <RoomWrapper theme={props.theme} room={chat} onRoomPress={onRoomPress} />.{'\n'}Now you can chat!
        </Container>
    );
};

const JobOportunityApplyServiceMessage = (props: PostDefaultSeviceMessageProps) => {
    let { postAuthor, responder, chat, postTitle, onUserPress, onRoomPress, myUserId } = props;

    return (
        <Container theme={props.theme}>
            🙌 <UserWrapper theme={props.theme} user={postAuthor} onUserPress={onUserPress} myUserId={myUserId} /> —{' '}
            <UserWrapper theme={props.theme} user={responder} onUserPress={onUserPress} myUserId={myUserId} /> is
            interested in your job opportunity “{postTitle}” in{' '}
            <RoomWrapper theme={props.theme} room={chat} onRoomPress={onRoomPress} />.{'\n'}
            {responder.firstName} — as the next step, please, tell {postAuthor.firstName} a little
            bit about yourself.
        </Container>
    );
};

const JobOportunityRecommendServiceMessage = (props: PostDefaultSeviceMessageProps) => {
    let { postAuthor, responder, chat, postTitle, onUserPress, onRoomPress, myUserId } = props;

    return (
        <Container theme={props.theme}>
            🙌 <UserWrapper theme={props.theme} user={postAuthor} onUserPress={onUserPress} myUserId={myUserId} /> —{' '}
            <UserWrapper theme={props.theme} user={responder} onUserPress={onUserPress} myUserId={myUserId} /> is
            looking to recommend a candidate in response to your post “{postTitle}” in{' '}
            <RoomWrapper theme={props.theme} room={chat} onRoomPress={onRoomPress} />.{'\n'}
            {postAuthor.firstName} — as the next step, please, describe your recommended candidate,
            how well do you know them, and share any relevant links.
        </Container>
    );
};

const OfficeHoursApplyServiceMessage = (props: PostDefaultSeviceMessageProps) => {
    let { postAuthor, responder, chat, postTitle, onUserPress, onRoomPress, myUserId } = props;

    return (
        <Container theme={props.theme}>
            🙌 <UserWrapper theme={props.theme} user={postAuthor} onUserPress={onUserPress} myUserId={myUserId} /> —{' '}
            <UserWrapper theme={props.theme} user={responder} onUserPress={onUserPress} myUserId={myUserId} /> is
            responding to your post “{postTitle}” in{' '}
            <RoomWrapper theme={props.theme} room={chat} onRoomPress={onRoomPress} />.{'\n'}Now you can chat!
        </Container>
    );
};

const RequestForStartupsApplyServiceMessage = (props: PostDefaultSeviceMessageProps) => {
    let { postAuthor, responder, chat, postTitle, onUserPress, onRoomPress, myUserId } = props;

    return (
        <Container theme={props.theme}>
            🙌 <UserWrapper theme={props.theme} user={postAuthor} onUserPress={onUserPress} myUserId={myUserId} /> —{' '}
            <UserWrapper theme={props.theme} user={responder} onUserPress={onUserPress} myUserId={myUserId} /> is
            responding to your post “{postTitle}” in{' '}
            <RoomWrapper theme={props.theme} room={chat} onRoomPress={onRoomPress} />.{'\n'}Now you can chat!
        </Container>
    );
};

const RequestForStartupsRecommendServiceMessage = (props: PostDefaultSeviceMessageProps) => {
    let { postAuthor, responder, chat, postTitle, onUserPress, onRoomPress, myUserId } = props;

    return (
        <Container theme={props.theme}>
            🙌 <UserWrapper theme={props.theme} user={postAuthor} onUserPress={onUserPress} myUserId={myUserId} /> —{' '}
            <UserWrapper theme={props.theme} user={responder} onUserPress={onUserPress} myUserId={myUserId} /> is
            interested to make a recommendation following up to your post “{postTitle}” in{' '}
            <RoomWrapper theme={props.theme} room={chat} onRoomPress={onRoomPress} />.
        </Container>
    );
};

interface ServiceMessagePostProps {
    myUserId: string;
    serviceMetadata: MessageFull_serviceMetadata_PostRespondServiceMetadata;
    onUserPress: (id: string) => void;
    onRoomPress: (id: string) => void;
    theme: ConversationTheme;
}

export const ServiceMessagePost = (props: ServiceMessagePostProps) => {
    const { post, postRoom, responder, respondType } = props.serviceMetadata;
    const { postType } = post;

    const postProps: PostDefaultSeviceMessageProps = {
        postAuthor: post.sender,
        responder: responder,
        chat: postRoom,
        postTitle: post.title,

        onUserPress: props.onUserPress,
        onRoomPress: props.onRoomPress,
        myUserId: props.myUserId,
        theme: props.theme
    };

    if (postType === 'BLANK') {
        if (respondType === 'RESPOND') {
            return <BlankRespondServiceMessage {...postProps} />;
        }
    } else if (postType === 'JOB_OPPORTUNITY') {
        if (respondType === 'APPLY') {
            return <JobOportunityApplyServiceMessage {...postProps} />;
        } else if (respondType === 'RECOMMEND') {
            return <JobOportunityRecommendServiceMessage {...postProps} />;
        }
    } else if (postType === 'OFFICE_HOURS') {
        if (respondType === 'APPLY') {
            return <OfficeHoursApplyServiceMessage {...postProps} />;
        }
    } else if (postType === 'REQUEST_FOR_STARTUPS') {
        if (respondType === 'APPLY') {
            return <RequestForStartupsApplyServiceMessage {...postProps} />;
        } else if (respondType === 'RECOMMEND') {
            return <RequestForStartupsRecommendServiceMessage {...postProps} />;
        }
    }

    return <BlankRespondServiceMessage {...postProps} />;
};
