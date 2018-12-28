import * as React from 'react';
import { XView } from 'react-mental';
import Glamorous from 'glamorous';
import UploadCare from 'uploadcare-widget';
import { getConfig } from '../config';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XTextArea } from 'openland-x/XTextArea';
import { XInput } from 'openland-x/XInput';
import { XButton } from 'openland-x/XButton';
import { XMutation } from 'openland-x/XMutation';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { XLink } from 'openland-x/XLink';
import { XCloudImage } from 'openland-x/XCloudImage';
import { MessageUploadComponent } from '../components/messenger/components/view/content/MessageUploadComponent';
import { niceBytes } from '../components/messenger/components/view/content/MessageFileComponent';
import { withSendPostMessage, withEditPostMessage } from '../api/withPostMessage';
import { PostMessageType } from 'openland-api/Types';
import { EditPostProps } from './MessengerRootComponent';
import { DropZone } from './DropZone';
import CloseIcon from 'openland-icons/ic-close-post.svg';
import RemoveIcon from 'openland-icons/ic-close.svg';
import PhotoIcon from 'openland-icons/ic-photo-2.svg';
import FileIcon from 'openland-icons/ic-file-3.svg';

const postTexts = {
    BLANK: {
        header: 'Quick post',
        titlePlaceholder: 'Title',
        text: '',
        textPlaceholder:
            '✍🏼 Write your post here. You can ask for help, share opportunities, and offer services.',
    },
    JOB_OPPORTUNITY: {
        header: 'Job opportunity',
        titlePlaceholder: 'Job Opportunity Title',
        text: `💰 Salary range $XX-XXXk

🚀 About company
        • Short description
        • Company size
        • Funding, progress to date...
        • etc

🔨 Responsibilities
        • A
        • B 
        • C

🎓 Qualifications
        • A
        • B 
        • C

🧁 Benefits
        • A
        • B 
        • C`,
        textPlaceholder:
            '🌱Write your post here. \n You can share an opportunity, ask for help, or describe an offer.',
    },
    OFFICE_HOURS: {
        header: 'Office hours',
        titlePlaceholder: 'Office hours with XX',
        text: `👋 About you / your expertise areas 
🙄 Who can apply 
💬 Preferred way to connect
`,
        textPlaceholder:
            '🌱Write your post here. \n You can share an opportunity, ask for help, or describe an offer.',
    },
    REQUEST_FOR_STARTUPS: {
        header: 'Request for startups',
        titlePlaceholder: 'XX — Request for startups',
        text: `💰 Typical check size
⏳ Investment process and average decision time
✅ Preferred moment to invest / criteria
🌎 Markets / geographies / keywords
🔗 Website / links
📞 Preferred way to be contacted (intros, directly, etc.)
`,
        textPlaceholder:
            '🌱Write your post here. \n You can share an opportunity, ask for help, or describe an offer.',
    },
};

const Header = Glamorous(XHorizontal)({
    height: 56,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)'
});

const PostTitle = Glamorous.div<{ invalid: boolean }>(props => ({
    zIndex: 1,
    '& *': {
        color: props.invalid ? '#e26363 !important' : undefined,
    },
    '& *, & input, & *:focus-within, & *:focus': {
        fontSize: 22,
        fontWeight: 600,
        border: 'none !important',
        boxShadow: 'none !important',
        lineHeight: 'normal',
        paddingLeft: '0 !important',
        paddingRight: '0 !important',
        minHeight: 30,
        display: 'block',
    },
}));

const PostText = Glamorous.div<{ invalid: boolean }>(props => ({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    position: 'relative',
    alignItems: 'stretch',
    '& textarea': {
        minHeight: '100%',
        height: '100%',
        flexShrink: 0,
        fontSize: 14,
        border: 'none',
        lineHeight: 1.57,
        resize: 'none',
        padding: 0,
        flexGrow: 1,
        display: 'block',
        borderRadius: 0,
        '&:focus, &:active': {
            boxShadow: 'none',
            border: 'none',
        },
    },
    '& textarea::placeholder': {
        color: props.invalid ? 'rgb(226, 99, 99)' : undefined,
    },
}));

