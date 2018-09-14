import * as React from 'react';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { TypingEngine } from 'openland-engines/messenger/Typings';

interface TypingContextProps {
    typing?: string;
    users?: { userName: string, userPic: string | null }[];
}

export const TypingContext = React.createContext<TypingContextProps>({});

interface TypingsWrapperProps {
    engine: TypingEngine;
}

class TypingsWrapper extends React.PureComponent<TypingsWrapperProps, { typing?: string, users?: { userName: string, userPic: string | null }[] }> {
    private destructor?: () => void;
    constructor(props: TypingsWrapperProps) {
        super(props);
        this.state = {};
    }

    onTyping = (typing?: string, users?: { userName: string, userPic: string | null }[]) => {
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