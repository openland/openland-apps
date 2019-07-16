import * as React from 'react';
import Glamorous from 'glamorous';
import { XView } from 'react-mental';
import { css, cx } from 'linaria';
import { XPolitePopper } from 'openland-x/XPolitePopper';
import { useClient } from 'openland-web/utils/useClient';
import ReactionIcon from 'openland-icons/ic-reactions.svg';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { FullMessage_GeneralMessage_reactions } from 'openland-api/Types';
import { ReactionItem } from './MessageReaction';
import { MessageReactionType } from 'openland-api/Types';
import { emojifyReactions } from './emojifyReactions';
import { UserInfoContext } from 'openland-web/components/UserInfo';
import { trackEvent } from 'openland-x-analytics';
import { XPopperContent } from 'openland-x/popper/XPopperContent';
import { XPopperArrow } from 'openland-x/popper/XPopperArrow';

const CustomPickerDiv = Glamorous(XPopperContent)({
    padding: '4px 10px',
    borderRadius: 18,
});

const ReactionButtonInner = Glamorous.div<{
    marginTop?: number;
    marginLeft?: number;
    hovered: boolean;
}>(props => ({
    display: 'flex',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    marginTop: props.marginTop,
    marginLeft: props.marginLeft,
    paddingTop: 3,
    '& svg > path': {
        fill: props.hovered ? '#f6564e' : undefined,
        opacity: props.hovered ? 1 : undefined,
    },
}));

const ReactionsWrapperClassName = css`
    padding-top: 1px;
    padding-bottom: 1px;
    & > div:nth-child(4) {
        margin-bottom: -1px;
    }
`;

const LikeIconClassName = css`
    width: 26px;
    height: 26px;
    margin-top: -1px;
    margin-right: -3px !important;
    & > path {
        fill: #f6564e;
        opacity: 1;
    }
`;

const ThumbIconClassName = css`
    width: 28px;
    height: 28px;
    margin-top: 1px;
    background-image: url('https://cdn.openland.com/shared/web/ic-reaction-thumbsup.png');
    background-repeat: no-repeat;
    background-size: contain;
`;

const ReactionPicker = (props: {
    setReaction: (src: any) => void;
    onHover: () => void;
    onHoverLeave: () => void;
}) => {
    const defaultReactions = ['❤️', '👍', '😂', '😱', '😢', '🤬'];

    return (
        <XHorizontal
            separator={4}
            alignItems="center"
            onMouseEnter={() => props.onHover()}
            onMouseLeave={() => props.onHoverLeave()}
            className={ReactionsWrapperClassName}
        >
            {defaultReactions.map((src: string, i: number) => {
                if (i === 0) {
                    return (
                        <ReactionItem
                            key={'msg_reaction' + src}
                            onClick={e => {
                                e.stopPropagation();
                                props.setReaction(src);
                            }}
                        >
                            <ReactionIcon className={LikeIconClassName} />
                        </ReactionItem>
                    );
                }
                if (i === 1) {
                    return (
                        <ReactionItem
                            key={'msg_reaction' + src}
                            marginRight={0}
                            marginLeft={1}
                            onClick={e => {
                                e.stopPropagation();
                                props.setReaction(src);
                            }}
                        >
                            <div className={ThumbIconClassName} />
                        </ReactionItem>
                    );
                }
                return (
                    <ReactionItem
                        key={'msg_reaction' + src}
                        onClick={e => {
                            e.stopPropagation();
                            props.setReaction(src);
                        }}
                    >
                        {emojifyReactions({
                            src,
                            size: 25,
                        })}
                    </ReactionItem>
                );
            })}
        </XHorizontal>
    );
};

const PopperArrow = Glamorous(XPopperArrow)({
    position: 'absolute',
    left: '115px !important',
    '@media(min-width: 1340px)': {
        left: '98px !important',
    },
});

// need for analytics
export const reactionEmojiMap = {
    '❤️': 'LIKE',
    '👍': 'THUMB_UP',
    '😂': 'JOY',
    '😱': 'SCREAM',
    '😢': 'CRYING',
    '🤬': 'ANGRY',
};

