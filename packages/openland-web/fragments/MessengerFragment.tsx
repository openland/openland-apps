import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { withRoom } from '../api/withRoom';
import { withQueryLoader } from '../components/withQueryLoader';
import { MessengerRootComponent } from './MessengerRootComponent';
import { XMenuItemWrapper } from 'openland-x/XMenuItem';
import { XCheckbox } from 'openland-x/XCheckbox';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { withChannelSetFeatured } from '../api/withChannelSetFeatured';
import { RoomsInviteComponent } from './RoomsInviteComponent';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { XModalForm as XModalFormOld } from 'openland-x-modal/XModalForm';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XInput } from 'openland-x/XInput';
import { withAlterChat } from '../api/withAlterChat';
import { sanitizeIamgeRef } from 'openland-y-utils/sanitizeImageRef';
import { withChannelSetHidden } from '../api/withChannelSetHidden';
import { XTextArea } from 'openland-x/XTextArea';
import { UserSelect } from '../api/UserSelect';
import { XForm } from 'openland-x-forms/XForm';
import { XFormField } from 'openland-x-forms/XFormField';
import { Room_room_SharedRoom, Room_room_PrivateRoom } from 'openland-api/Types';
import { withRoomAddMembers } from '../api/withRoomAddMembers';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { MessagesStateContext, MessagesStateContextProps } from '../components/messenger/components/MessagesStateContext';
import CloseIcon from '../components/messenger/components/icons/ic-close.svg';
import { withUserInfo } from '../components/UserInfo';
import { TalkBarComponent } from 'openland-web/pages/main/mail/components/conference/TalkBarComponent';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { ChatHeaderView } from './chat/ChatHeaderView';

const ForwardRoot = Glamorous.div({
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: '100%',
    height: '100%',
    padding: 28,
    paddingTop: 0,
    flexShrink: 0,
    left: 0,
    top: 0,
    zIndex: 2,
    backgroundColor: '#fff',
    '& > svg': {
        position: 'absolute',
        right: 20,
        top: 20,
        width: 14,
        height: 14,
        cursor: 'pointer',
    },
});

const ImageWrapper = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    zIndex: 1,
});

const Image = Glamorous.div({
    width: 358,
    height: 311,
    backgroundImage: "url('/static/X/messenger/messenger-empty.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    transform: 'scaleX(-1)',
    marginBottom: 50,
});

const InfoTextBold = Glamorous.div({
    fontSize: 18,
    fontWeight: 600,
    lineHeight: 1.11,
    letterSpacing: 0,
    color: 'rgba(0, 0, 0, 0.9)',
});

const InfoText = Glamorous.div({
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: 0,
    color: 'rgba(0, 0, 0, 0.4)',
    '& span': {
        fontWeight: 600,
        color: '#4C4C4C',
    },
});

const FrowardPlaceholder = (props: { state: MessagesStateContextProps }) => {
    let { state } = props;
    let msgLength = 0;
    if (state.forwardMessagesId) {
        msgLength = state.forwardMessagesId.size;
    }

    return (
        <ForwardRoot>
            <CloseIcon
                onClick={() => {
                    state.resetAll();
                }}
            />
            <ImageWrapper>
                <Image />
                <XVertical separator={6} alignItems="center">
                    <InfoTextBold>Forwarding messages</InfoTextBold>
                    <InfoText>
                        Select a chat in the left column to forward{' '}
                        <span>
                            {msgLength} {msgLength === 1 ? 'message' : 'messages'}
                        </span>
                    </InfoText>
                </XVertical>
            </ImageWrapper>
        </ForwardRoot>
    );
};

const ChatHeaderWrapper = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    flexShrink: 0,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
});

