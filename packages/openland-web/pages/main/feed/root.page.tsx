import * as React from 'react';
import { withApp } from 'openland-web/components/withApp';
import { XView } from 'openland-x/XView';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from 'openland-web/components/Scaffold';
import { XTitle } from 'openland-x/XTitle';
import { XButton } from 'openland-x/XButton';

const Post = (props: { title: string, date: number, kind: 'public' | 'anonymous' }) => {
    return (
        <XView borderRadius={8} padding={16} marginTop={8} marginBottom={8} level="1" alignItems="stretch">
            <XTitle marginTop={8} marginBottom={24}>{props.title}</XTitle>
            <XView flexDirection="row" justifyContent="flex-end"> <XButton text="Direct Message" /> <XButton text="Discuss" /> </XView>
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
                        <XView flexDirection="column" width={200}>
                            {}
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
                            <Post title="Need a hire a new CEO" date={Date.now()} kind="anonymous" />
                            <Post title="How to fire our CTO without problems? NEED ADVICE" date={Date.now()} kind="public" />
                        </XView>
                        <XView flexDirection="column" width={200}>
                            {}
                        </XView>
                    </XView>
                </Scaffold.Content>
            </Scaffold>
        </>
    );
});