import * as React from 'react';
import Glamorous from 'glamorous';
import UploadCare from 'uploadcare-widget';
import { getConfig } from '../../../config';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XTextArea } from 'openland-x/XTextArea';
import { XInput } from 'openland-x/XInput';
import { XButton } from 'openland-x/XButton';
import { XLink } from 'openland-x/XLink';
import { XCloudImage } from 'openland-x/XCloudImage';
import { MessageUploadComponent } from './view/content/MessageUploadComponent';
import { niceBytes } from './view/content/MessageFileComponent';
import CloseIcon from './icons/ic-close.svg';
import PostIcon from './icons/ic-attach-post.svg';
import PhotoIcon from './icons/ic-photo-2.svg';
import FileIcon from './icons/ic-file-3.svg';
import UloadIc from './icons/file-upload.svg';

const Wrapper = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    backgroundColor: '#fff',
    top: -56,
    left: 0,
    width: '100%',
    height: 'calc(100% + 56px)'
});

const Header = Glamorous(XHorizontal)({
    height: 56,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
    '& > svg': {
        cursor: 'pointer'
    }
});

const HeadTitle = Glamorous.div({
    fontSize: 16,
    color: '#000'
});

const Body = Glamorous.div({
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 12,
    position: 'relative'
});

const PostTitle = Glamorous.div({
    '& *, & input, & *:focus-within, & *:focus': {
        fontSize: 22,
        fontWeight: 600,
        border: 'none !important',
        boxShadow: 'none !important',
        lineHeight: 'normal',
        paddingLeft: '0 !important',
        paddingRight: '0 !important',
        minHeight: 30,
        display: 'block'
    }
});

const PostText = Glamorous(XVertical)({
    '& textarea': {
        minHeight: '100%',
        flexShrink: 0,
        fontSize: 14,
        fontWeight: 600,
        border: 'none',
        lineHeight: 1.57,
        resize: 'none',
        padding: 0,
        flexGrow: 1,
        display: 'block',
        '&:focus, &:active': {
            boxShadow: 'none',
            border: 'none'
        }
    }
});

const FilesWrapper = Glamorous(XVertical)({
    paddingTop: 10,
    borderTop: '1px solid #ececec'
});

const FileItem = Glamorous(XHorizontal)({
    opacity: 0.5,
    fontSize: 13,
    lineHeight: 1.54,
    color: '#000',
    '& > svg': {
        width: 11,
        '& > path': {
            fill: '#C7C7C7'
        }
    },
    '& .remove': {
        marginTop: 1,
        cursor: 'pointer',
        '& > svg > g > path:last-child': {
            fill: '#C7C7C7'
        },
        '&:hover > svg > g > path:last-child': {
            fill: '#4a4a4a'
        }
    }
});

const FooterWrapper = Glamorous(XHorizontal)({
    borderTop: '1px solid #ececec',
    backgroundColor: '#f9f9f9',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 14,
    paddingBottom: 14
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
    }
}));

const CoverWrapper = Glamorous.div({
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative'
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
    '& > img': {
        display: 'block'
    },
    '& > svg > g > path:last-child': {
        fill: '#fff'
    }
});

const DropArea = Glamorous.div<{ dragOn: boolean }>(props => ({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
    padding: 24,
    visibility: props.dragOn ? 'visible' : 'hidden',
    backgroundColor: props.dragOn ? '#fff' : 'transparent',
}));

const DropAreaContent = Glamorous.div<{ dragUnder: boolean }>(props => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px dashed',
    borderColor: props.dragUnder
        ? 'rgba(23, 144, 255, 0.2)'
        : 'rgba(51, 69, 98, 0.1)',
    borderRadius: 8,
    backgroundColor: props.dragUnder ? 'rgba(23, 144, 255, 0.02)' : '#fff',
    '& > svg': {
        pointerEvents: 'none',
        '& > g': {
            stroke: props.dragUnder ? '#1790FF' : '#BCC3CC',
        },
    },
}));

const DropAreaTitle = Glamorous.div({
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: -0.3,
    textAlign: 'center',
    color: '#334562',
    marginTop: 23,
    marginBottom: 4,
});

const DropAreaSubtitle = Glamorous.div({
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.71,
    letterSpacing: -0.4,
    textAlign: 'center',
    color: '#5c6a81',
});

interface CreatePostComponentProps {
    handleHideChat: (hide: boolean) => void;
}

interface File {
    uuid: string;
    name: string;
    size: string;
    isImage: boolean;
}

interface CreatePostComponentState {
    dragOn: boolean;
    dragUnder: boolean;
    uploadProgress: number | null;
    files: Set<File> | null;
    cover: File | null
}

export class CreatePostComponent extends React.Component<CreatePostComponentProps, CreatePostComponentState> {
    constructor(props: CreatePostComponentProps) {
        super(props);

        this.state = {
            dragOn: false,
            dragUnder: false,
            uploadProgress: null,
            files: null,
            cover: null
        }
    }

