import * as React from 'react';
import Glamorous from 'glamorous';
import { XButton } from 'openland-x/XButton';
import { randomKey } from './utils/randomKey';
import { XSAnimatedView } from './XSAnimatedView';
import { XSAnimatedShadowView } from './XSAnimatedShadowView';
import { XSAnimated } from './XSAnimated';

const Container = Glamorous.div({
    position: 'relative',
    display: 'flex',
    width: 500,
    height: 500,
    overflow: 'hidden'
});

const Controls = Glamorous.div({
    display: 'flex',
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10
});

const ScreenContainer = Glamorous(XSAnimatedView)({
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff'
});

const ScreenContainerInner = Glamorous(XSAnimatedView)({
    display: 'flex',
    position: 'relative',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
});

const ScreenShadow = Glamorous(XSAnimatedView)({
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000'
});

interface NavigationPage {
    key: string;
    container: XSAnimatedShadowView;
    content: XSAnimatedShadowView;
    shadowOverlay: XSAnimatedShadowView;
}

export class XSNaivgationView extends React.PureComponent<{}, { screens: NavigationPage[] }> {

    private screens: NavigationPage[] = [];
    private isNavigating = false;

    constructor(props: {}) {
        super(props);
        this.screens = [{
            key: 'initial',
            container: new XSAnimatedShadowView({ translateX: '0%' }),
            content: new XSAnimatedShadowView({ translateX: '0%', opacity: 1 }),
            shadowOverlay: new XSAnimatedShadowView({ opacity: 0 })
        }];
        this.state = {
            screens: this.screens
        };
    }

    private handlePush = () => {
        if (this.isNavigating) {
            return;
        }
        let prev = this.screens[this.screens.length - 1];
        let item = {
            key: randomKey(),
            container: new XSAnimatedShadowView({ translateX: '100%' }),
            content: new XSAnimatedShadowView({ translateX: '0%', opacity: 0 }),
            shadowOverlay: new XSAnimatedShadowView({ opacity: 0 })
        };

        // Animate
        this.isNavigating = true;
        XSAnimated.animate(
            () => {
                prev.container.translateX = '-33%';
                prev.shadowOverlay.opacity = 0.1;
                prev.content.opacity = 0;
                item.container.translateX = '0%';
                item.content.opacity = 1;
            },
            () => {
                this.isNavigating = false;
            });

        this.screens = [...this.screens, item];
        this.setState({ screens: this.screens });
    }

    private handlePop = () => {
        if (this.isNavigating) {
            return;
        }
        if (this.screens.length >= 2) {
            let item = this.screens[this.screens.length - 2];
            let last = this.screens[this.screens.length - 1];

            // Animate
            this.isNavigating = true;
            XSAnimated.animate(
                () => {
                    last.container.translateX = '100%';
                    item.container.translateX = '0%';
                    item.shadowOverlay.opacity = 0;
                    item.content.opacity = 1;
                },
                () => {
                    let s = [...this.screens];
                    s.splice(s.length - 1);
                    this.screens = s;
                    this.setState({ screens: this.screens });
                    this.isNavigating = false;
                });
        }
    }

    render() {
        return (
            <Container>
                {this.state.screens.map((v) => (
                    <ScreenContainer shadow={v.container}>
                        <ScreenContainerInner shadow={v.content}>
                            Hello - {v.key}
                        </ScreenContainerInner>
                        <ScreenShadow shadow={v.shadowOverlay} />
                    </ScreenContainer>
                ))}
                <Controls>
                    <XButton text="Push" onClick={this.handlePush} />
                    <XButton text="Pop" onClick={this.handlePop} />
                </Controls>
            </Container>
        );
    }
}