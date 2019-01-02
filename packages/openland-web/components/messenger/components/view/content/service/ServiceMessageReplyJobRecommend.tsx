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

export const ServiceMessageReplyJobRecommend = ({
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
            <MentionedUser user={responderUser} isYou={!amIPostAuthor} /> is looking to recommend a
            candidate in response to your post <strong>“{postTitle}“</strong> in{' '}
            <LinkToRoom roomId={chat.id}>{chat.title}</LinkToRoom>.
            <XView height={8} />
            <MentionedUser user={postAuthorUser} isYou={amIPostAuthor} /> — as the next step,
            please, describe your recommended candidate, how well do you know them, and share any
            relevant links.
        </Container>
    );
};