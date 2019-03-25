import * as React from 'react';
import { css } from 'linaria';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { sanitizeImageRef } from 'openland-web/utils/sanitizer';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XView } from 'react-mental';
import { XCheckbox } from 'openland-x/XCheckbox';
import { XTextArea } from 'openland-x/XTextArea';
import { XUserCard } from 'openland-x/cards/XUserCard';
import {
    Room_room_SharedRoom_members_user,
    Room_room_SharedRoom_welcomeMessage_sender,
} from 'openland-api/Types';
import { useClient } from 'openland-web/utils/useClient';
import ArrowIcon from 'openland-icons/ic-arrow-group-select.svg';
import { XRouterContext } from 'openland-x-routing/XRouterContext';

interface AdvancedSettingsInnerProps {
    socialImage: string | null;
    roomId: string;
    canChangeAdvancedSettingsMembersUsers: Room_room_SharedRoom_members_user[];
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
        background-color: #f2f3f4;
    }

    & img {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover;
    }
`;

export const AdvancedSettingsModal = (props: AdvancedSettingsInnerProps) => {
    const api = useClient();
    let router = React.useContext(XRouterContext)!;

    const [isOpen, setIsOpen] = React.useState(true);
    const [isOpenUsers, setIsOpenUsers] = React.useState(false);
    const [welcomeMessageIsOn, setWelcomeMessageIsOn] = React.useState(props.welcomeMessageIsOn);
    const [welcomeMessageText, setWelcomeMessageText] = React.useState(props.welcomeMessageText);
    const [welcomeMessageSender, setWelcomeMessageSender] = React.useState(
        props.welcomeMessageSender,
    );
    const [triedToSend, setTriedToSend] = React.useState(false);
    const [welcomeMessageSenderError, setWelcomeMessageSenderError] = React.useState(
        !welcomeMessageSender,
    );
    const [welcomeMessageTextError, setWelcomeMessageTextError] = React.useState(
        !welcomeMessageText,
    );

    React.useEffect(() => {
        setWelcomeMessageIsOn(props.welcomeMessageIsOn);
        setWelcomeMessageText(props.welcomeMessageText);
        setWelcomeMessageSender(props.welcomeMessageSender);
    }, [props.welcomeMessageIsOn, props.welcomeMessageText, props.welcomeMessageSender]);

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

    React.useEffect(() => {
        if (!isOpen) {
            router!!.replaceQuery('advancedSettings', undefined);
            setIsOpen(true);
        }
    }, [isOpen]);

    return (
        <XModalForm
            isOpen={isOpen}
            defaultLayout={false}
            scrollableContent={true}
            alsoUseBottomCloser={true}
            onClosed={() => {
                setWelcomeMessageIsOn(props.welcomeMessageIsOn);
                setWelcomeMessageText(props.welcomeMessageText);
                setWelcomeMessageSender(props.welcomeMessageSender);
                setTriedToSend(false);
            }}
            targetQuery="advancedSettings"
            useTopCloser={true}
            title="Advanced settings"
            defaultAction={async data => {
                if (welcomeMessageIsOn && (welcomeMessageSenderError || welcomeMessageTextError)) {
                    setTriedToSend(true);
                    throw Error();
                }

                const newSocialImage = data.input.socialImageRef;

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
                    welcomeMessageSender: welcomeMessageSender ? welcomeMessageSender!!.id : null,
                    welcomeMessageText: welcomeMessageText,
                });

                await api.refetchRoom({
                    id: props.roomId,
                });
                setTriedToSend(true);
                setIsOpen(false);
            }}
            defaultData={{
                input: {
                    welcomeMessageIsOn: welcomeMessageIsOn ? 'true' : 'false',
                    welcomeMessageText: welcomeMessageText,
                    welcomeMessageSender: welcomeMessageSender,
                    socialImageRef: props.socialImage ? { uuid: props.socialImage } : undefined,
                },
            }}
        >
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
                                backgroundColor="#f2f3f4"
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
                                        {props.canChangeAdvancedSettingsMembersUsers.map(i => {
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
                        <XAvatarUpload
                            cropParams="16:9, free"
                            field="input.socialImageRef"
                            placeholder={{
                                add: 'Add image',
                                change: 'Change image',
                            }}
                        />
                    </div>
                </XView>
            </XView>
        </XModalForm>
    );
};
