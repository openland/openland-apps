import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XScrollView } from 'openland-x/XScrollView';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { XView } from 'react-mental';
import { XScrollView2 } from 'openland-x/XScrollView2';
import { XScrollViewReverse2 } from 'openland-x/XScrollViewReversed2';
import { XButton } from 'openland-x/XButton';
import { XVertical2 } from 'openland-x/XVertical2';

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
    let [count2, setCount2] = React.useState(0);
    let [height, setHeight] = React.useState(200);
    let childrens: any[] = [];
    for (let i = count2; i > 0; i--) {
        childrens.push(<XView key={'keyb-' + i} backgroundColor={['yellow', 'green', 'brown'][i % 3]} width={100} height={100} flexShrink={0} />);
    }
    for (let i = 0; i < count; i++) {
        childrens.push(<XView key={'keya-' + i} backgroundColor={['red', 'blue', 'magenta'][i % 3]} width={100} height={100} flexShrink={0} />);
    }
    return (
        <XView flexDirection="row" backgroundColor="grey">
            <XView flexDirection="column">
                <XButton onClick={() => setCount((v) => v + 1)} text="add" />
                <XButton onClick={() => setCount((v) => v - 1)} text="remove" />

                <XButton onClick={() => setCount2((v) => v + 1)} text="add2" />
                <XButton onClick={() => setCount2((v) => v - 1)} text="remove2" />

                <XButton onClick={() => setHeight((v) => v + 50)} text="increase" />
                <XButton onClick={() => setHeight((v) => v - 50)} text="decrease" />
            </XView>
            <XView flexDirection="column" width={200} height={height}>
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
                                <XVertical2>
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
                                </XVertical2>
                            </XScrollView>
                            <XScrollView2 width={200} height={600}>
                                <XVertical2>
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
                                </XVertical2>
                            </XScrollView2>
                            <XScrollView3 width={200} height={600}>
                                <XVertical2>
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
                                </XVertical2>
                            </XScrollView3>
                        </XView>
                    </XView>
                </Container>
            </XContent>
        </DevDocsScaffold>
    );
});
