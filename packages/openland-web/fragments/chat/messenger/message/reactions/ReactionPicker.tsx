import * as React from 'react';
import { MessageReactionType } from 'openland-api/Types';
import { css } from 'linaria';
import { reactionImage } from './MessageReactions';

const SortedReactions = [
    MessageReactionType.LIKE,
    MessageReactionType.THUMB_UP,
    MessageReactionType.JOY,
    MessageReactionType.SCREAM,
    MessageReactionType.CRYING,
    MessageReactionType.ANGRY
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
    transition: transform 100ms ease-in-out;

    &:hover {
        transform: scale(calc(4 / 3));
    }

    &:active {
        transform: scale(1.15);
    }

    img {
        width: 24px;
        height: 24px;
    }
`;

interface ReactionPickerProps {
    onPick: (reaction: MessageReactionType) => void;
}

export const ReactionPicker = React.memo<ReactionPickerProps>(props => {
    const { onPick } = props;

    return (
        <div className={wrapperClass}>
            {SortedReactions.map(reaction => (
                <div key={'reaction-' + reaction} className={reactionClass} onClick={() => onPick(reaction)}>
                    <img src={reactionImage(reaction)} />
                </div>
            ))}
        </div>
    );
});
