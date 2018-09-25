import * as React from 'react';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { OnlineWatcher } from 'openland-engines/messenger/Online';

export const OnlineContext = React.createContext<{ onlines?: Map<string, boolean> }>({});

interface OnlineWrapperProps {
    engine: OnlineWatcher;
}

interface OnlinesWrapperState {
    onlines?: Map<string, boolean>;
}

class OnlinesWrapper extends React.Component<OnlineWrapperProps, OnlinesWrapperState> {
    private destructor?: () => void;
    constructor(props: OnlineWrapperProps) {
        super(props);
        this.state = {};
    }

    getOnlines = (onlines: Map<string, boolean>) => {
        this.setState({
            onlines: onlines,
        });
    }

    componentDidMount() {
        this.destructor = this.props.engine.onChange(this.getOnlines);
    }

    componentWillUnmount() {
        if (this.destructor) {
            this.destructor();
        }
    }

    render() {
        return (
            <OnlineContext.Provider
                value={{
                    onlines: this.state.onlines
                }}
            >
                {this.props.children}
            </OnlineContext.Provider>
        );
    }
}

export class OnlinesComponent extends React.PureComponent {

    render() {
        return (
            <>
                {canUseDOM && (
                    <MessengerContext.Consumer>
                        {
                            messenger => {
                                return (
                                    <OnlinesWrapper engine={messenger.getOnlines()}>
                                        {this.props.children}
                                    </OnlinesWrapper>
                                );
                            }
                        }
                    </MessengerContext.Consumer>
                )}
                {!canUseDOM && this.props.children}
            </>
        );
    }
}