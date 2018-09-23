import * as React from 'react';
import Glamorous from 'glamorous';
import { XButton } from 'openland-x/XButton';
import { randomKey } from './utils/randomKey';

const TRANSITION_DURATION = '500ms';

const Container = Glamorous.div({
    position: 'relative',
    display: 'flex',
    backgroundColor: 'rgb(100,100,100)',
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

const ScreenContainer = Glamorous.div({
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transition: 'transform ' + TRANSITION_DURATION + ' cubic-bezier(0.2833, 0.99, 0.31833, 0.99)', /* iOS Spring Interpolation */
    willChange: 'transform'
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

export class XSNaivgationView extends React.PureComponent<{}, { screens: { key: string, offset: string, opacity: number }[] }> {

    private screens: string[] = [];

    constructor(props: {}) {
        super(props);
        this.screens = ['initial'];
        this.state = {
            screens: this.screens.map((v) => ({ key: v, offset: '0%', opacity: 0 }))
        };
    }

    private handlePush = () => {
        let prev = this.screens[this.screens.length - 1];
        let nkey = randomKey();
        this.screens = [...this.screens, nkey];
        this.setState(
            {
                screens: this.screens.map((v) => ({
                    key: v,
                    offset: v === nkey ? '100%' : (v === prev) ? '0%' : '-100%',
                    opacity: 0,
                }))
            },
            () => {
                setTimeout(() => {
                    this.setState(
                        {
                            screens: this.screens.map((v) => ({
                                key: v,
                                offset: v === nkey ? '0%' : (v === prev) ? '-33.3%' : '-100%',
                                opacity: v === nkey ? 0 : (v === prev) ? 0.1 : 0.0,
                            }))
                        });
                });
            });
    }

    render() {
        return (
            <Container>
                {this.state.screens.map((v) => (
                    <ScreenContainer css={{ transform: 'translateX(' + v.offset + ')' }}>
                        <ScreenContainerInner>
                            Hello - {v.key}
                        </ScreenContainerInner>
                        <ScreenShadow css={{ opacity: v.opacity }} />
                    </ScreenContainer>
                ))}
                <Controls>
                    <XButton text="Push" onClick={this.handlePush} />
                    <XButton text="Pop" />
                </Controls>
            </Container>
        );
    }
}