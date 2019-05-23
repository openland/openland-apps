import * as React from 'react';
import { css, cx } from 'linaria';
import { MentionEntry, ToSelect } from './MentionSuggestionsEntry';
import { MentionSuggestionsStateT, SuggestionTypeT } from './useMentionSuggestions';
export type SizeT = { width: number; height: number };
import { XView } from 'react-mental';

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

export const AllEntry = ({
    isSelected,
    onClick,
}: {
    isSelected: boolean;
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) => {
    const [isFocused, setIsFocused] = React.useState(false);

    React.useEffect(() => {
        setIsFocused(isSelected);
    }, [isSelected]);

    const onMouseLeave = () => setIsFocused(false);
    const onMouseEnter = () => setIsFocused(true);

    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
            style={{ height: 40, flexShrink: 0 }}
        >
            <XView
                position="relative"
                width="100%"
                flexDirection="row"
                flexGrow={1}
                flexShrink={1}
                paddingTop={6}
                paddingBottom={6}
                paddingRight={15}
                paddingLeft={15}
                minWidth={0}
                backgroundColor={isFocused ? '#f9f9f9' : '#ffffff'}
                hoverBackgroundColor={'#f9f9f9'}
            >
                <XView
                    flexDirection="column"
                    alignSelf="center"
                    marginLeft={12}
                    fontSize={13}
                    fontWeight={'600'}
                    lineHeight={1.54}
                    color={'#000000'}
                >
                    @all
                </XView>

                <XView
                    flexDirection="column"
                    alignSelf="center"
                    marginLeft={12}
                    fontSize={13}
                    fontWeight={'600'}
                    lineHeight={1.54}
                    color={'#000000'}
                >
                    Notify everyone in this channel
                </XView>

                <XView flexGrow={1} />
                <ToSelect isFocused={isFocused} />
            </XView>
        </div>
    );
};

export const MentionSuggestions = ({
    mentionState,
    onMentionPicked,
    sizeOfContainer,
    hideAttachments,
}: {
    mentionState: MentionSuggestionsStateT;
    onMentionPicked: (mention: SuggestionTypeT) => void;
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
                width: sizeOfContainer.width || '100%',
                maxHeight: hideAttachments ? '19vh' : '23vh',
                overflow: 'scroll',
                left: mentionState.isSelecting ? 0 : sizeOfContainer.width / 2,
                bottom: mentionState.isSelecting ? 50 : sizeOfContainer.height / 2,
            }}
        >
            {mentionState.suggestions.map((suggestion: SuggestionTypeT, key: number) => {
                if (suggestion.__typename === 'User') {
                    return (
                        <MentionEntry
                            id={suggestion.id}
                            name={suggestion.name}
                            title={
                                suggestion.primaryOrganization
                                    ? suggestion.primaryOrganization.name
                                    : ''
                            }
                            avatar={suggestion.photo}
                            isYou={false}
                            online={false}
                            key={key}
                            isSelected={key === mentionState.selectedEntryIndex}
                            onClick={() => {
                                onMentionPicked(mentionState.suggestions[key]);
                            }}
                        />
                    );
                } else if (suggestion.__typename === 'AllMention') {
                    return (
                        <AllEntry
                            key={key}
                            isSelected={key === mentionState.selectedEntryIndex}
                            onClick={() => {
                                onMentionPicked(mentionState.suggestions[key]);
                            }}
                        />
                    );
                }
                return null;
            })}
        </div>
    );
};
