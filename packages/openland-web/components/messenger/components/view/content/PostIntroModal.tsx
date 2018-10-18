import * as React from 'react';
import Glamorous from 'glamorous';
import { XModalForm, XModalFormProps } from 'openland-x-modal/XModalForm2';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XTextArea } from 'openland-x/XTextArea';
import { XLink, XLinkProps } from 'openland-x/XLink';
import { XSelect } from 'openland-x/XSelect';
import IcFile from '../../icons/ic-file-3.svg';
import { XSelectCustomUsersRender } from 'openland-x/basics/XSelectCustom';
import { withExplorePeople } from '../../../../../api/withExplorePeople';
import { withIntro } from '../../../../../api/withIntro';
import { XFileUpload } from 'openland-x/files/XFileUpload';
import { XStoreState } from 'openland-y-store/XStoreState';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import { MessageUploadComponent } from './MessageUploadComponent';
import { MessageFileComponent } from './MessageFileComponent';
import { XFormField } from 'openland-x-forms/XFormField';
import { XThemeDefault } from 'openland-x/XTheme';

interface ImgButtonStylesProps {
    marginRight?: number;
    marginLeft?: number;
    marginTop?: number;
    marginBottom?: number;
    icon?: any;
    title: string;
}

interface SearchPeopleProps {
    user?: {
        id: string,
        name: string,
        photo: string | null,
        primaryOrganization: {
            id?: string | null,
            name?: string | null,
        } | null
    } | null;
}

const ImgButtonStyles = Glamorous(XLink)<ImgButtonStylesProps>(props => ({
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: 0,
    lineHeight: '20px',
    color: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingLeft: 12,
    paddingRight: 12,
    height: 32,
    borderRadius: 20,
    '&:first-child': {
        marginLeft: -12
    },
    '&:hover': {
        color: 'rgba(0, 0, 0, 0.5)',
        backgroundColor: 'rgba(0, 0, 0, 0.03)',
        '& > svg > *': {
            fill: 'rgba(0, 0, 0, 0.3)'
        }
    },
    '& > svg': {
        marginRight: props.marginRight,
        marginLeft: props.marginLeft,
        marginTop: props.marginTop,
        marginBottom: props.marginBottom,
        '& > *': {
            fill: 'rgba(0, 0, 0, 0.2)'
        },
    }
}));

const ImgButton = (props: XLinkProps & ImgButtonStylesProps) => (
    <ImgButtonStyles {...props}>
        {props.icon}
        <span>{props.title}</span>
    </ImgButtonStyles>
);

const SearchPeopleModule = withExplorePeople(props => {
    if (!(props.data && props.data.items)) {
        return (
            <XSelect
                creatable={true}
                multi={false}
                field="input.userId"
                options={[]}
                render={
                    <XSelectCustomUsersRender
                        multi={false}
                        popper={true}
                        placeholder="Whom do you want to introduce?"
                        rounded={true}
                        onInputChange={(data) => (props as any).onChangeInput(data)}
                        helpText="Wait..."
                    />
                }
            />
        );
    }
    return (
        <XFormField field="input.userId">
            <XSelect
                creatable={true}
                multi={false}
                field="input.userId"
                options={props.data.items.edges.map(i => (
                    {
                        label: i.node.name,
                        value: i.node.id,
                        photo: i.node.picture,
                        org: (i.node.primaryOrganization ? i.node.primaryOrganization.name : null)
                    })
                ) || []}
                render={
                    <XSelectCustomUsersRender
                        multi={false}
                        placeholder="Whom do you want to introduce?"
                        rounded={true}
                        onInputChange={(data) => (props as any).onChangeInput(data)}
                    />
                }
            />
        </XFormField>
    );
}) as React.ComponentType<SearchPeopleProps & { variables: { query?: string, sort?: string }, onChangeInput: (data: string) => void }>;

class SearchPeople extends React.PureComponent<SearchPeopleProps> {
    state = {
        query: this.props.user ? this.props.user.name : ''
    };

    handleSearchText = (query: string) => {
        this.setState({
            query: query
        });
    }

    render() {
        return (
            <SearchPeopleModule
                onChangeInput={this.handleSearchText}
                user={this.props.user}
                variables={{
                    query: this.state.query
                }}
            />
        );
    }
}

const FooterWrap = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 24,
    paddingRight: 24,
    height: 64,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: XThemeDefault.backyardColor,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTop: '1px solid',
    borderTopColor: XThemeDefault.separatorColor
});

interface UploadedFile {
    uuid: string;
    name: string | null;
    size: string | null;
}

interface FileUploaderProps {
    field: string;
    store: XStoreState;
    handleFileUpload: (file: UploadedFile) => void;
    handleFileUploading: (isLoading: boolean, progress: number) => void;
}

class FileUploader extends React.PureComponent<FileUploaderProps> {
    handleFileUpload = (file: UploadedFile | null) => {
        let key = ('fields.' + this.props.field);
        if (file) {
            this.props.store.writeValue(key, file.uuid);
            this.props.handleFileUpload(file);
        }
    }

    render() {
        return (
            <XFileUpload
                imageOnly={false}
                onChanged={this.handleFileUpload}
                component={(pr) => {
                    this.props.handleFileUploading(pr.isLoading, pr.progress);
                    return (
                        <ImgButton
                            onClick={pr.doUpload}
                            title="Document"
                            icon={<IcFile />}
                            marginRight={10}
                            marginTop={1}
                            marginBottom={-1}
                        />
                    );
                }}
            />
        );
    }
}

