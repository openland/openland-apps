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
                    {area => (
                        <ZSafeAreaContext.Provider value={{ bottom: area.bottom + (area.hasKeyboard ? 0 : this.state.height), top: area.top, hasKeyboard: area.hasKeyboard }}>
                            {this.props.children}
                        </ZSafeAreaContext.Provider>
                    )}
                </ZSafeAreaContext.Consumer>
            </ZKeyboardAwareBarContext.Provider>
        );
    }
}