import * as React from 'react';
import { MessageReactionType, FullMessage_GeneralMessage_reactions } from 'openland-api/spacex.types';
import { css, cx } from 'linaria';
import { reactionImage } from './MessageReactions';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { useCaptionPopper } from 'openland-web/components/CaptionPopper';

const SortedReactions = [
    MessageReactionType.LIKE,
    MessageReactionType.THUMB_UP,
    MessageReactionType.JOY,
    MessageReactionType.SCREAM,
    MessageReactionType.CRYING,
    MessageReactionType.DONATE,
];

const wrapperClass = css`
    height: 40px;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    padding: 0 12px;
`;

const reactionClass = css`
    width: 36px; height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;

    img.reaction-main {
        width: 24px; height: 24px;
        transition: transform 100ms ease-in-out;
    }

    img.reaction-duplicate {
        width: 32px; height: 32px;
        position: absolute;
        top: 4px; left: 2px;
        opacity: 0;
    }

    &:hover img.reaction-main {
        transform: scale(calc(4 / 3));
    }

    &:not(.animated):active img.reaction-main {
        transform: scale(1.15);
    }

    &.animated img.reaction-duplicate {
        animation: duplicate 300ms;
    }

    &.to-remove img.reaction-duplicate {
        filter: grayscale(1);
    }

    @keyframes duplicate {
        0% {
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

const reactionDisabledClass = css`
    opacity: 0.35;
    pointer-events: none;
`;

const texts: {[reaction in MessageReactionType]: string} = {
    ANGRY: 'Angry',
    CRYING: 'Sad',
    JOY: 'Haha',
    LIKE: 'Love',
    SCREAM: 'Wow',
    THUMB_UP: 'Thumbs Up',
    DONATE: 'Donate',
};

interface ReactionPickerItemProps {
    reaction: MessageReactionType;
    toRemove: boolean;
    disabled: boolean;
    onPick: (reaction: MessageReactionType) => void;
}

const ReactionPickerItem = React.memo<ReactionPickerItemProps>(props => {
    const { onPick, reaction, toRemove, disabled } = props;
    const [animate, setAnimate] = React.useState(false);
    const [show] = useCaptionPopper({text: texts[reaction], scope: 'reactions'});
    const handleClick = () => {
        if (animate) {
            return;
        }

        setAnimate(true);
        onPick(reaction);

        setTimeout(() => {
            setAnimate(false);
        }, 300);
    };

    return (
        <div className={cx(reactionClass, animate && 'animated', toRemove && 'to-remove', disabled && reactionDisabledClass)} onClick={handleClick} onMouseEnter={show}>
            <img src={reactionImage(reaction)} className="reaction-main" />
            <img src={reactionImage(reaction)} className="reaction-duplicate" />
        </div>
    );
});

export interface ReactionPickerInstance {
    update: (newReactions: FullMessage_GeneralMessage_reactions[]) => void;
}

interface ReactionPickerProps {
    reactions: FullMessage_GeneralMessage_reactions[];
    onPick: (reaction: MessageReactionType) => void;
}

// Sorry universe
export const ReactionPicker = React.memo(React.forwardRef((props: ReactionPickerProps, ref: React.Ref<ReactionPickerInstance>) => {
    const messenger = React.useContext(MessengerContext);
    const [reactions, setReactions] = React.useState<FullMessage_GeneralMessage_reactions[]>(props.reactions);

    React.useImperativeHandle(ref, () => ({
        update: (newReactions: FullMessage_GeneralMessage_reactions[]) => {
            setReactions(newReactions);
        },
    }));

    return (
        <div className={wrapperClass}>
            {SortedReactions.map(reaction => {
                const reactionsToRemove = reactions && reactions.filter(userReaction => userReaction.user.id === messenger.user.id && userReaction.reaction === reaction);
                const toRemove = reactionsToRemove && reactionsToRemove.length > 0;
                const disabled = reaction === MessageReactionType.DONATE && (reactionsToRemove && reactionsToRemove.some(r => r.reaction === MessageReactionType.DONATE));

                return (
                    <ReactionPickerItem
                        key={'reaction-' + reaction}
                        onPick={props.onPick}
                        reaction={reaction}
                        toRemove={toRemove}
                        disabled={disabled}
                    />
                );
            })}
        </div>
    );
}));
