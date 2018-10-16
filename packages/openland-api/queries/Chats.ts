import gql from 'graphql-tag';
import { UserShort } from '../fragments/UserShort';
import { MessageFull } from '../fragments/MessageFull';
import { ConversationShort } from '../fragments/ConversationShort';
import { OrganizationShort } from '../fragments/OrganizationShort';

export const ChatListQuery = gql`
    query ChatList($after: String) {
        chats: alphaChats(first: 20, after: $after) {
            conversations {
                id
                flexibleId
                title
                photos
                unreadCount
                settings{
                    id
                    mute
                }
                ... on GroupConversation{
                    photo
                }
                ... on ChannelConversation{
                    photo
                }
                topMessage{
                    ...MessageFull
                }
            }
            seq
            next
        }
        counter: alphaNotificationCounter {
            id
            unreadCount
        }
    }
    ${MessageFull}
    ${UserShort}
`;

export const ChatLeaveMutation = gql`
    mutation ChatLeave($conversationId: ID!) {
        alphaChatLeave(conversationId: $conversationId) {
            curSeq
        }
    }
`;

export const MessageSetReactionMutation = gql`
    mutation MessageSetReaction($messageId: ConversationMessageID!, $reaction: String!) {
        alphaChatSetReaction(messageId: $messageId, reaction: $reaction)
    }
`;

export const MessageUnsetReactionMutation = gql`
    mutation MessageUnsetReaction($messageId: ConversationMessageID!, $reaction: String!) {
        alphaChatUnsetReaction(messageId: $messageId, reaction: $reaction)
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

export const ChatHistoryQuery = gql`
    query ChatHistory($conversationId: ID!, $before: ID) {
        messages: alphaLoadMessages(conversationId: $conversationId, first: 30, before: $before) {
            seq
            messages {
                ...MessageFull
            }
        }
    }
    ${MessageFull}
    ${UserShort}
`;

export const ChatInfoQuery = gql`
    query ChatInfo($conversationId: ID!) {
        chat: alphaChat(conversationId: $conversationId) {
            id
            flexibleId
            title
            photos
            settings{
                id
                mobileNotifications
                mute
            }
            ... on SharedConversation {
                organization {
                    id
                }
            }
            ... on PrivateConversation {
                blocked
                user {
                    ...UserShort
                }
            }
            ... on GroupConversation {
                membersCount
                photo
                photoRef{
                    uuid
                    crop{
                        x
                        y
                        w
                        h
                    }
                }
            }
            ... on ChannelConversation {
                photo
                photoRef{
                    uuid
                    crop{
                        x
                        y
                        w
                        h
                    }
                }
                isRoot
                featured
                hidden
                description
                longDescription
                socialImageRef{
                    uuid
                    crop{
                        x
                        y
                        w
                        h
                    }
                }
                socialImage
                myStatus
                membersCount
                memberRequestsCount
                organization{
                    id
                    isMine
                    isOwner: alphaIsOwner
                    name
                }
            }
        }
    }
    ${UserShort}
`;

export const ChatFullInfoQuery = gql`
    query ChatFullInfo($conversationId: ID!) {
        chat: alphaChat(conversationId: $conversationId) {
            id
            flexibleId
            title
            photos
            settings{
                id
                mobileNotifications
                mute
            }
            ... on PrivateConversation {
                user {
                    ...UserShort
                }
            }
            ... on GroupConversation {
                members {
                    ...UserShort
                }
                photo
                photoRef{
                    uuid
                    crop{
                        x
                        y
                        w
                        h
                    }
                }
            }
            ... on ChannelConversation {
                members {
                    ...UserShort
                }
                photo
                photoRef{
                    uuid
                    crop{
                        x
                        y
                        w
                        h
                    }
                }
            }
            ... on SharedConversation {
                organizations {
                    ...OrganizationShort
                }
            }
        }
    }
    ${OrganizationShort}
    ${UserShort}
`;

export const GroupChatFullInfoQuery = gql`
    query GroupChatFullInfo($conversationId: ID!) {
        chat: alphaChat(conversationId: $conversationId) {
            id
            flexibleId
            title
            photos
            settings{
                id
                mobileNotifications
                mute
            }
            ... on ChannelConversation {
                photo
                photoRef{
                    uuid
                    crop{
                        x
                        y
                        w
                        h
                    }
                }
                organization{
                    id
                    isMine
                    isOwner: alphaIsOwner
                    name
                }
            }
            ... on GroupConversation {
                photo
                photoRef{
                    uuid
                    crop{
                        x
                        y
                        w
                        h
                    }
                }
            }
        }
        members: alphaGroupConversationMembers(conversationId: $conversationId) {
            user {
                ...UserShort
            }
            role
        }
    }
    ${UserShort}
`;

export const SendMessageMutation = gql`
    mutation SendMessage($conversationId: ID!, $message: String, $file: String, $repeatKey: String!) {
        sentMessage: alphaSendMessage(conversationId: $conversationId, message: $message, file: $file, repeatKey: $repeatKey) {
            seq
            ... on ConversationEventMessage {
                message {
                    ...MessageFull
                }
            }
        }
    }
    ${MessageFull}
    ${UserShort}
