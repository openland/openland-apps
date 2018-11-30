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
import { XFlexStyles, applyFlex, extractFlexProps } from './basics/Flex';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import EmojiIcon from './icons/ic-emoji.svg';
import createMentionPlugin, {
    MentionT,
    defaultSuggestionsFilter,
} from 'draft-js-mention-plugin';
import { XAvatar } from 'openland-x/XAvatar';
import { XView } from 'openland-x/XView';
import { toContentState, toHTML } from './XRichTextInput.spec';
import { MentionComponentInner } from './XMention';

const EmojiWrapper = Glamorous.div({
    position: 'absolute',
    top: 11,
    right: 12,
    '& > div': {
        display: 'block',
    },
    '& > div > button': {
        width: 18,
        height: 18,
        opacity: 1,
        borderRadius: 50,
        border: 'none',
        display: 'block',
        paddingBottom: 0,
        background: 'none!important',
        '& svg': {
            display: 'block',
            '& *': {
                fill: 'rgba(0, 0, 0, 0.25)',
            },
        },
        '&:hover svg *': {
            fill: '#1790ff',
        },
        '&.draftJsEmojiPlugin__emojiSelectButtonPressed__2Tezu svg *': {
            fill: '#1790ff',
        },
    },
    '& > div > div': {
        bottom: 50,
        right: 0,
    },
});

const getRelativeParent: (element: HTMLElement) => HTMLElement | null = (
    element: HTMLElement,
) => {
    if (!element) {
        return null;
    }

    const position = window
        .getComputedStyle(element)
        .getPropertyValue('position');
    if (position !== 'static') {
        return element;
    }

    return getRelativeParent(element.parentElement!!);
};

const emojiPlugin = createEmojiPlugin({
    selectButtonContent: <EmojiIcon />,
    positionSuggestions: (args: any) => {
        let { state, filteredEmojis, popover, decoratorRect } = args;
        const relativeParent = getRelativeParent(popover.parentElement);
        let relativeRect: any = {};
        if (relativeParent) {
            relativeRect.scrollLeft = relativeParent.scrollLeft;
            relativeRect.scrollTop = relativeParent.scrollTop;

            const relativeParentRect = relativeParent.getBoundingClientRect();
            relativeRect.left = decoratorRect.left - relativeParentRect.left;
            relativeRect.top =
                decoratorRect.top -
                relativeParentRect.top +
                relativeParentRect.height;
            console.warn(relativeParentRect);
        } else {
            relativeRect.scrollTop =
                window.pageYOffset ||
                (document.documentElement
                    ? document.documentElement.scrollTop
                    : undefined);
            relativeRect.scrollLeft =
                window.pageXOffset ||
                (document.documentElement
                    ? document.documentElement.scrollLeft
                    : undefined);

            relativeRect.top = decoratorRect.top;
            relativeRect.left = decoratorRect.left;
        }

        const left = relativeRect.left + relativeRect.scrollLeft;
        const top = relativeRect.top - relativeRect.scrollTop + 8;

        let transform;
        let transition;
        if (state.isActive) {
            if (filteredEmojis.size > 0) {
                transform = 'scale(1)';
                transition = 'all 0.25s cubic-bezier(.3,1.2,.2,1)';
            } else {
                transform = 'scale(0)';
                transition = 'all 0.35s cubic-bezier(.3,1,.2,1)';
            }
        }

        return {
            left: `${left}px`,
            bottom: `${top}px`,
            transform,
            transformOrigin: '1em 0%',
            transition,
        };
    },
});
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

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

/// Mentions

const positionSuggestions = ({ state, props }: any) => {
    let transform;
    let transition;

    if (state.isActive && props.suggestions.length > 0) {
        transform = 'scaleY(1)';
        transition = 'all 0.25s cubic-bezier(.3,1.2,.2,1)';
    } else if (state.isActive) {
        transform = 'scaleY(0)';
        transition = 'all 0.25s cubic-bezier(.3,1,.2,1)';
    }

    return {
        transform,
        transition,
    };
};

const mentionPlugin = createMentionPlugin({
    mentionPrefix: '@',
    entityMutability: 'IMMUTABLE',
    positionSuggestions,
    mentionComponent: (props: any) => {
        return (
            <MentionComponentInner
                mention={props.mention}
                className={props.className}
                inCompose
            >
                {props.children}
            </MentionComponentInner>
        );
    },
});

const MentionSuggestionsWrapper = Glamorous.div(({ width }: any) => ({
    '& ': {
        '&.draftJsMentionPlugin__mentionSuggestions__2DWjA': {
            position: 'absolute',
            borderTop: '1px solid #eee',
            background: '#fff',
            boxShadow: 'none',
            width,
            maxWidth: width,
            zIndex: 100,
            bottom: 50,
            left: 0,
            borderRadius: '10px',
            cursor: 'pointer',
        },
    },
}));

export const MentionEntry = (props: any) => {
    const {
        mention,
        theme,
        isFocused,
        searchValue, // eslint-disable-line no-unused-vars
        ...parentProps
    } = props;

    return (
        <XView
            {...parentProps}
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
            <XAvatar
                size={'m-small'}
                style={'user'}
                src={mention.avatar}
                objectName={mention.name}
                objectId={mention.id}
                online={mention.online}
            />

            <XView
                flexDirection="column"
                alignSelf="center"
                marginLeft={12}
                fontSize={13}
                fontWeight={'600'}
                lineHeight={1.54}
                color={'#000000'}
            >
                {mention.name}
            </XView>

            <XView
                flexDirection="column"
                alignSelf={'center'}
                marginLeft={7}
                opacity={0.4}
                fontSize={12}
                fontWeight={'600'}
                lineHeight={1.5}
                color={'#000000'}
            >
                {mention.title}
            </XView>

            <XView
                marginLeft="auto"
                flexDirection="column"
                alignSelf={'center'}
                opacity={0.4}
                fontSize={12}
                fontWeight={'normal'}
                lineHeight={1.5}
                color={isFocused ? '#000000' : 'transparent'}
            >
                <div style={{ position: 'relative' }}>
                    <span style={{ top: 2, position: 'absolute', left: -16 }}>
                        ↵
                    </span>{' '}
                    <span>to select</span>
                </div>
            </XView>
        </XView>
    );
};

const { MentionSuggestions } = mentionPlugin;
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
/// End Mentions
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
                    >
                        <MentionSuggestions
                            onSearchChange={this.onSearchChange}
                            suggestions={this.state.suggestions}
                            entryComponent={MentionEntry}
                        />
                    </MentionSuggestionsWrapper>
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
