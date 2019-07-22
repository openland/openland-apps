import * as React from 'react';
import Glamorous from 'glamorous';
import {
    UserForMention,
    FullMessage_GeneralMessage_spans_MessageSpanUserMention,
    FullMessage_GeneralMessage_spans_MessageSpanAllMention,
} from 'openland-api/Types';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import { XStoreState } from 'openland-y-store/XStoreState';
import { XRichTextInput2, XRichTextInput2Props } from 'openland-x/XRichTextInput2';
import { XForm } from 'openland-x-forms/XForm2';
import { XShortcuts } from 'openland-x/XShortcuts';
import { XFormSubmit, FormSubmit } from 'openland-x-forms/XFormSubmit';
import { XButton } from 'openland-x/XButton';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { useClient } from 'openland-web/utils/useClient';
import {
    UserWithOffset,
    convertSpansToUserWithOffset,
    convertMentionsFromMessage,
    convertToMentionInputNoText,
} from 'openland-engines/legacy/legacymentions';
import { SharedRoomKind } from 'openland-api/Types';
import { XView } from 'react-mental';
import { CommentPropsT } from '../PostMessageButtons';
import { findSpans } from 'openland-y-utils/findSpans';
import { prepareMentionsToSend } from 'openland-engines/legacy/legacymentions';
import { UploadContextProvider } from 'openland-web/modules/FileUploading/UploadContext';
import { FileUploader } from 'openland-web/modules/FileUploading/FileUploader';
import { UploadContext } from 'openland-web/modules/FileUploading/UploadContext';
import {
    uploadFile,
    getUploadCareFile,
} from 'openland-web/fragments/chat/messenger/message/content/comments/useSendMethods';
import { prepareLegacyMentions } from 'openland-engines/legacy/legacymentions';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';

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

const Footer = Glamorous(XHorizontal)({
    display: 'flex',
    paddingTop: 10,
    paddingBottom: 5,
});

type EditMessageInlineT = {
    conversationType?: SharedRoomKind | 'PRIVATE';
    commentProps?: CommentPropsT;
    isComment: boolean;
    minimal: boolean;
    key: string;
    message: DataSourceMessageItem & { depth?: number };
    onClose: (event?: React.MouseEvent) => void;
    variables: {
        roomId: string;
    };
};

const PressEscTipFooter = ({ onClose }: { onClose: (event?: React.MouseEvent) => void }) => {
    return (
        <XView flexDirection="row" fontSize={12} fontWeight={'600'}>
            <XView opacity={0.4}>Press Esc to </XView>
            <XView marginLeft={3} color={'#1790ff'} cursor={'pointer'} onClick={onClose}>
                cancel
            </XView>
        </XView>
    );
};

interface MessageFieldProps {
    text: string;
    // TODO: add typings
    file: any;
    replyMessages: any;

    mentions: (
        | FullMessage_GeneralMessage_spans_MessageSpanUserMention
        | FullMessage_GeneralMessage_spans_MessageSpanAllMention)[];
}