    private fileSaver = (file: File | null) => {
        let { files, cover } = this.state;
        let newState = {};

        if (files && file) {
            files.add(file);
            newState = {
                ...newState,
                files: files,
                uploadProgress: null
            };
        }
        if (!files && file) {
            files = new Set();
            files.add(file);
            newState = {
                ...newState,
                files: files,
                uploadProgress: null
            };
        }
        if (file && file.isImage && !cover) {
            newState = {
                ...newState,
                files: files,
                uploadProgress: null,
                cover: file
            };
        }
        this.setState(newState);
    }

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
            cover: newCover
        })
    }

    private handleDrop = (e: any) => {
        e.preventDefault();

        this.setState({
            dragOn: false,
            dragUnder: false,
        });

        if (this.state.uploadProgress) {
            return;
        }

        const file = e.dataTransfer.files[0];
        const dialog = UploadCare.fileFrom('object', file);

        dialog.progress(r => {
            this.setState({
                uploadProgress: r.progress
            });
        });
        dialog.done(r => {
            const ucFile = {
                uuid: r.uuid,
                name: r.name,
                size: r.size,
                isImage: r.isImage
            };
            this.fileSaver(ucFile)
        });
    };

    private handleWindowDragover = (e: any) => {
        e.preventDefault();
        if (this.state.uploadProgress) {
            return;
        }
        this.setState({
            dragOn: true,
        });
    };

    private handleMouseOut = () => {
        this.setState({
            dragOn: false,
            dragUnder: false
        });
    }

    private handleWindowDrop = (e: any) => {
        e.preventDefault();
        this.setState({
            dragOn: false,
        });
    };

    private handleDragOver = (e: any) => {
        this.setState({
            dragUnder: true,
        });
    };

    private handleDragLeave = (e: any) => {
        let file = e.dataTransfer.files[0];
        if (file === undefined) {
            this.setState({
                dragOn: false,
            });
        }
        this.setState({
            dragUnder: false,
        });
    };

    private handleAttach = () => {
        let dialog = UploadCare.openDialog(null, {
            publicKey: getConfig().uploadcareKey!!,
        });
        dialog.done(res => {
            res.progress(r => {
                this.setState({
                    uploadProgress: r.progress
                });
            });
            res.done(r => {
                const ucFile = {
                    uuid: r.uuid,
                    name: r.name,
                    size: r.size,
                    isImage: r.isImage
                };
                this.fileSaver(ucFile)
            });
        });
    };

    componentDidMount() {
        window.addEventListener('dragover', this.handleWindowDragover);
        window.addEventListener('drop', this.handleWindowDrop);
    }

    componentWillUnmount() {
        window.removeEventListener('dragover', this.handleWindowDragover);
        window.removeEventListener('drop', this.handleWindowDrop);
    }

    render() {
        const { uploadProgress, files, cover } = this.state;
        let moreFiles: File[] | null = null;
        if (files && files.size > 0) {
            moreFiles = [...files].filter(i => i !== cover);
        }
        return (
            <Wrapper>
                <Header alignItems="center" justifyContent="space-between">
                    <XHorizontal>
                        <PostIcon />
                        <HeadTitle>Blank post</HeadTitle>
                    </XHorizontal>
                    <CloseIcon onClick={() => this.props.handleHideChat(false)} />
                </Header>
                <Body>
                    <XVertical maxWidth={700} flexGrow={1}>
                        <XHorizontal separator={10} flexGrow={1}>
                            <XVertical flexGrow={1}>
                                <PostTitle>
                                    <XInput placeholder="Title" />
                                </PostTitle>
                                <PostText flexGrow={1}>
                                    <XTextArea placeholder="Write your post here. You can share an opportunity, ask for help, or describe an offer." />
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
                                        <CloseIcon />
                                    </CoverDelButton>
                                </CoverWrapper>
                            )}
                        </XHorizontal>
                        {(moreFiles && moreFiles.length > 0) && (
                            <FilesWrapper>
                                {moreFiles.map(i => (
                                    <FileItem key={'file' + i.uuid} separator={4} alignItems="center">
                                        <FileIcon />
                                        <XHorizontal alignItems="center" separator={2}>
                                            <div>{i.name} • {niceBytes(Number(i.size))}</div>
                                            <XHorizontal alignItems="center" className="remove" onClick={() => this.fileRemover(i)}>
                                                <CloseIcon />
                                            </XHorizontal>
                                        </XHorizontal>
                                    </FileItem>
                                ))}
                            </FilesWrapper>
                        )}
                        {(!!uploadProgress && uploadProgress > 0) && (
                            <MessageUploadComponent
                                key={'file_uploading'}
                                progress={Math.round(uploadProgress * 100)}
                                title={'Uploading (' + Math.round(uploadProgress * 100) + '%)'}
                            />
                        )}
                    </XVertical>
                    <DropArea dragOn={this.state.dragOn}>
                        <DropAreaContent
                            onDrop={this.handleDrop}
                            onDragOver={this.handleDragOver}
                            onDragLeave={this.handleDragLeave}
                            onMouseOut={this.handleMouseOut}
                            dragUnder={this.state.dragUnder}
                        >
                            <UloadIc />
                            <DropAreaTitle>Drop files here</DropAreaTitle>
                            <DropAreaSubtitle>
                                To send them as files
                        </DropAreaSubtitle>
                        </DropAreaContent>
                    </DropArea>
                </Body>
                <FooterWrapper justifyContent="center" alignItems="center">
                    <XHorizontal justifyContent="space-between" alignItems="center" flexGrow={1} maxWidth={700}>
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
                        <XButton
                            text="Send"
                            style="primary"
                        />
                    </XHorizontal>
                </FooterWrapper>
            </Wrapper>
        );
    }
}