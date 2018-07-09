import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { ComposeSelect } from '../../api/ChatComposeSelect';
import { XHeader } from 'openland-x/XHeader';
import { XContent } from 'openland-x-layout/XContent';
import { OnChangeHandler, Option, OptionValues } from 'react-select';
import { XInput } from 'openland-x/XInput';
import { XButton } from 'openland-x/XButton';
import { MessengerContext, MessengerEngine } from './model/MessengerEngine';
import { Router } from '../../routes';
import { ChatCreateGroupMutation } from 'openland-api/ChatCreateGroupMutation';

const Root = Glamorous(XVertical)({
    maxHeight: '100%',
    width: '100%',
    maxWidth: '100%'
});

class ComposeComponentRender extends React.Component<{ messenger: MessengerEngine }, { values: Option<OptionValues>[], message: string }> {

    state = {
        values: [] as Option<OptionValues>[],
        message: ''
    };

    handleChange: OnChangeHandler = (vals) => {
        if (vals === null) {
            this.setState({ values: [] });
        } else if (Array.isArray(vals)) {
            this.setState({ values: [...vals] });
        } else {
            this.setState({ values: [vals] });
        }
    }

    handleMessageChange = (msg: string) => {
        this.setState({ message: msg });
    }

    handleSendMessage = async () => {
        let msg = this.state.message;
        if (this.state.values.length === 1) {
            let id = await this.props.messenger.global.resolvePrivateConversation(this.state.values[0].value!! as string);
            await this.props.messenger.sender.sendMessageAsync(id.id, msg);
            Router.replaceRoute('/mail/' + id.flexibleId);
        } else if (this.state.values.length > 1) {
            let res = await this.props.messenger.client.mutate({
                mutation: ChatCreateGroupMutation.document,
                variables: {
                    message: this.state.message,
                    members: this.state.values.map((v) => v.value)
                }
            });
            Router.replaceRoute('/mail/' + (res.data as any).group.id);
        }
    }

    render() {
        return (
            <Root flexGrow={1} separator={'none'}>
                <XHeader text={'Compose new message'} separated={true} />
                <XContent>
                    <ComposeSelect
                        placeholder="Start typing name or multiple names..."
                        onChange={this.handleChange}
                        value={this.state.values}
                        multi={true}
                    />
                    <XInput value={this.state.message} onChange={this.handleMessageChange} />
                    <XButton text="Send" onClick={this.handleSendMessage} />
                </XContent>
            </Root>
        );
    }
}

export const ComposeComponent = () => {
    return (
        <MessengerContext.Consumer>
            {messenger => <ComposeComponentRender messenger={messenger!!} />}
        </MessengerContext.Consumer>
    );
};