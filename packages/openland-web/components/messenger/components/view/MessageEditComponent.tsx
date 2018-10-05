import * as React from 'react';
import Glamorous from 'glamorous';
import { withEditMessage } from '../../../../api/withEditMessage';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { isServerMessage } from 'openland-engines/messenger/types';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import { XStoreState } from 'openland-y-store/XStoreState';
import { XRichTextInput, XRichTextInputProps } from 'openland-x/XRichTextInput';

const TextInputWrapper = Glamorous.div({
    flexGrow: 1,
    maxHeight: '100%',
    maxWidth: '100%',
    '& > div': {
        maxHeight: '100%',
        height: '100%',
        '& .DraftEditor-root': {
            overflow: 'auto',
            borderRadius: 20,
            backgroundColor: '#fff',
            border: 'solid 1px #e4e6e9',
            minHeight: 40,
            maxHeight: 200,
            paddingTop: 9,
            paddingBottom: 9,
            paddingLeft: 16,
            paddingRight: 40,
        },
        '& .draftJsEmojiPlugin__emojiSelectPopover__1J1s0': {
            bottom: 'auto'
        }
    }
});

export interface XTextInputProps extends XRichTextInputProps {
    valueStoreKey?: string;
}

class XRichTextInputStored extends React.PureComponent<XTextInputProps & { store: XStoreState }> {

    onChangeHandler = (value: string) => {
        if (this.props.onChange) {
            this.props.onChange(value);
        }
        if (this.props.valueStoreKey) {
            this.props.store.writeValue(this.props.valueStoreKey, value);
        }
    }

    render() {
        let { valueStoreKey, store, ...other } = this.props;
        let value = this.props.value;
        if (valueStoreKey) {
            let existing = store.readValue(valueStoreKey);
            value = '';
            if (typeof existing === 'string') {
                value = existing;
            } else if (existing) {
                value = existing.toString();
            }
        }

        return <XRichTextInput autofocus={true} onChange={this.onChangeHandler} value={value} {...other} />;
    }
}

class XTextInput extends React.PureComponent<XTextInputProps> {
    render() {
        let { valueStoreKey, ...other } = this.props;
        if (valueStoreKey) {
            let valueStoreKeyCached = valueStoreKey;
            return (
                <XStoreContext.Consumer>
                    {store => {
                        if (!store) {
                            throw Error('No store!');
                        }
                        return (
                            <XRichTextInputStored
                                {...other}
                                valueStoreKey={valueStoreKeyCached}
                                store={store}
                            />
                        );
                    }}
                </XStoreContext.Consumer>
            );
        }
        return (<XRichTextInput {...other} />);
    }
}

export const EditMessageComponent = withEditMessage((props) => {
    let id = props.router.query.editMessage;
    let conversation: ConversationEngine = (props as any).conversation;
    let message = conversation.getState().messages.filter(m => isServerMessage(m) && m.id === id)[0];
    if (!message) {
        return null;
    }
    return (
        <XModalForm
            title="Edit message"
            width={800}
            targetQuery="editMessage"
            defaultAction={(data) => {
                props.editMessage({ variables: { messageId: id, message: data.message } });
            }}
            defaultData={{
                message: message.message
            }}
            submitProps={{ succesText: 'done!' }}
        >
            <TextInputWrapper>
                <XTextInput valueStoreKey="fields.message" />
            </TextInputWrapper>
        </XModalForm>
    );
}) as React.ComponentType<{ conversation: ConversationEngine }>;