class SwitchComponent extends React.Component<
    {
        mutation: any;
        roomId: string;
        val: boolean;
        fieldName: string;
        fieldTitle?: string;
    },
    { val: boolean }
    > {
    constructor(props: any) {
        super(props);
        this.state = { val: props.val };
    }

    render() {
        return (
            <XMenuItemWrapper>
                <XVertical>
                    <XCheckbox
                        label={this.props.fieldTitle || this.props.fieldName}
                        value={this.state.val ? 'featured' : 'unfeatured'}
                        trueValue="featured"
                        onChange={() => {
                            this.props.mutation({
                                variables: {
                                    roomId: this.props.roomId,
                                    [this.props.fieldName]: !this.props.val,
                                },
                            });
                            this.setState({
                                val: !this.state.val,
                            });
                        }}
                    />
                </XVertical>
            </XMenuItemWrapper>
        );
    }
}

export const RoomSetFeatured = withChannelSetFeatured(props => (
    <SwitchComponent
        mutation={props.setFeatured}
        val={(props as any).val}
        fieldName={'featured'}
        fieldTitle={'Featured'}
        roomId={(props as any).roomId}
    />
)) as React.ComponentType<{ val: boolean; roomId: string }>;

export const RoomSetHidden = withChannelSetHidden(props => (
    <SwitchComponent
        mutation={props.setHidden}
        val={(props as any).val}
        fieldName={'listed'}
        fieldTitle={'Listed'}
        roomId={(props as any).roomId}
    />
)) as React.ComponentType<{ val: boolean; roomId: string }>;

export const RoomEditComponent = withAlterChat(props => {
    let editTitle = (props as any).title;
    let editDescription = (props as any).description;
    let editPhotoRef = (props as any).photo;
    let editSocialImageRef = (props as any).socialImage;
    return (
        <XModalForm
            scrollableContent={true}
            targetQuery="editChat"
            useTopCloser={true}
            title="Room settings"
            defaultAction={data => {
                let newTitle = data.input.title;
                let newDescription = data.input.description;
                let newPhoto = data.input.photoRef;
                let newSocialImage = data.input.socialImageRef;
                console.warn(newPhoto, newSocialImage);
                props.alter({
                    variables: {
                        roomId: (props as any).roomId,
                        input: {
                            ...(newTitle !== editTitle ? { title: newTitle } : {}),
                            ...(newDescription !== editDescription
                                ? { description: newDescription }
                                : {}),
                            ...(newPhoto && newPhoto.uuid !== editPhotoRef
                                ? { photoRef: sanitizeIamgeRef(newPhoto) }
                                : {}),
                            ...(newSocialImage && newSocialImage.uuid !== editSocialImageRef
                                ? {
                                    socialImageRef: sanitizeIamgeRef(newSocialImage),
                                }
                                : {}),
                        },
                    },
                });
            }}
            defaultData={{
                input: {
                    title: (props as any).title || '',
                    description: (props as any).description || '',
                    photoRef: { uuid: (props as any).photo },
                    socialImageRef: (props as any).socialImage
                        ? { uuid: (props as any).socialImage }
                        : undefined,
                },
            }}
        >
            <XVertical separator={12}>
                <XHorizontal separator={12}>
                    <XAvatarUpload
                        size="default"
                        field="input.photoRef"
                        placeholder={{
                            add: 'Add photo',
                            change: 'Change Photo',
                        }}
                    />
                    <XVertical flexGrow={1} separator={10} alignSelf="flex-start">
                        <XInput title="Room name" field="input.title" size="large" />
                        <XWithRole role="feature-chat-embedded-attach">
                            <XInput
                                field="input.longDescription"
                                flexGrow={1}
                                title="Attach link"
                                size="large"
                            />
                        </XWithRole>
                    </XVertical>
                </XHorizontal>
                <XTextArea
                    valueStoreKey="fields.input.description"
                    placeholder="Description"
                    resize={false}
                />
                <XAvatarUpload
                    cropParams="1:1, free"
                    field="input.socialImageRef"
                    placeholder={{
                        add: 'Add social image',
                        change: 'Change social image',
                    }}
                />
            </XVertical>
        </XModalForm>
    );
}) as React.ComponentType<{
    title: string;
    photo: string;
    socialImage: string | null;
    description: string | null;
    roomId: string;
}>;

