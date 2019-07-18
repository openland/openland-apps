import * as React from 'react';
import { css } from 'linaria';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { sanitizeImageRef } from 'openland-web/utils/sanitizer';
import { XAvatarUpload, XAvatarFormFieldComponent, StoredFileT } from 'openland-x/XAvatarUpload';
import { XView } from 'react-mental';
import { XCheckbox } from 'openland-x/XCheckbox';
import { XTextArea } from 'openland-x/XTextArea';
import { XUserCard } from 'openland-x/cards/XUserCard';
import {
    Room_room_SharedRoom_welcomeMessage_sender,
    Room_room_SharedRoom,
} from 'openland-api/Types';
import { useClient } from 'openland-web/utils/useClient';
import ArrowIcon from 'openland-icons/ic-arrow-group-select.svg';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { getWelcomeMessageSenders } from 'openland-y-utils/getWelcomeMessageSenders';
import { XLoader } from 'openland-x/XLoader';
import { showModalBox } from 'openland-x/showModalBox';
import { useField } from 'openland-form/useField';
import { useForm } from 'openland-form/useForm';
import { XModalContent } from 'openland-web/components/XModalContent';
import { XModalFooter } from 'openland-x-modal/XModal';
import { XButton } from 'openland-x/XButton';

interface AdvancedSettingsInnerProps {
    socialImage: string | null;
    roomId: string;
    welcomeMessageIsOn: boolean;
    welcomeMessageText: string | null;
    welcomeMessageSender: Room_room_SharedRoom_welcomeMessage_sender | null;
}

const UsersWrapperClassName = css`
    padding-left: 16px;
    padding-right: 16px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 4px 12px -1px rgba(0, 0, 0, 0.06);
    border: solid 1px rgba(220, 222, 228, 0.4);
    max-height: 250px;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
`;

const SocialImageWrapperClassName = css`
    & > div {
        width: 190px;
        height: 100px;
        border-color: transparent;
        border-radius: 10px;
        background-color: #f9f9f9;
    }

    & img {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover;
    }
`;

interface ModalBodyProps {
    welcomeMessageIsOn: boolean;
    setWelcomeMessageIsOn: (data: boolean) => void;
    setSocialImageRef: (file: Partial<StoredFileT>) => void;
    socialImageRef: Partial<StoredFileT> | undefined;
    isOpenUsers: boolean;
    setIsOpenUsers: (data: boolean) => void;
    msgSender: any;
    welcomeMsgSenderOnChange: (data: { value: string; label: string }) => void;
    finalWelcomeMessageSenderError: boolean;
    finalWelcomeMessageTextError: boolean;
    welcomeMsgOnChange: (data: string) => void;
    welcomeMessageText: string | null;
    variables: {
        id: string;
    };
}

