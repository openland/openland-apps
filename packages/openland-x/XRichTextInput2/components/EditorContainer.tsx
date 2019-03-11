import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { EmojiData } from 'emoji-mart';
import { EditorState } from 'draft-js';
import Glamorous from 'glamorous';
import { extractFlexProps, XFlexStyles, applyFlex } from '../../basics/Flex';
import { EmojiSuggestions } from './EmojiSuggestions';
import { MentionSuggestions, SizeT } from './MentionSuggestions';
import { MentionEntry, MentionDataT } from './MentionSuggestionsEntry';
import { EmojiSuggestionsEntry } from './EmojiSuggestionsEntry';
import { EmojiButton } from './EmojiButton';
import { EmojiSuggestionsStateT, EmojiDataT } from '../useEmojiSuggestions';
import { MentionSuggestionsStateT } from '../useMentionSuggestions';
import { XRichTextInput2Props } from '..';
import * as constants from '../constants';

const Container = Glamorous.div<XFlexStyles>([
    {
        position: 'relative',
        '& .public-DraftEditorPlaceholder-root:not(.public-DraftEditorPlaceholder-hasFocus)': {
            color: 'rgba(0, 0, 0, 0.5)',
        },
    },
    applyFlex,
]);

class ContainerWrapper extends React.PureComponent {
    render() {
        return <Container {...this.props} />;
    }
}

type EditorContainerContainer = XRichTextInput2Props & {
    editorState: EditorState;
    setEditorState: (a: EditorState) => void;
    mentionState: MentionSuggestionsStateT;
    onMentionPicked: (mention: MentionDataT) => void;
    emojiState: EmojiSuggestionsStateT;
    onEmojiPicked: (emoji: EmojiData) => void;
    finalAddEmoji: (emoji: { shortName: string; unified: string }) => void;
    children: any;
};

export const EditorContainer = (props: EditorContainerContainer) => {
    const containerRef = React.useRef<ContainerWrapper>(null);

    const [sizeOfContainer, setSizeOfContainer] = React.useState<SizeT>({ width: 0, height: 0 });

    React.useLayoutEffect(() => {
        const containerEl =
            containerRef &&
            containerRef.current &&
            (ReactDOM.findDOMNode(containerRef.current) as Element);

        const newWidthOfContainer = containerEl ? containerEl.getBoundingClientRect().width : 0;
        const newHeightOfContainer = containerEl ? containerEl.getBoundingClientRect().height : 0;

        if (
            sizeOfContainer.width !== newWidthOfContainer ||
            sizeOfContainer.height !== newHeightOfContainer
        ) {
            setSizeOfContainer({
                width: newWidthOfContainer,
                height: newHeightOfContainer,
            });
        }
    }, []);

    const {
        children,
        mentionState,
        emojiState,
        onEmojiPicked,
        finalAddEmoji,
        onMentionPicked,
    } = props;

    const mentionSuggestionsItems = mentionState.suggestions
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((mention: MentionDataT, key: number) => {
            return (
                <MentionEntry
                    {...mention}
                    key={key}
                    isSelected={key === mentionState.selectedEntryIndex}
                    onClick={() => {
                        onMentionPicked(mentionState.suggestions[key]);
                    }}
                />
            );
        });

    // const onEmojiSelect = (emoji: string) => {
    //     setEditorState(
    //         addEmoji({
    //             editorState: editorState,
    //             emojiShortName: emoji,
    //             mode: AddEmojiMode.REPLACE,
    //         }),
    //     );
    // };

    const emojiSuggestionsItems = emojiState.suggestions.map((emoji: EmojiDataT, key: number) => {
        return (
            <EmojiSuggestionsEntry
                isSelected={key === emojiState.selectedEntryIndex}
                key={emoji.shortName}
                emoji={emoji}
                id={`emoji-option-${key}`}
                cacheBustParam={constants.cacheBustParam}
                imagePath={constants.imagePath}
                imageType={constants.imageType}
                onClick={() => finalAddEmoji(emoji)}
            />
        );
    });

    return (
        <ContainerWrapper {...extractFlexProps(props)} ref={containerRef}>
            <MentionSuggestions
                show={mentionState.isSelecting}
                items={mentionSuggestionsItems}
                sizeOfContainer={sizeOfContainer}
            />

            <EmojiSuggestions
                cursorXPosition={emojiState.cursorXPosition}
                show={emojiState.isSelecting}
                items={emojiSuggestionsItems}
            />

            {children}
            <EmojiButton onEmojiPicked={onEmojiPicked} />
        </ContainerWrapper>
    );
};
