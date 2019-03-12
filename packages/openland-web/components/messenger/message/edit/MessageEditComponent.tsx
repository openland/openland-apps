import * as React from 'react';
import Glamorous from 'glamorous';
import { withEditMessage } from '../../../../api/withMessageState';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import { XStoreState } from 'openland-y-store/XStoreState';
import { XRichTextInput2, XRichTextInput2Props } from 'openland-x/XRichTextInput2';
import { XForm } from 'openland-x-forms/XForm2';
import { XShortcuts } from 'openland-x/XShortcuts';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XButton } from 'openland-x/XButton';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { MentionDataT } from 'openland-x/XRichTextInput2/components/MentionSuggestionsEntry';
import { convertChannelMembersDataToMentionsData } from 'openland-web/fragments/MessageComposeComponent/useMentions';
import { withChannelMembers } from 'openland-web/api/withChannelMembers';

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
      } & XRichTextInput2Props;

class XRichTextInputStored extends React.PureComponent<
    XTextInputProps & { store: XStoreState; mentionsData?: MentionDataT[] }
> {
    onChangeHandler = (value: any) => {
        if (this.props.kind === 'from_store') {
            this.props.store.writeValue(this.props.valueStoreKey, value);
        }
    };

    render() {
        let value;
        const { kind, ...other } = this.props;
        if (this.props.kind === 'from_store') {
            let existing = this.props.store.readValue(this.props.valueStoreKey);
            value = existing;
        } else if (this.props.kind === 'controlled') {
            value = this.props.value;
        }

        return (
            <XRichTextInput2
                autofocus={true}
                onChange={data => this.onChangeHandler(data)}
                value={value.text}
                mentionsData={this.props.mentionsData}
                {...other}
            />
        );
    }
}

class XTextInput extends React.PureComponent<XTextInputProps & { mentionsData?: MentionDataT[] }> {
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
        }
        throw Error('kind for XTextInput is not set');
    }
}

const Footer = Glamorous(XHorizontal)({
    display: 'flex',
    paddingTop: 10,
    paddingBottom: 5,
});

type EditMessageInlineT = {
    id: string;
    message: any;
    onClose: any;
    mentionsData: MentionDataT[];
};

const EditMessageInline = withEditMessage(props => {
    const typedProps = props as typeof props & EditMessageInlineT;
    let id = typedProps.id;

    return (
        <XForm
            defaultAction={async data => {
                await props.editMessage({
                    variables: {
                        messageId: id,
                        message: data.message.text,
                        file: data.message.file,
                        replyMessages: data.message.replyMessages,
                        mentions: data.message.mentions.map((mention: any) => mention.id),
                    },
                });
                typedProps.onClose();
            }}
            defaultData={{
                message: typedProps.message,
            }}
        >
            <TextInputWrapper>
                <XTextInput
                    valueStoreKey="fields.message"
                    kind="from_store"
                    mentionsData={typedProps.mentionsData}
                />
            </TextInputWrapper>

            <Footer separator={5}>
                <XFormSubmit text="Save" style="primary" />
                <XButton
                    text="Cancel"
                    size="default"
                    onClick={() => {
                        typedProps.onClose();
                    }}
                />
            </Footer>
        </XForm>
    );
}) as React.ComponentType<EditMessageInlineT>;

type EditMessageInlineWrapperInnerT = {
    mentionsData: MentionDataT[];
} & EditMessageInlineWrapperT;
class EditMessageInlineWrapperInner extends React.Component<EditMessageInlineWrapperInnerT> {
    onCloseHandler = () => {
        this.props.onClose();
    };

    render() {
        return (
            <XShortcuts
                supressOtherShortcuts
                handlerMap={{
                    ESC: this.onCloseHandler,
                }}
                keymap={{
                    ESC: 'esc',
                }}
            >
                <EditMessageInline
                    id={this.props.message.id!}
                    message={this.props.message}
                    mentionsData={this.props.mentionsData}
                    onClose={this.onCloseHandler}
                />
            </XShortcuts>
        );
    }
}

type EditMessageInlineWrapperT = {
    message: DataSourceMessageItem;
    onClose: any;
};

export const EditMessageInlineWrapper = withChannelMembers(props => {
    const typedProps = props as typeof props & EditMessageInlineWrapperT;

    const mentionsData =
        typedProps.data && typedProps.data.members
            ? convertChannelMembersDataToMentionsData(typedProps.data.members)
            : [];

    return (
        <EditMessageInlineWrapperInner
            mentionsData={mentionsData}
            message={typedProps.message}
            onClose={typedProps.onClose}
        />
    );
}) as React.ComponentType<
    EditMessageInlineWrapperT & {
        variables: {
            roomId: string;
        };
    }
>;
