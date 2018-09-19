import * as React from 'react';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { TypingEngine } from 'openland-engines/messenger/Typings';

interface TypingsUser {
    userName: string;
    userPic: string | null;
    userId: string;
}

interface TypingContextProps {
    typing?: string;
    users?: TypingsUser[];
}

export const TypingContext = React.createContext<TypingContextProps>({});

interface TypingsWrapperProps {
    engine: TypingEngine;
}

class TypingsWrapper extends React.PureComponent<TypingsWrapperProps, { typing?: string, users?: TypingsUser[] }> {
    private destructor?: () => void;
    constructor(props: TypingsWrapperProps) {
        super(props);
        this.state = {};
    }

    onTyping = (typing?: string, users?: TypingsUser[]) => {
        this.setState({
            typing: typing,
            users: users
        });
    }

    componentDidMount() {
        this.destructor = this.props.engine.subcribe(this.onTyping);
    }

    componentWillUnmount() {
        if (this.destructor) {
            this.destructor();
        }
    }

    render() {
        return (
            <TypingContext.Provider
                value={{
                    typing: this.state.typing,
                    users: this.state.users
                }}
            >
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
                            messenger => {
                                return (
                                    <TypingsWrapper engine={messenger.getTypings(this.props.conversatonId)}>
                                        {this.props.children}
                                    </TypingsWrapper>
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