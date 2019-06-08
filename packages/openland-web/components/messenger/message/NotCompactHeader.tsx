import * as React from 'react';
import { XView } from 'react-mental';
import { UserShort } from 'openland-api/Types';
import { XDate } from 'openland-x/XDate';
import { UserPopper } from 'openland-web/components/UserPopper';

const DeletedCommentHeader = () => {
    return (
        <XView fontSize={14} fontWeight="600" color="rgba(0, 0, 0, 0.5)">
            Deleted
        </XView>
    );
};

export const NotCompactHeader = ({
    sender,
    date,
    deleted,
    isComment,
    userPopperRef,
    senderNameEmojify,
    selecting,
    isEditView,
    isEdited,
    isModal,
}: {
    sender: UserShort;
    date: number;
    deleted?: boolean;
    isComment: boolean;
    userPopperRef: React.RefObject<UserPopper>;
    senderNameEmojify?: any;
    selecting: boolean;
    isEditView: boolean;
    isEdited: boolean;
    isModal?: boolean;
}) => {
    let onAvatarOrUserNameMouseEnter = () => {
        if (userPopperRef.current) {
            userPopperRef.current.showPopper();
        }
    };

    let onAvatarOrUserNameMouseLeave = () => {
        if (userPopperRef.current) {
            userPopperRef.current.hidePopper();
        }
    };

    return (
        <XView flexDirection="row" marginBottom={4}>
            <XView flexDirection="row">
                {deleted ? (
                    <DeletedCommentHeader />
                ) : (
                    <XView
                        flexDirection="row"
                        fontSize={14}
                        fontWeight="600"
                        color="rgba(0, 0, 0, 0.8)"
                        onMouseEnter={onAvatarOrUserNameMouseEnter}
                        onMouseLeave={onAvatarOrUserNameMouseLeave}
                    >
                        {senderNameEmojify}
                    </XView>
                )}
                {sender.primaryOrganization && (
                    <XView
                        as="a"
                        fontSize={12}
                        fontWeight="600"
                        color="rgba(0, 0, 0, 0.4)"
                        paddingLeft={8}
                        alignSelf="flex-end"
                        marginBottom={-1}
                        path={selecting ? undefined : `/mail/o/${sender.primaryOrganization.id}`}
                        hoverTextDecoration="none"
                    >
                        {sender.primaryOrganization.name}
                    </XView>
                )}
                {isComment && (isEditView || isEdited) && (
                    <>
                        <XView
                            marginLeft={8}
                            alignSelf="center"
                            width={3}
                            height={3}
                            borderRadius={'50%'}
                            marginBottom={-1}
                            backgroundColor="rgba(0, 0, 0, 0.3)"
                        />
                        <XView
                            marginLeft={7}
                            color="rgba(0, 0, 0, 0.4)"
                            fontSize={12}
                            alignSelf="flex-end"
                            fontWeight={'600'}
                            marginBottom={-1}
                        >
                            {isEditView ? 'Editing message' : isEdited && 'Edited'}
                        </XView>
                    </>
                )}
            </XView>
            {!isComment && !isModal && (
                <XView
                    paddingLeft={8}
                    fontSize={12}
                    color="rgba(0, 0, 0, 0.4)"
                    fontWeight="600"
                    alignSelf="flex-end"
                    marginBottom={-1}
                >
                    <XDate value={date.toString()} format="time" />
                </XView>
            )}
        </XView>
    );
};
