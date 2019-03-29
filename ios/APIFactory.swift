import Apollo
class ApiFactory: ApiFactoryBase {
  func runQuery(client: ApolloClient, name: String, src: NSDictionary, cachePolicy: CachePolicy, handler: @escaping ResponseHandler) {
    if (name == "Account") {
      let requestBody = AccountQuery()
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "AccountSettings") {
      let requestBody = AccountSettingsQuery()
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "AccountInviteInfo") {
      let inviteKey = notNull(readString(src, "inviteKey"))
      let requestBody = AccountInviteInfoQuery(inviteKey: inviteKey)
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "AccountAppInviteInfo") {
      let inviteKey = notNull(readString(src, "inviteKey"))
      let requestBody = AccountAppInviteInfoQuery(inviteKey: inviteKey)
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "AccountAppInvite") {
      let requestBody = AccountAppInviteQuery()
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "AccountInvites") {
      let requestBody = AccountInvitesQuery()
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "AccountInvitesHistory") {
      let requestBody = AccountInvitesHistoryQuery()
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "ProfilePrefill") {
      let requestBody = ProfilePrefillQuery()
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "FetchPushSettings") {
      let requestBody = FetchPushSettingsQuery()
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "MyApps") {
      let requestBody = MyAppsQuery()
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "Dialogs") {
      let after = readString(src, "after")
      let requestBody = DialogsQuery(after: after)
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "Room") {
      let id = notNull(readString(src, "id"))
      let requestBody = RoomQuery(id: id)
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "RoomTiny") {
      let id = notNull(readString(src, "id"))
      let requestBody = RoomTinyQuery(id: id)
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "RoomSuper") {
      let id = notNull(readString(src, "id"))
      let requestBody = RoomSuperQuery(id: id)
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "GetDraftMessage") {
      let conversationId = notNull(readString(src, "conversationId"))
      let requestBody = GetDraftMessageQuery(conversationId: conversationId)
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "GlobalCounter") {
      let requestBody = GlobalCounterQuery()
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "ChatHistory") {
      let chatId = notNull(readString(src, "chatId"))
      let before = readString(src, "before")
      let first = notNull(readInt(src, "first"))
      let requestBody = ChatHistoryQuery(chatId: chatId, before: before, first: first)
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "ChatSearchGroup") {
      let members = notNull(notNullListItems(readStringList(src, "members")))
      let requestBody = ChatSearchGroupQuery(members: members)
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "RoomSearchText") {
      let query = notNull(readString(src, "query"))
      let requestBody = RoomSearchTextQuery(query: query)
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "RoomSearch") {
      let query = readString(src, "query")
      let sort = readString(src, "sort")
      let page = readInt(src, "page")
      let requestBody = RoomSearchQuery(query: query, sort: sort, page: page)
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "RoomMembersShort") {
      let roomId = notNull(readString(src, "roomId"))
      let requestBody = RoomMembersShortQuery(roomId: roomId)
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "RoomMembers") {
      let roomId = notNull(readString(src, "roomId"))
      let requestBody = RoomMembersQuery(roomId: roomId)
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "RoomInviteLink") {
      let roomId = notNull(readString(src, "roomId"))
      let requestBody = RoomInviteLinkQuery(roomId: roomId)
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "RoomInviteInfo") {
      let invite = notNull(readString(src, "invite"))
      let requestBody = RoomInviteInfoQuery(invite: invite)
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "ResolvedInvite") {
      let key = notNull(readString(src, "key"))
      let requestBody = ResolvedInviteQuery(key: key)
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "Conference") {
      let id = notNull(readString(src, "id"))
      let requestBody = ConferenceQuery(id: id)
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "ConferenceMedia") {
      let id = notNull(readString(src, "id"))
      let peerId = notNull(readString(src, "peerId"))
      let requestBody = ConferenceMediaQuery(id: id, peerId: peerId)
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "AvailableRooms") {
      let requestBody = AvailableRoomsQuery()
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "GlobalSearch") {
      let query = notNull(readString(src, "query"))
      let requestBody = GlobalSearchQuery(query: query)
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "FeatureFlags") {
      let requestBody = FeatureFlagsQuery()
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "FeedHome") {
      let requestBody = FeedHomeQuery()
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "MyOrganizations") {
      let requestBody = MyOrganizationsQuery()
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "Organization") {
      let organizationId = notNull(readString(src, "organizationId"))
      let requestBody = OrganizationQuery(organizationId: organizationId)
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "OrganizationMembersShort") {
      let organizationId = notNull(readString(src, "organizationId"))
      let requestBody = OrganizationMembersShortQuery(organizationId: organizationId)
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "OrganizationProfile") {
      let organizationId = notNull(readString(src, "organizationId"))
      let requestBody = OrganizationProfileQuery(organizationId: organizationId)
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
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
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "ExploreComunity") {
      let query = readString(src, "query")
      let sort = readString(src, "sort")
      let page = readInt(src, "page")
      let requestBody = ExploreComunityQuery(query: query, sort: sort, page: page)
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "OrganizationPublicInvite") {
      let organizationId = readString(src, "organizationId")
      let requestBody = OrganizationPublicInviteQuery(organizationId: organizationId)
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "OrganizationByPrefix") {
      let query = notNull(readString(src, "query"))
      let requestBody = OrganizationByPrefixQuery(query: query)
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "Permissions") {
      let requestBody = PermissionsQuery()
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "SuperAdmins") {
      let requestBody = SuperAdminsQuery()
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "SuperAccounts") {
      let requestBody = SuperAccountsQuery()
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "SuperAccount") {
      let accountId = notNull(readString(src, "accountId"))
      let viaOrgId = readBool(src, "viaOrgId")
      let requestBody = SuperAccountQuery(accountId: accountId, viaOrgId: viaOrgId)
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "Profile") {
      let requestBody = ProfileQuery()
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "Settings") {
      let requestBody = SettingsQuery()
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "Users") {
      let query = notNull(readString(src, "query"))
      let requestBody = UsersQuery(query: query)
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "User") {
      let userId = notNull(readString(src, "userId"))
      let requestBody = UserQuery(userId: userId)
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "Online") {
      let userId = notNull(readString(src, "userId"))
      let requestBody = OnlineQuery(userId: userId)
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "ExplorePeople") {
      let query = readString(src, "query")
      let sort = readString(src, "sort")
      let page = readInt(src, "page")
      let after = readString(src, "after")
      let requestBody = ExplorePeopleQuery(query: query, sort: sort, page: page, after: after)
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "ResolveShortName") {
      let shortname = notNull(readString(src, "shortname"))
      let requestBody = ResolveShortNameQuery(shortname: shortname)
      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    fatalError()
  }

  func watchQuery(client: ApolloClient, name: String, src: NSDictionary, cachePolicy: CachePolicy, handler: @escaping ResponseHandler) -> WatchCancel {
    if (name == "Account") {
      let requestBody = AccountQuery()
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "AccountSettings") {
      let requestBody = AccountSettingsQuery()
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "AccountInviteInfo") {
      let inviteKey = notNull(readString(src, "inviteKey"))
      let requestBody = AccountInviteInfoQuery(inviteKey: inviteKey)
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "AccountAppInviteInfo") {
      let inviteKey = notNull(readString(src, "inviteKey"))
      let requestBody = AccountAppInviteInfoQuery(inviteKey: inviteKey)
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "AccountAppInvite") {
      let requestBody = AccountAppInviteQuery()
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "AccountInvites") {
      let requestBody = AccountInvitesQuery()
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "AccountInvitesHistory") {
      let requestBody = AccountInvitesHistoryQuery()
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "ProfilePrefill") {
      let requestBody = ProfilePrefillQuery()
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "FetchPushSettings") {
      let requestBody = FetchPushSettingsQuery()
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "MyApps") {
      let requestBody = MyAppsQuery()
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "Dialogs") {
      let after = readString(src, "after")
      let requestBody = DialogsQuery(after: after)
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "Room") {
      let id = notNull(readString(src, "id"))
      let requestBody = RoomQuery(id: id)
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "RoomTiny") {
      let id = notNull(readString(src, "id"))
      let requestBody = RoomTinyQuery(id: id)
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "RoomSuper") {
      let id = notNull(readString(src, "id"))
      let requestBody = RoomSuperQuery(id: id)
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "GetDraftMessage") {
      let conversationId = notNull(readString(src, "conversationId"))
      let requestBody = GetDraftMessageQuery(conversationId: conversationId)
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "GlobalCounter") {
      let requestBody = GlobalCounterQuery()
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "ChatHistory") {
      let chatId = notNull(readString(src, "chatId"))
      let before = readString(src, "before")
      let first = notNull(readInt(src, "first"))
      let requestBody = ChatHistoryQuery(chatId: chatId, before: before, first: first)
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "ChatSearchGroup") {
      let members = notNull(notNullListItems(readStringList(src, "members")))
      let requestBody = ChatSearchGroupQuery(members: members)
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "RoomSearchText") {
      let query = notNull(readString(src, "query"))
      let requestBody = RoomSearchTextQuery(query: query)
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "RoomSearch") {
      let query = readString(src, "query")
      let sort = readString(src, "sort")
      let page = readInt(src, "page")
      let requestBody = RoomSearchQuery(query: query, sort: sort, page: page)
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "RoomMembersShort") {
      let roomId = notNull(readString(src, "roomId"))
      let requestBody = RoomMembersShortQuery(roomId: roomId)
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "RoomMembers") {
      let roomId = notNull(readString(src, "roomId"))
      let requestBody = RoomMembersQuery(roomId: roomId)
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "RoomInviteLink") {
      let roomId = notNull(readString(src, "roomId"))
      let requestBody = RoomInviteLinkQuery(roomId: roomId)
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "RoomInviteInfo") {
      let invite = notNull(readString(src, "invite"))
      let requestBody = RoomInviteInfoQuery(invite: invite)
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "ResolvedInvite") {
      let key = notNull(readString(src, "key"))
      let requestBody = ResolvedInviteQuery(key: key)
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "Conference") {
      let id = notNull(readString(src, "id"))
      let requestBody = ConferenceQuery(id: id)
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "ConferenceMedia") {
      let id = notNull(readString(src, "id"))
      let peerId = notNull(readString(src, "peerId"))
      let requestBody = ConferenceMediaQuery(id: id, peerId: peerId)
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "AvailableRooms") {
      let requestBody = AvailableRoomsQuery()
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "GlobalSearch") {
      let query = notNull(readString(src, "query"))
      let requestBody = GlobalSearchQuery(query: query)
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "FeatureFlags") {
      let requestBody = FeatureFlagsQuery()
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "FeedHome") {
      let requestBody = FeedHomeQuery()
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "MyOrganizations") {
      let requestBody = MyOrganizationsQuery()
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "Organization") {
      let organizationId = notNull(readString(src, "organizationId"))
      let requestBody = OrganizationQuery(organizationId: organizationId)
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "OrganizationMembersShort") {
      let organizationId = notNull(readString(src, "organizationId"))
      let requestBody = OrganizationMembersShortQuery(organizationId: organizationId)
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "OrganizationProfile") {
      let organizationId = notNull(readString(src, "organizationId"))
      let requestBody = OrganizationProfileQuery(organizationId: organizationId)
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
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
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "ExploreComunity") {
      let query = readString(src, "query")
      let sort = readString(src, "sort")
      let page = readInt(src, "page")
      let requestBody = ExploreComunityQuery(query: query, sort: sort, page: page)
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "OrganizationPublicInvite") {
      let organizationId = readString(src, "organizationId")
      let requestBody = OrganizationPublicInviteQuery(organizationId: organizationId)
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "OrganizationByPrefix") {
      let query = notNull(readString(src, "query"))
      let requestBody = OrganizationByPrefixQuery(query: query)
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "Permissions") {
      let requestBody = PermissionsQuery()
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "SuperAdmins") {
      let requestBody = SuperAdminsQuery()
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "SuperAccounts") {
      let requestBody = SuperAccountsQuery()
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "SuperAccount") {
      let accountId = notNull(readString(src, "accountId"))
      let viaOrgId = readBool(src, "viaOrgId")
      let requestBody = SuperAccountQuery(accountId: accountId, viaOrgId: viaOrgId)
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "Profile") {
      let requestBody = ProfileQuery()
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "Settings") {
      let requestBody = SettingsQuery()
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "Users") {
      let query = notNull(readString(src, "query"))
      let requestBody = UsersQuery(query: query)
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "User") {
      let userId = notNull(readString(src, "userId"))
      let requestBody = UserQuery(userId: userId)
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "Online") {
      let userId = notNull(readString(src, "userId"))
      let requestBody = OnlineQuery(userId: userId)
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "ExplorePeople") {
      let query = readString(src, "query")
      let sort = readString(src, "sort")
      let page = readInt(src, "page")
      let after = readString(src, "after")
      let requestBody = ExplorePeopleQuery(query: query, sort: sort, page: page, after: after)
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "ResolveShortName") {
      let shortname = notNull(readString(src, "shortname"))
      let requestBody = ResolveShortNameQuery(shortname: shortname)
      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    fatalError()
  }

  func runMutation(client: ApolloClient, name: String, src: NSDictionary, handler: @escaping ResponseHandler) {
    if (name == "CreateOrganization") {
      let input = notNull(readCreateOrganizationInput(src, "input"))
      let requestBody = CreateOrganizationMutation(input: input)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "AccountInviteJoin") {
      let inviteKey = notNull(readString(src, "inviteKey"))
      let requestBody = AccountInviteJoinMutation(inviteKey: inviteKey)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "AccountCreateInvite") {
      let requestBody = AccountCreateInviteMutation()
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "AccountDestroyInvite") {
      let id = notNull(readString(src, "id"))
      let requestBody = AccountDestroyInviteMutation(id: id)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "CreateUserProfileAndOrganization") {
      let user = notNull(readProfileInput(src, "user"))
      let organization = notNull(readCreateOrganizationInput(src, "organization"))
      let requestBody = CreateUserProfileAndOrganizationMutation(user: user, organization: organization)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "ReportOnline") {
      let active = readBool(src, "active")
      let platform = readString(src, "platform")
      let requestBody = ReportOnlineMutation(active: active, platform: platform)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "RegisterPush") {
      let endpoint = notNull(readString(src, "endpoint"))
      let type = notNull(readPushType(src, "type"))
      let requestBody = RegisterPushMutation(endpoint: endpoint, type: type)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "RegisterWebPush") {
      let endpoint = notNull(readString(src, "endpoint"))
      let requestBody = RegisterWebPushMutation(endpoint: endpoint)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "CreateApp") {
      let name = notNull(readString(src, "name"))
      let shortname = readString(src, "shortname")
      let photoRef = readImageRefInput(src, "photoRef")
      let about = readString(src, "about")
      let requestBody = CreateAppMutation(name: name, shortname: shortname, photoRef: photoRef, about: about)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "UpdateApp") {
      let appId = notNull(readString(src, "appId"))
      let input = notNull(readAppProfileInput(src, "input"))
      let requestBody = UpdateAppMutation(appId: appId, input: input)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "RefreshAppToken") {
      let appId = notNull(readString(src, "appId"))
      let requestBody = RefreshAppTokenMutation(appId: appId)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "AddAppToChat") {
      let appId = notNull(readString(src, "appId"))
      let chatId = notNull(readString(src, "chatId"))
      let requestBody = AddAppToChatMutation(appId: appId, chatId: chatId)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "PinMessage") {
      let chatId = notNull(readString(src, "chatId"))
      let messageId = notNull(readString(src, "messageId"))
      let requestBody = PinMessageMutation(chatId: chatId, messageId: messageId)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "UnpinMessage") {
      let chatId = notNull(readString(src, "chatId"))
      let requestBody = UnpinMessageMutation(chatId: chatId)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "MessageSetReaction") {
      let messageId = notNull(readString(src, "messageId"))
      let reaction = notNull(readString(src, "reaction"))
      let requestBody = MessageSetReactionMutation(messageId: messageId, reaction: reaction)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "SwitchReaction") {
      let messageId = notNull(readString(src, "messageId"))
      let from = notNull(readString(src, "from"))
      let to = notNull(readString(src, "to"))
      let requestBody = SwitchReactionMutation(messageId: messageId, from: from, to: to)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "MessageUnsetReaction") {
      let messageId = notNull(readString(src, "messageId"))
      let reaction = notNull(readString(src, "reaction"))
      let requestBody = MessageUnsetReactionMutation(messageId: messageId, reaction: reaction)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
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
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
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
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "RespondPostMessage") {
      let messageId = notNull(readString(src, "messageId"))
      let buttonId = notNull(readString(src, "buttonId"))
      let reaction = notNull(readString(src, "reaction"))
      let requestBody = RespondPostMessageMutation(messageId: messageId, buttonId: buttonId, reaction: reaction)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "SaveDraftMessage") {
      let conversationId = notNull(readString(src, "conversationId"))
      let message = notNull(readString(src, "message"))
      let requestBody = SaveDraftMessageMutation(conversationId: conversationId, message: message)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
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
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "ReplyMessage") {
      let roomId = notNull(readString(src, "roomId"))
      let message = readString(src, "message")
      let replyMessages = notNullListItems(readStringList(src, "replyMessages"))
      let mentions = notNullListItems(readStringList(src, "mentions"))
      let requestBody = ReplyMessageMutation(roomId: roomId, message: message, replyMessages: replyMessages, mentions: mentions)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "RoomRead") {
      let id = notNull(readString(src, "id"))
      let mid = notNull(readString(src, "mid"))
      let requestBody = RoomReadMutation(id: id, mid: mid)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
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
      let channel = notNull(readBool(src, "channel"))
      let requestBody = RoomCreateMutation(kind: kind, members: members, message: message, title: title, description: description, photoRef: photoRef, organizationId: organizationId, channel: channel)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "RoomCreateIntro") {
      let roomId = notNull(readString(src, "roomId"))
      let uid = notNull(readString(src, "uid"))
      let about = readString(src, "about")
      let file = readString(src, "file")
      let requestBody = RoomCreateIntroMutation(roomId: roomId, uid: uid, about: about, file: file)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "RoomEditIntro") {
      let messageId = notNull(readString(src, "messageId"))
      let uid = notNull(readString(src, "uid"))
      let about = readString(src, "about")
      let file = readString(src, "file")
      let requestBody = RoomEditIntroMutation(messageId: messageId, uid: uid, about: about, file: file)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "SetTyping") {
      let conversationId = notNull(readString(src, "conversationId"))
      let requestBody = SetTypingMutation(conversationId: conversationId)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "CancelTyping") {
      let conversationId = notNull(readString(src, "conversationId"))
      let requestBody = CancelTypingMutation(conversationId: conversationId)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "RoomAddMember") {
      let roomId = notNull(readString(src, "roomId"))
      let userId = notNull(readString(src, "userId"))
      let requestBody = RoomAddMemberMutation(roomId: roomId, userId: userId)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "RoomDeclineJoinReuest") {
      let roomId = notNull(readString(src, "roomId"))
      let userId = notNull(readString(src, "userId"))
      let requestBody = RoomDeclineJoinReuestMutation(roomId: roomId, userId: userId)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "RoomAddMembers") {
      let roomId = notNull(readString(src, "roomId"))
      let invites = notNull(notNullListItems(readRoomInviteInputList(src, "invites")))
      let requestBody = RoomAddMembersMutation(roomId: roomId, invites: invites)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "RoomKick") {
      let roomId = notNull(readString(src, "roomId"))
      let userId = notNull(readString(src, "userId"))
      let requestBody = RoomKickMutation(roomId: roomId, userId: userId)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "RoomChangeRole") {
      let roomId = notNull(readString(src, "roomId"))
      let userId = notNull(readString(src, "userId"))
      let newRole = notNull(readRoomMemberRole(src, "newRole"))
      let requestBody = RoomChangeRoleMutation(roomId: roomId, userId: userId, newRole: newRole)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "RoomLeave") {
      let roomId = notNull(readString(src, "roomId"))
      let requestBody = RoomLeaveMutation(roomId: roomId)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "RoomAlterFeatured") {
      let roomId = notNull(readString(src, "roomId"))
      let featured = notNull(readBool(src, "featured"))
      let requestBody = RoomAlterFeaturedMutation(roomId: roomId, featured: featured)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "RoomAlterHidden") {
      let roomId = notNull(readString(src, "roomId"))
      let listed = notNull(readBool(src, "listed"))
      let requestBody = RoomAlterHiddenMutation(roomId: roomId, listed: listed)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "RoomSettingsUpdate") {
      let settings = notNull(readRoomUserNotificaionSettingsInput(src, "settings"))
      let roomId = notNull(readString(src, "roomId"))
      let requestBody = RoomSettingsUpdateMutation(settings: settings, roomId: roomId)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "RoomJoin") {
      let roomId = notNull(readString(src, "roomId"))
      let requestBody = RoomJoinMutation(roomId: roomId)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "RoomSendEmailInvite") {
      let roomId = notNull(readString(src, "roomId"))
      let inviteRequests = notNull(notNullListItems(readRoomInviteEmailRequestList(src, "inviteRequests")))
      let requestBody = RoomSendEmailInviteMutation(roomId: roomId, inviteRequests: inviteRequests)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "RoomJoinInviteLink") {
      let invite = notNull(readString(src, "invite"))
      let requestBody = RoomJoinInviteLinkMutation(invite: invite)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "RoomRenewInviteLink") {
      let roomId = notNull(readString(src, "roomId"))
      let requestBody = RoomRenewInviteLinkMutation(roomId: roomId)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "RoomUpdate") {
      let roomId = notNull(readString(src, "roomId"))
      let input = notNull(readRoomUpdateInput(src, "input"))
      let requestBody = RoomUpdateMutation(roomId: roomId, input: input)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "RoomDeleteMessage") {
      let messageId = notNull(readString(src, "messageId"))
      let requestBody = RoomDeleteMessageMutation(messageId: messageId)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "RoomDeleteMessages") {
      let mids = notNull(notNullListItems(readStringList(src, "mids")))
      let requestBody = RoomDeleteMessagesMutation(mids: mids)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "RoomDeleteUrlAugmentation") {
      let messageId = notNull(readString(src, "messageId"))
      let requestBody = RoomDeleteUrlAugmentationMutation(messageId: messageId)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
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
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "MarkSequenceRead") {
      let seq = notNull(readInt(src, "seq"))
      let requestBody = MarkSequenceReadMutation(seq: seq)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "UpdateWelcomeMessage") {
      let roomId = notNull(readString(src, "roomId"))
      let welcomeMessageIsOn = notNull(readBool(src, "welcomeMessageIsOn"))
      let welcomeMessageSender = readString(src, "welcomeMessageSender")
      let welcomeMessageText = readString(src, "welcomeMessageText")
      let requestBody = UpdateWelcomeMessageMutation(roomId: roomId, welcomeMessageIsOn: welcomeMessageIsOn, welcomeMessageSender: welcomeMessageSender, welcomeMessageText: welcomeMessageText)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "ConferenceJoin") {
      let id = notNull(readString(src, "id"))
      let requestBody = ConferenceJoinMutation(id: id)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "ConferenceLeave") {
      let id = notNull(readString(src, "id"))
      let peerId = notNull(readString(src, "peerId"))
      let requestBody = ConferenceLeaveMutation(id: id, peerId: peerId)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "ConferenceKeepAlive") {
      let id = notNull(readString(src, "id"))
      let peerId = notNull(readString(src, "peerId"))
      let requestBody = ConferenceKeepAliveMutation(id: id, peerId: peerId)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "ConferenceOffer") {
      let id = notNull(readString(src, "id"))
      let ownPeerId = notNull(readString(src, "ownPeerId"))
      let peerId = notNull(readString(src, "peerId"))
      let offer = notNull(readString(src, "offer"))
      let requestBody = ConferenceOfferMutation(id: id, ownPeerId: ownPeerId, peerId: peerId, offer: offer)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "ConferenceAnswer") {
      let id = notNull(readString(src, "id"))
      let ownPeerId = notNull(readString(src, "ownPeerId"))
      let peerId = notNull(readString(src, "peerId"))
      let answer = notNull(readString(src, "answer"))
      let requestBody = ConferenceAnswerMutation(id: id, ownPeerId: ownPeerId, peerId: peerId, answer: answer)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "ConferenceCandidate") {
      let id = notNull(readString(src, "id"))
      let ownPeerId = notNull(readString(src, "ownPeerId"))
      let peerId = notNull(readString(src, "peerId"))
      let candidate = notNull(readString(src, "candidate"))
      let requestBody = ConferenceCandidateMutation(id: id, ownPeerId: ownPeerId, peerId: peerId, candidate: candidate)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "MediaOffer") {
      let id = notNull(readString(src, "id"))
      let peerId = notNull(readString(src, "peerId"))
      let offer = notNull(readString(src, "offer"))
      let requestBody = MediaOfferMutation(id: id, peerId: peerId, offer: offer)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "MediaAnswer") {
      let id = notNull(readString(src, "id"))
      let peerId = notNull(readString(src, "peerId"))
      let answer = notNull(readString(src, "answer"))
      let requestBody = MediaAnswerMutation(id: id, peerId: peerId, answer: answer)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "MediaCandidate") {
      let id = notNull(readString(src, "id"))
      let peerId = notNull(readString(src, "peerId"))
      let candidate = notNull(readString(src, "candidate"))
      let requestBody = MediaCandidateMutation(id: id, peerId: peerId, candidate: candidate)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "FeatureFlagAdd") {
      let key = notNull(readString(src, "key"))
      let title = notNull(readString(src, "title"))
      let requestBody = FeatureFlagAddMutation(key: key, title: title)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "FeatureFlagEnable") {
      let accountId = notNull(readString(src, "accountId"))
      let featureId = notNull(readString(src, "featureId"))
      let requestBody = FeatureFlagEnableMutation(accountId: accountId, featureId: featureId)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "FeatureFlagDisable") {
      let accountId = notNull(readString(src, "accountId"))
      let featureId = notNull(readString(src, "featureId"))
      let requestBody = FeatureFlagDisableMutation(accountId: accountId, featureId: featureId)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "FeedPost") {
      let message = notNull(readString(src, "message"))
      let requestBody = FeedPostMutation(message: message)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "UpdateOrganization") {
      let input = notNull(readUpdateOrganizationProfileInput(src, "input"))
      let organizationId = readString(src, "organizationId")
      let requestBody = UpdateOrganizationMutation(input: input, organizationId: organizationId)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "SetOrgShortname") {
      let organizationId = notNull(readString(src, "organizationId"))
      let shortname = notNull(readString(src, "shortname"))
      let requestBody = SetOrgShortnameMutation(organizationId: organizationId, shortname: shortname)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "OrganizationChangeMemberRole") {
      let memberId = notNull(readString(src, "memberId"))
      let newRole = notNull(readOrganizationMemberRole(src, "newRole"))
      let organizationId = notNull(readString(src, "organizationId"))
      let requestBody = OrganizationChangeMemberRoleMutation(memberId: memberId, newRole: newRole, organizationId: organizationId)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "OrganizationAddMember") {
      let userIds = notNullListItems(readStringList(src, "userIds"))
      let organizationId = notNull(readString(src, "organizationId"))
      let requestBody = OrganizationAddMemberMutation(userIds: userIds, organizationId: organizationId)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "OrganizationRemoveMember") {
      let memberId = notNull(readString(src, "memberId"))
      let organizationId = notNull(readString(src, "organizationId"))
      let requestBody = OrganizationRemoveMemberMutation(memberId: memberId, organizationId: organizationId)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "OrganizationInviteMembers") {
      let inviteRequests = notNull(notNullListItems(readInviteRequestList(src, "inviteRequests")))
      let organizationId = readString(src, "organizationId")
      let requestBody = OrganizationInviteMembersMutation(inviteRequests: inviteRequests, organizationId: organizationId)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "OrganizationCreatePublicInvite") {
      let expirationDays = readInt(src, "expirationDays")
      let organizationId = readString(src, "organizationId")
      let requestBody = OrganizationCreatePublicInviteMutation(expirationDays: expirationDays, organizationId: organizationId)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "DeleteOrganization") {
      let organizationId = notNull(readString(src, "organizationId"))
      let requestBody = DeleteOrganizationMutation(organizationId: organizationId)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "OrganizationMemberRemove") {
      let userId = notNull(readString(src, "userId"))
      let organizationId = notNull(readString(src, "organizationId"))
      let requestBody = OrganizationMemberRemoveMutation(userId: userId, organizationId: organizationId)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "OrganizationActivateByInvite") {
      let inviteKey = notNull(readString(src, "inviteKey"))
      let requestBody = OrganizationActivateByInviteMutation(inviteKey: inviteKey)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "OrganizationAlterPublished") {
      let organizationId = notNull(readString(src, "organizationId"))
      let published = notNull(readBool(src, "published"))
      let requestBody = OrganizationAlterPublishedMutation(organizationId: organizationId, published: published)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "DebugMails") {
      let type = notNull(readDebugEmailType(src, "type"))
      let requestBody = DebugMailsMutation(type: type)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "SuperAccountRename") {
      let accountId = notNull(readString(src, "accountId"))
      let title = notNull(readString(src, "title"))
      let requestBody = SuperAccountRenameMutation(accountId: accountId, title: title)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "SuperAccountActivate") {
      let accountId = notNull(readString(src, "accountId"))
      let requestBody = SuperAccountActivateMutation(accountId: accountId)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "SuperAccountSuspend") {
      let accountId = notNull(readString(src, "accountId"))
      let requestBody = SuperAccountSuspendMutation(accountId: accountId)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "SuperAccountPend") {
      let accountId = notNull(readString(src, "accountId"))
      let requestBody = SuperAccountPendMutation(accountId: accountId)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "SuperAccountAdd") {
      let title = notNull(readString(src, "title"))
      let requestBody = SuperAccountAddMutation(title: title)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "SuperAccountMemberAdd") {
      let accountId = notNull(readString(src, "accountId"))
      let userId = notNull(readString(src, "userId"))
      let requestBody = SuperAccountMemberAddMutation(accountId: accountId, userId: userId)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "SuperAccountMemberRemove") {
      let accountId = notNull(readString(src, "accountId"))
      let userId = notNull(readString(src, "userId"))
      let requestBody = SuperAccountMemberRemoveMutation(accountId: accountId, userId: userId)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "SuperAdminAdd") {
      let userId = notNull(readString(src, "userId"))
      let role = notNull(readSuperAdminRole(src, "role"))
      let requestBody = SuperAdminAddMutation(userId: userId, role: role)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "SuperAdminRemove") {
      let userId = notNull(readString(src, "userId"))
      let requestBody = SuperAdminRemoveMutation(userId: userId)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "ProfileUpdate") {
      let input = notNull(readUpdateProfileInput(src, "input"))
      let uid = readString(src, "uid")
      let requestBody = ProfileUpdateMutation(input: input, uid: uid)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "SetUserShortname") {
      let shortname = notNull(readString(src, "shortname"))
      let requestBody = SetUserShortnameMutation(shortname: shortname)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "ProfileCreate") {
      let input = notNull(readCreateProfileInput(src, "input"))
      let requestBody = ProfileCreateMutation(input: input)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "SettingsUpdate") {
      let input = readUpdateSettingsInput(src, "input")
      let requestBody = SettingsUpdateMutation(input: input)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    if (name == "PersistEvents") {
      let did = notNull(readString(src, "did"))
      let events = notNull(notNullListItems(readEventList(src, "events")))
      let requestBody = PersistEventsMutation(did: did, events: events)
      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.errors != nil) {
            handler(nil, NativeGraphqlError(src: r!.errors!))
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return
    }
    fatalError()
  }

  func runSubscription(client: ApolloClient, name: String, src: NSDictionary, handler: @escaping ResponseHandler) -> WatchCancel {
    if (name == "SettingsWatch") {
      let requestBody = SettingsWatchSubscription()
      let res = client.subscribe(subscription: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "ChatWatch") {
      let chatId = notNull(readString(src, "chatId"))
      let state = readString(src, "state")
      let requestBody = ChatWatchSubscription(chatId: chatId, state: state)
      let res = client.subscribe(subscription: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "DialogsWatch") {
      let state = readString(src, "state")
      let requestBody = DialogsWatchSubscription(state: state)
      let res = client.subscribe(subscription: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "TypingsWatch") {
      let requestBody = TypingsWatchSubscription()
      let res = client.subscribe(subscription: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "ConferenceMediaWatch") {
      let id = notNull(readString(src, "id"))
      let peerId = notNull(readString(src, "peerId"))
      let requestBody = ConferenceMediaWatchSubscription(id: id, peerId: peerId)
      let res = client.subscribe(subscription: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "ConferenceWatch") {
      let id = notNull(readString(src, "id"))
      let requestBody = ConferenceWatchSubscription(id: id)
      let res = client.subscribe(subscription: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    if (name == "OnlineWatch") {
      let conversations = notNull(notNullListItems(readStringList(src, "conversations")))
      let requestBody = OnlineWatchSubscription(conversations: conversations)
      let res = client.subscribe(subscription: requestBody, queue: GraphQLQueue) { (r, e) in
          if e != nil {
            handler(nil, e)
          } else if (r != nil && r!.data != nil) {
            handler(r!.data!.resultMap, nil)
          } else {
            handler(nil, nil)
          }
      }
      return { () in res.cancel() }
    }
    fatalError()
  }

  func readQuery(store: ApolloStore, name: String, src: NSDictionary, handler: @escaping ResponseHandler) {
    if (name == "Account") {
      let requestBody = AccountQuery()
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "AccountSettings") {
      let requestBody = AccountSettingsQuery()
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "AccountInviteInfo") {
      let inviteKey = notNull(readString(src, "inviteKey"))
      let requestBody = AccountInviteInfoQuery(inviteKey: inviteKey)
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "AccountAppInviteInfo") {
      let inviteKey = notNull(readString(src, "inviteKey"))
      let requestBody = AccountAppInviteInfoQuery(inviteKey: inviteKey)
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "AccountAppInvite") {
      let requestBody = AccountAppInviteQuery()
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "AccountInvites") {
      let requestBody = AccountInvitesQuery()
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "AccountInvitesHistory") {
      let requestBody = AccountInvitesHistoryQuery()
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "ProfilePrefill") {
      let requestBody = ProfilePrefillQuery()
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "FetchPushSettings") {
      let requestBody = FetchPushSettingsQuery()
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "MyApps") {
      let requestBody = MyAppsQuery()
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "Dialogs") {
      let after = readString(src, "after")
      let requestBody = DialogsQuery(after: after)
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "Room") {
      let id = notNull(readString(src, "id"))
      let requestBody = RoomQuery(id: id)
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "RoomTiny") {
      let id = notNull(readString(src, "id"))
      let requestBody = RoomTinyQuery(id: id)
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "RoomSuper") {
      let id = notNull(readString(src, "id"))
      let requestBody = RoomSuperQuery(id: id)
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "GetDraftMessage") {
      let conversationId = notNull(readString(src, "conversationId"))
      let requestBody = GetDraftMessageQuery(conversationId: conversationId)
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "GlobalCounter") {
      let requestBody = GlobalCounterQuery()
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "ChatHistory") {
      let chatId = notNull(readString(src, "chatId"))
      let before = readString(src, "before")
      let first = notNull(readInt(src, "first"))
      let requestBody = ChatHistoryQuery(chatId: chatId, before: before, first: first)
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "ChatSearchGroup") {
      let members = notNull(notNullListItems(readStringList(src, "members")))
      let requestBody = ChatSearchGroupQuery(members: members)
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "RoomSearchText") {
      let query = notNull(readString(src, "query"))
      let requestBody = RoomSearchTextQuery(query: query)
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "RoomSearch") {
      let query = readString(src, "query")
      let sort = readString(src, "sort")
      let page = readInt(src, "page")
      let requestBody = RoomSearchQuery(query: query, sort: sort, page: page)
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "RoomMembersShort") {
      let roomId = notNull(readString(src, "roomId"))
      let requestBody = RoomMembersShortQuery(roomId: roomId)
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "RoomMembers") {
      let roomId = notNull(readString(src, "roomId"))
      let requestBody = RoomMembersQuery(roomId: roomId)
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "RoomInviteLink") {
      let roomId = notNull(readString(src, "roomId"))
      let requestBody = RoomInviteLinkQuery(roomId: roomId)
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "RoomInviteInfo") {
      let invite = notNull(readString(src, "invite"))
      let requestBody = RoomInviteInfoQuery(invite: invite)
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "ResolvedInvite") {
      let key = notNull(readString(src, "key"))
      let requestBody = ResolvedInviteQuery(key: key)
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "Conference") {
      let id = notNull(readString(src, "id"))
      let requestBody = ConferenceQuery(id: id)
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "ConferenceMedia") {
      let id = notNull(readString(src, "id"))
      let peerId = notNull(readString(src, "peerId"))
      let requestBody = ConferenceMediaQuery(id: id, peerId: peerId)
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "AvailableRooms") {
      let requestBody = AvailableRoomsQuery()
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "GlobalSearch") {
      let query = notNull(readString(src, "query"))
      let requestBody = GlobalSearchQuery(query: query)
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "FeatureFlags") {
      let requestBody = FeatureFlagsQuery()
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "FeedHome") {
      let requestBody = FeedHomeQuery()
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "MyOrganizations") {
      let requestBody = MyOrganizationsQuery()
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "Organization") {
      let organizationId = notNull(readString(src, "organizationId"))
      let requestBody = OrganizationQuery(organizationId: organizationId)
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "OrganizationMembersShort") {
      let organizationId = notNull(readString(src, "organizationId"))
      let requestBody = OrganizationMembersShortQuery(organizationId: organizationId)
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "OrganizationProfile") {
      let organizationId = notNull(readString(src, "organizationId"))
      let requestBody = OrganizationProfileQuery(organizationId: organizationId)
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
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
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "ExploreComunity") {
      let query = readString(src, "query")
      let sort = readString(src, "sort")
      let page = readInt(src, "page")
      let requestBody = ExploreComunityQuery(query: query, sort: sort, page: page)
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "OrganizationPublicInvite") {
      let organizationId = readString(src, "organizationId")
      let requestBody = OrganizationPublicInviteQuery(organizationId: organizationId)
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "OrganizationByPrefix") {
      let query = notNull(readString(src, "query"))
      let requestBody = OrganizationByPrefixQuery(query: query)
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "Permissions") {
      let requestBody = PermissionsQuery()
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "SuperAdmins") {
      let requestBody = SuperAdminsQuery()
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "SuperAccounts") {
      let requestBody = SuperAccountsQuery()
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "SuperAccount") {
      let accountId = notNull(readString(src, "accountId"))
      let viaOrgId = readBool(src, "viaOrgId")
      let requestBody = SuperAccountQuery(accountId: accountId, viaOrgId: viaOrgId)
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "Profile") {
      let requestBody = ProfileQuery()
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "Settings") {
      let requestBody = SettingsQuery()
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "Users") {
      let query = notNull(readString(src, "query"))
      let requestBody = UsersQuery(query: query)
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "User") {
      let userId = notNull(readString(src, "userId"))
      let requestBody = UserQuery(userId: userId)
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "Online") {
      let userId = notNull(readString(src, "userId"))
      let requestBody = OnlineQuery(userId: userId)
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "ExplorePeople") {
      let query = readString(src, "query")
      let sort = readString(src, "sort")
      let page = readInt(src, "page")
      let after = readString(src, "after")
      let requestBody = ExplorePeopleQuery(query: query, sort: sort, page: page, after: after)
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    if (name == "ResolveShortName") {
      let shortname = notNull(readString(src, "shortname"))
      let requestBody = ResolveShortNameQuery(shortname: shortname)
      store.withinReadTransaction { (tx) in
        handler((try tx.read(query: requestBody)).resultMap, nil)
      }
      return
    }
    fatalError()
  }

  func writeQuery(store: ApolloStore, data: NSDictionary, name: String, src: NSDictionary, handler: @escaping ResponseHandler) {
    if (name == "Account") {
      let requestBody = AccountQuery()
      let data = AccountQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "AccountSettings") {
      let requestBody = AccountSettingsQuery()
      let data = AccountSettingsQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "AccountInviteInfo") {
      let inviteKey = notNull(readString(src, "inviteKey"))
      let requestBody = AccountInviteInfoQuery(inviteKey: inviteKey)
      let data = AccountInviteInfoQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "AccountAppInviteInfo") {
      let inviteKey = notNull(readString(src, "inviteKey"))
      let requestBody = AccountAppInviteInfoQuery(inviteKey: inviteKey)
      let data = AccountAppInviteInfoQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "AccountAppInvite") {
      let requestBody = AccountAppInviteQuery()
      let data = AccountAppInviteQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "AccountInvites") {
      let requestBody = AccountInvitesQuery()
      let data = AccountInvitesQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "AccountInvitesHistory") {
      let requestBody = AccountInvitesHistoryQuery()
      let data = AccountInvitesHistoryQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "ProfilePrefill") {
      let requestBody = ProfilePrefillQuery()
      let data = ProfilePrefillQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "FetchPushSettings") {
      let requestBody = FetchPushSettingsQuery()
      let data = FetchPushSettingsQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "MyApps") {
      let requestBody = MyAppsQuery()
      let data = MyAppsQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "Dialogs") {
      let after = readString(src, "after")
      let requestBody = DialogsQuery(after: after)
      let data = DialogsQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "Room") {
      let id = notNull(readString(src, "id"))
      let requestBody = RoomQuery(id: id)
      let data = RoomQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "RoomTiny") {
      let id = notNull(readString(src, "id"))
      let requestBody = RoomTinyQuery(id: id)
      let data = RoomTinyQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "RoomSuper") {
      let id = notNull(readString(src, "id"))
      let requestBody = RoomSuperQuery(id: id)
      let data = RoomSuperQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "GetDraftMessage") {
      let conversationId = notNull(readString(src, "conversationId"))
      let requestBody = GetDraftMessageQuery(conversationId: conversationId)
      let data = GetDraftMessageQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "GlobalCounter") {
      let requestBody = GlobalCounterQuery()
      let data = GlobalCounterQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "ChatHistory") {
      let chatId = notNull(readString(src, "chatId"))
      let before = readString(src, "before")
      let first = notNull(readInt(src, "first"))
      let requestBody = ChatHistoryQuery(chatId: chatId, before: before, first: first)
      let data = ChatHistoryQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "ChatSearchGroup") {
      let members = notNull(notNullListItems(readStringList(src, "members")))
      let requestBody = ChatSearchGroupQuery(members: members)
      let data = ChatSearchGroupQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "RoomSearchText") {
      let query = notNull(readString(src, "query"))
      let requestBody = RoomSearchTextQuery(query: query)
      let data = RoomSearchTextQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "RoomSearch") {
      let query = readString(src, "query")
      let sort = readString(src, "sort")
      let page = readInt(src, "page")
      let requestBody = RoomSearchQuery(query: query, sort: sort, page: page)
      let data = RoomSearchQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "RoomMembersShort") {
      let roomId = notNull(readString(src, "roomId"))
      let requestBody = RoomMembersShortQuery(roomId: roomId)
      let data = RoomMembersShortQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "RoomMembers") {
      let roomId = notNull(readString(src, "roomId"))
      let requestBody = RoomMembersQuery(roomId: roomId)
      let data = RoomMembersQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "RoomInviteLink") {
      let roomId = notNull(readString(src, "roomId"))
      let requestBody = RoomInviteLinkQuery(roomId: roomId)
      let data = RoomInviteLinkQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "RoomInviteInfo") {
      let invite = notNull(readString(src, "invite"))
      let requestBody = RoomInviteInfoQuery(invite: invite)
      let data = RoomInviteInfoQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "ResolvedInvite") {
      let key = notNull(readString(src, "key"))
      let requestBody = ResolvedInviteQuery(key: key)
      let data = ResolvedInviteQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "Conference") {
      let id = notNull(readString(src, "id"))
      let requestBody = ConferenceQuery(id: id)
      let data = ConferenceQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "ConferenceMedia") {
      let id = notNull(readString(src, "id"))
      let peerId = notNull(readString(src, "peerId"))
      let requestBody = ConferenceMediaQuery(id: id, peerId: peerId)
      let data = ConferenceMediaQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "AvailableRooms") {
      let requestBody = AvailableRoomsQuery()
      let data = AvailableRoomsQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "GlobalSearch") {
      let query = notNull(readString(src, "query"))
      let requestBody = GlobalSearchQuery(query: query)
      let data = GlobalSearchQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "FeatureFlags") {
      let requestBody = FeatureFlagsQuery()
      let data = FeatureFlagsQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "FeedHome") {
      let requestBody = FeedHomeQuery()
      let data = FeedHomeQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "MyOrganizations") {
      let requestBody = MyOrganizationsQuery()
      let data = MyOrganizationsQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "Organization") {
      let organizationId = notNull(readString(src, "organizationId"))
      let requestBody = OrganizationQuery(organizationId: organizationId)
      let data = OrganizationQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "OrganizationMembersShort") {
      let organizationId = notNull(readString(src, "organizationId"))
      let requestBody = OrganizationMembersShortQuery(organizationId: organizationId)
      let data = OrganizationMembersShortQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "OrganizationProfile") {
      let organizationId = notNull(readString(src, "organizationId"))
      let requestBody = OrganizationProfileQuery(organizationId: organizationId)
      let data = OrganizationProfileQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
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
      let data = ExploreOrganizationsQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "ExploreComunity") {
      let query = readString(src, "query")
      let sort = readString(src, "sort")
      let page = readInt(src, "page")
      let requestBody = ExploreComunityQuery(query: query, sort: sort, page: page)
      let data = ExploreComunityQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "OrganizationPublicInvite") {
      let organizationId = readString(src, "organizationId")
      let requestBody = OrganizationPublicInviteQuery(organizationId: organizationId)
      let data = OrganizationPublicInviteQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "OrganizationByPrefix") {
      let query = notNull(readString(src, "query"))
      let requestBody = OrganizationByPrefixQuery(query: query)
      let data = OrganizationByPrefixQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "Permissions") {
      let requestBody = PermissionsQuery()
      let data = PermissionsQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "SuperAdmins") {
      let requestBody = SuperAdminsQuery()
      let data = SuperAdminsQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "SuperAccounts") {
      let requestBody = SuperAccountsQuery()
      let data = SuperAccountsQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "SuperAccount") {
      let accountId = notNull(readString(src, "accountId"))
      let viaOrgId = readBool(src, "viaOrgId")
      let requestBody = SuperAccountQuery(accountId: accountId, viaOrgId: viaOrgId)
      let data = SuperAccountQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "Profile") {
      let requestBody = ProfileQuery()
      let data = ProfileQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "Settings") {
      let requestBody = SettingsQuery()
      let data = SettingsQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "Users") {
      let query = notNull(readString(src, "query"))
      let requestBody = UsersQuery(query: query)
      let data = UsersQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "User") {
      let userId = notNull(readString(src, "userId"))
      let requestBody = UserQuery(userId: userId)
      let data = UserQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "Online") {
      let userId = notNull(readString(src, "userId"))
      let requestBody = OnlineQuery(userId: userId)
      let data = OnlineQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "ExplorePeople") {
      let query = readString(src, "query")
      let sort = readString(src, "sort")
      let page = readInt(src, "page")
      let after = readString(src, "after")
      let requestBody = ExplorePeopleQuery(query: query, sort: sort, page: page, after: after)
      let data = ExplorePeopleQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    if (name == "ResolveShortName") {
      let shortname = notNull(readString(src, "shortname"))
      let requestBody = ResolveShortNameQuery(shortname: shortname)
      let data = ResolveShortNameQuery.Data(unsafeResultMap: self.convertData(src: data))
      store.withinReadWriteTransaction { (tx) in
        try tx.write(data: data, forQuery: requestBody)
        handler(nil, nil)
      }
      return
    }
    fatalError()
  }

  func writeFragment(store: ApolloStore, data: NSDictionary, name: String, handler: @escaping ResponseHandler) {
    if name == "AppFull" {
      let data = AppFull(unsafeResultMap: self.convertData(src: data))
      let key = data.id + ":" + data.__typename
      store.withinReadWriteTransaction { (tx) in
        try tx.write(object: data, withKey: key)
        handler(nil, nil)
      }
      return
    }
    if name == "ConferenceFull" {
      let data = ConferenceFull(unsafeResultMap: self.convertData(src: data))
      let key = data.id + ":" + data.__typename
      store.withinReadWriteTransaction { (tx) in
        try tx.write(object: data, withKey: key)
        handler(nil, nil)
      }
      return
    }
    if name == "TinyMessage" {
      let data = TinyMessage(unsafeResultMap: self.convertData(src: data))
      let key = data.id + ":" + data.__typename
      store.withinReadWriteTransaction { (tx) in
        try tx.write(object: data, withKey: key)
        handler(nil, nil)
      }
      return
    }
    if name == "FullMessage" {
      let data = FullMessage(unsafeResultMap: self.convertData(src: data))
      let key = data.id + ":" + data.__typename
      store.withinReadWriteTransaction { (tx) in
        try tx.write(object: data, withKey: key)
        handler(nil, nil)
      }
      return
    }
    if name == "OrganizationFull" {
      let data = OrganizationFull(unsafeResultMap: self.convertData(src: data))
      let key = data.id + ":" + data.__typename
      store.withinReadWriteTransaction { (tx) in
        try tx.write(object: data, withKey: key)
        handler(nil, nil)
      }
      return
    }
    if name == "OrganizationMedium" {
      let data = OrganizationMedium(unsafeResultMap: self.convertData(src: data))
      let key = data.id + ":" + data.__typename
      store.withinReadWriteTransaction { (tx) in
        try tx.write(object: data, withKey: key)
        handler(nil, nil)
      }
      return
    }
    if name == "OrganizationProfileFull" {
      let data = OrganizationProfileFull(unsafeResultMap: self.convertData(src: data))
      let key = data.id + ":" + data.__typename
      store.withinReadWriteTransaction { (tx) in
        try tx.write(object: data, withKey: key)
        handler(nil, nil)
      }
      return
    }
    if name == "OrganizationSearch" {
      let data = OrganizationSearch(unsafeResultMap: self.convertData(src: data))
      let key = data.id + ":" + data.__typename
      store.withinReadWriteTransaction { (tx) in
        try tx.write(object: data, withKey: key)
        handler(nil, nil)
      }
      return
    }
    if name == "OrganizationShort" {
      let data = OrganizationShort(unsafeResultMap: self.convertData(src: data))
      let key = data.id + ":" + data.__typename
      store.withinReadWriteTransaction { (tx) in
        try tx.write(object: data, withKey: key)
        handler(nil, nil)
      }
      return
    }
    if name == "SettingsFull" {
      let data = SettingsFull(unsafeResultMap: self.convertData(src: data))
      let key = data.id + ":" + data.__typename
      store.withinReadWriteTransaction { (tx) in
        try tx.write(object: data, withKey: key)
        handler(nil, nil)
      }
      return
    }
    if name == "UserFull" {
      let data = UserFull(unsafeResultMap: self.convertData(src: data))
      let key = data.id + ":" + data.__typename
      store.withinReadWriteTransaction { (tx) in
        try tx.write(object: data, withKey: key)
        handler(nil, nil)
      }
      return
    }
    if name == "UserOnline" {
      let data = UserOnline(unsafeResultMap: self.convertData(src: data))
      let key = data.id + ":" + data.__typename
      store.withinReadWriteTransaction { (tx) in
        try tx.write(object: data, withKey: key)
        handler(nil, nil)
      }
      return
    }
    if name == "UserShort" {
      let data = UserShort(unsafeResultMap: self.convertData(src: data))
      let key = data.id + ":" + data.__typename
      store.withinReadWriteTransaction { (tx) in
        try tx.write(object: data, withKey: key)
        handler(nil, nil)
      }
      return
    }
    if name == "UserTiny" {
      let data = UserTiny(unsafeResultMap: self.convertData(src: data))
      let key = data.id + ":" + data.__typename
      store.withinReadWriteTransaction { (tx) in
        try tx.write(object: data, withKey: key)
        handler(nil, nil)
      }
      return
    }
    fatalError()
  }

  func readNotificationMessages(_ src: NSDictionary, _ name: String) -> NotificationMessages? {
    let v = self.readString(src, name);
    if v != nil && !(v is NSNull) {
      return NotificationMessages.init(rawValue: v!)
     } else {
       return nil
     }
  }
  func readNotificationMessagesOptional(_ src: NSDictionary, _ name: String) -> Optional<NotificationMessages?> {
    let v = self.readString(src, name);
    if v != nil {
      if (v is NSNull) {
        return Optional.some(nil)
      } else {
        return Optional.some(NotificationMessages.init(rawValue: v!))
      }
     } else {
       return Optional.none
     }
  }
  func readOrganizationMemberRole(_ src: NSDictionary, _ name: String) -> OrganizationMemberRole? {
    let v = self.readString(src, name);
    if v != nil && !(v is NSNull) {
      return OrganizationMemberRole.init(rawValue: v!)
     } else {
       return nil
     }
  }
  func readOrganizationMemberRoleOptional(_ src: NSDictionary, _ name: String) -> Optional<OrganizationMemberRole?> {
    let v = self.readString(src, name);
    if v != nil {
      if (v is NSNull) {
        return Optional.some(nil)
      } else {
        return Optional.some(OrganizationMemberRole.init(rawValue: v!))
      }
     } else {
       return Optional.none
     }
  }
  func readSharedRoomKind(_ src: NSDictionary, _ name: String) -> SharedRoomKind? {
    let v = self.readString(src, name);
    if v != nil && !(v is NSNull) {
      return SharedRoomKind.init(rawValue: v!)
     } else {
       return nil
     }
  }
  func readSharedRoomKindOptional(_ src: NSDictionary, _ name: String) -> Optional<SharedRoomKind?> {
    let v = self.readString(src, name);
    if v != nil {
      if (v is NSNull) {
        return Optional.some(nil)
      } else {
        return Optional.some(SharedRoomKind.init(rawValue: v!))
      }
     } else {
       return Optional.none
     }
  }
  func readRoomMemberRole(_ src: NSDictionary, _ name: String) -> RoomMemberRole? {
    let v = self.readString(src, name);
    if v != nil && !(v is NSNull) {
      return RoomMemberRole.init(rawValue: v!)
     } else {
       return nil
     }
  }
  func readRoomMemberRoleOptional(_ src: NSDictionary, _ name: String) -> Optional<RoomMemberRole?> {
    let v = self.readString(src, name);
    if v != nil {
      if (v is NSNull) {
        return Optional.some(nil)
      } else {
        return Optional.some(RoomMemberRole.init(rawValue: v!))
      }
     } else {
       return Optional.none
     }
  }
  func readPostMessageType(_ src: NSDictionary, _ name: String) -> PostMessageType? {
    let v = self.readString(src, name);
    if v != nil && !(v is NSNull) {
      return PostMessageType.init(rawValue: v!)
     } else {
       return nil
     }
  }
  func readPostMessageTypeOptional(_ src: NSDictionary, _ name: String) -> Optional<PostMessageType?> {
    let v = self.readString(src, name);
    if v != nil {
      if (v is NSNull) {
        return Optional.some(nil)
      } else {
        return Optional.some(PostMessageType.init(rawValue: v!))
      }
     } else {
       return Optional.none
     }
  }
  func readEmailFrequency(_ src: NSDictionary, _ name: String) -> EmailFrequency? {
    let v = self.readString(src, name);
    if v != nil && !(v is NSNull) {
      return EmailFrequency.init(rawValue: v!)
     } else {
       return nil
     }
  }
  func readEmailFrequencyOptional(_ src: NSDictionary, _ name: String) -> Optional<EmailFrequency?> {
    let v = self.readString(src, name);
    if v != nil {
      if (v is NSNull) {
        return Optional.some(nil)
      } else {
        return Optional.some(EmailFrequency.init(rawValue: v!))
      }
     } else {
       return Optional.none
     }
  }
  func readNotificationsDelay(_ src: NSDictionary, _ name: String) -> NotificationsDelay? {
    let v = self.readString(src, name);
    if v != nil && !(v is NSNull) {
      return NotificationsDelay.init(rawValue: v!)
     } else {
       return nil
     }
  }
  func readNotificationsDelayOptional(_ src: NSDictionary, _ name: String) -> Optional<NotificationsDelay?> {
    let v = self.readString(src, name);
    if v != nil {
      if (v is NSNull) {
        return Optional.some(nil)
      } else {
        return Optional.some(NotificationsDelay.init(rawValue: v!))
      }
     } else {
       return Optional.none
     }
  }
  func readSuperAdminRole(_ src: NSDictionary, _ name: String) -> SuperAdminRole? {
    let v = self.readString(src, name);
    if v != nil && !(v is NSNull) {
      return SuperAdminRole.init(rawValue: v!)
     } else {
       return nil
     }
  }
  func readSuperAdminRoleOptional(_ src: NSDictionary, _ name: String) -> Optional<SuperAdminRole?> {
    let v = self.readString(src, name);
    if v != nil {
      if (v is NSNull) {
        return Optional.some(nil)
      } else {
        return Optional.some(SuperAdminRole.init(rawValue: v!))
      }
     } else {
       return Optional.none
     }
  }
  func parseImageRefInput(_ src: NSDictionary) -> ImageRefInput {
    let uuid = optionalNotNull(readOptionalString(src, "uuid"))
    let crop = readImageCropInputOptional(src, "crop")
    return ImageRefInput(uuid: uuid, crop: crop)
  }
  func readImageRefInput(_ src: NSDictionary, _ name: String) -> ImageRefInput? {
    let v = src[name]
    if v != nil && !(v is NSNull) {
      return self.parseImageRefInput(v as! NSDictionary)
    } else {
      return nil
    }
  }
  func readImageRefInputOptional(_ src: NSDictionary, _ name: String) -> Optional<ImageRefInput?> {
    let v = src[name]
    if v != nil {
      if (v is NSNull) {        return Optional.some(nil)      } else {
        return Optional.some(self.parseImageRefInput(v as! NSDictionary))
      }
    } else {
      return Optional.none
    }
  }
  func readImageRefInputList(_ src: NSDictionary, _ name: String) -> [ImageRefInput?]? {
    let v = src[name]
    if v != nil && !(v is NSNull) {
      let items = v as! [NSDictionary?]
      var res: [ImageRefInput?] = []
      for i in 0..<items.count {
        let itm = items[i]
        if itm != nil && !(itm is NSNull) {
          res.append(self.parseImageRefInput(itm!))
        } else {
          res.append(nil)
        }
      }
      return res
    } else {
      return nil
    }
  }
  func parseImageCropInput(_ src: NSDictionary) -> ImageCropInput {
    let x = optionalNotNull(readOptionalInt(src, "x"))
    let y = optionalNotNull(readOptionalInt(src, "y"))
    let w = optionalNotNull(readOptionalInt(src, "w"))
    let h = optionalNotNull(readOptionalInt(src, "h"))
    return ImageCropInput(x: x, y: y, w: w, h: h)
  }
  func readImageCropInput(_ src: NSDictionary, _ name: String) -> ImageCropInput? {
    let v = src[name]
    if v != nil && !(v is NSNull) {
      return self.parseImageCropInput(v as! NSDictionary)
    } else {
      return nil
    }
  }
  func readImageCropInputOptional(_ src: NSDictionary, _ name: String) -> Optional<ImageCropInput?> {
    let v = src[name]
    if v != nil {
      if (v is NSNull) {        return Optional.some(nil)      } else {
        return Optional.some(self.parseImageCropInput(v as! NSDictionary))
      }
    } else {
      return Optional.none
    }
  }
  func readImageCropInputList(_ src: NSDictionary, _ name: String) -> [ImageCropInput?]? {
    let v = src[name]
    if v != nil && !(v is NSNull) {
      let items = v as! [NSDictionary?]
      var res: [ImageCropInput?] = []
      for i in 0..<items.count {
        let itm = items[i]
        if itm != nil && !(itm is NSNull) {
          res.append(self.parseImageCropInput(itm!))
        } else {
          res.append(nil)
        }
      }
      return res
    } else {
      return nil
    }
  }
  func parseProfileInput(_ src: NSDictionary) -> ProfileInput {
    let firstName = readOptionalString(src, "firstName")
    let lastName = readOptionalString(src, "lastName")
    let photoRef = readImageRefInputOptional(src, "photoRef")
    let phone = readOptionalString(src, "phone")
    let email = readOptionalString(src, "email")
    let website = readOptionalString(src, "website")
    let about = readOptionalString(src, "about")
    let location = readOptionalString(src, "location")
    let linkedin = readOptionalString(src, "linkedin")
    let twitter = readOptionalString(src, "twitter")
    let primaryOrganization = readOptionalString(src, "primaryOrganization")
    return ProfileInput(firstName: firstName, lastName: lastName, photoRef: photoRef, phone: phone, email: email, website: website, about: about, location: location, linkedin: linkedin, twitter: twitter, primaryOrganization: primaryOrganization)
  }
  func readProfileInput(_ src: NSDictionary, _ name: String) -> ProfileInput? {
    let v = src[name]
    if v != nil && !(v is NSNull) {
      return self.parseProfileInput(v as! NSDictionary)
    } else {
      return nil
    }
  }
  func readProfileInputOptional(_ src: NSDictionary, _ name: String) -> Optional<ProfileInput?> {
    let v = src[name]
    if v != nil {
      if (v is NSNull) {        return Optional.some(nil)      } else {
        return Optional.some(self.parseProfileInput(v as! NSDictionary))
      }
    } else {
      return Optional.none
    }
  }
  func readProfileInputList(_ src: NSDictionary, _ name: String) -> [ProfileInput?]? {
    let v = src[name]
    if v != nil && !(v is NSNull) {
      let items = v as! [NSDictionary?]
      var res: [ProfileInput?] = []
      for i in 0..<items.count {
        let itm = items[i]
        if itm != nil && !(itm is NSNull) {
          res.append(self.parseProfileInput(itm!))
        } else {
          res.append(nil)
        }
      }
      return res
    } else {
      return nil
    }
  }
  func parseCreateProfileInput(_ src: NSDictionary) -> CreateProfileInput {
    let firstName = optionalNotNull(readOptionalString(src, "firstName"))
    let lastName = readOptionalString(src, "lastName")
    let photoRef = readImageRefInputOptional(src, "photoRef")
    let phone = readOptionalString(src, "phone")
    let email = readOptionalString(src, "email")
    let about = readOptionalString(src, "about")
    let location = readOptionalString(src, "location")
    let website = readOptionalString(src, "website")
    let linkedin = readOptionalString(src, "linkedin")
    let twitter = readOptionalString(src, "twitter")
    let primaryOrganization = readOptionalString(src, "primaryOrganization")
    return CreateProfileInput(firstName: firstName, lastName: lastName, photoRef: photoRef, phone: phone, email: email, about: about, location: location, website: website, linkedin: linkedin, twitter: twitter, primaryOrganization: primaryOrganization)
  }
  func readCreateProfileInput(_ src: NSDictionary, _ name: String) -> CreateProfileInput? {
    let v = src[name]
    if v != nil && !(v is NSNull) {
      return self.parseCreateProfileInput(v as! NSDictionary)
    } else {
      return nil
    }
  }
  func readCreateProfileInputOptional(_ src: NSDictionary, _ name: String) -> Optional<CreateProfileInput?> {
    let v = src[name]
    if v != nil {
      if (v is NSNull) {        return Optional.some(nil)      } else {
        return Optional.some(self.parseCreateProfileInput(v as! NSDictionary))
      }
    } else {
      return Optional.none
    }
  }
  func readCreateProfileInputList(_ src: NSDictionary, _ name: String) -> [CreateProfileInput?]? {
    let v = src[name]
    if v != nil && !(v is NSNull) {
      let items = v as! [NSDictionary?]
      var res: [CreateProfileInput?] = []
      for i in 0..<items.count {
        let itm = items[i]
        if itm != nil && !(itm is NSNull) {
          res.append(self.parseCreateProfileInput(itm!))
        } else {
          res.append(nil)
        }
      }
      return res
    } else {
      return nil
    }
  }
  func parseUpdateProfileInput(_ src: NSDictionary) -> UpdateProfileInput {
    let firstName = readOptionalString(src, "firstName")
    let lastName = readOptionalString(src, "lastName")
    let photoRef = readImageRefInputOptional(src, "photoRef")
    let phone = readOptionalString(src, "phone")
    let email = readOptionalString(src, "email")
    let website = readOptionalString(src, "website")
    let about = readOptionalString(src, "about")
    let location = readOptionalString(src, "location")
    let linkedin = readOptionalString(src, "linkedin")
    let twitter = readOptionalString(src, "twitter")
    let primaryOrganization = readOptionalString(src, "primaryOrganization")
    let alphaRole = readOptionalString(src, "alphaRole")
    let alphaLocations = notNullListItems(readStringList(src, "alphaLocations"))
    let alphaLinkedin = readOptionalString(src, "alphaLinkedin")
    let alphaTwitter = readOptionalString(src, "alphaTwitter")
    let alphaPrimaryOrganizationId = readOptionalString(src, "alphaPrimaryOrganizationId")
    return UpdateProfileInput(firstName: firstName, lastName: lastName, photoRef: photoRef, phone: phone, email: email, website: website, about: about, location: location, linkedin: linkedin, twitter: twitter, primaryOrganization: primaryOrganization, alphaRole: alphaRole, alphaLocations: alphaLocations, alphaLinkedin: alphaLinkedin, alphaTwitter: alphaTwitter, alphaPrimaryOrganizationId: alphaPrimaryOrganizationId)
  }
  func readUpdateProfileInput(_ src: NSDictionary, _ name: String) -> UpdateProfileInput? {
    let v = src[name]
    if v != nil && !(v is NSNull) {
      return self.parseUpdateProfileInput(v as! NSDictionary)
    } else {
      return nil
    }
  }
  func readUpdateProfileInputOptional(_ src: NSDictionary, _ name: String) -> Optional<UpdateProfileInput?> {
    let v = src[name]
    if v != nil {
      if (v is NSNull) {        return Optional.some(nil)      } else {
        return Optional.some(self.parseUpdateProfileInput(v as! NSDictionary))
      }
    } else {
      return Optional.none
    }
  }
  func readUpdateProfileInputList(_ src: NSDictionary, _ name: String) -> [UpdateProfileInput?]? {
    let v = src[name]
    if v != nil && !(v is NSNull) {
      let items = v as! [NSDictionary?]
      var res: [UpdateProfileInput?] = []
      for i in 0..<items.count {
        let itm = items[i]
        if itm != nil && !(itm is NSNull) {
          res.append(self.parseUpdateProfileInput(itm!))
        } else {
          res.append(nil)
        }
      }
      return res
    } else {
      return nil
    }
  }
  func parseCreateOrganizationInput(_ src: NSDictionary) -> CreateOrganizationInput {
    let id = readOptionalString(src, "id")
    let name = optionalNotNull(readOptionalString(src, "name"))
    let website = readOptionalString(src, "website")
    let personal = optionalNotNull(readOptionalBool(src, "personal"))
    let photoRef = readImageRefInputOptional(src, "photoRef")
    let about = readOptionalString(src, "about")
    let isCommunity = readOptionalBool(src, "isCommunity")
    return CreateOrganizationInput(id: id, name: name, website: website, personal: personal, photoRef: photoRef, about: about, isCommunity: isCommunity)
  }
  func readCreateOrganizationInput(_ src: NSDictionary, _ name: String) -> CreateOrganizationInput? {
    let v = src[name]
    if v != nil && !(v is NSNull) {
      return self.parseCreateOrganizationInput(v as! NSDictionary)
    } else {
      return nil
    }
  }
  func readCreateOrganizationInputOptional(_ src: NSDictionary, _ name: String) -> Optional<CreateOrganizationInput?> {
    let v = src[name]
    if v != nil {
      if (v is NSNull) {        return Optional.some(nil)      } else {
        return Optional.some(self.parseCreateOrganizationInput(v as! NSDictionary))
      }
    } else {
      return Optional.none
    }
  }
  func readCreateOrganizationInputList(_ src: NSDictionary, _ name: String) -> [CreateOrganizationInput?]? {
    let v = src[name]
    if v != nil && !(v is NSNull) {
      let items = v as! [NSDictionary?]
      var res: [CreateOrganizationInput?] = []
      for i in 0..<items.count {
        let itm = items[i]
        if itm != nil && !(itm is NSNull) {
          res.append(self.parseCreateOrganizationInput(itm!))
        } else {
          res.append(nil)
        }
      }
      return res
    } else {
      return nil
    }
  }
  func readDebugEmailType(_ src: NSDictionary, _ name: String) -> DebugEmailType? {
    let v = self.readString(src, name);
    if v != nil && !(v is NSNull) {
      return DebugEmailType.init(rawValue: v!)
     } else {
       return nil
     }
  }
  func readDebugEmailTypeOptional(_ src: NSDictionary, _ name: String) -> Optional<DebugEmailType?> {
    let v = self.readString(src, name);
    if v != nil {
      if (v is NSNull) {
        return Optional.some(nil)
      } else {
        return Optional.some(DebugEmailType.init(rawValue: v!))
      }
     } else {
       return Optional.none
     }
  }
  func parseUpdateSettingsInput(_ src: NSDictionary) -> UpdateSettingsInput {
    let emailFrequency = readEmailFrequencyOptional(src, "emailFrequency")
    let desktopNotifications = readNotificationMessagesOptional(src, "desktopNotifications")
    let mobileNotifications = readNotificationMessagesOptional(src, "mobileNotifications")
    let mobileAlert = readOptionalBool(src, "mobileAlert")
    let mobileIncludeText = readOptionalBool(src, "mobileIncludeText")
    let mute = readOptionalBool(src, "mute")
    let notificationsDelay = readNotificationsDelayOptional(src, "notificationsDelay")
    return UpdateSettingsInput(emailFrequency: emailFrequency, desktopNotifications: desktopNotifications, mobileNotifications: mobileNotifications, mobileAlert: mobileAlert, mobileIncludeText: mobileIncludeText, mute: mute, notificationsDelay: notificationsDelay)
  }
  func readUpdateSettingsInput(_ src: NSDictionary, _ name: String) -> UpdateSettingsInput? {
    let v = src[name]
    if v != nil && !(v is NSNull) {
      return self.parseUpdateSettingsInput(v as! NSDictionary)
    } else {
      return nil
    }
  }
  func readUpdateSettingsInputOptional(_ src: NSDictionary, _ name: String) -> Optional<UpdateSettingsInput?> {
    let v = src[name]
    if v != nil {
      if (v is NSNull) {        return Optional.some(nil)      } else {
        return Optional.some(self.parseUpdateSettingsInput(v as! NSDictionary))
      }
    } else {
      return Optional.none
    }
  }
  func readUpdateSettingsInputList(_ src: NSDictionary, _ name: String) -> [UpdateSettingsInput?]? {
    let v = src[name]
    if v != nil && !(v is NSNull) {
      let items = v as! [NSDictionary?]
      var res: [UpdateSettingsInput?] = []
      for i in 0..<items.count {
        let itm = items[i]
        if itm != nil && !(itm is NSNull) {
          res.append(self.parseUpdateSettingsInput(itm!))
        } else {
          res.append(nil)
        }
      }
      return res
    } else {
      return nil
    }
  }
  func parseInviteRequest(_ src: NSDictionary) -> InviteRequest {
    let email = optionalNotNull(readOptionalString(src, "email"))
    let emailText = readOptionalString(src, "emailText")
    let role = optionalNotNull(readOrganizationMemberRoleOptional(src, "role"))
    let firstName = readOptionalString(src, "firstName")
    let lastName = readOptionalString(src, "lastName")
    return InviteRequest(email: email, emailText: emailText, role: role, firstName: firstName, lastName: lastName)
  }
  func readInviteRequest(_ src: NSDictionary, _ name: String) -> InviteRequest? {
    let v = src[name]
    if v != nil && !(v is NSNull) {
      return self.parseInviteRequest(v as! NSDictionary)
    } else {
      return nil
    }
  }
  func readInviteRequestOptional(_ src: NSDictionary, _ name: String) -> Optional<InviteRequest?> {
    let v = src[name]
    if v != nil {
      if (v is NSNull) {        return Optional.some(nil)      } else {
        return Optional.some(self.parseInviteRequest(v as! NSDictionary))
      }
    } else {
      return Optional.none
    }
  }
  func readInviteRequestList(_ src: NSDictionary, _ name: String) -> [InviteRequest?]? {
    let v = src[name]
    if v != nil && !(v is NSNull) {
      let items = v as! [NSDictionary?]
      var res: [InviteRequest?] = []
      for i in 0..<items.count {
        let itm = items[i]
        if itm != nil && !(itm is NSNull) {
          res.append(self.parseInviteRequest(itm!))
        } else {
          res.append(nil)
        }
      }
      return res
    } else {
      return nil
    }
  }
  func parseEvent(_ src: NSDictionary) -> Event {
    let id = optionalNotNull(readOptionalString(src, "id"))
    let event = optionalNotNull(readOptionalString(src, "event"))
    let params = readOptionalString(src, "params")
    return Event(id: id, event: event, params: params)
  }
  func readEvent(_ src: NSDictionary, _ name: String) -> Event? {
    let v = src[name]
    if v != nil && !(v is NSNull) {
      return self.parseEvent(v as! NSDictionary)
    } else {
      return nil
    }
  }
  func readEventOptional(_ src: NSDictionary, _ name: String) -> Optional<Event?> {
    let v = src[name]
    if v != nil {
      if (v is NSNull) {        return Optional.some(nil)      } else {
        return Optional.some(self.parseEvent(v as! NSDictionary))
      }
    } else {
      return Optional.none
    }
  }
  func readEventList(_ src: NSDictionary, _ name: String) -> [Event?]? {
    let v = src[name]
    if v != nil && !(v is NSNull) {
      let items = v as! [NSDictionary?]
      var res: [Event?] = []
      for i in 0..<items.count {
        let itm = items[i]
        if itm != nil && !(itm is NSNull) {
          res.append(self.parseEvent(itm!))
        } else {
          res.append(nil)
        }
      }
      return res
    } else {
      return nil
    }
  }
  func parseAppProfileInput(_ src: NSDictionary) -> AppProfileInput {
    let name = readOptionalString(src, "name")
    let shortname = readOptionalString(src, "shortname")
    let photoRef = readImageRefInputOptional(src, "photoRef")
    let about = readOptionalString(src, "about")
    return AppProfileInput(name: name, shortname: shortname, photoRef: photoRef, about: about)
  }
  func readAppProfileInput(_ src: NSDictionary, _ name: String) -> AppProfileInput? {
    let v = src[name]
    if v != nil && !(v is NSNull) {
      return self.parseAppProfileInput(v as! NSDictionary)
    } else {
      return nil
    }
  }
  func readAppProfileInputOptional(_ src: NSDictionary, _ name: String) -> Optional<AppProfileInput?> {
    let v = src[name]
    if v != nil {
      if (v is NSNull) {        return Optional.some(nil)      } else {
        return Optional.some(self.parseAppProfileInput(v as! NSDictionary))
      }
    } else {
      return Optional.none
    }
  }
  func readAppProfileInputList(_ src: NSDictionary, _ name: String) -> [AppProfileInput?]? {
    let v = src[name]
    if v != nil && !(v is NSNull) {
      let items = v as! [NSDictionary?]
      var res: [AppProfileInput?] = []
      for i in 0..<items.count {
        let itm = items[i]
        if itm != nil && !(itm is NSNull) {
          res.append(self.parseAppProfileInput(itm!))
        } else {
          res.append(nil)
        }
      }
      return res
    } else {
      return nil
    }
  }
  func parseUpdateOrganizationProfileInput(_ src: NSDictionary) -> UpdateOrganizationProfileInput {
    let name = readOptionalString(src, "name")
    let photoRef = readImageRefInputOptional(src, "photoRef")
    let website = readOptionalString(src, "website")
    let websiteTitle = readOptionalString(src, "websiteTitle")
    let about = readOptionalString(src, "about")
    let twitter = readOptionalString(src, "twitter")
    let facebook = readOptionalString(src, "facebook")
    let linkedin = readOptionalString(src, "linkedin")
    let location = readOptionalString(src, "location")
    let contacts = notNullListItems(readContactPersonInputList(src, "contacts"))
    let alphaPublished = readOptionalBool(src, "alphaPublished")
    let alphaEditorial = readOptionalBool(src, "alphaEditorial")
    let alphaFeatured = readOptionalBool(src, "alphaFeatured")
    return UpdateOrganizationProfileInput(name: name, photoRef: photoRef, website: website, websiteTitle: websiteTitle, about: about, twitter: twitter, facebook: facebook, linkedin: linkedin, location: location, contacts: contacts, alphaPublished: alphaPublished, alphaEditorial: alphaEditorial, alphaFeatured: alphaFeatured)
  }
  func readUpdateOrganizationProfileInput(_ src: NSDictionary, _ name: String) -> UpdateOrganizationProfileInput? {
    let v = src[name]
    if v != nil && !(v is NSNull) {
      return self.parseUpdateOrganizationProfileInput(v as! NSDictionary)
    } else {
      return nil
    }
  }
  func readUpdateOrganizationProfileInputOptional(_ src: NSDictionary, _ name: String) -> Optional<UpdateOrganizationProfileInput?> {
    let v = src[name]
    if v != nil {
      if (v is NSNull) {        return Optional.some(nil)      } else {
        return Optional.some(self.parseUpdateOrganizationProfileInput(v as! NSDictionary))
      }
    } else {
      return Optional.none
    }
  }
  func readUpdateOrganizationProfileInputList(_ src: NSDictionary, _ name: String) -> [UpdateOrganizationProfileInput?]? {
    let v = src[name]
    if v != nil && !(v is NSNull) {
      let items = v as! [NSDictionary?]
      var res: [UpdateOrganizationProfileInput?] = []
      for i in 0..<items.count {
        let itm = items[i]
        if itm != nil && !(itm is NSNull) {
          res.append(self.parseUpdateOrganizationProfileInput(itm!))
        } else {
          res.append(nil)
        }
      }
      return res
    } else {
      return nil
    }
  }
  func parseContactPersonInput(_ src: NSDictionary) -> ContactPersonInput {
    let name = optionalNotNull(readOptionalString(src, "name"))
    let photoRef = readImageRefInputOptional(src, "photoRef")
    let position = readOptionalString(src, "position")
    let email = readOptionalString(src, "email")
    let phone = readOptionalString(src, "phone")
    let link = readOptionalString(src, "link")
    let twitter = readOptionalString(src, "twitter")
    return ContactPersonInput(name: name, photoRef: photoRef, position: position, email: email, phone: phone, link: link, twitter: twitter)
  }
  func readContactPersonInput(_ src: NSDictionary, _ name: String) -> ContactPersonInput? {
    let v = src[name]
    if v != nil && !(v is NSNull) {
      return self.parseContactPersonInput(v as! NSDictionary)
    } else {
      return nil
    }
  }
  func readContactPersonInputOptional(_ src: NSDictionary, _ name: String) -> Optional<ContactPersonInput?> {
    let v = src[name]
    if v != nil {
      if (v is NSNull) {        return Optional.some(nil)      } else {
        return Optional.some(self.parseContactPersonInput(v as! NSDictionary))
      }
    } else {
      return Optional.none
    }
  }
  func readContactPersonInputList(_ src: NSDictionary, _ name: String) -> [ContactPersonInput?]? {
    let v = src[name]
    if v != nil && !(v is NSNull) {
      let items = v as! [NSDictionary?]
      var res: [ContactPersonInput?] = []
      for i in 0..<items.count {
        let itm = items[i]
        if itm != nil && !(itm is NSNull) {
          res.append(self.parseContactPersonInput(itm!))
        } else {
          res.append(nil)
        }
      }
      return res
    } else {
      return nil
    }
  }
  func readPushType(_ src: NSDictionary, _ name: String) -> PushType? {
    let v = self.readString(src, name);
    if v != nil && !(v is NSNull) {
      return PushType.init(rawValue: v!)
     } else {
       return nil
     }
  }
  func readPushTypeOptional(_ src: NSDictionary, _ name: String) -> Optional<PushType?> {
    let v = self.readString(src, name);
    if v != nil {
      if (v is NSNull) {
        return Optional.some(nil)
      } else {
        return Optional.some(PushType.init(rawValue: v!))
      }
     } else {
       return Optional.none
     }
  }
  func parseRoomUpdateInput(_ src: NSDictionary) -> RoomUpdateInput {
    let title = readOptionalString(src, "title")
    let photoRef = readImageRefInputOptional(src, "photoRef")
    let description = readOptionalString(src, "description")
    let socialImageRef = readImageRefInputOptional(src, "socialImageRef")
    let kind = readSharedRoomKindOptional(src, "kind")
    return RoomUpdateInput(title: title, photoRef: photoRef, description: description, socialImageRef: socialImageRef, kind: kind)
  }
  func readRoomUpdateInput(_ src: NSDictionary, _ name: String) -> RoomUpdateInput? {
    let v = src[name]
    if v != nil && !(v is NSNull) {
      return self.parseRoomUpdateInput(v as! NSDictionary)
    } else {
      return nil
    }
  }
  func readRoomUpdateInputOptional(_ src: NSDictionary, _ name: String) -> Optional<RoomUpdateInput?> {
    let v = src[name]
    if v != nil {
      if (v is NSNull) {        return Optional.some(nil)      } else {
        return Optional.some(self.parseRoomUpdateInput(v as! NSDictionary))
      }
    } else {
      return Optional.none
    }
  }
  func readRoomUpdateInputList(_ src: NSDictionary, _ name: String) -> [RoomUpdateInput?]? {
    let v = src[name]
    if v != nil && !(v is NSNull) {
      let items = v as! [NSDictionary?]
      var res: [RoomUpdateInput?] = []
      for i in 0..<items.count {
        let itm = items[i]
        if itm != nil && !(itm is NSNull) {
          res.append(self.parseRoomUpdateInput(itm!))
        } else {
          res.append(nil)
        }
      }
      return res
    } else {
      return nil
    }
  }
  func parseRoomInviteInput(_ src: NSDictionary) -> RoomInviteInput {
    let userId = optionalNotNull(readOptionalString(src, "userId"))
    let role = optionalNotNull(readRoomMemberRoleOptional(src, "role"))
    return RoomInviteInput(userId: userId, role: role)
  }
  func readRoomInviteInput(_ src: NSDictionary, _ name: String) -> RoomInviteInput? {
    let v = src[name]
    if v != nil && !(v is NSNull) {
      return self.parseRoomInviteInput(v as! NSDictionary)
    } else {
      return nil
    }
  }
  func readRoomInviteInputOptional(_ src: NSDictionary, _ name: String) -> Optional<RoomInviteInput?> {
    let v = src[name]
    if v != nil {
      if (v is NSNull) {        return Optional.some(nil)      } else {
        return Optional.some(self.parseRoomInviteInput(v as! NSDictionary))
      }
    } else {
      return Optional.none
    }
  }
  func readRoomInviteInputList(_ src: NSDictionary, _ name: String) -> [RoomInviteInput?]? {
    let v = src[name]
    if v != nil && !(v is NSNull) {
      let items = v as! [NSDictionary?]
      var res: [RoomInviteInput?] = []
      for i in 0..<items.count {
        let itm = items[i]
        if itm != nil && !(itm is NSNull) {
          res.append(self.parseRoomInviteInput(itm!))
        } else {
          res.append(nil)
        }
      }
      return res
    } else {
      return nil
    }
  }
  func parseRoomInviteEmailRequest(_ src: NSDictionary) -> RoomInviteEmailRequest {
    let email = optionalNotNull(readOptionalString(src, "email"))
    let emailText = readOptionalString(src, "emailText")
    let firstName = readOptionalString(src, "firstName")
    let lastName = readOptionalString(src, "lastName")
    return RoomInviteEmailRequest(email: email, emailText: emailText, firstName: firstName, lastName: lastName)
  }
  func readRoomInviteEmailRequest(_ src: NSDictionary, _ name: String) -> RoomInviteEmailRequest? {
    let v = src[name]
    if v != nil && !(v is NSNull) {
      return self.parseRoomInviteEmailRequest(v as! NSDictionary)
    } else {
      return nil
    }
  }
  func readRoomInviteEmailRequestOptional(_ src: NSDictionary, _ name: String) -> Optional<RoomInviteEmailRequest?> {
    let v = src[name]
    if v != nil {
      if (v is NSNull) {        return Optional.some(nil)      } else {
        return Optional.some(self.parseRoomInviteEmailRequest(v as! NSDictionary))
      }
    } else {
      return Optional.none
    }
  }
  func readRoomInviteEmailRequestList(_ src: NSDictionary, _ name: String) -> [RoomInviteEmailRequest?]? {
    let v = src[name]
    if v != nil && !(v is NSNull) {
      let items = v as! [NSDictionary?]
      var res: [RoomInviteEmailRequest?] = []
      for i in 0..<items.count {
        let itm = items[i]
        if itm != nil && !(itm is NSNull) {
          res.append(self.parseRoomInviteEmailRequest(itm!))
        } else {
          res.append(nil)
        }
      }
      return res
    } else {
      return nil
    }
  }
  func parseRoomUserNotificaionSettingsInput(_ src: NSDictionary) -> RoomUserNotificaionSettingsInput {
    let mute = readOptionalBool(src, "mute")
    return RoomUserNotificaionSettingsInput(mute: mute)
  }
  func readRoomUserNotificaionSettingsInput(_ src: NSDictionary, _ name: String) -> RoomUserNotificaionSettingsInput? {
    let v = src[name]
    if v != nil && !(v is NSNull) {
      return self.parseRoomUserNotificaionSettingsInput(v as! NSDictionary)
    } else {
      return nil
    }
  }
  func readRoomUserNotificaionSettingsInputOptional(_ src: NSDictionary, _ name: String) -> Optional<RoomUserNotificaionSettingsInput?> {
    let v = src[name]
    if v != nil {
      if (v is NSNull) {        return Optional.some(nil)      } else {
        return Optional.some(self.parseRoomUserNotificaionSettingsInput(v as! NSDictionary))
      }
    } else {
      return Optional.none
    }
  }
  func readRoomUserNotificaionSettingsInputList(_ src: NSDictionary, _ name: String) -> [RoomUserNotificaionSettingsInput?]? {
    let v = src[name]
    if v != nil && !(v is NSNull) {
      let items = v as! [NSDictionary?]
      var res: [RoomUserNotificaionSettingsInput?] = []
      for i in 0..<items.count {
        let itm = items[i]
        if itm != nil && !(itm is NSNull) {
          res.append(self.parseRoomUserNotificaionSettingsInput(itm!))
        } else {
          res.append(nil)
        }
      }
      return res
    } else {
      return nil
    }
  }
}
