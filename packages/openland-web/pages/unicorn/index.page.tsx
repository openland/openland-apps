import * as React from 'react';
import { Container, InnerContainer } from './components/Container';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { css as css2 } from 'glamor';
import { useLayout } from './components/LayoutContext';
import { UnicornProvider, useController } from './components/UnicornController';
import { XButton } from 'openland-x/XButton';
import uuid from 'uuid';

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

const Navigation = () => {
    let layout = useLayout();
    if (layout === 'desktop') {
        return (
            <XView width="50px" position="absolute" top={0} left={0} bottom={0} backgroundColor="red">
                {}
            </XView>
        );
    } else {
        return (
            <XView height="50px" position="absolute" bottom={0} left={0} right={0} backgroundColor="red">
                {}
            </XView>
        );
    }
};

const Page = (props: { text: string }) => {
    let controller = useController();
    return (
        <XView>
            <XView>
                {props.text}
            </XView>
            <XButton onClick={() => controller.pop()} />
        </XView>
    );
}

const Root = () => {
    let controller = useController();

    return (
        <XView alignSelf="stretch" height="1500px" backgroundColor="yellow">
            <div className={containerClass} />
            <div className={blurClass} />

            <XButton onClick={() => controller.push(<Page text={uuid()} />)} />
        </XView>
    );
}

export default () => {
    return (
        <Container>
            <InnerContainer>
                <UnicornProvider root={<Root />} />
            </InnerContainer>
            <Navigation />
        </Container>
    );
};