interface FileComponentProps {
    file: {
        uuid: string,
        name: string | null,
        size: string | null
    } | null;
    field: string;
    store: XStoreState;
    onClearClick: () => void;
}

class FileComponent extends React.PureComponent<FileComponentProps> {
    handleClearClick = () => {
        let key = ('fields.' + this.props.field);
        if (this.props.file) {
            this.props.store.writeValue(key, null);
            this.props.onClearClick();
        }
    }
    render() {
        let { file } = this.props;
        return (
            <>
                {file && file.name && file.size && (
                    <MessageFileComponent
                        fileName={file.name}
                        fileSize={Number(file.size)}
                        clearButton={true}
                        onClearClick={this.handleClearClick}
                    />
                )}
            </>
        );
    }
}

interface PostIntroModalRawProps extends Partial<XModalFormProps> {
    file?: {
        uuid: string,
        name: string | null,
        size: string | null
    } | null;
    user?: {
        id: string,
        name: string,
        photo: string | null,
        primaryOrganization: {
            id?: string | null,
            name?: string | null,
        } | null
    } | null;
}

interface PostIntroModalRawState {
    fileUploading: boolean;
    progress: number | null;
    file: {
        uuid: string,
        name: string | null,
        size: string | null
    } | null;
}

class PostIntroModalRaw extends React.PureComponent<PostIntroModalRawProps, PostIntroModalRawState> {
    constructor(props: PostIntroModalRawProps) {
        super(props);

        this.state = {
            fileUploading: false,
            progress: null,
            file: props.file || null
        };
    }

    handleFileUpload = (file: UploadedFile) => {
        this.setState({
            file: file,
            progress: null
        });
    }

    handleFileUploading = (isLoading: boolean, progress: number) => {
        this.setState({
            fileUploading: isLoading,
            progress: progress
        });
    }

    handleFileClear = () => {
        this.setState({
            fileUploading: false,
            progress: 0,
            file: null
        });
    }

    render() {
        let { file } = this.state;
        let footer = (
            <FooterWrap>
                <XHorizontal flexGrow={1} separator={15}>
                    <XStoreContext.Consumer>
                        {store => {
                            if (!store) {
                                throw Error('No store!');
                            }
                            return (
                                <FileUploader
                                    field="input.file"
                                    store={store}
                                    handleFileUpload={this.handleFileUpload}
                                    handleFileUploading={this.handleFileUploading}
                                />
                            );
                        }}
                    </XStoreContext.Consumer>
                </XHorizontal>
                <XFormSubmit
                    key="intro"
                    succesText="Intro posted!"
                    style="primary"
                    text="Send"
                    keyDownSubmit={true}
                />
            </FooterWrap>
        );
        return (
            <XModalForm
                {...this.props}
                defaultAction={this.props.defaultAction!!}
                title="Introduce a person"
                useTopCloser={true}
                customFooter={footer}
            >
                <XVertical separator={8}>
                    <SearchPeople user={this.props.user} />
                    <XFormField field="input.about">
                        <XTextArea
                            placeholder="Description"
                            resize={false}
                            valueStoreKey="fields.input.about"
                        />
                    </XFormField>
                    <XStoreContext.Consumer>
                        {store => {
                            if (!store) {
                                throw Error('No store!');
                            }
                            return (
                                <FileComponent
                                    field="input.file"
                                    key="file"
                                    store={store}
                                    file={file}
                                    onClearClick={this.handleFileClear}
                                />
                            );
                        }}
                    </XStoreContext.Consumer>
                    {(this.state.progress !== 0 && !file && this.state.fileUploading) && (
                        <MessageUploadComponent
                            key={'file'}
                            progress={Math.round((this.state.progress || 0) * 100)}
                            title={'Uploading (' + Math.round((this.state.progress || 0) * 100) + '%)'}
                        />
                    )}
                </XVertical>
            </XModalForm >
        );
    }
}

interface PostIntroModalProps extends Partial<XModalFormProps> {
    conversationId?: string;
    messageId?: string;
    about?: string;
    file?: {
        uuid: string,
        name: string | null,
        size: string | null
    } | null;
    user?: {
        id: string,
        name: string,
        photo: string | null,
        primaryOrganization: {
            id?: string | null,
            name?: string | null,
        } | null
    } | null;
}

const MutationProvider = withIntro((props) => (
    <PostIntroModalRaw
        {...props}
        defaultAction={async (data) => {
            let input = data.input || {};
            if (props.messageId) {
                await props.editIntro({
                    variables: {
                        messageId: (props as any).messageId,
                        userId: input.userId[0],
                        about: input.about,
                        file: input.file
                    }
                });
            } else {
                await props.createIntro({
                    variables: {
                        conversationId: (props as any).conversationId,
                        userId: input.userId[0],
                        about: input.about,
                        file: input.file
                    }
                });
            }

        }}
        defaultData={{
            input: {
                userId: props.user ? [props.user.id] : undefined,
                about: props.about,
                file: (props.file && props.file.uuid)
            }
        }}
    />
)) as React.ComponentType<PostIntroModalProps>;

export const PostIntroModal = withIntro((props) => (
    <MutationProvider {...props} conversationId={(props as any).conversationId} />
)) as React.ComponentType<PostIntroModalProps>;