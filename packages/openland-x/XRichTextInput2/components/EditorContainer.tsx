import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { EmojiData } from 'emoji-mart';
import { EditorState } from 'draft-js';
import Glamorous from 'glamorous';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { XIcon } from 'openland-x/XIcon';
import { extractFlexProps, XFlexStyles, applyFlex } from '../../basics/Flex';
import { EmojiSuggestions } from './EmojiSuggestions';
import { MentionSuggestions, SizeT } from './MentionSuggestions';
import { MentionEntry } from './MentionSuggestionsEntry';
import { EmojiSuggestionsEntry } from './EmojiSuggestionsEntry';
import { EmojiButton } from './EmojiButton';
import { EmojiSuggestionsStateT, EmojiDataT } from '../useEmojiSuggestions';
import { MentionSuggestionsStateT } from '../useMentionSuggestions';
import { XRichTextInput2Props } from '..';
import PhotoIcon from 'openland-icons/ic-photo-2.svg';
import FileIcon from 'openland-icons/ic-file-3.svg';
import * as constants from '../constants';
import { UserShort } from 'openland-api/Types';
import { UploadContext } from 'openland-web/modules/FileUploading/UploadContext';

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
    minimal?: boolean;
    hideAttach?: boolean;
    round?: boolean;
    editorState: EditorState;
    setEditorState: (a: EditorState) => void;
    mentionState: MentionSuggestionsStateT;
    onMentionPicked: (mention: UserShort) => void;
    onSubmit?: () => void;
    emojiState: EmojiSuggestionsStateT;
    onEmojiPicked: (emoji: EmojiData) => void;
    finalAddEmoji: (emoji: { shortName: string; unified: string }) => void;
    children: any;
};

const photoIconClassName = css`
    width: 18px;
    height: 18px;
    & * {
        width: 18px;
        height: 18px;
    }
`;

const fileIconClassName = css`
    width: 18px;
    height: 18px;
    & * {
        width: 18px;
        height: 18px;
    }
`;

const sendIconClassName = css`
    width: 14px;
    height: 14px;
    font-size: 14px;
    color: white;
    position: absolute;
    left: 3px;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
`;

const sendIconWrapperClassName = css`
    position: relative;
    width: 30px;
    height: 30px;
    background-color: rgba(0, 0, 0, 0.2);
    cursor: pointer;

    border-radius: 15px;
`;

const sendIconWrapperActiveWrapperClassName = css`
    background-color: #1790ff;
`;

const iconWrapperClassName = css`
    z-index: 1;
    & * {
        cursor: pointer;
        fill: #c1c7cf;
    }
`;

const PhotoButton = ({ fileSelector }: { fileSelector: () => void }) => {
    return (
        <div className={cx(photoIconClassName, iconWrapperClassName)} onClick={fileSelector}>
            <PhotoIcon />
        </div>
    );
};

const DocumentButton = ({ fileSelector }: { fileSelector: () => void }) => {
    return (
        <div className={cx(fileIconClassName, iconWrapperClassName)} onClick={fileSelector}>
            <FileIcon />
        </div>
    );
};

const SendIconWrapper = ({ onSubmit, active }: { onSubmit?: () => void; active: boolean }) => {
    return (
        <div
            className={cx(
                iconWrapperClassName,
                sendIconWrapperClassName,
                active && sendIconWrapperActiveWrapperClassName,
            )}
            onClick={onSubmit}
        >
            <XIcon icon="send" className={sendIconClassName} />
        </div>
    );
};

const FileInput = Glamorous.input({
    display: 'none',
});

const Icons = ({
    hasText,
    minimal,
    hideAttach,
    onEmojiPicked,
    onSubmit,
}: {
    hasText?: boolean;
    minimal?: boolean;
    hideAttach?: boolean;
    onEmojiPicked: (emoji: EmojiData) => void;
    onSubmit?: () => void;
}) => {
    const fileInput: React.RefObject<HTMLInputElement> = React.createRef();
    const { handleDrop, file } = React.useContext(UploadContext);

    const fileSelector = () => {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };

    const handleInputChange = (e: any) => {
        handleDrop(e.target.files[0]);
        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };

    return (
        <XView
            position="absolute"
            height="100%"
            alignItems="center"
            top={0}
            right={minimal ? 6 : 16}
            zIndex={1}
            flexDirection="row"
        >
            <FileInput type="file" innerRef={fileInput} onChange={handleInputChange} />
            {minimal && (
                <XView marginRight={20}>
                    <PhotoButton fileSelector={fileSelector} />
                </XView>
            )}
            {minimal && (
                <XView marginRight={18}>
                    <DocumentButton fileSelector={fileSelector} />
                </XView>
            )}
            {minimal && (
                <XView marginRight={16}>
                    <EmojiButton onEmojiPicked={onEmojiPicked} />
                </XView>
            )}
            {!minimal && (
                <XView>
                    <EmojiButton onEmojiPicked={onEmojiPicked} />
                </XView>
            )}
            {minimal && <SendIconWrapper active={!!file || !!hasText} onSubmit={onSubmit} />}
        </XView>
    );
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
        hideAttach,
        onSubmit,
    } = props;

    const mentionSuggestionsItems = mentionState.suggestions.map(
        (mention: UserShort, key: number) => {
            return (
                <MentionEntry
                    id={mention.id}
                    name={mention.name}
                    title={mention.primaryOrganization ? mention.primaryOrganization.name : ''}
                    avatar={mention.photo}
                    isYou={mention.isYou}
                    online={mention.online}
                    key={key}
                    isSelected={key === mentionState.selectedEntryIndex}
                    onClick={() => {
                        onMentionPicked(mentionState.suggestions[key]);
                    }}
                />
            );
        },
    );

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
        <ContainerWrapper
            {...{ ...extractFlexProps(props), ...{ round: props.round } }}
            ref={containerRef}
        >
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
            <Icons
                hasText={!!props.value}
                minimal={minimal}
                hideAttach={hideAttach}
                onEmojiPicked={onEmojiPicked}
                onSubmit={onSubmit}
            />
        </ContainerWrapper>
    );
};
