import * as React from 'react';
import { XView } from 'react-mental';
import { XTitle } from 'openland-x/XTitle';
import { XLink } from 'openland-x/XLink';
import { XButton } from 'openland-x/XButton';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { XFormField } from 'openland-x-forms/XFormField';
import { XTextArea } from 'openland-x/XTextArea';
import { FeedListComponent } from './feed/FeedListComponent';
import { XMemo } from 'openland-y-utils/XMemo';
import { useClient } from 'openland-web/utils/useClient';

const NewPostModal = () => {
    const client = useClient();
    return (
        <XModalForm
            title="Create post"
            defaultAction={async src => {
                await client.mutateFeedPost({ message: src.message });
                await client.refetchFeedHome();
            }}
            targetQuery="new"
        >
            <XFormField field="message">
                <XTextArea
                    minHeight={240}
                    placeholder="What do you need?"
                    resize={false}
                    valueStoreKey="fields.message"
                />
            </XFormField>
        </XModalForm>
    );
};

export const FeedFragment = XMemo(() => {
    return (
        <XView flexDirection="row" alignItems="stretch" justifyContent="center">
            <XView flexDirection="column" width={200} alignItems="center" marginTop={32}>
                <XTitle>Channels</XTitle>
                <XLink>Founders</XLink>
                <XLink>Developers</XLink>
                <XLink>Openland</XLink>
            </XView>
            <XView
                flexDirection="column"
                flexBasis={1}
                flexGrow={1}
                flexShrink={1}
                minWidth={0}
                margin={16}
                maxWidth={860}
            >
                <XView flexDirection="row" alignItems="center">
                    <XTitle marginTop={8}>All updates</XTitle>
                    <XView flexGrow={1} />
                    {/* <XSelect
                        value="all"
                        multi={false}
                        options={[
                            { value: 'all', label: 'All' },
                            {
                                value: 'rejected',
                                label: 'Rejected',
                            },
                        ]}
                    />
                    <XView width={16} /> */}
                    <XButton
                        style="primary"
                        text="New Post"
                        query={{ field: 'new', value: 'true' }}
                    />
                </XView>
                <FeedListComponent />
                {/* <Post
                    source="founders"
                    title="Need to hire a new CEO"
                    date={Date.now()}
                    kind="anonymous"
                />
                <Post
                    source="founders"
                    title="How to fire our CTO without problems? NEED ADVICE"
                    date={Date.now()}
                    kind="public"
                />
                <Post
                    source="sales"
                    title="Introduction for a good Product Manager (write @diana)"
                    date={Date.now()}
                    kind="introduction"
                /> */}
            </XView>
            <XView flexDirection="column" width={200} alignItems="center" marginTop={32}>
                <XTitle>Hot topics</XTitle>
                <XLink>#hiring</XLink>
                <XLink>#advice</XLink>
                <XLink>#intro</XLink>
            </XView>
            <NewPostModal />
        </XView>
    );
});
