import Apollo
class ApiFactory: ApiFactoryBase {
  func runQuery(client: ApolloClient, name: String, src: NSDictionary, handler: @escaping ResponseHandler) {
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

  func watchQuery(client: ApolloClient, name: String, src: NSDictionary, handler: @escaping ResponseHandler) -> WatchCancel {
    if (name == "Account") {
      let requestBody = AccountQuery()
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "AccountSettings") {
      let requestBody = AccountSettingsQuery()
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "AccountInviteInfo") {
      let inviteKey = notNull(readString(src, "inviteKey"))
      let requestBody = AccountInviteInfoQuery(inviteKey: inviteKey)
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "AccountAppInviteInfo") {
      let inviteKey = notNull(readString(src, "inviteKey"))
      let requestBody = AccountAppInviteInfoQuery(inviteKey: inviteKey)
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "AccountAppInvite") {
      let requestBody = AccountAppInviteQuery()
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "AccountInvites") {
      let requestBody = AccountInvitesQuery()
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "AccountInvitesHistory") {
      let requestBody = AccountInvitesHistoryQuery()
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "ProfilePrefill") {
      let requestBody = ProfilePrefillQuery()
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "FetchPushSettings") {
      let requestBody = FetchPushSettingsQuery()
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "MyApps") {
      let requestBody = MyAppsQuery()
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "Dialogs") {
      let after = readString(src, "after")
      let requestBody = DialogsQuery(after: after)
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "Room") {
      let id = notNull(readString(src, "id"))
      let requestBody = RoomQuery(id: id)
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "RoomTiny") {
      let id = notNull(readString(src, "id"))
      let requestBody = RoomTinyQuery(id: id)
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "RoomSuper") {
      let id = notNull(readString(src, "id"))
      let requestBody = RoomSuperQuery(id: id)
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "GetDraftMessage") {
      let conversationId = notNull(readString(src, "conversationId"))
      let requestBody = GetDraftMessageQuery(conversationId: conversationId)
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "GlobalCounter") {
      let requestBody = GlobalCounterQuery()
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "ChatHistory") {
      let chatId = notNull(readString(src, "chatId"))
      let before = readString(src, "before")
      let first = readInt(src, "first")
      let requestBody = ChatHistoryQuery(chatId: chatId, before: before, first: first)
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "ChatSearchGroup") {
      let members = notNull(notNullListItems(readStringList(src, "members")))
      let requestBody = ChatSearchGroupQuery(members: members)
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "RoomSearchText") {
      let query = notNull(readString(src, "query"))
      let requestBody = RoomSearchTextQuery(query: query)
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "RoomSearch") {
      let query = readString(src, "query")
      let sort = readString(src, "sort")
      let page = readInt(src, "page")
      let requestBody = RoomSearchQuery(query: query, sort: sort, page: page)
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "RoomMembersShort") {
      let roomId = notNull(readString(src, "roomId"))
      let requestBody = RoomMembersShortQuery(roomId: roomId)
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "RoomMembers") {
      let roomId = notNull(readString(src, "roomId"))
      let requestBody = RoomMembersQuery(roomId: roomId)
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "RoomInviteLink") {
      let roomId = notNull(readString(src, "roomId"))
      let requestBody = RoomInviteLinkQuery(roomId: roomId)
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "RoomInviteInfo") {
      let invite = notNull(readString(src, "invite"))
      let requestBody = RoomInviteInfoQuery(invite: invite)
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "Conference") {
      let id = notNull(readString(src, "id"))
      let requestBody = ConferenceQuery(id: id)
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "ConferenceMedia") {
      let id = notNull(readString(src, "id"))
      let peerId = notNull(readString(src, "peerId"))
      let requestBody = ConferenceMediaQuery(id: id, peerId: peerId)
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "AvailableRooms") {
      let requestBody = AvailableRoomsQuery()
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "GlobalSearch") {
      let query = notNull(readString(src, "query"))
      let requestBody = GlobalSearchQuery(query: query)
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "FeatureFlags") {
      let requestBody = FeatureFlagsQuery()
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "FeedHome") {
      let requestBody = FeedHomeQuery()
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "MyOrganizations") {
      let requestBody = MyOrganizationsQuery()
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "Organization") {
      let organizationId = notNull(readString(src, "organizationId"))
      let requestBody = OrganizationQuery(organizationId: organizationId)
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "OrganizationMembersShort") {
      let organizationId = notNull(readString(src, "organizationId"))
      let requestBody = OrganizationMembersShortQuery(organizationId: organizationId)
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "OrganizationProfile") {
      let organizationId = notNull(readString(src, "organizationId"))
      let requestBody = OrganizationProfileQuery(organizationId: organizationId)
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "ExploreOrganizations") {
      let query = readString(src, "query")
      let prefix = readString(src, "prefix")
      let sort = readString(src, "sort")
      let page = readInt(src, "page")
      let after = readString(src, "after")
      let all = readBool(src, "all")
      let requestBody = ExploreOrganizationsQuery(query: query, prefix: prefix, sort: sort, page: page, after: after, all: all)
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "ExploreComunity") {
      let query = readString(src, "query")
      let sort = readString(src, "sort")
      let page = readInt(src, "page")
      let requestBody = ExploreComunityQuery(query: query, sort: sort, page: page)
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "OrganizationPublicInvite") {
      let organizationId = readString(src, "organizationId")
      let requestBody = OrganizationPublicInviteQuery(organizationId: organizationId)
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "OrganizationByPrefix") {
      let query = notNull(readString(src, "query"))
      let requestBody = OrganizationByPrefixQuery(query: query)
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "Permissions") {
      let requestBody = PermissionsQuery()
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "SuperAdmins") {
      let requestBody = SuperAdminsQuery()
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "SuperAccounts") {
      let requestBody = SuperAccountsQuery()
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "SuperAccount") {
      let accountId = notNull(readString(src, "accountId"))
      let viaOrgId = readBool(src, "viaOrgId")
      let requestBody = SuperAccountQuery(accountId: accountId, viaOrgId: viaOrgId)
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "Profile") {
      let requestBody = ProfileQuery()
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "Settings") {
      let requestBody = SettingsQuery()
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "Users") {
      let query = notNull(readString(src, "query"))
      let requestBody = UsersQuery(query: query)
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "User") {
      let userId = notNull(readString(src, "userId"))
      let requestBody = UserQuery(userId: userId)
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "Online") {
      let userId = notNull(readString(src, "userId"))
      let requestBody = OnlineQuery(userId: userId)
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "ExplorePeople") {
      let query = readString(src, "query")
      let sort = readString(src, "sort")
      let page = readInt(src, "page")
      let after = readString(src, "after")
      let requestBody = ExplorePeopleQuery(query: query, sort: sort, page: page, after: after)
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    if (name == "ResolveShortName") {
      let shortname = notNull(readString(src, "shortname"))
      let requestBody = ResolveShortNameQuery(shortname: shortname)
      let res = client.watch(query: requestBody, cachePolicy: CachePolicy.returnCacheDataElseFetch, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return { () in res.cancel() }
    }
    fatalError()
  }

  func runMutation(client: ApolloClient, name: String, src: NSDictionary, handler: @escaping ResponseHandler) {
    if (name == "CreateOrganization") {
      let input = notNull(readCreateOrganizationInput(src, "input"))
      let requestBody = CreateOrganizationMutation(input: input)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "AccountInviteJoin") {
      let inviteKey = notNull(readString(src, "inviteKey"))
      let requestBody = AccountInviteJoinMutation(inviteKey: inviteKey)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "AccountCreateInvite") {
      let requestBody = AccountCreateInviteMutation()
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "AccountDestroyInvite") {
      let id = notNull(readString(src, "id"))
      let requestBody = AccountDestroyInviteMutation(id: id)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "CreateUserProfileAndOrganization") {
      let user = notNull(readProfileInput(src, "user"))
      let organization = notNull(readCreateOrganizationInput(src, "organization"))
      let requestBody = CreateUserProfileAndOrganizationMutation(user: user, organization: organization)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "ReportOnline") {
      let active = readBool(src, "active")
      let platform = readString(src, "platform")
      let requestBody = ReportOnlineMutation(active: active, platform: platform)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "RegisterPush") {
      let endpoint = notNull(readString(src, "endpoint"))
      let type = notNull(readPushType(src, "type"))
      let requestBody = RegisterPushMutation(endpoint: endpoint, type: type)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "RegisterWebPush") {
      let endpoint = notNull(readString(src, "endpoint"))
      let requestBody = RegisterWebPushMutation(endpoint: endpoint)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "CreateApp") {
      let name = notNull(readString(src, "name"))
      let shortname = readString(src, "shortname")
      let photoRef = readImageRefInput(src, "photoRef")
      let about = readString(src, "about")
      let requestBody = CreateAppMutation(name: name, shortname: shortname, photoRef: photoRef, about: about)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "UpdateApp") {
      let appId = notNull(readString(src, "appId"))
      let input = notNull(readAppProfileInput(src, "input"))
      let requestBody = UpdateAppMutation(appId: appId, input: input)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "RefreshAppToken") {
      let appId = notNull(readString(src, "appId"))
      let requestBody = RefreshAppTokenMutation(appId: appId)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "AddAppToChat") {
      let appId = notNull(readString(src, "appId"))
      let chatId = notNull(readString(src, "chatId"))
      let requestBody = AddAppToChatMutation(appId: appId, chatId: chatId)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "PinMessage") {
      let chatId = notNull(readString(src, "chatId"))
      let messageId = notNull(readString(src, "messageId"))
      let requestBody = PinMessageMutation(chatId: chatId, messageId: messageId)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "UnpinMessage") {
      let chatId = notNull(readString(src, "chatId"))
      let requestBody = UnpinMessageMutation(chatId: chatId)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "MessageSetReaction") {
      let messageId = notNull(readString(src, "messageId"))
      let reaction = notNull(readString(src, "reaction"))
      let requestBody = MessageSetReactionMutation(messageId: messageId, reaction: reaction)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "SwitchReaction") {
      let messageId = notNull(readString(src, "messageId"))
      let from = notNull(readString(src, "from"))
      let to = notNull(readString(src, "to"))
      let requestBody = SwitchReactionMutation(messageId: messageId, from: from, to: to)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "MessageUnsetReaction") {
      let messageId = notNull(readString(src, "messageId"))
      let reaction = notNull(readString(src, "reaction"))
      let requestBody = MessageUnsetReactionMutation(messageId: messageId, reaction: reaction)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "SendPostMessage") {
      let conversationId = notNull(readString(src, "conversationId"))
      let title = notNull(readString(src, "title"))
      let text = notNull(readString(src, "text"))
      let attachments = notNullListItems(readStringList(src, "attachments"))
      let postType = notNull(readPostMessageType(src, "postType"))
      let requestBody = SendPostMessageMutation(conversationId: conversationId, title: title, text: text, attachments: attachments, postType: postType)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "EditPostMessage") {
      let messageId = notNull(readString(src, "messageId"))
      let title = notNull(readString(src, "title"))
      let text = notNull(readString(src, "text"))
      let attachments = notNullListItems(readStringList(src, "attachments"))
      let postType = notNull(readPostMessageType(src, "postType"))
      let requestBody = EditPostMessageMutation(messageId: messageId, title: title, text: text, attachments: attachments, postType: postType)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "RespondPostMessage") {
      let messageId = notNull(readString(src, "messageId"))
      let buttonId = notNull(readString(src, "buttonId"))
      let reaction = notNull(readString(src, "reaction"))
      let requestBody = RespondPostMessageMutation(messageId: messageId, buttonId: buttonId, reaction: reaction)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "SaveDraftMessage") {
      let conversationId = notNull(readString(src, "conversationId"))
      let message = notNull(readString(src, "message"))
      let requestBody = SaveDraftMessageMutation(conversationId: conversationId, message: message)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "SendMessage") {
      let message = readString(src, "message")
      let file = readString(src, "file")
      let repeatKey = readString(src, "repeatKey")
      let replyMessages = notNullListItems(readStringList(src, "replyMessages"))
      let mentions = notNullListItems(readStringList(src, "mentions"))
      let room = notNull(readString(src, "room"))
      let requestBody = SendMessageMutation(message: message, file: file, repeatKey: repeatKey, replyMessages: replyMessages, mentions: mentions, room: room)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "ReplyMessage") {
      let roomId = notNull(readString(src, "roomId"))
      let message = readString(src, "message")
      let replyMessages = notNullListItems(readStringList(src, "replyMessages"))
      let mentions = notNullListItems(readStringList(src, "mentions"))
      let requestBody = ReplyMessageMutation(roomId: roomId, message: message, replyMessages: replyMessages, mentions: mentions)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "RoomRead") {
      let id = notNull(readString(src, "id"))
      let mid = notNull(readString(src, "mid"))
      let requestBody = RoomReadMutation(id: id, mid: mid)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "RoomCreate") {
      let kind = notNull(readSharedRoomKind(src, "kind"))
      let members = notNull(notNullListItems(readStringList(src, "members")))
      let message = readString(src, "message")
      let title = readString(src, "title")
      let description = readString(src, "description")
      let photoRef = readImageRefInput(src, "photoRef")
      let organizationId = readString(src, "organizationId")
      let requestBody = RoomCreateMutation(kind: kind, members: members, message: message, title: title, description: description, photoRef: photoRef, organizationId: organizationId)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "RoomCreateIntro") {
      let roomId = notNull(readString(src, "roomId"))
      let uid = notNull(readString(src, "uid"))
      let about = readString(src, "about")
      let file = readString(src, "file")
      let requestBody = RoomCreateIntroMutation(roomId: roomId, uid: uid, about: about, file: file)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "RoomEditIntro") {
      let messageId = notNull(readString(src, "messageId"))
      let uid = notNull(readString(src, "uid"))
      let about = readString(src, "about")
      let file = readString(src, "file")
      let requestBody = RoomEditIntroMutation(messageId: messageId, uid: uid, about: about, file: file)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "SetTyping") {
      let conversationId = notNull(readString(src, "conversationId"))
      let requestBody = SetTypingMutation(conversationId: conversationId)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "CancelTyping") {
      let conversationId = notNull(readString(src, "conversationId"))
      let requestBody = CancelTypingMutation(conversationId: conversationId)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "RoomAddMember") {
      let roomId = notNull(readString(src, "roomId"))
      let userId = notNull(readString(src, "userId"))
      let requestBody = RoomAddMemberMutation(roomId: roomId, userId: userId)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "RoomDeclineJoinReuest") {
      let roomId = notNull(readString(src, "roomId"))
      let userId = notNull(readString(src, "userId"))
      let requestBody = RoomDeclineJoinReuestMutation(roomId: roomId, userId: userId)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "RoomAddMembers") {
      let roomId = notNull(readString(src, "roomId"))
      let invites = notNull(notNullListItems(readRoomInviteInputList(src, "invites")))
      let requestBody = RoomAddMembersMutation(roomId: roomId, invites: invites)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "RoomKick") {
      let roomId = notNull(readString(src, "roomId"))
      let userId = notNull(readString(src, "userId"))
      let requestBody = RoomKickMutation(roomId: roomId, userId: userId)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "RoomLeave") {
      let roomId = notNull(readString(src, "roomId"))
      let requestBody = RoomLeaveMutation(roomId: roomId)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "RoomAlterFeatured") {
      let roomId = notNull(readString(src, "roomId"))
      let featured = notNull(readBool(src, "featured"))
      let requestBody = RoomAlterFeaturedMutation(roomId: roomId, featured: featured)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "RoomAlterHidden") {
      let roomId = notNull(readString(src, "roomId"))
      let listed = notNull(readBool(src, "listed"))
      let requestBody = RoomAlterHiddenMutation(roomId: roomId, listed: listed)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "RoomSettingsUpdate") {
      let settings = notNull(readRoomUserNotificaionSettingsInput(src, "settings"))
      let roomId = notNull(readString(src, "roomId"))
      let requestBody = RoomSettingsUpdateMutation(settings: settings, roomId: roomId)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "RoomJoin") {
      let roomId = notNull(readString(src, "roomId"))
      let requestBody = RoomJoinMutation(roomId: roomId)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "RoomSendEmailInvite") {
      let roomId = notNull(readString(src, "roomId"))
      let inviteRequests = notNull(notNullListItems(readRoomInviteEmailRequestList(src, "inviteRequests")))
      let requestBody = RoomSendEmailInviteMutation(roomId: roomId, inviteRequests: inviteRequests)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "RoomJoinInviteLink") {
      let invite = notNull(readString(src, "invite"))
      let requestBody = RoomJoinInviteLinkMutation(invite: invite)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "RoomRenewInviteLink") {
      let roomId = notNull(readString(src, "roomId"))
      let requestBody = RoomRenewInviteLinkMutation(roomId: roomId)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "RoomUpdate") {
      let roomId = notNull(readString(src, "roomId"))
      let input = notNull(readRoomUpdateInput(src, "input"))
      let requestBody = RoomUpdateMutation(roomId: roomId, input: input)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "RoomDeleteMessage") {
      let messageId = notNull(readString(src, "messageId"))
      let requestBody = RoomDeleteMessageMutation(messageId: messageId)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "RoomDeleteMessages") {
      let mids = notNull(notNullListItems(readStringList(src, "mids")))
      let requestBody = RoomDeleteMessagesMutation(mids: mids)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "RoomDeleteUrlAugmentation") {
      let messageId = notNull(readString(src, "messageId"))
      let requestBody = RoomDeleteUrlAugmentationMutation(messageId: messageId)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "RoomEditMessage") {
      let messageId = notNull(readString(src, "messageId"))
      let message = readString(src, "message")
      let file = readString(src, "file")
      let replyMessages = notNullListItems(readStringList(src, "replyMessages"))
      let mentions = notNullListItems(readStringList(src, "mentions"))
      let requestBody = RoomEditMessageMutation(messageId: messageId, message: message, file: file, replyMessages: replyMessages, mentions: mentions)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "MarkSequenceRead") {
      let seq = notNull(readInt(src, "seq"))
      let requestBody = MarkSequenceReadMutation(seq: seq)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "UpdateWelcomeMessage") {
      let roomId = notNull(readString(src, "roomId"))
      let welcomeMessageIsOn = notNull(readBool(src, "welcomeMessageIsOn"))
      let welcomeMessageSender = readString(src, "welcomeMessageSender")
      let welcomeMessageText = readString(src, "welcomeMessageText")
      let requestBody = UpdateWelcomeMessageMutation(roomId: roomId, welcomeMessageIsOn: welcomeMessageIsOn, welcomeMessageSender: welcomeMessageSender, welcomeMessageText: welcomeMessageText)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "ConferenceJoin") {
      let id = notNull(readString(src, "id"))
      let requestBody = ConferenceJoinMutation(id: id)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "ConferenceLeave") {
      let id = notNull(readString(src, "id"))
      let peerId = notNull(readString(src, "peerId"))
      let requestBody = ConferenceLeaveMutation(id: id, peerId: peerId)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "ConferenceKeepAlive") {
      let id = notNull(readString(src, "id"))
      let peerId = notNull(readString(src, "peerId"))
      let requestBody = ConferenceKeepAliveMutation(id: id, peerId: peerId)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "ConferenceOffer") {
      let id = notNull(readString(src, "id"))
      let ownPeerId = notNull(readString(src, "ownPeerId"))
      let peerId = notNull(readString(src, "peerId"))
      let offer = notNull(readString(src, "offer"))
      let requestBody = ConferenceOfferMutation(id: id, ownPeerId: ownPeerId, peerId: peerId, offer: offer)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "ConferenceAnswer") {
      let id = notNull(readString(src, "id"))
      let ownPeerId = notNull(readString(src, "ownPeerId"))
      let peerId = notNull(readString(src, "peerId"))
      let answer = notNull(readString(src, "answer"))
      let requestBody = ConferenceAnswerMutation(id: id, ownPeerId: ownPeerId, peerId: peerId, answer: answer)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "ConferenceCandidate") {
      let id = notNull(readString(src, "id"))
      let ownPeerId = notNull(readString(src, "ownPeerId"))
      let peerId = notNull(readString(src, "peerId"))
      let candidate = notNull(readString(src, "candidate"))
      let requestBody = ConferenceCandidateMutation(id: id, ownPeerId: ownPeerId, peerId: peerId, candidate: candidate)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "MediaOffer") {
      let id = notNull(readString(src, "id"))
      let peerId = notNull(readString(src, "peerId"))
      let offer = notNull(readString(src, "offer"))
      let requestBody = MediaOfferMutation(id: id, peerId: peerId, offer: offer)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "MediaAnswer") {
      let id = notNull(readString(src, "id"))
      let peerId = notNull(readString(src, "peerId"))
      let answer = notNull(readString(src, "answer"))
      let requestBody = MediaAnswerMutation(id: id, peerId: peerId, answer: answer)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "MediaCandidate") {
      let id = notNull(readString(src, "id"))
      let peerId = notNull(readString(src, "peerId"))
      let candidate = notNull(readString(src, "candidate"))
      let requestBody = MediaCandidateMutation(id: id, peerId: peerId, candidate: candidate)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "FeatureFlagAdd") {
      let key = notNull(readString(src, "key"))
      let title = notNull(readString(src, "title"))
      let requestBody = FeatureFlagAddMutation(key: key, title: title)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "FeatureFlagEnable") {
      let accountId = notNull(readString(src, "accountId"))
      let featureId = notNull(readString(src, "featureId"))
      let requestBody = FeatureFlagEnableMutation(accountId: accountId, featureId: featureId)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "FeatureFlagDisable") {
      let accountId = notNull(readString(src, "accountId"))
      let featureId = notNull(readString(src, "featureId"))
      let requestBody = FeatureFlagDisableMutation(accountId: accountId, featureId: featureId)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "FeedPost") {
      let message = notNull(readString(src, "message"))
      let requestBody = FeedPostMutation(message: message)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "UpdateOrganization") {
      let input = notNull(readUpdateOrganizationProfileInput(src, "input"))
      let organizationId = readString(src, "organizationId")
      let requestBody = UpdateOrganizationMutation(input: input, organizationId: organizationId)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "SetOrgShortname") {
      let organizationId = notNull(readString(src, "organizationId"))
      let shortname = notNull(readString(src, "shortname"))
      let requestBody = SetOrgShortnameMutation(organizationId: organizationId, shortname: shortname)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "OrganizationChangeMemberRole") {
      let memberId = notNull(readString(src, "memberId"))
      let newRole = notNull(readOrganizationMemberRole(src, "newRole"))
      let organizationId = notNull(readString(src, "organizationId"))
      let requestBody = OrganizationChangeMemberRoleMutation(memberId: memberId, newRole: newRole, organizationId: organizationId)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "OrganizationAddMember") {
      let userIds = notNullListItems(readStringList(src, "userIds"))
      let organizationId = notNull(readString(src, "organizationId"))
      let requestBody = OrganizationAddMemberMutation(userIds: userIds, organizationId: organizationId)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "OrganizationRemoveMember") {
      let memberId = notNull(readString(src, "memberId"))
      let organizationId = notNull(readString(src, "organizationId"))
      let requestBody = OrganizationRemoveMemberMutation(memberId: memberId, organizationId: organizationId)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "OrganizationInviteMembers") {
      let inviteRequests = notNull(notNullListItems(readInviteRequestList(src, "inviteRequests")))
      let organizationId = readString(src, "organizationId")
      let requestBody = OrganizationInviteMembersMutation(inviteRequests: inviteRequests, organizationId: organizationId)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "OrganizationCreatePublicInvite") {
      let expirationDays = readInt(src, "expirationDays")
      let organizationId = readString(src, "organizationId")
      let requestBody = OrganizationCreatePublicInviteMutation(expirationDays: expirationDays, organizationId: organizationId)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "DeleteOrganization") {
      let organizationId = notNull(readString(src, "organizationId"))
      let requestBody = DeleteOrganizationMutation(organizationId: organizationId)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "OrganizationMemberRemove") {
      let userId = notNull(readString(src, "userId"))
      let organizationId = notNull(readString(src, "organizationId"))
      let requestBody = OrganizationMemberRemoveMutation(userId: userId, organizationId: organizationId)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "OrganizationActivateByInvite") {
      let inviteKey = notNull(readString(src, "inviteKey"))
      let requestBody = OrganizationActivateByInviteMutation(inviteKey: inviteKey)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "OrganizationAlterPublished") {
      let organizationId = notNull(readString(src, "organizationId"))
      let published = notNull(readBool(src, "published"))
      let requestBody = OrganizationAlterPublishedMutation(organizationId: organizationId, published: published)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "DebugMails") {
      let type = notNull(readDebugEmailType(src, "type"))
      let requestBody = DebugMailsMutation(type: type)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "SuperAccountRename") {
      let accountId = notNull(readString(src, "accountId"))
      let title = notNull(readString(src, "title"))
      let requestBody = SuperAccountRenameMutation(accountId: accountId, title: title)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "SuperAccountActivate") {
      let accountId = notNull(readString(src, "accountId"))
      let requestBody = SuperAccountActivateMutation(accountId: accountId)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "SuperAccountSuspend") {
      let accountId = notNull(readString(src, "accountId"))
      let requestBody = SuperAccountSuspendMutation(accountId: accountId)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "SuperAccountPend") {
      let accountId = notNull(readString(src, "accountId"))
      let requestBody = SuperAccountPendMutation(accountId: accountId)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "SuperAccountAdd") {
      let title = notNull(readString(src, "title"))
      let requestBody = SuperAccountAddMutation(title: title)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "SuperAccountMemberAdd") {
      let accountId = notNull(readString(src, "accountId"))
      let userId = notNull(readString(src, "userId"))
      let requestBody = SuperAccountMemberAddMutation(accountId: accountId, userId: userId)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "SuperAccountMemberRemove") {
      let accountId = notNull(readString(src, "accountId"))
      let userId = notNull(readString(src, "userId"))
      let requestBody = SuperAccountMemberRemoveMutation(accountId: accountId, userId: userId)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "SuperAdminAdd") {
      let userId = notNull(readString(src, "userId"))
      let role = notNull(readSuperAdminRole(src, "role"))
      let requestBody = SuperAdminAddMutation(userId: userId, role: role)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "SuperAdminRemove") {
      let userId = notNull(readString(src, "userId"))
      let requestBody = SuperAdminRemoveMutation(userId: userId)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "ProfileUpdate") {
      let input = notNull(readUpdateProfileInput(src, "input"))
      let uid = readString(src, "uid")
      let requestBody = ProfileUpdateMutation(input: input, uid: uid)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "SetUserShortname") {
      let shortname = notNull(readString(src, "shortname"))
      let requestBody = SetUserShortnameMutation(shortname: shortname)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "ProfileCreate") {
      let input = notNull(readCreateProfileInput(src, "input"))
      let requestBody = ProfileCreateMutation(input: input)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "SettingsUpdate") {
      let input = readUpdateSettingsInput(src, "input")
      let requestBody = SettingsUpdateMutation(input: input)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    if (name == "PersistEvents") {
      let did = notNull(readString(src, "did"))
      let events = notNull(notNullListItems(readEventList(src, "events")))
      let requestBody = PersistEventsMutation(did: did, events: events)
      client.perform(mutation: requestBody, queue: DispatchQueue.main) { (r, e) in
          handler(r!.data!.resultMap, nil)
      }
      return
    }
    fatalError()
  }

  func readNotificationMessages(_ src: NSDictionary, _ name: String) -> NotificationMessages? {
    let v = self.readString(src, name);
    if v != nil {
      return NotificationMessages.init(rawValue: v!)
     } else {
       return nil
     }
  }
  func readOrganizationMemberRole(_ src: NSDictionary, _ name: String) -> OrganizationMemberRole? {
    let v = self.readString(src, name);
    if v != nil {
      return OrganizationMemberRole.init(rawValue: v!)
     } else {
       return nil
     }
  }
  func readSharedRoomKind(_ src: NSDictionary, _ name: String) -> SharedRoomKind? {
    let v = self.readString(src, name);
    if v != nil {
      return SharedRoomKind.init(rawValue: v!)
     } else {
       return nil
     }
  }
  func readRoomMemberRole(_ src: NSDictionary, _ name: String) -> RoomMemberRole? {
    let v = self.readString(src, name);
    if v != nil {
      return RoomMemberRole.init(rawValue: v!)
     } else {
       return nil
     }
  }
  func readPostMessageType(_ src: NSDictionary, _ name: String) -> PostMessageType? {
    let v = self.readString(src, name);
    if v != nil {
      return PostMessageType.init(rawValue: v!)
     } else {
       return nil
     }
  }
  func readEmailFrequency(_ src: NSDictionary, _ name: String) -> EmailFrequency? {
    let v = self.readString(src, name);
    if v != nil {
      return EmailFrequency.init(rawValue: v!)
     } else {
       return nil
     }
  }
  func readNotificationsDelay(_ src: NSDictionary, _ name: String) -> NotificationsDelay? {
    let v = self.readString(src, name);
    if v != nil {
      return NotificationsDelay.init(rawValue: v!)
     } else {
       return nil
     }
  }
  func readSuperAdminRole(_ src: NSDictionary, _ name: String) -> SuperAdminRole? {
    let v = self.readString(src, name);
    if v != nil {
      return SuperAdminRole.init(rawValue: v!)
     } else {
       return nil
     }
  }
  func parseImageRefInput(_ src: NSDictionary) -> ImageRefInput {
    let uuid = notNull(readString(src, "uuid"))
    let crop = readImageCropInput(src, "crop")
    return ImageRefInput(uuid: uuid, crop: crop)
  }
  func readImageRefInput(_ src: NSDictionary, _ name: String) -> ImageRefInput? {
    let v = src[name]
    if v != nil {
      return self.parseImageRefInput(v as! NSDictionary)
    } else {
      return nil
    }
  }
  func readImageRefInputList(_ src: NSDictionary, _ name: String) -> [ImageRefInput?]? {
    let v = src[name]
    if v != nil {
      let items = v as! [NSDictionary?]
      var res: [ImageRefInput?] = []
      for i in 0..<items.count {
        let itm = items[i]
        if itm != nil {
          res.append(self.parseImageRefInput(itm!))
        } else {
          res.append(nil)
        }
      }
    } else {
      return nil
    }
  }
  func parseImageCropInput(_ src: NSDictionary) -> ImageCropInput {
    let x = notNull(readInt(src, "x"))
    let y = notNull(readInt(src, "y"))
    let w = notNull(readInt(src, "w"))
    let h = notNull(readInt(src, "h"))
    return ImageCropInput(x: x, y: y, w: w, h: h)
  }
  func readImageCropInput(_ src: NSDictionary, _ name: String) -> ImageCropInput? {
    let v = src[name]
    if v != nil {
      return self.parseImageCropInput(v as! NSDictionary)
    } else {
      return nil
    }
  }
  func readImageCropInputList(_ src: NSDictionary, _ name: String) -> [ImageCropInput?]? {
    let v = src[name]
    if v != nil {
      let items = v as! [NSDictionary?]
      var res: [ImageCropInput?] = []
      for i in 0..<items.count {
        let itm = items[i]
        if itm != nil {
          res.append(self.parseImageCropInput(itm!))
        } else {
          res.append(nil)
        }
      }
    } else {
      return nil
    }
  }
  func parseProfileInput(_ src: NSDictionary) -> ProfileInput {
    let firstName = readString(src, "firstName")
    let lastName = readString(src, "lastName")
    let photoRef = readImageRefInput(src, "photoRef")
    let phone = readString(src, "phone")
    let email = readString(src, "email")
    let website = readString(src, "website")
    let about = readString(src, "about")
    let location = readString(src, "location")
    let linkedin = readString(src, "linkedin")
    let twitter = readString(src, "twitter")
    let primaryOrganization = readString(src, "primaryOrganization")
    return ProfileInput(firstName: firstName, lastName: lastName, photoRef: photoRef, phone: phone, email: email, website: website, about: about, location: location, linkedin: linkedin, twitter: twitter, primaryOrganization: primaryOrganization)
  }
  func readProfileInput(_ src: NSDictionary, _ name: String) -> ProfileInput? {
    let v = src[name]
    if v != nil {
      return self.parseProfileInput(v as! NSDictionary)
    } else {
      return nil
    }
  }
  func readProfileInputList(_ src: NSDictionary, _ name: String) -> [ProfileInput?]? {
    let v = src[name]
    if v != nil {
      let items = v as! [NSDictionary?]
      var res: [ProfileInput?] = []
      for i in 0..<items.count {
        let itm = items[i]
        if itm != nil {
          res.append(self.parseProfileInput(itm!))
        } else {
          res.append(nil)
        }
      }
    } else {
      return nil
    }
  }
  func parseCreateProfileInput(_ src: NSDictionary) -> CreateProfileInput {
    let firstName = notNull(readString(src, "firstName"))
    let lastName = readString(src, "lastName")
    let photoRef = readImageRefInput(src, "photoRef")
    let phone = readString(src, "phone")
    let email = readString(src, "email")
    let about = readString(src, "about")
    let location = readString(src, "location")
    let website = readString(src, "website")
    let linkedin = readString(src, "linkedin")
    let twitter = readString(src, "twitter")
    let primaryOrganization = readString(src, "primaryOrganization")
    return CreateProfileInput(firstName: firstName, lastName: lastName, photoRef: photoRef, phone: phone, email: email, about: about, location: location, website: website, linkedin: linkedin, twitter: twitter, primaryOrganization: primaryOrganization)
  }
  func readCreateProfileInput(_ src: NSDictionary, _ name: String) -> CreateProfileInput? {
    let v = src[name]
    if v != nil {
      return self.parseCreateProfileInput(v as! NSDictionary)
    } else {
      return nil
    }
  }
  func readCreateProfileInputList(_ src: NSDictionary, _ name: String) -> [CreateProfileInput?]? {
    let v = src[name]
    if v != nil {
      let items = v as! [NSDictionary?]
      var res: [CreateProfileInput?] = []
      for i in 0..<items.count {
        let itm = items[i]
        if itm != nil {
          res.append(self.parseCreateProfileInput(itm!))
        } else {
          res.append(nil)
        }
      }
    } else {
      return nil
    }
  }
  func parseUpdateProfileInput(_ src: NSDictionary) -> UpdateProfileInput {
    let firstName = readString(src, "firstName")
    let lastName = readString(src, "lastName")
    let photoRef = readImageRefInput(src, "photoRef")
    let phone = readString(src, "phone")
    let email = readString(src, "email")
    let website = readString(src, "website")
    let about = readString(src, "about")
    let location = readString(src, "location")
    let linkedin = readString(src, "linkedin")
    let twitter = readString(src, "twitter")
    let primaryOrganization = readString(src, "primaryOrganization")
    let alphaRole = readString(src, "alphaRole")
    let alphaLocations = notNullListItems(readStringList(src, "alphaLocations"))
    let alphaLinkedin = readString(src, "alphaLinkedin")
    let alphaTwitter = readString(src, "alphaTwitter")
    let alphaPrimaryOrganizationId = readString(src, "alphaPrimaryOrganizationId")
    return UpdateProfileInput(firstName: firstName, lastName: lastName, photoRef: photoRef, phone: phone, email: email, website: website, about: about, location: location, linkedin: linkedin, twitter: twitter, primaryOrganization: primaryOrganization, alphaRole: alphaRole, alphaLocations: alphaLocations, alphaLinkedin: alphaLinkedin, alphaTwitter: alphaTwitter, alphaPrimaryOrganizationId: alphaPrimaryOrganizationId)
  }
  func readUpdateProfileInput(_ src: NSDictionary, _ name: String) -> UpdateProfileInput? {
    let v = src[name]
    if v != nil {
      return self.parseUpdateProfileInput(v as! NSDictionary)
    } else {
      return nil
    }
  }
  func readUpdateProfileInputList(_ src: NSDictionary, _ name: String) -> [UpdateProfileInput?]? {
    let v = src[name]
    if v != nil {
      let items = v as! [NSDictionary?]
      var res: [UpdateProfileInput?] = []
      for i in 0..<items.count {
        let itm = items[i]
        if itm != nil {
          res.append(self.parseUpdateProfileInput(itm!))
        } else {
          res.append(nil)
        }
      }
    } else {
      return nil
    }
  }
  func parseCreateOrganizationInput(_ src: NSDictionary) -> CreateOrganizationInput {
    let id = readString(src, "id")
    let name = notNull(readString(src, "name"))
    let website = readString(src, "website")
    let personal = notNull(readBool(src, "personal"))
    let photoRef = readImageRefInput(src, "photoRef")
    let about = readString(src, "about")
    let isCommunity = readBool(src, "isCommunity")
    return CreateOrganizationInput(id: id, name: name, website: website, personal: personal, photoRef: photoRef, about: about, isCommunity: isCommunity)
  }
  func readCreateOrganizationInput(_ src: NSDictionary, _ name: String) -> CreateOrganizationInput? {
    let v = src[name]
    if v != nil {
      return self.parseCreateOrganizationInput(v as! NSDictionary)
    } else {
      return nil
    }
  }
  func readCreateOrganizationInputList(_ src: NSDictionary, _ name: String) -> [CreateOrganizationInput?]? {
    let v = src[name]
    if v != nil {
      let items = v as! [NSDictionary?]
      var res: [CreateOrganizationInput?] = []
      for i in 0..<items.count {
        let itm = items[i]
        if itm != nil {
          res.append(self.parseCreateOrganizationInput(itm!))
        } else {
          res.append(nil)
        }
      }
    } else {
      return nil
    }
  }
  func readDebugEmailType(_ src: NSDictionary, _ name: String) -> DebugEmailType? {
    let v = self.readString(src, name);
    if v != nil {
      return DebugEmailType.init(rawValue: v!)
     } else {
       return nil
     }
  }
  func parseUpdateSettingsInput(_ src: NSDictionary) -> UpdateSettingsInput {
    let emailFrequency = readEmailFrequency(src, "emailFrequency")
    let desktopNotifications = readNotificationMessages(src, "desktopNotifications")
    let mobileNotifications = readNotificationMessages(src, "mobileNotifications")
    let mobileAlert = readBool(src, "mobileAlert")
    let mobileIncludeText = readBool(src, "mobileIncludeText")
    let mute = readBool(src, "mute")
    let notificationsDelay = readNotificationsDelay(src, "notificationsDelay")
    return UpdateSettingsInput(emailFrequency: emailFrequency, desktopNotifications: desktopNotifications, mobileNotifications: mobileNotifications, mobileAlert: mobileAlert, mobileIncludeText: mobileIncludeText, mute: mute, notificationsDelay: notificationsDelay)
  }
  func readUpdateSettingsInput(_ src: NSDictionary, _ name: String) -> UpdateSettingsInput? {
    let v = src[name]
    if v != nil {
      return self.parseUpdateSettingsInput(v as! NSDictionary)
    } else {
      return nil
    }
  }
  func readUpdateSettingsInputList(_ src: NSDictionary, _ name: String) -> [UpdateSettingsInput?]? {
    let v = src[name]
    if v != nil {
      let items = v as! [NSDictionary?]
      var res: [UpdateSettingsInput?] = []
      for i in 0..<items.count {
        let itm = items[i]
        if itm != nil {
          res.append(self.parseUpdateSettingsInput(itm!))
        } else {
          res.append(nil)
        }
      }
    } else {
      return nil
    }
  }
  func parseInviteRequest(_ src: NSDictionary) -> InviteRequest {
    let email = notNull(readString(src, "email"))
    let emailText = readString(src, "emailText")
    let role = notNull(readOrganizationMemberRole(src, "role"))
    let firstName = readString(src, "firstName")
    let lastName = readString(src, "lastName")
    return InviteRequest(email: email, emailText: emailText, role: role, firstName: firstName, lastName: lastName)
  }
  func readInviteRequest(_ src: NSDictionary, _ name: String) -> InviteRequest? {
    let v = src[name]
    if v != nil {
      return self.parseInviteRequest(v as! NSDictionary)
    } else {
      return nil
    }
  }
  func readInviteRequestList(_ src: NSDictionary, _ name: String) -> [InviteRequest?]? {
    let v = src[name]
    if v != nil {
      let items = v as! [NSDictionary?]
      var res: [InviteRequest?] = []
      for i in 0..<items.count {
        let itm = items[i]
        if itm != nil {
          res.append(self.parseInviteRequest(itm!))
        } else {
          res.append(nil)
        }
      }
    } else {
      return nil
    }
  }
  func parseEvent(_ src: NSDictionary) -> Event {
    let id = notNull(readString(src, "id"))
    let event = notNull(readString(src, "event"))
    let params = readString(src, "params")
    return Event(id: id, event: event, params: params)
  }
  func readEvent(_ src: NSDictionary, _ name: String) -> Event? {
    let v = src[name]
    if v != nil {
      return self.parseEvent(v as! NSDictionary)
    } else {
      return nil
    }
  }
  func readEventList(_ src: NSDictionary, _ name: String) -> [Event?]? {
    let v = src[name]
    if v != nil {
      let items = v as! [NSDictionary?]
      var res: [Event?] = []
      for i in 0..<items.count {
        let itm = items[i]
        if itm != nil {
          res.append(self.parseEvent(itm!))
        } else {
          res.append(nil)
        }
      }
    } else {
      return nil
    }
  }
  func parseAppProfileInput(_ src: NSDictionary) -> AppProfileInput {
    let name = readString(src, "name")
    let shortname = readString(src, "shortname")
    let photoRef = readImageRefInput(src, "photoRef")
    let about = readString(src, "about")
    return AppProfileInput(name: name, shortname: shortname, photoRef: photoRef, about: about)
  }
  func readAppProfileInput(_ src: NSDictionary, _ name: String) -> AppProfileInput? {
    let v = src[name]
    if v != nil {
      return self.parseAppProfileInput(v as! NSDictionary)
    } else {
      return nil
    }
  }
  func readAppProfileInputList(_ src: NSDictionary, _ name: String) -> [AppProfileInput?]? {
    let v = src[name]
    if v != nil {
      let items = v as! [NSDictionary?]
      var res: [AppProfileInput?] = []
      for i in 0..<items.count {
        let itm = items[i]
        if itm != nil {
          res.append(self.parseAppProfileInput(itm!))
        } else {
          res.append(nil)
        }
      }
    } else {
      return nil
    }
  }
  func parseUpdateOrganizationProfileInput(_ src: NSDictionary) -> UpdateOrganizationProfileInput {
    let name = readString(src, "name")
    let photoRef = readImageRefInput(src, "photoRef")
    let website = readString(src, "website")
    let websiteTitle = readString(src, "websiteTitle")
    let about = readString(src, "about")
    let twitter = readString(src, "twitter")
    let facebook = readString(src, "facebook")
    let linkedin = readString(src, "linkedin")
    let location = readString(src, "location")
    let contacts = notNullListItems(readContactPersonInputList(src, "contacts"))
    let alphaPublished = readBool(src, "alphaPublished")
    let alphaEditorial = readBool(src, "alphaEditorial")
    let alphaFeatured = readBool(src, "alphaFeatured")
    let alphaLocations = notNullListItems(readStringList(src, "alphaLocations"))
    let alphaInterests = notNullListItems(readStringList(src, "alphaInterests"))
    let alphaOrganizationType = notNullListItems(readStringList(src, "alphaOrganizationType"))
    let alphaPotentialSites = readRangeInputList(src, "alphaPotentialSites")
    let alphaSiteSizes = readRangeInputList(src, "alphaSiteSizes")
    let alphaDevelopmentModels = readStringList(src, "alphaDevelopmentModels")
    let alphaAvailability = readStringList(src, "alphaAvailability")
    let alphaLandUse = readStringList(src, "alphaLandUse")
    let alphaGoodFor = readStringList(src, "alphaGoodFor")
    let alphaSpecialAttributes = readStringList(src, "alphaSpecialAttributes")
    let alphaLookingFor = notNullListItems(readStringList(src, "alphaLookingFor"))
    let alphaGeographies = notNullListItems(readStringList(src, "alphaGeographies"))
    let alphaDOShapeAndForm = notNullListItems(readStringList(src, "alphaDOShapeAndForm"))
    let alphaDOCurrentUse = notNullListItems(readStringList(src, "alphaDOCurrentUse"))
    let alphaDOGoodFitFor = notNullListItems(readStringList(src, "alphaDOGoodFitFor"))
    let alphaDOSpecialAttributes = notNullListItems(readStringList(src, "alphaDOSpecialAttributes"))
    let alphaDOAvailability = notNullListItems(readStringList(src, "alphaDOAvailability"))
    let alphaARGeographies = notNullListItems(readStringList(src, "alphaARGeographies"))
    let alphaARAreaRange = notNullListItems(readStringList(src, "alphaARAreaRange"))
    let alphaARHeightLimit = notNullListItems(readStringList(src, "alphaARHeightLimit"))
    let alphaARActivityStatus = notNullListItems(readStringList(src, "alphaARActivityStatus"))
    let alphaARAquisitionBudget = notNullListItems(readStringList(src, "alphaARAquisitionBudget"))
    let alphaARAquisitionRate = notNullListItems(readStringList(src, "alphaARAquisitionRate"))
    let alphaARClosingTime = notNullListItems(readStringList(src, "alphaARClosingTime"))
    let alphaARSpecialAttributes = notNullListItems(readStringList(src, "alphaARSpecialAttributes"))
    let alphaARLandUse = notNullListItems(readStringList(src, "alphaARLandUse"))
    return UpdateOrganizationProfileInput(name: name, photoRef: photoRef, website: website, websiteTitle: websiteTitle, about: about, twitter: twitter, facebook: facebook, linkedin: linkedin, location: location, contacts: contacts, alphaPublished: alphaPublished, alphaEditorial: alphaEditorial, alphaFeatured: alphaFeatured, alphaLocations: alphaLocations, alphaInterests: alphaInterests, alphaOrganizationType: alphaOrganizationType, alphaPotentialSites: alphaPotentialSites, alphaSiteSizes: alphaSiteSizes, alphaDevelopmentModels: alphaDevelopmentModels, alphaAvailability: alphaAvailability, alphaLandUse: alphaLandUse, alphaGoodFor: alphaGoodFor, alphaSpecialAttributes: alphaSpecialAttributes, alphaLookingFor: alphaLookingFor, alphaGeographies: alphaGeographies, alphaDOShapeAndForm: alphaDOShapeAndForm, alphaDOCurrentUse: alphaDOCurrentUse, alphaDOGoodFitFor: alphaDOGoodFitFor, alphaDOSpecialAttributes: alphaDOSpecialAttributes, alphaDOAvailability: alphaDOAvailability, alphaARGeographies: alphaARGeographies, alphaARAreaRange: alphaARAreaRange, alphaARHeightLimit: alphaARHeightLimit, alphaARActivityStatus: alphaARActivityStatus, alphaARAquisitionBudget: alphaARAquisitionBudget, alphaARAquisitionRate: alphaARAquisitionRate, alphaARClosingTime: alphaARClosingTime, alphaARSpecialAttributes: alphaARSpecialAttributes, alphaARLandUse: alphaARLandUse)
  }
  func readUpdateOrganizationProfileInput(_ src: NSDictionary, _ name: String) -> UpdateOrganizationProfileInput? {
    let v = src[name]
    if v != nil {
      return self.parseUpdateOrganizationProfileInput(v as! NSDictionary)
    } else {
      return nil
    }
  }
  func readUpdateOrganizationProfileInputList(_ src: NSDictionary, _ name: String) -> [UpdateOrganizationProfileInput?]? {
    let v = src[name]
    if v != nil {
      let items = v as! [NSDictionary?]
      var res: [UpdateOrganizationProfileInput?] = []
      for i in 0..<items.count {
        let itm = items[i]
        if itm != nil {
          res.append(self.parseUpdateOrganizationProfileInput(itm!))
        } else {
          res.append(nil)
        }
      }
    } else {
      return nil
    }
  }
  func parseContactPersonInput(_ src: NSDictionary) -> ContactPersonInput {
    let name = notNull(readString(src, "name"))
    let photoRef = readImageRefInput(src, "photoRef")
    let position = readString(src, "position")
    let email = readString(src, "email")
    let phone = readString(src, "phone")
    let link = readString(src, "link")
    let twitter = readString(src, "twitter")
    return ContactPersonInput(name: name, photoRef: photoRef, position: position, email: email, phone: phone, link: link, twitter: twitter)
  }
  func readContactPersonInput(_ src: NSDictionary, _ name: String) -> ContactPersonInput? {
    let v = src[name]
    if v != nil {
      return self.parseContactPersonInput(v as! NSDictionary)
    } else {
      return nil
    }
  }
  func readContactPersonInputList(_ src: NSDictionary, _ name: String) -> [ContactPersonInput?]? {
    let v = src[name]
    if v != nil {
      let items = v as! [NSDictionary?]
      var res: [ContactPersonInput?] = []
      for i in 0..<items.count {
        let itm = items[i]
        if itm != nil {
          res.append(self.parseContactPersonInput(itm!))
        } else {
          res.append(nil)
        }
      }
    } else {
      return nil
    }
  }
  func parseRangeInput(_ src: NSDictionary) -> RangeInput {
    let from = readInt(src, "from")
    let to = readInt(src, "to")
    return RangeInput(from: from, to: to)
  }
  func readRangeInput(_ src: NSDictionary, _ name: String) -> RangeInput? {
    let v = src[name]
    if v != nil {
      return self.parseRangeInput(v as! NSDictionary)
    } else {
      return nil
    }
  }
  func readRangeInputList(_ src: NSDictionary, _ name: String) -> [RangeInput?]? {
    let v = src[name]
    if v != nil {
      let items = v as! [NSDictionary?]
      var res: [RangeInput?] = []
      for i in 0..<items.count {
        let itm = items[i]
        if itm != nil {
          res.append(self.parseRangeInput(itm!))
        } else {
          res.append(nil)
        }
      }
    } else {
      return nil
    }
  }
  func readPushType(_ src: NSDictionary, _ name: String) -> PushType? {
    let v = self.readString(src, name);
    if v != nil {
      return PushType.init(rawValue: v!)
     } else {
       return nil
     }
  }
  func parseRoomUpdateInput(_ src: NSDictionary) -> RoomUpdateInput {
    let title = readString(src, "title")
    let photoRef = readImageRefInput(src, "photoRef")
    let description = readString(src, "description")
    let socialImageRef = readImageRefInput(src, "socialImageRef")
    let kind = readSharedRoomKind(src, "kind")
    return RoomUpdateInput(title: title, photoRef: photoRef, description: description, socialImageRef: socialImageRef, kind: kind)
  }
  func readRoomUpdateInput(_ src: NSDictionary, _ name: String) -> RoomUpdateInput? {
    let v = src[name]
    if v != nil {
      return self.parseRoomUpdateInput(v as! NSDictionary)
    } else {
      return nil
    }
  }
  func readRoomUpdateInputList(_ src: NSDictionary, _ name: String) -> [RoomUpdateInput?]? {
    let v = src[name]
    if v != nil {
      let items = v as! [NSDictionary?]
      var res: [RoomUpdateInput?] = []
      for i in 0..<items.count {
        let itm = items[i]
        if itm != nil {
          res.append(self.parseRoomUpdateInput(itm!))
        } else {
          res.append(nil)
        }
      }
    } else {
      return nil
    }
  }
  func parseRoomInviteInput(_ src: NSDictionary) -> RoomInviteInput {
    let userId = notNull(readString(src, "userId"))
    let role = notNull(readRoomMemberRole(src, "role"))
    return RoomInviteInput(userId: userId, role: role)
  }
  func readRoomInviteInput(_ src: NSDictionary, _ name: String) -> RoomInviteInput? {
    let v = src[name]
    if v != nil {
      return self.parseRoomInviteInput(v as! NSDictionary)
    } else {
      return nil
    }
  }
  func readRoomInviteInputList(_ src: NSDictionary, _ name: String) -> [RoomInviteInput?]? {
    let v = src[name]
    if v != nil {
      let items = v as! [NSDictionary?]
      var res: [RoomInviteInput?] = []
      for i in 0..<items.count {
        let itm = items[i]
        if itm != nil {
          res.append(self.parseRoomInviteInput(itm!))
        } else {
          res.append(nil)
        }
      }
    } else {
      return nil
    }
  }
  func parseRoomInviteEmailRequest(_ src: NSDictionary) -> RoomInviteEmailRequest {
    let email = notNull(readString(src, "email"))
    let emailText = readString(src, "emailText")
    let firstName = readString(src, "firstName")
    let lastName = readString(src, "lastName")
    return RoomInviteEmailRequest(email: email, emailText: emailText, firstName: firstName, lastName: lastName)
  }
  func readRoomInviteEmailRequest(_ src: NSDictionary, _ name: String) -> RoomInviteEmailRequest? {
    let v = src[name]
    if v != nil {
      return self.parseRoomInviteEmailRequest(v as! NSDictionary)
    } else {
      return nil
    }
  }
  func readRoomInviteEmailRequestList(_ src: NSDictionary, _ name: String) -> [RoomInviteEmailRequest?]? {
    let v = src[name]
    if v != nil {
      let items = v as! [NSDictionary?]
      var res: [RoomInviteEmailRequest?] = []
      for i in 0..<items.count {
        let itm = items[i]
        if itm != nil {
          res.append(self.parseRoomInviteEmailRequest(itm!))
        } else {
          res.append(nil)
        }
      }
    } else {
      return nil
    }
  }
  func parseRoomUserNotificaionSettingsInput(_ src: NSDictionary) -> RoomUserNotificaionSettingsInput {
    let mute = readBool(src, "mute")
    return RoomUserNotificaionSettingsInput(mute: mute)
  }
  func readRoomUserNotificaionSettingsInput(_ src: NSDictionary, _ name: String) -> RoomUserNotificaionSettingsInput? {
    let v = src[name]
    if v != nil {
      return self.parseRoomUserNotificaionSettingsInput(v as! NSDictionary)
    } else {
      return nil
    }
  }
  func readRoomUserNotificaionSettingsInputList(_ src: NSDictionary, _ name: String) -> [RoomUserNotificaionSettingsInput?]? {
    let v = src[name]
    if v != nil {
      let items = v as! [NSDictionary?]
      var res: [RoomUserNotificaionSettingsInput?] = []
      for i in 0..<items.count {
        let itm = items[i]
        if itm != nil {
          res.append(self.parseRoomUserNotificaionSettingsInput(itm!))
        } else {
          res.append(nil)
        }
      }
    } else {
      return nil
    }
  }
}
