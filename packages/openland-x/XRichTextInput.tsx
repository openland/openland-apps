import * as React from 'react';
import Glamorous from 'glamorous';
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
import { XAvatar } from 'openland-x/XAvatar';

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

export type MentionDataT = {
    name: string,
    title: string,
    avatar: string,
    isYou?: boolean;
    online?: boolean;
};

const getEmojiRegex = () => {
    // https://mths.be/emoji
    return /\uD83C\uDFF4(?:\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74)\uDB40\uDC7F|\u200D\u2620\uFE0F)|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3]))|\uD83D\uDC69\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83D\uDC69\u200D[\u2695\u2696\u2708])\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC68(?:\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDD1-\uDDDD])/g;
};

export const removeEmojiFromText = (str: string) => {
    return str.replace(getEmojiRegex(), '').trim();
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
        transition
    };
};

export const MentionComponentInner = Glamorous.span(
    {},
    ({ isYou }: { isYou: boolean }) => {
        if (isYou) {
            return {
                backgroundColor: '#fff6e5',
                color: '#1790ff'
            };
        }
        return {
            backgroundColor: '#e6f3ff',
            color: '#1790ff'
        };
    }
);

const mentionPlugin = createMentionPlugin({
    mentionPrefix: '@',
    positionSuggestions,
    mentionComponent: (props: any) => {
        console.log(props);
        return (
            <MentionComponentInner
                isYou={props.mention.isYou}
                className={props.className}
                // eslint-disable-next-line no-alert
                // onClick={() => console.log('Clicked on the Mention!')}
            >
                {props.children}
            </MentionComponentInner>
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
        isFocused,
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

const { MentionSuggestions } = mentionPlugin;
export interface XRichTextInputProps extends XFlexStyles {
    onChange?: (value: string) => void;
    value?: string;
    onSubmit?: () => void;
    placeholder?: string;
    autofocus?: boolean;
    mentionsData: MentionDataT[];
}

type XRichTextInputState = { 
    editorState: EditorState, 
    beChanged: boolean, 
    suggestions: Array<MentionT> 
};

/// End Mentions
export class XRichTextInput extends React.PureComponent<XRichTextInputProps, XRichTextInputState> {
    private editorRef = React.createRef<Editor>();
    constructor(props: XRichTextInputProps) {
        super(props);
        
        this.state = {
            suggestions: this.props.mentionsData || [],
            beChanged: false,
            editorState: EditorState.moveFocusToEnd(EditorState.createWithContent(ContentState.createFromText(props.value || '')))
        };
    }

    componentDidMount() {
        if (this.props.autofocus) {
            this.focus();
        }
    }

    onSearchChange = ({ value }: any) => {
        const mentionsData = this.props.mentionsData || [];
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
        this.setState(
            { 
                editorState,
                beChanged: true
            }, 
            () => {
                if (this.props.onChange) {
                    this.props.onChange(editorState.getCurrentContent().getPlainText());
                }
            }
         );
    }

    componentWillReceiveProps(nextProps: XRichTextInputProps) {
        if (this.props.value !== nextProps.value && !this.state.beChanged) {
            const state = EditorState.createWithContent(ContentState.createFromText(nextProps.value || ''));
            this.setState({
                editorState: EditorState.moveFocusToEnd(state)
            });
        }
    }

    render() {
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