export const MessageReactionButton = ({
    onlyLikes,
    messageId,
    marginTop,
    marginLeft,
}: {
    onlyLikes?: boolean;
    messageId: string;
    marginTop?: number;
    marginLeft?: number;
}) => {
    const [hovered, setHovered] = React.useState(false);
    const [beHovered, setBeHovered] = React.useState(false);

    let client = useClient();
    const handler = async (it: MessageReactionType) => {
        trackEvent('reaction_sent', {
            reaction_type: reactionEmojiMap[it].toLowerCase(),
            double_tap: 'not',
        });

        await client.mutateMessageSetReaction({
            messageId,
            reaction: it,
        });
    };

    let timeout: any = null;

    React.useEffect(() => {
        if (beHovered && !hovered) {
            timeout = setInterval(() => {
                setHovered(false);
                setBeHovered(false);
                clearInterval(timeout);
            }, 500);
        }
        if (beHovered && hovered) {
            clearInterval(timeout);
        }
        return () => clearInterval(timeout);
    });

    const handleSetReaction = (emj: any) => {
        handler(typeof emj === 'string' ? emj : emj.native);
    };

    const handleClick = () => {
        handleSetReaction('❤️');
    };

    const hoverDelay = () => {
        clearInterval(timeout);
        setHovered(true);
        setBeHovered(true);
    };

    if (onlyLikes) {
        return (
            <ReactionButtonInner
                className="reaction-button"
                onClick={handleClick}
                marginTop={marginTop}
                marginLeft={marginLeft}
                hovered={hovered}
            >
                <ReactionIcon />
            </ReactionButtonInner>
        );
    }

    return (
        <XPolitePopper
            content={
                <ReactionPicker
                    setReaction={handleSetReaction}
                    onHover={() => {
                        hoverDelay();
                    }}
                    onHoverLeave={() => {
                        setHovered(false);
                        clearInterval(timeout);
                    }}
                />
            }
            placement="top"
            contentContainer={<CustomPickerDiv />}
            marginBottom={10}
            show={beHovered}
            arrow={<PopperArrow />}
        >
            <ReactionButtonInner
                className="reaction-button"
                onClick={handleClick}
                marginTop={marginTop}
                marginLeft={marginLeft}
                hovered={beHovered}
                onMouseEnter={hoverDelay}
                onMouseLeave={() => {
                    setHovered(false);
                    clearInterval(timeout);
                }}
            >
                <ReactionIcon />
            </ReactionButtonInner>
        </XPolitePopper>
    );
};

const likeClassName = css`
    cursor: pointer;
    & svg {
        height: 13.5px;
        width: 15px;
    }

    &:hover svg > path  {
        fill: #e11616;
        opacity: 1;
    },
`;

const activeClassName = css`
    & svg > path {
        fill: #e11616;
        opacity: 1;
    }
`;

type LikeIconPropsT = {
    isActive: boolean;
    onClick: (event: React.MouseEvent) => void;
};

const LikeIcon = React.forwardRef<HTMLDivElement, LikeIconPropsT>(({ isActive, onClick }, ref) => {
    return (
        <div ref={ref} onClick={onClick} className={cx(likeClassName, isActive && activeClassName)}>
            <ReactionIcon />
        </div>
    );
});

export const CommentReactionButton = React.memo(
    ({
        reactions,
        id,
        hover,
    }: {
        reactions?: FullMessage_GeneralMessage_reactions[];
        id: string;
        hover?: boolean;
    }) => {
        let client = useClient();
        const userContext = React.useContext(UserInfoContext);
        const myId = userContext!!.user!!.id!!;
        const likeReaction = MessageReactionType.LIKE;

        let reactionsCount = reactions ? reactions.length : 0;
        let isActive = false;

        let userNamesLiked: any[] = [];
        let numberOfUsersExtraLiked = null;

        if (reactions) {
            userNamesLiked = reactions.slice(0, 10).map((reaction, key) => {
                return <div key={key}>{reaction.user.name}</div>;
            });

            if (reactions.length > 10) {
                numberOfUsersExtraLiked = reactions.length - 10;
            }

            isActive =
                reactions.filter(
                    (userReaction: FullMessage_GeneralMessage_reactions) =>
                        userReaction.user.id === myId && userReaction.reaction === likeReaction,
                ).length > 0;
        }

        const likeIconElement = (
            <LikeIcon
                isActive={!!isActive}
                onClick={async () => {
                    if (isActive) {
                        client.mutateCommentUnsetReaction({
                            commentId: id,
                            reaction: likeReaction,
                        });
                    } else {
                        client.mutateCommentSetReaction({
                            commentId: id,
                            reaction: likeReaction,
                        });
                    }
                }}
            />
        );

        const finalLikeIconElement =
            reactions && reactions.length ? (
                <XPolitePopper
                    content={
                        <XView paddingRight={32} paddingBottom={1}>
                            <XView marginTop={2} fontWeight={'600'} fontSize={11}>
                                Liked
                            </XView>
                            <XView marginTop={3} fontSize={11} lineHeight={1.33}>
                                {userNamesLiked}
                            </XView>
                            {numberOfUsersExtraLiked && (
                                <XView fontSize={11} lineHeight={1.33}>
                                    + {numberOfUsersExtraLiked}{' '}
                                    {numberOfUsersExtraLiked === 1 ? 'person' : 'people'}{' '}
                                </XView>
                            )}
                        </XView>
                    }
                    marginLeft={-12}
                    showOnHover
                    placement="bottom-start"
                    style="dark"
                >
                    {likeIconElement}
                </XPolitePopper>
            ) : (
                likeIconElement
            );

        return reactionsCount || hover ? (
            <XView flexDirection="row" alignItems="center" position="relative">
                <XView alignItems="center">{finalLikeIconElement}</XView>
                <XView alignItems="center" position="absolute" left={20}>
                    <XView fontSize={12} fontWeight={'600'} opacity={0.8}>
                        {reactionsCount ? reactionsCount : null}
                    </XView>
                </XView>
            </XView>
        ) : null;
    },
);
