import * as React from 'react';
import Glamorous from 'glamorous';
import { withEditMessage } from '../../../../api/withMessageState';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import { XStoreState } from 'openland-y-store/XStoreState';
import { XRichTextInput, XRichTextInputProps } from 'openland-x/XRichTextInput';
import { XForm } from 'openland-x-forms/XForm2';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { RoomMessageFull } from 'openland-api/Types';
import { XButton } from 'openland-x/XButton';
import { XHorizontal } from 'openland-x-layout/XHorizontal';

const TextInputWrapper = Glamorous.div({
    flexGrow: 1,
    maxHeight: '100%',
    maxWidth: '100%',
    '& > div': {
        maxHeight: '100%',
        height: '100%',
        '& .DraftEditor-root': {
            overflow: 'auto',
            borderRadius: 10,
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
            bottom: 'auto',
        },
    },
});

export type XTextInputProps =
    | {
          kind: 'from_store';
          valueStoreKey: string;
      }
    | {
          kind: 'controlled';
      } & XRichTextInputProps;

class XRichTextInputStored extends React.PureComponent<XTextInputProps & { store: XStoreState }> {
    onChangeHandler = (value: string) => {
        if (this.props.kind === 'controlled') {
            if (this.props.onChange) {
                this.props.onChange(value);
            }
        }
        if (this.props.kind === 'from_store') {
            this.props.store.writeValue(this.props.valueStoreKey, value);
        }
    };

    render() {
        let value;
        const { kind, ...other } = this.props;
        if (this.props.kind === 'from_store') {
            let existing = this.props.store.readValue(this.props.valueStoreKey);
            value = '';
            if (typeof existing === 'string') {
                value = existing;
            } else if (existing) {
                value = existing.toString();
            }
        } else if (this.props.kind === 'controlled') {
            value = this.props.value;
        }

        return (
            <XRichTextInput
                autofocus={true}
                onChange={this.onChangeHandler}
                value={value}
                {...other}
            />
        );
    }
}

class XTextInput extends React.PureComponent<XTextInputProps> {
    render() {
        if (this.props.kind === 'from_store') {
            const { valueStoreKey, ...other } = this.props;
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
        } else if (this.props.kind === 'controlled') {
            return <XRichTextInput {...this.props} />;
        }
        throw Error('kind for XTextInput is not set');
    }
}

const Footer = Glamorous(XHorizontal)({
    display: 'flex',
    paddingTop: 10,
    paddingBottom: 5,
});

const EditMessageInline = withEditMessage(props => {
    let id = (props as any).id;
    let text = (props as any).text;
    return (
        <XForm
            defaultAction={async data => {
                await props.editMessage({
                    variables: { messageId: id, message: data.message },
                });
                (props as any).onClose();
            }}
            defaultData={{
                message: text,
            }}
        >
            <TextInputWrapper>
                <XTextInput valueStoreKey="fields.message" kind="from_store" />
            </TextInputWrapper>

            <Footer separator={5}>
                <XFormSubmit text="Save" style="primary" />
                <XButton
                    text="Cancel"
                    size="default"
                    onClick={() => {
                        (props as any).onClose();
                    }}
                />
            </Footer>
        </XForm>
    );
}) as React.ComponentType<{ id: string; text: string | null; onClose: any }>;

export class EditMessageInlineWrapper extends React.Component<{
    message: RoomMessageFull;
    onClose: any;
}> {
    onCloseHandler = () => {
        this.props.onClose();
    };

    keydownHandler = (e: any) => {
        if (e.code === 'Escape') {
            this.onCloseHandler();
        }
    };

    componentDidMount() {
        document.addEventListener('keydown', this.keydownHandler);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keydownHandler);
    }

    render() {
        return (
            <EditMessageInline
                id={this.props.message.id}
                text={this.props.message.message}
                onClose={this.onCloseHandler}
            />
        );
    }
}