const FilesWrapper = Glamorous(XVertical)({
    paddingTop: 10,
    borderTop: '1px solid #ececec',
});

const FileItem = Glamorous(XHorizontal)({
    opacity: 0.5,
    fontSize: 13,
    lineHeight: 1.54,
    fontWeight: 500,
    color: '#000',
    '& .remove': {
        marginTop: 1,
        cursor: 'pointer',
        '& > svg > g > path:last-child': {
            fill: '#C7C7C7',
        },
        '&:hover > svg > g > path:last-child': {
            fill: '#4a4a4a',
        },
    },
    '& span': {
        opacity: 0.6,
    },
});

const FileImage = Glamorous.div({
    width: 11,
    height: 14,
    flexShrink: 0,
    backgroundImage: "url('/static/X/file.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
});

const FooterWrapper = Glamorous(XHorizontal)({
    borderTop: '1px solid #ececec',
    backgroundColor: '#f9f9f9',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 14,
    paddingBottom: 14,
});

const AttachmentButton = Glamorous(XLink)<{ disable?: boolean }>(props => ({
    paddingLeft: 12,
    paddingRight: 12,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: 0,
    lineHeight: '20px',
    color: 'rgba(0, 0, 0, 0.4)',
    opacity: props.disable ? 0.7 : undefined,
    cursor: props.disable ? 'default !important' : 'pointer',
    '&:hover': {
        textDecoration: 'none',
        color: props.disable ? '#a3acb8' : 'rgba(0, 0, 0, 0.5)',
        backgroundColor: props.disable ? 'transparent' : 'rgba(0, 0, 0, 0.03)',
        '& > svg > *': {
            fill: props.disable ? '#c1c7cf' : 'rgba(0, 0, 0, 0.3)',
        },
    },
    '&.document-button > svg': {
        marginTop: 1,
        marginBottom: -1,
    },
    '& > svg': {
        flexShrink: 0,
        marginRight: 10,
        '& > *': {
            fill: props.disable ? '#c1c7cf' : 'rgba(0, 0, 0, 0.2)',
        },
    },
}));

const CoverWrapper = Glamorous.div({
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
    alignSelf: 'flex-start',
    '& > img': {
        display: 'block',
    },
});

const CoverDelButton = Glamorous.div({
    position: 'absolute',
    right: -2,
    top: -2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    width: 20,
    height: 20,
    paddingTop: 2,
    paddingRight: 2,
    borderRadius: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    cursor: 'pointer',
    '& > svg > g > path:last-child': {
        fill: '#fff',
    },
});

interface SendPostButtonProps {
    conversationId: string;
    children: any;
    title: string;
    text: string;
    files: Set<File> | null;
    postType: PostMessageType | null | string;
    handleHideChat: (hide: boolean, postType: PostMessageType | null) => void;
    checkTitleValue: () => void;
    checkTextValue: () => void;
    checkValue: () => void;
}

const SendPostButton = withSendPostMessage(props => {
    const { files, title, text } = props as any;

    let attachments: string[] | null = null;

    if (files) {
        attachments = [...files].map(i => i.uuid);
    }

    const checkTitleSend = title.trim().length > 0;
    const checkTextSend = text.trim().length > 0;

    return (
        <XMutation
            action={async () => {
                if (checkTitleSend && checkTextSend) {
                    await props.sendPost({
                        variables: {
                            conversationId: (props as any).conversationId,
                            title: title,
                            text: text,
                            attachments: attachments,
                            postType: (props as any).postType
                                ? (props as any).postType
                                : PostMessageType.BLANK,
                        },
                    });
                } else if (!checkTitleSend && !checkTextSend) {
                    (props as any).checkValue();
                } else if (!checkTextSend) {
                    (props as any).checkTextValue();
                } else {
                    (props as any).checkTitleValue();
                }
            }}
            onSuccess={() => {
                if (checkTitleSend && checkTextSend) {
                    (props as any).handleHideChat(false, null);
                } else if (!checkTitleSend && !checkTextSend) {
                    (props as any).checkValue();
                } else if (!checkTextSend) {
                    (props as any).checkTextValue();
                } else {
                    (props as any).checkTitleValue();
                }
            }}
        >
            {props.children}
        </XMutation>
    );
}) as React.ComponentType<SendPostButtonProps>;