`;

export const ChatReadMutation = gql`
    mutation ChatRead($conversationId: ID!, $messageId: ID!) {
        alphaReadChat(conversationId: $conversationId, messageId: $messageId) {
            counter {
                id
                unreadCount
            }
            conversation {
                id
                unreadCount
            }
        }
    }
`;

export const ChatSearchForComposeQuery = gql`
    query ChatSearchForCompose($query: String!, $organizations: Boolean!) {
        items: alphaChatsSearchForCompose(query: $query, organizations: $organizations) {
            ... on User {
                id
                title: name
                photo
                organization: alphaPrimaryOrganization {
                    id
                    name
                }
            }
            ... on Organization {
                id
                title: name
                photo
            }
        }
    }
`;

export const ChatSearchForComposeMobileQuery = gql`
    query ChatSearchForComposeMobile($query: String!, $organizations: Boolean!, $limit: Int) {
        items: alphaChatsSearchForCompose(query: $query, organizations: $organizations, limit: $limit) {
            ... on User {
                ...UserShort
            }
            ... on Organization {
                ...OrganizationShort
            }
        }
    }
    ${UserShort}
    ${OrganizationShort}
`;

export const ChatSearchGroupQuery = gql`
    query ChatSearchGroup($members: [ID!]!) {
        group: alphaChatSearch(members: $members) {
            id
            flexibleId
        }
    }
`;

export const ChatCreateGroupMutation = gql`
    mutation ChatCreateGroup($members: [ID!]!, $message: String, $title: String, $photoRef: ImageRefInput) {
        group: alphaChatCreateGroup(members: $members, message: $message, title: $title, photoRef: $photoRef) {
            id
        }
    }
`;

export const ChatCreateIntroMutation = gql`
    mutation ChatCreateIntro($conversationId: ID!, $userId: UserID, $about: String, $file: String) {
        intro: alphaSendIntro(conversationId: $conversationId, userId: $userId, about: $about, file: $file, message: $about) {
            seq
            message {
                urlAugmentation {
                    extra {
                        ... on User {
                            ...UserShort
                        }
                    }
                }
            }
        }
    }
    ${UserShort}
`;

export const ChatEditIntroMutation = gql`
    mutation ChatEditIntro($messageId: ID!, $userId: UserID, $about: String, $file: String) {
        intro: alphaEditIntro(messageId: $messageId, userId: $userId, about: $about, file: $file, message: $about) {
            seq
        }
    }
`;

export const SetTypingMutation = gql`
    mutation SetTyping($conversationId: ID!) {
        setTyping: alphaSetTyping(conversationId: $conversationId)
    }
`;

export const ChatChangeGroupTitleMutation = gql`
    mutation ChatChangeGroupTitle($conversationId: ID!, $name: String!) {
        alphaChatChangeGroupTitle(conversationId: $conversationId, title: $name) {
            chat {
                id
                flexibleId
                title
            }
        }
    }
`;

export const ChatAddMemberMutation = gql`
    mutation ChatAddMember($conversationId: ID!, $userId: ID!) {
        alphaChatInviteToGroup(conversationId: $conversationId, invites: [{userId: $userId, role: "member"}]){
            chat{
                id
            }
        }
    }
`;

export const ChatAddMembersMutation = gql`
    mutation ChatAddMembers($conversationId: ID!, $invites: [GroupConversationInvite!]!) {
        alphaChatInviteToGroup(conversationId: $conversationId, invites: $invites){
            chat{
                id
            }
        }
    }
`;

export const BlockedListQuery = gql`
    query BlockedList($conversationId: ID!) {
        blocked: alphaBlockedList(conversationId: $conversationId) {
            user{
                ...UserShort
            }
            blockedBy{
                ...UserShort
            }
        }
    }${UserShort}
`;

export const BlockUserMutation = gql`
    mutation BlockUser($userId: ID!) {
        blockUser: alphaBlockUser(userId: $userId)
    }
`;

export const UnBlockUserMutation = gql`
    mutation UnBlockUser($userId: ID!, $conversationId: ID) {
        blockUser: alphaUnblockUser(userId: $userId, conversationId: $conversationId)
    }
`;

export const ChatSearchTextQuery = gql`
    query ChatSearchText($query: String!) {
        items: alphaChatTextSearch(query: $query) {
            ...ConversationShort           
        }
    }
    ${ConversationShort}
    ${MessageFull}
    ${UserShort}
`;

export const DocumentFetchPreviewLinkQuery = gql`
    query DocumentFetchPreviewLink($file: String!) {
        previewLink: alphaFilePreviewLink(uuid: $file)
    }