const ModalBody = (props: ModalBodyProps) => {
    const {
        welcomeMessageIsOn,
        setWelcomeMessageIsOn,
        setSocialImageRef,
        socialImageRef,
        isOpenUsers,
        setIsOpenUsers,
        msgSender,
        welcomeMsgSenderOnChange,
        finalWelcomeMessageSenderError,
        finalWelcomeMessageTextError,
        welcomeMsgOnChange,
        welcomeMessageText,
        variables,
    } = props;

    const client = useClient();
    let room = client.useWithoutLoaderRoom(variables);
    let roomAdmins = client.useWithoutLoaderRoomOrganizationAdminMembers({ id: variables.id });

    if (!room || !room.room) {
        return <XLoader loading={true} />;
    }

    let sharedRoom =
        room.room.__typename === 'SharedRoom' ? (room.room as Room_room_SharedRoom) : null;

    if (sharedRoom) {
        const canChangeAdvancedSettingsMembersUsers = getWelcomeMessageSenders({
            chat: sharedRoom,
            admins: (
                (roomAdmins &&
                    roomAdmins.room &&
                    roomAdmins.room.__typename === 'SharedRoom' &&
                    roomAdmins.room.organization &&
                    roomAdmins.room.organization.adminMembers) ||
                []
            ).map(a => a.user),
        });

        return (
            <XView>
                <XView fontSize={16} fontWeight="600">
                    Welcome message
                </XView>
                <XView marginTop={4}>
                    Send an automatic message in 1:1 chat to every new member who joins this group
                </XView>
                <XView marginTop={17} alignSelf="flex-start">
                    <XCheckbox
                        label={welcomeMessageIsOn ? 'On' : 'Off'}
                        checked={welcomeMessageIsOn}
                        onChange={() => setWelcomeMessageIsOn(!welcomeMessageIsOn)}
                        switcher={true}
                    />
                </XView>
                {welcomeMessageIsOn && (
                    <>
                        <XView marginTop={25} zIndex={3}>
                            <XView
                                onClick={() => setIsOpenUsers(!isOpenUsers)}
                                height={52}
                                paddingHorizontal={16}
                                backgroundColor="#f9f9f9"
                                borderRadius={8}
                                flexDirection="row"
                                justifyContent="space-between"
                                alignItems="center"
                                cursor="pointer"
                            >
                                <XView flexDirection="column" marginTop={-3}>
                                    <XView color="#1488f3" fontSize={12}>
                                        Sender
                                    </XView>
                                    <XView
                                        fontSize={14}
                                        marginTop={-4}
                                        color={msgSender ? '#000' : 'rgba(0, 0, 0, 0.5)'}
                                    >
                                        {msgSender ? msgSender.label : 'Select'}
                                    </XView>
                                </XView>
                                <ArrowIcon />
                            </XView>
                            {isOpenUsers && (
                                <XView
                                    position="absolute"
                                    left={0}
                                    top={60}
                                    zIndex={1}
                                    width="100%"
                                >
                                    <div className={UsersWrapperClassName}>
                                        {canChangeAdvancedSettingsMembersUsers.map(i => {
                                            let userData = {
                                                value: i.id,
                                                label: i.name,
                                            };
                                            return (
                                                <XUserCard
                                                    key={'user_card' + i.id}
                                                    user={i}
                                                    customButton={null}
                                                    onClick={() => {
                                                        welcomeMsgSenderOnChange(userData);
                                                        setIsOpenUsers(!isOpenUsers);
                                                    }}
                                                    noPath={true}
                                                />
                                            );
                                        })}
                                    </div>
                                </XView>
                            )}
                            {finalWelcomeMessageSenderError && (
                                <XView color="#d75454" paddingLeft={17} marginTop={8}>
                                    Please choose who will send the Welcome message
                                </XView>
                            )}
                        </XView>
                        <XView marginTop={16}>
                            <XTextArea
                                resize={false}
                                title="Text message"
                                mode="modern"
                                invalid={finalWelcomeMessageTextError}
                                onChange={welcomeMsgOnChange}
                                value={welcomeMessageText || ''}
                            />
                            {finalWelcomeMessageTextError && (
                                <XView color="#d75454" paddingLeft={17} marginTop={8}>
                                    Please enter the Welcome message text
                                </XView>
                            )}
                        </XView>
                    </>
                )}
                <XView marginTop={24} fontSize={16} fontWeight="600">
                    Social sharing image
                </XView>
                <XView marginTop={4} fontSize={14}>
                    Choose an image to display when sharing invite to this group on social networks
                </XView>
                <XView marginTop={16}>
                    <div className={SocialImageWrapperClassName}>
                        <XAvatarFormFieldComponent
                            cropParams="16:9"
                            onChange={file => (file ? setSocialImageRef(file) : {})}
                            value={socialImageRef as StoredFileT}
                        />
                    </div>
                </XView>
            </XView>
        );
    }

    return null;
};

