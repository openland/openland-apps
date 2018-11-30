import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Glamorous from 'glamorous';
import Editor from 'draft-js-plugins-editor';
import {
    EditorState,
    getDefaultKeyBinding,
    ContentState,
    DraftHandleValue,
} from 'draft-js';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { XFlexStyles, applyFlex, extractFlexProps } from '../basics/Flex';
import { MentionT, defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import { toContentState, toHTML } from './conversion';
import {
    MentionSuggestionsWrapper,
    mentionPlugin,
} from './XMentionSuggestions';
import { emojiPlugin, EmojiWrapper } from './XEmojiSuggestions';

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

function keyBinding(e: React.KeyboardEvent<any>): string | null {
    if (e.keyCode === 13 /* `Enter` key */ && !e.shiftKey) {
        return 'x-editor-submit';
    }
    return getDefaultKeyBinding(e);
}

export type MentionDataT = {
    name: string;
    title: string;
    avatar: string;
    isYou?: boolean;
    online?: boolean;
};

export interface XRichTextInputProps extends XFlexStyles {
    onChange?: (value: string) => void;
    value: string;
    onSubmit?: () => void;
    placeholder?: string;
    autofocus?: boolean;
    mentionsData?: MentionDataT[];
}

type XRichTextInputState = {
    editorState: EditorState;
    suggestions: Array<MentionT>;
    html: string;
    widthOfContainer: number;
};

const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
export class XRichTextInput extends React.PureComponent<
    XRichTextInputProps,
    XRichTextInputState
> {
    private editorRef = React.createRef<Editor>();
    private containerRef = React.createRef<ContainerWrapper>();

    constructor(props: XRichTextInputProps) {
        super(props);

        const editorState = toHTML(props.value);

        this.state = {
            widthOfContainer: 200,
            suggestions: this.props.mentionsData || [],
            editorState,
            html: props.value,
        };
    }

    componentDidMount() {
        if (this.props.autofocus) {
            this.focus();
        }
    }

    onSearchChange = ({ value }: any) => {
        const mentionsData = this.props.mentionsData || [];
        window.requestAnimationFrame(() => {
            this.setState({
                suggestions: defaultSuggestionsFilter(value, mentionsData),
            });
        });
    };

    focus = () => {
        window.requestAnimationFrame(() => {
            this.setState({
                editorState: EditorState.moveFocusToEnd(this.state.editorState),
            });

            if (this.editorRef.current) {
                this.editorRef.current.focus();
            }
        });
    };

    reset = () => {
        window.requestAnimationFrame(() => {
            this.setState(src => ({
                editorState: EditorState.push(
                    src.editorState,
                    ContentState.createFromText(''),
                    'remove-range',
                ),
            }));
        });
    };

    resetAndFocus = () => {
        window.requestAnimationFrame(() => {
            this.setState(
                src => ({
                    editorState: EditorState.push(
                        src.editorState,
                        ContentState.createFromText(''),
                        'remove-range',
                    ),
                }),
                () => {
                    this.focus();
                },
            );
        });
    };

    onHandleKey: (command: string) => DraftHandleValue = (command: string) => {
        if (command === 'x-editor-submit') {
            if (this.props.onSubmit) {
                this.props.onSubmit();
                return 'handled';
            }
        }
        return 'not-handled';
    };

    onChange = (editorState: EditorState) => {
        const html = toHTML(editorState.getCurrentContent());

        this.setState(
            {
                editorState,
                html,
            },
            () => {
                if (this.props.onChange) {
                    this.props.onChange(html);
                }
            },
        );
    };

    componentWillReceiveProps(nextProps: XRichTextInputProps) {
        const nextValue = nextProps.value;
        if (this.props.value !== nextValue && this.state.html !== nextValue) {
            const editorState = toContentState(nextValue);

            this.setState({
                editorState: editorState,
                html: nextValue,
            });
        }
    }

    componentDidUpdate() {
        const containerEl =
            this.containerRef &&
            this.containerRef.current &&
            (ReactDOM.findDOMNode(this.containerRef.current) as Element);
        const widthOfContainer = containerEl
            ? containerEl.getBoundingClientRect().width
            : 0;
        this.setState({
            widthOfContainer,
        });
    }

    render() {
        if (canUseDOM) {
            return (
                <ContainerWrapper
                    {...extractFlexProps(this.props)}
                    ref={this.containerRef}
                >
                    <MentionSuggestionsWrapper
                        width={this.state.widthOfContainer}
                        onSearchChange={this.onSearchChange}
                        suggestions={this.state.suggestions}
                    />
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        placeholder={this.props.placeholder}
                        keyBindingFn={keyBinding}
                        handleKeyCommand={this.onHandleKey}
                        ref={this.editorRef}
                        plugins={[emojiPlugin, mentionPlugin]}
                    />

                    <EmojiSuggestions />
                    <EmojiWrapper className="emoji-button">
                        <EmojiSelect />
                    </EmojiWrapper>
                </ContainerWrapper>
            );
        } else {
            return <ContainerWrapper {...extractFlexProps(this.props)} />;
        }
    }
}
