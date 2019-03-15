import * as React from 'react';
import { XView } from 'react-mental';
import { Container } from './views/Container';
import { FullMessage_ServiceMessage_spans } from 'openland-api/Types';
import { MentionComponentInnerText } from 'openland-x/XRichTextInput';
import { UserPopper } from 'openland-web/components/UserPopper';
import { UserShort } from 'openland-api/Types';
import { emoji } from 'openland-y-utils/emoji';
import { css } from 'linaria';

// import { OthersPopper } from './views/OthersPopper';

// const EmojifiedText = React.memo(({ text }: { text: string }) => {
//     let refactorText = text;
//     let createGroupText = text.match('created the group');
//     if (createGroupText) {
//         refactorText = text.split('created the group')[1];
//     }
//     return (
//         <span>
//             {createGroupText && <> created the group</>}
//             {refactorText ? (
//                 <strong>
//                     {emoji({
//                         src: refactorText,
//                         size: 16,
//                     })}
//                 </strong>
//             ) : (
//                 <>
//                     {emoji({
//                         src: refactorText,
//                         size: 16,
//                     })}
//                 </>
//             )}
//         </span>
//     );
// });

const MentionedUser = React.memo(
    ({ user, text, isYou }: { user: UserShort; text: string; isYou: boolean }) => {
        const userNameEmojified = React.useMemo(() => {
            return emoji({
                src: text,
                size: 16,
            });
        }, [text]);

        return (
            <UserPopper user={user} isMe={isYou} noCardOnMe startSelected={false}>
                <MentionComponentInnerText isYou={isYou}>
                    {userNameEmojified}
                </MentionComponentInnerText>
            </UserPopper>
        );
    },
);

// const JoinManyServiceMessage = React.memo(
//     ({
//         joinedByUser,
//         firstUser,
//         otherUsers,
//         myUserId,
//     }: {
//         joinedByUser: UserShort;
//         firstUser: UserShort;
//         otherUsers: UserShort[];
//         myUserId: string;
//     }) => {
//         return (
//             <>
//                 <MentionedUser user={joinedByUser} isYou={myUserId === joinedByUser.id} /> invited{' '}
//                 <MentionedUser user={firstUser} isYou={myUserId === firstUser.id} /> along with{' '}
//                 <span>
//                     <OthersPopper
//                         show={true}
//                         items={otherUsers.map(({ id, name, photo, primaryOrganization }: any) => ({
//                             title: name,
//                             subtitle: primaryOrganization ? primaryOrganization.name : '',
//                             photo,
//                             id,
//                         }))}
//                     >
//                         {otherUsers.length} others
//                     </OthersPopper>
//                 </span>
//             </>
//         );
//     },
// );

const LinkText = css`
    display: inline;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    & > a {
        display: inline;
    }
`;

const SpansMessageText = ({ text }: { text: string }) => {
    return (
        <>
            {emoji({
                src: text,
                size: 16,
            })}
        </>
    );
};

export const SpansMessage = ({
    message,
    spans,
}: {
    message: string;
    spans?: FullMessage_ServiceMessage_spans[];
}) => {
    let res: any[] = [];

    let lastOffset = 0;
    let prefixText = '';
    let i = 0;

    if (spans && spans.length) {
        const sortedSpans = spans.sort((span1: any, span2: any) => {
            return span1.offset - span2.offset;
        });

        for (let span of sortedSpans) {
            if (lastOffset < span.offset) {
                res.push(<SpansMessageText text={message.slice(lastOffset, span.offset)} />);
            }

            if (span.__typename === 'MessageSpanLink') {
                res.push(
                    <span key={'link-' + i} className={LinkText}>
                        <XView as="a" path={span.url} onClick={(e: any) => e.stopPropagation()}>
                            {span.url}
                        </XView>
                    </span>,
                );
                lastOffset = span.offset + span.length;
            }

            if (span.__typename === 'MessageSpanUserMention') {
                res.push(
                    <MentionedUser
                        key={'text-' + i++}
                        isYou={false}
                        text={message.slice(span.offset + 1, span.offset + span.length)}
                        user={{
                            __typename: 'User',
                            id: span.user.id,
                            name: span.user.name,
                            firstName: span.user.name,
                            lastName: null,
                            photo: null,
                            email: null,
                            online: false,
                            lastSeen: null,
                            isYou: false,
                            isBot: false,
                            shortname: null,
                            primaryOrganization: null,
                        }}
                    />,
                );
                lastOffset = span.offset + span.length;
            }
        }

        if (lastOffset < message.length) {
            res.push(<SpansMessageText text={message.slice(lastOffset, message.length)} />);
        }
    } else {
        return (
            <span>
                {emoji({
                    src: message,
                    size: 16,
                })}
            </span>
        );
    }

    return <>{res}</>;
};

export const ServiceMessageDefault = ({
    message,
    spans,
}: {
    message: string;
    spans?: FullMessage_ServiceMessage_spans[];
}) => {
    return (
        <Container>
            <SpansMessage message={message} spans={spans} />
        </Container>
    );
};
