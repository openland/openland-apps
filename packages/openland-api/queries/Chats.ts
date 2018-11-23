import gql from 'graphql-tag';
import { UserShort } from '../fragments/UserShort';
import { RoomMessageFull } from '../fragments/MessageFull';
import { OrganizationShort } from '../fragments/OrganizationShort';
import { RoomMessageShort } from '../fragments/MessageShort';
import { MessageLightShort } from '../fragments/MessageLightShort';
import { RoomFull } from '../fragments/RoomFull';
import { UserTiny } from '../fragments/UserTiny';

export const DialogsQuery = gql`
    query Dialogs($after: String) {
        dialogs(first: 20, after: $after) {
            items {
                id
                cid
                fid
                kind
                title
                photo
                unreadCount
                topMessage {
                    ...MessageLightShort
                }
                betaTopMessage {
                    ...RoomMessageShort
                }
            }
            cursor
        }
        counter: alphaNotificationCounter {
            id
            unreadCount
        }
    }
    ${MessageLightShort}
    ${UserTiny}
    ${RoomMessageShort}
`;

export const RoomQuery = gql`
    query Room($id: ID!) {
        room(id: $id){
            ... RoomFull
        }
    }
    ${RoomFull}
    ${UserShort}
    ${OrganizationShort}
`;

export const MessageSetReactionMutation = gql`
    mutation MessageSetReaction($messageId: ID!, $reaction: String!) {
        betaReactionSet(mid: $messageId, reaction: $reaction)
    }
`;

export const SwitchReactionMutation = gql`
    mutation SwitchReaction($messageId: ID!, $from: String!, $to: String!) {
        betaReactionSet(mid: $messageId, reaction: $to)
        betaReactionRemove(mid: $messageId, reaction: $from)
    }
`;

export const MessageUnsetReactionMutation = gql`
    mutation MessageUnsetReaction($messageId: ID!, $reaction: String!) {
        betaReactionRemove(mid: $messageId, reaction: $reaction)
    }
`;

export const SaveDraftMessageMutation = gql`
    mutation SaveDraftMessage($conversationId: ID!, $message: String!) {
        conversationDraftUpdate(conversationId: $conversationId, message: $message)
    }
`;

export const GetDraftMessageQuery = gql`
    query GetDraftMessage($conversationId: ID!) {
        message: conversationDraft(conversationId: $conversationId)
    }
`;

export const GlobalCounterQuery = gql`
    query GlobalCounter {
        counter: alphaNotificationCounter {
            id
            unreadCount
        }
    }
`;

export const RoomHistoryQuery = gql`
    query RoomHistory($roomId: ID!, $before: ID) {
        messages: roomMessages(roomId: $roomId, first: 30, before: $before) {
            ...RoomMessageFull
        }
    }
    ${RoomMessageFull}
    ${UserShort}
`;

export const SendMessageMutation = gql`
    mutation SendMessage($message: String, $file: String, $repeatKey: String, $replyMessages: [ID!], $mentions: [ID!], $room: ID!) {
        sentMessage: betaMessageSend(message: $message, file: $file, repeatKey: $repeatKey, replyMessages: $replyMessages, mentions: $mentions, room: $room)
    }
`;

export const ReplyMessageMutation = gql`
    mutation ReplyMessage($roomId: ID!, $message: String, $replyMessages: [ID!]) {
        replyMessage: betaMessageSend(room: $roomId, message: $message, replyMessages: $replyMessages)
    }
`;

export const RoomReadMutation = gql`
    mutation RoomRead($id: ID!, $mid: ID!) {
        roomRead(id: $id, mid: $mid)
    }
`;
// keep it until web compose redesigned
export const ChatSearchGroupQuery = gql`
    query ChatSearchGroup($members: [ID!]!) {
        group: alphaChatSearch(members: $members) {
            id
            flexibleId
        }
    }
`;

export const RoomCreateMutation = gql`
    mutation RoomCreate($kind: SharedRoomKind!, $members: [ID!]!, $message: String, $title: String, $description: String, $photoRef: ImageRefInput, $organizationId: ID) {
        room: betaRoomCreate(kind: $kind, members: $members, message: $message, title: $title, description: $description, photoRef: $photoRef, organizationId: $organizationId) {
            id
        }
    }
`;

export const RoomCreateIntroMutation = gql`
    mutation RoomCreateIntro($roomId: ID!, $uid: ID!, $about: String, $file: String) {
        intro: betaIntroSend(room: $roomId, uid: $uid, about: $about, file: $file, message: $about)
    }
`;

export const RoomEditIntroMutation = gql`
    mutation RoomEditIntro($messageId: ID!, $uid: ID!, $about: String, $file: String) {
        intro: betaIntroEdit(mid: $messageId, uid: $uid, about: $about, file: $file, message: $about)
    }
`;

export const SetTypingMutation = gql`
    mutation SetTyping($conversationId: ID!) {
        typingSend(conversationId: $conversationId, type: TEXT)
    }
`;

export const CancelTypingMutation = gql`
    mutation CancelTyping($conversationId: ID!) {
        typingCancel(conversationId: $conversationId)
    }
`;

export const RoomAddMemberMutation = gql`
    mutation RoomAddMember($roomId: ID!, $userId: ID!) {
        betaRoomInvite(roomId: $roomId, invites: [{userId: $userId, role: MEMBER}]){
           ...RoomFull
        }
    }
    ${UserShort}
    ${OrganizationShort}
    ${RoomFull}
`;

