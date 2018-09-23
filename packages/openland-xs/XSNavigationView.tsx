import * as React from 'react';
import Glamorous from 'glamorous';
import { XButton } from 'openland-x/XButton';
import { randomKey } from './utils/randomKey';
import { XSAnimatedView } from './XSAnimatedView';
import { XSAnimatedShadowView } from './XSAnimatedShadowView';
import { XSAnimated } from './XSAnimated';

const TRANSITION_DURATION = '500ms';

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
    bottom: 0
});

const ScreenContainerInner = Glamorous.div({
    display: 'flex',
    position: 'relative',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
});

const ScreenShadow = Glamorous.div({
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    transition: 'opacity ' + TRANSITION_DURATION + ' cubic-bezier(0.2833, 0.99, 0.31833, 0.99)', /* iOS Spring Interpolation */
    willChange: 'opacity'
});

export class XSNaivgationView extends React.PureComponent<{}, { screens: { key: string, shadow: XSAnimatedShadowView }[] }> {

    private screens: { key: string, shadow: XSAnimatedShadowView }[] = [];

    constructor(props: {}) {
        super(props);
        this.screens = [{ key: 'initial', shadow: new XSAnimatedShadowView({ translateX: '0%' }) }];
        this.state = {
            screens: this.screens
        };
    }

    private handlePush = () => {
        let prev = this.screens[this.screens.length - 1];
        let item = { key: randomKey(), shadow: new XSAnimatedShadowView({ translateX: '100%' }) };

        // Animate
        XSAnimated.animate(() => {
            prev.shadow.translateX = '-33%';
            item.shadow.translateX = '0%';
        });

        this.screens = [...this.screens, item];
        this.setState({ screens: this.screens });
    }

    private handlePop = () => {
        if (this.screens.length >= 2) {
            let item = this.screens[this.screens.length - 2];
            let last = this.screens[this.screens.length - 1];
            
            // Animate
            XSAnimated.animate(() => {
                last.shadow.translateX = '100%';
                item.shadow.translateX = '0%';
            });
        }
    }

    render() {
        return (
            <Container>
                {this.state.screens.map((v) => (
                    <ScreenContainer shadow={v.shadow}>
                        <ScreenContainerInner>
                            Hello - {v.key}
                        </ScreenContainerInner>
                        {/* <ScreenShadow css={{ opacity: v.opacity }} /> */}
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