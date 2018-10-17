import * as React from 'react';
import Glamorous from 'glamorous';
import { withReplyMessage } from '../../../../../api/withReplyMessage';
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
            maxHeight: 125,
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

    private input = React.createRef<XRichTextInput>();

    componentDidMount() {
        if (this.input.current) {
            this.input.current.focus();
        }
    }

    onChangeHandler = (value: string) => {
        if (this.props.onChange) {
            this.props.onChange(value);
        }
        if (this.props.valueStoreKey) {
            this.props.store.writeValue(this.props.valueStoreKey, value);
        }
    }

    render() {
        return <XRichTextInput onChange={this.onChangeHandler} {...this.props} ref={this.input} placeholder="Write a reply..." />;
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

export const ReplyMessageComponent = withReplyMessage((props) => {
    let { router } = props;
    let conversationId = router.routeQuery.conversationId;
    let messageId = router.query.replyMessage;
    return (
        <XModalForm
            title="Reply message"
            targetQuery="replyMessage"
            defaultAction={(data) => {
                props.replyMessage({
                    variables: {
                        conversationId: conversationId,
                        message: data.message,
                        replyMessages: messageId
                    }
                });
            }}
            submitProps={{ succesText: 'done!' }}
        >
            <TextInputWrapper>
                <XTextInput valueStoreKey="fields.message" />
            </TextInputWrapper>
        </XModalForm>
    );
});