import * as React from 'react';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { LinkToRoom } from '../../../components/messenger/components/view/content/MessageTextComponent';
import { XMenuTitle } from 'openland-x/XMenuItem';
import { UserPopper } from '../../../components/messenger/components/view/content/UserPopper';
import { XView } from 'react-mental';
import { MentionComponentInnerText } from 'openland-x/XRichTextInput';
import { css } from 'linaria';

const spanWithWhiteSpacesClassName = css`
    white-space: pre;
    text-align: center;
`;

const SpanWithWhiteSpaces = ({ children }: { children: any }) => (
    <span className={spanWithWhiteSpacesClassName}>{children}</span>
);

const MentionedUser = ({ user, isYou }: { user: any; isYou: boolean }) => (
    <UserPopper user={user} isMe={isYou} noCardOnMe startSelected={false}>
        <MentionComponentInnerText isYou={isYou}>{user.name}</MentionComponentInnerText>
    </UserPopper>
);

const sergeyLapinUser = {
    id: 'WDZbkEbBelIVyYAX6KgltyyPWB',
    name: 'Sergey Lapin',
    firstName: 'Sergey',
    lastName: 'Lapin',
    photo: 'https://ucarecdn.com/9b9f7027-e80e-4366-9e71-74b7817680f8/-/crop/512x512/0,0/',
    email: 'lapanoid@gmail.com',
    online: true,
    lastSeen: 'online',
    isYou: true,
    primaryOrganization: {
        id: '61gk9KRrl9ComJkvYnvdcddr4o',
        name: 'Openland',
        photo: 'https://ucarecdn.com/db12b7df-6005-42d9-87d6-46f15dd5b880/-/crop/1024x1024/0,0/',
        isCommunity: false,
        __typename: 'Organization',
    },
    __typename: 'User',
};

const qwertyUser = {
    id: 'EQxWy3WA9MHvgDp63BAjc9X1Qy',
    name: 'qwerty asdfgh',
    firstName: 'qwerty',
    lastName: 'asdfgh',
    photo: null,
    email: 'jkn67641@ebbob.com',
    online: false,
    lastSeen: '1544816152728',
    isYou: false,
    primaryOrganization: {
        id: 'jZmqKwYJDJIovevm7VvrConkvL',
        name: 'H J',
        photo: null,
        isCommunity: false,
        __typename: 'Organization',
    },
    __typename: 'User',
};

const taraBUser = {
    id: '3YkjQVj09LHRbXDkkyeQTP4vWb',
    name: 'Tara B',
    firstName: 'Tara',
    lastName: 'B',
    photo: null,
    email: 'diana+rsud108@openland.com',
    online: false,
    lastSeen: '1544813973816',
    isYou: false,
    primaryOrganization: {
        id: 'wWwoJPLpYKCVre0WMQ4EspVrvP',
        name: 'SignalFire',
        photo: 'https://ucarecdn.com/72f0bd81-e2b1-414c-bac9-26d2d2a36b51/-/crop/281x281/0,0/',
        isCommunity: false,
        __typename: 'Organization',
    },
    __typename: 'User',
};

const prettyTUser = {
    id: 'Y9QLkELbDLfdrzvZ3eDbsXg6o4',
    name: 'Pretty T',
    firstName: 'Pretty',
    lastName: 'T',
    photo: null,
    email: 'diana+test5654@openland.com',
    online: false,
    lastSeen: '1544829035379',
    isYou: false,
    primaryOrganization: {
        id: '1pMAYWRZQecl9Q5re6daTKppyW',
        name: 'P T',
        photo: null,
        isCommunity: false,
        __typename: 'Organization',
    },
    __typename: 'User',
};

const chatSample = {
    id: 'xwQxobvJ6atnp4Ry4ALoHgo3dK',
    title: 'I am the walrus',
};

const Container = ({ children }: { children: any }) => (
    <XView flexDirection="column" alignItems="center">
        <XView flexDirection="row" alignItems="center" color={'#99a2b0'}>
            <SpanWithWhiteSpaces>{children}</SpanWithWhiteSpaces>
        </XView>
    </XView>
);

// Service Messages
const JoinOneServiceMessage = ({ firstUser, myUserId }: { firstUser: any; myUserId: string }) => (
    <Container>
        🙌
        <MentionedUser user={firstUser} isYou={myUserId === firstUser.id} /> joined the room
    </Container>
);

