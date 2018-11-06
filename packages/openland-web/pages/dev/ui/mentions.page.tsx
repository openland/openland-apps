import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XTitle } from 'openland-x/XTitle';
import { mentionsData } from 'openland-x/XRichTextInput';
import createMentionPlugin, {
    defaultSuggestionsFilter
} from 'draft-js-mention-plugin';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';

const mentions = [
    {
        name: 'Matthew Russell',
        link: 'https://twitter.com/mrussell247',
        avatar: 'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg',
    },
    {
        name: 'Julian Krispel-Samsel',
        link: 'https://twitter.com/juliandoesstuff',
        avatar: 'https://avatars2.githubusercontent.com/u/1188186?v=3&s=400',
    },
    {
        name: 'Jyoti Puri',
        link: 'https://twitter.com/jyopur',
        avatar: 'https://avatars0.githubusercontent.com/u/2182307?v=3&s=400',
    },
    {
        name: 'Max Stoiber',
        link: 'https://twitter.com/mxstbr',
        avatar: 'https://pbs.twimg.com/profile_images/763033229993574400/6frGyDyA_400x400.jpg',
    },
    {
        name: 'Nik Graf',
        link: 'https://twitter.com/nikgraf',
        avatar: 'https://avatars0.githubusercontent.com/u/223045?v=3&s=400',
    },
    {
        name: 'Pascal Brandt',
        link: 'https://twitter.com/psbrandt',
        avatar: 'https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png',
    },
];

const mentionPlugin = createMentionPlugin();
const { MentionSuggestions } = mentionPlugin;
const plugins = [mentionPlugin];

class SimpleMentionEditor extends React.Component<any, any> {
    editor: any;
    state = {
        editorState: EditorState.createEmpty(),
        suggestions: mentions,
    };

    onChange = (editorState: any) => {
        this.setState({
            editorState,
        });
    }

    onSearchChange = ({ value }: any) => {
        this.setState({
            suggestions: defaultSuggestionsFilter(value, mentions),
        });
    }

    onAddMention = () => {
        // get the mention object selected
    }

    focus = () => {
        this.editor.focus();
    }

    render() {
        return (
            <div onClick={this.focus}>
                <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    plugins={plugins}
                    ref={(element: any) => { this.editor = element; }}
                />
                <MentionSuggestions
                    onSearchChange={this.onSearchChange}
                    suggestions={this.state.suggestions}
                    onAddMention={this.onAddMention}
                />
            </div>
        );
    }
}

// 
export default withApp('UI Framework - Mentions', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Mentions">
            <XContent>
                <XVertical>
                    <XTitle>MentionsEntry</XTitle>
                    {/* <XHorizontal>
                        <MentionsEntry mention={mentionsData[0]} />
                    </XHorizontal> */}
                    {/* <XHorizontal>
                        <MentionsEntry mention={{ ...mentionsData[0], online: true }} />
                    </XHorizontal> */}
                    <SimpleMentionEditor />
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});