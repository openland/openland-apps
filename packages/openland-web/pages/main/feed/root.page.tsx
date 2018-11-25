import * as React from 'react';
import { withApp } from 'openland-web/components/withApp';
import { XView } from 'openland-x/XView';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from 'openland-web/components/Scaffold';
import { XTitle } from 'openland-x/XTitle';
import { XButton } from 'openland-x/XButton';
import { XLink } from 'openland-x/XLink';
import { XSelect } from 'openland-x/XSelect';

const Post = (props: { source: string, title: string, date: number, kind: 'public' | 'anonymous' | 'introduction' }) => {
    return (
        <XView borderRadius={8} padding={16} marginTop={8} marginBottom={8} level="1" alignItems="stretch" backgroundColor={props.kind === 'anonymous' ? '#abe3c5' : undefined}>
            <XTitle marginTop={8} marginBottom={24}>{props.source} {props.kind} {props.title}</XTitle>
            <XView flexDirection="row" justifyContent="space-between"> <XButton text="Direct Message" /> <XButton text="Discuss" /> <XButton style="danger" text="Not interested" /> </XView>
        </XView>
    );
};

export default withApp('Home', 'viewer', (props) => {
    return (
        <>
            <XDocumentHead title="Feed" />
            <Scaffold>
                <Scaffold.Content padding={false} bottomOffset={false}>
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
                            <XView flexDirection="row">
                                <XTitle marginTop={8}>All updates</XTitle>
                                <XView flexGrow={1} />
                                <XSelect value="all" multi={false} options={[{ value: 'all', label: 'All' }, { value: 'rejected', label: 'Rejected' }]} />
                            </XView>
                            <Post
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
                            />
                        </XView>
                        <XView flexDirection="column" width={200} alignItems="center" marginTop={32}>
                            <XTitle>Hot topics</XTitle>
                            <XLink>#hiring</XLink>
                            <XLink>#advice</XLink>
                            <XLink>#intro</XLink>
                        </XView>
                    </XView>
                </Scaffold.Content>
            </Scaffold>
        </>
    );
});