import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XTitle } from 'openland-x/XTitle';
import { MentionEntry } from 'openland-x/XRichTextInput/XMentionSuggestions';
import createMentionPlugin from 'draft-js-mention-plugin';

const mentionsData = [
    {
        name: 'Matthew Russell',
        link: 'https://twitter.com/mrussell247',
        title: 'Altpoint Capital',
        avatar:
            'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg',
    },
    {
        name: 'Julian Krispel-Samsel',
        link: 'https://twitter.com/juliandoesstuff',
        title: 'Parallel Capital Partners',
        avatar: 'https://avatars2.githubusercontent.com/u/1188186?v=3&s=400',
    },
    {
        name: 'Jyoti Puri',
        link: 'https://twitter.com/jyopur',
        title: 'iBorrow',
        avatar: 'https://avatars0.githubusercontent.com/u/2182307?v=3&s=400',
    },
    {
        name: 'Max Stoiber',
        link: 'https://twitter.com/mxstbr',
        title: 'Knotel',
        avatar:
            'https://pbs.twimg.com/profile_images/763033229993574400/6frGyDyA_400x400.jpg',
    },
    {
        name: 'Nik Graf',
        link: 'https://twitter.com/nikgraf',
        title: 'Valbridge',
        avatar: 'https://avatars0.githubusercontent.com/u/223045?v=3&s=400',
    },
    {
        name: 'Pascal Brandt',
        link: 'https://twitter.com/psbrandt',
        title: 'Colliers International',
        avatar:
            'https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png',
    },
];

const mentionPlugin = createMentionPlugin();

const theme = {
    mention: 'draftJsMentionPlugin__mention__29BEd',
    mentionSuggestions: 'draftJsMentionPlugin__mentionSuggestions__2DWjA',
    mentionSuggestionsEntry:
        'draftJsMentionPlugin__mentionSuggestionsEntry__3mSwm',
    mentionSuggestionsEntryFocused:
        'draftJsMentionPlugin__mentionSuggestionsEntryFocused__3LcTd draftJsMentionPlugin__mentionSuggestionsEntry__3mSwm',
    mentionSuggestionsEntryText:
        'draftJsMentionPlugin__mentionSuggestionsEntryText__3Jobq',
    mentionSuggestionsEntryAvatar:
        'draftJsMentionPlugin__mentionSuggestionsEntryAvatar__1xgA9',
};

export default withApp('UI Framework - Mentions', 'viewer', props => {
    return (
        <DevDocsScaffold title="Mentions">
            <XContent>
                <XVertical>
                    <XTitle>MentionEntry</XTitle>
                    <XHorizontal>
                        <MentionEntry mention={mentionsData[0]} theme={theme} />
                    </XHorizontal>
                    <XHorizontal>
                        <MentionEntry
                            mention={{ ...mentionsData[0], online: true }}
                            isFocused
                            theme={theme}
                        />
                    </XHorizontal>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});