`;

export const ChatSearchChannelQuery = gql`
    query ChatSearchChannel($query: String, $sort: String, $page: Int) {
        items: alphaChannels(query: $query, sort: $sort, page: $page, first: 25) {
            edges {
                node {
                    ...ConversationShort
                    membersCount
                    featured
                    hidden
                    description
                    myStatus
                    organization{
                        ...OrganizationShort
                    }
                    isRoot
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
    ${ConversationShort}
    ${MessageFull}
    ${UserShort}
    ${OrganizationShort}
`;

export const CreateChannelMutation = gql`
    mutation CreateChannel($title: String!, $message: String, $description: String, $photoRef: ImageRefInput, $oid: ID) {
        channel: alphaChannelCreate(title: $title, message: $message, description: $description, photoRef: $photoRef, oid: $oid){
            id
        }
    }
`;

export const ChannelSetFeaturedMutation = gql`
    mutation ChannelSetFeatured($channelId: ID!, $featured: Boolean!) {
        alphaChannelSetFeatured(channelId: $channelId, featured: $featured){
            ... ConversationShort
        }
    }
    ${ConversationShort}
    ${MessageFull}
    ${UserShort}
`;

export const ChannelSetHiddenMutation = gql`
    mutation ChannelSetHidden($channelId: ID!, $hidden: Boolean!) {
        alphaChannelHideFromSearch(channelId: $channelId, hidden: $hidden){
            ... ConversationShort
        }
    }
    ${ConversationShort}
    ${MessageFull}
    ${UserShort}
`;

export const UserChannelsQuery = gql`
    query UserChannels{
        channels: alphaChannelsList(first: 100){
            conversations {
                id
                title
            }
        }
    }
`;

export const ChannelMembersQuery = gql`
    query ChannelMembers($channelId: ID!){
        members: alphaChannelMembers(channelId: $channelId){
           user{
               ...UserShort
           }
           role
           status
        }
    }
    ${UserShort}
`;

export const ChannelInviteMutation = gql`
    mutation ChannelInvite($channelId: ID!, $userId: ID!) {
        alphaChannelInvite(channelId: $channelId, userId: $userId){
            chat{
                id
            }
        }
    }
`;

export const ConversationKickMutation = gql`
    mutation ConversationKick($conversationId: ID!, $userId: ID!) {
        alphaChatKickFromGroup(conversationId: $conversationId, userId: $userId){
            chat{
                id
            }
        }
    }
`;

export const ConversationSettingsUpdateMutation = gql`
    mutation ConversationSettingsUpdate($settings: UpdateConversationSettingsInput!, $conversationId: ID!) {
        alphaUpdateConversationSettings(settings: $settings, conversationId: $conversationId) {
            id
            mobileNotifications
            mute
        }
    }
`;

export const ChannelJoinMutation = gql`
    mutation ChannelJoin($channelId: ID!) {
        join: alphaChannelJoin(channelId: $channelId){
            chat{
                id
            }
        }
    }
`;

export const ChannelInviteMembersMutation = gql`
    mutation ChannelInviteMembers($channelId: ID!, $inviteRequests: [ChannelInviteRequest!]!) {
        alphaChannelInviteMembers(channelId: $channelId, inviteRequests: $inviteRequests)
    }
`;

export const ChannelJoinInviteMutation = gql`
    mutation ChannelJoinInvite($invite: String!) {
        alphaChannelJoinInvite(invite: $invite)
    }
`;

export const ChannelRenewInviteLinkMutation = gql`
    mutation ChannelRenewInviteLink($channelId: ID!) {
        link: alphaChannelRenewInviteLink(channelId: $channelId)
    }
`;

export const ChannelInviteLinkQuery = gql`
    query ChannelInviteLink($channelId: ID!) {
        link: alphaChannelInviteLink(channelId: $channelId)
    }
`;

export const ChannelInviteInfoQuery = gql`
    query ChannelInviteInfo($uuid: String!) {
        invite: alphaChannelInviteInfo(uuid: $uuid){
            channel{
                id
                title
                photo
                photos
                isRoot
                featured
                description
                myStatus
                membersCount
                socialImage
                organization{
                    id
                    isMine
                    name
                }
            }            
            invitedByUser{
                ...UserShort
            }
        }
    }
    ${UserShort}
`;

export const ChannelJoinInviteLinkMutation = gql`
    mutation ChannelJoinInviteLink($invite: String!) {
        cannelId: alphaChannelJoinInvite(invite: $invite)
    }
`;

export const ChatUpdateGroupMutation = gql`
    mutation ChatUpdateGroup($conversationId: ID!, $input: UpdateGroupInput!) {
        event: alphaChatUpdateGroup(conversationId: $conversationId, input: $input){
            chat{
                id
            }
            curSeq
        }
    }
`;

export const ChatDeleteMessageMutation = gql`
    mutation ChatDeleteMessage($messageId: ID!) {
        event: alphaDeleteMessage(messageId: $messageId){
            seq
            messageId
        }
    }
`;

export const ChatEditMessageMutation = gql`
    mutation ChatEditMessage($messageId: ID!, $message: String) {
        event: alphaEditMessage(messageId: $messageId, message: $message){
            seq
            message{
                id
            }
        }
    }
`;

export const SuperChannelAddMemberMutation = gql`
    mutation SuperChannelAddMember($id: ID!, $userId: ID!){
        superAccountChannelMemberAdd(id: $id, userId: $userId)
    }
`;