export const AddMemberForm = withRoomAddMembers(props => {
    return (
        <XModalFormOld
            title="Add member to room"
            submitMutation={props.addMember}
            mutationDirect={true}
            actionName="Add"
            targetQuery="addMember"
            defaultValues={{ roomId: (props as any).roomId }}
        >
            <XFormField title="User">
                <XForm.Select field="userId" component={UserSelect} />
            </XFormField>
        </XModalFormOld>
    );
}) as React.ComponentType<{ roomId: string }>;

let MessengerComponentLoader = withRoom(
    withQueryLoader(
        withUserInfo(props => {
            if (!props.data) {
                return <div />;
            }
            let sharedRoom: Room_room_SharedRoom | null =
                props.data.room!.__typename === 'SharedRoom' ? (props.data.room as any) : null;
            let privateRoom: Room_room_PrivateRoom | null =
                props.data.room!.__typename === 'PrivateRoom' ? (props.data.room as any) : null;

            // WTF?
            if (
                sharedRoom &&
                sharedRoom.kind !== 'INTERNAL' &&
                sharedRoom.membership !== 'MEMBER'
            ) {
                if (sharedRoom.kind === 'PUBLIC') {
                    return <RoomsInviteComponent room={sharedRoom} />;
                } else {
                    return <XPageRedirect path="/mail" />;
                }
            }
            let title = sharedRoom ? sharedRoom.title : privateRoom ? privateRoom.user.name : '';

            let messagesState = (props as any).state as MessagesStateContextProps;
            let placeholder = messagesState.useForwardPlaceholder;
            return (
                <>
                    <XDocumentHead title={title} />
                    <XVertical flexGrow={1} separator={'none'} width="100%" height="100%">

                        {placeholder && <FrowardPlaceholder state={messagesState} />}

                        <ChatHeaderWrapper>
                            <ChatHeaderView room={props.data.room!} me={props.user!} />
                        </ChatHeaderWrapper>
                        <TalkBarComponent conversationId={(sharedRoom || privateRoom)!.id} />
                        <XHorizontal
                            justifyContent="center"
                            width="100%"
                            height="calc(100% - 56px)"
                            separator={0}
                        >
                            <MessengerRootComponent
                                objectName={title}
                                objectId={
                                    sharedRoom
                                        ? sharedRoom.organization
                                            ? sharedRoom.organization.id
                                            : sharedRoom.id
                                        : privateRoom
                                            ? privateRoom.user.id
                                            : undefined
                                }
                                cloudImageUuid={
                                    (sharedRoom && sharedRoom.photo) ||
                                    (privateRoom && privateRoom.user.photo) ||
                                    undefined
                                }
                                organizationId={
                                    sharedRoom && sharedRoom.organization
                                        ? sharedRoom.organization.id
                                        : null
                                }
                                conversationId={props.data.room!.id}
                                conversationType={sharedRoom ? sharedRoom.kind : 'PRIVATE'}
                            />
                        </XHorizontal>
                    </XVertical>
                    {sharedRoom && (
                        <RoomEditComponent
                            title={sharedRoom.title}
                            description={sharedRoom.description}
                            photo={sharedRoom.photo}
                            socialImage={sharedRoom.socialImage}
                            roomId={sharedRoom.id}
                        />
                    )}
                    {sharedRoom && (
                        <AddMemberForm roomId={props.data.room!.id} />
                    )}
                </>
            );
        }),
    ),
) as React.ComponentType<{
    variables: { id: string };
    state: MessagesStateContextProps;
}>;

interface MessengerComponentProps {
    id: string;
}

export const MessengerFragment = (props: MessengerComponentProps) => (
    <MessagesStateContext.Consumer>
        {(state: MessagesStateContextProps) => (
            <MessengerComponentLoader variables={{ id: props.id }} state={state} />
        )}
    </MessagesStateContext.Consumer>
);
