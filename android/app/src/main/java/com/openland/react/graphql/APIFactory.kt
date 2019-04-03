package com.openland.react.graphql

import com.facebook.react.bridge.ReadableMap
import com.apollographql.apollo.api.*
import com.openland.api.*

fun readQuery(name: String, src: ReadableMap): Query<Operation.Data, Operation.Data, Operation.Variables> {
    if (name == "Account") {
       val builder = AccountQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "AccountSettings") {
       val builder = AccountSettingsQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "AccountInviteInfo") {
       val builder = AccountInviteInfoQuery.builder()
       builder.inviteKey(notNull(readString(src, "inviteKey")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "AccountAppInviteInfo") {
       val builder = AccountAppInviteInfoQuery.builder()
       builder.inviteKey(notNull(readString(src, "inviteKey")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "AccountAppInvite") {
       val builder = AccountAppInviteQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "AccountInvites") {
       val builder = AccountInvitesQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "AccountInvitesHistory") {
       val builder = AccountInvitesHistoryQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "ProfilePrefill") {
       val builder = ProfilePrefillQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "FetchPushSettings") {
       val builder = FetchPushSettingsQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "MyApps") {
       val builder = MyAppsQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "Dialogs") {
       val builder = DialogsQuery.builder()
       builder.after(readString(src, "after"))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "Room") {
       val builder = RoomQuery.builder()
       builder.id(notNull(readString(src, "id")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomTiny") {
       val builder = RoomTinyQuery.builder()
       builder.id(notNull(readString(src, "id")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomSuper") {
       val builder = RoomSuperQuery.builder()
       builder.id(notNull(readString(src, "id")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "GetDraftMessage") {
       val builder = GetDraftMessageQuery.builder()
       builder.conversationId(notNull(readString(src, "conversationId")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "GlobalCounter") {
       val builder = GlobalCounterQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "ChatHistory") {
       val builder = ChatHistoryQuery.builder()
       builder.chatId(notNull(readString(src, "chatId")))
       builder.before(readString(src, "before"))
       builder.first(notNull(readInt(src, "first")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "ChatSearchGroup") {
       val builder = ChatSearchGroupQuery.builder()
       builder.members(notNull(notNullListItems(readStringList(src, "members"))))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomSearchText") {
       val builder = RoomSearchTextQuery.builder()
       builder.query(notNull(readString(src, "query")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomSearch") {
       val builder = RoomSearchQuery.builder()
       builder.query(readString(src, "query"))
       builder.sort(readString(src, "sort"))
       builder.page(readInt(src, "page"))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomMembersShort") {
       val builder = RoomMembersShortQuery.builder()
       builder.roomId(notNull(readString(src, "roomId")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomMembers") {
       val builder = RoomMembersQuery.builder()
       builder.roomId(notNull(readString(src, "roomId")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomInviteLink") {
       val builder = RoomInviteLinkQuery.builder()
       builder.roomId(notNull(readString(src, "roomId")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomInviteInfo") {
       val builder = RoomInviteInfoQuery.builder()
       builder.invite(notNull(readString(src, "invite")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "ResolvedInvite") {
       val builder = ResolvedInviteQuery.builder()
       builder.key(notNull(readString(src, "key")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "Conference") {
       val builder = ConferenceQuery.builder()
       builder.id(notNull(readString(src, "id")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "ConferenceMedia") {
       val builder = ConferenceMediaQuery.builder()
       builder.id(notNull(readString(src, "id")))
       builder.peerId(notNull(readString(src, "peerId")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "AvailableRooms") {
       val builder = AvailableRoomsQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "GlobalSearch") {
       val builder = GlobalSearchQuery.builder()
       builder.query(notNull(readString(src, "query")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "FeatureFlags") {
       val builder = FeatureFlagsQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "FeedHome") {
       val builder = FeedHomeQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "MyOrganizations") {
       val builder = MyOrganizationsQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "Organization") {
       val builder = OrganizationQuery.builder()
       builder.organizationId(notNull(readString(src, "organizationId")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "OrganizationMembersShort") {
       val builder = OrganizationMembersShortQuery.builder()
       builder.organizationId(notNull(readString(src, "organizationId")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "OrganizationProfile") {
       val builder = OrganizationProfileQuery.builder()
       builder.organizationId(notNull(readString(src, "organizationId")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "ExploreOrganizations") {
       val builder = ExploreOrganizationsQuery.builder()
       builder.query(readString(src, "query"))
       builder.prefix(readString(src, "prefix"))
       builder.sort(readString(src, "sort"))
       builder.page(readInt(src, "page"))
       builder.after(readString(src, "after"))
       builder.all(readBool(src, "all"))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "ExploreComunity") {
       val builder = ExploreComunityQuery.builder()
       builder.query(readString(src, "query"))
       builder.sort(readString(src, "sort"))
       builder.page(readInt(src, "page"))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "OrganizationPublicInvite") {
       val builder = OrganizationPublicInviteQuery.builder()
       builder.organizationId(readString(src, "organizationId"))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "OrganizationByPrefix") {
       val builder = OrganizationByPrefixQuery.builder()
       builder.query(notNull(readString(src, "query")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "Permissions") {
       val builder = PermissionsQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "SuperAdmins") {
       val builder = SuperAdminsQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "SuperAccounts") {
       val builder = SuperAccountsQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "SuperAccount") {
       val builder = SuperAccountQuery.builder()
       builder.accountId(notNull(readString(src, "accountId")))
       builder.viaOrgId(readBool(src, "viaOrgId"))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "Profile") {
       val builder = ProfileQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "Settings") {
       val builder = SettingsQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "Users") {
       val builder = UsersQuery.builder()
       builder.query(notNull(readString(src, "query")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "User") {
       val builder = UserQuery.builder()
       builder.userId(notNull(readString(src, "userId")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "Online") {
       val builder = OnlineQuery.builder()
       builder.userId(notNull(readString(src, "userId")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "ExplorePeople") {
       val builder = ExplorePeopleQuery.builder()
       builder.query(readString(src, "query"))
       builder.sort(readString(src, "sort"))
       builder.page(readInt(src, "page"))
       builder.after(readString(src, "after"))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "ResolveShortName") {
       val builder = ResolveShortNameQuery.builder()
       builder.shortname(notNull(readString(src, "shortname")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    throw Error("Unknown query: $name")
}
