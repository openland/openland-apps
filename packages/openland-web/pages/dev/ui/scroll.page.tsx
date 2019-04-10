import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XScrollView } from 'openland-x/XScrollView';
import { XVertical } from 'openland-x-layout/XVertical';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { XView } from 'react-mental';
import { XScrollView2 } from 'openland-x/XScrollView2';
import { XScrollViewReverse2 } from 'openland-x/XScrollViewReversed2';
import { XButton } from 'openland-x/XButton';

const Box = Glamorous.div({
    width: '100px',
    height: '100px',
    backgroundColor: '#0000ff',
    margin: 8,
    flexShrink: 0,
});

const Container = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    width: 600,
    // height: 600,
});

const ResizableScroll = () => {
    let [count, setCount] = React.useState(0);
    let childrens: any[] = [];
    for (let i = 0; i < count; i++) {
        childrens.push(<XView key={'ke' + i} backgroundColor={['red', 'blue', 'magenta'][i % 3]} width={100} height={100} flexShrink={0} />);
    }
    return (
        <XView flexDirection="row" backgroundColor="grey">
            <XView flexDirection="column">
                <XButton onClick={() => setCount((v) => v + 1)} text="add" />
                <XButton onClick={() => setCount((v) => v - 1)} text="remove" />
            </XView>
            <XView flexDirection="column" width={200} height={200}>
                <XScrollViewReverse2>
                    {childrens}
                </XScrollViewReverse2>
            </XView>
        </XView>
    )
};

export default withApp('UI Framework - Scroll', 'viewer', props => {
    return (
        <DevDocsScaffold title="Scroll">
            <XContent>
                <Container>
                    <XView width={600} flexDirection="column">
                        <ResizableScroll />
                        <XView width={600} flexDirection="row" backgroundColor="red">
                            <XScrollView width={200} height={600}>
                                <XVertical>
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                </XVertical>
                            </XScrollView>
                            <XScrollView2 width={200} height={600}>
                                <XVertical>
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                </XVertical>
                            </XScrollView2>
                            <XScrollView3 width={200} height={600}>
                                <XVertical>
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                    <Box />
                                </XVertical>
                            </XScrollView3>
                        </XView>
                    </XView>
                </Container>
            </XContent>
        </DevDocsScaffold>
    );
});
