import * as React from 'react';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { TypingEngine } from 'openland-engines/messenger/Typings';

export const TypingContext = React.createContext<{ typing?: string }>({});

class TypingsWrapper extends React.PureComponent<{ engine: TypingEngine }, { typing?: string }> {
    private destructor: () => void;
    constructor(props: { engine: TypingEngine }) {
        super(props);
        this.destructor = props.engine.subcribe(this.onTyping);
        this.state = {};
    }

    onTyping = (typing?: string) => {
        this.setState({ typing: typing });
    }

    componentWillUnmount() {
        if (this.destructor) {
            this.destructor();
        }
    }

    render() {
        return (
            <TypingContext.Provider value={{ typing: this.state.typing }}>
                {this.props.children}
            </TypingContext.Provider>
        );
    }
}

export class TypignsComponent extends React.PureComponent<{ conversatonId: string }> {
    render() {
        return (
            <>
                {canUseDOM && (
                    <MessengerContext.Consumer>
                        {
                            messenger => (
                                <TypingsWrapper engine={messenger.getTypings(this.props.conversatonId)}>
                                    {this.props.children}
                                </TypingsWrapper>
                            )
                        }
                    </MessengerContext.Consumer>
                )}
                {!canUseDOM && this.props.children}

            </>
        );
    }
}