import * as React from 'react';
import Glamorous from 'glamorous';
// import decorateComponentWithProps from 'decorate-component-with-props';
import Editor from 'draft-js-plugins-editor';
import { EditorState, getDefaultKeyBinding, ContentState, DraftHandleValue } from 'draft-js';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { XFlexStyles, applyFlex, extractFlexProps } from './basics/Flex';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import EmojiIcon from './icons/ic-emoji.svg';
import createMentionPlugin, {
    MentionT,
    defaultSuggestionsFilter
} from 'draft-js-mention-plugin';
import Mention from 'draft-js-mention-plugin/lib/Mention';

// console.log(Mention)
import { XAvatar } from 'openland-x/XAvatar';
import { XSGroupItemProps } from 'openland-xs/XSGroupItem';

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
            fill: '#1790ff'
        },
        '&.draftJsEmojiPlugin__emojiSelectButtonPressed__2Tezu svg *': {
            fill: '#1790ff'
        }
    },
    '& > div > div': {
        bottom: 50,
        right: 0
    }
});

const getRelativeParent: (element: HTMLElement) => HTMLElement | null = (element: HTMLElement) => {
    if (!element) {
        return null;
    }

    const position = window.getComputedStyle(element).getPropertyValue('position');
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
            relativeRect.top = decoratorRect.top - relativeParentRect.top + relativeParentRect.height;
            console.warn(relativeParentRect);
        } else {
            relativeRect.scrollTop = window.pageYOffset || (document.documentElement ? document.documentElement.scrollTop : undefined);
            relativeRect.scrollLeft = window.pageXOffset || (document.documentElement ? document.documentElement.scrollLeft : undefined);

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
    }
});
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

const Container = Glamorous.div<XFlexStyles>([{
    position: 'relative',

    '& .public-DraftEditorPlaceholder-root:not(.public-DraftEditorPlaceholder-hasFocus)': {
        color: 'rgba(0, 0, 0, 0.5)'
    }
}, applyFlex]);

function keyBinding(e: React.KeyboardEvent<any>): string | null {
    if (e.keyCode === 13 /* `Enter` key */ && !e.shiftKey) {
        return 'x-editor-submit';
    }
    return getDefaultKeyBinding(e);
}

export interface XRichTextInputProps extends XFlexStyles {
    onChange?: (value: string) => void;
    value?: string;
    onSubmit?: () => void;
    placeholder?: string;
    autofocus?: boolean;
}

/// Mentions

export const mentionsData = [
    {
        name: 'Matthew Russell',
        title: 'Senior Software Engineer',
        avatar:
            'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg'
    },
    {
        name: 'Julian Krispel-Samsel',
        title: 'United Kingdom',
        avatar: 'https://avatars2.githubusercontent.com/u/1188186?v=3&s=400',
        online: true
    },
    {
        name: 'Jyoti Puri',
        title: 'New Delhi, India',
        avatar: 'https://avatars0.githubusercontent.com/u/2182307?v=3&s=400',
        isMyself: true
    },
];

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
        transition
    };
};

const MentionComponent = Glamorous.span(
    {},
    ({ isMyself }: { isMyself: boolean }) => {
        if (isMyself) {
            return {
                // different style for myself mention
                color: 'red',
            };
        }
        return {};
    }
);

const mentionPlugin = createMentionPlugin({
    mentions: mentionsData,
    entityMutability: 'IMMUTABLE',
    mentionPrefix: '@',
    positionSuggestions,
    mentionComponent: (props: any) => {
        return (
            <MentionComponent
                isMyself={props.mention.isMyself}
                className={props.className}
                // eslint-disable-next-line no-alert
                onClick={() => console.log('Clicked on the Mention!')}
            >
                {props.children}
            </MentionComponent>
        );
    },
});

const MentionSuggestionsWrapper = Glamorous.div({
    '& ': {
        '&.draftJsMentionPlugin__mentionSuggestions__2DWjA': {
            position: 'absolute',
            borderTop: '1px solid #eee',
            background: '#fff',
            zIndex: 100,
            bottom: 50,
            left: 16,
            borderRadius: '2px',
            cursor: 'pointer',
        }
    }
});

const MentionEntry = (props: any) => {
    const {
        mention,
        theme,
        searchValue, // eslint-disable-line no-unused-vars
        ...parentProps
    } = props;

    return (
        <div {...parentProps}>
            <div className={theme.mentionSuggestionsEntryContainer}>
                <div className={theme.mentionSuggestionsEntryContainerLeft}>
                    <XAvatar
                        src={mention.avatar}
                        online={mention.online}
                    />
                </div>

                <div className={theme.mentionSuggestionsEntryContainerRight}>
                    <div className={theme.mentionSuggestionsEntryText}>
                        {mention.name}
                    </div>

                    <div className={theme.mentionSuggestionsEntryTitle}>
                        {mention.title}
                    </div>
                </div>
            </div>
        </div>
    );
};

/// End Mentions
export class XRichTextInput extends React.PureComponent<XRichTextInputProps, { editorState: EditorState, beChanged: boolean, suggestions: Array<MentionT> }> {
    constructor(props: XRichTextInputProps) {
        super(props);
        this.state = {
            suggestions: mentionsData,
            beChanged: false,
            editorState: EditorState.moveFocusToEnd(EditorState.createWithContent(ContentState.createFromText(props.value || '')))
        };

    }
    private editorRef = React.createRef<Editor>();

    componentDidMount() {
        if (this.props.autofocus) {
            this.focus();
        }
    }

    onSearchChange = ({ value }: any) => {
        this.setState({
            suggestions: defaultSuggestionsFilter(value, mentionsData)
        });
    }

    focus = () => {
        if (this.editorRef.current) {
            this.editorRef.current.focus();
        }
    }

    reset = () => {
        this.setState((src) => ({
            editorState: EditorState.push(src.editorState, ContentState.createFromText(''), 'remove-range')
        }));
    }

    resetAndFocus = () => {
        this.setState((src) => ({ editorState: EditorState.push(src.editorState, ContentState.createFromText(''), 'remove-range') }), () => { this.focus(); });
    }

    onHandleKey: (command: string) => DraftHandleValue = (command: string) => {
        if (command === 'x-editor-submit') {
            if (this.props.onSubmit) {
                this.props.onSubmit();
                return 'handled';
            }
        }
        return 'not-handled';
    }

    onChange = (editorState: EditorState) => {
        if (this.props.value !== undefined && !this.state.beChanged) {
            this.setState({
                beChanged: true
            });
            return;
        }

        this.setState({ editorState: editorState });

        if (this.props.onChange) {
            this.props.onChange(editorState.getCurrentContent().getPlainText());
        }
    }

    componentWillReceiveProps(nextProps: XRichTextInputProps) {
        if (this.props.value !== nextProps.value) {
            const state = EditorState.createWithContent(ContentState.createFromText(nextProps.value || ''));
            this.setState({
                editorState: EditorState.moveFocusToEnd(state)
            });
        }
    }

    render() {
        const { MentionSuggestions } = mentionPlugin;

        if (canUseDOM) {
            return (
                <Container {...extractFlexProps(this.props)}>
                    <MentionSuggestionsWrapper>
                        <MentionSuggestions
                            onSearchChange={this.onSearchChange}
                            suggestions={this.state.suggestions}
                            entryComponent={MentionEntry}
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
                    </MentionSuggestionsWrapper>
                    <EmojiSuggestions />
                    <EmojiWrapper className="emoji-button">
                        <EmojiSelect />
                    </EmojiWrapper>
                </Container>
            );
        } else {
            return <Container {...extractFlexProps(this.props)} />;
        }
    }
}