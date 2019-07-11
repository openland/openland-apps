import * as React from 'react';
import { Container, InnerContainer } from './components/Container';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { css as css2 } from 'glamor';
import { useLayout } from './components/LayoutContext';
import { useController } from './components/UnicornController';
import { XButton } from 'openland-x/XButton';
import uuid from 'uuid';
import { DialogListFragment } from 'openland-web/fragments/dialogs/DialogListFragment';
import { XLoader } from 'openland-x/XLoader';
import { UnicornLayout } from './components/UnicornLayout';

const containerClass = css`
    width: 100px;
    height: 100px;
    margin: 100px;
    background: url(https://ucarecdn.com/7a9a4342-9a3f-454e-aebd-24edd3a336df/-/scale_crop/334x188/center/-/quality/lighter/-/format/jpeg/-/progressive/yes/);
`;

const blurClass = css`
    position: absolute;
    width: 100px;
    height: 100px;
    top: 90px;
    left: 90px;
    background-color: rgba(255, 255, 255, .9);
    @supports ((-webkit-backdrop-filter: blur(10px)) or (backdrop-filter: blur(10px))) {
        background-color: rgba(255, 255, 255, .5);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);   
    }
`;

css2.global('html, body', {
    overscrollBehavior: 'none',
    overflow: 'hidden'
});

// const Tabs = () => {
//     let [tab, setTab] =  React.useState(0);

//     return (

//     )
// };

const Navigation = React.memo(() => {
    let layout = useLayout();
    if (layout === 'desktop') {
        return (
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, transform: 'translate3d(0,0,1px)' }} >
                <XView width="50px" height="100%" backgroundColor="red">
                    {}
                </XView>
            </div>
        );
    } else {
        return (
            <XView height="50px" position="absolute" bottom={0} left={0} right={0} backgroundColor="red">
                {}
            </XView>
        );
    }
});

const Timer = () => {
    let [counter, setCounter] = React.useState(0);
    React.useEffect(() => {
        let t = setInterval(() => {
            // setCounter((c) => c + 1);
            let start = Date.now();
            while (Date.now() - start < 40) {
                //
            }
        }, 10);
        return () => clearInterval(t);
    }, []);

    // React.useLayoutEffect(() => {
    //     let start = Date.now();
    //     while (Date.now() - start < 30) {
    //         //
    //     }
    // })

    return <XView paddingTop={counter}>{counter}</XView>;
};

const Page = (props: { text: string }) => {
    return (
        <XView width="100%" height="100%">
            <DialogListFragment onSearchItemSelected={() => {/*  */ }} />
        </XView>
    );
};

const Root = () => {
    let controller = useController();

    return (
        <XView alignSelf="stretch" height="1500px" backgroundColor="yellow">
            <div className={containerClass} />
            <div className={blurClass} />

            <XView width="100px" height="100px">
                <XLoader loading={true} />
            </XView>

            <XButton
                text="Next"
                onClick={() => {
                    controller.push(<Page text={uuid()} />);
                    // setTimeout(() => {
                    //     requestAnimationFrame(() => {
                    //         let start = Date.now();
                    //         while (Date.now() - start < 2000) {
                    //             //
                    //         }
                    //     });
                    // }, 30);
                }}
            />
            <XButton
                text="Freeze"
                onClick={() => {
                    let start = Date.now();
                    while (Date.now() - start < 2000) {
                        //
                    }
                }}
            />
        </XView>
    );
};

export default () => {
    return (
        <Container>
            <InnerContainer>
                <UnicornLayout root={<Root />} />
            </InnerContainer>
            <Navigation />
        </Container>
    );
};