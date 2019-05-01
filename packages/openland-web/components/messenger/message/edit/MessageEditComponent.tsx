import * as React from 'react';
import Glamorous from 'glamorous';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import { XStoreState } from 'openland-y-store/XStoreState';
import { XRichTextInput2, XRichTextInput2Props } from 'openland-x/XRichTextInput2';
import { XForm } from 'openland-x-forms/XForm2';
import { XShortcuts } from 'openland-x/XShortcuts';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XButton } from 'openland-x/XButton';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { convertChannelMembersDataToMentionsData } from 'openland-web/fragments/MessageComposeComponent/hooks/useMentions';
import { useClient } from 'openland-web/utils/useClient';
import { UserWithOffset } from 'openland-y-utils/mentionsConversion';

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
    XTextInputProps & {
        store: XStoreState;
        initialMentions?: UserWithOffset[];
        getMentionsSuggestions: () => Promise<UserWithOffset[]>;
    }
> {
    onChangeHandler = (value: any) => {
        if (this.props.kind === 'from_store') {
            const previosValue = this.props.store.readValue(this.props.valueStoreKey);
            this.props.store.writeValue(this.props.valueStoreKey, {
                ...previosValue,
                ...value,
            });
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
                {...other}
                autofocus={true}
                onChange={data => this.onChangeHandler(data)}
                value={value.text}
                initialMentions={this.props.initialMentions}
                getMentionsSuggestions={this.props.getMentionsSuggestions}
            />
        );
    }
}

class XTextInput extends React.PureComponent<
    XTextInputProps & {
        initialMentions?: UserWithOffset[];
        getMentionsSuggestions: () => Promise<UserWithOffset[]>;
    }
> {
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
    initialMentions: UserWithOffset[];
    getMentionsSuggestions: () => Promise<UserWithOffset[]>;
};

const EditMessageInline = (props: EditMessageInlineT) => {
    const client = useClient();

    return (
        <XForm
            defaultAction={async data => {
                await client.mutateRoomEditMessage({
                    messageId: props.id,
                    message: data.message.text,
                    file: data.message.file,
                    replyMessages: data.message.replyMessages,
                    mentions: data.message.mentions.map((mention: any) => mention.user.id),
                });

                props.onClose();
            }}
            defaultData={{
                message: props.message,
            }}
        >
            <TextInputWrapper>
                <XTextInput
                    valueStoreKey="fields.message"
                    kind="from_store"
                    initialMentions={props.initialMentions}
                    getMentionsSuggestions={props.getMentionsSuggestions}
                />
            </TextInputWrapper>
            <Footer separator={5}>
                <XFormSubmit text="Save" style="primary" useOnlyEnterKey={true} />
                <XButton
                    text="Cancel"
                    size="default"
                    onClick={() => {
                        props.onClose();
                    }}
                />
            </Footer>
        </XForm>
    );
};

type EditMessageInlineWrapperInnerT = {
    initialMentions: UserWithOffset[];
    getMentionsSuggestions: () => Promise<UserWithOffset[]>;
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
                    initialMentions={this.props.initialMentions}
                    getMentionsSuggestions={this.props.getMentionsSuggestions}
                    onClose={this.onCloseHandler}
                />
            </XShortcuts>
        );
    }
}

type EditMessageInlineWrapperT = {
    message: DataSourceMessageItem;
    onClose: any;
    key?: string;
};

export const EditMessageInlineWrapper = (
    props: EditMessageInlineWrapperT & {
        variables: {
            roomId: string;
        };
    },
) => {
    const client = useClient();

    const getMentionsSuggestions = async () => {
        const data = await client.queryRoomMembers(props.variables);
        return data && data.members ? convertChannelMembersDataToMentionsData(data.members) : [];
    };

    return (
        <EditMessageInlineWrapperInner
            initialMentions={[]}
            getMentionsSuggestions={getMentionsSuggestions}
            message={props.message}
            onClose={props.onClose}
            key={props.key}
        />
    );
};
