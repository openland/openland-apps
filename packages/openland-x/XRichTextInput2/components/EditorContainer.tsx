import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { EmojiData } from 'emoji-mart';
import { EditorState } from 'draft-js';
import Glamorous from 'glamorous';
import { extractFlexProps, XFlexStyles, applyFlex } from '../../basics/Flex';
import { NewEmojiSuggestions } from './EmojiSuggestions';
import { MentionSuggestions, SizeT } from './MentionSuggestions';
import { EmojiButton } from './EmojiButton';
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
    activeWord: string;
    onEmojiPicked: (emoji: EmojiData) => void;
    children: any;
    mentionSuggestions: any;
    showMentionSuggestions: boolean;
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
        mentionSuggestions,
        showMentionSuggestions,
        onEmojiPicked,
        activeWord,
        editorState,
        setEditorState,
    } = props;

    return (
        <ContainerWrapper {...extractFlexProps(props)} ref={containerRef}>
            <MentionSuggestions
                show={showMentionSuggestions}
                items={mentionSuggestions}
                sizeOfContainer={sizeOfContainer}
            />
            {activeWord === ':' && (
                <NewEmojiSuggestions
                    cacheBustParam={constants.cacheBustParam}
                    imagePath={constants.imagePath}
                    imageType={constants.imageType}
                    editorState={editorState}
                    setEditorState={setEditorState}
                />
            )}
            {children}
            <EmojiButton onEmojiPicked={onEmojiPicked} />
        </ContainerWrapper>
    );
};