export const RoomAddMembersMutation = gql`
    mutation RoomAddMembers($roomId: ID!, $invites: [RoomInviteInput!]!) {
        betaRoomInvite(roomId: $roomId, invites: $invites){
           ...RoomFull
        }
    }
    ${UserShort}
    ${OrganizationShort}
    ${RoomFull}
`;

export const RoomKickMutation = gql`
    mutation RoomKick($roomId: ID!, $userId: ID!) {
        betaRoomKick(roomId: $roomId, userId: $userId){
           ...RoomFull
        }
    }
    ${UserShort}
    ${OrganizationShort}
    ${RoomFull}
`;

export const RoomLeaveMutation = gql`
    mutation RoomLeave($roomId: ID!) {
        betaRoomLeave(roomId: $roomId){
           ...RoomFull
        }
    }
    ${UserShort}
    ${OrganizationShort}
    ${RoomFull}
`;

export const RoomSearchTextQuery = gql`
    query RoomSearchText($query: String!) {
        items: betaDialogTextSearch(query: $query) {
            id: cid
            title
            flexibleId: fid
            photo
        }
    }
`;

export const RoomSearchQuery = gql`
    query RoomSearch($query: String, $sort: String, $page: Int) {
        items: betaRoomSearch(query: $query, sort: $sort, page: $page, first: 25) {
            edges {
                node {
                    ... RoomFull
                }
                cursor
            }
            pageInfo {
                hasNextPage
                hasPreviousPage
                itemsCount
                currentPage
                pagesCount
                openEnded
            }
        }
    }
    ${RoomFull}
    ${UserShort}
    ${OrganizationShort}
`;

export const RoomAlterFeaturedMutation = gql`
    mutation RoomAlterFeatured($roomId: ID!, $featured: Boolean!) {
        betaRoomAlterFeatured(roomId: $roomId, featured: $featured){
            ... RoomFull
        }
    }
    ${RoomFull}
    ${OrganizationShort}
    ${UserShort}
`;

export const RoomAlterHiddenMutation = gql`
     mutation RoomAlterHidden($roomId: ID!, $listed: Boolean!) {
        betaRoomAlterListed(roomId: $roomId, listed: $listed){
            ... RoomFull
        }
    }
    ${RoomFull}
    ${OrganizationShort}
    ${UserShort}
`;

export const RoomMembersQuery = gql`
    query RoomMembers($roomId: ID!){
        members: roomMembers(roomId: $roomId){
           user{
               ...UserShort
           }
           role
           membership
        }
    }
    ${UserShort}
`;

export const RoomSettingsUpdateMutation = gql`
    mutation RoomSettingsUpdate($settings: RoomUserNotificaionSettingsInput!, $roomId: ID!) {
        betaRoomUpdateUserNotificationSettings(settings: $settings, roomId: $roomId) {
            id
            mute
        }
    }
`;

export const RoomJoinMutation = gql`
    mutation RoomJoin($roomId: ID!) {
        join: betaRoomJoin(roomId: $roomId){
           ...RoomFull
        }
    }
    ${UserShort}
    ${OrganizationShort}
    ${RoomFull}
`;

export const RoomSendEmailInviteMutation = gql`
    mutation RoomSendEmailInvite($roomId: ID!, $inviteRequests: [RoomInviteEmailRequest!]!) {
        betaRoomInviteLinkSendEmail(roomId: $roomId, inviteRequests: $inviteRequests)
    }
`;

export const RoomJoinInviteLinkMutation = gql`
    mutation RoomJoinInviteLink($invite: String!) {
        join: betaRoomInviteLinkJoin(invite: $invite){
           ...RoomFull
        }
    }
    ${UserShort}
    ${OrganizationShort}
    ${RoomFull}
`;

export const RoomRenewInviteLinkMutation = gql`
    mutation RoomRenewInviteLink($roomId: ID!) {
        link: betaRoomInviteLinkRenew(roomId: $roomId)
    }
`;

export const RoomInviteLinkQuery = gql`
    query RoomInviteLink($roomId: ID!) {
        link: betaRoomInviteLink(roomId: $roomId)
    }
`;

export const RoomInviteInfoQuery = gql`
    query RoomInviteInfo($invite: String!) {
        invite: betaRoomInviteInfo(invite: $invite){
            room{
                ...RoomFull
            }
            invitedByUser{
                ...UserShort
            }
        }
    }
    ${UserShort}
    ${OrganizationShort}
    ${RoomFull}
`;

export const RoomUpdateMutation = gql`
    mutation RoomUpdate($roomId: ID!, $input: RoomUpdateInput!) {
        betaRoomUpdate(roomId: $roomId, input: $input){
            ...RoomFull
        }
    }
    ${RoomFull}
    ${OrganizationShort}
    ${UserShort}
`;

export const RoomDeleteMessageMutation = gql`
    mutation RoomDeleteMessage($messageId: ID!) {
        betaMessageDelete(mid: $messageId)
    }
`;

export const RoomDeleteUrlAugmentationMutation = gql`
    mutation RoomDeleteUrlAugmentation($messageId: ID!) {
        betaMessageDeleteAugmentation(mid: $messageId)
    }
`;

export const RoomEditMessageMutation = gql`
    mutation RoomEditMessage($messageId: ID!, $message: String) {
        betaMessageEdit(mid: $messageId, message: $message)
    }
`;