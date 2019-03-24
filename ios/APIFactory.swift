import Apollo
class ApiFactory: ApiFactoryBase {
  func buildQuery(client: ApolloClient, name: String, src: NSDictionary, handler: @escaping ResponseHandler) {
    if (name == "Account") {
      let requestBody = AccountQuery()
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "AccountSettings") {
      let requestBody = AccountSettingsQuery()
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "AccountInviteInfo") {
      let inviteKey = notNull(readString(src, "inviteKey"))
      let requestBody = AccountInviteInfoQuery(inviteKey: inviteKey)
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "AccountAppInviteInfo") {
      let inviteKey = notNull(readString(src, "inviteKey"))
      let requestBody = AccountAppInviteInfoQuery(inviteKey: inviteKey)
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "AccountAppInvite") {
      let requestBody = AccountAppInviteQuery()
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "AccountInvites") {
      let requestBody = AccountInvitesQuery()
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "AccountInvitesHistory") {
      let requestBody = AccountInvitesHistoryQuery()
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "ProfilePrefill") {
      let requestBody = ProfilePrefillQuery()
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "FetchPushSettings") {
      let requestBody = FetchPushSettingsQuery()
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "MyApps") {
      let requestBody = MyAppsQuery()
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "Dialogs") {
      let after = readString(src, "after")
      let requestBody = DialogsQuery(after: after)
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "Room") {
      let id = notNull(readString(src, "id"))
      let requestBody = RoomQuery(id: id)
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "RoomTiny") {
      let id = notNull(readString(src, "id"))
      let requestBody = RoomTinyQuery(id: id)
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "RoomSuper") {
      let id = notNull(readString(src, "id"))
      let requestBody = RoomSuperQuery(id: id)
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "GetDraftMessage") {
      let conversationId = notNull(readString(src, "conversationId"))
      let requestBody = GetDraftMessageQuery(conversationId: conversationId)
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "GlobalCounter") {
      let requestBody = GlobalCounterQuery()
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "ChatHistory") {
      let chatId = notNull(readString(src, "chatId"))
      let before = readString(src, "before")
      let first = readInt(src, "first")
      let requestBody = ChatHistoryQuery(chatId: chatId, before: before, first: first)
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "ChatSearchGroup") {
      let members = notNull(notNullListItems(readStringList(src, "members")))
      let requestBody = ChatSearchGroupQuery(members: members)
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "RoomSearchText") {
      let query = notNull(readString(src, "query"))
      let requestBody = RoomSearchTextQuery(query: query)
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "RoomSearch") {
      let query = readString(src, "query")
      let sort = readString(src, "sort")
      let page = readInt(src, "page")
      let requestBody = RoomSearchQuery(query: query, sort: sort, page: page)
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "RoomMembersShort") {
      let roomId = notNull(readString(src, "roomId"))
      let requestBody = RoomMembersShortQuery(roomId: roomId)
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "RoomMembers") {
      let roomId = notNull(readString(src, "roomId"))
      let requestBody = RoomMembersQuery(roomId: roomId)
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "RoomInviteLink") {
      let roomId = notNull(readString(src, "roomId"))
      let requestBody = RoomInviteLinkQuery(roomId: roomId)
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "RoomInviteInfo") {
      let invite = notNull(readString(src, "invite"))
      let requestBody = RoomInviteInfoQuery(invite: invite)
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "Conference") {
      let id = notNull(readString(src, "id"))
      let requestBody = ConferenceQuery(id: id)
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "ConferenceMedia") {
      let id = notNull(readString(src, "id"))
      let peerId = notNull(readString(src, "peerId"))
      let requestBody = ConferenceMediaQuery(id: id, peerId: peerId)
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "AvailableRooms") {
      let requestBody = AvailableRoomsQuery()
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "GlobalSearch") {
      let query = notNull(readString(src, "query"))
      let requestBody = GlobalSearchQuery(query: query)
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "FeatureFlags") {
      let requestBody = FeatureFlagsQuery()
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "FeedHome") {
      let requestBody = FeedHomeQuery()
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "MyOrganizations") {
      let requestBody = MyOrganizationsQuery()
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "Organization") {
      let organizationId = notNull(readString(src, "organizationId"))
      let requestBody = OrganizationQuery(organizationId: organizationId)
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "OrganizationMembersShort") {
      let organizationId = notNull(readString(src, "organizationId"))
      let requestBody = OrganizationMembersShortQuery(organizationId: organizationId)
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "OrganizationProfile") {
      let organizationId = notNull(readString(src, "organizationId"))
      let requestBody = OrganizationProfileQuery(organizationId: organizationId)
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "ExploreOrganizations") {
      let query = readString(src, "query")
      let prefix = readString(src, "prefix")
      let sort = readString(src, "sort")
      let page = readInt(src, "page")
      let after = readString(src, "after")
      let all = readBool(src, "all")
      let requestBody = ExploreOrganizationsQuery(query: query, prefix: prefix, sort: sort, page: page, after: after, all: all)
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "ExploreComunity") {
      let query = readString(src, "query")
      let sort = readString(src, "sort")
      let page = readInt(src, "page")
      let requestBody = ExploreComunityQuery(query: query, sort: sort, page: page)
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "OrganizationPublicInvite") {
      let organizationId = readString(src, "organizationId")
      let requestBody = OrganizationPublicInviteQuery(organizationId: organizationId)
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "OrganizationByPrefix") {
      let query = notNull(readString(src, "query"))
      let requestBody = OrganizationByPrefixQuery(query: query)
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "Permissions") {
      let requestBody = PermissionsQuery()
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "SuperAdmins") {
      let requestBody = SuperAdminsQuery()
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "SuperAccounts") {
      let requestBody = SuperAccountsQuery()
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "SuperAccount") {
      let accountId = notNull(readString(src, "accountId"))
      let viaOrgId = readBool(src, "viaOrgId")
      let requestBody = SuperAccountQuery(accountId: accountId, viaOrgId: viaOrgId)
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "Profile") {
      let requestBody = ProfileQuery()
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "Settings") {
      let requestBody = SettingsQuery()
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "Users") {
      let query = notNull(readString(src, "query"))
      let requestBody = UsersQuery(query: query)
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "User") {
      let userId = notNull(readString(src, "userId"))
      let requestBody = UserQuery(userId: userId)
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "Online") {
      let userId = notNull(readString(src, "userId"))
      let requestBody = OnlineQuery(userId: userId)
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "ExplorePeople") {
      let query = readString(src, "query")
      let sort = readString(src, "sort")
      let page = readInt(src, "page")
      let after = readString(src, "after")
      let requestBody = ExplorePeopleQuery(query: query, sort: sort, page: page, after: after)
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "ResolveShortName") {
      let shortname = notNull(readString(src, "shortname"))
      let requestBody = ResolveShortNameQuery(shortname: shortname)
      client.fetch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    fatalError()
  }
}
