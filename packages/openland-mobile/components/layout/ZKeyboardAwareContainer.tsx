import * as React from 'react';
import { ZSafeAreaContext } from './ZSafeAreaContext';

export const ZKeyboardAwareBarContext = React.createContext<{ updateSize: (height: number) => void } | undefined>(undefined);

export class ZKeyboardAwareContainer extends React.PureComponent<{}, { height: number }> {
    constructor(props: {}) {
        super(props);
        this.state = { height: 0 };
    }

    updateSize = (height: number) => {
        this.setState({ height });
    }

    render() {
        return (
            <ZKeyboardAwareBarContext.Provider value={this}>
                <ZSafeAreaContext.Consumer>
                    {area => {

                        // let bottom = area.bottom + (area.keyboardHeight >= 34 ? 0 : this.state.height);

                        let bottom = area.bottom + this.state.height;

                        console.log('[KEYBOARD] JS Bottom ' + bottom);
                        console.log('[KEYBOARD] JS Bottom height ' + area.keyboardHeight);

                        return (
                            <ZSafeAreaContext.Provider value={{ bottom: bottom, top: area.top, keyboardHeight: area.keyboardHeight }}>
                                {this.props.children}
                            </ZSafeAreaContext.Provider>
                        );
                    }}
                </ZSafeAreaContext.Consumer>
            </ZKeyboardAwareBarContext.Provider>
        );
    }
}