export const AdvancedSettingsModal = (props: AdvancedSettingsInnerProps & { hide: () => void }) => {
    const api = useClient();
    let router = React.useContext(XRouterContext)!;

    const [isOpenUsers, setIsOpenUsers] = React.useState(false);
    const [welcomeMessageIsOn, setWelcomeMessageIsOn] = React.useState(props.welcomeMessageIsOn);
    const [welcomeMessageText, setWelcomeMessageText] = React.useState(props.welcomeMessageText);
    const [welcomeMessageSender, setWelcomeMessageSender] = React.useState(
        props.welcomeMessageSender,
    );

    const [socialImageRef, setSocialImageRef] = React.useState<Partial<StoredFileT> | undefined>(
        props.socialImage
            ? {
                  uuid: props.socialImage ? props.socialImage : '',
                  crop: {
                      w: 190,
                      h: 100,
                  },
              }
            : undefined,
    );

    const [triedToSend, setTriedToSend] = React.useState(false);
    const [welcomeMessageSenderError, setWelcomeMessageSenderError] = React.useState(
        !welcomeMessageSender,
    );
    const [welcomeMessageTextError, setWelcomeMessageTextError] = React.useState(
        !welcomeMessageText,
    );

    React.useEffect(
        () => {
            setWelcomeMessageIsOn(props.welcomeMessageIsOn);
            setWelcomeMessageText(props.welcomeMessageText);
            setWelcomeMessageSender(props.welcomeMessageSender);
        },
        [props.welcomeMessageIsOn, props.welcomeMessageText, props.welcomeMessageSender],
    );

    const finalWelcomeMessageSenderError = triedToSend && welcomeMessageSenderError;
    const finalWelcomeMessageTextError = triedToSend && welcomeMessageTextError;

    const welcomeMsgSenderOnChange = (data: { value: string; label: string }) => {
        let sender: Room_room_SharedRoom_welcomeMessage_sender | null = {
            id: data.value,
            name: data.label,
            __typename: 'User',
        };

        setWelcomeMessageSenderError(false);
        setWelcomeMessageSender(sender);
    };

    const welcomeMsgOnChange = (data: string) => {
        setWelcomeMessageText(data === '' ? null : data);
        setWelcomeMessageTextError(!data);
    };

    let msgSender: any = welcomeMessageSender;

    if (welcomeMessageSender) {
        msgSender = {
            value: welcomeMessageSender.id,
            label: welcomeMessageSender.name,
        };
    }

    return (
        <XView borderRadius={8}>
            <XModalContent>
                <ModalBody
                    welcomeMessageIsOn={welcomeMessageIsOn}
                    setWelcomeMessageIsOn={setWelcomeMessageIsOn}
                    socialImageRef={socialImageRef}
                    setSocialImageRef={setSocialImageRef}
                    isOpenUsers={isOpenUsers}
                    setIsOpenUsers={setIsOpenUsers}
                    msgSender={msgSender}
                    welcomeMsgSenderOnChange={welcomeMsgSenderOnChange}
                    finalWelcomeMessageSenderError={finalWelcomeMessageSenderError}
                    finalWelcomeMessageTextError={finalWelcomeMessageTextError}
                    welcomeMsgOnChange={welcomeMsgOnChange}
                    welcomeMessageText={welcomeMessageText}
                    variables={{ id: props.roomId }}
                />
            </XModalContent>
            <XModalFooter>
                <XView marginRight={12}>
                    <XButton text="Cancel" style="ghost" size="large" onClick={props.hide} />
                </XView>
                <XButton
                    text="Add"
                    style="primary"
                    size="large"
                    onClick={async data => {
                        if (
                            welcomeMessageIsOn &&
                            (welcomeMessageSenderError || welcomeMessageTextError)
                        ) {
                            setTriedToSend(true);
                            throw Error();
                        }

                        const newSocialImage = socialImageRef;

                        await api.mutateRoomUpdate({
                            roomId: props.roomId,
                            input: {
                                ...(newSocialImage && newSocialImage.uuid !== props.socialImage
                                    ? {
                                          socialImageRef: sanitizeImageRef(newSocialImage),
                                      }
                                    : {}),
                            },
                        });

                        await api.mutateUpdateWelcomeMessage({
                            roomId: props.roomId,
                            welcomeMessageIsOn: welcomeMessageIsOn,
                            welcomeMessageSender: welcomeMessageSender
                                ? welcomeMessageSender!!.id
                                : null,
                            welcomeMessageText: welcomeMessageText,
                        });

                        await api.refetchRoom({
                            id: props.roomId,
                        });
                        setTriedToSend(true);

                        props.hide();
                    }}
                />
            </XModalFooter>
        </XView>
    );
};

export const showAdvancedSettingsModal = (props: AdvancedSettingsInnerProps) => {
    showModalBox(
        {
            title: 'Advanced settings',
        },
        ctx => <AdvancedSettingsModal {...props} hide={ctx.hide} />,
    );
};