interface EditPostButtonProps {
    messageId: string;
    children: any;
    title: string;
    text: string;
    files: Set<File> | null;
    postType: PostMessageType | null | string;
    handleHideChat: (hide: boolean, postType: PostMessageType | null) => void;
    checkTitleValue: () => void;
    checkTextValue: () => void;
    checkValue: () => void;
}

const EditPostButton = withEditPostMessage(props => {
    const { files, title, text } = props as any;

    let attachments: string[] | null = null;

    if (files) {
        attachments = [...files].map(i => i.uuid);
    }

    const checkTitleSend = title.trim().length > 0;
    const checkTextSend = text.trim().length > 0;

    return (
        <XMutation
            action={async () => {
                if (checkTitleSend && checkTextSend) {
                    await props.editPost({
                        variables: {
                            messageId: (props as any).messageId,
                            title: title,
                            text: text,
                            attachments: attachments,
                            postType: (props as any).postType
                                ? (props as any).postType
                                : PostMessageType.BLANK,
                        },
                    });
                } else if (!checkTitleSend && !checkTextSend) {
                    (props as any).checkValue();
                } else if (!checkTextSend) {
                    (props as any).checkTextValue();
                } else {
                    (props as any).checkTitleValue();
                }
            }}
            onSuccess={() => {
                if (checkTitleSend && checkTextSend) {
                    (props as any).handleHideChat(false, null);
                } else if (!checkTitleSend && !checkTextSend) {
                    (props as any).checkValue();
                } else if (!checkTextSend) {
                    (props as any).checkTextValue();
                } else {
                    (props as any).checkTitleValue();
                }
            }}
        >
            {props.children}
        </XMutation>
    );
}) as React.ComponentType<EditPostButtonProps>;

interface CreatePostComponentProps {
    handleHideChat: (hide: boolean, postType: PostMessageType | null) => void;
    conversationId: string;
    postType: PostMessageType | null;
    editData: EditPostProps | null;
    objectName: string;
    objectId?: string;
    cloudImageUuid?: string;
}

interface File {
    uuid: string;
    name: string;
    size: string;
    isImage: boolean;
}

interface CreatePostComponentState {
    title: string;
    text: string;
    uploadProgress: number | null;
    files: Set<File> | null;
    cover: File | null;
    invalidTitle: boolean;
    invalidText: boolean;
}