const JoinTwoServiceMessage = ({
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

const JoinManyServiceMessage = ({
    firstUser,
    otherUsers,
    myUserId,
}: {
    firstUser: any;
    otherUsers: any;
    myUserId: string;
}) => (
    <Container>
        🙌
        <MentionedUser user={firstUser} isYou={myUserId === firstUser.id} /> joined the room along
        with{' '}
        <MentionComponentInnerText isYou={false}>
            {otherUsers.length} others
        </MentionComponentInnerText>
    </Container>
);

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

const RespondToPostServiceMessage = ({
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
            <strong>{postTitle}</strong> in <LinkToRoom roomId={chat.id}>{chat.title}</LinkToRoom>.
            <br />
            Now you can chat!
        </Container>
    );
};

const JobOpportunityApplyTextServiceMessage = ({
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
            opportunity <strong>{postTitle}</strong> in{' '}
            <LinkToRoom roomId={chat.id}>{chat.title}</LinkToRoom>.
            <br />
            <MentionedUser user={responderUser} isYou={!amIPostAuthor} /> — as the next step,
            please, tell <MentionedUser user={postAuthorUser} isYou={amIPostAuthor} /> — a little
            bit about yourself.
        </Container>
    );
};

const JobOpportunityRecomendTextServiceMessage = ({
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
            candidate in response to your post <strong>{postTitle}</strong> in{' '}
            <LinkToRoom roomId={chat.id}>{chat.title}</LinkToRoom>.
            <br />
            <MentionedUser user={postAuthorUser} isYou={amIPostAuthor} /> — as the next step,
            please, describe your recommended candidate, how well do you know them, and share any
            relevant links.
        </Container>
    );
};

const RequestForStartupsRecomendTextServiceMessage = ({
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
            recommendation following up to your post <strong>{postTitle}</strong> in{' '}
            <LinkToRoom roomId={chat.id}>{chat.title}</LinkToRoom>.
        </Container>
    );
};

export default () => (
    <DevDocsScaffold title="MessageTextComponent">
        <XContent>
            <XVertical>
                <XMenuTitle>1. Joines</XMenuTitle>

                <JoinOneServiceMessage firstUser={sergeyLapinUser} myUserId={sergeyLapinUser.id} />
                <JoinTwoServiceMessage
                    firstUser={sergeyLapinUser}
                    secondUser={taraBUser}
                    myUserId={sergeyLapinUser.id}
                />
                <JoinManyServiceMessage
                    firstUser={sergeyLapinUser}
                    otherUsers={[taraBUser, qwertyUser, prettyTUser]}
                    myUserId={sergeyLapinUser.id}
                />

                <XMenuTitle>2. Service Messages</XMenuTitle>

                <XMenuTitle>JobOpportunity</XMenuTitle>

                <JobOpportunityApplyTextServiceMessage
                    postAuthorUser={sergeyLapinUser}
                    responderUser={qwertyUser}
                    chat={chatSample}
                    postTitle={'“Looking for React developer“'}
                    myUserId={sergeyLapinUser.id}
                />

                <JobOpportunityRecomendTextServiceMessage
                    postAuthorUser={sergeyLapinUser}
                    responderUser={qwertyUser}
                    chat={chatSample}
                    postTitle={'“Looking for React developer“'}
                    myUserId={sergeyLapinUser.id}
                />

                <XMenuTitle>OfficeHours</XMenuTitle>
                <RespondToPostServiceMessage
                    postAuthorUser={sergeyLapinUser}
                    responderUser={qwertyUser}
                    chat={chatSample}
                    postTitle={'“Office hours with XX“'}
                    myUserId={sergeyLapinUser.id}
                />

                <XMenuTitle>RequestForStartups</XMenuTitle>

                <RespondToPostServiceMessage
                    postAuthorUser={sergeyLapinUser}
                    responderUser={qwertyUser}
                    chat={chatSample}
                    postTitle={'“Looking for React developer“'}
                    myUserId={sergeyLapinUser.id}
                />
                <RequestForStartupsRecomendTextServiceMessage
                    postAuthorUser={sergeyLapinUser}
                    responderUser={qwertyUser}
                    chat={chatSample}
                    postTitle={'“Looking for React developer“'}
                    myUserId={sergeyLapinUser.id}
                />
            </XVertical>
        </XContent>
    </DevDocsScaffold>
);

{
    /* <MessageTextComponent
                    {...{
                        alphaMentions: [],
                        mentions: [],
                        message: 'isService false',
                        isService: false,
                        isEdited: false,
                    }}
                />
                <MessageTextComponent
                    {...{
                        alphaMentions: [],
                        mentions: [],
                        message: 'isService true',
                        isService: true,
                        isEdited: false,
                    }}
                />

                <MessageTextComponent
                    {...{
                        alphaMentions: [],
                        mentions: [],
                        message: 'isEdited true',
                        isService: false,
                        isEdited: true,
                    }}
                />

                <MessageTextComponent
                    {...{
                        alphaMentions: [],
                        mentions: [],
                        message: '🌈 insane 🌈',
                        isService: false,
                        isEdited: false,
                    }}
                />

                <MessageTextComponent
                    {...{
                        alphaMentions: [],
                        mentions: [],
                        message: ': this is normal :',
                        isService: false,
                        isEdited: false,
                    }}
                />

                <MessageTextComponent
                    {...{
                        alphaMentions: [],
                        mentions: [],
                        message: ':tada:',
                        isService: false,
                        isEdited: false,
                    }}
                />

                <MessageTextComponent
                    {...{
                        alphaMentions: [],
                        mentions: [],
                        message: 'https://google.com',
                        isService: false,
                        isEdited: false,
                    }}
                />

                <MessageTextComponent
                    {...{
                        alphaMentions: [],
                        mentions: [],
                        message: 'https://app.openland.com/joinChannel/1dVnQiH',
                        isService: false,
                        isEdited: false,
                    }}
                /> */
}
