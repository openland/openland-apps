import { AddSuffixes, FilterNotTypeRecursive, FilterTypeRecursive, FlattenForIntellisense, Paths, ReplaceTypeRecurcive } from "./utils";

export type Pluralize<T, P extends string> = AddSuffixes<ReplaceTypeRecurcive<FilterTypeRecursive<T, Plural>, Plural, string>, P>;
export type PrepareSchema<T, P extends string> = FlattenForIntellisense<FilterNotTypeRecursive<T, Plural> & Pluralize<LocalizationSchema, P>>;

type Plural = number;

export type LocalizationSchema = {
    "about": string,
    "aboutOpenland": string,
    "aboutUs": string,
    "accessDenied": string,
    "accessDeniedGroup": string,
    "accessDeniedGroupDescription": string,
    "accessSuspended": string,
    "accessSuspendedDescription": string,
    "accountPrivacy": string,
    "active": string,
    "add": string,
    "addCard": string,
    "addDetailsOptional": string,
    "addPeople": string,
    "addPeopleFree": string,
    "addToGroups": string,
    "admin": string,
    "allow": string,
    "allowContacts": string,
    "allowContactsDescription": string,
    "allowed": string,
    "amount": string,
    "and": string,
    "andOthers": string,
    "angry": string,
    "appearance": string,
    "applyLink": string,
    "applyLinkDescription": string,
    "applyLinkUse": string,
    "applyToJoin": string,
    "attachDocumentAndroid": string,
    "attachDocumentIOS": string,
    "attachDonationAndroid": string,
    "attachDontaionIOS": string,
    "attachPhotoAndroid": string,
    "attachPhotoIOS": string,
    "attachRecordVideo": string,
    "attachTakePhoto": string,
    "attachVideo": string,
    "audio": string,
    "becomeListener": string,
    "billing": string,
    "billingProblem": string,
    "billingProblemDescription": string,
    "birthday": string,
    "blockPerson": string,
    "blocked": string,
    "blockedByYou": string,
    "blockedSelf": string,
    "bot": string,
    "calendarOpen": string,
    "callLink": string,
    "callMembersDefault": string,
    "callMembers": Plural,
    "camera": string,
    "cancel": string,
    "cardExpired": string,
    "cardValid": string,
    "change": string,
    "channel": string,
    "chat": string,
    "chatRecommendations": string,
    "chooseSender": string,
    "chooseShortnameGroup": string,
    "chooseShortnameChannel": string,
    "chooseShortnameCommunity": string,
    "chooseShortnameOrganization": string,
    "clear": string,
    "close": string,
    "closeRoom": string,
    "collections": string,
    "collectionsCoversBy": string,
    "comment": string,
    "commentAction": string,
    "commentDelete": string,
    "commentDeleteDescription": string,
    "comments": string,
    "community": string,
    "communityDescription": string,
    "communityPrivateDescription": string,
    "communityTypeDescription": string,
    "communityWithMember": Plural,
    "communities": string,
    "confirm": string,
    "connecting": string,
    "contactUs": string,
    "contacts": string,
    "contactsAdd": string,
    "contactsImport": string,
    "contactsImportDescription": string,
    "contactsRemove": string,
    "contactsSave": string,
    "contentMissingOrRestricted": string,
    "contentUnavailable": string,
    "continue": string,
    "continueWithEmail": string,
    "continueWithPhone": string,
    "conversationConnect": string,
    "conversationDelete": string,
    "conversationDeleteBoth": string,
    "conversationDeleteDescription": string,
    "conversationHello": string,
    "conversationNoMessages": string,
    "conversationStart": string,
    "copied": string,
    "copy": string,
    "copyLink": string,
    "correspondents": string,
    "country": string,
    "create": string,
    "createAccount": string,
    "createCommunity": string,
    "createGroup": string,
    "createGroupFree": string,
    "createGroupFreeDescription": string,
    "createGroupPaid": string,
    "createGroupPaidDescription": string,
    "createGroupSubscription": string,
    "createGroupSubscriptionDescription": string,
    "createNew": string,
    "createOrganizationDescription": string,
    "createOrganizationPublic": string,
    "createOrganizationPublicDescription": string,
    "createOrganizationSecret": string,
    "createOrganizationSecretDescription": string,
    "custom": string,
    "dateAndTime": string,
    "day": string,
    "defaultGroups": string,
    "defaultGroupsDescription": string,
    "delete": string,
    "deleteCard": string,
    "deleteCardDescription": string,
    "deleteCardQuestion": string,
    "deleteChannel": string,
    "deleteChannelQuestion": string,
    "deleteCommunity": string,
    "deleteCommunityQuestion": string,
    "deleteGroup": string,
    "deleteGroupQuestion": string,
    "deleteMessageDescription": string,
    "deleteMessageQuestion": string,
    "deleteMessagesDescription": string,
    "deleteOrganization": string,
    "deleteOrganizationQuestion": string,
    "deletePerson": string,
    "deletePinnedMessageQuestion": string,
    "deleteUser": string,
    "description": string,
    "dialogAllChats": string,
    "dialogChats": string,
    "dialogDirect": string,
    "dialogGroups": string,
    "dialogUnread": string,
    "directMessages": string,
    "disallowed": string,
    "discover": string,
    "discoverChannel": string,
    "discoverChat": string,
    "discoverChats": string,
    "discoverCommunity": string,
    "discoverFindChats": string,
    "discoverGetRecommendations": string,
    "discoverGroups": string,
    "discoverNewCommunities": string,
    "discoverNewGroups": string,
    "discoverPopular": string,
    "discoverRecommendations": string,
    "discoverTopCommunities": string,
    "discoverTopGroups": string,
    "discoverTopPremium": string,
    "dismiss": string,
    "dismissAdmin": string,
    "dismissAdminQuestion": string,
    "document": string,
    "donate": string,
    "donateToUser": string,
    "done": string,
    "edit": string,
    "editChannel": string,
    "editComment": string,
    "editCommunity": string,
    "editGroup": string,
    "editInfo": string,
    "editMessage": string,
    "editOrganization": string,
    "editPersonalVisibility": string,
    "editProfile": string,
    "editRoom": string,
    "email": string,
    "emailPreferences": string,
    "end": string,
    "endRoom": string,
    "endRoomDescription": string,
    "enterCode": string,
    "enterDay": string,
    "enterValidDate": string,
    "error": string,
    "errorAbstract": string,
    "errorCardInvalid": string,
    "errorFileUpload": string,
    "errorJoinChat": string,
    "errorNoInvite": string,
    "errorRepliesDisabled": string,
    "errorUnknown": string,
    "everyone": string,
    "expired": string,
    "featured": string,
    "files": string,
    "findChats": string,
    "findFriends": string,
    "firstName": string,
    "flip": string,
    "follow": string,
    "followed": string,
    "follower": Plural,
    "followers": string,
    "following": string,
    "followingCount": Plural,
    "forward": string,
    "forwardMessages": string,
    "forwardTo": string,
    "forwardedMessage": Plural,
    "free": string,
    "fromChat": string,
    "fromChatWith": string,
    "getHelp": string,
    "goBack": string,
    "gotIt": string,
    "group": Plural,
    "groupCalls": string,
    "groupCallsChoose": string,
    "groupCallsCustom": string,
    "groupCallsExternal": string,
    "groupCallsNone": string,
    "groupCallsStandard": string,
    "groupPriceDescription": string,
    "groups": string,
    "groupsColon": string,
    "haha": string,
    "helpAndFeedback": string,
    "illustrationsBy": string,
    "info": string,
    "inputPlaceholderChannel": string,
    "inputPlaceholderGroup": string,
    "invite": string,
    "inviteAccept": string,
    "inviteByUser": string,
    "inviteContacts": string,
    "inviteFriends": string,
    "inviteFriendsDescription": string,
    "inviteJoinChannel": string,
    "inviteJoinConversation": string,
    "inviteLinkChannel": string,
    "inviteLinkCommunity": string,
    "inviteLinkCommunityDescription": string,
    "inviteLinkDescription": string,
    "inviteLinkGroup": string,
    "inviteLinkOrganization": string,
    "inviteLinkOrganizationDescription": string,
    "inviteRevoked": string,
    "inviteTo": string,
    "inviteWithLink": string,
    "join": string,
    "joinAll": string,
    "joinChannel": string,
    "joinChat": string,
    "joinGroup": string,
    "joinPaidChat": string,
    "joinPaidChatWithPeriod": string,
    "joinRoom": string,
    "joinedDate": string,
    "kickCommunity": string,
    "kickCommunityQuestion": string,
    "kickOrganization": string,
    "kickOrganizationQuestion": string,
    "kickUserFromChannel": string,
    "kickUserFromGroup": string,
    "kickWarning": string,
    "lastName": string,
    "leave": string,
    "leaveChannel": string,
    "leaveChannelQuestion": string,
    "leaveChatDescription": string,
    "leaveChatPremiumDescription": string,
    "leaveCommunity": string,
    "leaveCommunityQuestion": string,
    "leaveGroup": string,
    "leaveGroupQuestion": string,
    "leaveOrganization": string,
    "leaveOrganizationQuestion": string,
    "leaveWarning": string,
    "licenses": string,
    "like": string,
    "likeCount": Plural,
    "liked": string,
    "linkCopied": string,
    "links": string,
    "listeners": string,
    "loading": string,
    "location": string,
    "loginCodeDescription": string,
    "loginEmailQuestion": string,
    "loginPhoneConfirm": string,
    "loginPhoneQuestion": string,
    "loginSigninCode": string,
    "loginSignupCode": string,
    "loginTitle": string,
    "love": string,
    "make": string,
    "makeAdmin": string,
    "makeAdminQuestion": string,
    "makeDonation": string,
    "makeListener": string,
    "makePrimary": string,
    "makeSpeaker": string,
    "maybeLater": string,
    "media": string,
    "member": Plural,
    "members": string,
    "membersColon": string,
    "mentionsMissing": string,
    "mentionsSearch": string,
    "message": Plural,
    "messageAction": string,
    "messages": string,
    "messageAdmin": string,
    "month": string,
    "more": string,
    "mute": string,
    "mutualGroups": string,
    "name": string,
    "needHelp": string,
    "new": string,
    "newCard": string,
    "newChannel": string,
    "newChat": string,
    "newCommunity": string,
    "newGroup": string,
    "newMessage": Plural,
    "newMessages": string,
    "newOrganization": string,
    "newRoom": string,
    "next": string,
    "noContacts": string,
    "noFollowers": string,
    "noFollowing": string,
    "noNotifications": string,
    "noNotificationsDescripiton": string,
    "noUndoneOperation": string,
    "nobody": string,
    "nobodyFound": string,
    "noiseDescription": string,
    "noiseTitle": string,
    "none": string,
    "notPaired": string,
    "nothingFound": string,
    "notifications": string,
    "notificationsBadgeCounter": string,
    "notificationsBadgeCounterDescription": string,
    "notificationsChannels": string,
    "notificationsComments": string,
    "notificationsCommunityGroups": string,
    "notificationsCountChats": string,
    "notificationsDay": string,
    "notificationsEmail": string,
    "notificationsEmailDescription": string,
    "notificationsHour": string,
    "notificationsIncludeMuted": string,
    "notificationsMessages": string,
    "notificationsMin15": string,
    "notificationsMute": string,
    "notificationsNameAndText": string,
    "notificationsNameOnly": string,
    "notificationsNever": string,
    "notificationsPreview": string,
    "notificationsSecretGroups": string,
    "notificationsShow": string,
    "notificationsUnmute": string,
    "notificationsWeek": string,
    "off": string,
    "on": string,
    "online": string,
    "open": string,
    "openWallet": string,
    "openland": string,
    "openlandApps": string,
    "organization": string,
    "organizationDescription": string,
    "organizationShortname": string,
    "organizationWithMember": Plural,
    "other": string,
    "pairAccountPhone": string,
    "pairAccountEmail": string,
    "payChoosePaymentMethod": string,
    "payCompleteTransaction": string,
    "payment": string,
    "paymentMethod": string,
    "paymentMethodUpdate": string,
    "paymentMethodUpdateDescription": string,
    "paymentMethods": string,
    "payments": string,
    "paymentsFaq": string,
    "paymentsHelp": string,
    "pending": string,
    "period": string,
    "periodLongPerMonth": string,
    "periodLongPerWeek": string,
    "periodShortMonth": string,
    "periodShortWeek": string,
    "permissionCameraAndroid": string,
    "permissionCameraIOS": string,
    "permissionCameraInstructionsAndroid": string,
    "permissionCameraInstructionsIOS": string,
    "permissionContactsAndroid": string,
    "permissionContactsIOS": string,
    "permissionContactsInstructionsAndroid": string,
    "permissionContactsInstructionsIOS": string,
    "permissionGalleryAndroid": string,
    "permissionGalleryIOS": string,
    "permissionGalleryInstructionsAndroid": string,
    "permissionGalleryInstructionsIOS": string,
    "permissionMicrophoneAndroid": string,
    "permissionMicrophoneIOS": string,
    "permissionMicrophoneInstructionsAndroid": string,
    "permissionMicrophoneInstructionsIOS": string,
    "permissionStorageAndroid": string,
    "permissionStorageInstructionsAndroid": string,
    "phone": string,
    "phoneNumber": string,
    "pickMembers": string,
    "pin": string,
    "pinned": string,
    "pinnedMessage": string,
    "preferences": string,
    "premiumReactionDonate": string,
    "premiumReactionDonated": string,
    "price": string,
    "primary": string,
    "privacy": string,
    "privacyAddToGroups": string,
    "privacyAdminsRight": string,
    "privacyEmail": string,
    "privacyPhone": string,
    "privacyPolicy": string,
    "privacyStatement": string,
    "private": string,
    "privateCommunityDescription": string,
    "privateOrganizationDescription": string,
    "profile": string,
    "public": string,
    "raiseHand": string,
    "raiseHandQuesitonDescription": string,
    "raiseHandQuestion": string,
    "raisedHands": string,
    "raisedHandsEmpty": string,
    "raisedHandsEmptyDescription": string,
    "rateApp": string,
    "rateAppDescription": string,
    "rateAppTitle": string,
    "rateNow": string,
    "recent": string,
    "remove": string,
    "removeAdmin": string,
    "removeAdminQuestion": string,
    "removeFromChannel": string,
    "removeFromGroup": string,
    "reply": string,
    "replyMessages": string,
    "report": string,
    "reportSent": string,
    "reportSpam": string,
    "reportSpamTitle": string,
    "reportsClone": string,
    "reportsHarmful": string,
    "reportsOffensive": string,
    "reportsOther": string,
    "reportsSpam": string,
    "resend": string,
    "revokeLink": string,
    "room": string,
    "roomCreateDescription": string,
    "roomName": string,
    "rooms": string,
    "roomsAdminLeft": string,
    "roomsFeedEmpty": string,
    "roomsFeedEmptyDescription": string,
    "sad": string,
    "save": string,
    "savePhotoDefault": string,
    "savePhotoIOS": string,
    "saved": string,
    "savedMessages": string,
    "search": string,
    "searchDefault": string,
    "searchDialogs": string,
    "searchDiscover": string,
    "searchEmpty": string,
    "searchMembers": string,
    "searchMessages": string,
    "secretGroupLabel": string,
    "secretChannelLabel": string,
    "seeAll": string,
    "select": string,
    "selectCountry": string,
    "selectMonth": string,
    "selectedMessage": Plural,
    "selectedMessageDefault": string,
    "send": string,
    "sendMessage": string,
    "sender": string,
    "serviceMessages": string,
    "serviceMessagesDescription": string,
    "serviceMessagesJoins": string,
    "serviceMessagesLeaves": string,
    "serviceVoiceChatStarted": string,
    "settings": string,
    "share": string,
    "shareChallenges": string,
    "shareLink": string,
    "shareNothing": string,
    "sharePhoto": string,
    "shareWith": string,
    "shareWithQuestion": string,
    "shared": string,
    "sharedMediaEmptyMedia": string,
    "sharedMediaEmptyFiles": string,
    "sharedMediaEmptyLinks": string,
    "sharedMediaEmptyDescription": string,
    "sharedMediaTitle": string,
    "shortThousand": string,
    "shortname": string,
    "shortnameDescription": string,
    "shortnameUserDescription": string,
    "showMore": string,
    "signOut": string,
    "signOutDescription": string,
    "signOutFromApp": string,
    "signinMethods": string,
    "signupSubtitle": string,
    "signupTitle": string,
    "skip": string,
    "socialSharingImage": string,
    "socialSharingImageDescription": string,
    "someone": string,
    "sound": string,
    "speaker": string,
    "standard": string,
    "start": string,
    "startRoom": string,
    "status": string,
    "sticker": Plural,
    "stickerAdd": Plural,
    "stickerDelete": Plural,
    "stickerPackDelete": string,
    "stickerPackPrivate": string,
    "stickerPackRemoved": string,
    "stickerPackUnavailable": string,
    "stickers": string,
    "stickersClearRecent": string,
    "stickersDeletePack": string,
    "stickersDiscover": string,
    "stickersDiscoverDescription": string,
    "submitCodeNotReceived": string,
    "submitCodeSent": string,
    "submitCodeWait": string,
    "subscriptionCancel": string,
    "subscriptionCancelDescription": string,
    "subscriptions": string,
    "subscriptionsEmpty": string,
    "subscriptionsEmptyDescription": string,
    "subscriptionsStarted": string,
    "subscriptionsPaymentFailed": string,
    "subscriptionsCanceled": string,
    "subscriptionsExpired": string,
    "subscriptionsPeriod": string,
    "suggestedChats": string,
    "superEdit": string,
    "superadminSettings": string,
    "termsOfService": string,
    "theme": string,
    "themeAccent": string,
    "themeDark": string,
    "themeFeaturedMark": string,
    "themeLargeEmoji": string,
    "themeLight": string,
    "themePreviewAnswer": string,
    "themePreviewQuestion": string,
    "themeSystem": string,
    "themeTrueDark": string,
    "threadFollow": string,
    "threadUnfollow": string,
    "thumbsUp": string,
    "totalAmount": string,
    "transacitonFailed": string,
    "transactions": string,
    "tryAgain": string,
    "type": string,
    "typing": string,
    "typingFile": string,
    "typingPhoto": string,
    "typingSticker": string,
    "typingVideo": string,
    "unblockPerson": string,
    "unfollow": string,
    "unfollowed": string,
    "unmute": string,
    "unmuteShort": string,
    "unpin": string,
    "unpinned": string,
    "unsupportedMessage": string,
    "updateAppDescription": string,
    "updateAppTitle": string,
    "updateNow": string,
    "upload": string,
    "uploadPhoto": string,
    "userGuide": string,
    "username": string,
    "validationAmountMax": string,
    "validationAmountMin": string,
    "validationDate": string,
    "validationDescriptionMaxChars": string,
    "validationEnterName": string,
    "validationEnterPrice": string,
    "validationLink": string,
    "validationMaxChars": string,
    "validationMinChars": string,
    "validationNumbersOnly": string,
    "validationProfileName": string,
    "validationShortname": string,
    "version": string,
    "video": string,
    "viewChannel": string,
    "viewGroup": string,
    "viewMessages": string,
    "viewProfile": string,
    "visibility": string,
    "visibilityPublic": string,
    "visibilityPublicDescription": string,
    "visibilitySecret": string,
    "visibilitySecretDescription": string,
    "waitingForNetwork": string,
    "wallet": string,
    "walletBasic": string,
    "walletDeposit": string,
    "walletDonation": string,
    "walletEmpty": string,
    "walletIncome": string,
    "walletPayment": string,
    "walletPremiumReaction": string,
    "walletSubscription": string,
    "walletTopUpBalance": string,
    "walletTransaction": string,
    "walletTransfer": string,
    "warningAddMembers": string,
    "warningAddMembersDescription": string,
    "warningPremiumReaction": string,
    "warningPremiumReactionDescription": string,
    "website": string,
    "week": string,
    "welcomeMessage": string,
    "welcomeMessageAllow": string,
    "welcomeMessageDescription": string,
    "whatToJoin": string,
    "withdraw": string,
    "withdrawFunds": string,
    "withdrawFundsDescription": string,
    "wow": string,
    "year": string,
    "yesSure": string,
    "you": string,
    "yourBalance": string,
    "yourEmail": string,
    "yourMessaage": string,
    "yourPhone": string,
    "dateTime": {
        "today": string,
        "yesterday": string,
        "now": string,
        "at": string,
        "shortMinute": string,
        "shortHour": string,
        "shortDay": string,
        "justNow": string,
        "lastSeenYesterday": string,
        "lastSeenTwoDays": string,
        "lastSeenLongTime": string,
        "lastSeenDefault": string,
        "yearsOldShort": Plural,
    }
};

export type LocalizedResources = Paths<LocalizationSchema, string>;
export type LocalizedPluralsResources = Paths<LocalizationSchema, Plural>;
