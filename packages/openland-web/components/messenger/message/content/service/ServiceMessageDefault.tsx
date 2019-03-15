import * as React from 'react';
import { XView } from 'react-mental';
import { Container } from './views/Container';
import { FullMessage_ServiceMessage_spans } from 'openland-api/Types';
import { MentionComponentInnerText } from 'openland-x/XRichTextInput';
import { UserPopper } from 'openland-web/components/UserPopper';
import { UserShort } from 'openland-api/Types';
import { emoji } from 'openland-y-utils/emoji';
import { css } from 'linaria';
import { OthersPopper } from './views/OthersPopper';
import { LinkToRoom } from './views/LinkToRoom';

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
    let i = 0;

    if (spans && spans.length) {
        const sortedSpans = spans.sort((span1: any, span2: any) => {
            return span1.offset - span2.offset;
        });

        for (let span of sortedSpans) {
            if (lastOffset < span.offset) {
                res.push(<SpansMessageText text={message.slice(lastOffset, span.offset)} />);
            }

            if (span.__typename === 'MessageSpanMultiUserMention') {
                res.push(
                    <span>
                        <OthersPopper
                            show={true}
                            items={span.users.map(
                                ({ id, name, photo, primaryOrganization }: any) => ({
                                    title: name,
                                    subtitle: primaryOrganization ? primaryOrganization.name : '',
                                    photo,
                                    id,
                                }),
                            )}
                        >
                            {message.slice(span.offset, span.offset + span.length)}
                        </OthersPopper>
                    </span>,
                );
                lastOffset = span.offset + span.length;
            } else if (span.__typename === 'MessageSpanRoomMention') {
                res.push(
                    <LinkToRoom
                        text={message.slice(span.offset + 1, span.offset + span.length)}
                        roomId={span.room.id}
                    />,
                );
                lastOffset = span.offset + span.length;
            } else if (span.__typename === 'MessageSpanLink') {
                res.push(
                    <span key={'link-' + i} className={LinkText}>
                        <XView as="a" path={span.url} onClick={(e: any) => e.stopPropagation()}>
                            {span.url}
                        </XView>
                    </span>,
                );
                lastOffset = span.offset + span.length;
            } else if (span.__typename === 'MessageSpanUserMention') {
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
        return <SpansMessageText text={message} />;
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
