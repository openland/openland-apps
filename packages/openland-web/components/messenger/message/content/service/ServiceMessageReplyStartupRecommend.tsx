import * as React from 'react';
import { Container } from './views/Container';
import { MentionedUser } from './views/MentionedUser';
import { LinkToRoom } from './views/LinkToRoom';
import { UserShort } from 'openland-api/Types';

type PostServiceMessageProps = {
    postAuthorUser: UserShort;
    responderUser: UserShort;
    chat: {
        id: string;
        title: string;
    };
    postTitle: string;
    myUserId: string;
};

export const ServiceMessageReplyStartupRecommend = ({
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
            <MentionedUser user={responderUser} isYou={!amIPostAuthor} /> is interested to make a
            recommendation following up to your post <strong>“{postTitle}“</strong> in{' '}
            <LinkToRoom roomId={chat.id}>{chat.title}</LinkToRoom>.
        </Container>
    );
};
