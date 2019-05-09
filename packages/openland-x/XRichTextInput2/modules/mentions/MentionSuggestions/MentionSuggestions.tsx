import * as React from 'react';
import { css, cx } from 'linaria';
import { UserForMention } from 'openland-api/Types';
import { MentionEntry } from './MentionSuggestionsEntry';
import { MentionSuggestionsStateT } from './useMentionSuggestions';
export type SizeT = { width: number; height: number };

const mentionSuggestionsShow = css`
    transform: scale(1);
`;

const mentionSuggestionsHide = css`
    transform: scale(0);
`;

const mentionSuggestionsClassName = css`
    transform-origin: 1em 0%;
    transition: all 0.25s cubic-bezier(0.3, 1.2, 0.2, 1);
    left: 0px;
    bottom: 0px;
    position: absolute;
    border: 1px solid #eee;
    border-radius: 10px;
    background: #fff;
    box-shadow: none;
    z-index: 100;
    bottom: 50px;
    left: 0;
    cursor: pointer;
    padding-top: 8px;
    padding-bottom: 8px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
`;

export const MentionSuggestions = ({
    mentionState,
    onMentionPicked,
    sizeOfContainer,
    hideAttachments,
}: {
    mentionState: MentionSuggestionsStateT;
    onMentionPicked: (mention: UserForMention) => void;
    sizeOfContainer: SizeT;
    hideAttachments?: boolean;
}) => {
    return (
        <div
            className={cx(
                mentionSuggestionsClassName,
                mentionState.isSelecting ? mentionSuggestionsShow : mentionSuggestionsHide,
            )}
            style={{
                width: sizeOfContainer.width,
                maxHeight: hideAttachments ? '19vh' : '23vh',
                overflow: 'scroll',
                left: mentionState.isSelecting ? 0 : sizeOfContainer.width / 2,
                bottom: mentionState.isSelecting ? 50 : sizeOfContainer.height / 2,
            }}
        >
            {mentionState.suggestions.map((mention: UserForMention, key: number) => {
                return (
                    <MentionEntry
                        id={mention.id}
                        name={mention.name}
                        title={mention.primaryOrganization ? mention.primaryOrganization.name : ''}
                        avatar={mention.photo}
                        isYou={false}
                        online={false}
                        key={key}
                        isSelected={key === mentionState.selectedEntryIndex}
                        onClick={() => {
                            onMentionPicked(mentionState.suggestions[key]);
                        }}
                    />
                );
            })}
        </div>
    );
};