export class CreatePostComponent extends React.Component<
    CreatePostComponentProps,
    CreatePostComponentState
    > {
    constructor(props: CreatePostComponentProps) {
        super(props);

        let postType = props.postType || 'BLANK';
        const textValue = postTexts[postType].text;

        let title = '';
        let text = textValue;

        let { editData } = props;
        if (editData) {
            title = editData.title;
            text = editData.text;
        }

        this.state = {
            title: title,
            text: text,
            uploadProgress: null,
            files: null,
            cover: null,
            invalidTitle: false,
            invalidText: false,
        };
    }

    invalidTitleHandler = () => {
        this.setState({
            invalidTitle: true,
        });
    };

    invalidTextHandler = () => {
        this.setState({
            invalidText: true,
        });
    };

    invalidValue = () => {
        this.setState({
            invalidTitle: true,
            invalidText: true,
        });
    };

    private titleChange = (src: string) => {
        this.setState({
            title: src,
            invalidTitle: false,
        });
    };

    private textChange = (src: string) => {
        this.setState({
            text: src,
            invalidText: false,
        });
    };

    private propsFileSaver = (files: Set<File>) => {
        let cover: File | null = null;
        let coversFinder = [...files].filter(i => i.isImage);

        if (coversFinder[0]) {
            cover = coversFinder[0];
        }

        let moreFiles = new Set();

        [...files].filter(i => {
            if (i !== cover) {
                moreFiles.add(i);
            }
        });

        this.setState({
            files: moreFiles,
            cover: cover,
        });
    };

    private fileSaver = (file: File | null) => {
        let { files, cover } = this.state;
        let newState = {};

        if (files && file) {
            files.add(file);
            newState = {
                ...newState,
                files: files,
                uploadProgress: null,
            };
        }
        if (!files && file) {
            files = new Set();
            files.add(file);
            newState = {
                ...newState,
                files: files,
                uploadProgress: null,
            };
        }
        if (file && file.isImage && !cover) {
            newState = {
                ...newState,
                files: files,
                uploadProgress: null,
                cover: file,
            };
        }
        this.setState(newState);
    };

    private fileRemover = (file: File | null) => {
        let { files, cover } = this.state;
        let newCover = cover;
        if (files && file) {
            files.delete(file);
        }

        if (file === cover) {
            newCover = null;
        }

        this.setState({
            files: files,
            cover: newCover,
        });
    };

    private handleDrop = (file: any) => {
        const dialog = UploadCare.fileFrom('object', file);

        dialog.progress(r => {
            this.setState({
                uploadProgress: r.progress,
            });
        });
        dialog.done(r => {
            const ucFile = {
                uuid: r.uuid,
                name: r.name,
                size: r.size,
                isImage: r.isImage,
            };
            this.fileSaver(ucFile);
        });
    };

    private handleAttach = () => {
        let dialog = UploadCare.openDialog(null, {
            publicKey: getConfig().uploadcareKey!!,
        });
        dialog.done(res => {
            res.progress(r => {
                this.setState({
                    uploadProgress: r.progress,
                });
            });
            res.done(r => {
                const ucFile = {
                    uuid: r.uuid,
                    name: r.name,
                    size: r.size,
                    isImage: r.isImage,
                };
                this.fileSaver(ucFile);
            });
        });
    };

    componentDidMount() {
        const { editData } = this.props;
        if (editData && editData.files) {
            this.propsFileSaver(editData.files);
        }
    }

    render() {
        const { props, state } = this;
        let postType = this.props.postType || 'BLANK';

        const header = postTexts[postType].header;
        const titlePlaceholder = postTexts[postType].titlePlaceholder;
        const textPlaceholder = postTexts[postType].textPlaceholder;

        const { uploadProgress, files, cover } = this.state;
        let moreFiles: File[] | null = null;
        if (files && files.size > 0) {
            moreFiles = [...files].filter(i => i !== cover);
        }

        return (
            <XView
                flexDirection="column"
                position="absolute"
                backgroundColor="#fff"
                top={-56}
                left={0}
                width="100%"
                height="calc(100% + 56px)"
            >
                <Header justifyContent="center">
                    <XHorizontal
                        alignItems="center"
                        justifyContent="space-between"
                        maxWidth={950}
                        flexGrow={1}
                    >
                        <XHorizontal alignItems="center">
                            <XAvatar2
                                size={36}
                                src={props.cloudImageUuid}
                                title={props.objectName}
                                id={props.objectId || ''}
                            />
                            <XHorizontal alignItems="center" separator={3}>
                                <XView
                                    fontSize={14}
                                    fontWeight="600"
                                    color="#000"
                                >
                                    {props.objectName}
                                </XView>
                                <XView
                                    opacity={0.3}
                                    fontSize={12}
                                    fontWeight="600"
                                    color="#000"
                                >
                                    •
                                </XView>
                                <XView
                                    fontSize={14}
                                    color="#000"
                                >
                                    {props.editData ? 'Post editing' : header}
                                </XView>
                            </XHorizontal>
                        </XHorizontal>
                        <XView
                            onClick={() => this.props.handleHideChat(false, null)}
                            cursor="pointer"
                            alignItems="center"
                            justifyContent="center"
                            padding={8}
                            width={32}
                            height={32}
                            borderRadius={50}
                            hoverBackgroundColor="rgba(0, 0, 0, 0.05)"
                        >
                            <CloseIcon />
                        </XView>
                    </XHorizontal>
                </Header>
                <XView
                    flexDirection="row"
                    flexGrow={1}
                    justifyContent="center"
                    paddingHorizontal={20}
                    paddingTop={20}
                    paddingBottom={12}
                    position="relative"
                >
                    <XVertical maxWidth={700} flexGrow={1}>
                        <XHorizontal separator={10} flexGrow={1}>
                            <XVertical flexGrow={1}>
                                <PostTitle invalid={state.invalidTitle}>
                                    <XInput
                                        placeholder={titlePlaceholder}
                                        onChange={this.titleChange}
                                        value={this.state.title}
                                    />
                                </PostTitle>
                                <PostText invalid={state.invalidText}>
                                    <XTextArea
                                        placeholder={textPlaceholder}
                                        value={this.state.text}
                                        onChange={this.textChange}
                                    />
                                </PostText>
                            </XVertical>
                            {cover && (
                                <CoverWrapper>
                                    <XCloudImage
                                        srcCloud={'https://ucarecdn.com/' + cover.uuid + '/'}
                                        resize={'fill'}
                                        width={134}
                                        height={134}
                                    />
                                    <CoverDelButton onClick={() => this.fileRemover(cover)}>
                                        <RemoveIcon />
                                    </CoverDelButton>
                                </CoverWrapper>
                            )}
                        </XHorizontal>
                        {moreFiles && moreFiles.length > 0 && (
                            <FilesWrapper>
                                {moreFiles.map(i => (
                                    <FileItem
                                        key={'file' + i.uuid}
                                        separator={4}
                                        alignItems="center"
                                    >
                                        <FileImage />
                                        <XHorizontal alignItems="center" separator={4}>
                                            <div>
                                                {i.name} <span>•</span> {niceBytes(Number(i.size))}
                                            </div>
                                            <XHorizontal
                                                alignItems="center"
                                                className="remove"
                                                onClick={() => this.fileRemover(i)}
                                            >
                                                <RemoveIcon />
                                            </XHorizontal>
                                        </XHorizontal>
                                    </FileItem>
                                ))}
                            </FilesWrapper>
                        )}
                        {!!uploadProgress && uploadProgress > 0 && (
                            <MessageUploadComponent
                                key={'file_uploading'}
                                progress={Math.round(uploadProgress * 100)}
                                title={'Uploading (' + Math.round(uploadProgress * 100) + '%)'}
                            />
                        )}
                    </XVertical>
                    <DropZone
                        height="100%"
                        onFileDrop={this.handleDrop}
                    />
                </XView>
                <FooterWrapper justifyContent="center" alignItems="center">
                    <XHorizontal
                        justifyContent="space-between"
                        alignItems="center"
                        flexGrow={1}
                        maxWidth={700}
                    >
                        <XHorizontal>
                            <AttachmentButton onClick={this.handleAttach}>
                                <PhotoIcon />
                                <span>Photo</span>
                            </AttachmentButton>
                            <AttachmentButton onClick={this.handleAttach}>
                                <FileIcon />
                                <span>Document</span>
                            </AttachmentButton>
                        </XHorizontal>
                        {!props.editData && (
                            <SendPostButton
                                conversationId={props.conversationId}
                                postType={postType}
                                title={state.title}
                                text={state.text}
                                files={state.files}
                                handleHideChat={props.handleHideChat}
                                checkTitleValue={this.invalidTitleHandler}
                                checkTextValue={this.invalidTextHandler}
                                checkValue={this.invalidValue}
                            >
                                <XButton text="Send" style="primary" iconRight="send" />
                            </SendPostButton>
                        )}
                        {props.editData && (
                            <EditPostButton
                                messageId={props.editData.messageId}
                                postType={postType}
                                title={state.title}
                                text={state.text}
                                files={state.files}
                                handleHideChat={props.handleHideChat}
                                checkTitleValue={this.invalidTitleHandler}
                                checkTextValue={this.invalidTextHandler}
                                checkValue={this.invalidValue}
                            >
                                <XButton text="Save changes" style="primary" />
                            </EditPostButton>
                        )}
                    </XHorizontal>
                </FooterWrapper>
            </XView>
        );
    }
}
