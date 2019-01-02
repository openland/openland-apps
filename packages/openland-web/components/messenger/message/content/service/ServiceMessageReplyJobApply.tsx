import * as React from 'react';
import { Container } from './views/Container';
import { MentionedUser } from './views/MentionedUser';
import { LinkToRoom } from './views/LinkToRoom';
import { XView } from 'react-mental';

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

export const ServiceMessageReplyJobApply = ({
    postAuthorUser,
    responderUser,
    chat,
    postTitle,
    myUserId,
}: PostServiceMessageProps) => {
    const amIPostAuthor = myUserId === postAuthorUser.id;
    return (
        <Container>
            🙌 <MentionedUser user={postAuthorUser} isYou={amIPostAuthor} /> —{' '}
            <MentionedUser user={responderUser} isYou={!amIPostAuthor} /> is interested in your job
            opportunity <strong>“{postTitle}“</strong> in{' '}
            <LinkToRoom roomId={chat.id}>{chat.title}</LinkToRoom>.
            <XView height={8} />
            {responderUser.firstName} — as the next step, please, tell {postAuthorUser.firstName} a
            little bit about yourself.
        </Container>
    );
};
