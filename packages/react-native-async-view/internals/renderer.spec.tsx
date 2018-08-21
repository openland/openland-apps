import * as React from 'react';
import { AsyncRenderer } from './renderer';

describe('renderer', () => {
    it('should render correctly', () => {

        // Simple renderer
        let renderer = new AsyncRenderer((state: any) => console.log(state), (
            <asyncview asyncViewName="root" flexDirection="row">
                <asyncview key="1" asyncViewName="child" flex2="row2">somerandomtext</asyncview>
            </asyncview>
        ));
        console.log(JSON.stringify(renderer.getState()));

        // Adding new item
        renderer.render((
            <asyncview asyncViewName="root" flexDirection="row">
                <asyncview key="2" asyncViewName="child" flex2="column" />
                <asyncview key="1" asyncViewName="child" flex2="row2" />
            </asyncview>
        ));
        console.log(JSON.stringify(renderer.getState()));

        // Inner updates
        var setStateLocal: any;
        class State extends React.PureComponent<{}, { state: string }> {
            constructor(props: {}) {
                super(props);
                this.state = {
                    state: ''
                };
                setStateLocal = (src: any) => this.setState(src);
            }
            render() {
                return (<asyncview key="1" asyncViewName="state" flex2={this.state.state} />);
            }
        }
        renderer.render((
            <asyncview asyncViewName="root" flexDirection="row">
                <asyncview key="2" asyncViewName="child" flex2="column" />
                <asyncview key="1" asyncViewName="child" flex2="row2" />
                <State />
            </asyncview>
        ));
        setStateLocal({ state: '111' });
        console.log(JSON.stringify(renderer.getState()));
    });
});