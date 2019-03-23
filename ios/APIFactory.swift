import Apollo
class ApiFactory: ApiFactoryBase {
  func buildQuery(name: String, src: NSDictionary) -> Any {
    if (name == "Account") {
      return AccountQuery()
    }
    if (name == "AccountSettings") {
      return AccountSettingsQuery()
    }
    if (name == "AccountInviteInfo") {
      let inviteKey = notNull(readString(src, "inviteKey"))
      return AccountInviteInfoQuery(inviteKey: inviteKey)
    }
    if (name == "AccountAppInviteInfo") {
      let inviteKey = notNull(readString(src, "inviteKey"))
      return AccountAppInviteInfoQuery(inviteKey: inviteKey)
    }
    if (name == "AccountAppInvite") {
      return AccountAppInviteQuery()
    }
    if (name == "AccountInvites") {
      return AccountInvitesQuery()
    }
    if (name == "AccountInvitesHistory") {
      return AccountInvitesHistoryQuery()
    }
    if (name == "ProfilePrefill") {
      return ProfilePrefillQuery()
    }
    if (name == "FetchPushSettings") {
      return FetchPushSettingsQuery()
    }
    if (name == "MyApps") {
      return MyAppsQuery()
    }
    if (name == "Dialogs") {
      let after = readString(src, "after")
      return DialogsQuery(after: after)
    }
    if (name == "Room") {
      let id = notNull(readString(src, "id"))
      return RoomQuery(id: id)
    }
    if (name == "RoomTiny") {
      let id = notNull(readString(src, "id"))
      return RoomTinyQuery(id: id)
    }
    if (name == "RoomSuper") {
      let id = notNull(readString(src, "id"))
      return RoomSuperQuery(id: id)
    }
    if (name == "GetDraftMessage") {
      let conversationId = notNull(readString(src, "conversationId"))
      return GetDraftMessageQuery(conversationId: conversationId)
    }
    if (name == "GlobalCounter") {
      return GlobalCounterQuery()
    }
    if (name == "ChatHistory") {
      let chatId = notNull(readString(src, "chatId"))
      let before = readString(src, "before")
      let first = readInt(src, "first")
      return ChatHistoryQuery(chatId: chatId, before: before, first: first)
    }
    if (name == "ChatSearchGroup") {
      let members = notNull(readList())
      return ChatSearchGroupQuery(members: members)
    }
    if (name == "RoomSearchText") {
      let query = notNull(readString(src, "query"))
      return RoomSearchTextQuery(query: query)
    }
    if (name == "RoomSearch") {
      let query = readString(src, "query")
      let sort = readString(src, "sort")
      let page = readInt(src, "page")
      return RoomSearchQuery(query: query, sort: sort, page: page)
    }
    if (name == "RoomMembersShort") {
      let roomId = notNull(readString(src, "roomId"))
      return RoomMembersShortQuery(roomId: roomId)
    }
    if (name == "RoomMembers") {
      let roomId = notNull(readString(src, "roomId"))
      return RoomMembersQuery(roomId: roomId)
    }
    if (name == "RoomInviteLink") {
      let roomId = notNull(readString(src, "roomId"))
      return RoomInviteLinkQuery(roomId: roomId)
    }
    if (name == "RoomInviteInfo") {
      let invite = notNull(readString(src, "invite"))
      return RoomInviteInfoQuery(invite: invite)
    }
    if (name == "Conference") {
      let id = notNull(readString(src, "id"))
      return ConferenceQuery(id: id)
    }
    if (name == "ConferenceMedia") {
      let id = notNull(readString(src, "id"))
      let peerId = notNull(readString(src, "peerId"))
      return ConferenceMediaQuery(id: id, peerId: peerId)
    }
    if (name == "AvailableRooms") {
      return AvailableRoomsQuery()
    }
    if (name == "GlobalSearch") {
      let query = notNull(readString(src, "query"))
      return GlobalSearchQuery(query: query)
    }
    if (name == "FeatureFlags") {
      return FeatureFlagsQuery()
    }
    if (name == "FeedHome") {
      return FeedHomeQuery()
    }
    if (name == "MyOrganizations") {
      return MyOrganizationsQuery()
    }
    if (name == "Organization") {
      let organizationId = notNull(readString(src, "organizationId"))
      return OrganizationQuery(organizationId: organizationId)
    }
    if (name == "OrganizationMembersShort") {
      let organizationId = notNull(readString(src, "organizationId"))
      return OrganizationMembersShortQuery(organizationId: organizationId)
    }
    if (name == "OrganizationProfile") {
      let organizationId = notNull(readString(src, "organizationId"))
      return OrganizationProfileQuery(organizationId: organizationId)
    }
    if (name == "ExploreOrganizations") {
      let query = readString(src, "query")
      let prefix = readString(src, "prefix")
      let sort = readString(src, "sort")
      let page = readInt(src, "page")
      let after = readString(src, "after")
      let all = readBool(src, "all")
      return ExploreOrganizationsQuery(query: query, prefix: prefix, sort: sort, page: page, after: after, all: all)
    }
    if (name == "ExploreComunity") {
      let query = readString(src, "query")
      let sort = readString(src, "sort")
      let page = readInt(src, "page")
      return ExploreComunityQuery(query: query, sort: sort, page: page)
    }
    if (name == "OrganizationPublicInvite") {
      let organizationId = readString(src, "organizationId")
      return OrganizationPublicInviteQuery(organizationId: organizationId)
    }
    if (name == "OrganizationByPrefix") {
      let query = notNull(readString(src, "query"))
      return OrganizationByPrefixQuery(query: query)
    }
    if (name == "Permissions") {
      return PermissionsQuery()
    }
    if (name == "SuperAdmins") {
      return SuperAdminsQuery()
    }
    if (name == "SuperAccounts") {
      return SuperAccountsQuery()
    }
    if (name == "SuperAccount") {
      let accountId = notNull(readString(src, "accountId"))
      let viaOrgId = readBool(src, "viaOrgId")
      return SuperAccountQuery(accountId: accountId, viaOrgId: viaOrgId)
    }
    if (name == "Profile") {
      return ProfileQuery()
    }
    if (name == "Settings") {
      return SettingsQuery()
    }
    if (name == "Users") {
      let query = notNull(readString(src, "query"))
      return UsersQuery(query: query)
    }
    if (name == "User") {
      let userId = notNull(readString(src, "userId"))
      return UserQuery(userId: userId)
    }
    if (name == "Online") {
      let userId = notNull(readString(src, "userId"))
      return OnlineQuery(userId: userId)
    }
    if (name == "ExplorePeople") {
      let query = readString(src, "query")
      let sort = readString(src, "sort")
      let page = readInt(src, "page")
      let after = readString(src, "after")
      return ExplorePeopleQuery(query: query, sort: sort, page: page, after: after)
    }
    if (name == "ResolveShortName") {
      let shortname = notNull(readString(src, "shortname"))
      return ResolveShortNameQuery(shortname: shortname)
    }
    fatalError()
  }
}
