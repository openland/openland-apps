import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { EmojiData } from 'emoji-mart';
import { EditorState } from 'draft-js';
import Glamorous from 'glamorous';
import { extractFlexProps, XFlexStyles, applyFlex } from '../../basics/Flex';
import { EmojiSuggestions } from '../modules/emoji/EmojiSuggestions/EmojiSuggestions';
import { EmojiSuggestionsStateT } from '../modules/emoji/EmojiSuggestions/useEmojiSuggestions';
import {
    MentionSuggestions,
    SizeT,
} from '../modules/mentions/MentionSuggestions/MentionSuggestions';
import { MentionSuggestionsStateT } from '../modules/mentions/MentionSuggestions/useMentionSuggestions';
import { XRichTextInput2Props } from '..';
import { UserShort } from 'openland-api/Types';
import { Icons } from './Icons';

const Container = Glamorous.div<XFlexStyles & { round?: boolean }>(({ round }) => {
    return [
        {
            position: 'relative',
            ...(round
                ? {
                      '& .DraftEditor-root': {
                          borderRadius: '20px !important',
                      },
                  }
                : {}),
            '& .public-DraftEditorPlaceholder-root:not(.public-DraftEditorPlaceholder-hasFocus)': {
                color: 'rgba(0, 0, 0, 0.5)',
            },
        },
        applyFlex,
    ];
});

class ContainerWrapper extends React.PureComponent {
    render() {
        return <Container {...this.props} />;
    }
}

type EditorContainerContainer = XRichTextInput2Props & {
    hideAttachments?: boolean;
    minimal?: boolean;
    plainText: string;
    hideAttach?: boolean;
    round?: boolean;
    editorState: EditorState;
    setEditorState: (a: EditorState) => void;
    mentionState: MentionSuggestionsStateT;
    onMentionPicked: (mention: UserShort) => void;
    onSubmit?: () => Promise<void>;
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
        minimal,
        onSubmit,
    } = props;

    // const onEmojiSelect = (emoji: string) => {
    //     setEditorState(
    //         addEmoji({
    //             editorState: editorState,
    //             emojiShortName: emoji,
    //             mode: AddEmojiMode.REPLACE,
    //         }),
    //     );
    // };

    return (
        <ContainerWrapper
            {...{ ...extractFlexProps(props), ...{ round: props.round } }}
            ref={containerRef}
        >
            <MentionSuggestions
                hideAttachments={props.hideAttachments}
                onMentionPicked={onMentionPicked}
                mentionState={mentionState}
                sizeOfContainer={sizeOfContainer}
            />

            {!props.hideAttachments && (
                <EmojiSuggestions emojiState={emojiState} addEmoji={finalAddEmoji} />
            )}

            {children}
            <Icons
                hideAttachments={props.hideAttachments}
                hasText={!!props.plainText}
                minimal={minimal}
                onEmojiPicked={onEmojiPicked}
                onSubmit={onSubmit}
            />
        </ContainerWrapper>
    );
};
