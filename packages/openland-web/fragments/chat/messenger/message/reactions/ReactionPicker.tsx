import * as React from 'react';
import {
    MessageReactionType,
    MessageReactionCounter,
} from 'openland-api/spacex.types';
import { css, cx } from 'linaria';
import { reactionImage } from './MessageReactions';
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
    width: 36px; 
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;

    img.reaction-main {
        width: 24px; 
        height: 24px;
        transition: transform 100ms ease-in-out;
    }

    img.reaction-duplicate {
        width: 32px; 
        height: 32px;
        position: absolute;
        top: 4px; 
        left: 2px;
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

export const reactionLabel: {[reaction in MessageReactionType]: string} = {
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
    const [show] = useCaptionPopper({text: reactionLabel[reaction], scope: 'reactions'});
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
    update: (newReactions: MessageReactionCounter[]) => void;
}

interface ReactionPickerProps {
    reactionCounters: MessageReactionCounter[];
    onPick: (reaction: MessageReactionType) => void;
}

// Sorry universe
export const ReactionPicker = React.memo(React.forwardRef((props: ReactionPickerProps, ref: React.Ref<ReactionPickerInstance>) => {
    const [reactions, setReactions] = React.useState<MessageReactionCounter[]>(props.reactionCounters);

    React.useImperativeHandle(ref, () => ({
        update: (newReactions: MessageReactionCounter[]) => {
            setReactions(newReactions);
        },
    }));

    return (
        <div className={wrapperClass}>
            {SortedReactions.map(reaction => {
                const remove = !!reactions.find(r => r.reaction === reaction && r.setByMe);
                const disabled = reaction === MessageReactionType.DONATE && remove;

                return (
                    <ReactionPickerItem
                        key={'reaction-' + reaction}
                        onPick={props.onPick}
                        reaction={reaction}
                        toRemove={remove}
                        disabled={disabled}
                    />
                );
            })}
        </div>
    );
}));
