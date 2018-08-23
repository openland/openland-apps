import gql from 'graphql-tag';
import { UserShort } from '../fragments/UserShort';
import { MessageFull } from '../fragments/MessageFull';
import { ConversationShort } from '../fragments/ConversationShort';
import { OrganizationShort } from '../fragments/OrganizationShort';
import { SettingsFull } from '../fragments/SettingsFragment';

export const ChatListQuery = gql`
    query ChatList($after: String) {
        chats: alphaChats(first: 20, after: $after) {
            conversations {
                ...ConversationShort
            }
            seq
            next
        }
        counter: alphaNotificationCounter {
            id
            unreadCount
        }
    }
    ${ConversationShort}
    ${MessageFull}
    ${UserShort}
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
            }
            ... on ChannelConversation {
                isRoot
                featured
                description
                myStatus
                membersCount
                organization{
                    id
                    isMine
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
            ... on PrivateConversation {
                user {
                    ...UserShort
                }
            }
            ... on GroupConversation {
                members {
                    ...UserShort
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
            }
            ... on Organization {
                id
                title: name
            }
        }
    }
`;

export const ChatSearchForComposeMobileQuery = gql`
    query ChatSearchForComposeMobile($query: String!, $organizations: Boolean!) {
        items: alphaChatsSearchForCompose(query: $query, organizations: $organizations) {
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
    mutation ChatCreateGroup($members: [ID!]!, $message: String!) {
        group: alphaChatCreateGroup(members: $members, message: $message) {
            id
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
        channels: alphaChannels(query: $query, sort: $sort, page: $page, first: 10) {
            edges {
                node {
                    ...ConversationShort
                    membersCount
                    featured
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
    mutation CreateChannel($title: String!, $message: String!, $description: String) {
        channel: alphaChannelCreate(title: $title, message: $message, description: $description){
            id
        }
    }
`;

export const ChannelSetFeaturedMutation = gql`
    mutation ChannelSetFeatured($channelId: ID!, $featured: Boolean!) {
        alphaChannelSetFeatured(channelId: $channelId, featured: $featured)
    }
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
        alphaChannelInvite(channelId: $channelId, userId: $userId)
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
            mobileNotifications
            mute
        }
    }
`;

export const ChannelJoinMutation = gql`
    mutation ChannelJoin($channelId: ID!) {
        join: alphaChannelJoin(channelId: $channelId)
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