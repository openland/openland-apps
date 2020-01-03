import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XScrollViewReverse2 } from 'openland-x/XScrollViewReversed2';
import { XView } from 'react-mental';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { USelect } from 'openland-web/components/unicorn/USelect';
import { XScrollViewAnchored } from 'openland-x/XScrollViewAnchored';
import { css } from 'linaria';

const NativeStyle = css`
    overflow-y: overlay;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    overflow-anchor: none;
    flex-shrink: 1;
    width: 100%;
    height: 100%;
`;

const NativeContent = css`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 100% !important;
    overflow-y: hidden;
    overflow-x: hidden;
`;

const NativeScroll = React.memo((props: { children?: any }) => {
    return (
        <XView flexGrow={1} flexShrink={1} alignSelf="stretch" backgroundColor="magenta">
            <div className={NativeStyle}>
                <div className={NativeContent}>
                    {props.children}
                </div>
            </div>
        </XView>
    );
});

// const DynamicView = React.memo(() => {
//     const [h, setH] = React.useState(100);

//     React.useEffect(() => {
//         let it = setInterval(() => {
//             setH((s) => {
//                 if (s === 100) {
//                     return 200;
//                 } else {
//                     return 100;
//                 }
//             });
//         }, 1000);
//         return () => clearInterval(it);
//     }, []);

//     return (
//         <XView
//             width={100}
//             height={h}
//             backgroundColor={'green'}
//             color="white"
//             alignItems="center"
//             justifyContent="center"
//         >
//             <span>
//                 {'Dyno'}
//             </span>
//         </XView>
//     );
// });

const TestComponent = React.memo(() => {
    const [engine, setEngine] = React.useState<'XScrollViewReverse2' | 'XScrollViewAnchored' | 'Native'>('XScrollViewReverse2');
    const [countStart, setCountStart] = React.useState(0);
    const [count, setCount] = React.useState(20);
    const [height, setHeight] = React.useState(400);

    let items: any[] = [];
    for (let i = countStart; i < count; i++) {
        // if (i === 0) {
        //     items.push(<DynamicView key="dyno" />);
        // }
        items.push(
            <XView
                key={'l-' + i}
                width={100}
                height={100}
                backgroundColor={i % 2 === 0 ? 'red' : 'blue'}
                color="white"
                alignItems="center"
                justifyContent="center"
            >
                <span>
                    {'Item #' + i}
                </span>
            </XView>
        );
    }
    return (
        <XView height={height} flexDirection="column">
            <XView height={60} flexDirection="row" alignItems="center">
                <UButton text="Add Top" onClick={() => setCountStart((s) => s - 1)} marginRight={8} />
                <UButton text="Remove Top" onClick={() => setCountStart((s) => s + 1)} marginRight={8} />
                <UButton text="Add Bottom" onClick={() => setCount((s) => s + 1)} marginRight={8} />
                <UButton text="Remove Bottom" onClick={() => setCount((s) => s - 1)} marginRight={8} />
            </XView>
            <XView height={60} flexDirection="row" alignItems="center">
                <UButton text="Bigger" onClick={() => setHeight((s) => s + 20)} marginRight={8} />
                <UButton text="Smaller" onClick={() => setHeight((s) => s - 20)} marginRight={8} />

                <USelect
                    placeholder="Engine"
                    options={[{
                        value: 'XScrollViewReverse2', label: 'XScrollViewReverse2'
                    }, {
                        value: 'XScrollViewAnchored', label: 'XScrollViewAnchored'
                    }, {
                        value: 'Native', label: 'Native'
                    }]}
                    value={engine}
                    flexGrow={1}
                    multi={false}
                    onChange={(p) => setEngine((p as any).value)}
                />
            </XView>
            {engine === 'XScrollViewReverse2' && (
                <XScrollViewReverse2 flexGrow={1} flexShrink={1} alignSelf="stretch" backgroundColor="magenta">
                    {items}
                </XScrollViewReverse2>
            )}
            {engine === 'XScrollViewAnchored' && (
                <XScrollViewAnchored flexGrow={1} flexShrink={1} alignSelf="stretch" backgroundColor="magenta">
                    {items}
                </XScrollViewAnchored>
            )}
            {engine === 'Native' && (
                <NativeScroll>
                    {items}
                </NativeScroll>
            )}
        </XView>
    );
});

export default withApp('Scroll', 'viewer', props => {
    return (
        <DevDocsScaffold title="Scroll">
            <TestComponent />
        </DevDocsScaffold>
    );
});