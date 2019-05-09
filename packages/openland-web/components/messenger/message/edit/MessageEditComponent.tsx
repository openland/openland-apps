import * as React from 'react';
import Glamorous from 'glamorous';
import { UserForMention } from 'openland-api/Types';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import { XStoreState } from 'openland-y-store/XStoreState';
import { XRichTextInput2, XRichTextInput2Props } from 'openland-x/XRichTextInput2';
import { XForm } from 'openland-x-forms/XForm2';
import { XShortcuts } from 'openland-x/XShortcuts';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XButton } from 'openland-x/XButton';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { useClient } from 'openland-web/utils/useClient';
import { UserWithOffset, convertSpansToUserWithOffset } from 'openland-y-utils/mentionsConversion';
import { XView } from 'react-mental';
import { CommentPropsT } from '../PostMessageButtons';

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
        onSubmit: () => Promise<void>;
        store: XStoreState;
        minimal: boolean;
        initialMentions?: UserWithOffset[];
        getMentionsSuggestions: () => Promise<UserForMention[]>;
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
                hideAttachments
                value={value.text}
                initialMentions={this.props.initialMentions}
                getMentionsSuggestions={this.props.getMentionsSuggestions}
            />
        );
    }
}

class XTextInput extends React.PureComponent<
    XTextInputProps & {
        onSubmit: (data: any) => Promise<void>;
        minimal: boolean;
        round: boolean;
        initialMentions?: UserWithOffset[];
        getMentionsSuggestions: () => Promise<UserForMention[]>;
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
                                onSubmit={async () => {
                                    await this.props.onSubmit({
                                        [valueStoreKey.replace('fields.', '')]: store.readValue(
                                            valueStoreKey,
                                        ),
                                    });
                                }}
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
    commentProps?: CommentPropsT;
    isComment: boolean;
    minimal: boolean;
    key: string;
    message: DataSourceMessageItem & { depth?: number };
    onClose: (event?: React.MouseEvent) => void;
};

const PressEscTipFooter = ({ onClose }: { onClose: (event?: React.MouseEvent) => void }) => {
    return (
        <XView flexDirection="row" fontSize={12} fontWeight={'600'}>
            <XView opacity={0.4}>Press Esc to </XView>
            <XView marginLeft={2} color={'#1790ff'} cursor={'pointer'} onClick={onClose}>
                cancel
            </XView>
        </XView>
    );
};

export const EditMessageInline = ({
    commentProps,
    key,
    variables,
    message,
    onClose,
    isComment,
    minimal,
}: EditMessageInlineT & {
    variables: {
        roomId: string;
    };
}) => {
    const client = useClient();

    const getMentionsSuggestions = async () => {
        const data = await client.queryRoomMembersForMentionsPaginated(variables);

        return data && data.members.map(({ user }) => user);
    };

    const onFormSubmit = async (data: any) => {
        if (isComment) {
            await client.mutateEditComment({
                id: message.id!!,
                message: data.message.text,
            });

            await client.refetchMessageComments({
                messageId: commentProps!!.messageId,
            });
        } else {
            await client.mutateRoomEditMessage({
                messageId: message!!.id!!,
                message: data.message.text,
                file: data.message.file,
                replyMessages: data.message.replyMessages,
                mentions: data.message.mentions.map((mention: any) => mention.user.id),
            });
        }

        onClose();
    };

    return (
        <React.Fragment key={key}>
            <XShortcuts
                supressOtherShortcuts
                handlerMap={{
                    ESC: onClose,
                }}
                keymap={{
                    ESC: 'esc',
                }}
            >
                <XForm
                    defaultAction={onFormSubmit}
                    defaultData={{
                        message: {
                            text: message.text,
                        },
                    }}
                >
                    <XView marginLeft={-15}>
                        <TextInputWrapper>
                            <XTextInput
                                onSubmit={onFormSubmit}
                                minimal={minimal}
                                round={minimal}
                                valueStoreKey="fields.message"
                                kind="from_store"
                                initialMentions={
                                    message.spans
                                        ? convertSpansToUserWithOffset({ spans: message.spans })
                                        : []
                                }
                                getMentionsSuggestions={getMentionsSuggestions}
                            />
                        </TextInputWrapper>
                    </XView>
                    {!minimal && (
                        <Footer separator={5}>
                            <XFormSubmit text="Save" style="primary" useOnlyEnterKey={true} />
                            <XButton text="Cancel" size="default" onClick={onClose} />
                        </Footer>
                    )}
                </XForm>
                {minimal && <PressEscTipFooter onClose={onClose} />}
            </XShortcuts>
        </React.Fragment>
    );
};