const EditMessageInlineInner = (props: EditMessageInlineT) => {
    const xFormSubmitRef = React.useRef<FormSubmit>(null);

    const { file, fileId, fileSrc, handleSetImage, handleSetFile } = React.useContext(
        UploadContext,
    );

    const onEnter = () => {
        setTimeout(() => {
            if (xFormSubmitRef.current) {
                xFormSubmitRef.current.submit();
            }
        }, 0);
    };

    React.useEffect(() => {
        if (props.message.attachments && props.message.attachments.length === 1) {
            const attachment = props.message.attachments[0];

            if (attachment.__typename === 'MessageAttachmentFile') {
                if (attachment.filePreview) {
                    handleSetImage({ fileId: attachment.fileId });
                } else {
                    handleSetFile({
                        fileId: attachment.fileId,
                        fileName: attachment.fileMetadata.name,
                        fileSize: attachment.fileMetadata.size,
                    });
                }
            }
        }
    }, []);

    const { commentProps, key, variables, message, onClose, isComment, minimal } = props;
    const client = useClient();

    const getMentionsSuggestions = async () => {
        const data = await client.queryRoomMembersForMentionsPaginated(variables);

        return data && data.members.map(({ user }) => user);
    };

    const onFormSubmit = async (newMessage: MessageFieldProps) => {
        const messageText = newMessage.text.trim();
        if (isComment) {
            let res = fileId;
            if (!file && !res && !messageText) {
                return;
            }
            if (file && !res) {
                res = await uploadFile({ file: getUploadCareFile(file) });
            }

            await client.mutateEditComment({
                id: message.id!!,
                message: messageText,
                spans: findSpans(messageText || ''),

                mentions: newMessage.mentions
                    ? newMessage.mentions.map(m => {
                          // @ts-ignore
                          // TODO handle it in safe way
                          return convertToMentionInputNoText(m);
                      })
                    : null,
                fileAttachments: res
                    ? [
                          {
                              fileId: res,
                          },
                      ]
                    : [],
            });

            await client.refetchMessageComments({
                messageId: commentProps!!.messageId,
            });
        } else {
            if (!messageText) {
                return;
            }
            await client.mutateEditMessage({
                messageId: message!!.id!!,
                message: messageText,
                fileAttachments: newMessage.file ? [{ fileId: newMessage.file }] : null,
                replyMessages: newMessage.replyMessages,
                mentions: prepareMentionsToSend(newMessage.mentions || []),
                spans: findSpans(messageText || ''),
            });
        }

        onClose();
    };

    const form = useForm();

    const messageField = useField(
        'input.message',
        {
            text: message.text || '',
            mentions: message.text
                ? prepareLegacyMentions(
                      message.text,
                      convertMentionsFromMessage(message.text, message.spans),
                  )
                : [],

            // where to get them from message?
            file: null,
            replyMessages: [],
        } as MessageFieldProps,
        form,
    );

    const save = () =>
        form.doAction(async () => {
            await onFormSubmit(messageField.value);
            onClose();
        });

    return (
        <React.Fragment key={key}>
            <XShortcuts
                supressOtherShortcuts
                handlerMap={{
                    COMMAND_DOWN: onClose,
                    ESC: onClose,
                    ENTER: onEnter,
                }}
                keymap={{
                    COMMAND_DOWN: {
                        osx: ['command+down'],
                        windows: ['ctrl+down'],
                    },
                    ESC: {
                        osx: ['esc'],
                        windows: ['esc'],
                    },
                    ENTER: {
                        osx: ['enter'],
                        windows: ['enter'],
                    },
                }}
            >
                {(file || fileId) && (
                    <XView marginBottom={12}>
                        <FileUploader />
                    </XView>
                )}
                <>
                    <XView marginLeft={isComment ? -15 : 0}>
                        <TextInputWrapper>
                            <XRichTextInput2
                                // {...other}
                                showAllMentionsSuggestion={
                                    props.conversationType === 'PRIVATE' ? false : true
                                }
                                autofocus={true}
                                // @ts-ignore
                                onChange={messageField.input.onChange}
                                value={messageField.input.value.text || ''}
                                initialMentions={
                                    message.spans
                                        ? convertSpansToUserWithOffset({ spans: message.spans })
                                        : []
                                }
                                // @ts-ignore
                                onSubmit={data => Promise.resolve(save())}
                                getMentionsSuggestions={getMentionsSuggestions}
                            />
                        </TextInputWrapper>
                    </XView>
                    {!minimal && (
                        <Footer separator={5}>
                            <XButton
                                text="Save"
                                style="primary"
                                loading={form.loading}
                                onClick={save}
                            />
                            <XButton text="Cancel" size="default" onClick={onClose} />
                        </Footer>
                    )}
                </>
                {minimal && <PressEscTipFooter onClose={onClose} />}
            </XShortcuts>
        </React.Fragment>
    );
};

export const EditMessageInline = (props: EditMessageInlineT) => {
    return (
        <UploadContextProvider>
            <EditMessageInlineInner {...props} />
        </UploadContextProvider>
    );
};
