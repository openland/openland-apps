//  This file was automatically generated and should not be edited.

import Apollo

public struct CreateOrganizationInput: GraphQLMapConvertible {
  public var graphQLMap: GraphQLMap

  public init(id: Swift.Optional<GraphQLID?> = nil, name: String, website: Swift.Optional<String?> = nil, personal: Bool, photoRef: Swift.Optional<ImageRefInput?> = nil, about: Swift.Optional<String?> = nil, isCommunity: Swift.Optional<Bool?> = nil) {
    graphQLMap = ["id": id, "name": name, "website": website, "personal": personal, "photoRef": photoRef, "about": about, "isCommunity": isCommunity]
  }

  public var id: Swift.Optional<GraphQLID?> {
    get {
      return graphQLMap["id"] as! Swift.Optional<GraphQLID?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "id")
    }
  }

  public var name: String {
    get {
      return graphQLMap["name"] as! String
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "name")
    }
  }

  public var website: Swift.Optional<String?> {
    get {
      return graphQLMap["website"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "website")
    }
  }

  public var personal: Bool {
    get {
      return graphQLMap["personal"] as! Bool
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "personal")
    }
  }

  public var photoRef: Swift.Optional<ImageRefInput?> {
    get {
      return graphQLMap["photoRef"] as! Swift.Optional<ImageRefInput?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "photoRef")
    }
  }

  public var about: Swift.Optional<String?> {
    get {
      return graphQLMap["about"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "about")
    }
  }

  public var isCommunity: Swift.Optional<Bool?> {
    get {
      return graphQLMap["isCommunity"] as! Swift.Optional<Bool?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "isCommunity")
    }
  }
}

public struct ImageRefInput: GraphQLMapConvertible {
  public var graphQLMap: GraphQLMap

  public init(uuid: String, crop: Swift.Optional<ImageCropInput?> = nil) {
    graphQLMap = ["uuid": uuid, "crop": crop]
  }

  public var uuid: String {
    get {
      return graphQLMap["uuid"] as! String
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "uuid")
    }
  }

  public var crop: Swift.Optional<ImageCropInput?> {
    get {
      return graphQLMap["crop"] as! Swift.Optional<ImageCropInput?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "crop")
    }
  }
}

public struct ImageCropInput: GraphQLMapConvertible {
  public var graphQLMap: GraphQLMap

  public init(x: Int, y: Int, w: Int, h: Int) {
    graphQLMap = ["x": x, "y": y, "w": w, "h": h]
  }

  public var x: Int {
    get {
      return graphQLMap["x"] as! Int
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "x")
    }
  }

  public var y: Int {
    get {
      return graphQLMap["y"] as! Int
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "y")
    }
  }

  public var w: Int {
    get {
      return graphQLMap["w"] as! Int
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "w")
    }
  }

  public var h: Int {
    get {
      return graphQLMap["h"] as! Int
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "h")
    }
  }
}

public struct ProfileInput: GraphQLMapConvertible {
  public var graphQLMap: GraphQLMap

  public init(firstName: Swift.Optional<String?> = nil, lastName: Swift.Optional<String?> = nil, photoRef: Swift.Optional<ImageRefInput?> = nil, phone: Swift.Optional<String?> = nil, email: Swift.Optional<String?> = nil, website: Swift.Optional<String?> = nil, about: Swift.Optional<String?> = nil, location: Swift.Optional<String?> = nil, linkedin: Swift.Optional<String?> = nil, twitter: Swift.Optional<String?> = nil, primaryOrganization: Swift.Optional<GraphQLID?> = nil) {
    graphQLMap = ["firstName": firstName, "lastName": lastName, "photoRef": photoRef, "phone": phone, "email": email, "website": website, "about": about, "location": location, "linkedin": linkedin, "twitter": twitter, "primaryOrganization": primaryOrganization]
  }

  public var firstName: Swift.Optional<String?> {
    get {
      return graphQLMap["firstName"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "firstName")
    }
  }

  public var lastName: Swift.Optional<String?> {
    get {
      return graphQLMap["lastName"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "lastName")
    }
  }

  public var photoRef: Swift.Optional<ImageRefInput?> {
    get {
      return graphQLMap["photoRef"] as! Swift.Optional<ImageRefInput?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "photoRef")
    }
  }

  public var phone: Swift.Optional<String?> {
    get {
      return graphQLMap["phone"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "phone")
    }
  }

  public var email: Swift.Optional<String?> {
    get {
      return graphQLMap["email"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "email")
    }
  }

  public var website: Swift.Optional<String?> {
    get {
      return graphQLMap["website"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "website")
    }
  }

  public var about: Swift.Optional<String?> {
    get {
      return graphQLMap["about"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "about")
    }
  }

  public var location: Swift.Optional<String?> {
    get {
      return graphQLMap["location"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "location")
    }
  }

  public var linkedin: Swift.Optional<String?> {
    get {
      return graphQLMap["linkedin"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "linkedin")
    }
  }

  public var twitter: Swift.Optional<String?> {
    get {
      return graphQLMap["twitter"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "twitter")
    }
  }

  public var primaryOrganization: Swift.Optional<GraphQLID?> {
    get {
      return graphQLMap["primaryOrganization"] as! Swift.Optional<GraphQLID?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "primaryOrganization")
    }
  }
}

public enum PushType: RawRepresentable, Equatable, Hashable, Apollo.JSONDecodable, Apollo.JSONEncodable {
  public typealias RawValue = String
  case webPush
  case ios
  case android
  case safari
  /// Auto generated constant for unknown enum values
  case __unknown(RawValue)

  public init?(rawValue: RawValue) {
    switch rawValue {
      case "WEB_PUSH": self = .webPush
      case "IOS": self = .ios
      case "ANDROID": self = .android
      case "SAFARI": self = .safari
      default: self = .__unknown(rawValue)
    }
  }

  public var rawValue: RawValue {
    switch self {
      case .webPush: return "WEB_PUSH"
      case .ios: return "IOS"
      case .android: return "ANDROID"
      case .safari: return "SAFARI"
      case .__unknown(let value): return value
    }
  }

  public static func == (lhs: PushType, rhs: PushType) -> Bool {
    switch (lhs, rhs) {
      case (.webPush, .webPush): return true
      case (.ios, .ios): return true
      case (.android, .android): return true
      case (.safari, .safari): return true
      case (.__unknown(let lhsValue), .__unknown(let rhsValue)): return lhsValue == rhsValue
      default: return false
    }
  }
}

public struct AppProfileInput: GraphQLMapConvertible {
  public var graphQLMap: GraphQLMap

  public init(name: Swift.Optional<String?> = nil, shortname: Swift.Optional<String?> = nil, photoRef: Swift.Optional<ImageRefInput?> = nil, about: Swift.Optional<String?> = nil) {
    graphQLMap = ["name": name, "shortname": shortname, "photoRef": photoRef, "about": about]
  }

  public var name: Swift.Optional<String?> {
    get {
      return graphQLMap["name"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "name")
    }
  }

  public var shortname: Swift.Optional<String?> {
    get {
      return graphQLMap["shortname"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "shortname")
    }
  }

  public var photoRef: Swift.Optional<ImageRefInput?> {
    get {
      return graphQLMap["photoRef"] as! Swift.Optional<ImageRefInput?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "photoRef")
    }
  }

  public var about: Swift.Optional<String?> {
    get {
      return graphQLMap["about"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "about")
    }
  }
}

public enum DialogKind: RawRepresentable, Equatable, Hashable, Apollo.JSONDecodable, Apollo.JSONEncodable {
  public typealias RawValue = String
  case `private`
  case `internal`
  case `public`
  case group
  /// Auto generated constant for unknown enum values
  case __unknown(RawValue)

  public init?(rawValue: RawValue) {
    switch rawValue {
      case "PRIVATE": self = .private
      case "INTERNAL": self = .internal
      case "PUBLIC": self = .public
      case "GROUP": self = .group
      default: self = .__unknown(rawValue)
    }
  }

  public var rawValue: RawValue {
    switch self {
      case .private: return "PRIVATE"
      case .internal: return "INTERNAL"
      case .public: return "PUBLIC"
      case .group: return "GROUP"
      case .__unknown(let value): return value
    }
  }

  public static func == (lhs: DialogKind, rhs: DialogKind) -> Bool {
    switch (lhs, rhs) {
      case (.private, .private): return true
      case (.internal, .internal): return true
      case (.public, .public): return true
      case (.group, .group): return true
      case (.__unknown(let lhsValue), .__unknown(let rhsValue)): return lhsValue == rhsValue
      default: return false
    }
  }
}

public enum PostMessageType: RawRepresentable, Equatable, Hashable, Apollo.JSONDecodable, Apollo.JSONEncodable {
  public typealias RawValue = String
  case blank
  case jobOpportunity
  case officeHours
  case requestForStartups
  /// Auto generated constant for unknown enum values
  case __unknown(RawValue)

  public init?(rawValue: RawValue) {
    switch rawValue {
      case "BLANK": self = .blank
      case "JOB_OPPORTUNITY": self = .jobOpportunity
      case "OFFICE_HOURS": self = .officeHours
      case "REQUEST_FOR_STARTUPS": self = .requestForStartups
      default: self = .__unknown(rawValue)
    }
  }

  public var rawValue: RawValue {
    switch self {
      case .blank: return "BLANK"
      case .jobOpportunity: return "JOB_OPPORTUNITY"
      case .officeHours: return "OFFICE_HOURS"
      case .requestForStartups: return "REQUEST_FOR_STARTUPS"
      case .__unknown(let value): return value
    }
  }

  public static func == (lhs: PostMessageType, rhs: PostMessageType) -> Bool {
    switch (lhs, rhs) {
      case (.blank, .blank): return true
      case (.jobOpportunity, .jobOpportunity): return true
      case (.officeHours, .officeHours): return true
      case (.requestForStartups, .requestForStartups): return true
      case (.__unknown(let lhsValue), .__unknown(let rhsValue)): return lhsValue == rhsValue
      default: return false
    }
  }
}

public enum SharedRoomKind: RawRepresentable, Equatable, Hashable, Apollo.JSONDecodable, Apollo.JSONEncodable {
  public typealias RawValue = String
  case `internal`
  case `public`
  case group
  /// Auto generated constant for unknown enum values
  case __unknown(RawValue)

  public init?(rawValue: RawValue) {
    switch rawValue {
      case "INTERNAL": self = .internal
      case "PUBLIC": self = .public
      case "GROUP": self = .group
      default: self = .__unknown(rawValue)
    }
  }

  public var rawValue: RawValue {
    switch self {
      case .internal: return "INTERNAL"
      case .public: return "PUBLIC"
      case .group: return "GROUP"
      case .__unknown(let value): return value
    }
  }

  public static func == (lhs: SharedRoomKind, rhs: SharedRoomKind) -> Bool {
    switch (lhs, rhs) {
      case (.internal, .internal): return true
      case (.public, .public): return true
      case (.group, .group): return true
      case (.__unknown(let lhsValue), .__unknown(let rhsValue)): return lhsValue == rhsValue
      default: return false
    }
  }
}

public struct RoomInviteInput: GraphQLMapConvertible {
  public var graphQLMap: GraphQLMap

  public init(userId: GraphQLID, role: RoomMemberRole) {
    graphQLMap = ["userId": userId, "role": role]
  }

  public var userId: GraphQLID {
    get {
      return graphQLMap["userId"] as! GraphQLID
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "userId")
    }
  }

  public var role: RoomMemberRole {
    get {
      return graphQLMap["role"] as! RoomMemberRole
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "role")
    }
  }
}

public enum RoomMemberRole: RawRepresentable, Equatable, Hashable, Apollo.JSONDecodable, Apollo.JSONEncodable {
  public typealias RawValue = String
  case owner
  case admin
  case member
  /// Auto generated constant for unknown enum values
  case __unknown(RawValue)

  public init?(rawValue: RawValue) {
    switch rawValue {
      case "OWNER": self = .owner
      case "ADMIN": self = .admin
      case "MEMBER": self = .member
      default: self = .__unknown(rawValue)
    }
  }

  public var rawValue: RawValue {
    switch self {
      case .owner: return "OWNER"
      case .admin: return "ADMIN"
      case .member: return "MEMBER"
      case .__unknown(let value): return value
    }
  }

  public static func == (lhs: RoomMemberRole, rhs: RoomMemberRole) -> Bool {
    switch (lhs, rhs) {
      case (.owner, .owner): return true
      case (.admin, .admin): return true
      case (.member, .member): return true
      case (.__unknown(let lhsValue), .__unknown(let rhsValue)): return lhsValue == rhsValue
      default: return false
    }
  }
}

public enum SharedRoomMembershipStatus: RawRepresentable, Equatable, Hashable, Apollo.JSONDecodable, Apollo.JSONEncodable {
  public typealias RawValue = String
  case member
  case requested
  case `left`
  case kicked
  case `none`
  /// Auto generated constant for unknown enum values
  case __unknown(RawValue)

  public init?(rawValue: RawValue) {
    switch rawValue {
      case "MEMBER": self = .member
      case "REQUESTED": self = .requested
      case "LEFT": self = .left
      case "KICKED": self = .kicked
      case "NONE": self = .none
      default: self = .__unknown(rawValue)
    }
  }

  public var rawValue: RawValue {
    switch self {
      case .member: return "MEMBER"
      case .requested: return "REQUESTED"
      case .left: return "LEFT"
      case .kicked: return "KICKED"
      case .none: return "NONE"
      case .__unknown(let value): return value
    }
  }

  public static func == (lhs: SharedRoomMembershipStatus, rhs: SharedRoomMembershipStatus) -> Bool {
    switch (lhs, rhs) {
      case (.member, .member): return true
      case (.requested, .requested): return true
      case (.left, .left): return true
      case (.kicked, .kicked): return true
      case (.none, .none): return true
      case (.__unknown(let lhsValue), .__unknown(let rhsValue)): return lhsValue == rhsValue
      default: return false
    }
  }
}

public struct RoomUserNotificaionSettingsInput: GraphQLMapConvertible {
  public var graphQLMap: GraphQLMap

  public init(mute: Swift.Optional<Bool?> = nil) {
    graphQLMap = ["mute": mute]
  }

  public var mute: Swift.Optional<Bool?> {
    get {
      return graphQLMap["mute"] as! Swift.Optional<Bool?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "mute")
    }
  }
}

public struct RoomInviteEmailRequest: GraphQLMapConvertible {
  public var graphQLMap: GraphQLMap

  public init(email: String, emailText: Swift.Optional<String?> = nil, firstName: Swift.Optional<String?> = nil, lastName: Swift.Optional<String?> = nil) {
    graphQLMap = ["email": email, "emailText": emailText, "firstName": firstName, "lastName": lastName]
  }

  public var email: String {
    get {
      return graphQLMap["email"] as! String
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "email")
    }
  }

  public var emailText: Swift.Optional<String?> {
    get {
      return graphQLMap["emailText"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "emailText")
    }
  }

  public var firstName: Swift.Optional<String?> {
    get {
      return graphQLMap["firstName"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "firstName")
    }
  }

  public var lastName: Swift.Optional<String?> {
    get {
      return graphQLMap["lastName"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "lastName")
    }
  }
}

public struct RoomUpdateInput: GraphQLMapConvertible {
  public var graphQLMap: GraphQLMap

  public init(title: Swift.Optional<String?> = nil, photoRef: Swift.Optional<ImageRefInput?> = nil, description: Swift.Optional<String?> = nil, socialImageRef: Swift.Optional<ImageRefInput?> = nil, kind: Swift.Optional<SharedRoomKind?> = nil) {
    graphQLMap = ["title": title, "photoRef": photoRef, "description": description, "socialImageRef": socialImageRef, "kind": kind]
  }

  public var title: Swift.Optional<String?> {
    get {
      return graphQLMap["title"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "title")
    }
  }

  public var photoRef: Swift.Optional<ImageRefInput?> {
    get {
      return graphQLMap["photoRef"] as! Swift.Optional<ImageRefInput?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "photoRef")
    }
  }

  public var description: Swift.Optional<String?> {
    get {
      return graphQLMap["description"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "description")
    }
  }

  public var socialImageRef: Swift.Optional<ImageRefInput?> {
    get {
      return graphQLMap["socialImageRef"] as! Swift.Optional<ImageRefInput?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "socialImageRef")
    }
  }

  public var kind: Swift.Optional<SharedRoomKind?> {
    get {
      return graphQLMap["kind"] as! Swift.Optional<SharedRoomKind?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "kind")
    }
  }
}

public enum MediaStreamState: RawRepresentable, Equatable, Hashable, Apollo.JSONDecodable, Apollo.JSONEncodable {
  public typealias RawValue = String
  case waitOffer
  case needOffer
  case waitAnswer
  case needAnswer
  case ready
  /// Auto generated constant for unknown enum values
  case __unknown(RawValue)

  public init?(rawValue: RawValue) {
    switch rawValue {
      case "WAIT_OFFER": self = .waitOffer
      case "NEED_OFFER": self = .needOffer
      case "WAIT_ANSWER": self = .waitAnswer
      case "NEED_ANSWER": self = .needAnswer
      case "READY": self = .ready
      default: self = .__unknown(rawValue)
    }
  }

  public var rawValue: RawValue {
    switch self {
      case .waitOffer: return "WAIT_OFFER"
      case .needOffer: return "NEED_OFFER"
      case .waitAnswer: return "WAIT_ANSWER"
      case .needAnswer: return "NEED_ANSWER"
      case .ready: return "READY"
      case .__unknown(let value): return value
    }
  }

  public static func == (lhs: MediaStreamState, rhs: MediaStreamState) -> Bool {
    switch (lhs, rhs) {
      case (.waitOffer, .waitOffer): return true
      case (.needOffer, .needOffer): return true
      case (.waitAnswer, .waitAnswer): return true
      case (.needAnswer, .needAnswer): return true
      case (.ready, .ready): return true
      case (.__unknown(let lhsValue), .__unknown(let rhsValue)): return lhsValue == rhsValue
      default: return false
    }
  }
}

public struct UpdateOrganizationProfileInput: GraphQLMapConvertible {
  public var graphQLMap: GraphQLMap

  public init(name: Swift.Optional<String?> = nil, photoRef: Swift.Optional<ImageRefInput?> = nil, website: Swift.Optional<String?> = nil, websiteTitle: Swift.Optional<String?> = nil, about: Swift.Optional<String?> = nil, twitter: Swift.Optional<String?> = nil, facebook: Swift.Optional<String?> = nil, linkedin: Swift.Optional<String?> = nil, location: Swift.Optional<String?> = nil, contacts: Swift.Optional<[ContactPersonInput]?> = nil, alphaPublished: Swift.Optional<Bool?> = nil, alphaEditorial: Swift.Optional<Bool?> = nil, alphaFeatured: Swift.Optional<Bool?> = nil, alphaLocations: Swift.Optional<[String]?> = nil, alphaInterests: Swift.Optional<[String]?> = nil, alphaOrganizationType: Swift.Optional<[String]?> = nil, alphaPotentialSites: Swift.Optional<[RangeInput?]?> = nil, alphaSiteSizes: Swift.Optional<[RangeInput?]?> = nil, alphaDevelopmentModels: Swift.Optional<[String?]?> = nil, alphaAvailability: Swift.Optional<[String?]?> = nil, alphaLandUse: Swift.Optional<[String?]?> = nil, alphaGoodFor: Swift.Optional<[String?]?> = nil, alphaSpecialAttributes: Swift.Optional<[String?]?> = nil, alphaLookingFor: Swift.Optional<[String]?> = nil, alphaGeographies: Swift.Optional<[String]?> = nil, alphaDoShapeAndForm: Swift.Optional<[String]?> = nil, alphaDoCurrentUse: Swift.Optional<[String]?> = nil, alphaDoGoodFitFor: Swift.Optional<[String]?> = nil, alphaDoSpecialAttributes: Swift.Optional<[String]?> = nil, alphaDoAvailability: Swift.Optional<[String]?> = nil, alphaArGeographies: Swift.Optional<[String]?> = nil, alphaArAreaRange: Swift.Optional<[String]?> = nil, alphaArHeightLimit: Swift.Optional<[String]?> = nil, alphaArActivityStatus: Swift.Optional<[String]?> = nil, alphaArAquisitionBudget: Swift.Optional<[String]?> = nil, alphaArAquisitionRate: Swift.Optional<[String]?> = nil, alphaArClosingTime: Swift.Optional<[String]?> = nil, alphaArSpecialAttributes: Swift.Optional<[String]?> = nil, alphaArLandUse: Swift.Optional<[String]?> = nil) {
    graphQLMap = ["name": name, "photoRef": photoRef, "website": website, "websiteTitle": websiteTitle, "about": about, "twitter": twitter, "facebook": facebook, "linkedin": linkedin, "location": location, "contacts": contacts, "alphaPublished": alphaPublished, "alphaEditorial": alphaEditorial, "alphaFeatured": alphaFeatured, "alphaLocations": alphaLocations, "alphaInterests": alphaInterests, "alphaOrganizationType": alphaOrganizationType, "alphaPotentialSites": alphaPotentialSites, "alphaSiteSizes": alphaSiteSizes, "alphaDevelopmentModels": alphaDevelopmentModels, "alphaAvailability": alphaAvailability, "alphaLandUse": alphaLandUse, "alphaGoodFor": alphaGoodFor, "alphaSpecialAttributes": alphaSpecialAttributes, "alphaLookingFor": alphaLookingFor, "alphaGeographies": alphaGeographies, "alphaDOShapeAndForm": alphaDoShapeAndForm, "alphaDOCurrentUse": alphaDoCurrentUse, "alphaDOGoodFitFor": alphaDoGoodFitFor, "alphaDOSpecialAttributes": alphaDoSpecialAttributes, "alphaDOAvailability": alphaDoAvailability, "alphaARGeographies": alphaArGeographies, "alphaARAreaRange": alphaArAreaRange, "alphaARHeightLimit": alphaArHeightLimit, "alphaARActivityStatus": alphaArActivityStatus, "alphaARAquisitionBudget": alphaArAquisitionBudget, "alphaARAquisitionRate": alphaArAquisitionRate, "alphaARClosingTime": alphaArClosingTime, "alphaARSpecialAttributes": alphaArSpecialAttributes, "alphaARLandUse": alphaArLandUse]
  }

  public var name: Swift.Optional<String?> {
    get {
      return graphQLMap["name"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "name")
    }
  }

  public var photoRef: Swift.Optional<ImageRefInput?> {
    get {
      return graphQLMap["photoRef"] as! Swift.Optional<ImageRefInput?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "photoRef")
    }
  }

  public var website: Swift.Optional<String?> {
    get {
      return graphQLMap["website"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "website")
    }
  }

  public var websiteTitle: Swift.Optional<String?> {
    get {
      return graphQLMap["websiteTitle"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "websiteTitle")
    }
  }

  public var about: Swift.Optional<String?> {
    get {
      return graphQLMap["about"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "about")
    }
  }

  public var twitter: Swift.Optional<String?> {
    get {
      return graphQLMap["twitter"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "twitter")
    }
  }

  public var facebook: Swift.Optional<String?> {
    get {
      return graphQLMap["facebook"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "facebook")
    }
  }

  public var linkedin: Swift.Optional<String?> {
    get {
      return graphQLMap["linkedin"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "linkedin")
    }
  }

  public var location: Swift.Optional<String?> {
    get {
      return graphQLMap["location"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "location")
    }
  }

  public var contacts: Swift.Optional<[ContactPersonInput]?> {
    get {
      return graphQLMap["contacts"] as! Swift.Optional<[ContactPersonInput]?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "contacts")
    }
  }

  public var alphaPublished: Swift.Optional<Bool?> {
    get {
      return graphQLMap["alphaPublished"] as! Swift.Optional<Bool?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "alphaPublished")
    }
  }

  public var alphaEditorial: Swift.Optional<Bool?> {
    get {
      return graphQLMap["alphaEditorial"] as! Swift.Optional<Bool?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "alphaEditorial")
    }
  }

  public var alphaFeatured: Swift.Optional<Bool?> {
    get {
      return graphQLMap["alphaFeatured"] as! Swift.Optional<Bool?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "alphaFeatured")
    }
  }

  public var alphaLocations: Swift.Optional<[String]?> {
    get {
      return graphQLMap["alphaLocations"] as! Swift.Optional<[String]?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "alphaLocations")
    }
  }

  public var alphaInterests: Swift.Optional<[String]?> {
    get {
      return graphQLMap["alphaInterests"] as! Swift.Optional<[String]?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "alphaInterests")
    }
  }

  public var alphaOrganizationType: Swift.Optional<[String]?> {
    get {
      return graphQLMap["alphaOrganizationType"] as! Swift.Optional<[String]?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "alphaOrganizationType")
    }
  }

  public var alphaPotentialSites: Swift.Optional<[RangeInput?]?> {
    get {
      return graphQLMap["alphaPotentialSites"] as! Swift.Optional<[RangeInput?]?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "alphaPotentialSites")
    }
  }

  public var alphaSiteSizes: Swift.Optional<[RangeInput?]?> {
    get {
      return graphQLMap["alphaSiteSizes"] as! Swift.Optional<[RangeInput?]?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "alphaSiteSizes")
    }
  }

  public var alphaDevelopmentModels: Swift.Optional<[String?]?> {
    get {
      return graphQLMap["alphaDevelopmentModels"] as! Swift.Optional<[String?]?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "alphaDevelopmentModels")
    }
  }

  public var alphaAvailability: Swift.Optional<[String?]?> {
    get {
      return graphQLMap["alphaAvailability"] as! Swift.Optional<[String?]?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "alphaAvailability")
    }
  }

  public var alphaLandUse: Swift.Optional<[String?]?> {
    get {
      return graphQLMap["alphaLandUse"] as! Swift.Optional<[String?]?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "alphaLandUse")
    }
  }

  public var alphaGoodFor: Swift.Optional<[String?]?> {
    get {
      return graphQLMap["alphaGoodFor"] as! Swift.Optional<[String?]?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "alphaGoodFor")
    }
  }

  public var alphaSpecialAttributes: Swift.Optional<[String?]?> {
    get {
      return graphQLMap["alphaSpecialAttributes"] as! Swift.Optional<[String?]?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "alphaSpecialAttributes")
    }
  }

  public var alphaLookingFor: Swift.Optional<[String]?> {
    get {
      return graphQLMap["alphaLookingFor"] as! Swift.Optional<[String]?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "alphaLookingFor")
    }
  }

  public var alphaGeographies: Swift.Optional<[String]?> {
    get {
      return graphQLMap["alphaGeographies"] as! Swift.Optional<[String]?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "alphaGeographies")
    }
  }

  public var alphaDoShapeAndForm: Swift.Optional<[String]?> {
    get {
      return graphQLMap["alphaDOShapeAndForm"] as! Swift.Optional<[String]?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "alphaDOShapeAndForm")
    }
  }

  public var alphaDoCurrentUse: Swift.Optional<[String]?> {
    get {
      return graphQLMap["alphaDOCurrentUse"] as! Swift.Optional<[String]?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "alphaDOCurrentUse")
    }
  }

  public var alphaDoGoodFitFor: Swift.Optional<[String]?> {
    get {
      return graphQLMap["alphaDOGoodFitFor"] as! Swift.Optional<[String]?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "alphaDOGoodFitFor")
    }
  }

  public var alphaDoSpecialAttributes: Swift.Optional<[String]?> {
    get {
      return graphQLMap["alphaDOSpecialAttributes"] as! Swift.Optional<[String]?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "alphaDOSpecialAttributes")
    }
  }

  public var alphaDoAvailability: Swift.Optional<[String]?> {
    get {
      return graphQLMap["alphaDOAvailability"] as! Swift.Optional<[String]?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "alphaDOAvailability")
    }
  }

  public var alphaArGeographies: Swift.Optional<[String]?> {
    get {
      return graphQLMap["alphaARGeographies"] as! Swift.Optional<[String]?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "alphaARGeographies")
    }
  }

  public var alphaArAreaRange: Swift.Optional<[String]?> {
    get {
      return graphQLMap["alphaARAreaRange"] as! Swift.Optional<[String]?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "alphaARAreaRange")
    }
  }

  public var alphaArHeightLimit: Swift.Optional<[String]?> {
    get {
      return graphQLMap["alphaARHeightLimit"] as! Swift.Optional<[String]?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "alphaARHeightLimit")
    }
  }

  public var alphaArActivityStatus: Swift.Optional<[String]?> {
    get {
      return graphQLMap["alphaARActivityStatus"] as! Swift.Optional<[String]?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "alphaARActivityStatus")
    }
  }

  public var alphaArAquisitionBudget: Swift.Optional<[String]?> {
    get {
      return graphQLMap["alphaARAquisitionBudget"] as! Swift.Optional<[String]?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "alphaARAquisitionBudget")
    }
  }

  public var alphaArAquisitionRate: Swift.Optional<[String]?> {
    get {
      return graphQLMap["alphaARAquisitionRate"] as! Swift.Optional<[String]?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "alphaARAquisitionRate")
    }
  }

  public var alphaArClosingTime: Swift.Optional<[String]?> {
    get {
      return graphQLMap["alphaARClosingTime"] as! Swift.Optional<[String]?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "alphaARClosingTime")
    }
  }

  public var alphaArSpecialAttributes: Swift.Optional<[String]?> {
    get {
      return graphQLMap["alphaARSpecialAttributes"] as! Swift.Optional<[String]?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "alphaARSpecialAttributes")
    }
  }

  public var alphaArLandUse: Swift.Optional<[String]?> {
    get {
      return graphQLMap["alphaARLandUse"] as! Swift.Optional<[String]?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "alphaARLandUse")
    }
  }
}

public struct ContactPersonInput: GraphQLMapConvertible {
  public var graphQLMap: GraphQLMap

  public init(name: String, photoRef: Swift.Optional<ImageRefInput?> = nil, position: Swift.Optional<String?> = nil, email: Swift.Optional<String?> = nil, phone: Swift.Optional<String?> = nil, link: Swift.Optional<String?> = nil, twitter: Swift.Optional<String?> = nil) {
    graphQLMap = ["name": name, "photoRef": photoRef, "position": position, "email": email, "phone": phone, "link": link, "twitter": twitter]
  }

  public var name: String {
    get {
      return graphQLMap["name"] as! String
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "name")
    }
  }

  public var photoRef: Swift.Optional<ImageRefInput?> {
    get {
      return graphQLMap["photoRef"] as! Swift.Optional<ImageRefInput?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "photoRef")
    }
  }

  public var position: Swift.Optional<String?> {
    get {
      return graphQLMap["position"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "position")
    }
  }

  public var email: Swift.Optional<String?> {
    get {
      return graphQLMap["email"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "email")
    }
  }

  public var phone: Swift.Optional<String?> {
    get {
      return graphQLMap["phone"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "phone")
    }
  }

  public var link: Swift.Optional<String?> {
    get {
      return graphQLMap["link"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "link")
    }
  }

  public var twitter: Swift.Optional<String?> {
    get {
      return graphQLMap["twitter"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "twitter")
    }
  }
}

public struct RangeInput: GraphQLMapConvertible {
  public var graphQLMap: GraphQLMap

  public init(from: Swift.Optional<Int?> = nil, to: Swift.Optional<Int?> = nil) {
    graphQLMap = ["from": from, "to": to]
  }

  public var from: Swift.Optional<Int?> {
    get {
      return graphQLMap["from"] as! Swift.Optional<Int?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "from")
    }
  }

  public var to: Swift.Optional<Int?> {
    get {
      return graphQLMap["to"] as! Swift.Optional<Int?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "to")
    }
  }
}

public enum OrganizationMemberRole: RawRepresentable, Equatable, Hashable, Apollo.JSONDecodable, Apollo.JSONEncodable {
  public typealias RawValue = String
  case owner
  case admin
  case member
  /// Auto generated constant for unknown enum values
  case __unknown(RawValue)

  public init?(rawValue: RawValue) {
    switch rawValue {
      case "OWNER": self = .owner
      case "ADMIN": self = .admin
      case "MEMBER": self = .member
      default: self = .__unknown(rawValue)
    }
  }

  public var rawValue: RawValue {
    switch self {
      case .owner: return "OWNER"
      case .admin: return "ADMIN"
      case .member: return "MEMBER"
      case .__unknown(let value): return value
    }
  }

  public static func == (lhs: OrganizationMemberRole, rhs: OrganizationMemberRole) -> Bool {
    switch (lhs, rhs) {
      case (.owner, .owner): return true
      case (.admin, .admin): return true
      case (.member, .member): return true
      case (.__unknown(let lhsValue), .__unknown(let rhsValue)): return lhsValue == rhsValue
      default: return false
    }
  }
}

public struct InviteRequest: GraphQLMapConvertible {
  public var graphQLMap: GraphQLMap

  public init(email: String, emailText: Swift.Optional<String?> = nil, role: OrganizationMemberRole, firstName: Swift.Optional<String?> = nil, lastName: Swift.Optional<String?> = nil) {
    graphQLMap = ["email": email, "emailText": emailText, "role": role, "firstName": firstName, "lastName": lastName]
  }

  public var email: String {
    get {
      return graphQLMap["email"] as! String
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "email")
    }
  }

  public var emailText: Swift.Optional<String?> {
    get {
      return graphQLMap["emailText"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "emailText")
    }
  }

  public var role: OrganizationMemberRole {
    get {
      return graphQLMap["role"] as! OrganizationMemberRole
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "role")
    }
  }

  public var firstName: Swift.Optional<String?> {
    get {
      return graphQLMap["firstName"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "firstName")
    }
  }

  public var lastName: Swift.Optional<String?> {
    get {
      return graphQLMap["lastName"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "lastName")
    }
  }
}

public enum DebugEmailType: RawRepresentable, Equatable, Hashable, Apollo.JSONDecodable, Apollo.JSONEncodable {
  public typealias RawValue = String
  case welcome
  case accountActivated
  case accountDeactivated
  case memberRemoved
  case membershipLevelChanged
  case invite
  case memberJoined
  case signupCode
  case siginCode
  case unreadMessage
  case unreadMessages
  case publicRoomInvite
  case privateRoomInvite
  case roomInviteAccepted
  /// Auto generated constant for unknown enum values
  case __unknown(RawValue)

  public init?(rawValue: RawValue) {
    switch rawValue {
      case "WELCOME": self = .welcome
      case "ACCOUNT_ACTIVATED": self = .accountActivated
      case "ACCOUNT_DEACTIVATED": self = .accountDeactivated
      case "MEMBER_REMOVED": self = .memberRemoved
      case "MEMBERSHIP_LEVEL_CHANGED": self = .membershipLevelChanged
      case "INVITE": self = .invite
      case "MEMBER_JOINED": self = .memberJoined
      case "SIGNUP_CODE": self = .signupCode
      case "SIGIN_CODE": self = .siginCode
      case "UNREAD_MESSAGE": self = .unreadMessage
      case "UNREAD_MESSAGES": self = .unreadMessages
      case "PUBLIC_ROOM_INVITE": self = .publicRoomInvite
      case "PRIVATE_ROOM_INVITE": self = .privateRoomInvite
      case "ROOM_INVITE_ACCEPTED": self = .roomInviteAccepted
      default: self = .__unknown(rawValue)
    }
  }

  public var rawValue: RawValue {
    switch self {
      case .welcome: return "WELCOME"
      case .accountActivated: return "ACCOUNT_ACTIVATED"
      case .accountDeactivated: return "ACCOUNT_DEACTIVATED"
      case .memberRemoved: return "MEMBER_REMOVED"
      case .membershipLevelChanged: return "MEMBERSHIP_LEVEL_CHANGED"
      case .invite: return "INVITE"
      case .memberJoined: return "MEMBER_JOINED"
      case .signupCode: return "SIGNUP_CODE"
      case .siginCode: return "SIGIN_CODE"
      case .unreadMessage: return "UNREAD_MESSAGE"
      case .unreadMessages: return "UNREAD_MESSAGES"
      case .publicRoomInvite: return "PUBLIC_ROOM_INVITE"
      case .privateRoomInvite: return "PRIVATE_ROOM_INVITE"
      case .roomInviteAccepted: return "ROOM_INVITE_ACCEPTED"
      case .__unknown(let value): return value
    }
  }

  public static func == (lhs: DebugEmailType, rhs: DebugEmailType) -> Bool {
    switch (lhs, rhs) {
      case (.welcome, .welcome): return true
      case (.accountActivated, .accountActivated): return true
      case (.accountDeactivated, .accountDeactivated): return true
      case (.memberRemoved, .memberRemoved): return true
      case (.membershipLevelChanged, .membershipLevelChanged): return true
      case (.invite, .invite): return true
      case (.memberJoined, .memberJoined): return true
      case (.signupCode, .signupCode): return true
      case (.siginCode, .siginCode): return true
      case (.unreadMessage, .unreadMessage): return true
      case (.unreadMessages, .unreadMessages): return true
      case (.publicRoomInvite, .publicRoomInvite): return true
      case (.privateRoomInvite, .privateRoomInvite): return true
      case (.roomInviteAccepted, .roomInviteAccepted): return true
      case (.__unknown(let lhsValue), .__unknown(let rhsValue)): return lhsValue == rhsValue
      default: return false
    }
  }
}

public enum SuperAdminRole: RawRepresentable, Equatable, Hashable, Apollo.JSONDecodable, Apollo.JSONEncodable {
  public typealias RawValue = String
  case superAdmin
  case softwareDeveloper
  case editor
  /// Auto generated constant for unknown enum values
  case __unknown(RawValue)

  public init?(rawValue: RawValue) {
    switch rawValue {
      case "SUPER_ADMIN": self = .superAdmin
      case "SOFTWARE_DEVELOPER": self = .softwareDeveloper
      case "EDITOR": self = .editor
      default: self = .__unknown(rawValue)
    }
  }

  public var rawValue: RawValue {
    switch self {
      case .superAdmin: return "SUPER_ADMIN"
      case .softwareDeveloper: return "SOFTWARE_DEVELOPER"
      case .editor: return "EDITOR"
      case .__unknown(let value): return value
    }
  }

  public static func == (lhs: SuperAdminRole, rhs: SuperAdminRole) -> Bool {
    switch (lhs, rhs) {
      case (.superAdmin, .superAdmin): return true
      case (.softwareDeveloper, .softwareDeveloper): return true
      case (.editor, .editor): return true
      case (.__unknown(let lhsValue), .__unknown(let rhsValue)): return lhsValue == rhsValue
      default: return false
    }
  }
}

public enum SuperAccountState: RawRepresentable, Equatable, Hashable, Apollo.JSONDecodable, Apollo.JSONEncodable {
  public typealias RawValue = String
  case pending
  case activated
  case suspended
  case deleted
  /// Auto generated constant for unknown enum values
  case __unknown(RawValue)

  public init?(rawValue: RawValue) {
    switch rawValue {
      case "PENDING": self = .pending
      case "ACTIVATED": self = .activated
      case "SUSPENDED": self = .suspended
      case "DELETED": self = .deleted
      default: self = .__unknown(rawValue)
    }
  }

  public var rawValue: RawValue {
    switch self {
      case .pending: return "PENDING"
      case .activated: return "ACTIVATED"
      case .suspended: return "SUSPENDED"
      case .deleted: return "DELETED"
      case .__unknown(let value): return value
    }
  }

  public static func == (lhs: SuperAccountState, rhs: SuperAccountState) -> Bool {
    switch (lhs, rhs) {
      case (.pending, .pending): return true
      case (.activated, .activated): return true
      case (.suspended, .suspended): return true
      case (.deleted, .deleted): return true
      case (.__unknown(let lhsValue), .__unknown(let rhsValue)): return lhsValue == rhsValue
      default: return false
    }
  }
}

/// Deprecated
public struct UpdateProfileInput: GraphQLMapConvertible {
  public var graphQLMap: GraphQLMap

  public init(firstName: Swift.Optional<String?> = nil, lastName: Swift.Optional<String?> = nil, photoRef: Swift.Optional<ImageRefInput?> = nil, phone: Swift.Optional<String?> = nil, email: Swift.Optional<String?> = nil, website: Swift.Optional<String?> = nil, about: Swift.Optional<String?> = nil, location: Swift.Optional<String?> = nil, linkedin: Swift.Optional<String?> = nil, twitter: Swift.Optional<String?> = nil, primaryOrganization: Swift.Optional<GraphQLID?> = nil, alphaRole: Swift.Optional<String?> = nil, alphaLocations: Swift.Optional<[String]?> = nil, alphaLinkedin: Swift.Optional<String?> = nil, alphaTwitter: Swift.Optional<String?> = nil, alphaPrimaryOrganizationId: Swift.Optional<GraphQLID?> = nil) {
    graphQLMap = ["firstName": firstName, "lastName": lastName, "photoRef": photoRef, "phone": phone, "email": email, "website": website, "about": about, "location": location, "linkedin": linkedin, "twitter": twitter, "primaryOrganization": primaryOrganization, "alphaRole": alphaRole, "alphaLocations": alphaLocations, "alphaLinkedin": alphaLinkedin, "alphaTwitter": alphaTwitter, "alphaPrimaryOrganizationId": alphaPrimaryOrganizationId]
  }

  public var firstName: Swift.Optional<String?> {
    get {
      return graphQLMap["firstName"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "firstName")
    }
  }

  public var lastName: Swift.Optional<String?> {
    get {
      return graphQLMap["lastName"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "lastName")
    }
  }

  public var photoRef: Swift.Optional<ImageRefInput?> {
    get {
      return graphQLMap["photoRef"] as! Swift.Optional<ImageRefInput?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "photoRef")
    }
  }

  public var phone: Swift.Optional<String?> {
    get {
      return graphQLMap["phone"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "phone")
    }
  }

  public var email: Swift.Optional<String?> {
    get {
      return graphQLMap["email"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "email")
    }
  }

  public var website: Swift.Optional<String?> {
    get {
      return graphQLMap["website"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "website")
    }
  }

  public var about: Swift.Optional<String?> {
    get {
      return graphQLMap["about"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "about")
    }
  }

  public var location: Swift.Optional<String?> {
    get {
      return graphQLMap["location"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "location")
    }
  }

  public var linkedin: Swift.Optional<String?> {
    get {
      return graphQLMap["linkedin"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "linkedin")
    }
  }

  public var twitter: Swift.Optional<String?> {
    get {
      return graphQLMap["twitter"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "twitter")
    }
  }

  public var primaryOrganization: Swift.Optional<GraphQLID?> {
    get {
      return graphQLMap["primaryOrganization"] as! Swift.Optional<GraphQLID?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "primaryOrganization")
    }
  }

  public var alphaRole: Swift.Optional<String?> {
    get {
      return graphQLMap["alphaRole"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "alphaRole")
    }
  }

  public var alphaLocations: Swift.Optional<[String]?> {
    get {
      return graphQLMap["alphaLocations"] as! Swift.Optional<[String]?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "alphaLocations")
    }
  }

  public var alphaLinkedin: Swift.Optional<String?> {
    get {
      return graphQLMap["alphaLinkedin"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "alphaLinkedin")
    }
  }

  public var alphaTwitter: Swift.Optional<String?> {
    get {
      return graphQLMap["alphaTwitter"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "alphaTwitter")
    }
  }

  public var alphaPrimaryOrganizationId: Swift.Optional<GraphQLID?> {
    get {
      return graphQLMap["alphaPrimaryOrganizationId"] as! Swift.Optional<GraphQLID?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "alphaPrimaryOrganizationId")
    }
  }
}

/// Deprecated
public struct CreateProfileInput: GraphQLMapConvertible {
  public var graphQLMap: GraphQLMap

  public init(firstName: String, lastName: Swift.Optional<String?> = nil, photoRef: Swift.Optional<ImageRefInput?> = nil, phone: Swift.Optional<String?> = nil, email: Swift.Optional<String?> = nil, about: Swift.Optional<String?> = nil, location: Swift.Optional<String?> = nil, website: Swift.Optional<String?> = nil, linkedin: Swift.Optional<String?> = nil, twitter: Swift.Optional<String?> = nil, primaryOrganization: Swift.Optional<GraphQLID?> = nil) {
    graphQLMap = ["firstName": firstName, "lastName": lastName, "photoRef": photoRef, "phone": phone, "email": email, "about": about, "location": location, "website": website, "linkedin": linkedin, "twitter": twitter, "primaryOrganization": primaryOrganization]
  }

  public var firstName: String {
    get {
      return graphQLMap["firstName"] as! String
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "firstName")
    }
  }

  public var lastName: Swift.Optional<String?> {
    get {
      return graphQLMap["lastName"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "lastName")
    }
  }

  public var photoRef: Swift.Optional<ImageRefInput?> {
    get {
      return graphQLMap["photoRef"] as! Swift.Optional<ImageRefInput?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "photoRef")
    }
  }

  public var phone: Swift.Optional<String?> {
    get {
      return graphQLMap["phone"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "phone")
    }
  }

  public var email: Swift.Optional<String?> {
    get {
      return graphQLMap["email"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "email")
    }
  }

  public var about: Swift.Optional<String?> {
    get {
      return graphQLMap["about"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "about")
    }
  }

  public var location: Swift.Optional<String?> {
    get {
      return graphQLMap["location"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "location")
    }
  }

  public var website: Swift.Optional<String?> {
    get {
      return graphQLMap["website"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "website")
    }
  }

  public var linkedin: Swift.Optional<String?> {
    get {
      return graphQLMap["linkedin"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "linkedin")
    }
  }

  public var twitter: Swift.Optional<String?> {
    get {
      return graphQLMap["twitter"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "twitter")
    }
  }

  public var primaryOrganization: Swift.Optional<GraphQLID?> {
    get {
      return graphQLMap["primaryOrganization"] as! Swift.Optional<GraphQLID?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "primaryOrganization")
    }
  }
}

public struct UpdateSettingsInput: GraphQLMapConvertible {
  public var graphQLMap: GraphQLMap

  public init(emailFrequency: Swift.Optional<EmailFrequency?> = nil, desktopNotifications: Swift.Optional<NotificationMessages?> = nil, mobileNotifications: Swift.Optional<NotificationMessages?> = nil, mobileAlert: Swift.Optional<Bool?> = nil, mobileIncludeText: Swift.Optional<Bool?> = nil, mute: Swift.Optional<Bool?> = nil, notificationsDelay: Swift.Optional<NotificationsDelay?> = nil) {
    graphQLMap = ["emailFrequency": emailFrequency, "desktopNotifications": desktopNotifications, "mobileNotifications": mobileNotifications, "mobileAlert": mobileAlert, "mobileIncludeText": mobileIncludeText, "mute": mute, "notificationsDelay": notificationsDelay]
  }

  public var emailFrequency: Swift.Optional<EmailFrequency?> {
    get {
      return graphQLMap["emailFrequency"] as! Swift.Optional<EmailFrequency?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "emailFrequency")
    }
  }

  public var desktopNotifications: Swift.Optional<NotificationMessages?> {
    get {
      return graphQLMap["desktopNotifications"] as! Swift.Optional<NotificationMessages?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "desktopNotifications")
    }
  }

  public var mobileNotifications: Swift.Optional<NotificationMessages?> {
    get {
      return graphQLMap["mobileNotifications"] as! Swift.Optional<NotificationMessages?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "mobileNotifications")
    }
  }

  public var mobileAlert: Swift.Optional<Bool?> {
    get {
      return graphQLMap["mobileAlert"] as! Swift.Optional<Bool?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "mobileAlert")
    }
  }

  public var mobileIncludeText: Swift.Optional<Bool?> {
    get {
      return graphQLMap["mobileIncludeText"] as! Swift.Optional<Bool?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "mobileIncludeText")
    }
  }

  public var mute: Swift.Optional<Bool?> {
    get {
      return graphQLMap["mute"] as! Swift.Optional<Bool?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "mute")
    }
  }

  public var notificationsDelay: Swift.Optional<NotificationsDelay?> {
    get {
      return graphQLMap["notificationsDelay"] as! Swift.Optional<NotificationsDelay?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "notificationsDelay")
    }
  }
}

public enum EmailFrequency: RawRepresentable, Equatable, Hashable, Apollo.JSONDecodable, Apollo.JSONEncodable {
  public typealias RawValue = String
  case never
  case min_15
  case hour_1
  case hour_24
  case week_1
  /// Auto generated constant for unknown enum values
  case __unknown(RawValue)

  public init?(rawValue: RawValue) {
    switch rawValue {
      case "NEVER": self = .never
      case "MIN_15": self = .min_15
      case "HOUR_1": self = .hour_1
      case "HOUR_24": self = .hour_24
      case "WEEK_1": self = .week_1
      default: self = .__unknown(rawValue)
    }
  }

  public var rawValue: RawValue {
    switch self {
      case .never: return "NEVER"
      case .min_15: return "MIN_15"
      case .hour_1: return "HOUR_1"
      case .hour_24: return "HOUR_24"
      case .week_1: return "WEEK_1"
      case .__unknown(let value): return value
    }
  }

  public static func == (lhs: EmailFrequency, rhs: EmailFrequency) -> Bool {
    switch (lhs, rhs) {
      case (.never, .never): return true
      case (.min_15, .min_15): return true
      case (.hour_1, .hour_1): return true
      case (.hour_24, .hour_24): return true
      case (.week_1, .week_1): return true
      case (.__unknown(let lhsValue), .__unknown(let rhsValue)): return lhsValue == rhsValue
      default: return false
    }
  }
}

public enum NotificationMessages: RawRepresentable, Equatable, Hashable, Apollo.JSONDecodable, Apollo.JSONEncodable {
  public typealias RawValue = String
  case all
  case direct
  case `none`
  /// Auto generated constant for unknown enum values
  case __unknown(RawValue)

  public init?(rawValue: RawValue) {
    switch rawValue {
      case "ALL": self = .all
      case "DIRECT": self = .direct
      case "NONE": self = .none
      default: self = .__unknown(rawValue)
    }
  }

  public var rawValue: RawValue {
    switch self {
      case .all: return "ALL"
      case .direct: return "DIRECT"
      case .none: return "NONE"
      case .__unknown(let value): return value
    }
  }

  public static func == (lhs: NotificationMessages, rhs: NotificationMessages) -> Bool {
    switch (lhs, rhs) {
      case (.all, .all): return true
      case (.direct, .direct): return true
      case (.none, .none): return true
      case (.__unknown(let lhsValue), .__unknown(let rhsValue)): return lhsValue == rhsValue
      default: return false
    }
  }
}

public enum NotificationsDelay: RawRepresentable, Equatable, Hashable, Apollo.JSONDecodable, Apollo.JSONEncodable {
  public typealias RawValue = String
  case `none`
  case min_1
  case min_15
  /// Auto generated constant for unknown enum values
  case __unknown(RawValue)

  public init?(rawValue: RawValue) {
    switch rawValue {
      case "NONE": self = .none
      case "MIN_1": self = .min_1
      case "MIN_15": self = .min_15
      default: self = .__unknown(rawValue)
    }
  }

  public var rawValue: RawValue {
    switch self {
      case .none: return "NONE"
      case .min_1: return "MIN_1"
      case .min_15: return "MIN_15"
      case .__unknown(let value): return value
    }
  }

  public static func == (lhs: NotificationsDelay, rhs: NotificationsDelay) -> Bool {
    switch (lhs, rhs) {
      case (.none, .none): return true
      case (.min_1, .min_1): return true
      case (.min_15, .min_15): return true
      case (.__unknown(let lhsValue), .__unknown(let rhsValue)): return lhsValue == rhsValue
      default: return false
    }
  }
}

public struct Event: GraphQLMapConvertible {
  public var graphQLMap: GraphQLMap

  public init(id: String, event: String, params: Swift.Optional<String?> = nil) {
    graphQLMap = ["id": id, "event": event, "params": params]
  }

  public var id: String {
    get {
      return graphQLMap["id"] as! String
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "id")
    }
  }

  public var event: String {
    get {
      return graphQLMap["event"] as! String
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "event")
    }
  }

  public var params: Swift.Optional<String?> {
    get {
      return graphQLMap["params"] as! Swift.Optional<String?>
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "params")
    }
  }
}

/// Deprecated
public enum ConferencePeerConnectionState: RawRepresentable, Equatable, Hashable, Apollo.JSONDecodable, Apollo.JSONEncodable {
  public typealias RawValue = String
  case waitOffer
  case needOffer
  case waitAnswer
  case needAnswer
  case ready
  /// Auto generated constant for unknown enum values
  case __unknown(RawValue)

  public init?(rawValue: RawValue) {
    switch rawValue {
      case "WAIT_OFFER": self = .waitOffer
      case "NEED_OFFER": self = .needOffer
      case "WAIT_ANSWER": self = .waitAnswer
      case "NEED_ANSWER": self = .needAnswer
      case "READY": self = .ready
      default: self = .__unknown(rawValue)
    }
  }

  public var rawValue: RawValue {
    switch self {
      case .waitOffer: return "WAIT_OFFER"
      case .needOffer: return "NEED_OFFER"
      case .waitAnswer: return "WAIT_ANSWER"
      case .needAnswer: return "NEED_ANSWER"
      case .ready: return "READY"
      case .__unknown(let value): return value
    }
  }

  public static func == (lhs: ConferencePeerConnectionState, rhs: ConferencePeerConnectionState) -> Bool {
    switch (lhs, rhs) {
      case (.waitOffer, .waitOffer): return true
      case (.needOffer, .needOffer): return true
      case (.waitAnswer, .waitAnswer): return true
      case (.needAnswer, .needAnswer): return true
      case (.ready, .ready): return true
      case (.__unknown(let lhsValue), .__unknown(let rhsValue)): return lhsValue == rhsValue
      default: return false
    }
  }
}

public enum ModernMessageButtonStyle: RawRepresentable, Equatable, Hashable, Apollo.JSONDecodable, Apollo.JSONEncodable {
  public typealias RawValue = String
  case `default`
  case light
  /// Auto generated constant for unknown enum values
  case __unknown(RawValue)

  public init?(rawValue: RawValue) {
    switch rawValue {
      case "DEFAULT": self = .default
      case "LIGHT": self = .light
      default: self = .__unknown(rawValue)
    }
  }

  public var rawValue: RawValue {
    switch self {
      case .default: return "DEFAULT"
      case .light: return "LIGHT"
      case .__unknown(let value): return value
    }
  }

  public static func == (lhs: ModernMessageButtonStyle, rhs: ModernMessageButtonStyle) -> Bool {
    switch (lhs, rhs) {
      case (.default, .default): return true
      case (.light, .light): return true
      case (.__unknown(let lhsValue), .__unknown(let rhsValue)): return lhsValue == rhsValue
      default: return false
    }
  }
}

public enum MessageReactionType: RawRepresentable, Equatable, Hashable, Apollo.JSONDecodable, Apollo.JSONEncodable {
  public typealias RawValue = String
  case like
  case thumbUp
  case joy
  case scream
  case crying
  case angry
  /// Auto generated constant for unknown enum values
  case __unknown(RawValue)

  public init?(rawValue: RawValue) {
    switch rawValue {
      case "LIKE": self = .like
      case "THUMB_UP": self = .thumbUp
      case "JOY": self = .joy
      case "SCREAM": self = .scream
      case "CRYING": self = .crying
      case "ANGRY": self = .angry
      default: self = .__unknown(rawValue)
    }
  }

  public var rawValue: RawValue {
    switch self {
      case .like: return "LIKE"
      case .thumbUp: return "THUMB_UP"
      case .joy: return "JOY"
      case .scream: return "SCREAM"
      case .crying: return "CRYING"
      case .angry: return "ANGRY"
      case .__unknown(let value): return value
    }
  }

  public static func == (lhs: MessageReactionType, rhs: MessageReactionType) -> Bool {
    switch (lhs, rhs) {
      case (.like, .like): return true
      case (.thumbUp, .thumbUp): return true
      case (.joy, .joy): return true
      case (.scream, .scream): return true
      case (.crying, .crying): return true
      case (.angry, .angry): return true
      case (.__unknown(let lhsValue), .__unknown(let rhsValue)): return lhsValue == rhsValue
      default: return false
    }
  }
}

public final class AccountQuery: GraphQLQuery {
  public let operationDefinition =
    "query Account {\n  me: me {\n    __typename\n    ...UserShort\n  }\n  sessionState: sessionState {\n    __typename\n    ...SessionStateFull\n  }\n  myPermissions {\n    __typename\n    roles\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(UserShort.fragmentDefinition).appending(OrganizationShort.fragmentDefinition).appending(SessionStateFull.fragmentDefinition) }

  public init() {
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("me", alias: "me", type: .object(Me.selections)),
      GraphQLField("sessionState", alias: "sessionState", type: .nonNull(.object(SessionState.selections))),
      GraphQLField("myPermissions", type: .nonNull(.object(MyPermission.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(me: Me? = nil, sessionState: SessionState, myPermissions: MyPermission) {
      self.init(unsafeResultMap: ["__typename": "Query", "me": me.flatMap { (value: Me) -> ResultMap in value.resultMap }, "sessionState": sessionState.resultMap, "myPermissions": myPermissions.resultMap])
    }

    public var me: Me? {
      get {
        return (resultMap["me"] as? ResultMap).flatMap { Me(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "me")
      }
    }

    public var sessionState: SessionState {
      get {
        return SessionState(unsafeResultMap: resultMap["sessionState"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "sessionState")
      }
    }

    public var myPermissions: MyPermission {
      get {
        return MyPermission(unsafeResultMap: resultMap["myPermissions"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "myPermissions")
      }
    }

    public struct Me: GraphQLSelectionSet {
      public static let possibleTypes = ["User"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(UserShort.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var userShort: UserShort {
          get {
            return UserShort(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }

    public struct SessionState: GraphQLSelectionSet {
      public static let possibleTypes = ["SessionState"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(SessionStateFull.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(isLoggedIn: Bool, isProfileCreated: Bool, isAccountActivated: Bool, isAccountExists: Bool, isAccountPicked: Bool, isCompleted: Bool, isBlocked: Bool) {
        self.init(unsafeResultMap: ["__typename": "SessionState", "isLoggedIn": isLoggedIn, "isProfileCreated": isProfileCreated, "isAccountActivated": isAccountActivated, "isAccountExists": isAccountExists, "isAccountPicked": isAccountPicked, "isCompleted": isCompleted, "isBlocked": isBlocked])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var sessionStateFull: SessionStateFull {
          get {
            return SessionStateFull(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }

    public struct MyPermission: GraphQLSelectionSet {
      public static let possibleTypes = ["Permissions"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("roles", type: .nonNull(.list(.nonNull(.scalar(String.self))))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(roles: [String]) {
        self.init(unsafeResultMap: ["__typename": "Permissions", "roles": roles])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var roles: [String] {
        get {
          return resultMap["roles"]! as! [String]
        }
        set {
          resultMap.updateValue(newValue, forKey: "roles")
        }
      }
    }
  }
}

public final class AccountSettingsQuery: GraphQLQuery {
  public let operationDefinition =
    "query AccountSettings {\n  me: me {\n    __typename\n    ...UserShort\n  }\n  organizations: myOrganizations {\n    __typename\n    ...OrganizationShort\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(UserShort.fragmentDefinition).appending(OrganizationShort.fragmentDefinition) }

  public init() {
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("me", alias: "me", type: .object(Me.selections)),
      GraphQLField("myOrganizations", alias: "organizations", type: .nonNull(.list(.nonNull(.object(Organization.selections))))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(me: Me? = nil, organizations: [Organization]) {
      self.init(unsafeResultMap: ["__typename": "Query", "me": me.flatMap { (value: Me) -> ResultMap in value.resultMap }, "organizations": organizations.map { (value: Organization) -> ResultMap in value.resultMap }])
    }

    public var me: Me? {
      get {
        return (resultMap["me"] as? ResultMap).flatMap { Me(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "me")
      }
    }

    public var organizations: [Organization] {
      get {
        return (resultMap["organizations"] as! [ResultMap]).map { (value: ResultMap) -> Organization in Organization(unsafeResultMap: value) }
      }
      set {
        resultMap.updateValue(newValue.map { (value: Organization) -> ResultMap in value.resultMap }, forKey: "organizations")
      }
    }

    public struct Me: GraphQLSelectionSet {
      public static let possibleTypes = ["User"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(UserShort.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var userShort: UserShort {
          get {
            return UserShort(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }

    public struct Organization: GraphQLSelectionSet {
      public static let possibleTypes = ["Organization"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(OrganizationShort.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, name: String, photo: String? = nil, isCommunity: Bool) {
        self.init(unsafeResultMap: ["__typename": "Organization", "id": id, "name": name, "photo": photo, "isCommunity": isCommunity])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var organizationShort: OrganizationShort {
          get {
            return OrganizationShort(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public final class SettingsWatchSubscription: GraphQLSubscription {
  public let operationDefinition =
    "subscription SettingsWatch {\n  watchSettings {\n    __typename\n    ...SettingsFull\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(SettingsFull.fragmentDefinition) }

  public init() {
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Subscription"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("watchSettings", type: .nonNull(.object(WatchSetting.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(watchSettings: WatchSetting) {
      self.init(unsafeResultMap: ["__typename": "Subscription", "watchSettings": watchSettings.resultMap])
    }

    /// Deprecated
    public var watchSettings: WatchSetting {
      get {
        return WatchSetting(unsafeResultMap: resultMap["watchSettings"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "watchSettings")
      }
    }

    public struct WatchSetting: GraphQLSelectionSet {
      public static let possibleTypes = ["Settings"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(SettingsFull.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, primaryEmail: String, emailFrequency: EmailFrequency, desktopNotifications: NotificationMessages, mobileNotifications: NotificationMessages, mobileAlert: Bool, mobileIncludeText: Bool) {
        self.init(unsafeResultMap: ["__typename": "Settings", "id": id, "primaryEmail": primaryEmail, "emailFrequency": emailFrequency, "desktopNotifications": desktopNotifications, "mobileNotifications": mobileNotifications, "mobileAlert": mobileAlert, "mobileIncludeText": mobileIncludeText])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var settingsFull: SettingsFull {
          get {
            return SettingsFull(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public final class CreateOrganizationMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation CreateOrganization($input: CreateOrganizationInput!) {\n  organization: createOrganization(input: $input) {\n    __typename\n    id\n    name\n  }\n}"

  public var input: CreateOrganizationInput

  public init(input: CreateOrganizationInput) {
    self.input = input
  }

  public var variables: GraphQLMap? {
    return ["input": input]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("createOrganization", alias: "organization", arguments: ["input": GraphQLVariable("input")], type: .nonNull(.object(Organization.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(organization: Organization) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "organization": organization.resultMap])
    }

    public var organization: Organization {
      get {
        return Organization(unsafeResultMap: resultMap["organization"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "organization")
      }
    }

    public struct Organization: GraphQLSelectionSet {
      public static let possibleTypes = ["OrganizationProfile"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("name", type: .nonNull(.scalar(String.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, name: String) {
        self.init(unsafeResultMap: ["__typename": "OrganizationProfile", "id": id, "name": name])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var name: String {
        get {
          return resultMap["name"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "name")
        }
      }
    }
  }
}

public final class AccountInviteInfoQuery: GraphQLQuery {
  public let operationDefinition =
    "query AccountInviteInfo($inviteKey: String!) {\n  invite: alphaInviteInfo(key: $inviteKey) {\n    __typename\n    id\n    key\n    orgId\n    title\n    photo\n    joined\n    creator {\n      __typename\n      ...UserShort\n    }\n    forEmail\n    forName\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(UserShort.fragmentDefinition).appending(OrganizationShort.fragmentDefinition) }

  public var inviteKey: String

  public init(inviteKey: String) {
    self.inviteKey = inviteKey
  }

  public var variables: GraphQLMap? {
    return ["inviteKey": inviteKey]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("alphaInviteInfo", alias: "invite", arguments: ["key": GraphQLVariable("inviteKey")], type: .object(Invite.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(invite: Invite? = nil) {
      self.init(unsafeResultMap: ["__typename": "Query", "invite": invite.flatMap { (value: Invite) -> ResultMap in value.resultMap }])
    }

    public var invite: Invite? {
      get {
        return (resultMap["invite"] as? ResultMap).flatMap { Invite(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "invite")
      }
    }

    public struct Invite: GraphQLSelectionSet {
      public static let possibleTypes = ["InviteInfo"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("key", type: .nonNull(.scalar(String.self))),
        GraphQLField("orgId", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("title", type: .nonNull(.scalar(String.self))),
        GraphQLField("photo", type: .scalar(String.self)),
        GraphQLField("joined", type: .nonNull(.scalar(Bool.self))),
        GraphQLField("creator", type: .object(Creator.selections)),
        GraphQLField("forEmail", type: .scalar(String.self)),
        GraphQLField("forName", type: .scalar(String.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, key: String, orgId: GraphQLID, title: String, photo: String? = nil, joined: Bool, creator: Creator? = nil, forEmail: String? = nil, forName: String? = nil) {
        self.init(unsafeResultMap: ["__typename": "InviteInfo", "id": id, "key": key, "orgId": orgId, "title": title, "photo": photo, "joined": joined, "creator": creator.flatMap { (value: Creator) -> ResultMap in value.resultMap }, "forEmail": forEmail, "forName": forName])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var key: String {
        get {
          return resultMap["key"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "key")
        }
      }

      public var orgId: GraphQLID {
        get {
          return resultMap["orgId"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "orgId")
        }
      }

      public var title: String {
        get {
          return resultMap["title"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "title")
        }
      }

      public var photo: String? {
        get {
          return resultMap["photo"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "photo")
        }
      }

      public var joined: Bool {
        get {
          return resultMap["joined"]! as! Bool
        }
        set {
          resultMap.updateValue(newValue, forKey: "joined")
        }
      }

      public var creator: Creator? {
        get {
          return (resultMap["creator"] as? ResultMap).flatMap { Creator(unsafeResultMap: $0) }
        }
        set {
          resultMap.updateValue(newValue?.resultMap, forKey: "creator")
        }
      }

      public var forEmail: String? {
        get {
          return resultMap["forEmail"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "forEmail")
        }
      }

      public var forName: String? {
        get {
          return resultMap["forName"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "forName")
        }
      }

      public struct Creator: GraphQLSelectionSet {
        public static let possibleTypes = ["User"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLFragmentSpread(UserShort.self),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var fragments: Fragments {
          get {
            return Fragments(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }

        public struct Fragments {
          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public var userShort: UserShort {
            get {
              return UserShort(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }
        }
      }
    }
  }
}

public final class AccountAppInviteInfoQuery: GraphQLQuery {
  public let operationDefinition =
    "query AccountAppInviteInfo($inviteKey: String!) {\n  invite: alphaInviteInfo(key: $inviteKey) {\n    __typename\n    creator {\n      __typename\n      ...UserShort\n    }\n  }\n  appInvite: appInviteInfo(key: $inviteKey) {\n    __typename\n    inviter {\n      __typename\n      ...UserShort\n    }\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(UserShort.fragmentDefinition).appending(OrganizationShort.fragmentDefinition) }

  public var inviteKey: String

  public init(inviteKey: String) {
    self.inviteKey = inviteKey
  }

  public var variables: GraphQLMap? {
    return ["inviteKey": inviteKey]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("alphaInviteInfo", alias: "invite", arguments: ["key": GraphQLVariable("inviteKey")], type: .object(Invite.selections)),
      GraphQLField("appInviteInfo", alias: "appInvite", arguments: ["key": GraphQLVariable("inviteKey")], type: .object(AppInvite.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(invite: Invite? = nil, appInvite: AppInvite? = nil) {
      self.init(unsafeResultMap: ["__typename": "Query", "invite": invite.flatMap { (value: Invite) -> ResultMap in value.resultMap }, "appInvite": appInvite.flatMap { (value: AppInvite) -> ResultMap in value.resultMap }])
    }

    public var invite: Invite? {
      get {
        return (resultMap["invite"] as? ResultMap).flatMap { Invite(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "invite")
      }
    }

    public var appInvite: AppInvite? {
      get {
        return (resultMap["appInvite"] as? ResultMap).flatMap { AppInvite(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "appInvite")
      }
    }

    public struct Invite: GraphQLSelectionSet {
      public static let possibleTypes = ["InviteInfo"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("creator", type: .object(Creator.selections)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(creator: Creator? = nil) {
        self.init(unsafeResultMap: ["__typename": "InviteInfo", "creator": creator.flatMap { (value: Creator) -> ResultMap in value.resultMap }])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var creator: Creator? {
        get {
          return (resultMap["creator"] as? ResultMap).flatMap { Creator(unsafeResultMap: $0) }
        }
        set {
          resultMap.updateValue(newValue?.resultMap, forKey: "creator")
        }
      }

      public struct Creator: GraphQLSelectionSet {
        public static let possibleTypes = ["User"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLFragmentSpread(UserShort.self),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var fragments: Fragments {
          get {
            return Fragments(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }

        public struct Fragments {
          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public var userShort: UserShort {
            get {
              return UserShort(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }
        }
      }
    }

    public struct AppInvite: GraphQLSelectionSet {
      public static let possibleTypes = ["AppInvite"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("inviter", type: .nonNull(.object(Inviter.selections))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(inviter: Inviter) {
        self.init(unsafeResultMap: ["__typename": "AppInvite", "inviter": inviter.resultMap])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var inviter: Inviter {
        get {
          return Inviter(unsafeResultMap: resultMap["inviter"]! as! ResultMap)
        }
        set {
          resultMap.updateValue(newValue.resultMap, forKey: "inviter")
        }
      }

      public struct Inviter: GraphQLSelectionSet {
        public static let possibleTypes = ["User"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLFragmentSpread(UserShort.self),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var fragments: Fragments {
          get {
            return Fragments(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }

        public struct Fragments {
          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public var userShort: UserShort {
            get {
              return UserShort(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }
        }
      }
    }
  }
}

public final class AccountAppInviteQuery: GraphQLQuery {
  public let operationDefinition =
    "query AccountAppInvite {\n  invite: appInvite\n}"

  public init() {
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("appInvite", alias: "invite", type: .nonNull(.scalar(String.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(invite: String) {
      self.init(unsafeResultMap: ["__typename": "Query", "invite": invite])
    }

    public var invite: String {
      get {
        return resultMap["invite"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "invite")
      }
    }
  }
}

public final class AccountInviteJoinMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation AccountInviteJoin($inviteKey: String!) {\n  alphaJoinInvite(key: $inviteKey)\n}"

  public var inviteKey: String

  public init(inviteKey: String) {
    self.inviteKey = inviteKey
  }

  public var variables: GraphQLMap? {
    return ["inviteKey": inviteKey]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("alphaJoinInvite", arguments: ["key": GraphQLVariable("inviteKey")], type: .nonNull(.scalar(GraphQLID.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(alphaJoinInvite: GraphQLID) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "alphaJoinInvite": alphaJoinInvite])
    }

    public var alphaJoinInvite: GraphQLID {
      get {
        return resultMap["alphaJoinInvite"]! as! GraphQLID
      }
      set {
        resultMap.updateValue(newValue, forKey: "alphaJoinInvite")
      }
    }
  }
}

public final class AccountInvitesQuery: GraphQLQuery {
  public let operationDefinition =
    "query AccountInvites {\n  invites: alphaInvites {\n    __typename\n    id\n    key\n  }\n}"

  public init() {
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("alphaInvites", alias: "invites", type: .list(.nonNull(.object(Invite.selections)))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(invites: [Invite]? = nil) {
      self.init(unsafeResultMap: ["__typename": "Query", "invites": invites.flatMap { (value: [Invite]) -> [ResultMap] in value.map { (value: Invite) -> ResultMap in value.resultMap } }])
    }

    public var invites: [Invite]? {
      get {
        return (resultMap["invites"] as? [ResultMap]).flatMap { (value: [ResultMap]) -> [Invite] in value.map { (value: ResultMap) -> Invite in Invite(unsafeResultMap: value) } }
      }
      set {
        resultMap.updateValue(newValue.flatMap { (value: [Invite]) -> [ResultMap] in value.map { (value: Invite) -> ResultMap in value.resultMap } }, forKey: "invites")
      }
    }

    public struct Invite: GraphQLSelectionSet {
      public static let possibleTypes = ["Invite"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("key", type: .nonNull(.scalar(String.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, key: String) {
        self.init(unsafeResultMap: ["__typename": "Invite", "id": id, "key": key])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var key: String {
        get {
          return resultMap["key"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "key")
        }
      }
    }
  }
}

public final class AccountInvitesHistoryQuery: GraphQLQuery {
  public let operationDefinition =
    "query AccountInvitesHistory {\n  invites: alphaInvitesHistory {\n    __typename\n    forEmail\n    isGlobal\n    acceptedBy {\n      __typename\n      id\n      name\n      picture\n    }\n  }\n}"

  public init() {
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("alphaInvitesHistory", alias: "invites", type: .list(.nonNull(.object(Invite.selections)))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(invites: [Invite]? = nil) {
      self.init(unsafeResultMap: ["__typename": "Query", "invites": invites.flatMap { (value: [Invite]) -> [ResultMap] in value.map { (value: Invite) -> ResultMap in value.resultMap } }])
    }

    public var invites: [Invite]? {
      get {
        return (resultMap["invites"] as? [ResultMap]).flatMap { (value: [ResultMap]) -> [Invite] in value.map { (value: ResultMap) -> Invite in Invite(unsafeResultMap: value) } }
      }
      set {
        resultMap.updateValue(newValue.flatMap { (value: [Invite]) -> [ResultMap] in value.map { (value: Invite) -> ResultMap in value.resultMap } }, forKey: "invites")
      }
    }

    public struct Invite: GraphQLSelectionSet {
      public static let possibleTypes = ["InviteHistotyInfo"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("forEmail", type: .nonNull(.scalar(String.self))),
        GraphQLField("isGlobal", type: .nonNull(.scalar(Bool.self))),
        GraphQLField("acceptedBy", type: .object(AcceptedBy.selections)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(forEmail: String, isGlobal: Bool, acceptedBy: AcceptedBy? = nil) {
        self.init(unsafeResultMap: ["__typename": "InviteHistotyInfo", "forEmail": forEmail, "isGlobal": isGlobal, "acceptedBy": acceptedBy.flatMap { (value: AcceptedBy) -> ResultMap in value.resultMap }])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var forEmail: String {
        get {
          return resultMap["forEmail"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "forEmail")
        }
      }

      public var isGlobal: Bool {
        get {
          return resultMap["isGlobal"]! as! Bool
        }
        set {
          resultMap.updateValue(newValue, forKey: "isGlobal")
        }
      }

      public var acceptedBy: AcceptedBy? {
        get {
          return (resultMap["acceptedBy"] as? ResultMap).flatMap { AcceptedBy(unsafeResultMap: $0) }
        }
        set {
          resultMap.updateValue(newValue?.resultMap, forKey: "acceptedBy")
        }
      }

      public struct AcceptedBy: GraphQLSelectionSet {
        public static let possibleTypes = ["User"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
          GraphQLField("name", type: .nonNull(.scalar(String.self))),
          GraphQLField("picture", type: .scalar(String.self)),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(id: GraphQLID, name: String, picture: String? = nil) {
          self.init(unsafeResultMap: ["__typename": "User", "id": id, "name": name, "picture": picture])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var id: GraphQLID {
          get {
            return resultMap["id"]! as! GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "id")
          }
        }

        public var name: String {
          get {
            return resultMap["name"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "name")
          }
        }

        public var picture: String? {
          get {
            return resultMap["picture"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "picture")
          }
        }
      }
    }
  }
}

public final class AccountCreateInviteMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation AccountCreateInvite {\n  alphaCreateInvite {\n    __typename\n    id\n    key\n  }\n}"

  public init() {
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("alphaCreateInvite", type: .nonNull(.object(AlphaCreateInvite.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(alphaCreateInvite: AlphaCreateInvite) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "alphaCreateInvite": alphaCreateInvite.resultMap])
    }

    public var alphaCreateInvite: AlphaCreateInvite {
      get {
        return AlphaCreateInvite(unsafeResultMap: resultMap["alphaCreateInvite"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "alphaCreateInvite")
      }
    }

    public struct AlphaCreateInvite: GraphQLSelectionSet {
      public static let possibleTypes = ["Invite"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("key", type: .nonNull(.scalar(String.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, key: String) {
        self.init(unsafeResultMap: ["__typename": "Invite", "id": id, "key": key])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var key: String {
        get {
          return resultMap["key"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "key")
        }
      }
    }
  }
}

public final class AccountDestroyInviteMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation AccountDestroyInvite($id: ID!) {\n  alphaDeleteInvite(id: $id)\n}"

  public var id: GraphQLID

  public init(id: GraphQLID) {
    self.id = id
  }

  public var variables: GraphQLMap? {
    return ["id": id]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("alphaDeleteInvite", arguments: ["id": GraphQLVariable("id")], type: .nonNull(.scalar(String.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(alphaDeleteInvite: String) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "alphaDeleteInvite": alphaDeleteInvite])
    }

    public var alphaDeleteInvite: String {
      get {
        return resultMap["alphaDeleteInvite"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "alphaDeleteInvite")
      }
    }
  }
}

public final class ProfilePrefillQuery: GraphQLQuery {
  public let operationDefinition =
    "query ProfilePrefill {\n  prefill: myProfilePrefill {\n    __typename\n    firstName\n    lastName\n    picture\n  }\n}"

  public init() {
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("myProfilePrefill", alias: "prefill", type: .object(Prefill.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(prefill: Prefill? = nil) {
      self.init(unsafeResultMap: ["__typename": "Query", "prefill": prefill.flatMap { (value: Prefill) -> ResultMap in value.resultMap }])
    }

    public var prefill: Prefill? {
      get {
        return (resultMap["prefill"] as? ResultMap).flatMap { Prefill(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "prefill")
      }
    }

    public struct Prefill: GraphQLSelectionSet {
      public static let possibleTypes = ["ProfilePrefill"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("firstName", type: .scalar(String.self)),
        GraphQLField("lastName", type: .scalar(String.self)),
        GraphQLField("picture", type: .scalar(String.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(firstName: String? = nil, lastName: String? = nil, picture: String? = nil) {
        self.init(unsafeResultMap: ["__typename": "ProfilePrefill", "firstName": firstName, "lastName": lastName, "picture": picture])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var firstName: String? {
        get {
          return resultMap["firstName"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "firstName")
        }
      }

      public var lastName: String? {
        get {
          return resultMap["lastName"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "lastName")
        }
      }

      public var picture: String? {
        get {
          return resultMap["picture"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "picture")
        }
      }
    }
  }
}

public final class CreateUserProfileAndOrganizationMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation CreateUserProfileAndOrganization($user: ProfileInput!, $organization: CreateOrganizationInput!) {\n  alphaCreateUserProfileAndOrganization(user: $user, organization: $organization) {\n    __typename\n    user {\n      __typename\n      ...UserFull\n    }\n    organization {\n      __typename\n      id\n      name\n    }\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(UserFull.fragmentDefinition).appending(OrganizationShort.fragmentDefinition) }

  public var user: ProfileInput
  public var organization: CreateOrganizationInput

  public init(user: ProfileInput, organization: CreateOrganizationInput) {
    self.user = user
    self.organization = organization
  }

  public var variables: GraphQLMap? {
    return ["user": user, "organization": organization]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("alphaCreateUserProfileAndOrganization", arguments: ["user": GraphQLVariable("user"), "organization": GraphQLVariable("organization")], type: .nonNull(.object(AlphaCreateUserProfileAndOrganization.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(alphaCreateUserProfileAndOrganization: AlphaCreateUserProfileAndOrganization) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "alphaCreateUserProfileAndOrganization": alphaCreateUserProfileAndOrganization.resultMap])
    }

    public var alphaCreateUserProfileAndOrganization: AlphaCreateUserProfileAndOrganization {
      get {
        return AlphaCreateUserProfileAndOrganization(unsafeResultMap: resultMap["alphaCreateUserProfileAndOrganization"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "alphaCreateUserProfileAndOrganization")
      }
    }

    public struct AlphaCreateUserProfileAndOrganization: GraphQLSelectionSet {
      public static let possibleTypes = ["AlphaSignupData"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("user", type: .object(User.selections)),
        GraphQLField("organization", type: .object(Organization.selections)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(user: User? = nil, organization: Organization? = nil) {
        self.init(unsafeResultMap: ["__typename": "AlphaSignupData", "user": user.flatMap { (value: User) -> ResultMap in value.resultMap }, "organization": organization.flatMap { (value: Organization) -> ResultMap in value.resultMap }])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var user: User? {
        get {
          return (resultMap["user"] as? ResultMap).flatMap { User(unsafeResultMap: $0) }
        }
        set {
          resultMap.updateValue(newValue?.resultMap, forKey: "user")
        }
      }

      public var organization: Organization? {
        get {
          return (resultMap["organization"] as? ResultMap).flatMap { Organization(unsafeResultMap: $0) }
        }
        set {
          resultMap.updateValue(newValue?.resultMap, forKey: "organization")
        }
      }

      public struct User: GraphQLSelectionSet {
        public static let possibleTypes = ["User"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLFragmentSpread(UserFull.self),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var fragments: Fragments {
          get {
            return Fragments(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }

        public struct Fragments {
          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public var userFull: UserFull {
            get {
              return UserFull(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }
        }
      }

      public struct Organization: GraphQLSelectionSet {
        public static let possibleTypes = ["Organization"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
          GraphQLField("name", type: .nonNull(.scalar(String.self))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(id: GraphQLID, name: String) {
          self.init(unsafeResultMap: ["__typename": "Organization", "id": id, "name": name])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var id: GraphQLID {
          get {
            return resultMap["id"]! as! GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "id")
          }
        }

        public var name: String {
          get {
            return resultMap["name"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "name")
          }
        }
      }
    }
  }
}

public final class ReportOnlineMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation ReportOnline($active: Boolean, $platform: String) {\n  presenceReportOnline(timeout: 5000, active: $active, platform: $platform)\n}"

  public var active: Bool?
  public var platform: String?

  public init(active: Bool? = nil, platform: String? = nil) {
    self.active = active
    self.platform = platform
  }

  public var variables: GraphQLMap? {
    return ["active": active, "platform": platform]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("presenceReportOnline", arguments: ["timeout": 5000, "active": GraphQLVariable("active"), "platform": GraphQLVariable("platform")], type: .nonNull(.scalar(String.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(presenceReportOnline: String) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "presenceReportOnline": presenceReportOnline])
    }

    public var presenceReportOnline: String {
      get {
        return resultMap["presenceReportOnline"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "presenceReportOnline")
      }
    }
  }
}

public final class RegisterPushMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation RegisterPush($endpoint: String!, $type: PushType!) {\n  registerPush(endpoint: $endpoint, type: $type)\n}"

  public var endpoint: String
  public var type: PushType

  public init(endpoint: String, type: PushType) {
    self.endpoint = endpoint
    self.type = type
  }

  public var variables: GraphQLMap? {
    return ["endpoint": endpoint, "type": type]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("registerPush", arguments: ["endpoint": GraphQLVariable("endpoint"), "type": GraphQLVariable("type")], type: .nonNull(.scalar(String.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(registerPush: String) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "registerPush": registerPush])
    }

    public var registerPush: String {
      get {
        return resultMap["registerPush"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "registerPush")
      }
    }
  }
}

public final class FetchPushSettingsQuery: GraphQLQuery {
  public let operationDefinition =
    "query FetchPushSettings {\n  pushSettings {\n    __typename\n    webPushKey\n  }\n}"

  public init() {
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("pushSettings", type: .nonNull(.object(PushSetting.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(pushSettings: PushSetting) {
      self.init(unsafeResultMap: ["__typename": "Query", "pushSettings": pushSettings.resultMap])
    }

    public var pushSettings: PushSetting {
      get {
        return PushSetting(unsafeResultMap: resultMap["pushSettings"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "pushSettings")
      }
    }

    public struct PushSetting: GraphQLSelectionSet {
      public static let possibleTypes = ["PushSettings"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("webPushKey", type: .scalar(String.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(webPushKey: String? = nil) {
        self.init(unsafeResultMap: ["__typename": "PushSettings", "webPushKey": webPushKey])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var webPushKey: String? {
        get {
          return resultMap["webPushKey"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "webPushKey")
        }
      }
    }
  }
}

public final class RegisterWebPushMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation RegisterWebPush($endpoint: String!) {\n  registerWebPush(endpoint: $endpoint)\n}"

  public var endpoint: String

  public init(endpoint: String) {
    self.endpoint = endpoint
  }

  public var variables: GraphQLMap? {
    return ["endpoint": endpoint]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("registerWebPush", arguments: ["endpoint": GraphQLVariable("endpoint")], type: .nonNull(.scalar(String.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(registerWebPush: String) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "registerWebPush": registerWebPush])
    }

    public var registerWebPush: String {
      get {
        return resultMap["registerWebPush"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "registerWebPush")
      }
    }
  }
}

public final class MyAppsQuery: GraphQLQuery {
  public let operationDefinition =
    "query MyApps {\n  apps: myApps {\n    __typename\n    ...AppFull\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(AppFull.fragmentDefinition) }

  public init() {
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("myApps", alias: "apps", type: .nonNull(.list(.nonNull(.object(App.selections))))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(apps: [App]) {
      self.init(unsafeResultMap: ["__typename": "Query", "apps": apps.map { (value: App) -> ResultMap in value.resultMap }])
    }

    public var apps: [App] {
      get {
        return (resultMap["apps"] as! [ResultMap]).map { (value: ResultMap) -> App in App(unsafeResultMap: value) }
      }
      set {
        resultMap.updateValue(newValue.map { (value: App) -> ResultMap in value.resultMap }, forKey: "apps")
      }
    }

    public struct App: GraphQLSelectionSet {
      public static let possibleTypes = ["AppProfile"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(AppFull.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var appFull: AppFull {
          get {
            return AppFull(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public final class CreateAppMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation CreateApp($name: String!, $shortname: String, $photoRef: ImageRefInput, $about: String) {\n  createApp(name: $name, shortname: $shortname, photoRef: $photoRef, about: $about) {\n    __typename\n    ...AppFull\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(AppFull.fragmentDefinition) }

  public var name: String
  public var shortname: String?
  public var photoRef: ImageRefInput?
  public var about: String?

  public init(name: String, shortname: String? = nil, photoRef: ImageRefInput? = nil, about: String? = nil) {
    self.name = name
    self.shortname = shortname
    self.photoRef = photoRef
    self.about = about
  }

  public var variables: GraphQLMap? {
    return ["name": name, "shortname": shortname, "photoRef": photoRef, "about": about]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("createApp", arguments: ["name": GraphQLVariable("name"), "shortname": GraphQLVariable("shortname"), "photoRef": GraphQLVariable("photoRef"), "about": GraphQLVariable("about")], type: .nonNull(.object(CreateApp.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(createApp: CreateApp) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "createApp": createApp.resultMap])
    }

    public var createApp: CreateApp {
      get {
        return CreateApp(unsafeResultMap: resultMap["createApp"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "createApp")
      }
    }

    public struct CreateApp: GraphQLSelectionSet {
      public static let possibleTypes = ["AppProfile"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(AppFull.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var appFull: AppFull {
          get {
            return AppFull(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public final class UpdateAppMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation UpdateApp($appId: ID!, $input: AppProfileInput!) {\n  updateAppProfile(appId: $appId, input: $input) {\n    __typename\n    ...AppFull\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(AppFull.fragmentDefinition) }

  public var appId: GraphQLID
  public var input: AppProfileInput

  public init(appId: GraphQLID, input: AppProfileInput) {
    self.appId = appId
    self.input = input
  }

  public var variables: GraphQLMap? {
    return ["appId": appId, "input": input]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("updateAppProfile", arguments: ["appId": GraphQLVariable("appId"), "input": GraphQLVariable("input")], type: .nonNull(.object(UpdateAppProfile.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(updateAppProfile: UpdateAppProfile) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "updateAppProfile": updateAppProfile.resultMap])
    }

    public var updateAppProfile: UpdateAppProfile {
      get {
        return UpdateAppProfile(unsafeResultMap: resultMap["updateAppProfile"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "updateAppProfile")
      }
    }

    public struct UpdateAppProfile: GraphQLSelectionSet {
      public static let possibleTypes = ["AppProfile"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(AppFull.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var appFull: AppFull {
          get {
            return AppFull(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public final class RefreshAppTokenMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation RefreshAppToken($appId: ID!) {\n  refreshAppToken(appId: $appId) {\n    __typename\n    ...AppFull\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(AppFull.fragmentDefinition) }

  public var appId: GraphQLID

  public init(appId: GraphQLID) {
    self.appId = appId
  }

  public var variables: GraphQLMap? {
    return ["appId": appId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("refreshAppToken", arguments: ["appId": GraphQLVariable("appId")], type: .nonNull(.object(RefreshAppToken.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(refreshAppToken: RefreshAppToken) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "refreshAppToken": refreshAppToken.resultMap])
    }

    public var refreshAppToken: RefreshAppToken {
      get {
        return RefreshAppToken(unsafeResultMap: resultMap["refreshAppToken"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "refreshAppToken")
      }
    }

    public struct RefreshAppToken: GraphQLSelectionSet {
      public static let possibleTypes = ["AppProfile"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(AppFull.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var appFull: AppFull {
          get {
            return AppFull(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public final class AddAppToChatMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation AddAppToChat($appId: ID!, $chatId: ID!) {\n  addAppToChat(appId: $appId, chatId: $chatId) {\n    __typename\n    ...AppChat\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(AppChat.fragmentDefinition) }

  public var appId: GraphQLID
  public var chatId: GraphQLID

  public init(appId: GraphQLID, chatId: GraphQLID) {
    self.appId = appId
    self.chatId = chatId
  }

  public var variables: GraphQLMap? {
    return ["appId": appId, "chatId": chatId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("addAppToChat", arguments: ["appId": GraphQLVariable("appId"), "chatId": GraphQLVariable("chatId")], type: .nonNull(.object(AddAppToChat.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(addAppToChat: AddAppToChat) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "addAppToChat": addAppToChat.resultMap])
    }

    public var addAppToChat: AddAppToChat {
      get {
        return AddAppToChat(unsafeResultMap: resultMap["addAppToChat"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "addAppToChat")
      }
    }

    public struct AddAppToChat: GraphQLSelectionSet {
      public static let possibleTypes = ["AppChat"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(AppChat.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var appChat: AppChat {
          get {
            return AppChat(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public final class DialogsQuery: GraphQLQuery {
  public let operationDefinition =
    "query Dialogs($after: String) {\n  dialogs(first: 20, after: $after) {\n    __typename\n    items {\n      __typename\n      cid\n      fid\n      kind\n      title\n      photo\n      unreadCount\n      isMuted\n      haveMention\n      topMessage: alphaTopMessage {\n        __typename\n        ...TinyMessage\n      }\n    }\n    cursor\n  }\n  state: dialogsState {\n    __typename\n    state\n  }\n  counter: alphaNotificationCounter {\n    __typename\n    id\n    unreadCount\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(TinyMessage.fragmentDefinition).appending(UserTiny.fragmentDefinition) }

  public var after: String?

  public init(after: String? = nil) {
    self.after = after
  }

  public var variables: GraphQLMap? {
    return ["after": after]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("dialogs", arguments: ["first": 20, "after": GraphQLVariable("after")], type: .nonNull(.object(Dialog.selections))),
      GraphQLField("dialogsState", alias: "state", type: .nonNull(.object(State.selections))),
      GraphQLField("alphaNotificationCounter", alias: "counter", type: .nonNull(.object(Counter.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(dialogs: Dialog, state: State, counter: Counter) {
      self.init(unsafeResultMap: ["__typename": "Query", "dialogs": dialogs.resultMap, "state": state.resultMap, "counter": counter.resultMap])
    }

    public var dialogs: Dialog {
      get {
        return Dialog(unsafeResultMap: resultMap["dialogs"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "dialogs")
      }
    }

    public var state: State {
      get {
        return State(unsafeResultMap: resultMap["state"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "state")
      }
    }

    public var counter: Counter {
      get {
        return Counter(unsafeResultMap: resultMap["counter"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "counter")
      }
    }

    public struct Dialog: GraphQLSelectionSet {
      public static let possibleTypes = ["DialogsConnection"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("items", type: .nonNull(.list(.nonNull(.object(Item.selections))))),
        GraphQLField("cursor", type: .scalar(String.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(items: [Item], cursor: String? = nil) {
        self.init(unsafeResultMap: ["__typename": "DialogsConnection", "items": items.map { (value: Item) -> ResultMap in value.resultMap }, "cursor": cursor])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var items: [Item] {
        get {
          return (resultMap["items"] as! [ResultMap]).map { (value: ResultMap) -> Item in Item(unsafeResultMap: value) }
        }
        set {
          resultMap.updateValue(newValue.map { (value: Item) -> ResultMap in value.resultMap }, forKey: "items")
        }
      }

      public var cursor: String? {
        get {
          return resultMap["cursor"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "cursor")
        }
      }

      public struct Item: GraphQLSelectionSet {
        public static let possibleTypes = ["Dialog"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("cid", type: .nonNull(.scalar(GraphQLID.self))),
          GraphQLField("fid", type: .nonNull(.scalar(GraphQLID.self))),
          GraphQLField("kind", type: .nonNull(.scalar(DialogKind.self))),
          GraphQLField("title", type: .nonNull(.scalar(String.self))),
          GraphQLField("photo", type: .nonNull(.scalar(String.self))),
          GraphQLField("unreadCount", type: .nonNull(.scalar(Int.self))),
          GraphQLField("isMuted", type: .nonNull(.scalar(Bool.self))),
          GraphQLField("haveMention", type: .nonNull(.scalar(Bool.self))),
          GraphQLField("alphaTopMessage", alias: "topMessage", type: .object(TopMessage.selections)),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(cid: GraphQLID, fid: GraphQLID, kind: DialogKind, title: String, photo: String, unreadCount: Int, isMuted: Bool, haveMention: Bool, topMessage: TopMessage? = nil) {
          self.init(unsafeResultMap: ["__typename": "Dialog", "cid": cid, "fid": fid, "kind": kind, "title": title, "photo": photo, "unreadCount": unreadCount, "isMuted": isMuted, "haveMention": haveMention, "topMessage": topMessage.flatMap { (value: TopMessage) -> ResultMap in value.resultMap }])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var cid: GraphQLID {
          get {
            return resultMap["cid"]! as! GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "cid")
          }
        }

        public var fid: GraphQLID {
          get {
            return resultMap["fid"]! as! GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "fid")
          }
        }

        public var kind: DialogKind {
          get {
            return resultMap["kind"]! as! DialogKind
          }
          set {
            resultMap.updateValue(newValue, forKey: "kind")
          }
        }

        public var title: String {
          get {
            return resultMap["title"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "title")
          }
        }

        public var photo: String {
          get {
            return resultMap["photo"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "photo")
          }
        }

        public var unreadCount: Int {
          get {
            return resultMap["unreadCount"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "unreadCount")
          }
        }

        public var isMuted: Bool {
          get {
            return resultMap["isMuted"]! as! Bool
          }
          set {
            resultMap.updateValue(newValue, forKey: "isMuted")
          }
        }

        public var haveMention: Bool {
          get {
            return resultMap["haveMention"]! as! Bool
          }
          set {
            resultMap.updateValue(newValue, forKey: "haveMention")
          }
        }

        public var topMessage: TopMessage? {
          get {
            return (resultMap["topMessage"] as? ResultMap).flatMap { TopMessage(unsafeResultMap: $0) }
          }
          set {
            resultMap.updateValue(newValue?.resultMap, forKey: "topMessage")
          }
        }

        public struct TopMessage: GraphQLSelectionSet {
          public static let possibleTypes = ["GeneralMessage", "ServiceMessage"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLFragmentSpread(TinyMessage.self),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var fragments: Fragments {
            get {
              return Fragments(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }

          public struct Fragments {
            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public var tinyMessage: TinyMessage {
              get {
                return TinyMessage(unsafeResultMap: resultMap)
              }
              set {
                resultMap += newValue.resultMap
              }
            }
          }
        }
      }
    }

    public struct State: GraphQLSelectionSet {
      public static let possibleTypes = ["DialogUpdateState"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("state", type: .scalar(String.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(state: String? = nil) {
        self.init(unsafeResultMap: ["__typename": "DialogUpdateState", "state": state])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var state: String? {
        get {
          return resultMap["state"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "state")
        }
      }
    }

    public struct Counter: GraphQLSelectionSet {
      public static let possibleTypes = ["NotificationCounter"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("unreadCount", type: .nonNull(.scalar(Int.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, unreadCount: Int) {
        self.init(unsafeResultMap: ["__typename": "NotificationCounter", "id": id, "unreadCount": unreadCount])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var unreadCount: Int {
        get {
          return resultMap["unreadCount"]! as! Int
        }
        set {
          resultMap.updateValue(newValue, forKey: "unreadCount")
        }
      }
    }
  }
}

public final class ChatWatchSubscription: GraphQLSubscription {
  public let operationDefinition =
    "subscription ChatWatch($chatId: ID!, $state: String) {\n  event: chatUpdates(chatId: $chatId, fromState: $state) {\n    __typename\n    ... on ChatUpdateSingle {\n      seq\n      state\n      update {\n        __typename\n        ...ChatUpdateFragment\n      }\n    }\n    ... on ChatUpdateBatch {\n      fromSeq\n      seq\n      state\n      updates {\n        __typename\n        ...ChatUpdateFragment\n      }\n    }\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(ChatUpdateFragment.fragmentDefinition).appending(FullMessage.fragmentDefinition).appending(UserShort.fragmentDefinition).appending(OrganizationShort.fragmentDefinition).appending(UserTiny.fragmentDefinition).appending(RoomShort.fragmentDefinition) }

  public var chatId: GraphQLID
  public var state: String?

  public init(chatId: GraphQLID, state: String? = nil) {
    self.chatId = chatId
    self.state = state
  }

  public var variables: GraphQLMap? {
    return ["chatId": chatId, "state": state]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Subscription"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("chatUpdates", alias: "event", arguments: ["chatId": GraphQLVariable("chatId"), "fromState": GraphQLVariable("state")], type: .nonNull(.object(Event.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(event: Event) {
      self.init(unsafeResultMap: ["__typename": "Subscription", "event": event.resultMap])
    }

    public var event: Event {
      get {
        return Event(unsafeResultMap: resultMap["event"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "event")
      }
    }

    public struct Event: GraphQLSelectionSet {
      public static let possibleTypes = ["ChatUpdateSingle", "ChatUpdateBatch"]

      public static let selections: [GraphQLSelection] = [
        GraphQLTypeCase(
          variants: ["ChatUpdateSingle": AsChatUpdateSingle.selections, "ChatUpdateBatch": AsChatUpdateBatch.selections],
          default: [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          ]
        )
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public static func makeChatUpdateSingle(seq: Int, state: String, update: AsChatUpdateSingle.Update) -> Event {
        return Event(unsafeResultMap: ["__typename": "ChatUpdateSingle", "seq": seq, "state": state, "update": update.resultMap])
      }

      public static func makeChatUpdateBatch(fromSeq: Int, seq: Int, state: String, updates: [AsChatUpdateBatch.Update]) -> Event {
        return Event(unsafeResultMap: ["__typename": "ChatUpdateBatch", "fromSeq": fromSeq, "seq": seq, "state": state, "updates": updates.map { (value: AsChatUpdateBatch.Update) -> ResultMap in value.resultMap }])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var asChatUpdateSingle: AsChatUpdateSingle? {
        get {
          if !AsChatUpdateSingle.possibleTypes.contains(__typename) { return nil }
          return AsChatUpdateSingle(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsChatUpdateSingle: GraphQLSelectionSet {
        public static let possibleTypes = ["ChatUpdateSingle"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("seq", type: .nonNull(.scalar(Int.self))),
          GraphQLField("state", type: .nonNull(.scalar(String.self))),
          GraphQLField("update", type: .nonNull(.object(Update.selections))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(seq: Int, state: String, update: Update) {
          self.init(unsafeResultMap: ["__typename": "ChatUpdateSingle", "seq": seq, "state": state, "update": update.resultMap])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var seq: Int {
          get {
            return resultMap["seq"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "seq")
          }
        }

        public var state: String {
          get {
            return resultMap["state"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "state")
          }
        }

        public var update: Update {
          get {
            return Update(unsafeResultMap: resultMap["update"]! as! ResultMap)
          }
          set {
            resultMap.updateValue(newValue.resultMap, forKey: "update")
          }
        }

        public struct Update: GraphQLSelectionSet {
          public static let possibleTypes = ["ChatUpdated", "ChatMessageReceived", "ChatMessageUpdated", "ChatMessageDeleted", "ChatLostAccess"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLFragmentSpread(ChatUpdateFragment.self),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public static func makeChatLostAccess() -> Update {
            return Update(unsafeResultMap: ["__typename": "ChatLostAccess"])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var fragments: Fragments {
            get {
              return Fragments(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }

          public struct Fragments {
            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public var chatUpdateFragment: ChatUpdateFragment {
              get {
                return ChatUpdateFragment(unsafeResultMap: resultMap)
              }
              set {
                resultMap += newValue.resultMap
              }
            }
          }
        }
      }

      public var asChatUpdateBatch: AsChatUpdateBatch? {
        get {
          if !AsChatUpdateBatch.possibleTypes.contains(__typename) { return nil }
          return AsChatUpdateBatch(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsChatUpdateBatch: GraphQLSelectionSet {
        public static let possibleTypes = ["ChatUpdateBatch"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("fromSeq", type: .nonNull(.scalar(Int.self))),
          GraphQLField("seq", type: .nonNull(.scalar(Int.self))),
          GraphQLField("state", type: .nonNull(.scalar(String.self))),
          GraphQLField("updates", type: .nonNull(.list(.nonNull(.object(Update.selections))))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(fromSeq: Int, seq: Int, state: String, updates: [Update]) {
          self.init(unsafeResultMap: ["__typename": "ChatUpdateBatch", "fromSeq": fromSeq, "seq": seq, "state": state, "updates": updates.map { (value: Update) -> ResultMap in value.resultMap }])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var fromSeq: Int {
          get {
            return resultMap["fromSeq"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "fromSeq")
          }
        }

        public var seq: Int {
          get {
            return resultMap["seq"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "seq")
          }
        }

        public var state: String {
          get {
            return resultMap["state"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "state")
          }
        }

        public var updates: [Update] {
          get {
            return (resultMap["updates"] as! [ResultMap]).map { (value: ResultMap) -> Update in Update(unsafeResultMap: value) }
          }
          set {
            resultMap.updateValue(newValue.map { (value: Update) -> ResultMap in value.resultMap }, forKey: "updates")
          }
        }

        public struct Update: GraphQLSelectionSet {
          public static let possibleTypes = ["ChatUpdated", "ChatMessageReceived", "ChatMessageUpdated", "ChatMessageDeleted", "ChatLostAccess"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLFragmentSpread(ChatUpdateFragment.self),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public static func makeChatLostAccess() -> Update {
            return Update(unsafeResultMap: ["__typename": "ChatLostAccess"])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var fragments: Fragments {
            get {
              return Fragments(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }

          public struct Fragments {
            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public var chatUpdateFragment: ChatUpdateFragment {
              get {
                return ChatUpdateFragment(unsafeResultMap: resultMap)
              }
              set {
                resultMap += newValue.resultMap
              }
            }
          }
        }
      }
    }
  }
}

public final class DialogsWatchSubscription: GraphQLSubscription {
  public let operationDefinition =
    "subscription DialogsWatch($state: String) {\n  event: dialogsUpdates(fromState: $state) {\n    __typename\n    ... on DialogUpdateSingle {\n      seq\n      state\n      update {\n        __typename\n        ...DialogUpdateFragment\n      }\n    }\n    ... on DialogUpdateBatch {\n      fromSeq\n      seq\n      state\n      updates {\n        __typename\n        ...DialogUpdateFragment\n      }\n    }\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(DialogUpdateFragment.fragmentDefinition).appending(TinyMessage.fragmentDefinition).appending(UserTiny.fragmentDefinition) }

  public var state: String?

  public init(state: String? = nil) {
    self.state = state
  }

  public var variables: GraphQLMap? {
    return ["state": state]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Subscription"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("dialogsUpdates", alias: "event", arguments: ["fromState": GraphQLVariable("state")], type: .nonNull(.object(Event.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(event: Event) {
      self.init(unsafeResultMap: ["__typename": "Subscription", "event": event.resultMap])
    }

    public var event: Event {
      get {
        return Event(unsafeResultMap: resultMap["event"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "event")
      }
    }

    public struct Event: GraphQLSelectionSet {
      public static let possibleTypes = ["DialogUpdateSingle", "DialogUpdateBatch"]

      public static let selections: [GraphQLSelection] = [
        GraphQLTypeCase(
          variants: ["DialogUpdateSingle": AsDialogUpdateSingle.selections, "DialogUpdateBatch": AsDialogUpdateBatch.selections],
          default: [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          ]
        )
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public static func makeDialogUpdateSingle(seq: Int, state: String, update: AsDialogUpdateSingle.Update) -> Event {
        return Event(unsafeResultMap: ["__typename": "DialogUpdateSingle", "seq": seq, "state": state, "update": update.resultMap])
      }

      public static func makeDialogUpdateBatch(fromSeq: Int, seq: Int, state: String, updates: [AsDialogUpdateBatch.Update]) -> Event {
        return Event(unsafeResultMap: ["__typename": "DialogUpdateBatch", "fromSeq": fromSeq, "seq": seq, "state": state, "updates": updates.map { (value: AsDialogUpdateBatch.Update) -> ResultMap in value.resultMap }])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var asDialogUpdateSingle: AsDialogUpdateSingle? {
        get {
          if !AsDialogUpdateSingle.possibleTypes.contains(__typename) { return nil }
          return AsDialogUpdateSingle(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsDialogUpdateSingle: GraphQLSelectionSet {
        public static let possibleTypes = ["DialogUpdateSingle"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("seq", type: .nonNull(.scalar(Int.self))),
          GraphQLField("state", type: .nonNull(.scalar(String.self))),
          GraphQLField("update", type: .nonNull(.object(Update.selections))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(seq: Int, state: String, update: Update) {
          self.init(unsafeResultMap: ["__typename": "DialogUpdateSingle", "seq": seq, "state": state, "update": update.resultMap])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var seq: Int {
          get {
            return resultMap["seq"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "seq")
          }
        }

        public var state: String {
          get {
            return resultMap["state"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "state")
          }
        }

        public var update: Update {
          get {
            return Update(unsafeResultMap: resultMap["update"]! as! ResultMap)
          }
          set {
            resultMap.updateValue(newValue.resultMap, forKey: "update")
          }
        }

        public struct Update: GraphQLSelectionSet {
          public static let possibleTypes = ["DialogMessageReceived", "DialogMessageUpdated", "DialogMessageDeleted", "DialogMessageRead", "DialogTitleUpdated", "DialogDeleted", "DialogPhotoUpdated", "DialogMuteChanged", "DialogMentionedChanged"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLFragmentSpread(DialogUpdateFragment.self),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public static func makeDialogMessageRead(cid: GraphQLID, unread: Int, globalUnread: Int) -> Update {
            return Update(unsafeResultMap: ["__typename": "DialogMessageRead", "cid": cid, "unread": unread, "globalUnread": globalUnread])
          }

          public static func makeDialogTitleUpdated(cid: GraphQLID, title: String) -> Update {
            return Update(unsafeResultMap: ["__typename": "DialogTitleUpdated", "cid": cid, "title": title])
          }

          public static func makeDialogDeleted(cid: GraphQLID, globalUnread: Int) -> Update {
            return Update(unsafeResultMap: ["__typename": "DialogDeleted", "cid": cid, "globalUnread": globalUnread])
          }

          public static func makeDialogPhotoUpdated(cid: GraphQLID, photo: String? = nil) -> Update {
            return Update(unsafeResultMap: ["__typename": "DialogPhotoUpdated", "cid": cid, "photo": photo])
          }

          public static func makeDialogMuteChanged(cid: GraphQLID, mute: Bool) -> Update {
            return Update(unsafeResultMap: ["__typename": "DialogMuteChanged", "cid": cid, "mute": mute])
          }

          public static func makeDialogMentionedChanged(cid: GraphQLID, haveMention: Bool) -> Update {
            return Update(unsafeResultMap: ["__typename": "DialogMentionedChanged", "cid": cid, "haveMention": haveMention])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var fragments: Fragments {
            get {
              return Fragments(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }

          public struct Fragments {
            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public var dialogUpdateFragment: DialogUpdateFragment {
              get {
                return DialogUpdateFragment(unsafeResultMap: resultMap)
              }
              set {
                resultMap += newValue.resultMap
              }
            }
          }
        }
      }

      public var asDialogUpdateBatch: AsDialogUpdateBatch? {
        get {
          if !AsDialogUpdateBatch.possibleTypes.contains(__typename) { return nil }
          return AsDialogUpdateBatch(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsDialogUpdateBatch: GraphQLSelectionSet {
        public static let possibleTypes = ["DialogUpdateBatch"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("fromSeq", type: .nonNull(.scalar(Int.self))),
          GraphQLField("seq", type: .nonNull(.scalar(Int.self))),
          GraphQLField("state", type: .nonNull(.scalar(String.self))),
          GraphQLField("updates", type: .nonNull(.list(.nonNull(.object(Update.selections))))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(fromSeq: Int, seq: Int, state: String, updates: [Update]) {
          self.init(unsafeResultMap: ["__typename": "DialogUpdateBatch", "fromSeq": fromSeq, "seq": seq, "state": state, "updates": updates.map { (value: Update) -> ResultMap in value.resultMap }])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var fromSeq: Int {
          get {
            return resultMap["fromSeq"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "fromSeq")
          }
        }

        public var seq: Int {
          get {
            return resultMap["seq"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "seq")
          }
        }

        public var state: String {
          get {
            return resultMap["state"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "state")
          }
        }

        public var updates: [Update] {
          get {
            return (resultMap["updates"] as! [ResultMap]).map { (value: ResultMap) -> Update in Update(unsafeResultMap: value) }
          }
          set {
            resultMap.updateValue(newValue.map { (value: Update) -> ResultMap in value.resultMap }, forKey: "updates")
          }
        }

        public struct Update: GraphQLSelectionSet {
          public static let possibleTypes = ["DialogMessageReceived", "DialogMessageUpdated", "DialogMessageDeleted", "DialogMessageRead", "DialogTitleUpdated", "DialogDeleted", "DialogPhotoUpdated", "DialogMuteChanged", "DialogMentionedChanged"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLFragmentSpread(DialogUpdateFragment.self),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public static func makeDialogMessageRead(cid: GraphQLID, unread: Int, globalUnread: Int) -> Update {
            return Update(unsafeResultMap: ["__typename": "DialogMessageRead", "cid": cid, "unread": unread, "globalUnread": globalUnread])
          }

          public static func makeDialogTitleUpdated(cid: GraphQLID, title: String) -> Update {
            return Update(unsafeResultMap: ["__typename": "DialogTitleUpdated", "cid": cid, "title": title])
          }

          public static func makeDialogDeleted(cid: GraphQLID, globalUnread: Int) -> Update {
            return Update(unsafeResultMap: ["__typename": "DialogDeleted", "cid": cid, "globalUnread": globalUnread])
          }

          public static func makeDialogPhotoUpdated(cid: GraphQLID, photo: String? = nil) -> Update {
            return Update(unsafeResultMap: ["__typename": "DialogPhotoUpdated", "cid": cid, "photo": photo])
          }

          public static func makeDialogMuteChanged(cid: GraphQLID, mute: Bool) -> Update {
            return Update(unsafeResultMap: ["__typename": "DialogMuteChanged", "cid": cid, "mute": mute])
          }

          public static func makeDialogMentionedChanged(cid: GraphQLID, haveMention: Bool) -> Update {
            return Update(unsafeResultMap: ["__typename": "DialogMentionedChanged", "cid": cid, "haveMention": haveMention])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var fragments: Fragments {
            get {
              return Fragments(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }

          public struct Fragments {
            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public var dialogUpdateFragment: DialogUpdateFragment {
              get {
                return DialogUpdateFragment(unsafeResultMap: resultMap)
              }
              set {
                resultMap += newValue.resultMap
              }
            }
          }
        }
      }
    }
  }
}

public final class RoomQuery: GraphQLQuery {
  public let operationDefinition =
    "query Room($id: ID!) {\n  room(id: $id) {\n    __typename\n    ...RoomFull\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(RoomFull.fragmentDefinition).appending(UserShort.fragmentDefinition).appending(OrganizationShort.fragmentDefinition).appending(OrganizationMedium.fragmentDefinition).appending(UserFull.fragmentDefinition).appending(FullMessage.fragmentDefinition).appending(UserTiny.fragmentDefinition) }

  public var id: GraphQLID

  public init(id: GraphQLID) {
    self.id = id
  }

  public var variables: GraphQLMap? {
    return ["id": id]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("room", arguments: ["id": GraphQLVariable("id")], type: .object(Room.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(room: Room? = nil) {
      self.init(unsafeResultMap: ["__typename": "Query", "room": room.flatMap { (value: Room) -> ResultMap in value.resultMap }])
    }

    public var room: Room? {
      get {
        return (resultMap["room"] as? ResultMap).flatMap { Room(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "room")
      }
    }

    public struct Room: GraphQLSelectionSet {
      public static let possibleTypes = ["PrivateRoom", "SharedRoom"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(RoomFull.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var roomFull: RoomFull {
          get {
            return RoomFull(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public final class RoomTinyQuery: GraphQLQuery {
  public let operationDefinition =
    "query RoomTiny($id: ID!) {\n  room(id: $id) {\n    __typename\n    ...RoomShort\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(RoomShort.fragmentDefinition).appending(UserShort.fragmentDefinition).appending(OrganizationShort.fragmentDefinition).appending(FullMessage.fragmentDefinition).appending(UserTiny.fragmentDefinition) }

  public var id: GraphQLID

  public init(id: GraphQLID) {
    self.id = id
  }

  public var variables: GraphQLMap? {
    return ["id": id]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("room", arguments: ["id": GraphQLVariable("id")], type: .object(Room.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(room: Room? = nil) {
      self.init(unsafeResultMap: ["__typename": "Query", "room": room.flatMap { (value: Room) -> ResultMap in value.resultMap }])
    }

    public var room: Room? {
      get {
        return (resultMap["room"] as? ResultMap).flatMap { Room(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "room")
      }
    }

    public struct Room: GraphQLSelectionSet {
      public static let possibleTypes = ["PrivateRoom", "SharedRoom"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(RoomShort.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var roomShort: RoomShort {
          get {
            return RoomShort(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public final class RoomSuperQuery: GraphQLQuery {
  public let operationDefinition =
    "query RoomSuper($id: ID!) {\n  roomSuper(id: $id) {\n    __typename\n    id\n    featured\n    listed\n  }\n}"

  public var id: GraphQLID

  public init(id: GraphQLID) {
    self.id = id
  }

  public var variables: GraphQLMap? {
    return ["id": id]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("roomSuper", arguments: ["id": GraphQLVariable("id")], type: .object(RoomSuper.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(roomSuper: RoomSuper? = nil) {
      self.init(unsafeResultMap: ["__typename": "Query", "roomSuper": roomSuper.flatMap { (value: RoomSuper) -> ResultMap in value.resultMap }])
    }

    public var roomSuper: RoomSuper? {
      get {
        return (resultMap["roomSuper"] as? ResultMap).flatMap { RoomSuper(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "roomSuper")
      }
    }

    public struct RoomSuper: GraphQLSelectionSet {
      public static let possibleTypes = ["RoomSuper"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("featured", type: .nonNull(.scalar(Bool.self))),
        GraphQLField("listed", type: .nonNull(.scalar(Bool.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, featured: Bool, listed: Bool) {
        self.init(unsafeResultMap: ["__typename": "RoomSuper", "id": id, "featured": featured, "listed": listed])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var featured: Bool {
        get {
          return resultMap["featured"]! as! Bool
        }
        set {
          resultMap.updateValue(newValue, forKey: "featured")
        }
      }

      public var listed: Bool {
        get {
          return resultMap["listed"]! as! Bool
        }
        set {
          resultMap.updateValue(newValue, forKey: "listed")
        }
      }
    }
  }
}

public final class PinMessageMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation PinMessage($chatId: ID!, $messageId: ID!) {\n  pinMessage(chatId: $chatId, messageId: $messageId)\n}"

  public var chatId: GraphQLID
  public var messageId: GraphQLID

  public init(chatId: GraphQLID, messageId: GraphQLID) {
    self.chatId = chatId
    self.messageId = messageId
  }

  public var variables: GraphQLMap? {
    return ["chatId": chatId, "messageId": messageId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("pinMessage", arguments: ["chatId": GraphQLVariable("chatId"), "messageId": GraphQLVariable("messageId")], type: .nonNull(.scalar(Bool.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(pinMessage: Bool) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "pinMessage": pinMessage])
    }

    /// modernSendMessage(room: ID!, message: String, repeatKey: String,
    /// forwardMessages: [ID!], spans: [MessageSpanInput!], attachments:
    /// [MessageAttachmentInput!]): Boolean!
    public var pinMessage: Bool {
      get {
        return resultMap["pinMessage"]! as! Bool
      }
      set {
        resultMap.updateValue(newValue, forKey: "pinMessage")
      }
    }
  }
}

public final class UnpinMessageMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation UnpinMessage($chatId: ID!) {\n  unpinMessage(chatId: $chatId)\n}"

  public var chatId: GraphQLID

  public init(chatId: GraphQLID) {
    self.chatId = chatId
  }

  public var variables: GraphQLMap? {
    return ["chatId": chatId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("unpinMessage", arguments: ["chatId": GraphQLVariable("chatId")], type: .nonNull(.scalar(Bool.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(unpinMessage: Bool) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "unpinMessage": unpinMessage])
    }

    public var unpinMessage: Bool {
      get {
        return resultMap["unpinMessage"]! as! Bool
      }
      set {
        resultMap.updateValue(newValue, forKey: "unpinMessage")
      }
    }
  }
}

public final class MessageSetReactionMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation MessageSetReaction($messageId: ID!, $reaction: String!) {\n  betaReactionSet(mid: $messageId, reaction: $reaction)\n}"

  public var messageId: GraphQLID
  public var reaction: String

  public init(messageId: GraphQLID, reaction: String) {
    self.messageId = messageId
    self.reaction = reaction
  }

  public var variables: GraphQLMap? {
    return ["messageId": messageId, "reaction": reaction]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("betaReactionSet", arguments: ["mid": GraphQLVariable("messageId"), "reaction": GraphQLVariable("reaction")], type: .nonNull(.scalar(Bool.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(betaReactionSet: Bool) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "betaReactionSet": betaReactionSet])
    }

    public var betaReactionSet: Bool {
      get {
        return resultMap["betaReactionSet"]! as! Bool
      }
      set {
        resultMap.updateValue(newValue, forKey: "betaReactionSet")
      }
    }
  }
}

public final class SwitchReactionMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation SwitchReaction($messageId: ID!, $from: String!, $to: String!) {\n  betaReactionSet(mid: $messageId, reaction: $to)\n  betaReactionRemove(mid: $messageId, reaction: $from)\n}"

  public var messageId: GraphQLID
  public var from: String
  public var to: String

  public init(messageId: GraphQLID, from: String, to: String) {
    self.messageId = messageId
    self.from = from
    self.to = to
  }

  public var variables: GraphQLMap? {
    return ["messageId": messageId, "from": from, "to": to]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("betaReactionSet", arguments: ["mid": GraphQLVariable("messageId"), "reaction": GraphQLVariable("to")], type: .nonNull(.scalar(Bool.self))),
      GraphQLField("betaReactionRemove", arguments: ["mid": GraphQLVariable("messageId"), "reaction": GraphQLVariable("from")], type: .nonNull(.scalar(Bool.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(betaReactionSet: Bool, betaReactionRemove: Bool) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "betaReactionSet": betaReactionSet, "betaReactionRemove": betaReactionRemove])
    }

    public var betaReactionSet: Bool {
      get {
        return resultMap["betaReactionSet"]! as! Bool
      }
      set {
        resultMap.updateValue(newValue, forKey: "betaReactionSet")
      }
    }

    public var betaReactionRemove: Bool {
      get {
        return resultMap["betaReactionRemove"]! as! Bool
      }
      set {
        resultMap.updateValue(newValue, forKey: "betaReactionRemove")
      }
    }
  }
}

public final class MessageUnsetReactionMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation MessageUnsetReaction($messageId: ID!, $reaction: String!) {\n  betaReactionRemove(mid: $messageId, reaction: $reaction)\n}"

  public var messageId: GraphQLID
  public var reaction: String

  public init(messageId: GraphQLID, reaction: String) {
    self.messageId = messageId
    self.reaction = reaction
  }

  public var variables: GraphQLMap? {
    return ["messageId": messageId, "reaction": reaction]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("betaReactionRemove", arguments: ["mid": GraphQLVariable("messageId"), "reaction": GraphQLVariable("reaction")], type: .nonNull(.scalar(Bool.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(betaReactionRemove: Bool) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "betaReactionRemove": betaReactionRemove])
    }

    public var betaReactionRemove: Bool {
      get {
        return resultMap["betaReactionRemove"]! as! Bool
      }
      set {
        resultMap.updateValue(newValue, forKey: "betaReactionRemove")
      }
    }
  }
}

public final class SendPostMessageMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation SendPostMessage($conversationId: ID!, $title: String!, $text: String!, $attachments: [String!], $postType: PostMessageType!) {\n  sendPostMessage: alphaSendPostMessage(conversationId: $conversationId, title: $title, text: $text, attachments: $attachments, postType: $postType) {\n    __typename\n    seq\n  }\n}"

  public var conversationId: GraphQLID
  public var title: String
  public var text: String
  public var attachments: [String]?
  public var postType: PostMessageType

  public init(conversationId: GraphQLID, title: String, text: String, attachments: [String]?, postType: PostMessageType) {
    self.conversationId = conversationId
    self.title = title
    self.text = text
    self.attachments = attachments
    self.postType = postType
  }

  public var variables: GraphQLMap? {
    return ["conversationId": conversationId, "title": title, "text": text, "attachments": attachments, "postType": postType]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("alphaSendPostMessage", alias: "sendPostMessage", arguments: ["conversationId": GraphQLVariable("conversationId"), "title": GraphQLVariable("title"), "text": GraphQLVariable("text"), "attachments": GraphQLVariable("attachments"), "postType": GraphQLVariable("postType")], type: .nonNull(.object(SendPostMessage.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(sendPostMessage: SendPostMessage) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "sendPostMessage": sendPostMessage.resultMap])
    }

    public var sendPostMessage: SendPostMessage {
      get {
        return SendPostMessage(unsafeResultMap: resultMap["sendPostMessage"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "sendPostMessage")
      }
    }

    public struct SendPostMessage: GraphQLSelectionSet {
      public static let possibleTypes = ["ConversationEventMessage"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("seq", type: .nonNull(.scalar(Int.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(seq: Int) {
        self.init(unsafeResultMap: ["__typename": "ConversationEventMessage", "seq": seq])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var seq: Int {
        get {
          return resultMap["seq"]! as! Int
        }
        set {
          resultMap.updateValue(newValue, forKey: "seq")
        }
      }
    }
  }
}

public final class EditPostMessageMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation EditPostMessage($messageId: ID!, $title: String!, $text: String!, $attachments: [String!], $postType: PostMessageType!) {\n  editPostMessage: alphaEditPostMessage(messageId: $messageId, title: $title, text: $text, attachments: $attachments, postType: $postType) {\n    __typename\n    seq\n  }\n}"

  public var messageId: GraphQLID
  public var title: String
  public var text: String
  public var attachments: [String]?
  public var postType: PostMessageType

  public init(messageId: GraphQLID, title: String, text: String, attachments: [String]?, postType: PostMessageType) {
    self.messageId = messageId
    self.title = title
    self.text = text
    self.attachments = attachments
    self.postType = postType
  }

  public var variables: GraphQLMap? {
    return ["messageId": messageId, "title": title, "text": text, "attachments": attachments, "postType": postType]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("alphaEditPostMessage", alias: "editPostMessage", arguments: ["messageId": GraphQLVariable("messageId"), "title": GraphQLVariable("title"), "text": GraphQLVariable("text"), "attachments": GraphQLVariable("attachments"), "postType": GraphQLVariable("postType")], type: .nonNull(.object(EditPostMessage.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(editPostMessage: EditPostMessage) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "editPostMessage": editPostMessage.resultMap])
    }

    public var editPostMessage: EditPostMessage {
      get {
        return EditPostMessage(unsafeResultMap: resultMap["editPostMessage"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "editPostMessage")
      }
    }

    public struct EditPostMessage: GraphQLSelectionSet {
      public static let possibleTypes = ["ConversationEventMessage"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("seq", type: .nonNull(.scalar(Int.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(seq: Int) {
        self.init(unsafeResultMap: ["__typename": "ConversationEventMessage", "seq": seq])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var seq: Int {
        get {
          return resultMap["seq"]! as! Int
        }
        set {
          resultMap.updateValue(newValue, forKey: "seq")
        }
      }
    }
  }
}

public final class RespondPostMessageMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation RespondPostMessage($messageId: ID!, $buttonId: ID!, $reaction: String!) {\n  alphaRespondPostMessage(messageId: $messageId, buttonId: $buttonId)\n  betaReactionSet(mid: $messageId, reaction: $reaction)\n}"

  public var messageId: GraphQLID
  public var buttonId: GraphQLID
  public var reaction: String

  public init(messageId: GraphQLID, buttonId: GraphQLID, reaction: String) {
    self.messageId = messageId
    self.buttonId = buttonId
    self.reaction = reaction
  }

  public var variables: GraphQLMap? {
    return ["messageId": messageId, "buttonId": buttonId, "reaction": reaction]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("alphaRespondPostMessage", arguments: ["messageId": GraphQLVariable("messageId"), "buttonId": GraphQLVariable("buttonId")], type: .scalar(Bool.self)),
      GraphQLField("betaReactionSet", arguments: ["mid": GraphQLVariable("messageId"), "reaction": GraphQLVariable("reaction")], type: .nonNull(.scalar(Bool.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(alphaRespondPostMessage: Bool? = nil, betaReactionSet: Bool) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "alphaRespondPostMessage": alphaRespondPostMessage, "betaReactionSet": betaReactionSet])
    }

    public var alphaRespondPostMessage: Bool? {
      get {
        return resultMap["alphaRespondPostMessage"] as? Bool
      }
      set {
        resultMap.updateValue(newValue, forKey: "alphaRespondPostMessage")
      }
    }

    public var betaReactionSet: Bool {
      get {
        return resultMap["betaReactionSet"]! as! Bool
      }
      set {
        resultMap.updateValue(newValue, forKey: "betaReactionSet")
      }
    }
  }
}

public final class SaveDraftMessageMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation SaveDraftMessage($conversationId: ID!, $message: String!) {\n  conversationDraftUpdate(conversationId: $conversationId, message: $message)\n}"

  public var conversationId: GraphQLID
  public var message: String

  public init(conversationId: GraphQLID, message: String) {
    self.conversationId = conversationId
    self.message = message
  }

  public var variables: GraphQLMap? {
    return ["conversationId": conversationId, "message": message]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("conversationDraftUpdate", arguments: ["conversationId": GraphQLVariable("conversationId"), "message": GraphQLVariable("message")], type: .nonNull(.scalar(String.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(conversationDraftUpdate: String) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "conversationDraftUpdate": conversationDraftUpdate])
    }

    public var conversationDraftUpdate: String {
      get {
        return resultMap["conversationDraftUpdate"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "conversationDraftUpdate")
      }
    }
  }
}

public final class GetDraftMessageQuery: GraphQLQuery {
  public let operationDefinition =
    "query GetDraftMessage($conversationId: ID!) {\n  message: conversationDraft(conversationId: $conversationId)\n}"

  public var conversationId: GraphQLID

  public init(conversationId: GraphQLID) {
    self.conversationId = conversationId
  }

  public var variables: GraphQLMap? {
    return ["conversationId": conversationId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("conversationDraft", alias: "message", arguments: ["conversationId": GraphQLVariable("conversationId")], type: .scalar(String.self)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(message: String? = nil) {
      self.init(unsafeResultMap: ["__typename": "Query", "message": message])
    }

    public var message: String? {
      get {
        return resultMap["message"] as? String
      }
      set {
        resultMap.updateValue(newValue, forKey: "message")
      }
    }
  }
}

public final class GlobalCounterQuery: GraphQLQuery {
  public let operationDefinition =
    "query GlobalCounter {\n  counter: alphaNotificationCounter {\n    __typename\n    id\n    unreadCount\n  }\n}"

  public init() {
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("alphaNotificationCounter", alias: "counter", type: .nonNull(.object(Counter.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(counter: Counter) {
      self.init(unsafeResultMap: ["__typename": "Query", "counter": counter.resultMap])
    }

    public var counter: Counter {
      get {
        return Counter(unsafeResultMap: resultMap["counter"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "counter")
      }
    }

    public struct Counter: GraphQLSelectionSet {
      public static let possibleTypes = ["NotificationCounter"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("unreadCount", type: .nonNull(.scalar(Int.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, unreadCount: Int) {
        self.init(unsafeResultMap: ["__typename": "NotificationCounter", "id": id, "unreadCount": unreadCount])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var unreadCount: Int {
        get {
          return resultMap["unreadCount"]! as! Int
        }
        set {
          resultMap.updateValue(newValue, forKey: "unreadCount")
        }
      }
    }
  }
}

public final class ChatHistoryQuery: GraphQLQuery {
  public let operationDefinition =
    "query ChatHistory($chatId: ID!, $before: ID, $first: Int = 15) {\n  messages(chatId: $chatId, first: $first, before: $before) {\n    __typename\n    ...FullMessage\n  }\n  state: conversationState(id: $chatId) {\n    __typename\n    state\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(FullMessage.fragmentDefinition).appending(UserShort.fragmentDefinition).appending(OrganizationShort.fragmentDefinition).appending(UserTiny.fragmentDefinition) }

  public var chatId: GraphQLID
  public var before: GraphQLID?
  public var first: Int?

  public init(chatId: GraphQLID, before: GraphQLID? = nil, first: Int? = nil) {
    self.chatId = chatId
    self.before = before
    self.first = first
  }

  public var variables: GraphQLMap? {
    return ["chatId": chatId, "before": before, "first": first]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("messages", arguments: ["chatId": GraphQLVariable("chatId"), "first": GraphQLVariable("first"), "before": GraphQLVariable("before")], type: .nonNull(.list(.nonNull(.object(Message.selections))))),
      GraphQLField("conversationState", alias: "state", arguments: ["id": GraphQLVariable("chatId")], type: .nonNull(.object(State.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(messages: [Message], state: State) {
      self.init(unsafeResultMap: ["__typename": "Query", "messages": messages.map { (value: Message) -> ResultMap in value.resultMap }, "state": state.resultMap])
    }

    public var messages: [Message] {
      get {
        return (resultMap["messages"] as! [ResultMap]).map { (value: ResultMap) -> Message in Message(unsafeResultMap: value) }
      }
      set {
        resultMap.updateValue(newValue.map { (value: Message) -> ResultMap in value.resultMap }, forKey: "messages")
      }
    }

    public var state: State {
      get {
        return State(unsafeResultMap: resultMap["state"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "state")
      }
    }

    public struct Message: GraphQLSelectionSet {
      public static let possibleTypes = ["GeneralMessage", "ServiceMessage"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(FullMessage.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var fullMessage: FullMessage {
          get {
            return FullMessage(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }

    public struct State: GraphQLSelectionSet {
      public static let possibleTypes = ["ConversationUpdateState"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("state", type: .scalar(String.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(state: String? = nil) {
        self.init(unsafeResultMap: ["__typename": "ConversationUpdateState", "state": state])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var state: String? {
        get {
          return resultMap["state"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "state")
        }
      }
    }
  }
}

public final class SendMessageMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation SendMessage($message: String, $file: String, $repeatKey: String, $replyMessages: [ID!], $mentions: [ID!], $room: ID!) {\n  sentMessage: betaMessageSend(message: $message, file: $file, repeatKey: $repeatKey, replyMessages: $replyMessages, mentions: $mentions, room: $room)\n}"

  public var message: String?
  public var file: String?
  public var repeatKey: String?
  public var replyMessages: [GraphQLID]?
  public var mentions: [GraphQLID]?
  public var room: GraphQLID

  public init(message: String? = nil, file: String? = nil, repeatKey: String? = nil, replyMessages: [GraphQLID]?, mentions: [GraphQLID]?, room: GraphQLID) {
    self.message = message
    self.file = file
    self.repeatKey = repeatKey
    self.replyMessages = replyMessages
    self.mentions = mentions
    self.room = room
  }

  public var variables: GraphQLMap? {
    return ["message": message, "file": file, "repeatKey": repeatKey, "replyMessages": replyMessages, "mentions": mentions, "room": room]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("betaMessageSend", alias: "sentMessage", arguments: ["message": GraphQLVariable("message"), "file": GraphQLVariable("file"), "repeatKey": GraphQLVariable("repeatKey"), "replyMessages": GraphQLVariable("replyMessages"), "mentions": GraphQLVariable("mentions"), "room": GraphQLVariable("room")], type: .nonNull(.scalar(Bool.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(sentMessage: Bool) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "sentMessage": sentMessage])
    }

    public var sentMessage: Bool {
      get {
        return resultMap["sentMessage"]! as! Bool
      }
      set {
        resultMap.updateValue(newValue, forKey: "sentMessage")
      }
    }
  }
}

public final class ReplyMessageMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation ReplyMessage($roomId: ID!, $message: String, $replyMessages: [ID!], $mentions: [ID!]) {\n  replyMessage: betaMessageSend(room: $roomId, message: $message, replyMessages: $replyMessages, mentions: $mentions)\n}"

  public var roomId: GraphQLID
  public var message: String?
  public var replyMessages: [GraphQLID]?
  public var mentions: [GraphQLID]?

  public init(roomId: GraphQLID, message: String? = nil, replyMessages: [GraphQLID]?, mentions: [GraphQLID]?) {
    self.roomId = roomId
    self.message = message
    self.replyMessages = replyMessages
    self.mentions = mentions
  }

  public var variables: GraphQLMap? {
    return ["roomId": roomId, "message": message, "replyMessages": replyMessages, "mentions": mentions]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("betaMessageSend", alias: "replyMessage", arguments: ["room": GraphQLVariable("roomId"), "message": GraphQLVariable("message"), "replyMessages": GraphQLVariable("replyMessages"), "mentions": GraphQLVariable("mentions")], type: .nonNull(.scalar(Bool.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(replyMessage: Bool) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "replyMessage": replyMessage])
    }

    public var replyMessage: Bool {
      get {
        return resultMap["replyMessage"]! as! Bool
      }
      set {
        resultMap.updateValue(newValue, forKey: "replyMessage")
      }
    }
  }
}

public final class RoomReadMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation RoomRead($id: ID!, $mid: ID!) {\n  roomRead(id: $id, mid: $mid)\n}"

  public var id: GraphQLID
  public var mid: GraphQLID

  public init(id: GraphQLID, mid: GraphQLID) {
    self.id = id
    self.mid = mid
  }

  public var variables: GraphQLMap? {
    return ["id": id, "mid": mid]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("roomRead", arguments: ["id": GraphQLVariable("id"), "mid": GraphQLVariable("mid")], type: .nonNull(.scalar(Bool.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(roomRead: Bool) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "roomRead": roomRead])
    }

    public var roomRead: Bool {
      get {
        return resultMap["roomRead"]! as! Bool
      }
      set {
        resultMap.updateValue(newValue, forKey: "roomRead")
      }
    }
  }
}

public final class ChatSearchGroupQuery: GraphQLQuery {
  public let operationDefinition =
    "query ChatSearchGroup($members: [ID!]!) {\n  group: alphaChatSearch(members: $members) {\n    __typename\n    id\n    flexibleId\n  }\n}"

  public var members: [GraphQLID]

  public init(members: [GraphQLID]) {
    self.members = members
  }

  public var variables: GraphQLMap? {
    return ["members": members]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("alphaChatSearch", alias: "group", arguments: ["members": GraphQLVariable("members")], type: .object(Group.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(group: Group? = nil) {
      self.init(unsafeResultMap: ["__typename": "Query", "group": group.flatMap { (value: Group) -> ResultMap in value.resultMap }])
    }

    public var group: Group? {
      get {
        return (resultMap["group"] as? ResultMap).flatMap { Group(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "group")
      }
    }

    public struct Group: GraphQLSelectionSet {
      public static let possibleTypes = ["ChannelConversation", "AnonymousConversation", "GroupConversation", "PrivateConversation", "SharedConversation"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("flexibleId", type: .nonNull(.scalar(GraphQLID.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public static func makeChannelConversation(id: GraphQLID, flexibleId: GraphQLID) -> Group {
        return Group(unsafeResultMap: ["__typename": "ChannelConversation", "id": id, "flexibleId": flexibleId])
      }

      public static func makeAnonymousConversation(id: GraphQLID, flexibleId: GraphQLID) -> Group {
        return Group(unsafeResultMap: ["__typename": "AnonymousConversation", "id": id, "flexibleId": flexibleId])
      }

      public static func makeGroupConversation(id: GraphQLID, flexibleId: GraphQLID) -> Group {
        return Group(unsafeResultMap: ["__typename": "GroupConversation", "id": id, "flexibleId": flexibleId])
      }

      public static func makePrivateConversation(id: GraphQLID, flexibleId: GraphQLID) -> Group {
        return Group(unsafeResultMap: ["__typename": "PrivateConversation", "id": id, "flexibleId": flexibleId])
      }

      public static func makeSharedConversation(id: GraphQLID, flexibleId: GraphQLID) -> Group {
        return Group(unsafeResultMap: ["__typename": "SharedConversation", "id": id, "flexibleId": flexibleId])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var flexibleId: GraphQLID {
        get {
          return resultMap["flexibleId"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "flexibleId")
        }
      }
    }
  }
}

public final class RoomCreateMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation RoomCreate($kind: SharedRoomKind!, $members: [ID!]!, $message: String, $title: String, $description: String, $photoRef: ImageRefInput, $organizationId: ID) {\n  room: betaRoomCreate(kind: $kind, members: $members, message: $message, title: $title, description: $description, photoRef: $photoRef, organizationId: $organizationId) {\n    __typename\n    id\n  }\n}"

  public var kind: SharedRoomKind
  public var members: [GraphQLID]
  public var message: String?
  public var title: String?
  public var description: String?
  public var photoRef: ImageRefInput?
  public var organizationId: GraphQLID?

  public init(kind: SharedRoomKind, members: [GraphQLID], message: String? = nil, title: String? = nil, description: String? = nil, photoRef: ImageRefInput? = nil, organizationId: GraphQLID? = nil) {
    self.kind = kind
    self.members = members
    self.message = message
    self.title = title
    self.description = description
    self.photoRef = photoRef
    self.organizationId = organizationId
  }

  public var variables: GraphQLMap? {
    return ["kind": kind, "members": members, "message": message, "title": title, "description": description, "photoRef": photoRef, "organizationId": organizationId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("betaRoomCreate", alias: "room", arguments: ["kind": GraphQLVariable("kind"), "members": GraphQLVariable("members"), "message": GraphQLVariable("message"), "title": GraphQLVariable("title"), "description": GraphQLVariable("description"), "photoRef": GraphQLVariable("photoRef"), "organizationId": GraphQLVariable("organizationId")], type: .nonNull(.object(Room.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(room: Room) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "room": room.resultMap])
    }

    /// Room mgmt
    public var room: Room {
      get {
        return Room(unsafeResultMap: resultMap["room"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "room")
      }
    }

    public struct Room: GraphQLSelectionSet {
      public static let possibleTypes = ["SharedRoom"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID) {
        self.init(unsafeResultMap: ["__typename": "SharedRoom", "id": id])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }
    }
  }
}

public final class RoomCreateIntroMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation RoomCreateIntro($roomId: ID!, $uid: ID!, $about: String, $file: String) {\n  intro: betaIntroSend(room: $roomId, uid: $uid, about: $about, file: $file, message: $about)\n}"

  public var roomId: GraphQLID
  public var uid: GraphQLID
  public var about: String?
  public var file: String?

  public init(roomId: GraphQLID, uid: GraphQLID, about: String? = nil, file: String? = nil) {
    self.roomId = roomId
    self.uid = uid
    self.about = about
    self.file = file
  }

  public var variables: GraphQLMap? {
    return ["roomId": roomId, "uid": uid, "about": about, "file": file]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("betaIntroSend", alias: "intro", arguments: ["room": GraphQLVariable("roomId"), "uid": GraphQLVariable("uid"), "about": GraphQLVariable("about"), "file": GraphQLVariable("file"), "message": GraphQLVariable("about")], type: .nonNull(.scalar(Bool.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(intro: Bool) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "intro": intro])
    }

    public var intro: Bool {
      get {
        return resultMap["intro"]! as! Bool
      }
      set {
        resultMap.updateValue(newValue, forKey: "intro")
      }
    }
  }
}

public final class RoomEditIntroMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation RoomEditIntro($messageId: ID!, $uid: ID!, $about: String, $file: String) {\n  intro: betaIntroEdit(mid: $messageId, uid: $uid, about: $about, file: $file, message: $about)\n}"

  public var messageId: GraphQLID
  public var uid: GraphQLID
  public var about: String?
  public var file: String?

  public init(messageId: GraphQLID, uid: GraphQLID, about: String? = nil, file: String? = nil) {
    self.messageId = messageId
    self.uid = uid
    self.about = about
    self.file = file
  }

  public var variables: GraphQLMap? {
    return ["messageId": messageId, "uid": uid, "about": about, "file": file]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("betaIntroEdit", alias: "intro", arguments: ["mid": GraphQLVariable("messageId"), "uid": GraphQLVariable("uid"), "about": GraphQLVariable("about"), "file": GraphQLVariable("file"), "message": GraphQLVariable("about")], type: .nonNull(.scalar(Bool.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(intro: Bool) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "intro": intro])
    }

    public var intro: Bool {
      get {
        return resultMap["intro"]! as! Bool
      }
      set {
        resultMap.updateValue(newValue, forKey: "intro")
      }
    }
  }
}

public final class SetTypingMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation SetTyping($conversationId: ID!) {\n  typingSend(conversationId: $conversationId, type: TEXT)\n}"

  public var conversationId: GraphQLID

  public init(conversationId: GraphQLID) {
    self.conversationId = conversationId
  }

  public var variables: GraphQLMap? {
    return ["conversationId": conversationId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("typingSend", arguments: ["conversationId": GraphQLVariable("conversationId"), "type": "TEXT"], type: .nonNull(.scalar(String.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(typingSend: String) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "typingSend": typingSend])
    }

    public var typingSend: String {
      get {
        return resultMap["typingSend"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "typingSend")
      }
    }
  }
}

public final class CancelTypingMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation CancelTyping($conversationId: ID!) {\n  typingCancel(conversationId: $conversationId)\n}"

  public var conversationId: GraphQLID

  public init(conversationId: GraphQLID) {
    self.conversationId = conversationId
  }

  public var variables: GraphQLMap? {
    return ["conversationId": conversationId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("typingCancel", arguments: ["conversationId": GraphQLVariable("conversationId")], type: .nonNull(.scalar(String.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(typingCancel: String) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "typingCancel": typingCancel])
    }

    public var typingCancel: String {
      get {
        return resultMap["typingCancel"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "typingCancel")
      }
    }
  }
}

public final class RoomAddMemberMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation RoomAddMember($roomId: ID!, $userId: ID!) {\n  betaRoomInvite(roomId: $roomId, invites: [{userId: $userId, role: MEMBER}]) {\n    __typename\n    ...RoomFull\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(RoomFull.fragmentDefinition).appending(UserShort.fragmentDefinition).appending(OrganizationShort.fragmentDefinition).appending(OrganizationMedium.fragmentDefinition).appending(UserFull.fragmentDefinition).appending(FullMessage.fragmentDefinition).appending(UserTiny.fragmentDefinition) }

  public var roomId: GraphQLID
  public var userId: GraphQLID

  public init(roomId: GraphQLID, userId: GraphQLID) {
    self.roomId = roomId
    self.userId = userId
  }

  public var variables: GraphQLMap? {
    return ["roomId": roomId, "userId": userId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("betaRoomInvite", arguments: ["roomId": GraphQLVariable("roomId"), "invites": [["userId": GraphQLVariable("userId"), "role": "MEMBER"]]], type: .nonNull(.object(BetaRoomInvite.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(betaRoomInvite: BetaRoomInvite) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "betaRoomInvite": betaRoomInvite.resultMap])
    }

    /// Members mgmt
    public var betaRoomInvite: BetaRoomInvite {
      get {
        return BetaRoomInvite(unsafeResultMap: resultMap["betaRoomInvite"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "betaRoomInvite")
      }
    }

    public struct BetaRoomInvite: GraphQLSelectionSet {
      public static let possibleTypes = ["PrivateRoom", "SharedRoom"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(RoomFull.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var roomFull: RoomFull {
          get {
            return RoomFull(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public final class RoomDeclineJoinReuestMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation RoomDeclineJoinReuest($roomId: ID!, $userId: ID!) {\n  betaRoomDeclineJoinRequest(roomId: $roomId, userId: $userId) {\n    __typename\n    ...RoomFull\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(RoomFull.fragmentDefinition).appending(UserShort.fragmentDefinition).appending(OrganizationShort.fragmentDefinition).appending(OrganizationMedium.fragmentDefinition).appending(UserFull.fragmentDefinition).appending(FullMessage.fragmentDefinition).appending(UserTiny.fragmentDefinition) }

  public var roomId: GraphQLID
  public var userId: GraphQLID

  public init(roomId: GraphQLID, userId: GraphQLID) {
    self.roomId = roomId
    self.userId = userId
  }

  public var variables: GraphQLMap? {
    return ["roomId": roomId, "userId": userId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("betaRoomDeclineJoinRequest", arguments: ["roomId": GraphQLVariable("roomId"), "userId": GraphQLVariable("userId")], type: .nonNull(.object(BetaRoomDeclineJoinRequest.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(betaRoomDeclineJoinRequest: BetaRoomDeclineJoinRequest) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "betaRoomDeclineJoinRequest": betaRoomDeclineJoinRequest.resultMap])
    }

    public var betaRoomDeclineJoinRequest: BetaRoomDeclineJoinRequest {
      get {
        return BetaRoomDeclineJoinRequest(unsafeResultMap: resultMap["betaRoomDeclineJoinRequest"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "betaRoomDeclineJoinRequest")
      }
    }

    public struct BetaRoomDeclineJoinRequest: GraphQLSelectionSet {
      public static let possibleTypes = ["PrivateRoom", "SharedRoom"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(RoomFull.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var roomFull: RoomFull {
          get {
            return RoomFull(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public final class RoomAddMembersMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation RoomAddMembers($roomId: ID!, $invites: [RoomInviteInput!]!) {\n  betaRoomInvite(roomId: $roomId, invites: $invites) {\n    __typename\n    ...RoomFull\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(RoomFull.fragmentDefinition).appending(UserShort.fragmentDefinition).appending(OrganizationShort.fragmentDefinition).appending(OrganizationMedium.fragmentDefinition).appending(UserFull.fragmentDefinition).appending(FullMessage.fragmentDefinition).appending(UserTiny.fragmentDefinition) }

  public var roomId: GraphQLID
  public var invites: [RoomInviteInput]

  public init(roomId: GraphQLID, invites: [RoomInviteInput]) {
    self.roomId = roomId
    self.invites = invites
  }

  public var variables: GraphQLMap? {
    return ["roomId": roomId, "invites": invites]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("betaRoomInvite", arguments: ["roomId": GraphQLVariable("roomId"), "invites": GraphQLVariable("invites")], type: .nonNull(.object(BetaRoomInvite.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(betaRoomInvite: BetaRoomInvite) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "betaRoomInvite": betaRoomInvite.resultMap])
    }

    /// Members mgmt
    public var betaRoomInvite: BetaRoomInvite {
      get {
        return BetaRoomInvite(unsafeResultMap: resultMap["betaRoomInvite"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "betaRoomInvite")
      }
    }

    public struct BetaRoomInvite: GraphQLSelectionSet {
      public static let possibleTypes = ["PrivateRoom", "SharedRoom"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(RoomFull.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var roomFull: RoomFull {
          get {
            return RoomFull(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public final class RoomKickMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation RoomKick($roomId: ID!, $userId: ID!) {\n  betaRoomKick(roomId: $roomId, userId: $userId) {\n    __typename\n    ...RoomFull\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(RoomFull.fragmentDefinition).appending(UserShort.fragmentDefinition).appending(OrganizationShort.fragmentDefinition).appending(OrganizationMedium.fragmentDefinition).appending(UserFull.fragmentDefinition).appending(FullMessage.fragmentDefinition).appending(UserTiny.fragmentDefinition) }

  public var roomId: GraphQLID
  public var userId: GraphQLID

  public init(roomId: GraphQLID, userId: GraphQLID) {
    self.roomId = roomId
    self.userId = userId
  }

  public var variables: GraphQLMap? {
    return ["roomId": roomId, "userId": userId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("betaRoomKick", arguments: ["roomId": GraphQLVariable("roomId"), "userId": GraphQLVariable("userId")], type: .nonNull(.object(BetaRoomKick.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(betaRoomKick: BetaRoomKick) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "betaRoomKick": betaRoomKick.resultMap])
    }

    public var betaRoomKick: BetaRoomKick {
      get {
        return BetaRoomKick(unsafeResultMap: resultMap["betaRoomKick"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "betaRoomKick")
      }
    }

    public struct BetaRoomKick: GraphQLSelectionSet {
      public static let possibleTypes = ["PrivateRoom", "SharedRoom"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(RoomFull.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var roomFull: RoomFull {
          get {
            return RoomFull(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public final class RoomLeaveMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation RoomLeave($roomId: ID!) {\n  betaRoomLeave(roomId: $roomId) {\n    __typename\n    ...RoomFull\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(RoomFull.fragmentDefinition).appending(UserShort.fragmentDefinition).appending(OrganizationShort.fragmentDefinition).appending(OrganizationMedium.fragmentDefinition).appending(UserFull.fragmentDefinition).appending(FullMessage.fragmentDefinition).appending(UserTiny.fragmentDefinition) }

  public var roomId: GraphQLID

  public init(roomId: GraphQLID) {
    self.roomId = roomId
  }

  public var variables: GraphQLMap? {
    return ["roomId": roomId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("betaRoomLeave", arguments: ["roomId": GraphQLVariable("roomId")], type: .nonNull(.object(BetaRoomLeave.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(betaRoomLeave: BetaRoomLeave) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "betaRoomLeave": betaRoomLeave.resultMap])
    }

    public var betaRoomLeave: BetaRoomLeave {
      get {
        return BetaRoomLeave(unsafeResultMap: resultMap["betaRoomLeave"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "betaRoomLeave")
      }
    }

    public struct BetaRoomLeave: GraphQLSelectionSet {
      public static let possibleTypes = ["PrivateRoom", "SharedRoom"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(RoomFull.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var roomFull: RoomFull {
          get {
            return RoomFull(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public final class RoomSearchTextQuery: GraphQLQuery {
  public let operationDefinition =
    "query RoomSearchText($query: String!) {\n  items: betaDialogTextSearch(query: $query) {\n    __typename\n    id: cid\n    title\n    flexibleId: fid\n    photo\n    kind\n  }\n}"

  public var query: String

  public init(query: String) {
    self.query = query
  }

  public var variables: GraphQLMap? {
    return ["query": query]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("betaDialogTextSearch", alias: "items", arguments: ["query": GraphQLVariable("query")], type: .nonNull(.list(.nonNull(.object(Item.selections))))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(items: [Item]) {
      self.init(unsafeResultMap: ["__typename": "Query", "items": items.map { (value: Item) -> ResultMap in value.resultMap }])
    }

    public var items: [Item] {
      get {
        return (resultMap["items"] as! [ResultMap]).map { (value: ResultMap) -> Item in Item(unsafeResultMap: value) }
      }
      set {
        resultMap.updateValue(newValue.map { (value: Item) -> ResultMap in value.resultMap }, forKey: "items")
      }
    }

    public struct Item: GraphQLSelectionSet {
      public static let possibleTypes = ["Dialog"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("cid", alias: "id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("title", type: .nonNull(.scalar(String.self))),
        GraphQLField("fid", alias: "flexibleId", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("photo", type: .nonNull(.scalar(String.self))),
        GraphQLField("kind", type: .nonNull(.scalar(DialogKind.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, title: String, flexibleId: GraphQLID, photo: String, kind: DialogKind) {
        self.init(unsafeResultMap: ["__typename": "Dialog", "id": id, "title": title, "flexibleId": flexibleId, "photo": photo, "kind": kind])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var title: String {
        get {
          return resultMap["title"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "title")
        }
      }

      public var flexibleId: GraphQLID {
        get {
          return resultMap["flexibleId"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "flexibleId")
        }
      }

      public var photo: String {
        get {
          return resultMap["photo"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "photo")
        }
      }

      public var kind: DialogKind {
        get {
          return resultMap["kind"]! as! DialogKind
        }
        set {
          resultMap.updateValue(newValue, forKey: "kind")
        }
      }
    }
  }
}

public final class RoomSearchQuery: GraphQLQuery {
  public let operationDefinition =
    "query RoomSearch($query: String, $sort: String, $page: Int) {\n  items: betaRoomSearch(query: $query, sort: $sort, page: $page, first: 25) {\n    __typename\n    edges {\n      __typename\n      node {\n        __typename\n        ...RoomFull\n      }\n      cursor\n    }\n    pageInfo {\n      __typename\n      hasNextPage\n      hasPreviousPage\n      itemsCount\n      currentPage\n      pagesCount\n      openEnded\n    }\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(RoomFull.fragmentDefinition).appending(UserShort.fragmentDefinition).appending(OrganizationShort.fragmentDefinition).appending(OrganizationMedium.fragmentDefinition).appending(UserFull.fragmentDefinition).appending(FullMessage.fragmentDefinition).appending(UserTiny.fragmentDefinition) }

  public var query: String?
  public var sort: String?
  public var page: Int?

  public init(query: String? = nil, sort: String? = nil, page: Int? = nil) {
    self.query = query
    self.sort = sort
    self.page = page
  }

  public var variables: GraphQLMap? {
    return ["query": query, "sort": sort, "page": page]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("betaRoomSearch", alias: "items", arguments: ["query": GraphQLVariable("query"), "sort": GraphQLVariable("sort"), "page": GraphQLVariable("page"), "first": 25], type: .nonNull(.object(Item.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(items: Item) {
      self.init(unsafeResultMap: ["__typename": "Query", "items": items.resultMap])
    }

    public var items: Item {
      get {
        return Item(unsafeResultMap: resultMap["items"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "items")
      }
    }

    public struct Item: GraphQLSelectionSet {
      public static let possibleTypes = ["RoomConnection"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("edges", type: .nonNull(.list(.nonNull(.object(Edge.selections))))),
        GraphQLField("pageInfo", type: .nonNull(.object(PageInfo.selections))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(edges: [Edge], pageInfo: PageInfo) {
        self.init(unsafeResultMap: ["__typename": "RoomConnection", "edges": edges.map { (value: Edge) -> ResultMap in value.resultMap }, "pageInfo": pageInfo.resultMap])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var edges: [Edge] {
        get {
          return (resultMap["edges"] as! [ResultMap]).map { (value: ResultMap) -> Edge in Edge(unsafeResultMap: value) }
        }
        set {
          resultMap.updateValue(newValue.map { (value: Edge) -> ResultMap in value.resultMap }, forKey: "edges")
        }
      }

      public var pageInfo: PageInfo {
        get {
          return PageInfo(unsafeResultMap: resultMap["pageInfo"]! as! ResultMap)
        }
        set {
          resultMap.updateValue(newValue.resultMap, forKey: "pageInfo")
        }
      }

      public struct Edge: GraphQLSelectionSet {
        public static let possibleTypes = ["RoomConnectionEdge"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("node", type: .nonNull(.object(Node.selections))),
          GraphQLField("cursor", type: .nonNull(.scalar(String.self))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(node: Node, cursor: String) {
          self.init(unsafeResultMap: ["__typename": "RoomConnectionEdge", "node": node.resultMap, "cursor": cursor])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var node: Node {
          get {
            return Node(unsafeResultMap: resultMap["node"]! as! ResultMap)
          }
          set {
            resultMap.updateValue(newValue.resultMap, forKey: "node")
          }
        }

        public var cursor: String {
          get {
            return resultMap["cursor"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "cursor")
          }
        }

        public struct Node: GraphQLSelectionSet {
          public static let possibleTypes = ["SharedRoom"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLFragmentSpread(RoomFull.self),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var fragments: Fragments {
            get {
              return Fragments(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }

          public struct Fragments {
            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public var roomFull: RoomFull {
              get {
                return RoomFull(unsafeResultMap: resultMap)
              }
              set {
                resultMap += newValue.resultMap
              }
            }
          }
        }
      }

      public struct PageInfo: GraphQLSelectionSet {
        public static let possibleTypes = ["PageInfo"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("hasNextPage", type: .nonNull(.scalar(Bool.self))),
          GraphQLField("hasPreviousPage", type: .nonNull(.scalar(Bool.self))),
          GraphQLField("itemsCount", type: .nonNull(.scalar(Int.self))),
          GraphQLField("currentPage", type: .nonNull(.scalar(Int.self))),
          GraphQLField("pagesCount", type: .nonNull(.scalar(Int.self))),
          GraphQLField("openEnded", type: .nonNull(.scalar(Bool.self))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(hasNextPage: Bool, hasPreviousPage: Bool, itemsCount: Int, currentPage: Int, pagesCount: Int, openEnded: Bool) {
          self.init(unsafeResultMap: ["__typename": "PageInfo", "hasNextPage": hasNextPage, "hasPreviousPage": hasPreviousPage, "itemsCount": itemsCount, "currentPage": currentPage, "pagesCount": pagesCount, "openEnded": openEnded])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var hasNextPage: Bool {
          get {
            return resultMap["hasNextPage"]! as! Bool
          }
          set {
            resultMap.updateValue(newValue, forKey: "hasNextPage")
          }
        }

        public var hasPreviousPage: Bool {
          get {
            return resultMap["hasPreviousPage"]! as! Bool
          }
          set {
            resultMap.updateValue(newValue, forKey: "hasPreviousPage")
          }
        }

        public var itemsCount: Int {
          get {
            return resultMap["itemsCount"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "itemsCount")
          }
        }

        public var currentPage: Int {
          get {
            return resultMap["currentPage"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "currentPage")
          }
        }

        public var pagesCount: Int {
          get {
            return resultMap["pagesCount"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "pagesCount")
          }
        }

        public var openEnded: Bool {
          get {
            return resultMap["openEnded"]! as! Bool
          }
          set {
            resultMap.updateValue(newValue, forKey: "openEnded")
          }
        }
      }
    }
  }
}

public final class RoomAlterFeaturedMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation RoomAlterFeatured($roomId: ID!, $featured: Boolean!) {\n  betaRoomAlterFeatured(roomId: $roomId, featured: $featured) {\n    __typename\n    id\n    listed\n    featured\n  }\n}"

  public var roomId: GraphQLID
  public var featured: Bool

  public init(roomId: GraphQLID, featured: Bool) {
    self.roomId = roomId
    self.featured = featured
  }

  public var variables: GraphQLMap? {
    return ["roomId": roomId, "featured": featured]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("betaRoomAlterFeatured", arguments: ["roomId": GraphQLVariable("roomId"), "featured": GraphQLVariable("featured")], type: .nonNull(.object(BetaRoomAlterFeatured.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(betaRoomAlterFeatured: BetaRoomAlterFeatured) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "betaRoomAlterFeatured": betaRoomAlterFeatured.resultMap])
    }

    /// Admin tools
    public var betaRoomAlterFeatured: BetaRoomAlterFeatured {
      get {
        return BetaRoomAlterFeatured(unsafeResultMap: resultMap["betaRoomAlterFeatured"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "betaRoomAlterFeatured")
      }
    }

    public struct BetaRoomAlterFeatured: GraphQLSelectionSet {
      public static let possibleTypes = ["RoomSuper"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("listed", type: .nonNull(.scalar(Bool.self))),
        GraphQLField("featured", type: .nonNull(.scalar(Bool.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, listed: Bool, featured: Bool) {
        self.init(unsafeResultMap: ["__typename": "RoomSuper", "id": id, "listed": listed, "featured": featured])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var listed: Bool {
        get {
          return resultMap["listed"]! as! Bool
        }
        set {
          resultMap.updateValue(newValue, forKey: "listed")
        }
      }

      public var featured: Bool {
        get {
          return resultMap["featured"]! as! Bool
        }
        set {
          resultMap.updateValue(newValue, forKey: "featured")
        }
      }
    }
  }
}

public final class RoomAlterHiddenMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation RoomAlterHidden($roomId: ID!, $listed: Boolean!) {\n  betaRoomAlterListed(roomId: $roomId, listed: $listed) {\n    __typename\n    id\n    listed\n    featured\n  }\n}"

  public var roomId: GraphQLID
  public var listed: Bool

  public init(roomId: GraphQLID, listed: Bool) {
    self.roomId = roomId
    self.listed = listed
  }

  public var variables: GraphQLMap? {
    return ["roomId": roomId, "listed": listed]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("betaRoomAlterListed", arguments: ["roomId": GraphQLVariable("roomId"), "listed": GraphQLVariable("listed")], type: .nonNull(.object(BetaRoomAlterListed.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(betaRoomAlterListed: BetaRoomAlterListed) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "betaRoomAlterListed": betaRoomAlterListed.resultMap])
    }

    public var betaRoomAlterListed: BetaRoomAlterListed {
      get {
        return BetaRoomAlterListed(unsafeResultMap: resultMap["betaRoomAlterListed"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "betaRoomAlterListed")
      }
    }

    public struct BetaRoomAlterListed: GraphQLSelectionSet {
      public static let possibleTypes = ["RoomSuper"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("listed", type: .nonNull(.scalar(Bool.self))),
        GraphQLField("featured", type: .nonNull(.scalar(Bool.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, listed: Bool, featured: Bool) {
        self.init(unsafeResultMap: ["__typename": "RoomSuper", "id": id, "listed": listed, "featured": featured])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var listed: Bool {
        get {
          return resultMap["listed"]! as! Bool
        }
        set {
          resultMap.updateValue(newValue, forKey: "listed")
        }
      }

      public var featured: Bool {
        get {
          return resultMap["featured"]! as! Bool
        }
        set {
          resultMap.updateValue(newValue, forKey: "featured")
        }
      }
    }
  }
}

public final class RoomMembersShortQuery: GraphQLQuery {
  public let operationDefinition =
    "query RoomMembersShort($roomId: ID!) {\n  members: roomMembers(roomId: $roomId) {\n    __typename\n    user {\n      __typename\n      id\n    }\n  }\n}"

  public var roomId: GraphQLID

  public init(roomId: GraphQLID) {
    self.roomId = roomId
  }

  public var variables: GraphQLMap? {
    return ["roomId": roomId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("roomMembers", alias: "members", arguments: ["roomId": GraphQLVariable("roomId")], type: .nonNull(.list(.nonNull(.object(Member.selections))))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(members: [Member]) {
      self.init(unsafeResultMap: ["__typename": "Query", "members": members.map { (value: Member) -> ResultMap in value.resultMap }])
    }

    public var members: [Member] {
      get {
        return (resultMap["members"] as! [ResultMap]).map { (value: ResultMap) -> Member in Member(unsafeResultMap: value) }
      }
      set {
        resultMap.updateValue(newValue.map { (value: Member) -> ResultMap in value.resultMap }, forKey: "members")
      }
    }

    public struct Member: GraphQLSelectionSet {
      public static let possibleTypes = ["RoomMember"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("user", type: .nonNull(.object(User.selections))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(user: User) {
        self.init(unsafeResultMap: ["__typename": "RoomMember", "user": user.resultMap])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var user: User {
        get {
          return User(unsafeResultMap: resultMap["user"]! as! ResultMap)
        }
        set {
          resultMap.updateValue(newValue.resultMap, forKey: "user")
        }
      }

      public struct User: GraphQLSelectionSet {
        public static let possibleTypes = ["User"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(id: GraphQLID) {
          self.init(unsafeResultMap: ["__typename": "User", "id": id])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var id: GraphQLID {
          get {
            return resultMap["id"]! as! GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "id")
          }
        }
      }
    }
  }
}

public final class RoomMembersQuery: GraphQLQuery {
  public let operationDefinition =
    "query RoomMembers($roomId: ID!) {\n  members: roomMembers(roomId: $roomId) {\n    __typename\n    user {\n      __typename\n      ...UserShort\n    }\n    role\n    membership\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(UserShort.fragmentDefinition).appending(OrganizationShort.fragmentDefinition) }

  public var roomId: GraphQLID

  public init(roomId: GraphQLID) {
    self.roomId = roomId
  }

  public var variables: GraphQLMap? {
    return ["roomId": roomId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("roomMembers", alias: "members", arguments: ["roomId": GraphQLVariable("roomId")], type: .nonNull(.list(.nonNull(.object(Member.selections))))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(members: [Member]) {
      self.init(unsafeResultMap: ["__typename": "Query", "members": members.map { (value: Member) -> ResultMap in value.resultMap }])
    }

    public var members: [Member] {
      get {
        return (resultMap["members"] as! [ResultMap]).map { (value: ResultMap) -> Member in Member(unsafeResultMap: value) }
      }
      set {
        resultMap.updateValue(newValue.map { (value: Member) -> ResultMap in value.resultMap }, forKey: "members")
      }
    }

    public struct Member: GraphQLSelectionSet {
      public static let possibleTypes = ["RoomMember"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("user", type: .nonNull(.object(User.selections))),
        GraphQLField("role", type: .nonNull(.scalar(RoomMemberRole.self))),
        GraphQLField("membership", type: .nonNull(.scalar(SharedRoomMembershipStatus.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(user: User, role: RoomMemberRole, membership: SharedRoomMembershipStatus) {
        self.init(unsafeResultMap: ["__typename": "RoomMember", "user": user.resultMap, "role": role, "membership": membership])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var user: User {
        get {
          return User(unsafeResultMap: resultMap["user"]! as! ResultMap)
        }
        set {
          resultMap.updateValue(newValue.resultMap, forKey: "user")
        }
      }

      public var role: RoomMemberRole {
        get {
          return resultMap["role"]! as! RoomMemberRole
        }
        set {
          resultMap.updateValue(newValue, forKey: "role")
        }
      }

      public var membership: SharedRoomMembershipStatus {
        get {
          return resultMap["membership"]! as! SharedRoomMembershipStatus
        }
        set {
          resultMap.updateValue(newValue, forKey: "membership")
        }
      }

      public struct User: GraphQLSelectionSet {
        public static let possibleTypes = ["User"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLFragmentSpread(UserShort.self),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var fragments: Fragments {
          get {
            return Fragments(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }

        public struct Fragments {
          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public var userShort: UserShort {
            get {
              return UserShort(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }
        }
      }
    }
  }
}

public final class RoomSettingsUpdateMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation RoomSettingsUpdate($settings: RoomUserNotificaionSettingsInput!, $roomId: ID!) {\n  betaRoomUpdateUserNotificationSettings(settings: $settings, roomId: $roomId) {\n    __typename\n    id\n    mute\n  }\n}"

  public var settings: RoomUserNotificaionSettingsInput
  public var roomId: GraphQLID

  public init(settings: RoomUserNotificaionSettingsInput, roomId: GraphQLID) {
    self.settings = settings
    self.roomId = roomId
  }

  public var variables: GraphQLMap? {
    return ["settings": settings, "roomId": roomId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("betaRoomUpdateUserNotificationSettings", arguments: ["settings": GraphQLVariable("settings"), "roomId": GraphQLVariable("roomId")], type: .nonNull(.object(BetaRoomUpdateUserNotificationSetting.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(betaRoomUpdateUserNotificationSettings: BetaRoomUpdateUserNotificationSetting) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "betaRoomUpdateUserNotificationSettings": betaRoomUpdateUserNotificationSettings.resultMap])
    }

    /// User settings
    public var betaRoomUpdateUserNotificationSettings: BetaRoomUpdateUserNotificationSetting {
      get {
        return BetaRoomUpdateUserNotificationSetting(unsafeResultMap: resultMap["betaRoomUpdateUserNotificationSettings"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "betaRoomUpdateUserNotificationSettings")
      }
    }

    public struct BetaRoomUpdateUserNotificationSetting: GraphQLSelectionSet {
      public static let possibleTypes = ["RoomUserNotificaionSettings"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("mute", type: .scalar(Bool.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, mute: Bool? = nil) {
        self.init(unsafeResultMap: ["__typename": "RoomUserNotificaionSettings", "id": id, "mute": mute])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var mute: Bool? {
        get {
          return resultMap["mute"] as? Bool
        }
        set {
          resultMap.updateValue(newValue, forKey: "mute")
        }
      }
    }
  }
}

public final class RoomJoinMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation RoomJoin($roomId: ID!) {\n  join: betaRoomJoin(roomId: $roomId) {\n    __typename\n    ...RoomFull\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(RoomFull.fragmentDefinition).appending(UserShort.fragmentDefinition).appending(OrganizationShort.fragmentDefinition).appending(OrganizationMedium.fragmentDefinition).appending(UserFull.fragmentDefinition).appending(FullMessage.fragmentDefinition).appending(UserTiny.fragmentDefinition) }

  public var roomId: GraphQLID

  public init(roomId: GraphQLID) {
    self.roomId = roomId
  }

  public var variables: GraphQLMap? {
    return ["roomId": roomId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("betaRoomJoin", alias: "join", arguments: ["roomId": GraphQLVariable("roomId")], type: .nonNull(.object(Join.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(join: Join) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "join": join.resultMap])
    }

    public var join: Join {
      get {
        return Join(unsafeResultMap: resultMap["join"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "join")
      }
    }

    public struct Join: GraphQLSelectionSet {
      public static let possibleTypes = ["PrivateRoom", "SharedRoom"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(RoomFull.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var roomFull: RoomFull {
          get {
            return RoomFull(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public final class RoomSendEmailInviteMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation RoomSendEmailInvite($roomId: ID!, $inviteRequests: [RoomInviteEmailRequest!]!) {\n  betaRoomInviteLinkSendEmail(roomId: $roomId, inviteRequests: $inviteRequests)\n}"

  public var roomId: GraphQLID
  public var inviteRequests: [RoomInviteEmailRequest]

  public init(roomId: GraphQLID, inviteRequests: [RoomInviteEmailRequest]) {
    self.roomId = roomId
    self.inviteRequests = inviteRequests
  }

  public var variables: GraphQLMap? {
    return ["roomId": roomId, "inviteRequests": inviteRequests]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("betaRoomInviteLinkSendEmail", arguments: ["roomId": GraphQLVariable("roomId"), "inviteRequests": GraphQLVariable("inviteRequests")], type: .nonNull(.scalar(String.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(betaRoomInviteLinkSendEmail: String) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "betaRoomInviteLinkSendEmail": betaRoomInviteLinkSendEmail])
    }

    /// Invite links
    public var betaRoomInviteLinkSendEmail: String {
      get {
        return resultMap["betaRoomInviteLinkSendEmail"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "betaRoomInviteLinkSendEmail")
      }
    }
  }
}

public final class RoomJoinInviteLinkMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation RoomJoinInviteLink($invite: String!) {\n  join: betaRoomInviteLinkJoin(invite: $invite) {\n    __typename\n    ...RoomFull\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(RoomFull.fragmentDefinition).appending(UserShort.fragmentDefinition).appending(OrganizationShort.fragmentDefinition).appending(OrganizationMedium.fragmentDefinition).appending(UserFull.fragmentDefinition).appending(FullMessage.fragmentDefinition).appending(UserTiny.fragmentDefinition) }

  public var invite: String

  public init(invite: String) {
    self.invite = invite
  }

  public var variables: GraphQLMap? {
    return ["invite": invite]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("betaRoomInviteLinkJoin", alias: "join", arguments: ["invite": GraphQLVariable("invite")], type: .nonNull(.object(Join.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(join: Join) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "join": join.resultMap])
    }

    public var join: Join {
      get {
        return Join(unsafeResultMap: resultMap["join"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "join")
      }
    }

    public struct Join: GraphQLSelectionSet {
      public static let possibleTypes = ["PrivateRoom", "SharedRoom"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(RoomFull.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var roomFull: RoomFull {
          get {
            return RoomFull(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public final class RoomRenewInviteLinkMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation RoomRenewInviteLink($roomId: ID!) {\n  link: betaRoomInviteLinkRenew(roomId: $roomId)\n}"

  public var roomId: GraphQLID

  public init(roomId: GraphQLID) {
    self.roomId = roomId
  }

  public var variables: GraphQLMap? {
    return ["roomId": roomId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("betaRoomInviteLinkRenew", alias: "link", arguments: ["roomId": GraphQLVariable("roomId")], type: .nonNull(.scalar(String.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(link: String) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "link": link])
    }

    public var link: String {
      get {
        return resultMap["link"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "link")
      }
    }
  }
}

public final class RoomInviteLinkQuery: GraphQLQuery {
  public let operationDefinition =
    "query RoomInviteLink($roomId: ID!) {\n  link: betaRoomInviteLink(roomId: $roomId)\n}"

  public var roomId: GraphQLID

  public init(roomId: GraphQLID) {
    self.roomId = roomId
  }

  public var variables: GraphQLMap? {
    return ["roomId": roomId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("betaRoomInviteLink", alias: "link", arguments: ["roomId": GraphQLVariable("roomId")], type: .nonNull(.scalar(String.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(link: String) {
      self.init(unsafeResultMap: ["__typename": "Query", "link": link])
    }

    public var link: String {
      get {
        return resultMap["link"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "link")
      }
    }
  }
}

public final class RoomInviteInfoQuery: GraphQLQuery {
  public let operationDefinition =
    "query RoomInviteInfo($invite: String!) {\n  invite: betaRoomInviteInfo(invite: $invite) {\n    __typename\n    id\n    room {\n      __typename\n      ... on SharedRoom {\n        id\n        kind\n        title\n        photo\n        socialImage\n        description\n        organization {\n          __typename\n          ...OrganizationShort\n        }\n        membership\n        membersCount\n        members {\n          __typename\n          role\n          membership\n        }\n      }\n    }\n    invitedByUser {\n      __typename\n      ...UserShort\n    }\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(OrganizationShort.fragmentDefinition).appending(UserShort.fragmentDefinition) }

  public var invite: String

  public init(invite: String) {
    self.invite = invite
  }

  public var variables: GraphQLMap? {
    return ["invite": invite]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("betaRoomInviteInfo", alias: "invite", arguments: ["invite": GraphQLVariable("invite")], type: .object(Invite.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(invite: Invite? = nil) {
      self.init(unsafeResultMap: ["__typename": "Query", "invite": invite.flatMap { (value: Invite) -> ResultMap in value.resultMap }])
    }

    public var invite: Invite? {
      get {
        return (resultMap["invite"] as? ResultMap).flatMap { Invite(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "invite")
      }
    }

    public struct Invite: GraphQLSelectionSet {
      public static let possibleTypes = ["RoomInvite"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("room", type: .nonNull(.object(Room.selections))),
        GraphQLField("invitedByUser", type: .nonNull(.object(InvitedByUser.selections))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, room: Room, invitedByUser: InvitedByUser) {
        self.init(unsafeResultMap: ["__typename": "RoomInvite", "id": id, "room": room.resultMap, "invitedByUser": invitedByUser.resultMap])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var room: Room {
        get {
          return Room(unsafeResultMap: resultMap["room"]! as! ResultMap)
        }
        set {
          resultMap.updateValue(newValue.resultMap, forKey: "room")
        }
      }

      public var invitedByUser: InvitedByUser {
        get {
          return InvitedByUser(unsafeResultMap: resultMap["invitedByUser"]! as! ResultMap)
        }
        set {
          resultMap.updateValue(newValue.resultMap, forKey: "invitedByUser")
        }
      }

      public struct Room: GraphQLSelectionSet {
        public static let possibleTypes = ["SharedRoom"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
          GraphQLField("kind", type: .nonNull(.scalar(SharedRoomKind.self))),
          GraphQLField("title", type: .nonNull(.scalar(String.self))),
          GraphQLField("photo", type: .nonNull(.scalar(String.self))),
          GraphQLField("socialImage", type: .scalar(String.self)),
          GraphQLField("description", type: .scalar(String.self)),
          GraphQLField("organization", type: .object(Organization.selections)),
          GraphQLField("membership", type: .nonNull(.scalar(SharedRoomMembershipStatus.self))),
          GraphQLField("membersCount", type: .scalar(Int.self)),
          GraphQLField("members", type: .nonNull(.list(.nonNull(.object(Member.selections))))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(id: GraphQLID, kind: SharedRoomKind, title: String, photo: String, socialImage: String? = nil, description: String? = nil, organization: Organization? = nil, membership: SharedRoomMembershipStatus, membersCount: Int? = nil, members: [Member]) {
          self.init(unsafeResultMap: ["__typename": "SharedRoom", "id": id, "kind": kind, "title": title, "photo": photo, "socialImage": socialImage, "description": description, "organization": organization.flatMap { (value: Organization) -> ResultMap in value.resultMap }, "membership": membership, "membersCount": membersCount, "members": members.map { (value: Member) -> ResultMap in value.resultMap }])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var id: GraphQLID {
          get {
            return resultMap["id"]! as! GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "id")
          }
        }

        public var kind: SharedRoomKind {
          get {
            return resultMap["kind"]! as! SharedRoomKind
          }
          set {
            resultMap.updateValue(newValue, forKey: "kind")
          }
        }

        public var title: String {
          get {
            return resultMap["title"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "title")
          }
        }

        public var photo: String {
          get {
            return resultMap["photo"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "photo")
          }
        }

        public var socialImage: String? {
          get {
            return resultMap["socialImage"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "socialImage")
          }
        }

        public var description: String? {
          get {
            return resultMap["description"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "description")
          }
        }

        public var organization: Organization? {
          get {
            return (resultMap["organization"] as? ResultMap).flatMap { Organization(unsafeResultMap: $0) }
          }
          set {
            resultMap.updateValue(newValue?.resultMap, forKey: "organization")
          }
        }

        public var membership: SharedRoomMembershipStatus {
          get {
            return resultMap["membership"]! as! SharedRoomMembershipStatus
          }
          set {
            resultMap.updateValue(newValue, forKey: "membership")
          }
        }

        public var membersCount: Int? {
          get {
            return resultMap["membersCount"] as? Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "membersCount")
          }
        }

        public var members: [Member] {
          get {
            return (resultMap["members"] as! [ResultMap]).map { (value: ResultMap) -> Member in Member(unsafeResultMap: value) }
          }
          set {
            resultMap.updateValue(newValue.map { (value: Member) -> ResultMap in value.resultMap }, forKey: "members")
          }
        }

        public struct Organization: GraphQLSelectionSet {
          public static let possibleTypes = ["Organization"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLFragmentSpread(OrganizationShort.self),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public init(id: GraphQLID, name: String, photo: String? = nil, isCommunity: Bool) {
            self.init(unsafeResultMap: ["__typename": "Organization", "id": id, "name": name, "photo": photo, "isCommunity": isCommunity])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var fragments: Fragments {
            get {
              return Fragments(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }

          public struct Fragments {
            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public var organizationShort: OrganizationShort {
              get {
                return OrganizationShort(unsafeResultMap: resultMap)
              }
              set {
                resultMap += newValue.resultMap
              }
            }
          }
        }

        public struct Member: GraphQLSelectionSet {
          public static let possibleTypes = ["RoomMember"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("role", type: .nonNull(.scalar(RoomMemberRole.self))),
            GraphQLField("membership", type: .nonNull(.scalar(SharedRoomMembershipStatus.self))),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public init(role: RoomMemberRole, membership: SharedRoomMembershipStatus) {
            self.init(unsafeResultMap: ["__typename": "RoomMember", "role": role, "membership": membership])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var role: RoomMemberRole {
            get {
              return resultMap["role"]! as! RoomMemberRole
            }
            set {
              resultMap.updateValue(newValue, forKey: "role")
            }
          }

          public var membership: SharedRoomMembershipStatus {
            get {
              return resultMap["membership"]! as! SharedRoomMembershipStatus
            }
            set {
              resultMap.updateValue(newValue, forKey: "membership")
            }
          }
        }
      }

      public struct InvitedByUser: GraphQLSelectionSet {
        public static let possibleTypes = ["User"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLFragmentSpread(UserShort.self),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var fragments: Fragments {
          get {
            return Fragments(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }

        public struct Fragments {
          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public var userShort: UserShort {
            get {
              return UserShort(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }
        }
      }
    }
  }
}

public final class RoomUpdateMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation RoomUpdate($roomId: ID!, $input: RoomUpdateInput!) {\n  betaRoomUpdate(roomId: $roomId, input: $input) {\n    __typename\n    ... on PrivateRoom {\n      id\n    }\n    ... on SharedRoom {\n      id\n      title\n      photo\n      description\n    }\n  }\n}"

  public var roomId: GraphQLID
  public var input: RoomUpdateInput

  public init(roomId: GraphQLID, input: RoomUpdateInput) {
    self.roomId = roomId
    self.input = input
  }

  public var variables: GraphQLMap? {
    return ["roomId": roomId, "input": input]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("betaRoomUpdate", arguments: ["roomId": GraphQLVariable("roomId"), "input": GraphQLVariable("input")], type: .nonNull(.object(BetaRoomUpdate.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(betaRoomUpdate: BetaRoomUpdate) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "betaRoomUpdate": betaRoomUpdate.resultMap])
    }

    public var betaRoomUpdate: BetaRoomUpdate {
      get {
        return BetaRoomUpdate(unsafeResultMap: resultMap["betaRoomUpdate"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "betaRoomUpdate")
      }
    }

    public struct BetaRoomUpdate: GraphQLSelectionSet {
      public static let possibleTypes = ["PrivateRoom", "SharedRoom"]

      public static let selections: [GraphQLSelection] = [
        GraphQLTypeCase(
          variants: ["PrivateRoom": AsPrivateRoom.selections, "SharedRoom": AsSharedRoom.selections],
          default: [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          ]
        )
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public static func makePrivateRoom(id: GraphQLID) -> BetaRoomUpdate {
        return BetaRoomUpdate(unsafeResultMap: ["__typename": "PrivateRoom", "id": id])
      }

      public static func makeSharedRoom(id: GraphQLID, title: String, photo: String, description: String? = nil) -> BetaRoomUpdate {
        return BetaRoomUpdate(unsafeResultMap: ["__typename": "SharedRoom", "id": id, "title": title, "photo": photo, "description": description])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var asPrivateRoom: AsPrivateRoom? {
        get {
          if !AsPrivateRoom.possibleTypes.contains(__typename) { return nil }
          return AsPrivateRoom(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsPrivateRoom: GraphQLSelectionSet {
        public static let possibleTypes = ["PrivateRoom"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(id: GraphQLID) {
          self.init(unsafeResultMap: ["__typename": "PrivateRoom", "id": id])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var id: GraphQLID {
          get {
            return resultMap["id"]! as! GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "id")
          }
        }
      }

      public var asSharedRoom: AsSharedRoom? {
        get {
          if !AsSharedRoom.possibleTypes.contains(__typename) { return nil }
          return AsSharedRoom(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsSharedRoom: GraphQLSelectionSet {
        public static let possibleTypes = ["SharedRoom"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
          GraphQLField("title", type: .nonNull(.scalar(String.self))),
          GraphQLField("photo", type: .nonNull(.scalar(String.self))),
          GraphQLField("description", type: .scalar(String.self)),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(id: GraphQLID, title: String, photo: String, description: String? = nil) {
          self.init(unsafeResultMap: ["__typename": "SharedRoom", "id": id, "title": title, "photo": photo, "description": description])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var id: GraphQLID {
          get {
            return resultMap["id"]! as! GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "id")
          }
        }

        public var title: String {
          get {
            return resultMap["title"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "title")
          }
        }

        public var photo: String {
          get {
            return resultMap["photo"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "photo")
          }
        }

        public var description: String? {
          get {
            return resultMap["description"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "description")
          }
        }
      }
    }
  }
}

public final class RoomDeleteMessageMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation RoomDeleteMessage($messageId: ID!) {\n  betaMessageDelete(mid: $messageId)\n}"

  public var messageId: GraphQLID

  public init(messageId: GraphQLID) {
    self.messageId = messageId
  }

  public var variables: GraphQLMap? {
    return ["messageId": messageId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("betaMessageDelete", arguments: ["mid": GraphQLVariable("messageId")], type: .nonNull(.scalar(Bool.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(betaMessageDelete: Bool) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "betaMessageDelete": betaMessageDelete])
    }

    public var betaMessageDelete: Bool {
      get {
        return resultMap["betaMessageDelete"]! as! Bool
      }
      set {
        resultMap.updateValue(newValue, forKey: "betaMessageDelete")
      }
    }
  }
}

public final class RoomDeleteMessagesMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation RoomDeleteMessages($mids: [ID!]!) {\n  betaMessageDelete(mids: $mids)\n}"

  public var mids: [GraphQLID]

  public init(mids: [GraphQLID]) {
    self.mids = mids
  }

  public var variables: GraphQLMap? {
    return ["mids": mids]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("betaMessageDelete", arguments: ["mids": GraphQLVariable("mids")], type: .nonNull(.scalar(Bool.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(betaMessageDelete: Bool) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "betaMessageDelete": betaMessageDelete])
    }

    public var betaMessageDelete: Bool {
      get {
        return resultMap["betaMessageDelete"]! as! Bool
      }
      set {
        resultMap.updateValue(newValue, forKey: "betaMessageDelete")
      }
    }
  }
}

public final class RoomDeleteUrlAugmentationMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation RoomDeleteUrlAugmentation($messageId: ID!) {\n  betaMessageDeleteAugmentation(mid: $messageId)\n}"

  public var messageId: GraphQLID

  public init(messageId: GraphQLID) {
    self.messageId = messageId
  }

  public var variables: GraphQLMap? {
    return ["messageId": messageId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("betaMessageDeleteAugmentation", arguments: ["mid": GraphQLVariable("messageId")], type: .nonNull(.scalar(Bool.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(betaMessageDeleteAugmentation: Bool) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "betaMessageDeleteAugmentation": betaMessageDeleteAugmentation])
    }

    public var betaMessageDeleteAugmentation: Bool {
      get {
        return resultMap["betaMessageDeleteAugmentation"]! as! Bool
      }
      set {
        resultMap.updateValue(newValue, forKey: "betaMessageDeleteAugmentation")
      }
    }
  }
}

public final class RoomEditMessageMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation RoomEditMessage($messageId: ID!, $message: String, $file: String, $replyMessages: [ID!], $mentions: [ID!]) {\n  betaMessageEdit(mid: $messageId, message: $message, file: $file, replyMessages: $replyMessages, mentions: $mentions)\n}"

  public var messageId: GraphQLID
  public var message: String?
  public var file: String?
  public var replyMessages: [GraphQLID]?
  public var mentions: [GraphQLID]?

  public init(messageId: GraphQLID, message: String? = nil, file: String? = nil, replyMessages: [GraphQLID]?, mentions: [GraphQLID]?) {
    self.messageId = messageId
    self.message = message
    self.file = file
    self.replyMessages = replyMessages
    self.mentions = mentions
  }

  public var variables: GraphQLMap? {
    return ["messageId": messageId, "message": message, "file": file, "replyMessages": replyMessages, "mentions": mentions]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("betaMessageEdit", arguments: ["mid": GraphQLVariable("messageId"), "message": GraphQLVariable("message"), "file": GraphQLVariable("file"), "replyMessages": GraphQLVariable("replyMessages"), "mentions": GraphQLVariable("mentions")], type: .nonNull(.scalar(Bool.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(betaMessageEdit: Bool) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "betaMessageEdit": betaMessageEdit])
    }

    public var betaMessageEdit: Bool {
      get {
        return resultMap["betaMessageEdit"]! as! Bool
      }
      set {
        resultMap.updateValue(newValue, forKey: "betaMessageEdit")
      }
    }
  }
}

public final class MarkSequenceReadMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation MarkSequenceRead($seq: Int!) {\n  alphaGlobalRead(toSeq: $seq)\n}"

  public var seq: Int

  public init(seq: Int) {
    self.seq = seq
  }

  public var variables: GraphQLMap? {
    return ["seq": seq]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("alphaGlobalRead", arguments: ["toSeq": GraphQLVariable("seq")], type: .nonNull(.scalar(String.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(alphaGlobalRead: String) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "alphaGlobalRead": alphaGlobalRead])
    }

    public var alphaGlobalRead: String {
      get {
        return resultMap["alphaGlobalRead"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "alphaGlobalRead")
      }
    }
  }
}

public final class TypingsWatchSubscription: GraphQLSubscription {
  public let operationDefinition =
    "subscription TypingsWatch {\n  typings {\n    __typename\n    conversation {\n      __typename\n      id\n    }\n    user {\n      __typename\n      id\n      name\n      photo\n    }\n    cancel\n  }\n}"

  public init() {
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Subscription"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("typings", type: .nonNull(.object(Typing.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(typings: Typing) {
      self.init(unsafeResultMap: ["__typename": "Subscription", "typings": typings.resultMap])
    }

    public var typings: Typing {
      get {
        return Typing(unsafeResultMap: resultMap["typings"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "typings")
      }
    }

    public struct Typing: GraphQLSelectionSet {
      public static let possibleTypes = ["TypingEvent"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("conversation", type: .nonNull(.object(Conversation.selections))),
        GraphQLField("user", type: .nonNull(.object(User.selections))),
        GraphQLField("cancel", type: .nonNull(.scalar(Bool.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(conversation: Conversation, user: User, cancel: Bool) {
        self.init(unsafeResultMap: ["__typename": "TypingEvent", "conversation": conversation.resultMap, "user": user.resultMap, "cancel": cancel])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var conversation: Conversation {
        get {
          return Conversation(unsafeResultMap: resultMap["conversation"]! as! ResultMap)
        }
        set {
          resultMap.updateValue(newValue.resultMap, forKey: "conversation")
        }
      }

      public var user: User {
        get {
          return User(unsafeResultMap: resultMap["user"]! as! ResultMap)
        }
        set {
          resultMap.updateValue(newValue.resultMap, forKey: "user")
        }
      }

      public var cancel: Bool {
        get {
          return resultMap["cancel"]! as! Bool
        }
        set {
          resultMap.updateValue(newValue, forKey: "cancel")
        }
      }

      public struct Conversation: GraphQLSelectionSet {
        public static let possibleTypes = ["ChannelConversation", "AnonymousConversation", "GroupConversation", "PrivateConversation", "SharedConversation"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public static func makeChannelConversation(id: GraphQLID) -> Conversation {
          return Conversation(unsafeResultMap: ["__typename": "ChannelConversation", "id": id])
        }

        public static func makeAnonymousConversation(id: GraphQLID) -> Conversation {
          return Conversation(unsafeResultMap: ["__typename": "AnonymousConversation", "id": id])
        }

        public static func makeGroupConversation(id: GraphQLID) -> Conversation {
          return Conversation(unsafeResultMap: ["__typename": "GroupConversation", "id": id])
        }

        public static func makePrivateConversation(id: GraphQLID) -> Conversation {
          return Conversation(unsafeResultMap: ["__typename": "PrivateConversation", "id": id])
        }

        public static func makeSharedConversation(id: GraphQLID) -> Conversation {
          return Conversation(unsafeResultMap: ["__typename": "SharedConversation", "id": id])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var id: GraphQLID {
          get {
            return resultMap["id"]! as! GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "id")
          }
        }
      }

      public struct User: GraphQLSelectionSet {
        public static let possibleTypes = ["User"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
          GraphQLField("name", type: .nonNull(.scalar(String.self))),
          GraphQLField("photo", type: .scalar(String.self)),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(id: GraphQLID, name: String, photo: String? = nil) {
          self.init(unsafeResultMap: ["__typename": "User", "id": id, "name": name, "photo": photo])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var id: GraphQLID {
          get {
            return resultMap["id"]! as! GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "id")
          }
        }

        public var name: String {
          get {
            return resultMap["name"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "name")
          }
        }

        public var photo: String? {
          get {
            return resultMap["photo"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "photo")
          }
        }
      }
    }
  }
}

public final class UpdateWelcomeMessageMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation UpdateWelcomeMessage($roomId: ID!, $welcomeMessageIsOn: Boolean!, $welcomeMessageSender: ID, $welcomeMessageText: String) {\n  updateWelcomeMessage(roomId: $roomId, welcomeMessageIsOn: $welcomeMessageIsOn, welcomeMessageSender: $welcomeMessageSender, welcomeMessageText: $welcomeMessageText)\n}"

  public var roomId: GraphQLID
  public var welcomeMessageIsOn: Bool
  public var welcomeMessageSender: GraphQLID?
  public var welcomeMessageText: String?

  public init(roomId: GraphQLID, welcomeMessageIsOn: Bool, welcomeMessageSender: GraphQLID? = nil, welcomeMessageText: String? = nil) {
    self.roomId = roomId
    self.welcomeMessageIsOn = welcomeMessageIsOn
    self.welcomeMessageSender = welcomeMessageSender
    self.welcomeMessageText = welcomeMessageText
  }

  public var variables: GraphQLMap? {
    return ["roomId": roomId, "welcomeMessageIsOn": welcomeMessageIsOn, "welcomeMessageSender": welcomeMessageSender, "welcomeMessageText": welcomeMessageText]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("updateWelcomeMessage", arguments: ["roomId": GraphQLVariable("roomId"), "welcomeMessageIsOn": GraphQLVariable("welcomeMessageIsOn"), "welcomeMessageSender": GraphQLVariable("welcomeMessageSender"), "welcomeMessageText": GraphQLVariable("welcomeMessageText")], type: .nonNull(.scalar(Bool.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(updateWelcomeMessage: Bool) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "updateWelcomeMessage": updateWelcomeMessage])
    }

    public var updateWelcomeMessage: Bool {
      get {
        return resultMap["updateWelcomeMessage"]! as! Bool
      }
      set {
        resultMap.updateValue(newValue, forKey: "updateWelcomeMessage")
      }
    }
  }
}

public final class ConferenceQuery: GraphQLQuery {
  public let operationDefinition =
    "query Conference($id: ID!) {\n  conference(id: $id) {\n    __typename\n    ...ConferenceFull\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(ConferenceFull.fragmentDefinition).appending(UserShort.fragmentDefinition).appending(OrganizationShort.fragmentDefinition) }

  public var id: GraphQLID

  public init(id: GraphQLID) {
    self.id = id
  }

  public var variables: GraphQLMap? {
    return ["id": id]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("conference", arguments: ["id": GraphQLVariable("id")], type: .nonNull(.object(Conference.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(conference: Conference) {
      self.init(unsafeResultMap: ["__typename": "Query", "conference": conference.resultMap])
    }

    public var conference: Conference {
      get {
        return Conference(unsafeResultMap: resultMap["conference"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "conference")
      }
    }

    public struct Conference: GraphQLSelectionSet {
      public static let possibleTypes = ["Conference"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(ConferenceFull.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var conferenceFull: ConferenceFull {
          get {
            return ConferenceFull(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public final class ConferenceMediaQuery: GraphQLQuery {
  public let operationDefinition =
    "query ConferenceMedia($id: ID!, $peerId: ID!) {\n  conferenceMedia(id: $id, peerId: $peerId) {\n    __typename\n    id\n    streams {\n      __typename\n      id\n      state\n      sdp\n      ice\n    }\n    iceServers {\n      __typename\n      urls\n      username\n      credential\n    }\n  }\n}"

  public var id: GraphQLID
  public var peerId: GraphQLID

  public init(id: GraphQLID, peerId: GraphQLID) {
    self.id = id
    self.peerId = peerId
  }

  public var variables: GraphQLMap? {
    return ["id": id, "peerId": peerId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("conferenceMedia", arguments: ["id": GraphQLVariable("id"), "peerId": GraphQLVariable("peerId")], type: .nonNull(.object(ConferenceMedium.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(conferenceMedia: ConferenceMedium) {
      self.init(unsafeResultMap: ["__typename": "Query", "conferenceMedia": conferenceMedia.resultMap])
    }

    public var conferenceMedia: ConferenceMedium {
      get {
        return ConferenceMedium(unsafeResultMap: resultMap["conferenceMedia"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "conferenceMedia")
      }
    }

    public struct ConferenceMedium: GraphQLSelectionSet {
      public static let possibleTypes = ["ConferenceMedia"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("streams", type: .nonNull(.list(.nonNull(.object(Stream.selections))))),
        GraphQLField("iceServers", type: .nonNull(.list(.nonNull(.object(IceServer.selections))))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, streams: [Stream], iceServers: [IceServer]) {
        self.init(unsafeResultMap: ["__typename": "ConferenceMedia", "id": id, "streams": streams.map { (value: Stream) -> ResultMap in value.resultMap }, "iceServers": iceServers.map { (value: IceServer) -> ResultMap in value.resultMap }])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var streams: [Stream] {
        get {
          return (resultMap["streams"] as! [ResultMap]).map { (value: ResultMap) -> Stream in Stream(unsafeResultMap: value) }
        }
        set {
          resultMap.updateValue(newValue.map { (value: Stream) -> ResultMap in value.resultMap }, forKey: "streams")
        }
      }

      public var iceServers: [IceServer] {
        get {
          return (resultMap["iceServers"] as! [ResultMap]).map { (value: ResultMap) -> IceServer in IceServer(unsafeResultMap: value) }
        }
        set {
          resultMap.updateValue(newValue.map { (value: IceServer) -> ResultMap in value.resultMap }, forKey: "iceServers")
        }
      }

      public struct Stream: GraphQLSelectionSet {
        public static let possibleTypes = ["MediaStream"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
          GraphQLField("state", type: .nonNull(.scalar(MediaStreamState.self))),
          GraphQLField("sdp", type: .scalar(String.self)),
          GraphQLField("ice", type: .nonNull(.list(.nonNull(.scalar(String.self))))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(id: GraphQLID, state: MediaStreamState, sdp: String? = nil, ice: [String]) {
          self.init(unsafeResultMap: ["__typename": "MediaStream", "id": id, "state": state, "sdp": sdp, "ice": ice])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var id: GraphQLID {
          get {
            return resultMap["id"]! as! GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "id")
          }
        }

        public var state: MediaStreamState {
          get {
            return resultMap["state"]! as! MediaStreamState
          }
          set {
            resultMap.updateValue(newValue, forKey: "state")
          }
        }

        public var sdp: String? {
          get {
            return resultMap["sdp"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "sdp")
          }
        }

        public var ice: [String] {
          get {
            return resultMap["ice"]! as! [String]
          }
          set {
            resultMap.updateValue(newValue, forKey: "ice")
          }
        }
      }

      public struct IceServer: GraphQLSelectionSet {
        public static let possibleTypes = ["ICEServer"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("urls", type: .nonNull(.list(.nonNull(.scalar(String.self))))),
          GraphQLField("username", type: .scalar(String.self)),
          GraphQLField("credential", type: .scalar(String.self)),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(urls: [String], username: String? = nil, credential: String? = nil) {
          self.init(unsafeResultMap: ["__typename": "ICEServer", "urls": urls, "username": username, "credential": credential])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var urls: [String] {
          get {
            return resultMap["urls"]! as! [String]
          }
          set {
            resultMap.updateValue(newValue, forKey: "urls")
          }
        }

        public var username: String? {
          get {
            return resultMap["username"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "username")
          }
        }

        public var credential: String? {
          get {
            return resultMap["credential"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "credential")
          }
        }
      }
    }
  }
}

public final class ConferenceJoinMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation ConferenceJoin($id: ID!) {\n  conferenceJoin(id: $id) {\n    __typename\n    peerId\n    conference {\n      __typename\n      ...ConferenceFull\n    }\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(ConferenceFull.fragmentDefinition).appending(UserShort.fragmentDefinition).appending(OrganizationShort.fragmentDefinition) }

  public var id: GraphQLID

  public init(id: GraphQLID) {
    self.id = id
  }

  public var variables: GraphQLMap? {
    return ["id": id]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("conferenceJoin", arguments: ["id": GraphQLVariable("id")], type: .nonNull(.object(ConferenceJoin.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(conferenceJoin: ConferenceJoin) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "conferenceJoin": conferenceJoin.resultMap])
    }

    public var conferenceJoin: ConferenceJoin {
      get {
        return ConferenceJoin(unsafeResultMap: resultMap["conferenceJoin"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "conferenceJoin")
      }
    }

    public struct ConferenceJoin: GraphQLSelectionSet {
      public static let possibleTypes = ["ConferenceJoinResult"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("peerId", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("conference", type: .nonNull(.object(Conference.selections))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(peerId: GraphQLID, conference: Conference) {
        self.init(unsafeResultMap: ["__typename": "ConferenceJoinResult", "peerId": peerId, "conference": conference.resultMap])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var peerId: GraphQLID {
        get {
          return resultMap["peerId"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "peerId")
        }
      }

      public var conference: Conference {
        get {
          return Conference(unsafeResultMap: resultMap["conference"]! as! ResultMap)
        }
        set {
          resultMap.updateValue(newValue.resultMap, forKey: "conference")
        }
      }

      public struct Conference: GraphQLSelectionSet {
        public static let possibleTypes = ["Conference"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLFragmentSpread(ConferenceFull.self),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var fragments: Fragments {
          get {
            return Fragments(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }

        public struct Fragments {
          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public var conferenceFull: ConferenceFull {
            get {
              return ConferenceFull(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }
        }
      }
    }
  }
}

public final class ConferenceLeaveMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation ConferenceLeave($id: ID!, $peerId: ID!) {\n  conferenceLeave(id: $id, peerId: $peerId) {\n    __typename\n    ...ConferenceFull\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(ConferenceFull.fragmentDefinition).appending(UserShort.fragmentDefinition).appending(OrganizationShort.fragmentDefinition) }

  public var id: GraphQLID
  public var peerId: GraphQLID

  public init(id: GraphQLID, peerId: GraphQLID) {
    self.id = id
    self.peerId = peerId
  }

  public var variables: GraphQLMap? {
    return ["id": id, "peerId": peerId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("conferenceLeave", arguments: ["id": GraphQLVariable("id"), "peerId": GraphQLVariable("peerId")], type: .nonNull(.object(ConferenceLeave.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(conferenceLeave: ConferenceLeave) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "conferenceLeave": conferenceLeave.resultMap])
    }

    public var conferenceLeave: ConferenceLeave {
      get {
        return ConferenceLeave(unsafeResultMap: resultMap["conferenceLeave"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "conferenceLeave")
      }
    }

    public struct ConferenceLeave: GraphQLSelectionSet {
      public static let possibleTypes = ["Conference"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(ConferenceFull.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var conferenceFull: ConferenceFull {
          get {
            return ConferenceFull(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public final class ConferenceKeepAliveMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation ConferenceKeepAlive($id: ID!, $peerId: ID!) {\n  conferenceKeepAlive(id: $id, peerId: $peerId) {\n    __typename\n    ...ConferenceFull\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(ConferenceFull.fragmentDefinition).appending(UserShort.fragmentDefinition).appending(OrganizationShort.fragmentDefinition) }

  public var id: GraphQLID
  public var peerId: GraphQLID

  public init(id: GraphQLID, peerId: GraphQLID) {
    self.id = id
    self.peerId = peerId
  }

  public var variables: GraphQLMap? {
    return ["id": id, "peerId": peerId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("conferenceKeepAlive", arguments: ["id": GraphQLVariable("id"), "peerId": GraphQLVariable("peerId")], type: .nonNull(.object(ConferenceKeepAlive.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(conferenceKeepAlive: ConferenceKeepAlive) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "conferenceKeepAlive": conferenceKeepAlive.resultMap])
    }

    public var conferenceKeepAlive: ConferenceKeepAlive {
      get {
        return ConferenceKeepAlive(unsafeResultMap: resultMap["conferenceKeepAlive"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "conferenceKeepAlive")
      }
    }

    public struct ConferenceKeepAlive: GraphQLSelectionSet {
      public static let possibleTypes = ["Conference"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(ConferenceFull.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var conferenceFull: ConferenceFull {
          get {
            return ConferenceFull(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public final class ConferenceOfferMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation ConferenceOffer($id: ID!, $ownPeerId: ID!, $peerId: ID!, $offer: String!) {\n  peerConnectionOffer(id: $id, peerId: $peerId, ownPeerId: $ownPeerId, offer: $offer) {\n    __typename\n    ...ConferenceFull\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(ConferenceFull.fragmentDefinition).appending(UserShort.fragmentDefinition).appending(OrganizationShort.fragmentDefinition) }

  public var id: GraphQLID
  public var ownPeerId: GraphQLID
  public var peerId: GraphQLID
  public var offer: String

  public init(id: GraphQLID, ownPeerId: GraphQLID, peerId: GraphQLID, offer: String) {
    self.id = id
    self.ownPeerId = ownPeerId
    self.peerId = peerId
    self.offer = offer
  }

  public var variables: GraphQLMap? {
    return ["id": id, "ownPeerId": ownPeerId, "peerId": peerId, "offer": offer]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("peerConnectionOffer", arguments: ["id": GraphQLVariable("id"), "peerId": GraphQLVariable("peerId"), "ownPeerId": GraphQLVariable("ownPeerId"), "offer": GraphQLVariable("offer")], type: .nonNull(.object(PeerConnectionOffer.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(peerConnectionOffer: PeerConnectionOffer) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "peerConnectionOffer": peerConnectionOffer.resultMap])
    }

    public var peerConnectionOffer: PeerConnectionOffer {
      get {
        return PeerConnectionOffer(unsafeResultMap: resultMap["peerConnectionOffer"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "peerConnectionOffer")
      }
    }

    public struct PeerConnectionOffer: GraphQLSelectionSet {
      public static let possibleTypes = ["Conference"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(ConferenceFull.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var conferenceFull: ConferenceFull {
          get {
            return ConferenceFull(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public final class ConferenceAnswerMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation ConferenceAnswer($id: ID!, $ownPeerId: ID!, $peerId: ID!, $answer: String!) {\n  peerConnectionAnswer(id: $id, peerId: $peerId, ownPeerId: $ownPeerId, answer: $answer) {\n    __typename\n    ...ConferenceFull\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(ConferenceFull.fragmentDefinition).appending(UserShort.fragmentDefinition).appending(OrganizationShort.fragmentDefinition) }

  public var id: GraphQLID
  public var ownPeerId: GraphQLID
  public var peerId: GraphQLID
  public var answer: String

  public init(id: GraphQLID, ownPeerId: GraphQLID, peerId: GraphQLID, answer: String) {
    self.id = id
    self.ownPeerId = ownPeerId
    self.peerId = peerId
    self.answer = answer
  }

  public var variables: GraphQLMap? {
    return ["id": id, "ownPeerId": ownPeerId, "peerId": peerId, "answer": answer]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("peerConnectionAnswer", arguments: ["id": GraphQLVariable("id"), "peerId": GraphQLVariable("peerId"), "ownPeerId": GraphQLVariable("ownPeerId"), "answer": GraphQLVariable("answer")], type: .nonNull(.object(PeerConnectionAnswer.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(peerConnectionAnswer: PeerConnectionAnswer) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "peerConnectionAnswer": peerConnectionAnswer.resultMap])
    }

    public var peerConnectionAnswer: PeerConnectionAnswer {
      get {
        return PeerConnectionAnswer(unsafeResultMap: resultMap["peerConnectionAnswer"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "peerConnectionAnswer")
      }
    }

    public struct PeerConnectionAnswer: GraphQLSelectionSet {
      public static let possibleTypes = ["Conference"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(ConferenceFull.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var conferenceFull: ConferenceFull {
          get {
            return ConferenceFull(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public final class ConferenceCandidateMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation ConferenceCandidate($id: ID!, $ownPeerId: ID!, $peerId: ID!, $candidate: String!) {\n  peerConnectionCandidate(id: $id, peerId: $peerId, ownPeerId: $ownPeerId, candidate: $candidate) {\n    __typename\n    ...ConferenceFull\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(ConferenceFull.fragmentDefinition).appending(UserShort.fragmentDefinition).appending(OrganizationShort.fragmentDefinition) }

  public var id: GraphQLID
  public var ownPeerId: GraphQLID
  public var peerId: GraphQLID
  public var candidate: String

  public init(id: GraphQLID, ownPeerId: GraphQLID, peerId: GraphQLID, candidate: String) {
    self.id = id
    self.ownPeerId = ownPeerId
    self.peerId = peerId
    self.candidate = candidate
  }

  public var variables: GraphQLMap? {
    return ["id": id, "ownPeerId": ownPeerId, "peerId": peerId, "candidate": candidate]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("peerConnectionCandidate", arguments: ["id": GraphQLVariable("id"), "peerId": GraphQLVariable("peerId"), "ownPeerId": GraphQLVariable("ownPeerId"), "candidate": GraphQLVariable("candidate")], type: .nonNull(.object(PeerConnectionCandidate.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(peerConnectionCandidate: PeerConnectionCandidate) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "peerConnectionCandidate": peerConnectionCandidate.resultMap])
    }

    public var peerConnectionCandidate: PeerConnectionCandidate {
      get {
        return PeerConnectionCandidate(unsafeResultMap: resultMap["peerConnectionCandidate"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "peerConnectionCandidate")
      }
    }

    public struct PeerConnectionCandidate: GraphQLSelectionSet {
      public static let possibleTypes = ["Conference"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(ConferenceFull.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var conferenceFull: ConferenceFull {
          get {
            return ConferenceFull(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public final class MediaOfferMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation MediaOffer($id: ID!, $peerId: ID!, $offer: String!) {\n  mediaStreamOffer(id: $id, peerId: $peerId, offer: $offer) {\n    __typename\n    id\n    streams {\n      __typename\n      id\n      state\n      sdp\n      ice\n    }\n  }\n}"

  public var id: GraphQLID
  public var peerId: GraphQLID
  public var offer: String

  public init(id: GraphQLID, peerId: GraphQLID, offer: String) {
    self.id = id
    self.peerId = peerId
    self.offer = offer
  }

  public var variables: GraphQLMap? {
    return ["id": id, "peerId": peerId, "offer": offer]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("mediaStreamOffer", arguments: ["id": GraphQLVariable("id"), "peerId": GraphQLVariable("peerId"), "offer": GraphQLVariable("offer")], type: .nonNull(.object(MediaStreamOffer.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(mediaStreamOffer: MediaStreamOffer) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "mediaStreamOffer": mediaStreamOffer.resultMap])
    }

    public var mediaStreamOffer: MediaStreamOffer {
      get {
        return MediaStreamOffer(unsafeResultMap: resultMap["mediaStreamOffer"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "mediaStreamOffer")
      }
    }

    public struct MediaStreamOffer: GraphQLSelectionSet {
      public static let possibleTypes = ["ConferenceMedia"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("streams", type: .nonNull(.list(.nonNull(.object(Stream.selections))))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, streams: [Stream]) {
        self.init(unsafeResultMap: ["__typename": "ConferenceMedia", "id": id, "streams": streams.map { (value: Stream) -> ResultMap in value.resultMap }])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var streams: [Stream] {
        get {
          return (resultMap["streams"] as! [ResultMap]).map { (value: ResultMap) -> Stream in Stream(unsafeResultMap: value) }
        }
        set {
          resultMap.updateValue(newValue.map { (value: Stream) -> ResultMap in value.resultMap }, forKey: "streams")
        }
      }

      public struct Stream: GraphQLSelectionSet {
        public static let possibleTypes = ["MediaStream"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
          GraphQLField("state", type: .nonNull(.scalar(MediaStreamState.self))),
          GraphQLField("sdp", type: .scalar(String.self)),
          GraphQLField("ice", type: .nonNull(.list(.nonNull(.scalar(String.self))))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(id: GraphQLID, state: MediaStreamState, sdp: String? = nil, ice: [String]) {
          self.init(unsafeResultMap: ["__typename": "MediaStream", "id": id, "state": state, "sdp": sdp, "ice": ice])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var id: GraphQLID {
          get {
            return resultMap["id"]! as! GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "id")
          }
        }

        public var state: MediaStreamState {
          get {
            return resultMap["state"]! as! MediaStreamState
          }
          set {
            resultMap.updateValue(newValue, forKey: "state")
          }
        }

        public var sdp: String? {
          get {
            return resultMap["sdp"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "sdp")
          }
        }

        public var ice: [String] {
          get {
            return resultMap["ice"]! as! [String]
          }
          set {
            resultMap.updateValue(newValue, forKey: "ice")
          }
        }
      }
    }
  }
}

public final class MediaAnswerMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation MediaAnswer($id: ID!, $peerId: ID!, $answer: String!) {\n  mediaStreamAnswer(id: $id, peerId: $peerId, answer: $answer) {\n    __typename\n    id\n    streams {\n      __typename\n      id\n      state\n      sdp\n      ice\n    }\n  }\n}"

  public var id: GraphQLID
  public var peerId: GraphQLID
  public var answer: String

  public init(id: GraphQLID, peerId: GraphQLID, answer: String) {
    self.id = id
    self.peerId = peerId
    self.answer = answer
  }

  public var variables: GraphQLMap? {
    return ["id": id, "peerId": peerId, "answer": answer]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("mediaStreamAnswer", arguments: ["id": GraphQLVariable("id"), "peerId": GraphQLVariable("peerId"), "answer": GraphQLVariable("answer")], type: .nonNull(.object(MediaStreamAnswer.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(mediaStreamAnswer: MediaStreamAnswer) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "mediaStreamAnswer": mediaStreamAnswer.resultMap])
    }

    public var mediaStreamAnswer: MediaStreamAnswer {
      get {
        return MediaStreamAnswer(unsafeResultMap: resultMap["mediaStreamAnswer"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "mediaStreamAnswer")
      }
    }

    public struct MediaStreamAnswer: GraphQLSelectionSet {
      public static let possibleTypes = ["ConferenceMedia"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("streams", type: .nonNull(.list(.nonNull(.object(Stream.selections))))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, streams: [Stream]) {
        self.init(unsafeResultMap: ["__typename": "ConferenceMedia", "id": id, "streams": streams.map { (value: Stream) -> ResultMap in value.resultMap }])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var streams: [Stream] {
        get {
          return (resultMap["streams"] as! [ResultMap]).map { (value: ResultMap) -> Stream in Stream(unsafeResultMap: value) }
        }
        set {
          resultMap.updateValue(newValue.map { (value: Stream) -> ResultMap in value.resultMap }, forKey: "streams")
        }
      }

      public struct Stream: GraphQLSelectionSet {
        public static let possibleTypes = ["MediaStream"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
          GraphQLField("state", type: .nonNull(.scalar(MediaStreamState.self))),
          GraphQLField("sdp", type: .scalar(String.self)),
          GraphQLField("ice", type: .nonNull(.list(.nonNull(.scalar(String.self))))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(id: GraphQLID, state: MediaStreamState, sdp: String? = nil, ice: [String]) {
          self.init(unsafeResultMap: ["__typename": "MediaStream", "id": id, "state": state, "sdp": sdp, "ice": ice])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var id: GraphQLID {
          get {
            return resultMap["id"]! as! GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "id")
          }
        }

        public var state: MediaStreamState {
          get {
            return resultMap["state"]! as! MediaStreamState
          }
          set {
            resultMap.updateValue(newValue, forKey: "state")
          }
        }

        public var sdp: String? {
          get {
            return resultMap["sdp"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "sdp")
          }
        }

        public var ice: [String] {
          get {
            return resultMap["ice"]! as! [String]
          }
          set {
            resultMap.updateValue(newValue, forKey: "ice")
          }
        }
      }
    }
  }
}

public final class MediaCandidateMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation MediaCandidate($id: ID!, $peerId: ID!, $candidate: String!) {\n  mediaStreamCandidate(id: $id, peerId: $peerId, candidate: $candidate) {\n    __typename\n    id\n    streams {\n      __typename\n      id\n      state\n      sdp\n      ice\n    }\n  }\n}"

  public var id: GraphQLID
  public var peerId: GraphQLID
  public var candidate: String

  public init(id: GraphQLID, peerId: GraphQLID, candidate: String) {
    self.id = id
    self.peerId = peerId
    self.candidate = candidate
  }

  public var variables: GraphQLMap? {
    return ["id": id, "peerId": peerId, "candidate": candidate]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("mediaStreamCandidate", arguments: ["id": GraphQLVariable("id"), "peerId": GraphQLVariable("peerId"), "candidate": GraphQLVariable("candidate")], type: .nonNull(.object(MediaStreamCandidate.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(mediaStreamCandidate: MediaStreamCandidate) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "mediaStreamCandidate": mediaStreamCandidate.resultMap])
    }

    public var mediaStreamCandidate: MediaStreamCandidate {
      get {
        return MediaStreamCandidate(unsafeResultMap: resultMap["mediaStreamCandidate"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "mediaStreamCandidate")
      }
    }

    public struct MediaStreamCandidate: GraphQLSelectionSet {
      public static let possibleTypes = ["ConferenceMedia"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("streams", type: .nonNull(.list(.nonNull(.object(Stream.selections))))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, streams: [Stream]) {
        self.init(unsafeResultMap: ["__typename": "ConferenceMedia", "id": id, "streams": streams.map { (value: Stream) -> ResultMap in value.resultMap }])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var streams: [Stream] {
        get {
          return (resultMap["streams"] as! [ResultMap]).map { (value: ResultMap) -> Stream in Stream(unsafeResultMap: value) }
        }
        set {
          resultMap.updateValue(newValue.map { (value: Stream) -> ResultMap in value.resultMap }, forKey: "streams")
        }
      }

      public struct Stream: GraphQLSelectionSet {
        public static let possibleTypes = ["MediaStream"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
          GraphQLField("state", type: .nonNull(.scalar(MediaStreamState.self))),
          GraphQLField("sdp", type: .scalar(String.self)),
          GraphQLField("ice", type: .nonNull(.list(.nonNull(.scalar(String.self))))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(id: GraphQLID, state: MediaStreamState, sdp: String? = nil, ice: [String]) {
          self.init(unsafeResultMap: ["__typename": "MediaStream", "id": id, "state": state, "sdp": sdp, "ice": ice])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var id: GraphQLID {
          get {
            return resultMap["id"]! as! GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "id")
          }
        }

        public var state: MediaStreamState {
          get {
            return resultMap["state"]! as! MediaStreamState
          }
          set {
            resultMap.updateValue(newValue, forKey: "state")
          }
        }

        public var sdp: String? {
          get {
            return resultMap["sdp"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "sdp")
          }
        }

        public var ice: [String] {
          get {
            return resultMap["ice"]! as! [String]
          }
          set {
            resultMap.updateValue(newValue, forKey: "ice")
          }
        }
      }
    }
  }
}

public final class ConferenceMediaWatchSubscription: GraphQLSubscription {
  public let operationDefinition =
    "subscription ConferenceMediaWatch($id: ID!, $peerId: ID!) {\n  media: alphaConferenceMediaWatch(id: $id, peerId: $peerId) {\n    __typename\n    id\n    streams {\n      __typename\n      id\n      state\n      sdp\n      ice\n    }\n  }\n}"

  public var id: GraphQLID
  public var peerId: GraphQLID

  public init(id: GraphQLID, peerId: GraphQLID) {
    self.id = id
    self.peerId = peerId
  }

  public var variables: GraphQLMap? {
    return ["id": id, "peerId": peerId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Subscription"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("alphaConferenceMediaWatch", alias: "media", arguments: ["id": GraphQLVariable("id"), "peerId": GraphQLVariable("peerId")], type: .nonNull(.object(Medium.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(media: Medium) {
      self.init(unsafeResultMap: ["__typename": "Subscription", "media": media.resultMap])
    }

    public var media: Medium {
      get {
        return Medium(unsafeResultMap: resultMap["media"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "media")
      }
    }

    public struct Medium: GraphQLSelectionSet {
      public static let possibleTypes = ["ConferenceMedia"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("streams", type: .nonNull(.list(.nonNull(.object(Stream.selections))))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, streams: [Stream]) {
        self.init(unsafeResultMap: ["__typename": "ConferenceMedia", "id": id, "streams": streams.map { (value: Stream) -> ResultMap in value.resultMap }])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var streams: [Stream] {
        get {
          return (resultMap["streams"] as! [ResultMap]).map { (value: ResultMap) -> Stream in Stream(unsafeResultMap: value) }
        }
        set {
          resultMap.updateValue(newValue.map { (value: Stream) -> ResultMap in value.resultMap }, forKey: "streams")
        }
      }

      public struct Stream: GraphQLSelectionSet {
        public static let possibleTypes = ["MediaStream"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
          GraphQLField("state", type: .nonNull(.scalar(MediaStreamState.self))),
          GraphQLField("sdp", type: .scalar(String.self)),
          GraphQLField("ice", type: .nonNull(.list(.nonNull(.scalar(String.self))))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(id: GraphQLID, state: MediaStreamState, sdp: String? = nil, ice: [String]) {
          self.init(unsafeResultMap: ["__typename": "MediaStream", "id": id, "state": state, "sdp": sdp, "ice": ice])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var id: GraphQLID {
          get {
            return resultMap["id"]! as! GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "id")
          }
        }

        public var state: MediaStreamState {
          get {
            return resultMap["state"]! as! MediaStreamState
          }
          set {
            resultMap.updateValue(newValue, forKey: "state")
          }
        }

        public var sdp: String? {
          get {
            return resultMap["sdp"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "sdp")
          }
        }

        public var ice: [String] {
          get {
            return resultMap["ice"]! as! [String]
          }
          set {
            resultMap.updateValue(newValue, forKey: "ice")
          }
        }
      }
    }
  }
}

public final class ConferenceWatchSubscription: GraphQLSubscription {
  public let operationDefinition =
    "subscription ConferenceWatch($id: ID!) {\n  alphaConferenceWatch(id: $id) {\n    __typename\n    ...ConferenceFull\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(ConferenceFull.fragmentDefinition).appending(UserShort.fragmentDefinition).appending(OrganizationShort.fragmentDefinition) }

  public var id: GraphQLID

  public init(id: GraphQLID) {
    self.id = id
  }

  public var variables: GraphQLMap? {
    return ["id": id]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Subscription"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("alphaConferenceWatch", arguments: ["id": GraphQLVariable("id")], type: .nonNull(.object(AlphaConferenceWatch.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(alphaConferenceWatch: AlphaConferenceWatch) {
      self.init(unsafeResultMap: ["__typename": "Subscription", "alphaConferenceWatch": alphaConferenceWatch.resultMap])
    }

    public var alphaConferenceWatch: AlphaConferenceWatch {
      get {
        return AlphaConferenceWatch(unsafeResultMap: resultMap["alphaConferenceWatch"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "alphaConferenceWatch")
      }
    }

    public struct AlphaConferenceWatch: GraphQLSelectionSet {
      public static let possibleTypes = ["Conference"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(ConferenceFull.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var conferenceFull: ConferenceFull {
          get {
            return ConferenceFull(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public final class AvailableRoomsQuery: GraphQLQuery {
  public let operationDefinition =
    "query AvailableRooms {\n  rooms: betaAvailableRooms {\n    __typename\n    ... on SharedRoom {\n      id\n      kind\n      title\n      photo\n      membersCount\n      membership\n      organization {\n        __typename\n        id\n        name\n        photo\n      }\n    }\n  }\n}"

  public init() {
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("betaAvailableRooms", alias: "rooms", type: .nonNull(.list(.nonNull(.object(Room.selections))))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(rooms: [Room]) {
      self.init(unsafeResultMap: ["__typename": "Query", "rooms": rooms.map { (value: Room) -> ResultMap in value.resultMap }])
    }

    public var rooms: [Room] {
      get {
        return (resultMap["rooms"] as! [ResultMap]).map { (value: ResultMap) -> Room in Room(unsafeResultMap: value) }
      }
      set {
        resultMap.updateValue(newValue.map { (value: Room) -> ResultMap in value.resultMap }, forKey: "rooms")
      }
    }

    public struct Room: GraphQLSelectionSet {
      public static let possibleTypes = ["SharedRoom"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("kind", type: .nonNull(.scalar(SharedRoomKind.self))),
        GraphQLField("title", type: .nonNull(.scalar(String.self))),
        GraphQLField("photo", type: .nonNull(.scalar(String.self))),
        GraphQLField("membersCount", type: .scalar(Int.self)),
        GraphQLField("membership", type: .nonNull(.scalar(SharedRoomMembershipStatus.self))),
        GraphQLField("organization", type: .object(Organization.selections)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, kind: SharedRoomKind, title: String, photo: String, membersCount: Int? = nil, membership: SharedRoomMembershipStatus, organization: Organization? = nil) {
        self.init(unsafeResultMap: ["__typename": "SharedRoom", "id": id, "kind": kind, "title": title, "photo": photo, "membersCount": membersCount, "membership": membership, "organization": organization.flatMap { (value: Organization) -> ResultMap in value.resultMap }])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var kind: SharedRoomKind {
        get {
          return resultMap["kind"]! as! SharedRoomKind
        }
        set {
          resultMap.updateValue(newValue, forKey: "kind")
        }
      }

      public var title: String {
        get {
          return resultMap["title"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "title")
        }
      }

      public var photo: String {
        get {
          return resultMap["photo"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "photo")
        }
      }

      public var membersCount: Int? {
        get {
          return resultMap["membersCount"] as? Int
        }
        set {
          resultMap.updateValue(newValue, forKey: "membersCount")
        }
      }

      public var membership: SharedRoomMembershipStatus {
        get {
          return resultMap["membership"]! as! SharedRoomMembershipStatus
        }
        set {
          resultMap.updateValue(newValue, forKey: "membership")
        }
      }

      public var organization: Organization? {
        get {
          return (resultMap["organization"] as? ResultMap).flatMap { Organization(unsafeResultMap: $0) }
        }
        set {
          resultMap.updateValue(newValue?.resultMap, forKey: "organization")
        }
      }

      public struct Organization: GraphQLSelectionSet {
        public static let possibleTypes = ["Organization"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
          GraphQLField("name", type: .nonNull(.scalar(String.self))),
          GraphQLField("photo", type: .scalar(String.self)),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(id: GraphQLID, name: String, photo: String? = nil) {
          self.init(unsafeResultMap: ["__typename": "Organization", "id": id, "name": name, "photo": photo])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var id: GraphQLID {
          get {
            return resultMap["id"]! as! GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "id")
          }
        }

        public var name: String {
          get {
            return resultMap["name"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "name")
          }
        }

        public var photo: String? {
          get {
            return resultMap["photo"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "photo")
          }
        }
      }
    }
  }
}

public final class GlobalSearchQuery: GraphQLQuery {
  public let operationDefinition =
    "query GlobalSearch($query: String!) {\n  items: alphaGlobalSearch(query: $query) {\n    __typename\n    ... on Organization {\n      ...OrganizationShort\n    }\n    ... on User {\n      ...UserShort\n    }\n    ... on SharedRoom {\n      id\n      kind\n      title\n      roomPhoto: photo\n      membersCount\n      membership\n      organization {\n        __typename\n        id\n        name\n        photo\n      }\n    }\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(OrganizationShort.fragmentDefinition).appending(UserShort.fragmentDefinition) }

  public var query: String

  public init(query: String) {
    self.query = query
  }

  public var variables: GraphQLMap? {
    return ["query": query]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("alphaGlobalSearch", alias: "items", arguments: ["query": GraphQLVariable("query")], type: .nonNull(.list(.nonNull(.object(Item.selections))))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(items: [Item]) {
      self.init(unsafeResultMap: ["__typename": "Query", "items": items.map { (value: Item) -> ResultMap in value.resultMap }])
    }

    public var items: [Item] {
      get {
        return (resultMap["items"] as! [ResultMap]).map { (value: ResultMap) -> Item in Item(unsafeResultMap: value) }
      }
      set {
        resultMap.updateValue(newValue.map { (value: Item) -> ResultMap in value.resultMap }, forKey: "items")
      }
    }

    public struct Item: GraphQLSelectionSet {
      public static let possibleTypes = ["Organization", "User", "SharedRoom"]

      public static let selections: [GraphQLSelection] = [
        GraphQLTypeCase(
          variants: ["Organization": AsOrganization.selections, "User": AsUser.selections, "SharedRoom": AsSharedRoom.selections],
          default: [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          ]
        )
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public static func makeOrganization(id: GraphQLID, name: String, photo: String? = nil, isCommunity: Bool) -> Item {
        return Item(unsafeResultMap: ["__typename": "Organization", "id": id, "name": name, "photo": photo, "isCommunity": isCommunity])
      }

      public static func makeSharedRoom(id: GraphQLID, kind: SharedRoomKind, title: String, roomPhoto: String, membersCount: Int? = nil, membership: SharedRoomMembershipStatus, organization: AsSharedRoom.Organization? = nil) -> Item {
        return Item(unsafeResultMap: ["__typename": "SharedRoom", "id": id, "kind": kind, "title": title, "roomPhoto": roomPhoto, "membersCount": membersCount, "membership": membership, "organization": organization.flatMap { (value: AsSharedRoom.Organization) -> ResultMap in value.resultMap }])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var asOrganization: AsOrganization? {
        get {
          if !AsOrganization.possibleTypes.contains(__typename) { return nil }
          return AsOrganization(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsOrganization: GraphQLSelectionSet {
        public static let possibleTypes = ["Organization"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLFragmentSpread(OrganizationShort.self),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(id: GraphQLID, name: String, photo: String? = nil, isCommunity: Bool) {
          self.init(unsafeResultMap: ["__typename": "Organization", "id": id, "name": name, "photo": photo, "isCommunity": isCommunity])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var fragments: Fragments {
          get {
            return Fragments(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }

        public struct Fragments {
          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public var organizationShort: OrganizationShort {
            get {
              return OrganizationShort(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }
        }
      }

      public var asUser: AsUser? {
        get {
          if !AsUser.possibleTypes.contains(__typename) { return nil }
          return AsUser(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsUser: GraphQLSelectionSet {
        public static let possibleTypes = ["User"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLFragmentSpread(UserShort.self),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var fragments: Fragments {
          get {
            return Fragments(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }

        public struct Fragments {
          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public var userShort: UserShort {
            get {
              return UserShort(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }
        }
      }

      public var asSharedRoom: AsSharedRoom? {
        get {
          if !AsSharedRoom.possibleTypes.contains(__typename) { return nil }
          return AsSharedRoom(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsSharedRoom: GraphQLSelectionSet {
        public static let possibleTypes = ["SharedRoom"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
          GraphQLField("kind", type: .nonNull(.scalar(SharedRoomKind.self))),
          GraphQLField("title", type: .nonNull(.scalar(String.self))),
          GraphQLField("photo", alias: "roomPhoto", type: .nonNull(.scalar(String.self))),
          GraphQLField("membersCount", type: .scalar(Int.self)),
          GraphQLField("membership", type: .nonNull(.scalar(SharedRoomMembershipStatus.self))),
          GraphQLField("organization", type: .object(Organization.selections)),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(id: GraphQLID, kind: SharedRoomKind, title: String, roomPhoto: String, membersCount: Int? = nil, membership: SharedRoomMembershipStatus, organization: Organization? = nil) {
          self.init(unsafeResultMap: ["__typename": "SharedRoom", "id": id, "kind": kind, "title": title, "roomPhoto": roomPhoto, "membersCount": membersCount, "membership": membership, "organization": organization.flatMap { (value: Organization) -> ResultMap in value.resultMap }])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var id: GraphQLID {
          get {
            return resultMap["id"]! as! GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "id")
          }
        }

        public var kind: SharedRoomKind {
          get {
            return resultMap["kind"]! as! SharedRoomKind
          }
          set {
            resultMap.updateValue(newValue, forKey: "kind")
          }
        }

        public var title: String {
          get {
            return resultMap["title"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "title")
          }
        }

        public var roomPhoto: String {
          get {
            return resultMap["roomPhoto"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "roomPhoto")
          }
        }

        public var membersCount: Int? {
          get {
            return resultMap["membersCount"] as? Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "membersCount")
          }
        }

        public var membership: SharedRoomMembershipStatus {
          get {
            return resultMap["membership"]! as! SharedRoomMembershipStatus
          }
          set {
            resultMap.updateValue(newValue, forKey: "membership")
          }
        }

        public var organization: Organization? {
          get {
            return (resultMap["organization"] as? ResultMap).flatMap { Organization(unsafeResultMap: $0) }
          }
          set {
            resultMap.updateValue(newValue?.resultMap, forKey: "organization")
          }
        }

        public struct Organization: GraphQLSelectionSet {
          public static let possibleTypes = ["Organization"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
            GraphQLField("name", type: .nonNull(.scalar(String.self))),
            GraphQLField("photo", type: .scalar(String.self)),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public init(id: GraphQLID, name: String, photo: String? = nil) {
            self.init(unsafeResultMap: ["__typename": "Organization", "id": id, "name": name, "photo": photo])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var id: GraphQLID {
            get {
              return resultMap["id"]! as! GraphQLID
            }
            set {
              resultMap.updateValue(newValue, forKey: "id")
            }
          }

          public var name: String {
            get {
              return resultMap["name"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "name")
            }
          }

          public var photo: String? {
            get {
              return resultMap["photo"] as? String
            }
            set {
              resultMap.updateValue(newValue, forKey: "photo")
            }
          }
        }
      }
    }
  }
}

public final class FeatureFlagsQuery: GraphQLQuery {
  public let operationDefinition =
    "query FeatureFlags {\n  featureFlags {\n    __typename\n    id\n    key\n    title\n  }\n}"

  public init() {
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("featureFlags", type: .nonNull(.list(.nonNull(.object(FeatureFlag.selections))))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(featureFlags: [FeatureFlag]) {
      self.init(unsafeResultMap: ["__typename": "Query", "featureFlags": featureFlags.map { (value: FeatureFlag) -> ResultMap in value.resultMap }])
    }

    public var featureFlags: [FeatureFlag] {
      get {
        return (resultMap["featureFlags"] as! [ResultMap]).map { (value: ResultMap) -> FeatureFlag in FeatureFlag(unsafeResultMap: value) }
      }
      set {
        resultMap.updateValue(newValue.map { (value: FeatureFlag) -> ResultMap in value.resultMap }, forKey: "featureFlags")
      }
    }

    public struct FeatureFlag: GraphQLSelectionSet {
      public static let possibleTypes = ["FeatureFlag"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("key", type: .nonNull(.scalar(String.self))),
        GraphQLField("title", type: .nonNull(.scalar(String.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, key: String, title: String) {
        self.init(unsafeResultMap: ["__typename": "FeatureFlag", "id": id, "key": key, "title": title])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var key: String {
        get {
          return resultMap["key"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "key")
        }
      }

      public var title: String {
        get {
          return resultMap["title"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "title")
        }
      }
    }
  }
}

public final class FeatureFlagAddMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation FeatureFlagAdd($key: String!, $title: String!) {\n  featureFlagAdd(key: $key, title: $title) {\n    __typename\n    id\n    key\n    title\n  }\n}"

  public var key: String
  public var title: String

  public init(key: String, title: String) {
    self.key = key
    self.title = title
  }

  public var variables: GraphQLMap? {
    return ["key": key, "title": title]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("featureFlagAdd", arguments: ["key": GraphQLVariable("key"), "title": GraphQLVariable("title")], type: .nonNull(.object(FeatureFlagAdd.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(featureFlagAdd: FeatureFlagAdd) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "featureFlagAdd": featureFlagAdd.resultMap])
    }

    public var featureFlagAdd: FeatureFlagAdd {
      get {
        return FeatureFlagAdd(unsafeResultMap: resultMap["featureFlagAdd"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "featureFlagAdd")
      }
    }

    public struct FeatureFlagAdd: GraphQLSelectionSet {
      public static let possibleTypes = ["FeatureFlag"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("key", type: .nonNull(.scalar(String.self))),
        GraphQLField("title", type: .nonNull(.scalar(String.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, key: String, title: String) {
        self.init(unsafeResultMap: ["__typename": "FeatureFlag", "id": id, "key": key, "title": title])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var key: String {
        get {
          return resultMap["key"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "key")
        }
      }

      public var title: String {
        get {
          return resultMap["title"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "title")
        }
      }
    }
  }
}

public final class FeatureFlagEnableMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation FeatureFlagEnable($accountId: ID!, $featureId: ID!) {\n  superAccountFeatureAdd(id: $accountId, featureId: $featureId) {\n    __typename\n    id\n    features {\n      __typename\n      id\n      key\n      title\n    }\n  }\n}"

  public var accountId: GraphQLID
  public var featureId: GraphQLID

  public init(accountId: GraphQLID, featureId: GraphQLID) {
    self.accountId = accountId
    self.featureId = featureId
  }

  public var variables: GraphQLMap? {
    return ["accountId": accountId, "featureId": featureId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("superAccountFeatureAdd", arguments: ["id": GraphQLVariable("accountId"), "featureId": GraphQLVariable("featureId")], type: .nonNull(.object(SuperAccountFeatureAdd.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(superAccountFeatureAdd: SuperAccountFeatureAdd) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "superAccountFeatureAdd": superAccountFeatureAdd.resultMap])
    }

    public var superAccountFeatureAdd: SuperAccountFeatureAdd {
      get {
        return SuperAccountFeatureAdd(unsafeResultMap: resultMap["superAccountFeatureAdd"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "superAccountFeatureAdd")
      }
    }

    public struct SuperAccountFeatureAdd: GraphQLSelectionSet {
      public static let possibleTypes = ["SuperAccount"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("features", type: .nonNull(.list(.nonNull(.object(Feature.selections))))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, features: [Feature]) {
        self.init(unsafeResultMap: ["__typename": "SuperAccount", "id": id, "features": features.map { (value: Feature) -> ResultMap in value.resultMap }])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var features: [Feature] {
        get {
          return (resultMap["features"] as! [ResultMap]).map { (value: ResultMap) -> Feature in Feature(unsafeResultMap: value) }
        }
        set {
          resultMap.updateValue(newValue.map { (value: Feature) -> ResultMap in value.resultMap }, forKey: "features")
        }
      }

      public struct Feature: GraphQLSelectionSet {
        public static let possibleTypes = ["FeatureFlag"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
          GraphQLField("key", type: .nonNull(.scalar(String.self))),
          GraphQLField("title", type: .nonNull(.scalar(String.self))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(id: GraphQLID, key: String, title: String) {
          self.init(unsafeResultMap: ["__typename": "FeatureFlag", "id": id, "key": key, "title": title])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var id: GraphQLID {
          get {
            return resultMap["id"]! as! GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "id")
          }
        }

        public var key: String {
          get {
            return resultMap["key"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "key")
          }
        }

        public var title: String {
          get {
            return resultMap["title"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "title")
          }
        }
      }
    }
  }
}

public final class FeatureFlagDisableMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation FeatureFlagDisable($accountId: ID!, $featureId: ID!) {\n  superAccountFeatureRemove(id: $accountId, featureId: $featureId) {\n    __typename\n    id\n    features {\n      __typename\n      id\n      key\n      title\n    }\n  }\n}"

  public var accountId: GraphQLID
  public var featureId: GraphQLID

  public init(accountId: GraphQLID, featureId: GraphQLID) {
    self.accountId = accountId
    self.featureId = featureId
  }

  public var variables: GraphQLMap? {
    return ["accountId": accountId, "featureId": featureId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("superAccountFeatureRemove", arguments: ["id": GraphQLVariable("accountId"), "featureId": GraphQLVariable("featureId")], type: .nonNull(.object(SuperAccountFeatureRemove.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(superAccountFeatureRemove: SuperAccountFeatureRemove) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "superAccountFeatureRemove": superAccountFeatureRemove.resultMap])
    }

    public var superAccountFeatureRemove: SuperAccountFeatureRemove {
      get {
        return SuperAccountFeatureRemove(unsafeResultMap: resultMap["superAccountFeatureRemove"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "superAccountFeatureRemove")
      }
    }

    public struct SuperAccountFeatureRemove: GraphQLSelectionSet {
      public static let possibleTypes = ["SuperAccount"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("features", type: .nonNull(.list(.nonNull(.object(Feature.selections))))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, features: [Feature]) {
        self.init(unsafeResultMap: ["__typename": "SuperAccount", "id": id, "features": features.map { (value: Feature) -> ResultMap in value.resultMap }])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var features: [Feature] {
        get {
          return (resultMap["features"] as! [ResultMap]).map { (value: ResultMap) -> Feature in Feature(unsafeResultMap: value) }
        }
        set {
          resultMap.updateValue(newValue.map { (value: Feature) -> ResultMap in value.resultMap }, forKey: "features")
        }
      }

      public struct Feature: GraphQLSelectionSet {
        public static let possibleTypes = ["FeatureFlag"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
          GraphQLField("key", type: .nonNull(.scalar(String.self))),
          GraphQLField("title", type: .nonNull(.scalar(String.self))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(id: GraphQLID, key: String, title: String) {
          self.init(unsafeResultMap: ["__typename": "FeatureFlag", "id": id, "key": key, "title": title])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var id: GraphQLID {
          get {
            return resultMap["id"]! as! GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "id")
          }
        }

        public var key: String {
          get {
            return resultMap["key"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "key")
          }
        }

        public var title: String {
          get {
            return resultMap["title"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "title")
          }
        }
      }
    }
  }
}

public final class FeedHomeQuery: GraphQLQuery {
  public let operationDefinition =
    "query FeedHome {\n  homeFeed: alphaHomeFeed {\n    __typename\n    id\n    text\n    date\n    by: alphaBy {\n      __typename\n      ...UserShort\n    }\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(UserShort.fragmentDefinition).appending(OrganizationShort.fragmentDefinition) }

  public init() {
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("alphaHomeFeed", alias: "homeFeed", type: .nonNull(.list(.nonNull(.object(HomeFeed.selections))))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(homeFeed: [HomeFeed]) {
      self.init(unsafeResultMap: ["__typename": "Query", "homeFeed": homeFeed.map { (value: HomeFeed) -> ResultMap in value.resultMap }])
    }

    public var homeFeed: [HomeFeed] {
      get {
        return (resultMap["homeFeed"] as! [ResultMap]).map { (value: ResultMap) -> HomeFeed in HomeFeed(unsafeResultMap: value) }
      }
      set {
        resultMap.updateValue(newValue.map { (value: HomeFeed) -> ResultMap in value.resultMap }, forKey: "homeFeed")
      }
    }

    public struct HomeFeed: GraphQLSelectionSet {
      public static let possibleTypes = ["FeedItem"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("text", type: .nonNull(.scalar(String.self))),
        GraphQLField("date", type: .nonNull(.scalar(String.self))),
        GraphQLField("alphaBy", alias: "by", type: .nonNull(.object(By.selections))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, text: String, date: String, by: By) {
        self.init(unsafeResultMap: ["__typename": "FeedItem", "id": id, "text": text, "date": date, "by": by.resultMap])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var text: String {
        get {
          return resultMap["text"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "text")
        }
      }

      public var date: String {
        get {
          return resultMap["date"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "date")
        }
      }

      public var by: By {
        get {
          return By(unsafeResultMap: resultMap["by"]! as! ResultMap)
        }
        set {
          resultMap.updateValue(newValue.resultMap, forKey: "by")
        }
      }

      public struct By: GraphQLSelectionSet {
        public static let possibleTypes = ["User"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLFragmentSpread(UserShort.self),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var fragments: Fragments {
          get {
            return Fragments(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }

        public struct Fragments {
          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public var userShort: UserShort {
            get {
              return UserShort(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }
        }
      }
    }
  }
}

public final class FeedPostMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation FeedPost($message: String!) {\n  alphaCreateFeedPost(message: $message) {\n    __typename\n    id\n  }\n}"

  public var message: String

  public init(message: String) {
    self.message = message
  }

  public var variables: GraphQLMap? {
    return ["message": message]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("alphaCreateFeedPost", arguments: ["message": GraphQLVariable("message")], type: .nonNull(.object(AlphaCreateFeedPost.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(alphaCreateFeedPost: AlphaCreateFeedPost) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "alphaCreateFeedPost": alphaCreateFeedPost.resultMap])
    }

    public var alphaCreateFeedPost: AlphaCreateFeedPost {
      get {
        return AlphaCreateFeedPost(unsafeResultMap: resultMap["alphaCreateFeedPost"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "alphaCreateFeedPost")
      }
    }

    public struct AlphaCreateFeedPost: GraphQLSelectionSet {
      public static let possibleTypes = ["FeedItem"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID) {
        self.init(unsafeResultMap: ["__typename": "FeedItem", "id": id])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }
    }
  }
}

public final class MyOrganizationsQuery: GraphQLQuery {
  public let operationDefinition =
    "query MyOrganizations {\n  myOrganizations {\n    __typename\n    ...OrganizationShort\n    isPrimary: betaIsPrimary\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(OrganizationShort.fragmentDefinition) }

  public init() {
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("myOrganizations", type: .nonNull(.list(.nonNull(.object(MyOrganization.selections))))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(myOrganizations: [MyOrganization]) {
      self.init(unsafeResultMap: ["__typename": "Query", "myOrganizations": myOrganizations.map { (value: MyOrganization) -> ResultMap in value.resultMap }])
    }

    public var myOrganizations: [MyOrganization] {
      get {
        return (resultMap["myOrganizations"] as! [ResultMap]).map { (value: ResultMap) -> MyOrganization in MyOrganization(unsafeResultMap: value) }
      }
      set {
        resultMap.updateValue(newValue.map { (value: MyOrganization) -> ResultMap in value.resultMap }, forKey: "myOrganizations")
      }
    }

    public struct MyOrganization: GraphQLSelectionSet {
      public static let possibleTypes = ["Organization"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(OrganizationShort.self),
        GraphQLField("betaIsPrimary", alias: "isPrimary", type: .nonNull(.scalar(Bool.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, name: String, photo: String? = nil, isCommunity: Bool, isPrimary: Bool) {
        self.init(unsafeResultMap: ["__typename": "Organization", "id": id, "name": name, "photo": photo, "isCommunity": isCommunity, "isPrimary": isPrimary])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var isPrimary: Bool {
        get {
          return resultMap["isPrimary"]! as! Bool
        }
        set {
          resultMap.updateValue(newValue, forKey: "isPrimary")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var organizationShort: OrganizationShort {
          get {
            return OrganizationShort(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public final class UpdateOrganizationMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation UpdateOrganization($input: UpdateOrganizationProfileInput!, $organizationId: ID) {\n  updateOrganizationProfile(input: $input, id: $organizationId) {\n    __typename\n    ...OrganizationProfileFull\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(OrganizationProfileFull.fragmentDefinition) }

  public var input: UpdateOrganizationProfileInput
  public var organizationId: GraphQLID?

  public init(input: UpdateOrganizationProfileInput, organizationId: GraphQLID? = nil) {
    self.input = input
    self.organizationId = organizationId
  }

  public var variables: GraphQLMap? {
    return ["input": input, "organizationId": organizationId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("updateOrganizationProfile", arguments: ["input": GraphQLVariable("input"), "id": GraphQLVariable("organizationId")], type: .nonNull(.object(UpdateOrganizationProfile.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(updateOrganizationProfile: UpdateOrganizationProfile) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "updateOrganizationProfile": updateOrganizationProfile.resultMap])
    }

    public var updateOrganizationProfile: UpdateOrganizationProfile {
      get {
        return UpdateOrganizationProfile(unsafeResultMap: resultMap["updateOrganizationProfile"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "updateOrganizationProfile")
      }
    }

    public struct UpdateOrganizationProfile: GraphQLSelectionSet {
      public static let possibleTypes = ["OrganizationProfile"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(OrganizationProfileFull.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var organizationProfileFull: OrganizationProfileFull {
          get {
            return OrganizationProfileFull(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public final class SetOrgShortnameMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation SetOrgShortname($organizationId: ID!, $shortname: String!) {\n  alphaSetOrgShortName(id: $organizationId, shortname: $shortname)\n}"

  public var organizationId: GraphQLID
  public var shortname: String

  public init(organizationId: GraphQLID, shortname: String) {
    self.organizationId = organizationId
    self.shortname = shortname
  }

  public var variables: GraphQLMap? {
    return ["organizationId": organizationId, "shortname": shortname]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("alphaSetOrgShortName", arguments: ["id": GraphQLVariable("organizationId"), "shortname": GraphQLVariable("shortname")], type: .scalar(String.self)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(alphaSetOrgShortName: String? = nil) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "alphaSetOrgShortName": alphaSetOrgShortName])
    }

    public var alphaSetOrgShortName: String? {
      get {
        return resultMap["alphaSetOrgShortName"] as? String
      }
      set {
        resultMap.updateValue(newValue, forKey: "alphaSetOrgShortName")
      }
    }
  }
}

public final class OrganizationQuery: GraphQLQuery {
  public let operationDefinition =
    "query Organization($organizationId: ID!) {\n  organization(id: $organizationId) {\n    __typename\n    ...OrganizationFull\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(OrganizationFull.fragmentDefinition).appending(UserFull.fragmentDefinition).appending(OrganizationShort.fragmentDefinition).appending(RoomShort.fragmentDefinition).appending(UserShort.fragmentDefinition).appending(FullMessage.fragmentDefinition).appending(UserTiny.fragmentDefinition) }

  public var organizationId: GraphQLID

  public init(organizationId: GraphQLID) {
    self.organizationId = organizationId
  }

  public var variables: GraphQLMap? {
    return ["organizationId": organizationId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("organization", arguments: ["id": GraphQLVariable("organizationId")], type: .nonNull(.object(Organization.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(organization: Organization) {
      self.init(unsafeResultMap: ["__typename": "Query", "organization": organization.resultMap])
    }

    public var organization: Organization {
      get {
        return Organization(unsafeResultMap: resultMap["organization"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "organization")
      }
    }

    public struct Organization: GraphQLSelectionSet {
      public static let possibleTypes = ["Organization"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(OrganizationFull.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var organizationFull: OrganizationFull {
          get {
            return OrganizationFull(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public final class OrganizationMembersShortQuery: GraphQLQuery {
  public let operationDefinition =
    "query OrganizationMembersShort($organizationId: ID!) {\n  organization(id: $organizationId) {\n    __typename\n    members: alphaOrganizationMembers {\n      __typename\n      user {\n        __typename\n        id\n      }\n    }\n  }\n}"

  public var organizationId: GraphQLID

  public init(organizationId: GraphQLID) {
    self.organizationId = organizationId
  }

  public var variables: GraphQLMap? {
    return ["organizationId": organizationId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("organization", arguments: ["id": GraphQLVariable("organizationId")], type: .nonNull(.object(Organization.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(organization: Organization) {
      self.init(unsafeResultMap: ["__typename": "Query", "organization": organization.resultMap])
    }

    public var organization: Organization {
      get {
        return Organization(unsafeResultMap: resultMap["organization"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "organization")
      }
    }

    public struct Organization: GraphQLSelectionSet {
      public static let possibleTypes = ["Organization"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("alphaOrganizationMembers", alias: "members", type: .nonNull(.list(.nonNull(.object(Member.selections))))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(members: [Member]) {
        self.init(unsafeResultMap: ["__typename": "Organization", "members": members.map { (value: Member) -> ResultMap in value.resultMap }])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var members: [Member] {
        get {
          return (resultMap["members"] as! [ResultMap]).map { (value: ResultMap) -> Member in Member(unsafeResultMap: value) }
        }
        set {
          resultMap.updateValue(newValue.map { (value: Member) -> ResultMap in value.resultMap }, forKey: "members")
        }
      }

      public struct Member: GraphQLSelectionSet {
        public static let possibleTypes = ["OrganizationJoinedMember"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("user", type: .nonNull(.object(User.selections))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(user: User) {
          self.init(unsafeResultMap: ["__typename": "OrganizationJoinedMember", "user": user.resultMap])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var user: User {
          get {
            return User(unsafeResultMap: resultMap["user"]! as! ResultMap)
          }
          set {
            resultMap.updateValue(newValue.resultMap, forKey: "user")
          }
        }

        public struct User: GraphQLSelectionSet {
          public static let possibleTypes = ["User"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public init(id: GraphQLID) {
            self.init(unsafeResultMap: ["__typename": "User", "id": id])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var id: GraphQLID {
            get {
              return resultMap["id"]! as! GraphQLID
            }
            set {
              resultMap.updateValue(newValue, forKey: "id")
            }
          }
        }
      }
    }
  }
}

public final class OrganizationProfileQuery: GraphQLQuery {
  public let operationDefinition =
    "query OrganizationProfile($organizationId: ID!) {\n  organizationProfile(id: $organizationId) {\n    __typename\n    ...OrganizationProfileFull\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(OrganizationProfileFull.fragmentDefinition) }

  public var organizationId: GraphQLID

  public init(organizationId: GraphQLID) {
    self.organizationId = organizationId
  }

  public var variables: GraphQLMap? {
    return ["organizationId": organizationId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("organizationProfile", arguments: ["id": GraphQLVariable("organizationId")], type: .nonNull(.object(OrganizationProfile.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(organizationProfile: OrganizationProfile) {
      self.init(unsafeResultMap: ["__typename": "Query", "organizationProfile": organizationProfile.resultMap])
    }

    public var organizationProfile: OrganizationProfile {
      get {
        return OrganizationProfile(unsafeResultMap: resultMap["organizationProfile"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "organizationProfile")
      }
    }

    public struct OrganizationProfile: GraphQLSelectionSet {
      public static let possibleTypes = ["OrganizationProfile"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(OrganizationProfileFull.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var organizationProfileFull: OrganizationProfileFull {
          get {
            return OrganizationProfileFull(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public final class ExploreOrganizationsQuery: GraphQLQuery {
  public let operationDefinition =
    "query ExploreOrganizations($query: String, $prefix: String, $sort: String, $page: Int, $after: String, $all: Boolean) {\n  items: alphaOrganizations(query: $query, prefix: $prefix, sort: $sort, page: $page, first: 25, after: $after, all: $all) {\n    __typename\n    edges {\n      __typename\n      node {\n        __typename\n        ...OrganizationSearch\n      }\n      cursor\n    }\n    pageInfo {\n      __typename\n      hasNextPage\n      hasPreviousPage\n      itemsCount\n      currentPage\n      pagesCount\n      openEnded\n    }\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(OrganizationSearch.fragmentDefinition) }

  public var query: String?
  public var `prefix`: String?
  public var sort: String?
  public var page: Int?
  public var after: String?
  public var all: Bool?

  public init(query: String? = nil, `prefix`: String? = nil, sort: String? = nil, page: Int? = nil, after: String? = nil, all: Bool? = nil) {
    self.query = query
    self.prefix = `prefix`
    self.sort = sort
    self.page = page
    self.after = after
    self.all = all
  }

  public var variables: GraphQLMap? {
    return ["query": query, "prefix": `prefix`, "sort": sort, "page": page, "after": after, "all": all]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("alphaOrganizations", alias: "items", arguments: ["query": GraphQLVariable("query"), "prefix": GraphQLVariable("prefix"), "sort": GraphQLVariable("sort"), "page": GraphQLVariable("page"), "first": 25, "after": GraphQLVariable("after"), "all": GraphQLVariable("all")], type: .nonNull(.object(Item.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(items: Item) {
      self.init(unsafeResultMap: ["__typename": "Query", "items": items.resultMap])
    }

    public var items: Item {
      get {
        return Item(unsafeResultMap: resultMap["items"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "items")
      }
    }

    public struct Item: GraphQLSelectionSet {
      public static let possibleTypes = ["OrganizationsConnection"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("edges", type: .nonNull(.list(.nonNull(.object(Edge.selections))))),
        GraphQLField("pageInfo", type: .nonNull(.object(PageInfo.selections))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(edges: [Edge], pageInfo: PageInfo) {
        self.init(unsafeResultMap: ["__typename": "OrganizationsConnection", "edges": edges.map { (value: Edge) -> ResultMap in value.resultMap }, "pageInfo": pageInfo.resultMap])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var edges: [Edge] {
        get {
          return (resultMap["edges"] as! [ResultMap]).map { (value: ResultMap) -> Edge in Edge(unsafeResultMap: value) }
        }
        set {
          resultMap.updateValue(newValue.map { (value: Edge) -> ResultMap in value.resultMap }, forKey: "edges")
        }
      }

      public var pageInfo: PageInfo {
        get {
          return PageInfo(unsafeResultMap: resultMap["pageInfo"]! as! ResultMap)
        }
        set {
          resultMap.updateValue(newValue.resultMap, forKey: "pageInfo")
        }
      }

      public struct Edge: GraphQLSelectionSet {
        public static let possibleTypes = ["OrganizationsEdge"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("node", type: .nonNull(.object(Node.selections))),
          GraphQLField("cursor", type: .nonNull(.scalar(String.self))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(node: Node, cursor: String) {
          self.init(unsafeResultMap: ["__typename": "OrganizationsEdge", "node": node.resultMap, "cursor": cursor])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var node: Node {
          get {
            return Node(unsafeResultMap: resultMap["node"]! as! ResultMap)
          }
          set {
            resultMap.updateValue(newValue.resultMap, forKey: "node")
          }
        }

        public var cursor: String {
          get {
            return resultMap["cursor"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "cursor")
          }
        }

        public struct Node: GraphQLSelectionSet {
          public static let possibleTypes = ["Organization"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLFragmentSpread(OrganizationSearch.self),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var fragments: Fragments {
            get {
              return Fragments(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }

          public struct Fragments {
            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public var organizationSearch: OrganizationSearch {
              get {
                return OrganizationSearch(unsafeResultMap: resultMap)
              }
              set {
                resultMap += newValue.resultMap
              }
            }
          }
        }
      }

      public struct PageInfo: GraphQLSelectionSet {
        public static let possibleTypes = ["PageInfo"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("hasNextPage", type: .nonNull(.scalar(Bool.self))),
          GraphQLField("hasPreviousPage", type: .nonNull(.scalar(Bool.self))),
          GraphQLField("itemsCount", type: .nonNull(.scalar(Int.self))),
          GraphQLField("currentPage", type: .nonNull(.scalar(Int.self))),
          GraphQLField("pagesCount", type: .nonNull(.scalar(Int.self))),
          GraphQLField("openEnded", type: .nonNull(.scalar(Bool.self))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(hasNextPage: Bool, hasPreviousPage: Bool, itemsCount: Int, currentPage: Int, pagesCount: Int, openEnded: Bool) {
          self.init(unsafeResultMap: ["__typename": "PageInfo", "hasNextPage": hasNextPage, "hasPreviousPage": hasPreviousPage, "itemsCount": itemsCount, "currentPage": currentPage, "pagesCount": pagesCount, "openEnded": openEnded])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var hasNextPage: Bool {
          get {
            return resultMap["hasNextPage"]! as! Bool
          }
          set {
            resultMap.updateValue(newValue, forKey: "hasNextPage")
          }
        }

        public var hasPreviousPage: Bool {
          get {
            return resultMap["hasPreviousPage"]! as! Bool
          }
          set {
            resultMap.updateValue(newValue, forKey: "hasPreviousPage")
          }
        }

        public var itemsCount: Int {
          get {
            return resultMap["itemsCount"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "itemsCount")
          }
        }

        public var currentPage: Int {
          get {
            return resultMap["currentPage"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "currentPage")
          }
        }

        public var pagesCount: Int {
          get {
            return resultMap["pagesCount"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "pagesCount")
          }
        }

        public var openEnded: Bool {
          get {
            return resultMap["openEnded"]! as! Bool
          }
          set {
            resultMap.updateValue(newValue, forKey: "openEnded")
          }
        }
      }
    }
  }
}

public final class ExploreComunityQuery: GraphQLQuery {
  public let operationDefinition =
    "query ExploreComunity($query: String, $sort: String, $page: Int) {\n  items: alphaComunityPrefixSearch(query: $query, sort: $sort, page: $page, first: 25) {\n    __typename\n    edges {\n      __typename\n      node {\n        __typename\n        ...OrganizationSearch\n      }\n      cursor\n    }\n    pageInfo {\n      __typename\n      hasNextPage\n      hasPreviousPage\n      itemsCount\n      currentPage\n      pagesCount\n      openEnded\n    }\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(OrganizationSearch.fragmentDefinition) }

  public var query: String?
  public var sort: String?
  public var page: Int?

  public init(query: String? = nil, sort: String? = nil, page: Int? = nil) {
    self.query = query
    self.sort = sort
    self.page = page
  }

  public var variables: GraphQLMap? {
    return ["query": query, "sort": sort, "page": page]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("alphaComunityPrefixSearch", alias: "items", arguments: ["query": GraphQLVariable("query"), "sort": GraphQLVariable("sort"), "page": GraphQLVariable("page"), "first": 25], type: .nonNull(.object(Item.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(items: Item) {
      self.init(unsafeResultMap: ["__typename": "Query", "items": items.resultMap])
    }

    public var items: Item {
      get {
        return Item(unsafeResultMap: resultMap["items"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "items")
      }
    }

    public struct Item: GraphQLSelectionSet {
      public static let possibleTypes = ["OrganizationsConnection"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("edges", type: .nonNull(.list(.nonNull(.object(Edge.selections))))),
        GraphQLField("pageInfo", type: .nonNull(.object(PageInfo.selections))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(edges: [Edge], pageInfo: PageInfo) {
        self.init(unsafeResultMap: ["__typename": "OrganizationsConnection", "edges": edges.map { (value: Edge) -> ResultMap in value.resultMap }, "pageInfo": pageInfo.resultMap])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var edges: [Edge] {
        get {
          return (resultMap["edges"] as! [ResultMap]).map { (value: ResultMap) -> Edge in Edge(unsafeResultMap: value) }
        }
        set {
          resultMap.updateValue(newValue.map { (value: Edge) -> ResultMap in value.resultMap }, forKey: "edges")
        }
      }

      public var pageInfo: PageInfo {
        get {
          return PageInfo(unsafeResultMap: resultMap["pageInfo"]! as! ResultMap)
        }
        set {
          resultMap.updateValue(newValue.resultMap, forKey: "pageInfo")
        }
      }

      public struct Edge: GraphQLSelectionSet {
        public static let possibleTypes = ["OrganizationsEdge"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("node", type: .nonNull(.object(Node.selections))),
          GraphQLField("cursor", type: .nonNull(.scalar(String.self))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(node: Node, cursor: String) {
          self.init(unsafeResultMap: ["__typename": "OrganizationsEdge", "node": node.resultMap, "cursor": cursor])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var node: Node {
          get {
            return Node(unsafeResultMap: resultMap["node"]! as! ResultMap)
          }
          set {
            resultMap.updateValue(newValue.resultMap, forKey: "node")
          }
        }

        public var cursor: String {
          get {
            return resultMap["cursor"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "cursor")
          }
        }

        public struct Node: GraphQLSelectionSet {
          public static let possibleTypes = ["Organization"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLFragmentSpread(OrganizationSearch.self),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var fragments: Fragments {
            get {
              return Fragments(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }

          public struct Fragments {
            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public var organizationSearch: OrganizationSearch {
              get {
                return OrganizationSearch(unsafeResultMap: resultMap)
              }
              set {
                resultMap += newValue.resultMap
              }
            }
          }
        }
      }

      public struct PageInfo: GraphQLSelectionSet {
        public static let possibleTypes = ["PageInfo"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("hasNextPage", type: .nonNull(.scalar(Bool.self))),
          GraphQLField("hasPreviousPage", type: .nonNull(.scalar(Bool.self))),
          GraphQLField("itemsCount", type: .nonNull(.scalar(Int.self))),
          GraphQLField("currentPage", type: .nonNull(.scalar(Int.self))),
          GraphQLField("pagesCount", type: .nonNull(.scalar(Int.self))),
          GraphQLField("openEnded", type: .nonNull(.scalar(Bool.self))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(hasNextPage: Bool, hasPreviousPage: Bool, itemsCount: Int, currentPage: Int, pagesCount: Int, openEnded: Bool) {
          self.init(unsafeResultMap: ["__typename": "PageInfo", "hasNextPage": hasNextPage, "hasPreviousPage": hasPreviousPage, "itemsCount": itemsCount, "currentPage": currentPage, "pagesCount": pagesCount, "openEnded": openEnded])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var hasNextPage: Bool {
          get {
            return resultMap["hasNextPage"]! as! Bool
          }
          set {
            resultMap.updateValue(newValue, forKey: "hasNextPage")
          }
        }

        public var hasPreviousPage: Bool {
          get {
            return resultMap["hasPreviousPage"]! as! Bool
          }
          set {
            resultMap.updateValue(newValue, forKey: "hasPreviousPage")
          }
        }

        public var itemsCount: Int {
          get {
            return resultMap["itemsCount"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "itemsCount")
          }
        }

        public var currentPage: Int {
          get {
            return resultMap["currentPage"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "currentPage")
          }
        }

        public var pagesCount: Int {
          get {
            return resultMap["pagesCount"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "pagesCount")
          }
        }

        public var openEnded: Bool {
          get {
            return resultMap["openEnded"]! as! Bool
          }
          set {
            resultMap.updateValue(newValue, forKey: "openEnded")
          }
        }
      }
    }
  }
}

public final class OrganizationChangeMemberRoleMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation OrganizationChangeMemberRole($memberId: ID!, $newRole: OrganizationMemberRole!, $organizationId: ID!) {\n  alphaOrganizationChangeMemberRole(memberId: $memberId, newRole: $newRole, organizationId: $organizationId)\n}"

  public var memberId: GraphQLID
  public var newRole: OrganizationMemberRole
  public var organizationId: GraphQLID

  public init(memberId: GraphQLID, newRole: OrganizationMemberRole, organizationId: GraphQLID) {
    self.memberId = memberId
    self.newRole = newRole
    self.organizationId = organizationId
  }

  public var variables: GraphQLMap? {
    return ["memberId": memberId, "newRole": newRole, "organizationId": organizationId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("alphaOrganizationChangeMemberRole", arguments: ["memberId": GraphQLVariable("memberId"), "newRole": GraphQLVariable("newRole"), "organizationId": GraphQLVariable("organizationId")], type: .nonNull(.scalar(String.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(alphaOrganizationChangeMemberRole: String) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "alphaOrganizationChangeMemberRole": alphaOrganizationChangeMemberRole])
    }

    public var alphaOrganizationChangeMemberRole: String {
      get {
        return resultMap["alphaOrganizationChangeMemberRole"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "alphaOrganizationChangeMemberRole")
      }
    }
  }
}

public final class OrganizationAddMemberMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation OrganizationAddMember($userIds: [ID!], $organizationId: ID!) {\n  betaOrganizationMemberAdd(userIds: $userIds, organizationId: $organizationId) {\n    __typename\n    ...OrganizationFull\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(OrganizationFull.fragmentDefinition).appending(UserFull.fragmentDefinition).appending(OrganizationShort.fragmentDefinition).appending(RoomShort.fragmentDefinition).appending(UserShort.fragmentDefinition).appending(FullMessage.fragmentDefinition).appending(UserTiny.fragmentDefinition) }

  public var userIds: [GraphQLID]?
  public var organizationId: GraphQLID

  public init(userIds: [GraphQLID]?, organizationId: GraphQLID) {
    self.userIds = userIds
    self.organizationId = organizationId
  }

  public var variables: GraphQLMap? {
    return ["userIds": userIds, "organizationId": organizationId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("betaOrganizationMemberAdd", arguments: ["userIds": GraphQLVariable("userIds"), "organizationId": GraphQLVariable("organizationId")], type: .nonNull(.object(BetaOrganizationMemberAdd.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(betaOrganizationMemberAdd: BetaOrganizationMemberAdd) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "betaOrganizationMemberAdd": betaOrganizationMemberAdd.resultMap])
    }

    public var betaOrganizationMemberAdd: BetaOrganizationMemberAdd {
      get {
        return BetaOrganizationMemberAdd(unsafeResultMap: resultMap["betaOrganizationMemberAdd"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "betaOrganizationMemberAdd")
      }
    }

    public struct BetaOrganizationMemberAdd: GraphQLSelectionSet {
      public static let possibleTypes = ["Organization"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(OrganizationFull.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var organizationFull: OrganizationFull {
          get {
            return OrganizationFull(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public final class OrganizationRemoveMemberMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation OrganizationRemoveMember($memberId: ID!, $organizationId: ID!) {\n  alphaOrganizationRemoveMember(memberId: $memberId, organizationId: $organizationId)\n}"

  public var memberId: GraphQLID
  public var organizationId: GraphQLID

  public init(memberId: GraphQLID, organizationId: GraphQLID) {
    self.memberId = memberId
    self.organizationId = organizationId
  }

  public var variables: GraphQLMap? {
    return ["memberId": memberId, "organizationId": organizationId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("alphaOrganizationRemoveMember", arguments: ["memberId": GraphQLVariable("memberId"), "organizationId": GraphQLVariable("organizationId")], type: .nonNull(.scalar(String.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(alphaOrganizationRemoveMember: String) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "alphaOrganizationRemoveMember": alphaOrganizationRemoveMember])
    }

    public var alphaOrganizationRemoveMember: String {
      get {
        return resultMap["alphaOrganizationRemoveMember"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "alphaOrganizationRemoveMember")
      }
    }
  }
}

public final class OrganizationInviteMembersMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation OrganizationInviteMembers($inviteRequests: [InviteRequest!]!, $organizationId: ID) {\n  alphaOrganizationInviteMembers(inviteRequests: $inviteRequests, organizationId: $organizationId)\n}"

  public var inviteRequests: [InviteRequest]
  public var organizationId: GraphQLID?

  public init(inviteRequests: [InviteRequest], organizationId: GraphQLID? = nil) {
    self.inviteRequests = inviteRequests
    self.organizationId = organizationId
  }

  public var variables: GraphQLMap? {
    return ["inviteRequests": inviteRequests, "organizationId": organizationId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("alphaOrganizationInviteMembers", arguments: ["inviteRequests": GraphQLVariable("inviteRequests"), "organizationId": GraphQLVariable("organizationId")], type: .nonNull(.scalar(String.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(alphaOrganizationInviteMembers: String) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "alphaOrganizationInviteMembers": alphaOrganizationInviteMembers])
    }

    public var alphaOrganizationInviteMembers: String {
      get {
        return resultMap["alphaOrganizationInviteMembers"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "alphaOrganizationInviteMembers")
      }
    }
  }
}

public final class OrganizationPublicInviteQuery: GraphQLQuery {
  public let operationDefinition =
    "query OrganizationPublicInvite($organizationId: ID) {\n  publicInvite: alphaOrganizationInviteLink(organizationId: $organizationId) {\n    __typename\n    id\n    key\n    ttl\n  }\n}"

  public var organizationId: GraphQLID?

  public init(organizationId: GraphQLID? = nil) {
    self.organizationId = organizationId
  }

  public var variables: GraphQLMap? {
    return ["organizationId": organizationId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("alphaOrganizationInviteLink", alias: "publicInvite", arguments: ["organizationId": GraphQLVariable("organizationId")], type: .object(PublicInvite.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(publicInvite: PublicInvite? = nil) {
      self.init(unsafeResultMap: ["__typename": "Query", "publicInvite": publicInvite.flatMap { (value: PublicInvite) -> ResultMap in value.resultMap }])
    }

    public var publicInvite: PublicInvite? {
      get {
        return (resultMap["publicInvite"] as? ResultMap).flatMap { PublicInvite(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "publicInvite")
      }
    }

    public struct PublicInvite: GraphQLSelectionSet {
      public static let possibleTypes = ["Invite"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("key", type: .nonNull(.scalar(String.self))),
        GraphQLField("ttl", type: .scalar(String.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, key: String, ttl: String? = nil) {
        self.init(unsafeResultMap: ["__typename": "Invite", "id": id, "key": key, "ttl": ttl])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var key: String {
        get {
          return resultMap["key"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "key")
        }
      }

      public var ttl: String? {
        get {
          return resultMap["ttl"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "ttl")
        }
      }
    }
  }
}

public final class OrganizationCreatePublicInviteMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation OrganizationCreatePublicInvite($expirationDays: Int, $organizationId: ID) {\n  alphaOrganizationRefreshInviteLink(expirationDays: $expirationDays, organizationId: $organizationId) {\n    __typename\n    id\n    key\n    ttl\n  }\n}"

  public var expirationDays: Int?
  public var organizationId: GraphQLID?

  public init(expirationDays: Int? = nil, organizationId: GraphQLID? = nil) {
    self.expirationDays = expirationDays
    self.organizationId = organizationId
  }

  public var variables: GraphQLMap? {
    return ["expirationDays": expirationDays, "organizationId": organizationId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("alphaOrganizationRefreshInviteLink", arguments: ["expirationDays": GraphQLVariable("expirationDays"), "organizationId": GraphQLVariable("organizationId")], type: .nonNull(.object(AlphaOrganizationRefreshInviteLink.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(alphaOrganizationRefreshInviteLink: AlphaOrganizationRefreshInviteLink) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "alphaOrganizationRefreshInviteLink": alphaOrganizationRefreshInviteLink.resultMap])
    }

    public var alphaOrganizationRefreshInviteLink: AlphaOrganizationRefreshInviteLink {
      get {
        return AlphaOrganizationRefreshInviteLink(unsafeResultMap: resultMap["alphaOrganizationRefreshInviteLink"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "alphaOrganizationRefreshInviteLink")
      }
    }

    public struct AlphaOrganizationRefreshInviteLink: GraphQLSelectionSet {
      public static let possibleTypes = ["Invite"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("key", type: .nonNull(.scalar(String.self))),
        GraphQLField("ttl", type: .scalar(String.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, key: String, ttl: String? = nil) {
        self.init(unsafeResultMap: ["__typename": "Invite", "id": id, "key": key, "ttl": ttl])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var key: String {
        get {
          return resultMap["key"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "key")
        }
      }

      public var ttl: String? {
        get {
          return resultMap["ttl"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "ttl")
        }
      }
    }
  }
}

public final class DeleteOrganizationMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation DeleteOrganization($organizationId: ID!) {\n  deleteOrganization(id: $organizationId)\n}"

  public var organizationId: GraphQLID

  public init(organizationId: GraphQLID) {
    self.organizationId = organizationId
  }

  public var variables: GraphQLMap? {
    return ["organizationId": organizationId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("deleteOrganization", arguments: ["id": GraphQLVariable("organizationId")], type: .nonNull(.scalar(Bool.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(deleteOrganization: Bool) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "deleteOrganization": deleteOrganization])
    }

    public var deleteOrganization: Bool {
      get {
        return resultMap["deleteOrganization"]! as! Bool
      }
      set {
        resultMap.updateValue(newValue, forKey: "deleteOrganization")
      }
    }
  }
}

public final class OrganizationMemberRemoveMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation OrganizationMemberRemove($userId: ID!, $organizationId: ID!) {\n  betaOrganizationMemberRemove(userId: $userId, organizationId: $organizationId) {\n    __typename\n    id\n  }\n}"

  public var userId: GraphQLID
  public var organizationId: GraphQLID

  public init(userId: GraphQLID, organizationId: GraphQLID) {
    self.userId = userId
    self.organizationId = organizationId
  }

  public var variables: GraphQLMap? {
    return ["userId": userId, "organizationId": organizationId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("betaOrganizationMemberRemove", arguments: ["userId": GraphQLVariable("userId"), "organizationId": GraphQLVariable("organizationId")], type: .nonNull(.object(BetaOrganizationMemberRemove.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(betaOrganizationMemberRemove: BetaOrganizationMemberRemove) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "betaOrganizationMemberRemove": betaOrganizationMemberRemove.resultMap])
    }

    public var betaOrganizationMemberRemove: BetaOrganizationMemberRemove {
      get {
        return BetaOrganizationMemberRemove(unsafeResultMap: resultMap["betaOrganizationMemberRemove"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "betaOrganizationMemberRemove")
      }
    }

    public struct BetaOrganizationMemberRemove: GraphQLSelectionSet {
      public static let possibleTypes = ["Organization"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID) {
        self.init(unsafeResultMap: ["__typename": "Organization", "id": id])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }
    }
  }
}

public final class OrganizationActivateByInviteMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation OrganizationActivateByInvite($inviteKey: String!) {\n  joinAppInvite(key: $inviteKey)\n}"

  public var inviteKey: String

  public init(inviteKey: String) {
    self.inviteKey = inviteKey
  }

  public var variables: GraphQLMap? {
    return ["inviteKey": inviteKey]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("joinAppInvite", arguments: ["key": GraphQLVariable("inviteKey")], type: .nonNull(.scalar(GraphQLID.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(joinAppInvite: GraphQLID) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "joinAppInvite": joinAppInvite])
    }

    public var joinAppInvite: GraphQLID {
      get {
        return resultMap["joinAppInvite"]! as! GraphQLID
      }
      set {
        resultMap.updateValue(newValue, forKey: "joinAppInvite")
      }
    }
  }
}

public final class OrganizationAlterPublishedMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation OrganizationAlterPublished($organizationId: ID!, $published: Boolean!) {\n  alphaAlterPublished(id: $organizationId, published: $published) {\n    __typename\n    ...OrganizationSearch\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(OrganizationSearch.fragmentDefinition) }

  public var organizationId: GraphQLID
  public var published: Bool

  public init(organizationId: GraphQLID, published: Bool) {
    self.organizationId = organizationId
    self.published = published
  }

  public var variables: GraphQLMap? {
    return ["organizationId": organizationId, "published": published]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("alphaAlterPublished", arguments: ["id": GraphQLVariable("organizationId"), "published": GraphQLVariable("published")], type: .nonNull(.object(AlphaAlterPublished.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(alphaAlterPublished: AlphaAlterPublished) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "alphaAlterPublished": alphaAlterPublished.resultMap])
    }

    public var alphaAlterPublished: AlphaAlterPublished {
      get {
        return AlphaAlterPublished(unsafeResultMap: resultMap["alphaAlterPublished"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "alphaAlterPublished")
      }
    }

    public struct AlphaAlterPublished: GraphQLSelectionSet {
      public static let possibleTypes = ["Organization"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(OrganizationSearch.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var organizationSearch: OrganizationSearch {
          get {
            return OrganizationSearch(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public final class OrganizationByPrefixQuery: GraphQLQuery {
  public let operationDefinition =
    "query OrganizationByPrefix($query: String!) {\n  organizationByPrefix: alphaOrganizationByPrefix(query: $query) {\n    __typename\n    ...OrganizationSearch\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(OrganizationSearch.fragmentDefinition) }

  public var query: String

  public init(query: String) {
    self.query = query
  }

  public var variables: GraphQLMap? {
    return ["query": query]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("alphaOrganizationByPrefix", alias: "organizationByPrefix", arguments: ["query": GraphQLVariable("query")], type: .object(OrganizationByPrefix.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(organizationByPrefix: OrganizationByPrefix? = nil) {
      self.init(unsafeResultMap: ["__typename": "Query", "organizationByPrefix": organizationByPrefix.flatMap { (value: OrganizationByPrefix) -> ResultMap in value.resultMap }])
    }

    public var organizationByPrefix: OrganizationByPrefix? {
      get {
        return (resultMap["organizationByPrefix"] as? ResultMap).flatMap { OrganizationByPrefix(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "organizationByPrefix")
      }
    }

    public struct OrganizationByPrefix: GraphQLSelectionSet {
      public static let possibleTypes = ["Organization"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(OrganizationSearch.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var organizationSearch: OrganizationSearch {
          get {
            return OrganizationSearch(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public final class PermissionsQuery: GraphQLQuery {
  public let operationDefinition =
    "query Permissions {\n  myPermissions {\n    __typename\n    roles\n  }\n}"

  public init() {
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("myPermissions", type: .nonNull(.object(MyPermission.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(myPermissions: MyPermission) {
      self.init(unsafeResultMap: ["__typename": "Query", "myPermissions": myPermissions.resultMap])
    }

    public var myPermissions: MyPermission {
      get {
        return MyPermission(unsafeResultMap: resultMap["myPermissions"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "myPermissions")
      }
    }

    public struct MyPermission: GraphQLSelectionSet {
      public static let possibleTypes = ["Permissions"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("roles", type: .nonNull(.list(.nonNull(.scalar(String.self))))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(roles: [String]) {
        self.init(unsafeResultMap: ["__typename": "Permissions", "roles": roles])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var roles: [String] {
        get {
          return resultMap["roles"]! as! [String]
        }
        set {
          resultMap.updateValue(newValue, forKey: "roles")
        }
      }
    }
  }
}

public final class DebugMailsMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation DebugMails($type: DebugEmailType!) {\n  debugSendEmail(type: $type)\n}"

  public var type: DebugEmailType

  public init(type: DebugEmailType) {
    self.type = type
  }

  public var variables: GraphQLMap? {
    return ["type": type]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("debugSendEmail", arguments: ["type": GraphQLVariable("type")], type: .scalar(Bool.self)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(debugSendEmail: Bool? = nil) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "debugSendEmail": debugSendEmail])
    }

    public var debugSendEmail: Bool? {
      get {
        return resultMap["debugSendEmail"] as? Bool
      }
      set {
        resultMap.updateValue(newValue, forKey: "debugSendEmail")
      }
    }
  }
}

public final class SuperAdminsQuery: GraphQLQuery {
  public let operationDefinition =
    "query SuperAdmins {\n  superAdmins {\n    __typename\n    role\n    user {\n      __typename\n      ...UserShort\n    }\n    email\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(UserShort.fragmentDefinition).appending(OrganizationShort.fragmentDefinition) }

  public init() {
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("superAdmins", type: .nonNull(.list(.nonNull(.object(SuperAdmin.selections))))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(superAdmins: [SuperAdmin]) {
      self.init(unsafeResultMap: ["__typename": "Query", "superAdmins": superAdmins.map { (value: SuperAdmin) -> ResultMap in value.resultMap }])
    }

    public var superAdmins: [SuperAdmin] {
      get {
        return (resultMap["superAdmins"] as! [ResultMap]).map { (value: ResultMap) -> SuperAdmin in SuperAdmin(unsafeResultMap: value) }
      }
      set {
        resultMap.updateValue(newValue.map { (value: SuperAdmin) -> ResultMap in value.resultMap }, forKey: "superAdmins")
      }
    }

    public struct SuperAdmin: GraphQLSelectionSet {
      public static let possibleTypes = ["SuperAdmin"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("role", type: .nonNull(.scalar(SuperAdminRole.self))),
        GraphQLField("user", type: .nonNull(.object(User.selections))),
        GraphQLField("email", type: .scalar(String.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(role: SuperAdminRole, user: User, email: String? = nil) {
        self.init(unsafeResultMap: ["__typename": "SuperAdmin", "role": role, "user": user.resultMap, "email": email])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var role: SuperAdminRole {
        get {
          return resultMap["role"]! as! SuperAdminRole
        }
        set {
          resultMap.updateValue(newValue, forKey: "role")
        }
      }

      public var user: User {
        get {
          return User(unsafeResultMap: resultMap["user"]! as! ResultMap)
        }
        set {
          resultMap.updateValue(newValue.resultMap, forKey: "user")
        }
      }

      public var email: String? {
        get {
          return resultMap["email"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "email")
        }
      }

      public struct User: GraphQLSelectionSet {
        public static let possibleTypes = ["User"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLFragmentSpread(UserShort.self),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var fragments: Fragments {
          get {
            return Fragments(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }

        public struct Fragments {
          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public var userShort: UserShort {
            get {
              return UserShort(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }
        }
      }
    }
  }
}

public final class SuperAccountsQuery: GraphQLQuery {
  public let operationDefinition =
    "query SuperAccounts {\n  superAccounts {\n    __typename\n    id\n    orgId\n    title\n    state\n  }\n}"

  public init() {
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("superAccounts", type: .nonNull(.list(.nonNull(.object(SuperAccount.selections))))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(superAccounts: [SuperAccount]) {
      self.init(unsafeResultMap: ["__typename": "Query", "superAccounts": superAccounts.map { (value: SuperAccount) -> ResultMap in value.resultMap }])
    }

    public var superAccounts: [SuperAccount] {
      get {
        return (resultMap["superAccounts"] as! [ResultMap]).map { (value: ResultMap) -> SuperAccount in SuperAccount(unsafeResultMap: value) }
      }
      set {
        resultMap.updateValue(newValue.map { (value: SuperAccount) -> ResultMap in value.resultMap }, forKey: "superAccounts")
      }
    }

    public struct SuperAccount: GraphQLSelectionSet {
      public static let possibleTypes = ["SuperAccount"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("orgId", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("title", type: .nonNull(.scalar(String.self))),
        GraphQLField("state", type: .nonNull(.scalar(SuperAccountState.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, orgId: GraphQLID, title: String, state: SuperAccountState) {
        self.init(unsafeResultMap: ["__typename": "SuperAccount", "id": id, "orgId": orgId, "title": title, "state": state])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var orgId: GraphQLID {
        get {
          return resultMap["orgId"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "orgId")
        }
      }

      public var title: String {
        get {
          return resultMap["title"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "title")
        }
      }

      public var state: SuperAccountState {
        get {
          return resultMap["state"]! as! SuperAccountState
        }
        set {
          resultMap.updateValue(newValue, forKey: "state")
        }
      }
    }
  }
}

public final class SuperAccountQuery: GraphQLQuery {
  public let operationDefinition =
    "query SuperAccount($accountId: ID!, $viaOrgId: Boolean) {\n  superAccount(id: $accountId, viaOrgId: $viaOrgId) {\n    __typename\n    id\n    title\n    state\n    members {\n      __typename\n      ...UserShort\n    }\n    features {\n      __typename\n      id\n      key\n      title\n    }\n    orgId\n    createdAt\n    createdBy {\n      __typename\n      name\n    }\n    published: alphaPublished\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(UserShort.fragmentDefinition).appending(OrganizationShort.fragmentDefinition) }

  public var accountId: GraphQLID
  public var viaOrgId: Bool?

  public init(accountId: GraphQLID, viaOrgId: Bool? = nil) {
    self.accountId = accountId
    self.viaOrgId = viaOrgId
  }

  public var variables: GraphQLMap? {
    return ["accountId": accountId, "viaOrgId": viaOrgId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("superAccount", arguments: ["id": GraphQLVariable("accountId"), "viaOrgId": GraphQLVariable("viaOrgId")], type: .nonNull(.object(SuperAccount.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(superAccount: SuperAccount) {
      self.init(unsafeResultMap: ["__typename": "Query", "superAccount": superAccount.resultMap])
    }

    public var superAccount: SuperAccount {
      get {
        return SuperAccount(unsafeResultMap: resultMap["superAccount"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "superAccount")
      }
    }

    public struct SuperAccount: GraphQLSelectionSet {
      public static let possibleTypes = ["SuperAccount"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("title", type: .nonNull(.scalar(String.self))),
        GraphQLField("state", type: .nonNull(.scalar(SuperAccountState.self))),
        GraphQLField("members", type: .nonNull(.list(.nonNull(.object(Member.selections))))),
        GraphQLField("features", type: .nonNull(.list(.nonNull(.object(Feature.selections))))),
        GraphQLField("orgId", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("createdAt", type: .scalar(String.self)),
        GraphQLField("createdBy", type: .object(CreatedBy.selections)),
        GraphQLField("alphaPublished", alias: "published", type: .nonNull(.scalar(Bool.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, title: String, state: SuperAccountState, members: [Member], features: [Feature], orgId: GraphQLID, createdAt: String? = nil, createdBy: CreatedBy? = nil, published: Bool) {
        self.init(unsafeResultMap: ["__typename": "SuperAccount", "id": id, "title": title, "state": state, "members": members.map { (value: Member) -> ResultMap in value.resultMap }, "features": features.map { (value: Feature) -> ResultMap in value.resultMap }, "orgId": orgId, "createdAt": createdAt, "createdBy": createdBy.flatMap { (value: CreatedBy) -> ResultMap in value.resultMap }, "published": published])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var title: String {
        get {
          return resultMap["title"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "title")
        }
      }

      public var state: SuperAccountState {
        get {
          return resultMap["state"]! as! SuperAccountState
        }
        set {
          resultMap.updateValue(newValue, forKey: "state")
        }
      }

      public var members: [Member] {
        get {
          return (resultMap["members"] as! [ResultMap]).map { (value: ResultMap) -> Member in Member(unsafeResultMap: value) }
        }
        set {
          resultMap.updateValue(newValue.map { (value: Member) -> ResultMap in value.resultMap }, forKey: "members")
        }
      }

      public var features: [Feature] {
        get {
          return (resultMap["features"] as! [ResultMap]).map { (value: ResultMap) -> Feature in Feature(unsafeResultMap: value) }
        }
        set {
          resultMap.updateValue(newValue.map { (value: Feature) -> ResultMap in value.resultMap }, forKey: "features")
        }
      }

      public var orgId: GraphQLID {
        get {
          return resultMap["orgId"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "orgId")
        }
      }

      public var createdAt: String? {
        get {
          return resultMap["createdAt"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "createdAt")
        }
      }

      public var createdBy: CreatedBy? {
        get {
          return (resultMap["createdBy"] as? ResultMap).flatMap { CreatedBy(unsafeResultMap: $0) }
        }
        set {
          resultMap.updateValue(newValue?.resultMap, forKey: "createdBy")
        }
      }

      public var published: Bool {
        get {
          return resultMap["published"]! as! Bool
        }
        set {
          resultMap.updateValue(newValue, forKey: "published")
        }
      }

      public struct Member: GraphQLSelectionSet {
        public static let possibleTypes = ["User"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLFragmentSpread(UserShort.self),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var fragments: Fragments {
          get {
            return Fragments(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }

        public struct Fragments {
          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public var userShort: UserShort {
            get {
              return UserShort(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }
        }
      }

      public struct Feature: GraphQLSelectionSet {
        public static let possibleTypes = ["FeatureFlag"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
          GraphQLField("key", type: .nonNull(.scalar(String.self))),
          GraphQLField("title", type: .nonNull(.scalar(String.self))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(id: GraphQLID, key: String, title: String) {
          self.init(unsafeResultMap: ["__typename": "FeatureFlag", "id": id, "key": key, "title": title])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var id: GraphQLID {
          get {
            return resultMap["id"]! as! GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "id")
          }
        }

        public var key: String {
          get {
            return resultMap["key"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "key")
          }
        }

        public var title: String {
          get {
            return resultMap["title"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "title")
          }
        }
      }

      public struct CreatedBy: GraphQLSelectionSet {
        public static let possibleTypes = ["User"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("name", type: .nonNull(.scalar(String.self))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(name: String) {
          self.init(unsafeResultMap: ["__typename": "User", "name": name])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var name: String {
          get {
            return resultMap["name"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "name")
          }
        }
      }
    }
  }
}

public final class SuperAccountRenameMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation SuperAccountRename($accountId: ID!, $title: String!) {\n  superAccountRename(id: $accountId, title: $title) {\n    __typename\n    id\n    title\n  }\n}"

  public var accountId: GraphQLID
  public var title: String

  public init(accountId: GraphQLID, title: String) {
    self.accountId = accountId
    self.title = title
  }

  public var variables: GraphQLMap? {
    return ["accountId": accountId, "title": title]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("superAccountRename", arguments: ["id": GraphQLVariable("accountId"), "title": GraphQLVariable("title")], type: .nonNull(.object(SuperAccountRename.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(superAccountRename: SuperAccountRename) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "superAccountRename": superAccountRename.resultMap])
    }

    public var superAccountRename: SuperAccountRename {
      get {
        return SuperAccountRename(unsafeResultMap: resultMap["superAccountRename"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "superAccountRename")
      }
    }

    public struct SuperAccountRename: GraphQLSelectionSet {
      public static let possibleTypes = ["SuperAccount"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("title", type: .nonNull(.scalar(String.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, title: String) {
        self.init(unsafeResultMap: ["__typename": "SuperAccount", "id": id, "title": title])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var title: String {
        get {
          return resultMap["title"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "title")
        }
      }
    }
  }
}

public final class SuperAccountActivateMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation SuperAccountActivate($accountId: ID!) {\n  superAccountActivate(id: $accountId) {\n    __typename\n    id\n    state\n  }\n}"

  public var accountId: GraphQLID

  public init(accountId: GraphQLID) {
    self.accountId = accountId
  }

  public var variables: GraphQLMap? {
    return ["accountId": accountId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("superAccountActivate", arguments: ["id": GraphQLVariable("accountId")], type: .nonNull(.object(SuperAccountActivate.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(superAccountActivate: SuperAccountActivate) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "superAccountActivate": superAccountActivate.resultMap])
    }

    public var superAccountActivate: SuperAccountActivate {
      get {
        return SuperAccountActivate(unsafeResultMap: resultMap["superAccountActivate"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "superAccountActivate")
      }
    }

    public struct SuperAccountActivate: GraphQLSelectionSet {
      public static let possibleTypes = ["SuperAccount"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("state", type: .nonNull(.scalar(SuperAccountState.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, state: SuperAccountState) {
        self.init(unsafeResultMap: ["__typename": "SuperAccount", "id": id, "state": state])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var state: SuperAccountState {
        get {
          return resultMap["state"]! as! SuperAccountState
        }
        set {
          resultMap.updateValue(newValue, forKey: "state")
        }
      }
    }
  }
}

public final class SuperAccountSuspendMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation SuperAccountSuspend($accountId: ID!) {\n  superAccountSuspend(id: $accountId) {\n    __typename\n    id\n    state\n  }\n}"

  public var accountId: GraphQLID

  public init(accountId: GraphQLID) {
    self.accountId = accountId
  }

  public var variables: GraphQLMap? {
    return ["accountId": accountId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("superAccountSuspend", arguments: ["id": GraphQLVariable("accountId")], type: .nonNull(.object(SuperAccountSuspend.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(superAccountSuspend: SuperAccountSuspend) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "superAccountSuspend": superAccountSuspend.resultMap])
    }

    public var superAccountSuspend: SuperAccountSuspend {
      get {
        return SuperAccountSuspend(unsafeResultMap: resultMap["superAccountSuspend"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "superAccountSuspend")
      }
    }

    public struct SuperAccountSuspend: GraphQLSelectionSet {
      public static let possibleTypes = ["SuperAccount"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("state", type: .nonNull(.scalar(SuperAccountState.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, state: SuperAccountState) {
        self.init(unsafeResultMap: ["__typename": "SuperAccount", "id": id, "state": state])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var state: SuperAccountState {
        get {
          return resultMap["state"]! as! SuperAccountState
        }
        set {
          resultMap.updateValue(newValue, forKey: "state")
        }
      }
    }
  }
}

public final class SuperAccountPendMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation SuperAccountPend($accountId: ID!) {\n  superAccountPend(id: $accountId) {\n    __typename\n    id\n    state\n  }\n}"

  public var accountId: GraphQLID

  public init(accountId: GraphQLID) {
    self.accountId = accountId
  }

  public var variables: GraphQLMap? {
    return ["accountId": accountId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("superAccountPend", arguments: ["id": GraphQLVariable("accountId")], type: .nonNull(.object(SuperAccountPend.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(superAccountPend: SuperAccountPend) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "superAccountPend": superAccountPend.resultMap])
    }

    public var superAccountPend: SuperAccountPend {
      get {
        return SuperAccountPend(unsafeResultMap: resultMap["superAccountPend"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "superAccountPend")
      }
    }

    public struct SuperAccountPend: GraphQLSelectionSet {
      public static let possibleTypes = ["SuperAccount"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("state", type: .nonNull(.scalar(SuperAccountState.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, state: SuperAccountState) {
        self.init(unsafeResultMap: ["__typename": "SuperAccount", "id": id, "state": state])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var state: SuperAccountState {
        get {
          return resultMap["state"]! as! SuperAccountState
        }
        set {
          resultMap.updateValue(newValue, forKey: "state")
        }
      }
    }
  }
}

public final class SuperAccountAddMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation SuperAccountAdd($title: String!) {\n  superAccountAdd(title: $title) {\n    __typename\n    id\n  }\n}"

  public var title: String

  public init(title: String) {
    self.title = title
  }

  public var variables: GraphQLMap? {
    return ["title": title]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("superAccountAdd", arguments: ["title": GraphQLVariable("title")], type: .nonNull(.object(SuperAccountAdd.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(superAccountAdd: SuperAccountAdd) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "superAccountAdd": superAccountAdd.resultMap])
    }

    public var superAccountAdd: SuperAccountAdd {
      get {
        return SuperAccountAdd(unsafeResultMap: resultMap["superAccountAdd"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "superAccountAdd")
      }
    }

    public struct SuperAccountAdd: GraphQLSelectionSet {
      public static let possibleTypes = ["SuperAccount"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID) {
        self.init(unsafeResultMap: ["__typename": "SuperAccount", "id": id])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }
    }
  }
}

public final class SuperAccountMemberAddMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation SuperAccountMemberAdd($accountId: ID!, $userId: ID!) {\n  superAccountMemberAdd(id: $accountId, userId: $userId) {\n    __typename\n    id\n    members {\n      __typename\n      ...UserShort\n    }\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(UserShort.fragmentDefinition).appending(OrganizationShort.fragmentDefinition) }

  public var accountId: GraphQLID
  public var userId: GraphQLID

  public init(accountId: GraphQLID, userId: GraphQLID) {
    self.accountId = accountId
    self.userId = userId
  }

  public var variables: GraphQLMap? {
    return ["accountId": accountId, "userId": userId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("superAccountMemberAdd", arguments: ["id": GraphQLVariable("accountId"), "userId": GraphQLVariable("userId")], type: .nonNull(.object(SuperAccountMemberAdd.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(superAccountMemberAdd: SuperAccountMemberAdd) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "superAccountMemberAdd": superAccountMemberAdd.resultMap])
    }

    public var superAccountMemberAdd: SuperAccountMemberAdd {
      get {
        return SuperAccountMemberAdd(unsafeResultMap: resultMap["superAccountMemberAdd"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "superAccountMemberAdd")
      }
    }

    public struct SuperAccountMemberAdd: GraphQLSelectionSet {
      public static let possibleTypes = ["SuperAccount"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("members", type: .nonNull(.list(.nonNull(.object(Member.selections))))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, members: [Member]) {
        self.init(unsafeResultMap: ["__typename": "SuperAccount", "id": id, "members": members.map { (value: Member) -> ResultMap in value.resultMap }])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var members: [Member] {
        get {
          return (resultMap["members"] as! [ResultMap]).map { (value: ResultMap) -> Member in Member(unsafeResultMap: value) }
        }
        set {
          resultMap.updateValue(newValue.map { (value: Member) -> ResultMap in value.resultMap }, forKey: "members")
        }
      }

      public struct Member: GraphQLSelectionSet {
        public static let possibleTypes = ["User"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLFragmentSpread(UserShort.self),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var fragments: Fragments {
          get {
            return Fragments(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }

        public struct Fragments {
          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public var userShort: UserShort {
            get {
              return UserShort(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }
        }
      }
    }
  }
}

public final class SuperAccountMemberRemoveMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation SuperAccountMemberRemove($accountId: ID!, $userId: ID!) {\n  superAccountMemberRemove(id: $accountId, userId: $userId) {\n    __typename\n    id\n    members {\n      __typename\n      ...UserShort\n    }\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(UserShort.fragmentDefinition).appending(OrganizationShort.fragmentDefinition) }

  public var accountId: GraphQLID
  public var userId: GraphQLID

  public init(accountId: GraphQLID, userId: GraphQLID) {
    self.accountId = accountId
    self.userId = userId
  }

  public var variables: GraphQLMap? {
    return ["accountId": accountId, "userId": userId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("superAccountMemberRemove", arguments: ["id": GraphQLVariable("accountId"), "userId": GraphQLVariable("userId")], type: .nonNull(.object(SuperAccountMemberRemove.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(superAccountMemberRemove: SuperAccountMemberRemove) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "superAccountMemberRemove": superAccountMemberRemove.resultMap])
    }

    public var superAccountMemberRemove: SuperAccountMemberRemove {
      get {
        return SuperAccountMemberRemove(unsafeResultMap: resultMap["superAccountMemberRemove"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "superAccountMemberRemove")
      }
    }

    public struct SuperAccountMemberRemove: GraphQLSelectionSet {
      public static let possibleTypes = ["SuperAccount"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("members", type: .nonNull(.list(.nonNull(.object(Member.selections))))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, members: [Member]) {
        self.init(unsafeResultMap: ["__typename": "SuperAccount", "id": id, "members": members.map { (value: Member) -> ResultMap in value.resultMap }])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var members: [Member] {
        get {
          return (resultMap["members"] as! [ResultMap]).map { (value: ResultMap) -> Member in Member(unsafeResultMap: value) }
        }
        set {
          resultMap.updateValue(newValue.map { (value: Member) -> ResultMap in value.resultMap }, forKey: "members")
        }
      }

      public struct Member: GraphQLSelectionSet {
        public static let possibleTypes = ["User"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLFragmentSpread(UserShort.self),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var fragments: Fragments {
          get {
            return Fragments(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }

        public struct Fragments {
          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public var userShort: UserShort {
            get {
              return UserShort(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }
        }
      }
    }
  }
}

public final class SuperAdminAddMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation SuperAdminAdd($userId: ID!, $role: SuperAdminRole!) {\n  superAdminAdd(userId: $userId, role: $role)\n}"

  public var userId: GraphQLID
  public var role: SuperAdminRole

  public init(userId: GraphQLID, role: SuperAdminRole) {
    self.userId = userId
    self.role = role
  }

  public var variables: GraphQLMap? {
    return ["userId": userId, "role": role]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("superAdminAdd", arguments: ["userId": GraphQLVariable("userId"), "role": GraphQLVariable("role")], type: .nonNull(.scalar(String.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(superAdminAdd: String) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "superAdminAdd": superAdminAdd])
    }

    public var superAdminAdd: String {
      get {
        return resultMap["superAdminAdd"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "superAdminAdd")
      }
    }
  }
}

public final class SuperAdminRemoveMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation SuperAdminRemove($userId: ID!) {\n  superAdminRemove(userId: $userId)\n}"

  public var userId: GraphQLID

  public init(userId: GraphQLID) {
    self.userId = userId
  }

  public var variables: GraphQLMap? {
    return ["userId": userId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("superAdminRemove", arguments: ["userId": GraphQLVariable("userId")], type: .nonNull(.scalar(String.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(superAdminRemove: String) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "superAdminRemove": superAdminRemove])
    }

    public var superAdminRemove: String {
      get {
        return resultMap["superAdminRemove"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "superAdminRemove")
      }
    }
  }
}

public final class ProfileQuery: GraphQLQuery {
  public let operationDefinition =
    "query Profile {\n  user: me {\n    __typename\n    id\n    shortname\n  }\n  profile: myProfile {\n    __typename\n    id\n    firstName\n    lastName\n    photoRef {\n      __typename\n      uuid\n      crop {\n        __typename\n        x\n        y\n        w\n        h\n      }\n    }\n    email\n    phone\n    website\n    about\n    location\n    role: alphaRole\n    linkedin: alphaLinkedin\n    primaryOrganization {\n      __typename\n      id\n      name\n    }\n    joinedAt: alphaJoinedAt\n    invitedBy: alphaInvitedBy {\n      __typename\n      name\n    }\n  }\n}"

  public init() {
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("me", alias: "user", type: .object(User.selections)),
      GraphQLField("myProfile", alias: "profile", type: .object(Profile.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(user: User? = nil, profile: Profile? = nil) {
      self.init(unsafeResultMap: ["__typename": "Query", "user": user.flatMap { (value: User) -> ResultMap in value.resultMap }, "profile": profile.flatMap { (value: Profile) -> ResultMap in value.resultMap }])
    }

    public var user: User? {
      get {
        return (resultMap["user"] as? ResultMap).flatMap { User(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "user")
      }
    }

    public var profile: Profile? {
      get {
        return (resultMap["profile"] as? ResultMap).flatMap { Profile(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "profile")
      }
    }

    public struct User: GraphQLSelectionSet {
      public static let possibleTypes = ["User"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("shortname", type: .scalar(String.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, shortname: String? = nil) {
        self.init(unsafeResultMap: ["__typename": "User", "id": id, "shortname": shortname])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var shortname: String? {
        get {
          return resultMap["shortname"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "shortname")
        }
      }
    }

    public struct Profile: GraphQLSelectionSet {
      public static let possibleTypes = ["Profile"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("firstName", type: .scalar(String.self)),
        GraphQLField("lastName", type: .scalar(String.self)),
        GraphQLField("photoRef", type: .object(PhotoRef.selections)),
        GraphQLField("email", type: .scalar(String.self)),
        GraphQLField("phone", type: .scalar(String.self)),
        GraphQLField("website", type: .scalar(String.self)),
        GraphQLField("about", type: .scalar(String.self)),
        GraphQLField("location", type: .scalar(String.self)),
        GraphQLField("alphaRole", alias: "role", type: .scalar(String.self)),
        GraphQLField("alphaLinkedin", alias: "linkedin", type: .scalar(String.self)),
        GraphQLField("primaryOrganization", type: .object(PrimaryOrganization.selections)),
        GraphQLField("alphaJoinedAt", alias: "joinedAt", type: .scalar(String.self)),
        GraphQLField("alphaInvitedBy", alias: "invitedBy", type: .object(InvitedBy.selections)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, firstName: String? = nil, lastName: String? = nil, photoRef: PhotoRef? = nil, email: String? = nil, phone: String? = nil, website: String? = nil, about: String? = nil, location: String? = nil, role: String? = nil, linkedin: String? = nil, primaryOrganization: PrimaryOrganization? = nil, joinedAt: String? = nil, invitedBy: InvitedBy? = nil) {
        self.init(unsafeResultMap: ["__typename": "Profile", "id": id, "firstName": firstName, "lastName": lastName, "photoRef": photoRef.flatMap { (value: PhotoRef) -> ResultMap in value.resultMap }, "email": email, "phone": phone, "website": website, "about": about, "location": location, "role": role, "linkedin": linkedin, "primaryOrganization": primaryOrganization.flatMap { (value: PrimaryOrganization) -> ResultMap in value.resultMap }, "joinedAt": joinedAt, "invitedBy": invitedBy.flatMap { (value: InvitedBy) -> ResultMap in value.resultMap }])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var firstName: String? {
        get {
          return resultMap["firstName"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "firstName")
        }
      }

      public var lastName: String? {
        get {
          return resultMap["lastName"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "lastName")
        }
      }

      public var photoRef: PhotoRef? {
        get {
          return (resultMap["photoRef"] as? ResultMap).flatMap { PhotoRef(unsafeResultMap: $0) }
        }
        set {
          resultMap.updateValue(newValue?.resultMap, forKey: "photoRef")
        }
      }

      public var email: String? {
        get {
          return resultMap["email"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "email")
        }
      }

      public var phone: String? {
        get {
          return resultMap["phone"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "phone")
        }
      }

      public var website: String? {
        get {
          return resultMap["website"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "website")
        }
      }

      public var about: String? {
        get {
          return resultMap["about"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "about")
        }
      }

      public var location: String? {
        get {
          return resultMap["location"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "location")
        }
      }

      public var role: String? {
        get {
          return resultMap["role"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "role")
        }
      }

      /// Deprecated
      public var linkedin: String? {
        get {
          return resultMap["linkedin"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "linkedin")
        }
      }

      public var primaryOrganization: PrimaryOrganization? {
        get {
          return (resultMap["primaryOrganization"] as? ResultMap).flatMap { PrimaryOrganization(unsafeResultMap: $0) }
        }
        set {
          resultMap.updateValue(newValue?.resultMap, forKey: "primaryOrganization")
        }
      }

      public var joinedAt: String? {
        get {
          return resultMap["joinedAt"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "joinedAt")
        }
      }

      public var invitedBy: InvitedBy? {
        get {
          return (resultMap["invitedBy"] as? ResultMap).flatMap { InvitedBy(unsafeResultMap: $0) }
        }
        set {
          resultMap.updateValue(newValue?.resultMap, forKey: "invitedBy")
        }
      }

      public struct PhotoRef: GraphQLSelectionSet {
        public static let possibleTypes = ["ImageRef"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("uuid", type: .nonNull(.scalar(String.self))),
          GraphQLField("crop", type: .object(Crop.selections)),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(uuid: String, crop: Crop? = nil) {
          self.init(unsafeResultMap: ["__typename": "ImageRef", "uuid": uuid, "crop": crop.flatMap { (value: Crop) -> ResultMap in value.resultMap }])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var uuid: String {
          get {
            return resultMap["uuid"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "uuid")
          }
        }

        public var crop: Crop? {
          get {
            return (resultMap["crop"] as? ResultMap).flatMap { Crop(unsafeResultMap: $0) }
          }
          set {
            resultMap.updateValue(newValue?.resultMap, forKey: "crop")
          }
        }

        public struct Crop: GraphQLSelectionSet {
          public static let possibleTypes = ["ImageCrop"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("x", type: .nonNull(.scalar(Int.self))),
            GraphQLField("y", type: .nonNull(.scalar(Int.self))),
            GraphQLField("w", type: .nonNull(.scalar(Int.self))),
            GraphQLField("h", type: .nonNull(.scalar(Int.self))),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public init(x: Int, y: Int, w: Int, h: Int) {
            self.init(unsafeResultMap: ["__typename": "ImageCrop", "x": x, "y": y, "w": w, "h": h])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var x: Int {
            get {
              return resultMap["x"]! as! Int
            }
            set {
              resultMap.updateValue(newValue, forKey: "x")
            }
          }

          public var y: Int {
            get {
              return resultMap["y"]! as! Int
            }
            set {
              resultMap.updateValue(newValue, forKey: "y")
            }
          }

          public var w: Int {
            get {
              return resultMap["w"]! as! Int
            }
            set {
              resultMap.updateValue(newValue, forKey: "w")
            }
          }

          public var h: Int {
            get {
              return resultMap["h"]! as! Int
            }
            set {
              resultMap.updateValue(newValue, forKey: "h")
            }
          }
        }
      }

      public struct PrimaryOrganization: GraphQLSelectionSet {
        public static let possibleTypes = ["Organization"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
          GraphQLField("name", type: .nonNull(.scalar(String.self))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(id: GraphQLID, name: String) {
          self.init(unsafeResultMap: ["__typename": "Organization", "id": id, "name": name])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var id: GraphQLID {
          get {
            return resultMap["id"]! as! GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "id")
          }
        }

        public var name: String {
          get {
            return resultMap["name"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "name")
          }
        }
      }

      public struct InvitedBy: GraphQLSelectionSet {
        public static let possibleTypes = ["User"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("name", type: .nonNull(.scalar(String.self))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(name: String) {
          self.init(unsafeResultMap: ["__typename": "User", "name": name])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var name: String {
          get {
            return resultMap["name"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "name")
          }
        }
      }
    }
  }
}

public final class ProfileUpdateMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation ProfileUpdate($input: UpdateProfileInput!, $uid: ID) {\n  updateProfile(input: $input, uid: $uid) {\n    __typename\n    id\n    firstName\n    lastName\n    photoRef {\n      __typename\n      uuid\n      crop {\n        __typename\n        x\n        y\n        w\n        h\n      }\n    }\n    email\n    phone\n    website\n    about\n    location\n    role: alphaRole\n    linkedin: alphaLinkedin\n    primaryOrganizationId: alphaPrimaryOrganizationId\n    joinedAt: alphaJoinedAt\n    invitedBy: alphaInvitedBy {\n      __typename\n      name\n    }\n  }\n}"

  public var input: UpdateProfileInput
  public var uid: GraphQLID?

  public init(input: UpdateProfileInput, uid: GraphQLID? = nil) {
    self.input = input
    self.uid = uid
  }

  public var variables: GraphQLMap? {
    return ["input": input, "uid": uid]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("updateProfile", arguments: ["input": GraphQLVariable("input"), "uid": GraphQLVariable("uid")], type: .nonNull(.object(UpdateProfile.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(updateProfile: UpdateProfile) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "updateProfile": updateProfile.resultMap])
    }

    public var updateProfile: UpdateProfile {
      get {
        return UpdateProfile(unsafeResultMap: resultMap["updateProfile"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "updateProfile")
      }
    }

    public struct UpdateProfile: GraphQLSelectionSet {
      public static let possibleTypes = ["Profile"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("firstName", type: .scalar(String.self)),
        GraphQLField("lastName", type: .scalar(String.self)),
        GraphQLField("photoRef", type: .object(PhotoRef.selections)),
        GraphQLField("email", type: .scalar(String.self)),
        GraphQLField("phone", type: .scalar(String.self)),
        GraphQLField("website", type: .scalar(String.self)),
        GraphQLField("about", type: .scalar(String.self)),
        GraphQLField("location", type: .scalar(String.self)),
        GraphQLField("alphaRole", alias: "role", type: .scalar(String.self)),
        GraphQLField("alphaLinkedin", alias: "linkedin", type: .scalar(String.self)),
        GraphQLField("alphaPrimaryOrganizationId", alias: "primaryOrganizationId", type: .scalar(GraphQLID.self)),
        GraphQLField("alphaJoinedAt", alias: "joinedAt", type: .scalar(String.self)),
        GraphQLField("alphaInvitedBy", alias: "invitedBy", type: .object(InvitedBy.selections)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, firstName: String? = nil, lastName: String? = nil, photoRef: PhotoRef? = nil, email: String? = nil, phone: String? = nil, website: String? = nil, about: String? = nil, location: String? = nil, role: String? = nil, linkedin: String? = nil, primaryOrganizationId: GraphQLID? = nil, joinedAt: String? = nil, invitedBy: InvitedBy? = nil) {
        self.init(unsafeResultMap: ["__typename": "Profile", "id": id, "firstName": firstName, "lastName": lastName, "photoRef": photoRef.flatMap { (value: PhotoRef) -> ResultMap in value.resultMap }, "email": email, "phone": phone, "website": website, "about": about, "location": location, "role": role, "linkedin": linkedin, "primaryOrganizationId": primaryOrganizationId, "joinedAt": joinedAt, "invitedBy": invitedBy.flatMap { (value: InvitedBy) -> ResultMap in value.resultMap }])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var firstName: String? {
        get {
          return resultMap["firstName"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "firstName")
        }
      }

      public var lastName: String? {
        get {
          return resultMap["lastName"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "lastName")
        }
      }

      public var photoRef: PhotoRef? {
        get {
          return (resultMap["photoRef"] as? ResultMap).flatMap { PhotoRef(unsafeResultMap: $0) }
        }
        set {
          resultMap.updateValue(newValue?.resultMap, forKey: "photoRef")
        }
      }

      public var email: String? {
        get {
          return resultMap["email"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "email")
        }
      }

      public var phone: String? {
        get {
          return resultMap["phone"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "phone")
        }
      }

      public var website: String? {
        get {
          return resultMap["website"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "website")
        }
      }

      public var about: String? {
        get {
          return resultMap["about"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "about")
        }
      }

      public var location: String? {
        get {
          return resultMap["location"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "location")
        }
      }

      public var role: String? {
        get {
          return resultMap["role"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "role")
        }
      }

      /// Deprecated
      public var linkedin: String? {
        get {
          return resultMap["linkedin"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "linkedin")
        }
      }

      /// Deprecated
      public var primaryOrganizationId: GraphQLID? {
        get {
          return resultMap["primaryOrganizationId"] as? GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "primaryOrganizationId")
        }
      }

      public var joinedAt: String? {
        get {
          return resultMap["joinedAt"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "joinedAt")
        }
      }

      public var invitedBy: InvitedBy? {
        get {
          return (resultMap["invitedBy"] as? ResultMap).flatMap { InvitedBy(unsafeResultMap: $0) }
        }
        set {
          resultMap.updateValue(newValue?.resultMap, forKey: "invitedBy")
        }
      }

      public struct PhotoRef: GraphQLSelectionSet {
        public static let possibleTypes = ["ImageRef"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("uuid", type: .nonNull(.scalar(String.self))),
          GraphQLField("crop", type: .object(Crop.selections)),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(uuid: String, crop: Crop? = nil) {
          self.init(unsafeResultMap: ["__typename": "ImageRef", "uuid": uuid, "crop": crop.flatMap { (value: Crop) -> ResultMap in value.resultMap }])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var uuid: String {
          get {
            return resultMap["uuid"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "uuid")
          }
        }

        public var crop: Crop? {
          get {
            return (resultMap["crop"] as? ResultMap).flatMap { Crop(unsafeResultMap: $0) }
          }
          set {
            resultMap.updateValue(newValue?.resultMap, forKey: "crop")
          }
        }

        public struct Crop: GraphQLSelectionSet {
          public static let possibleTypes = ["ImageCrop"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("x", type: .nonNull(.scalar(Int.self))),
            GraphQLField("y", type: .nonNull(.scalar(Int.self))),
            GraphQLField("w", type: .nonNull(.scalar(Int.self))),
            GraphQLField("h", type: .nonNull(.scalar(Int.self))),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public init(x: Int, y: Int, w: Int, h: Int) {
            self.init(unsafeResultMap: ["__typename": "ImageCrop", "x": x, "y": y, "w": w, "h": h])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var x: Int {
            get {
              return resultMap["x"]! as! Int
            }
            set {
              resultMap.updateValue(newValue, forKey: "x")
            }
          }

          public var y: Int {
            get {
              return resultMap["y"]! as! Int
            }
            set {
              resultMap.updateValue(newValue, forKey: "y")
            }
          }

          public var w: Int {
            get {
              return resultMap["w"]! as! Int
            }
            set {
              resultMap.updateValue(newValue, forKey: "w")
            }
          }

          public var h: Int {
            get {
              return resultMap["h"]! as! Int
            }
            set {
              resultMap.updateValue(newValue, forKey: "h")
            }
          }
        }
      }

      public struct InvitedBy: GraphQLSelectionSet {
        public static let possibleTypes = ["User"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("name", type: .nonNull(.scalar(String.self))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(name: String) {
          self.init(unsafeResultMap: ["__typename": "User", "name": name])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var name: String {
          get {
            return resultMap["name"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "name")
          }
        }
      }
    }
  }
}

public final class SetUserShortnameMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation SetUserShortname($shortname: String!) {\n  alphaSetUserShortName(shortname: $shortname)\n}"

  public var shortname: String

  public init(shortname: String) {
    self.shortname = shortname
  }

  public var variables: GraphQLMap? {
    return ["shortname": shortname]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("alphaSetUserShortName", arguments: ["shortname": GraphQLVariable("shortname")], type: .scalar(String.self)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(alphaSetUserShortName: String? = nil) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "alphaSetUserShortName": alphaSetUserShortName])
    }

    public var alphaSetUserShortName: String? {
      get {
        return resultMap["alphaSetUserShortName"] as? String
      }
      set {
        resultMap.updateValue(newValue, forKey: "alphaSetUserShortName")
      }
    }
  }
}

public final class ProfileCreateMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation ProfileCreate($input: CreateProfileInput!) {\n  createProfile(input: $input) {\n    __typename\n    id\n    firstName\n    lastName\n    photoRef {\n      __typename\n      uuid\n      crop {\n        __typename\n        x\n        y\n        w\n        h\n      }\n    }\n    email\n    phone\n    website\n    about\n    location\n  }\n}"

  public var input: CreateProfileInput

  public init(input: CreateProfileInput) {
    self.input = input
  }

  public var variables: GraphQLMap? {
    return ["input": input]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("createProfile", arguments: ["input": GraphQLVariable("input")], type: .nonNull(.object(CreateProfile.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(createProfile: CreateProfile) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "createProfile": createProfile.resultMap])
    }

    /// Deprecated
    public var createProfile: CreateProfile {
      get {
        return CreateProfile(unsafeResultMap: resultMap["createProfile"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "createProfile")
      }
    }

    public struct CreateProfile: GraphQLSelectionSet {
      public static let possibleTypes = ["Profile"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("firstName", type: .scalar(String.self)),
        GraphQLField("lastName", type: .scalar(String.self)),
        GraphQLField("photoRef", type: .object(PhotoRef.selections)),
        GraphQLField("email", type: .scalar(String.self)),
        GraphQLField("phone", type: .scalar(String.self)),
        GraphQLField("website", type: .scalar(String.self)),
        GraphQLField("about", type: .scalar(String.self)),
        GraphQLField("location", type: .scalar(String.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, firstName: String? = nil, lastName: String? = nil, photoRef: PhotoRef? = nil, email: String? = nil, phone: String? = nil, website: String? = nil, about: String? = nil, location: String? = nil) {
        self.init(unsafeResultMap: ["__typename": "Profile", "id": id, "firstName": firstName, "lastName": lastName, "photoRef": photoRef.flatMap { (value: PhotoRef) -> ResultMap in value.resultMap }, "email": email, "phone": phone, "website": website, "about": about, "location": location])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var firstName: String? {
        get {
          return resultMap["firstName"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "firstName")
        }
      }

      public var lastName: String? {
        get {
          return resultMap["lastName"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "lastName")
        }
      }

      public var photoRef: PhotoRef? {
        get {
          return (resultMap["photoRef"] as? ResultMap).flatMap { PhotoRef(unsafeResultMap: $0) }
        }
        set {
          resultMap.updateValue(newValue?.resultMap, forKey: "photoRef")
        }
      }

      public var email: String? {
        get {
          return resultMap["email"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "email")
        }
      }

      public var phone: String? {
        get {
          return resultMap["phone"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "phone")
        }
      }

      public var website: String? {
        get {
          return resultMap["website"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "website")
        }
      }

      public var about: String? {
        get {
          return resultMap["about"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "about")
        }
      }

      public var location: String? {
        get {
          return resultMap["location"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "location")
        }
      }

      public struct PhotoRef: GraphQLSelectionSet {
        public static let possibleTypes = ["ImageRef"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("uuid", type: .nonNull(.scalar(String.self))),
          GraphQLField("crop", type: .object(Crop.selections)),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(uuid: String, crop: Crop? = nil) {
          self.init(unsafeResultMap: ["__typename": "ImageRef", "uuid": uuid, "crop": crop.flatMap { (value: Crop) -> ResultMap in value.resultMap }])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var uuid: String {
          get {
            return resultMap["uuid"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "uuid")
          }
        }

        public var crop: Crop? {
          get {
            return (resultMap["crop"] as? ResultMap).flatMap { Crop(unsafeResultMap: $0) }
          }
          set {
            resultMap.updateValue(newValue?.resultMap, forKey: "crop")
          }
        }

        public struct Crop: GraphQLSelectionSet {
          public static let possibleTypes = ["ImageCrop"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("x", type: .nonNull(.scalar(Int.self))),
            GraphQLField("y", type: .nonNull(.scalar(Int.self))),
            GraphQLField("w", type: .nonNull(.scalar(Int.self))),
            GraphQLField("h", type: .nonNull(.scalar(Int.self))),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public init(x: Int, y: Int, w: Int, h: Int) {
            self.init(unsafeResultMap: ["__typename": "ImageCrop", "x": x, "y": y, "w": w, "h": h])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var x: Int {
            get {
              return resultMap["x"]! as! Int
            }
            set {
              resultMap.updateValue(newValue, forKey: "x")
            }
          }

          public var y: Int {
            get {
              return resultMap["y"]! as! Int
            }
            set {
              resultMap.updateValue(newValue, forKey: "y")
            }
          }

          public var w: Int {
            get {
              return resultMap["w"]! as! Int
            }
            set {
              resultMap.updateValue(newValue, forKey: "w")
            }
          }

          public var h: Int {
            get {
              return resultMap["h"]! as! Int
            }
            set {
              resultMap.updateValue(newValue, forKey: "h")
            }
          }
        }
      }
    }
  }
}

public final class SettingsQuery: GraphQLQuery {
  public let operationDefinition =
    "query Settings {\n  settings {\n    __typename\n    ...SettingsFull\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(SettingsFull.fragmentDefinition) }

  public init() {
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("settings", type: .nonNull(.object(Setting.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(settings: Setting) {
      self.init(unsafeResultMap: ["__typename": "Query", "settings": settings.resultMap])
    }

    public var settings: Setting {
      get {
        return Setting(unsafeResultMap: resultMap["settings"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "settings")
      }
    }

    public struct Setting: GraphQLSelectionSet {
      public static let possibleTypes = ["Settings"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(SettingsFull.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, primaryEmail: String, emailFrequency: EmailFrequency, desktopNotifications: NotificationMessages, mobileNotifications: NotificationMessages, mobileAlert: Bool, mobileIncludeText: Bool) {
        self.init(unsafeResultMap: ["__typename": "Settings", "id": id, "primaryEmail": primaryEmail, "emailFrequency": emailFrequency, "desktopNotifications": desktopNotifications, "mobileNotifications": mobileNotifications, "mobileAlert": mobileAlert, "mobileIncludeText": mobileIncludeText])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var settingsFull: SettingsFull {
          get {
            return SettingsFull(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public final class SettingsUpdateMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation SettingsUpdate($input: UpdateSettingsInput) {\n  updateSettings(settings: $input) {\n    __typename\n    ...SettingsFull\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(SettingsFull.fragmentDefinition) }

  public var input: UpdateSettingsInput?

  public init(input: UpdateSettingsInput? = nil) {
    self.input = input
  }

  public var variables: GraphQLMap? {
    return ["input": input]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("updateSettings", arguments: ["settings": GraphQLVariable("input")], type: .nonNull(.object(UpdateSetting.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(updateSettings: UpdateSetting) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "updateSettings": updateSettings.resultMap])
    }

    /// Deprecated
    public var updateSettings: UpdateSetting {
      get {
        return UpdateSetting(unsafeResultMap: resultMap["updateSettings"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "updateSettings")
      }
    }

    public struct UpdateSetting: GraphQLSelectionSet {
      public static let possibleTypes = ["Settings"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(SettingsFull.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, primaryEmail: String, emailFrequency: EmailFrequency, desktopNotifications: NotificationMessages, mobileNotifications: NotificationMessages, mobileAlert: Bool, mobileIncludeText: Bool) {
        self.init(unsafeResultMap: ["__typename": "Settings", "id": id, "primaryEmail": primaryEmail, "emailFrequency": emailFrequency, "desktopNotifications": desktopNotifications, "mobileNotifications": mobileNotifications, "mobileAlert": mobileAlert, "mobileIncludeText": mobileIncludeText])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var settingsFull: SettingsFull {
          get {
            return SettingsFull(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public final class PersistEventsMutation: GraphQLMutation {
  public let operationDefinition =
    "mutation PersistEvents($did: String!, $events: [Event!]!) {\n  track(did: $did, events: $events)\n}"

  public var did: String
  public var events: [Event]

  public init(did: String, events: [Event]) {
    self.did = did
    self.events = events
  }

  public var variables: GraphQLMap? {
    return ["did": did, "events": events]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("track", arguments: ["did": GraphQLVariable("did"), "events": GraphQLVariable("events")], type: .nonNull(.scalar(String.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(track: String) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "track": track])
    }

    public var track: String {
      get {
        return resultMap["track"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "track")
      }
    }
  }
}

public final class UsersQuery: GraphQLQuery {
  public let operationDefinition =
    "query Users($query: String!) {\n  items: users(query: $query) {\n    __typename\n    id\n    title: name\n    subtitle: email\n  }\n}"

  public var query: String

  public init(query: String) {
    self.query = query
  }

  public var variables: GraphQLMap? {
    return ["query": query]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("users", alias: "items", arguments: ["query": GraphQLVariable("query")], type: .nonNull(.list(.nonNull(.object(Item.selections))))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(items: [Item]) {
      self.init(unsafeResultMap: ["__typename": "Query", "items": items.map { (value: Item) -> ResultMap in value.resultMap }])
    }

    /// Deprecated
    public var items: [Item] {
      get {
        return (resultMap["items"] as! [ResultMap]).map { (value: ResultMap) -> Item in Item(unsafeResultMap: value) }
      }
      set {
        resultMap.updateValue(newValue.map { (value: Item) -> ResultMap in value.resultMap }, forKey: "items")
      }
    }

    public struct Item: GraphQLSelectionSet {
      public static let possibleTypes = ["User"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("name", alias: "title", type: .nonNull(.scalar(String.self))),
        GraphQLField("email", alias: "subtitle", type: .scalar(String.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, title: String, subtitle: String? = nil) {
        self.init(unsafeResultMap: ["__typename": "User", "id": id, "title": title, "subtitle": subtitle])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var title: String {
        get {
          return resultMap["title"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "title")
        }
      }

      public var subtitle: String? {
        get {
          return resultMap["subtitle"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "subtitle")
        }
      }
    }
  }
}

public final class UserQuery: GraphQLQuery {
  public let operationDefinition =
    "query User($userId: ID!) {\n  user: user(id: $userId) {\n    __typename\n    ...UserFull\n  }\n  conversation: room(id: $userId) {\n    __typename\n    ... on PrivateRoom {\n      id\n      settings {\n        __typename\n        id\n        mute\n      }\n    }\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(UserFull.fragmentDefinition).appending(OrganizationShort.fragmentDefinition) }

  public var userId: GraphQLID

  public init(userId: GraphQLID) {
    self.userId = userId
  }

  public var variables: GraphQLMap? {
    return ["userId": userId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("user", alias: "user", arguments: ["id": GraphQLVariable("userId")], type: .nonNull(.object(User.selections))),
      GraphQLField("room", alias: "conversation", arguments: ["id": GraphQLVariable("userId")], type: .object(Conversation.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(user: User, conversation: Conversation? = nil) {
      self.init(unsafeResultMap: ["__typename": "Query", "user": user.resultMap, "conversation": conversation.flatMap { (value: Conversation) -> ResultMap in value.resultMap }])
    }

    public var user: User {
      get {
        return User(unsafeResultMap: resultMap["user"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "user")
      }
    }

    public var conversation: Conversation? {
      get {
        return (resultMap["conversation"] as? ResultMap).flatMap { Conversation(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "conversation")
      }
    }

    public struct User: GraphQLSelectionSet {
      public static let possibleTypes = ["User"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(UserFull.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var userFull: UserFull {
          get {
            return UserFull(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }

    public struct Conversation: GraphQLSelectionSet {
      public static let possibleTypes = ["PrivateRoom", "SharedRoom"]

      public static let selections: [GraphQLSelection] = [
        GraphQLTypeCase(
          variants: ["PrivateRoom": AsPrivateRoom.selections],
          default: [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          ]
        )
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public static func makeSharedRoom() -> Conversation {
        return Conversation(unsafeResultMap: ["__typename": "SharedRoom"])
      }

      public static func makePrivateRoom(id: GraphQLID, settings: AsPrivateRoom.Setting) -> Conversation {
        return Conversation(unsafeResultMap: ["__typename": "PrivateRoom", "id": id, "settings": settings.resultMap])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var asPrivateRoom: AsPrivateRoom? {
        get {
          if !AsPrivateRoom.possibleTypes.contains(__typename) { return nil }
          return AsPrivateRoom(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsPrivateRoom: GraphQLSelectionSet {
        public static let possibleTypes = ["PrivateRoom"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
          GraphQLField("settings", type: .nonNull(.object(Setting.selections))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(id: GraphQLID, settings: Setting) {
          self.init(unsafeResultMap: ["__typename": "PrivateRoom", "id": id, "settings": settings.resultMap])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var id: GraphQLID {
          get {
            return resultMap["id"]! as! GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "id")
          }
        }

        public var settings: Setting {
          get {
            return Setting(unsafeResultMap: resultMap["settings"]! as! ResultMap)
          }
          set {
            resultMap.updateValue(newValue.resultMap, forKey: "settings")
          }
        }

        public struct Setting: GraphQLSelectionSet {
          public static let possibleTypes = ["RoomUserNotificaionSettings"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
            GraphQLField("mute", type: .scalar(Bool.self)),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public init(id: GraphQLID, mute: Bool? = nil) {
            self.init(unsafeResultMap: ["__typename": "RoomUserNotificaionSettings", "id": id, "mute": mute])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var id: GraphQLID {
            get {
              return resultMap["id"]! as! GraphQLID
            }
            set {
              resultMap.updateValue(newValue, forKey: "id")
            }
          }

          public var mute: Bool? {
            get {
              return resultMap["mute"] as? Bool
            }
            set {
              resultMap.updateValue(newValue, forKey: "mute")
            }
          }
        }
      }
    }
  }
}

public final class OnlineQuery: GraphQLQuery {
  public let operationDefinition =
    "query Online($userId: ID!) {\n  user: user(id: $userId) {\n    __typename\n    id\n    online\n    lastSeen\n  }\n}"

  public var userId: GraphQLID

  public init(userId: GraphQLID) {
    self.userId = userId
  }

  public var variables: GraphQLMap? {
    return ["userId": userId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("user", alias: "user", arguments: ["id": GraphQLVariable("userId")], type: .nonNull(.object(User.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(user: User) {
      self.init(unsafeResultMap: ["__typename": "Query", "user": user.resultMap])
    }

    public var user: User {
      get {
        return User(unsafeResultMap: resultMap["user"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "user")
      }
    }

    public struct User: GraphQLSelectionSet {
      public static let possibleTypes = ["User"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("online", type: .nonNull(.scalar(Bool.self))),
        GraphQLField("lastSeen", type: .scalar(String.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, online: Bool, lastSeen: String? = nil) {
        self.init(unsafeResultMap: ["__typename": "User", "id": id, "online": online, "lastSeen": lastSeen])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var online: Bool {
        get {
          return resultMap["online"]! as! Bool
        }
        set {
          resultMap.updateValue(newValue, forKey: "online")
        }
      }

      public var lastSeen: String? {
        get {
          return resultMap["lastSeen"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "lastSeen")
        }
      }
    }
  }
}

public final class OnlineWatchSubscription: GraphQLSubscription {
  public let operationDefinition =
    "subscription OnlineWatch($conversations: [ID!]!) {\n  alphaSubscribeChatOnline(conversations: $conversations) {\n    __typename\n    user: user {\n      __typename\n      id\n      online\n      lastSeen\n    }\n    type\n    timeout\n  }\n}"

  public var conversations: [GraphQLID]

  public init(conversations: [GraphQLID]) {
    self.conversations = conversations
  }

  public var variables: GraphQLMap? {
    return ["conversations": conversations]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Subscription"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("alphaSubscribeChatOnline", arguments: ["conversations": GraphQLVariable("conversations")], type: .nonNull(.object(AlphaSubscribeChatOnline.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(alphaSubscribeChatOnline: AlphaSubscribeChatOnline) {
      self.init(unsafeResultMap: ["__typename": "Subscription", "alphaSubscribeChatOnline": alphaSubscribeChatOnline.resultMap])
    }

    public var alphaSubscribeChatOnline: AlphaSubscribeChatOnline {
      get {
        return AlphaSubscribeChatOnline(unsafeResultMap: resultMap["alphaSubscribeChatOnline"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "alphaSubscribeChatOnline")
      }
    }

    public struct AlphaSubscribeChatOnline: GraphQLSelectionSet {
      public static let possibleTypes = ["OnlineEvent"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("user", alias: "user", type: .nonNull(.object(User.selections))),
        GraphQLField("type", type: .nonNull(.scalar(String.self))),
        GraphQLField("timeout", type: .nonNull(.scalar(Int.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(user: User, type: String, timeout: Int) {
        self.init(unsafeResultMap: ["__typename": "OnlineEvent", "user": user.resultMap, "type": type, "timeout": timeout])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var user: User {
        get {
          return User(unsafeResultMap: resultMap["user"]! as! ResultMap)
        }
        set {
          resultMap.updateValue(newValue.resultMap, forKey: "user")
        }
      }

      public var type: String {
        get {
          return resultMap["type"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "type")
        }
      }

      public var timeout: Int {
        get {
          return resultMap["timeout"]! as! Int
        }
        set {
          resultMap.updateValue(newValue, forKey: "timeout")
        }
      }

      public struct User: GraphQLSelectionSet {
        public static let possibleTypes = ["User"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
          GraphQLField("online", type: .nonNull(.scalar(Bool.self))),
          GraphQLField("lastSeen", type: .scalar(String.self)),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(id: GraphQLID, online: Bool, lastSeen: String? = nil) {
          self.init(unsafeResultMap: ["__typename": "User", "id": id, "online": online, "lastSeen": lastSeen])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var id: GraphQLID {
          get {
            return resultMap["id"]! as! GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "id")
          }
        }

        public var online: Bool {
          get {
            return resultMap["online"]! as! Bool
          }
          set {
            resultMap.updateValue(newValue, forKey: "online")
          }
        }

        public var lastSeen: String? {
          get {
            return resultMap["lastSeen"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "lastSeen")
          }
        }
      }
    }
  }
}

public final class ExplorePeopleQuery: GraphQLQuery {
  public let operationDefinition =
    "query ExplorePeople($query: String, $sort: String, $page: Int, $after: String) {\n  items: userSearch(query: $query, sort: $sort, page: $page, first: 25, after: $after) {\n    __typename\n    edges {\n      __typename\n      node {\n        __typename\n        ...UserShort\n        isYou\n      }\n      cursor\n    }\n    pageInfo {\n      __typename\n      hasNextPage\n      hasPreviousPage\n      itemsCount\n      currentPage\n      pagesCount\n      openEnded\n    }\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(UserShort.fragmentDefinition).appending(OrganizationShort.fragmentDefinition) }

  public var query: String?
  public var sort: String?
  public var page: Int?
  public var after: String?

  public init(query: String? = nil, sort: String? = nil, page: Int? = nil, after: String? = nil) {
    self.query = query
    self.sort = sort
    self.page = page
    self.after = after
  }

  public var variables: GraphQLMap? {
    return ["query": query, "sort": sort, "page": page, "after": after]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("userSearch", alias: "items", arguments: ["query": GraphQLVariable("query"), "sort": GraphQLVariable("sort"), "page": GraphQLVariable("page"), "first": 25, "after": GraphQLVariable("after")], type: .nonNull(.object(Item.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(items: Item) {
      self.init(unsafeResultMap: ["__typename": "Query", "items": items.resultMap])
    }

    public var items: Item {
      get {
        return Item(unsafeResultMap: resultMap["items"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "items")
      }
    }

    public struct Item: GraphQLSelectionSet {
      public static let possibleTypes = ["UserConnection"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("edges", type: .nonNull(.list(.nonNull(.object(Edge.selections))))),
        GraphQLField("pageInfo", type: .nonNull(.object(PageInfo.selections))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(edges: [Edge], pageInfo: PageInfo) {
        self.init(unsafeResultMap: ["__typename": "UserConnection", "edges": edges.map { (value: Edge) -> ResultMap in value.resultMap }, "pageInfo": pageInfo.resultMap])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var edges: [Edge] {
        get {
          return (resultMap["edges"] as! [ResultMap]).map { (value: ResultMap) -> Edge in Edge(unsafeResultMap: value) }
        }
        set {
          resultMap.updateValue(newValue.map { (value: Edge) -> ResultMap in value.resultMap }, forKey: "edges")
        }
      }

      public var pageInfo: PageInfo {
        get {
          return PageInfo(unsafeResultMap: resultMap["pageInfo"]! as! ResultMap)
        }
        set {
          resultMap.updateValue(newValue.resultMap, forKey: "pageInfo")
        }
      }

      public struct Edge: GraphQLSelectionSet {
        public static let possibleTypes = ["UserEdge"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("node", type: .nonNull(.object(Node.selections))),
          GraphQLField("cursor", type: .nonNull(.scalar(String.self))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(node: Node, cursor: String) {
          self.init(unsafeResultMap: ["__typename": "UserEdge", "node": node.resultMap, "cursor": cursor])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var node: Node {
          get {
            return Node(unsafeResultMap: resultMap["node"]! as! ResultMap)
          }
          set {
            resultMap.updateValue(newValue.resultMap, forKey: "node")
          }
        }

        public var cursor: String {
          get {
            return resultMap["cursor"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "cursor")
          }
        }

        public struct Node: GraphQLSelectionSet {
          public static let possibleTypes = ["User"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLFragmentSpread(UserShort.self),
            GraphQLField("isYou", type: .nonNull(.scalar(Bool.self))),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var isYou: Bool {
            get {
              return resultMap["isYou"]! as! Bool
            }
            set {
              resultMap.updateValue(newValue, forKey: "isYou")
            }
          }

          public var fragments: Fragments {
            get {
              return Fragments(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }

          public struct Fragments {
            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public var userShort: UserShort {
              get {
                return UserShort(unsafeResultMap: resultMap)
              }
              set {
                resultMap += newValue.resultMap
              }
            }
          }
        }
      }

      public struct PageInfo: GraphQLSelectionSet {
        public static let possibleTypes = ["PageInfo"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("hasNextPage", type: .nonNull(.scalar(Bool.self))),
          GraphQLField("hasPreviousPage", type: .nonNull(.scalar(Bool.self))),
          GraphQLField("itemsCount", type: .nonNull(.scalar(Int.self))),
          GraphQLField("currentPage", type: .nonNull(.scalar(Int.self))),
          GraphQLField("pagesCount", type: .nonNull(.scalar(Int.self))),
          GraphQLField("openEnded", type: .nonNull(.scalar(Bool.self))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(hasNextPage: Bool, hasPreviousPage: Bool, itemsCount: Int, currentPage: Int, pagesCount: Int, openEnded: Bool) {
          self.init(unsafeResultMap: ["__typename": "PageInfo", "hasNextPage": hasNextPage, "hasPreviousPage": hasPreviousPage, "itemsCount": itemsCount, "currentPage": currentPage, "pagesCount": pagesCount, "openEnded": openEnded])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var hasNextPage: Bool {
          get {
            return resultMap["hasNextPage"]! as! Bool
          }
          set {
            resultMap.updateValue(newValue, forKey: "hasNextPage")
          }
        }

        public var hasPreviousPage: Bool {
          get {
            return resultMap["hasPreviousPage"]! as! Bool
          }
          set {
            resultMap.updateValue(newValue, forKey: "hasPreviousPage")
          }
        }

        public var itemsCount: Int {
          get {
            return resultMap["itemsCount"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "itemsCount")
          }
        }

        public var currentPage: Int {
          get {
            return resultMap["currentPage"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "currentPage")
          }
        }

        public var pagesCount: Int {
          get {
            return resultMap["pagesCount"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "pagesCount")
          }
        }

        public var openEnded: Bool {
          get {
            return resultMap["openEnded"]! as! Bool
          }
          set {
            resultMap.updateValue(newValue, forKey: "openEnded")
          }
        }
      }
    }
  }
}

public final class ResolveShortNameQuery: GraphQLQuery {
  public let operationDefinition =
    "query ResolveShortName($shortname: String!) {\n  item: alphaResolveShortName(shortname: $shortname) {\n    __typename\n    ... on User {\n      ...UserFull\n    }\n    ... on Organization {\n      ...OrganizationFull\n    }\n  }\n}"

  public var queryDocument: String { return operationDefinition.appending(UserFull.fragmentDefinition).appending(OrganizationShort.fragmentDefinition).appending(OrganizationFull.fragmentDefinition).appending(RoomShort.fragmentDefinition).appending(UserShort.fragmentDefinition).appending(FullMessage.fragmentDefinition).appending(UserTiny.fragmentDefinition) }

  public var shortname: String

  public init(shortname: String) {
    self.shortname = shortname
  }

  public var variables: GraphQLMap? {
    return ["shortname": shortname]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("alphaResolveShortName", alias: "item", arguments: ["shortname": GraphQLVariable("shortname")], type: .object(Item.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(item: Item? = nil) {
      self.init(unsafeResultMap: ["__typename": "Query", "item": item.flatMap { (value: Item) -> ResultMap in value.resultMap }])
    }

    public var item: Item? {
      get {
        return (resultMap["item"] as? ResultMap).flatMap { Item(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "item")
      }
    }

    public struct Item: GraphQLSelectionSet {
      public static let possibleTypes = ["User", "Organization"]

      public static let selections: [GraphQLSelection] = [
        GraphQLTypeCase(
          variants: ["User": AsUser.selections, "Organization": AsOrganization.selections],
          default: [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          ]
        )
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var asUser: AsUser? {
        get {
          if !AsUser.possibleTypes.contains(__typename) { return nil }
          return AsUser(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsUser: GraphQLSelectionSet {
        public static let possibleTypes = ["User"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLFragmentSpread(UserFull.self),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var fragments: Fragments {
          get {
            return Fragments(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }

        public struct Fragments {
          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public var userFull: UserFull {
            get {
              return UserFull(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }
        }
      }

      public var asOrganization: AsOrganization? {
        get {
          if !AsOrganization.possibleTypes.contains(__typename) { return nil }
          return AsOrganization(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsOrganization: GraphQLSelectionSet {
        public static let possibleTypes = ["Organization"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLFragmentSpread(OrganizationFull.self),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var fragments: Fragments {
          get {
            return Fragments(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }

        public struct Fragments {
          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public var organizationFull: OrganizationFull {
            get {
              return OrganizationFull(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }
        }
      }
    }
  }
}

public struct AppChat: GraphQLFragment {
  public static let fragmentDefinition =
    "fragment AppChat on AppChat {\n  __typename\n  chat {\n    __typename\n    ... on PrivateRoom {\n      id\n    }\n    ... on SharedRoom {\n      id\n    }\n  }\n  webhook\n}"

  public static let possibleTypes = ["AppChat"]

  public static let selections: [GraphQLSelection] = [
    GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
    GraphQLField("chat", type: .nonNull(.object(Chat.selections))),
    GraphQLField("webhook", type: .nonNull(.scalar(String.self))),
  ]

  public private(set) var resultMap: ResultMap

  public init(unsafeResultMap: ResultMap) {
    self.resultMap = unsafeResultMap
  }

  public init(chat: Chat, webhook: String) {
    self.init(unsafeResultMap: ["__typename": "AppChat", "chat": chat.resultMap, "webhook": webhook])
  }

  public var __typename: String {
    get {
      return resultMap["__typename"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "__typename")
    }
  }

  public var chat: Chat {
    get {
      return Chat(unsafeResultMap: resultMap["chat"]! as! ResultMap)
    }
    set {
      resultMap.updateValue(newValue.resultMap, forKey: "chat")
    }
  }

  public var webhook: String {
    get {
      return resultMap["webhook"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "webhook")
    }
  }

  public struct Chat: GraphQLSelectionSet {
    public static let possibleTypes = ["PrivateRoom", "SharedRoom"]

    public static let selections: [GraphQLSelection] = [
      GraphQLTypeCase(
        variants: ["PrivateRoom": AsPrivateRoom.selections, "SharedRoom": AsSharedRoom.selections],
        default: [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        ]
      )
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public static func makePrivateRoom(id: GraphQLID) -> Chat {
      return Chat(unsafeResultMap: ["__typename": "PrivateRoom", "id": id])
    }

    public static func makeSharedRoom(id: GraphQLID) -> Chat {
      return Chat(unsafeResultMap: ["__typename": "SharedRoom", "id": id])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var asPrivateRoom: AsPrivateRoom? {
      get {
        if !AsPrivateRoom.possibleTypes.contains(__typename) { return nil }
        return AsPrivateRoom(unsafeResultMap: resultMap)
      }
      set {
        guard let newValue = newValue else { return }
        resultMap = newValue.resultMap
      }
    }

    public struct AsPrivateRoom: GraphQLSelectionSet {
      public static let possibleTypes = ["PrivateRoom"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID) {
        self.init(unsafeResultMap: ["__typename": "PrivateRoom", "id": id])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }
    }

    public var asSharedRoom: AsSharedRoom? {
      get {
        if !AsSharedRoom.possibleTypes.contains(__typename) { return nil }
        return AsSharedRoom(unsafeResultMap: resultMap)
      }
      set {
        guard let newValue = newValue else { return }
        resultMap = newValue.resultMap
      }
    }

    public struct AsSharedRoom: GraphQLSelectionSet {
      public static let possibleTypes = ["SharedRoom"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID) {
        self.init(unsafeResultMap: ["__typename": "SharedRoom", "id": id])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }
    }
  }
}

public struct AppFull: GraphQLFragment {
  public static let fragmentDefinition =
    "fragment AppFull on AppProfile {\n  __typename\n  id\n  name\n  shortname\n  photoRef {\n    __typename\n    uuid\n    crop {\n      __typename\n      x\n      y\n      w\n      h\n    }\n  }\n  about\n  token {\n    __typename\n    salt\n  }\n}"

  public static let possibleTypes = ["AppProfile"]

  public static let selections: [GraphQLSelection] = [
    GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
    GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
    GraphQLField("name", type: .nonNull(.scalar(String.self))),
    GraphQLField("shortname", type: .scalar(String.self)),
    GraphQLField("photoRef", type: .object(PhotoRef.selections)),
    GraphQLField("about", type: .scalar(String.self)),
    GraphQLField("token", type: .nonNull(.object(Token.selections))),
  ]

  public private(set) var resultMap: ResultMap

  public init(unsafeResultMap: ResultMap) {
    self.resultMap = unsafeResultMap
  }

  public init(id: GraphQLID, name: String, shortname: String? = nil, photoRef: PhotoRef? = nil, about: String? = nil, token: Token) {
    self.init(unsafeResultMap: ["__typename": "AppProfile", "id": id, "name": name, "shortname": shortname, "photoRef": photoRef.flatMap { (value: PhotoRef) -> ResultMap in value.resultMap }, "about": about, "token": token.resultMap])
  }

  public var __typename: String {
    get {
      return resultMap["__typename"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "__typename")
    }
  }

  public var id: GraphQLID {
    get {
      return resultMap["id"]! as! GraphQLID
    }
    set {
      resultMap.updateValue(newValue, forKey: "id")
    }
  }

  public var name: String {
    get {
      return resultMap["name"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "name")
    }
  }

  public var shortname: String? {
    get {
      return resultMap["shortname"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "shortname")
    }
  }

  public var photoRef: PhotoRef? {
    get {
      return (resultMap["photoRef"] as? ResultMap).flatMap { PhotoRef(unsafeResultMap: $0) }
    }
    set {
      resultMap.updateValue(newValue?.resultMap, forKey: "photoRef")
    }
  }

  public var about: String? {
    get {
      return resultMap["about"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "about")
    }
  }

  public var token: Token {
    get {
      return Token(unsafeResultMap: resultMap["token"]! as! ResultMap)
    }
    set {
      resultMap.updateValue(newValue.resultMap, forKey: "token")
    }
  }

  public struct PhotoRef: GraphQLSelectionSet {
    public static let possibleTypes = ["ImageRef"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLField("uuid", type: .nonNull(.scalar(String.self))),
      GraphQLField("crop", type: .object(Crop.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(uuid: String, crop: Crop? = nil) {
      self.init(unsafeResultMap: ["__typename": "ImageRef", "uuid": uuid, "crop": crop.flatMap { (value: Crop) -> ResultMap in value.resultMap }])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var uuid: String {
      get {
        return resultMap["uuid"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "uuid")
      }
    }

    public var crop: Crop? {
      get {
        return (resultMap["crop"] as? ResultMap).flatMap { Crop(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "crop")
      }
    }

    public struct Crop: GraphQLSelectionSet {
      public static let possibleTypes = ["ImageCrop"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("x", type: .nonNull(.scalar(Int.self))),
        GraphQLField("y", type: .nonNull(.scalar(Int.self))),
        GraphQLField("w", type: .nonNull(.scalar(Int.self))),
        GraphQLField("h", type: .nonNull(.scalar(Int.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(x: Int, y: Int, w: Int, h: Int) {
        self.init(unsafeResultMap: ["__typename": "ImageCrop", "x": x, "y": y, "w": w, "h": h])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var x: Int {
        get {
          return resultMap["x"]! as! Int
        }
        set {
          resultMap.updateValue(newValue, forKey: "x")
        }
      }

      public var y: Int {
        get {
          return resultMap["y"]! as! Int
        }
        set {
          resultMap.updateValue(newValue, forKey: "y")
        }
      }

      public var w: Int {
        get {
          return resultMap["w"]! as! Int
        }
        set {
          resultMap.updateValue(newValue, forKey: "w")
        }
      }

      public var h: Int {
        get {
          return resultMap["h"]! as! Int
        }
        set {
          resultMap.updateValue(newValue, forKey: "h")
        }
      }
    }
  }

  public struct Token: GraphQLSelectionSet {
    public static let possibleTypes = ["AppToken"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLField("salt", type: .nonNull(.scalar(String.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(salt: String) {
      self.init(unsafeResultMap: ["__typename": "AppToken", "salt": salt])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var salt: String {
      get {
        return resultMap["salt"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "salt")
      }
    }
  }
}

public struct ConferenceFull: GraphQLFragment {
  public static let fragmentDefinition =
    "fragment ConferenceFull on Conference {\n  __typename\n  id\n  peers {\n    __typename\n    id\n    user {\n      __typename\n      ...UserShort\n    }\n    connection {\n      __typename\n      state\n      sdp\n      ice\n    }\n  }\n  iceServers {\n    __typename\n    urls\n    username\n    credential\n  }\n}"

  public static let possibleTypes = ["Conference"]

  public static let selections: [GraphQLSelection] = [
    GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
    GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
    GraphQLField("peers", type: .nonNull(.list(.nonNull(.object(Peer.selections))))),
    GraphQLField("iceServers", type: .nonNull(.list(.nonNull(.object(IceServer.selections))))),
  ]

  public private(set) var resultMap: ResultMap

  public init(unsafeResultMap: ResultMap) {
    self.resultMap = unsafeResultMap
  }

  public init(id: GraphQLID, peers: [Peer], iceServers: [IceServer]) {
    self.init(unsafeResultMap: ["__typename": "Conference", "id": id, "peers": peers.map { (value: Peer) -> ResultMap in value.resultMap }, "iceServers": iceServers.map { (value: IceServer) -> ResultMap in value.resultMap }])
  }

  public var __typename: String {
    get {
      return resultMap["__typename"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "__typename")
    }
  }

  public var id: GraphQLID {
    get {
      return resultMap["id"]! as! GraphQLID
    }
    set {
      resultMap.updateValue(newValue, forKey: "id")
    }
  }

  public var peers: [Peer] {
    get {
      return (resultMap["peers"] as! [ResultMap]).map { (value: ResultMap) -> Peer in Peer(unsafeResultMap: value) }
    }
    set {
      resultMap.updateValue(newValue.map { (value: Peer) -> ResultMap in value.resultMap }, forKey: "peers")
    }
  }

  public var iceServers: [IceServer] {
    get {
      return (resultMap["iceServers"] as! [ResultMap]).map { (value: ResultMap) -> IceServer in IceServer(unsafeResultMap: value) }
    }
    set {
      resultMap.updateValue(newValue.map { (value: IceServer) -> ResultMap in value.resultMap }, forKey: "iceServers")
    }
  }

  public struct Peer: GraphQLSelectionSet {
    public static let possibleTypes = ["ConferencePeer"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
      GraphQLField("user", type: .nonNull(.object(User.selections))),
      GraphQLField("connection", type: .object(Connection.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(id: GraphQLID, user: User, connection: Connection? = nil) {
      self.init(unsafeResultMap: ["__typename": "ConferencePeer", "id": id, "user": user.resultMap, "connection": connection.flatMap { (value: Connection) -> ResultMap in value.resultMap }])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var id: GraphQLID {
      get {
        return resultMap["id"]! as! GraphQLID
      }
      set {
        resultMap.updateValue(newValue, forKey: "id")
      }
    }

    public var user: User {
      get {
        return User(unsafeResultMap: resultMap["user"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "user")
      }
    }

    public var connection: Connection? {
      get {
        return (resultMap["connection"] as? ResultMap).flatMap { Connection(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "connection")
      }
    }

    public struct User: GraphQLSelectionSet {
      public static let possibleTypes = ["User"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(UserShort.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var userShort: UserShort {
          get {
            return UserShort(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }

    public struct Connection: GraphQLSelectionSet {
      public static let possibleTypes = ["ConferencePeerConnection"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("state", type: .nonNull(.scalar(ConferencePeerConnectionState.self))),
        GraphQLField("sdp", type: .scalar(String.self)),
        GraphQLField("ice", type: .nonNull(.list(.nonNull(.scalar(String.self))))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(state: ConferencePeerConnectionState, sdp: String? = nil, ice: [String]) {
        self.init(unsafeResultMap: ["__typename": "ConferencePeerConnection", "state": state, "sdp": sdp, "ice": ice])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var state: ConferencePeerConnectionState {
        get {
          return resultMap["state"]! as! ConferencePeerConnectionState
        }
        set {
          resultMap.updateValue(newValue, forKey: "state")
        }
      }

      public var sdp: String? {
        get {
          return resultMap["sdp"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "sdp")
        }
      }

      public var ice: [String] {
        get {
          return resultMap["ice"]! as! [String]
        }
        set {
          resultMap.updateValue(newValue, forKey: "ice")
        }
      }
    }
  }

  public struct IceServer: GraphQLSelectionSet {
    public static let possibleTypes = ["ICEServer"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLField("urls", type: .nonNull(.list(.nonNull(.scalar(String.self))))),
      GraphQLField("username", type: .scalar(String.self)),
      GraphQLField("credential", type: .scalar(String.self)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(urls: [String], username: String? = nil, credential: String? = nil) {
      self.init(unsafeResultMap: ["__typename": "ICEServer", "urls": urls, "username": username, "credential": credential])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var urls: [String] {
      get {
        return resultMap["urls"]! as! [String]
      }
      set {
        resultMap.updateValue(newValue, forKey: "urls")
      }
    }

    public var username: String? {
      get {
        return resultMap["username"] as? String
      }
      set {
        resultMap.updateValue(newValue, forKey: "username")
      }
    }

    public var credential: String? {
      get {
        return resultMap["credential"] as? String
      }
      set {
        resultMap.updateValue(newValue, forKey: "credential")
      }
    }
  }
}

public struct TinyMessage: GraphQLFragment {
  public static let fragmentDefinition =
    "fragment TinyMessage on ModernMessage {\n  __typename\n  id\n  date\n  sender {\n    __typename\n    ...UserTiny\n  }\n  message\n  fallback\n  ... on GeneralMessage {\n    attachments {\n      __typename\n      id\n      fallback\n      ... on MessageAttachmentFile {\n        fileId\n        fileMetadata {\n          __typename\n          isImage\n          imageFormat\n        }\n        filePreview\n      }\n    }\n    quotedMessages {\n      __typename\n      id\n    }\n  }\n}"

  public static let possibleTypes = ["GeneralMessage", "ServiceMessage"]

  public static let selections: [GraphQLSelection] = [
    GraphQLTypeCase(
      variants: ["GeneralMessage": AsGeneralMessage.selections],
      default: [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("date", type: .nonNull(.scalar(String.self))),
        GraphQLField("sender", type: .nonNull(.object(Sender.selections))),
        GraphQLField("message", type: .scalar(String.self)),
        GraphQLField("fallback", type: .nonNull(.scalar(String.self))),
      ]
    )
  ]

  public private(set) var resultMap: ResultMap

  public init(unsafeResultMap: ResultMap) {
    self.resultMap = unsafeResultMap
  }

  public static func makeServiceMessage(id: GraphQLID, date: String, sender: Sender, message: String? = nil, fallback: String) -> TinyMessage {
    return TinyMessage(unsafeResultMap: ["__typename": "ServiceMessage", "id": id, "date": date, "sender": sender.resultMap, "message": message, "fallback": fallback])
  }

  public static func makeGeneralMessage(id: GraphQLID, date: String, sender: AsGeneralMessage.Sender, message: String? = nil, fallback: String, attachments: [AsGeneralMessage.Attachment], quotedMessages: [AsGeneralMessage.QuotedMessage]) -> TinyMessage {
    return TinyMessage(unsafeResultMap: ["__typename": "GeneralMessage", "id": id, "date": date, "sender": sender.resultMap, "message": message, "fallback": fallback, "attachments": attachments.map { (value: AsGeneralMessage.Attachment) -> ResultMap in value.resultMap }, "quotedMessages": quotedMessages.map { (value: AsGeneralMessage.QuotedMessage) -> ResultMap in value.resultMap }])
  }

  public var __typename: String {
    get {
      return resultMap["__typename"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "__typename")
    }
  }

  /// State
  public var id: GraphQLID {
    get {
      return resultMap["id"]! as! GraphQLID
    }
    set {
      resultMap.updateValue(newValue, forKey: "id")
    }
  }

  public var date: String {
    get {
      return resultMap["date"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "date")
    }
  }

  public var sender: Sender {
    get {
      return Sender(unsafeResultMap: resultMap["sender"]! as! ResultMap)
    }
    set {
      resultMap.updateValue(newValue.resultMap, forKey: "sender")
    }
  }

  /// Content
  public var message: String? {
    get {
      return resultMap["message"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "message")
    }
  }

  public var fallback: String {
    get {
      return resultMap["fallback"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "fallback")
    }
  }

  public struct Sender: GraphQLSelectionSet {
    public static let possibleTypes = ["User"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLFragmentSpread(UserTiny.self),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(id: GraphQLID, isYou: Bool, name: String, firstName: String, lastName: String? = nil, photo: String? = nil, shortname: String? = nil) {
      self.init(unsafeResultMap: ["__typename": "User", "id": id, "isYou": isYou, "name": name, "firstName": firstName, "lastName": lastName, "photo": photo, "shortname": shortname])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var fragments: Fragments {
      get {
        return Fragments(unsafeResultMap: resultMap)
      }
      set {
        resultMap += newValue.resultMap
      }
    }

    public struct Fragments {
      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var userTiny: UserTiny {
        get {
          return UserTiny(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }
    }
  }

  public var asGeneralMessage: AsGeneralMessage? {
    get {
      if !AsGeneralMessage.possibleTypes.contains(__typename) { return nil }
      return AsGeneralMessage(unsafeResultMap: resultMap)
    }
    set {
      guard let newValue = newValue else { return }
      resultMap = newValue.resultMap
    }
  }

  public struct AsGeneralMessage: GraphQLSelectionSet {
    public static let possibleTypes = ["GeneralMessage"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
      GraphQLField("date", type: .nonNull(.scalar(String.self))),
      GraphQLField("sender", type: .nonNull(.object(Sender.selections))),
      GraphQLField("message", type: .scalar(String.self)),
      GraphQLField("fallback", type: .nonNull(.scalar(String.self))),
      GraphQLField("attachments", type: .nonNull(.list(.nonNull(.object(Attachment.selections))))),
      GraphQLField("quotedMessages", type: .nonNull(.list(.nonNull(.object(QuotedMessage.selections))))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(id: GraphQLID, date: String, sender: Sender, message: String? = nil, fallback: String, attachments: [Attachment], quotedMessages: [QuotedMessage]) {
      self.init(unsafeResultMap: ["__typename": "GeneralMessage", "id": id, "date": date, "sender": sender.resultMap, "message": message, "fallback": fallback, "attachments": attachments.map { (value: Attachment) -> ResultMap in value.resultMap }, "quotedMessages": quotedMessages.map { (value: QuotedMessage) -> ResultMap in value.resultMap }])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    /// State
    public var id: GraphQLID {
      get {
        return resultMap["id"]! as! GraphQLID
      }
      set {
        resultMap.updateValue(newValue, forKey: "id")
      }
    }

    public var date: String {
      get {
        return resultMap["date"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "date")
      }
    }

    public var sender: Sender {
      get {
        return Sender(unsafeResultMap: resultMap["sender"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "sender")
      }
    }

    /// Content
    public var message: String? {
      get {
        return resultMap["message"] as? String
      }
      set {
        resultMap.updateValue(newValue, forKey: "message")
      }
    }

    public var fallback: String {
      get {
        return resultMap["fallback"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "fallback")
      }
    }

    public var attachments: [Attachment] {
      get {
        return (resultMap["attachments"] as! [ResultMap]).map { (value: ResultMap) -> Attachment in Attachment(unsafeResultMap: value) }
      }
      set {
        resultMap.updateValue(newValue.map { (value: Attachment) -> ResultMap in value.resultMap }, forKey: "attachments")
      }
    }

    public var quotedMessages: [QuotedMessage] {
      get {
        return (resultMap["quotedMessages"] as! [ResultMap]).map { (value: ResultMap) -> QuotedMessage in QuotedMessage(unsafeResultMap: value) }
      }
      set {
        resultMap.updateValue(newValue.map { (value: QuotedMessage) -> ResultMap in value.resultMap }, forKey: "quotedMessages")
      }
    }

    public struct Sender: GraphQLSelectionSet {
      public static let possibleTypes = ["User"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(UserTiny.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, isYou: Bool, name: String, firstName: String, lastName: String? = nil, photo: String? = nil, shortname: String? = nil) {
        self.init(unsafeResultMap: ["__typename": "User", "id": id, "isYou": isYou, "name": name, "firstName": firstName, "lastName": lastName, "photo": photo, "shortname": shortname])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var userTiny: UserTiny {
          get {
            return UserTiny(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }

    public struct Attachment: GraphQLSelectionSet {
      public static let possibleTypes = ["MessageAttachmentFile", "MessageAttachmentPost", "MessageRichAttachment"]

      public static let selections: [GraphQLSelection] = [
        GraphQLTypeCase(
          variants: ["MessageAttachmentFile": AsMessageAttachmentFile.selections],
          default: [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
            GraphQLField("fallback", type: .nonNull(.scalar(String.self))),
          ]
        )
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public static func makeMessageAttachmentPost(id: GraphQLID, fallback: String) -> Attachment {
        return Attachment(unsafeResultMap: ["__typename": "MessageAttachmentPost", "id": id, "fallback": fallback])
      }

      public static func makeMessageRichAttachment(id: GraphQLID, fallback: String) -> Attachment {
        return Attachment(unsafeResultMap: ["__typename": "MessageRichAttachment", "id": id, "fallback": fallback])
      }

      public static func makeMessageAttachmentFile(id: GraphQLID, fallback: String, fileId: String, fileMetadata: AsMessageAttachmentFile.FileMetadatum, filePreview: String? = nil) -> Attachment {
        return Attachment(unsafeResultMap: ["__typename": "MessageAttachmentFile", "id": id, "fallback": fallback, "fileId": fileId, "fileMetadata": fileMetadata.resultMap, "filePreview": filePreview])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var fallback: String {
        get {
          return resultMap["fallback"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "fallback")
        }
      }

      public var asMessageAttachmentFile: AsMessageAttachmentFile? {
        get {
          if !AsMessageAttachmentFile.possibleTypes.contains(__typename) { return nil }
          return AsMessageAttachmentFile(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsMessageAttachmentFile: GraphQLSelectionSet {
        public static let possibleTypes = ["MessageAttachmentFile"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
          GraphQLField("fallback", type: .nonNull(.scalar(String.self))),
          GraphQLField("fileId", type: .nonNull(.scalar(String.self))),
          GraphQLField("fileMetadata", type: .nonNull(.object(FileMetadatum.selections))),
          GraphQLField("filePreview", type: .scalar(String.self)),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(id: GraphQLID, fallback: String, fileId: String, fileMetadata: FileMetadatum, filePreview: String? = nil) {
          self.init(unsafeResultMap: ["__typename": "MessageAttachmentFile", "id": id, "fallback": fallback, "fileId": fileId, "fileMetadata": fileMetadata.resultMap, "filePreview": filePreview])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var id: GraphQLID {
          get {
            return resultMap["id"]! as! GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "id")
          }
        }

        public var fallback: String {
          get {
            return resultMap["fallback"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "fallback")
          }
        }

        public var fileId: String {
          get {
            return resultMap["fileId"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "fileId")
          }
        }

        public var fileMetadata: FileMetadatum {
          get {
            return FileMetadatum(unsafeResultMap: resultMap["fileMetadata"]! as! ResultMap)
          }
          set {
            resultMap.updateValue(newValue.resultMap, forKey: "fileMetadata")
          }
        }

        public var filePreview: String? {
          get {
            return resultMap["filePreview"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "filePreview")
          }
        }

        public struct FileMetadatum: GraphQLSelectionSet {
          public static let possibleTypes = ["FileMetadata"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("isImage", type: .nonNull(.scalar(Bool.self))),
            GraphQLField("imageFormat", type: .scalar(String.self)),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public init(isImage: Bool, imageFormat: String? = nil) {
            self.init(unsafeResultMap: ["__typename": "FileMetadata", "isImage": isImage, "imageFormat": imageFormat])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var isImage: Bool {
            get {
              return resultMap["isImage"]! as! Bool
            }
            set {
              resultMap.updateValue(newValue, forKey: "isImage")
            }
          }

          public var imageFormat: String? {
            get {
              return resultMap["imageFormat"] as? String
            }
            set {
              resultMap.updateValue(newValue, forKey: "imageFormat")
            }
          }
        }
      }
    }

    public struct QuotedMessage: GraphQLSelectionSet {
      public static let possibleTypes = ["GeneralMessage", "ServiceMessage"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public static func makeGeneralMessage(id: GraphQLID) -> QuotedMessage {
        return QuotedMessage(unsafeResultMap: ["__typename": "GeneralMessage", "id": id])
      }

      public static func makeServiceMessage(id: GraphQLID) -> QuotedMessage {
        return QuotedMessage(unsafeResultMap: ["__typename": "ServiceMessage", "id": id])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      /// State
      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }
    }
  }
}

public struct FullMessage: GraphQLFragment {
  public static let fragmentDefinition =
    "fragment FullMessage on ModernMessage {\n  __typename\n  id\n  date\n  sender {\n    __typename\n    ...UserShort\n  }\n  message\n  fallback\n  ... on GeneralMessage {\n    edited\n    attachments {\n      __typename\n      fallback\n      ... on MessageAttachmentFile {\n        id\n        fileId\n        fileMetadata {\n          __typename\n          name\n          mimeType\n          size\n          isImage\n          imageWidth\n          imageHeight\n          imageFormat\n        }\n        filePreview\n      }\n      ... on MessageRichAttachment {\n        title\n        subTitle\n        titleLink\n        titleLinkHostname\n        text\n        icon {\n          __typename\n          url\n          metadata {\n            __typename\n            name\n            mimeType\n            size\n            isImage\n            imageWidth\n            imageHeight\n            imageFormat\n          }\n        }\n        image {\n          __typename\n          url\n          metadata {\n            __typename\n            name\n            mimeType\n            size\n            isImage\n            imageWidth\n            imageHeight\n            imageFormat\n          }\n        }\n        keyboard {\n          __typename\n          buttons {\n            __typename\n            title\n            style\n            url\n          }\n        }\n        fallback\n      }\n    }\n    quotedMessages {\n      __typename\n      id\n      date\n      message\n      sender {\n        __typename\n        ...UserShort\n      }\n      message\n      fallback\n      spans {\n        __typename\n        offset\n        length\n        ... on MessageSpanUserMention {\n          user {\n            __typename\n            ...UserShort\n          }\n        }\n        ... on MessageSpanMultiUserMention {\n          users {\n            __typename\n            ...UserShort\n          }\n        }\n        ... on MessageSpanRoomMention {\n          room {\n            __typename\n            ... on PrivateRoom {\n              id\n              user {\n                __typename\n                id\n                name\n              }\n            }\n            ... on SharedRoom {\n              id\n              title\n            }\n          }\n        }\n        ... on MessageSpanLink {\n          url\n        }\n      }\n      ... on GeneralMessage {\n        edited\n        attachments {\n          __typename\n          fallback\n          ... on MessageAttachmentFile {\n            fileId\n            fileMetadata {\n              __typename\n              name\n              mimeType\n              size\n              isImage\n              imageWidth\n              imageHeight\n              imageFormat\n            }\n            filePreview\n          }\n          ... on MessageRichAttachment {\n            title\n            subTitle\n            titleLink\n            titleLinkHostname\n            text\n            icon {\n              __typename\n              url\n              metadata {\n                __typename\n                name\n                mimeType\n                size\n                isImage\n                imageWidth\n                imageHeight\n                imageFormat\n              }\n            }\n            image {\n              __typename\n              url\n              metadata {\n                __typename\n                name\n                mimeType\n                size\n                isImage\n                imageWidth\n                imageHeight\n                imageFormat\n              }\n            }\n            fallback\n          }\n        }\n      }\n    }\n    reactions {\n      __typename\n      user {\n        __typename\n        ...UserShort\n      }\n      reaction\n    }\n  }\n  spans {\n    __typename\n    offset\n    length\n    ... on MessageSpanUserMention {\n      user {\n        __typename\n        ...UserTiny\n      }\n    }\n    ... on MessageSpanMultiUserMention {\n      users {\n        __typename\n        ...UserTiny\n      }\n    }\n    ... on MessageSpanRoomMention {\n      room {\n        __typename\n        ... on PrivateRoom {\n          id\n          user {\n            __typename\n            id\n            name\n          }\n        }\n        ... on SharedRoom {\n          id\n          title\n        }\n      }\n    }\n    ... on MessageSpanLink {\n      url\n    }\n  }\n  ... on ServiceMessage {\n    serviceMetadata {\n      __typename\n      ... on InviteServiceMetadata {\n        users {\n          __typename\n          ...UserTiny\n        }\n        invitedBy {\n          __typename\n          ...UserTiny\n        }\n      }\n      ... on KickServiceMetadata {\n        user {\n          __typename\n          ...UserTiny\n        }\n        kickedBy {\n          __typename\n          ...UserTiny\n        }\n      }\n      ... on TitleChangeServiceMetadata {\n        title\n      }\n      ... on PhotoChangeServiceMetadata {\n        photo\n      }\n      ... on PostRespondServiceMetadata {\n        respondType\n      }\n    }\n  }\n}"

  public static let possibleTypes = ["GeneralMessage", "ServiceMessage"]

  public static let selections: [GraphQLSelection] = [
    GraphQLTypeCase(
      variants: ["GeneralMessage": AsGeneralMessage.selections, "ServiceMessage": AsServiceMessage.selections],
      default: [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("date", type: .nonNull(.scalar(String.self))),
        GraphQLField("sender", type: .nonNull(.object(Sender.selections))),
        GraphQLField("message", type: .scalar(String.self)),
        GraphQLField("fallback", type: .nonNull(.scalar(String.self))),
        GraphQLField("spans", type: .nonNull(.list(.nonNull(.object(Span.selections))))),
      ]
    )
  ]

  public private(set) var resultMap: ResultMap

  public init(unsafeResultMap: ResultMap) {
    self.resultMap = unsafeResultMap
  }

  public static func makeGeneralMessage(id: GraphQLID, date: String, sender: AsGeneralMessage.Sender, message: String? = nil, fallback: String, edited: Bool, attachments: [AsGeneralMessage.Attachment], quotedMessages: [AsGeneralMessage.QuotedMessage], reactions: [AsGeneralMessage.Reaction], spans: [AsGeneralMessage.Span]) -> FullMessage {
    return FullMessage(unsafeResultMap: ["__typename": "GeneralMessage", "id": id, "date": date, "sender": sender.resultMap, "message": message, "fallback": fallback, "edited": edited, "attachments": attachments.map { (value: AsGeneralMessage.Attachment) -> ResultMap in value.resultMap }, "quotedMessages": quotedMessages.map { (value: AsGeneralMessage.QuotedMessage) -> ResultMap in value.resultMap }, "reactions": reactions.map { (value: AsGeneralMessage.Reaction) -> ResultMap in value.resultMap }, "spans": spans.map { (value: AsGeneralMessage.Span) -> ResultMap in value.resultMap }])
  }

  public static func makeServiceMessage(id: GraphQLID, date: String, sender: AsServiceMessage.Sender, message: String? = nil, fallback: String, spans: [AsServiceMessage.Span], serviceMetadata: AsServiceMessage.ServiceMetadatum? = nil) -> FullMessage {
    return FullMessage(unsafeResultMap: ["__typename": "ServiceMessage", "id": id, "date": date, "sender": sender.resultMap, "message": message, "fallback": fallback, "spans": spans.map { (value: AsServiceMessage.Span) -> ResultMap in value.resultMap }, "serviceMetadata": serviceMetadata.flatMap { (value: AsServiceMessage.ServiceMetadatum) -> ResultMap in value.resultMap }])
  }

  public var __typename: String {
    get {
      return resultMap["__typename"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "__typename")
    }
  }

  /// State
  public var id: GraphQLID {
    get {
      return resultMap["id"]! as! GraphQLID
    }
    set {
      resultMap.updateValue(newValue, forKey: "id")
    }
  }

  public var date: String {
    get {
      return resultMap["date"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "date")
    }
  }

  public var sender: Sender {
    get {
      return Sender(unsafeResultMap: resultMap["sender"]! as! ResultMap)
    }
    set {
      resultMap.updateValue(newValue.resultMap, forKey: "sender")
    }
  }

  /// Content
  public var message: String? {
    get {
      return resultMap["message"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "message")
    }
  }

  public var fallback: String {
    get {
      return resultMap["fallback"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "fallback")
    }
  }

  public var spans: [Span] {
    get {
      return (resultMap["spans"] as! [ResultMap]).map { (value: ResultMap) -> Span in Span(unsafeResultMap: value) }
    }
    set {
      resultMap.updateValue(newValue.map { (value: Span) -> ResultMap in value.resultMap }, forKey: "spans")
    }
  }

  public struct Sender: GraphQLSelectionSet {
    public static let possibleTypes = ["User"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLFragmentSpread(UserShort.self),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var fragments: Fragments {
      get {
        return Fragments(unsafeResultMap: resultMap)
      }
      set {
        resultMap += newValue.resultMap
      }
    }

    public struct Fragments {
      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var userShort: UserShort {
        get {
          return UserShort(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }
    }
  }

  public struct Span: GraphQLSelectionSet {
    public static let possibleTypes = ["MessageSpanLink", "MessageSpanMultiUserMention", "MessageSpanRoomMention", "MessageSpanUserMention"]

    public static let selections: [GraphQLSelection] = [
      GraphQLTypeCase(
        variants: ["MessageSpanUserMention": AsMessageSpanUserMention.selections, "MessageSpanMultiUserMention": AsMessageSpanMultiUserMention.selections, "MessageSpanRoomMention": AsMessageSpanRoomMention.selections, "MessageSpanLink": AsMessageSpanLink.selections],
        default: [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("offset", type: .nonNull(.scalar(Int.self))),
          GraphQLField("length", type: .nonNull(.scalar(Int.self))),
        ]
      )
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public static func makeMessageSpanUserMention(offset: Int, length: Int, user: AsMessageSpanUserMention.User) -> Span {
      return Span(unsafeResultMap: ["__typename": "MessageSpanUserMention", "offset": offset, "length": length, "user": user.resultMap])
    }

    public static func makeMessageSpanMultiUserMention(offset: Int, length: Int, users: [AsMessageSpanMultiUserMention.User]) -> Span {
      return Span(unsafeResultMap: ["__typename": "MessageSpanMultiUserMention", "offset": offset, "length": length, "users": users.map { (value: AsMessageSpanMultiUserMention.User) -> ResultMap in value.resultMap }])
    }

    public static func makeMessageSpanRoomMention(offset: Int, length: Int, room: AsMessageSpanRoomMention.Room) -> Span {
      return Span(unsafeResultMap: ["__typename": "MessageSpanRoomMention", "offset": offset, "length": length, "room": room.resultMap])
    }

    public static func makeMessageSpanLink(offset: Int, length: Int, url: String) -> Span {
      return Span(unsafeResultMap: ["__typename": "MessageSpanLink", "offset": offset, "length": length, "url": url])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var offset: Int {
      get {
        return resultMap["offset"]! as! Int
      }
      set {
        resultMap.updateValue(newValue, forKey: "offset")
      }
    }

    public var length: Int {
      get {
        return resultMap["length"]! as! Int
      }
      set {
        resultMap.updateValue(newValue, forKey: "length")
      }
    }

    public var asMessageSpanUserMention: AsMessageSpanUserMention? {
      get {
        if !AsMessageSpanUserMention.possibleTypes.contains(__typename) { return nil }
        return AsMessageSpanUserMention(unsafeResultMap: resultMap)
      }
      set {
        guard let newValue = newValue else { return }
        resultMap = newValue.resultMap
      }
    }

    public struct AsMessageSpanUserMention: GraphQLSelectionSet {
      public static let possibleTypes = ["MessageSpanUserMention"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("offset", type: .nonNull(.scalar(Int.self))),
        GraphQLField("length", type: .nonNull(.scalar(Int.self))),
        GraphQLField("user", type: .nonNull(.object(User.selections))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(offset: Int, length: Int, user: User) {
        self.init(unsafeResultMap: ["__typename": "MessageSpanUserMention", "offset": offset, "length": length, "user": user.resultMap])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var offset: Int {
        get {
          return resultMap["offset"]! as! Int
        }
        set {
          resultMap.updateValue(newValue, forKey: "offset")
        }
      }

      public var length: Int {
        get {
          return resultMap["length"]! as! Int
        }
        set {
          resultMap.updateValue(newValue, forKey: "length")
        }
      }

      public var user: User {
        get {
          return User(unsafeResultMap: resultMap["user"]! as! ResultMap)
        }
        set {
          resultMap.updateValue(newValue.resultMap, forKey: "user")
        }
      }

      public struct User: GraphQLSelectionSet {
        public static let possibleTypes = ["User"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLFragmentSpread(UserTiny.self),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(id: GraphQLID, isYou: Bool, name: String, firstName: String, lastName: String? = nil, photo: String? = nil, shortname: String? = nil) {
          self.init(unsafeResultMap: ["__typename": "User", "id": id, "isYou": isYou, "name": name, "firstName": firstName, "lastName": lastName, "photo": photo, "shortname": shortname])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var fragments: Fragments {
          get {
            return Fragments(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }

        public struct Fragments {
          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public var userTiny: UserTiny {
            get {
              return UserTiny(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }
        }
      }
    }

    public var asMessageSpanMultiUserMention: AsMessageSpanMultiUserMention? {
      get {
        if !AsMessageSpanMultiUserMention.possibleTypes.contains(__typename) { return nil }
        return AsMessageSpanMultiUserMention(unsafeResultMap: resultMap)
      }
      set {
        guard let newValue = newValue else { return }
        resultMap = newValue.resultMap
      }
    }

    public struct AsMessageSpanMultiUserMention: GraphQLSelectionSet {
      public static let possibleTypes = ["MessageSpanMultiUserMention"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("offset", type: .nonNull(.scalar(Int.self))),
        GraphQLField("length", type: .nonNull(.scalar(Int.self))),
        GraphQLField("users", type: .nonNull(.list(.nonNull(.object(User.selections))))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(offset: Int, length: Int, users: [User]) {
        self.init(unsafeResultMap: ["__typename": "MessageSpanMultiUserMention", "offset": offset, "length": length, "users": users.map { (value: User) -> ResultMap in value.resultMap }])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var offset: Int {
        get {
          return resultMap["offset"]! as! Int
        }
        set {
          resultMap.updateValue(newValue, forKey: "offset")
        }
      }

      public var length: Int {
        get {
          return resultMap["length"]! as! Int
        }
        set {
          resultMap.updateValue(newValue, forKey: "length")
        }
      }

      public var users: [User] {
        get {
          return (resultMap["users"] as! [ResultMap]).map { (value: ResultMap) -> User in User(unsafeResultMap: value) }
        }
        set {
          resultMap.updateValue(newValue.map { (value: User) -> ResultMap in value.resultMap }, forKey: "users")
        }
      }

      public struct User: GraphQLSelectionSet {
        public static let possibleTypes = ["User"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLFragmentSpread(UserTiny.self),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(id: GraphQLID, isYou: Bool, name: String, firstName: String, lastName: String? = nil, photo: String? = nil, shortname: String? = nil) {
          self.init(unsafeResultMap: ["__typename": "User", "id": id, "isYou": isYou, "name": name, "firstName": firstName, "lastName": lastName, "photo": photo, "shortname": shortname])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var fragments: Fragments {
          get {
            return Fragments(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }

        public struct Fragments {
          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public var userTiny: UserTiny {
            get {
              return UserTiny(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }
        }
      }
    }

    public var asMessageSpanRoomMention: AsMessageSpanRoomMention? {
      get {
        if !AsMessageSpanRoomMention.possibleTypes.contains(__typename) { return nil }
        return AsMessageSpanRoomMention(unsafeResultMap: resultMap)
      }
      set {
        guard let newValue = newValue else { return }
        resultMap = newValue.resultMap
      }
    }

    public struct AsMessageSpanRoomMention: GraphQLSelectionSet {
      public static let possibleTypes = ["MessageSpanRoomMention"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("offset", type: .nonNull(.scalar(Int.self))),
        GraphQLField("length", type: .nonNull(.scalar(Int.self))),
        GraphQLField("room", type: .nonNull(.object(Room.selections))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(offset: Int, length: Int, room: Room) {
        self.init(unsafeResultMap: ["__typename": "MessageSpanRoomMention", "offset": offset, "length": length, "room": room.resultMap])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var offset: Int {
        get {
          return resultMap["offset"]! as! Int
        }
        set {
          resultMap.updateValue(newValue, forKey: "offset")
        }
      }

      public var length: Int {
        get {
          return resultMap["length"]! as! Int
        }
        set {
          resultMap.updateValue(newValue, forKey: "length")
        }
      }

      public var room: Room {
        get {
          return Room(unsafeResultMap: resultMap["room"]! as! ResultMap)
        }
        set {
          resultMap.updateValue(newValue.resultMap, forKey: "room")
        }
      }

      public struct Room: GraphQLSelectionSet {
        public static let possibleTypes = ["PrivateRoom", "SharedRoom"]

        public static let selections: [GraphQLSelection] = [
          GraphQLTypeCase(
            variants: ["PrivateRoom": AsPrivateRoom.selections, "SharedRoom": AsSharedRoom.selections],
            default: [
              GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            ]
          )
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public static func makePrivateRoom(id: GraphQLID, user: AsPrivateRoom.User) -> Room {
          return Room(unsafeResultMap: ["__typename": "PrivateRoom", "id": id, "user": user.resultMap])
        }

        public static func makeSharedRoom(id: GraphQLID, title: String) -> Room {
          return Room(unsafeResultMap: ["__typename": "SharedRoom", "id": id, "title": title])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var asPrivateRoom: AsPrivateRoom? {
          get {
            if !AsPrivateRoom.possibleTypes.contains(__typename) { return nil }
            return AsPrivateRoom(unsafeResultMap: resultMap)
          }
          set {
            guard let newValue = newValue else { return }
            resultMap = newValue.resultMap
          }
        }

        public struct AsPrivateRoom: GraphQLSelectionSet {
          public static let possibleTypes = ["PrivateRoom"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
            GraphQLField("user", type: .nonNull(.object(User.selections))),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public init(id: GraphQLID, user: User) {
            self.init(unsafeResultMap: ["__typename": "PrivateRoom", "id": id, "user": user.resultMap])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var id: GraphQLID {
            get {
              return resultMap["id"]! as! GraphQLID
            }
            set {
              resultMap.updateValue(newValue, forKey: "id")
            }
          }

          public var user: User {
            get {
              return User(unsafeResultMap: resultMap["user"]! as! ResultMap)
            }
            set {
              resultMap.updateValue(newValue.resultMap, forKey: "user")
            }
          }

          public struct User: GraphQLSelectionSet {
            public static let possibleTypes = ["User"]

            public static let selections: [GraphQLSelection] = [
              GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
              GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
              GraphQLField("name", type: .nonNull(.scalar(String.self))),
            ]

            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public init(id: GraphQLID, name: String) {
              self.init(unsafeResultMap: ["__typename": "User", "id": id, "name": name])
            }

            public var __typename: String {
              get {
                return resultMap["__typename"]! as! String
              }
              set {
                resultMap.updateValue(newValue, forKey: "__typename")
              }
            }

            public var id: GraphQLID {
              get {
                return resultMap["id"]! as! GraphQLID
              }
              set {
                resultMap.updateValue(newValue, forKey: "id")
              }
            }

            public var name: String {
              get {
                return resultMap["name"]! as! String
              }
              set {
                resultMap.updateValue(newValue, forKey: "name")
              }
            }
          }
        }

        public var asSharedRoom: AsSharedRoom? {
          get {
            if !AsSharedRoom.possibleTypes.contains(__typename) { return nil }
            return AsSharedRoom(unsafeResultMap: resultMap)
          }
          set {
            guard let newValue = newValue else { return }
            resultMap = newValue.resultMap
          }
        }

        public struct AsSharedRoom: GraphQLSelectionSet {
          public static let possibleTypes = ["SharedRoom"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
            GraphQLField("title", type: .nonNull(.scalar(String.self))),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public init(id: GraphQLID, title: String) {
            self.init(unsafeResultMap: ["__typename": "SharedRoom", "id": id, "title": title])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var id: GraphQLID {
            get {
              return resultMap["id"]! as! GraphQLID
            }
            set {
              resultMap.updateValue(newValue, forKey: "id")
            }
          }

          public var title: String {
            get {
              return resultMap["title"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "title")
            }
          }
        }
      }
    }

    public var asMessageSpanLink: AsMessageSpanLink? {
      get {
        if !AsMessageSpanLink.possibleTypes.contains(__typename) { return nil }
        return AsMessageSpanLink(unsafeResultMap: resultMap)
      }
      set {
        guard let newValue = newValue else { return }
        resultMap = newValue.resultMap
      }
    }

    public struct AsMessageSpanLink: GraphQLSelectionSet {
      public static let possibleTypes = ["MessageSpanLink"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("offset", type: .nonNull(.scalar(Int.self))),
        GraphQLField("length", type: .nonNull(.scalar(Int.self))),
        GraphQLField("url", type: .nonNull(.scalar(String.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(offset: Int, length: Int, url: String) {
        self.init(unsafeResultMap: ["__typename": "MessageSpanLink", "offset": offset, "length": length, "url": url])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var offset: Int {
        get {
          return resultMap["offset"]! as! Int
        }
        set {
          resultMap.updateValue(newValue, forKey: "offset")
        }
      }

      public var length: Int {
        get {
          return resultMap["length"]! as! Int
        }
        set {
          resultMap.updateValue(newValue, forKey: "length")
        }
      }

      public var url: String {
        get {
          return resultMap["url"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "url")
        }
      }
    }
  }

  public var asGeneralMessage: AsGeneralMessage? {
    get {
      if !AsGeneralMessage.possibleTypes.contains(__typename) { return nil }
      return AsGeneralMessage(unsafeResultMap: resultMap)
    }
    set {
      guard let newValue = newValue else { return }
      resultMap = newValue.resultMap
    }
  }

  public struct AsGeneralMessage: GraphQLSelectionSet {
    public static let possibleTypes = ["GeneralMessage"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
      GraphQLField("date", type: .nonNull(.scalar(String.self))),
      GraphQLField("sender", type: .nonNull(.object(Sender.selections))),
      GraphQLField("message", type: .scalar(String.self)),
      GraphQLField("fallback", type: .nonNull(.scalar(String.self))),
      GraphQLField("edited", type: .nonNull(.scalar(Bool.self))),
      GraphQLField("attachments", type: .nonNull(.list(.nonNull(.object(Attachment.selections))))),
      GraphQLField("quotedMessages", type: .nonNull(.list(.nonNull(.object(QuotedMessage.selections))))),
      GraphQLField("reactions", type: .nonNull(.list(.nonNull(.object(Reaction.selections))))),
      GraphQLField("spans", type: .nonNull(.list(.nonNull(.object(Span.selections))))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(id: GraphQLID, date: String, sender: Sender, message: String? = nil, fallback: String, edited: Bool, attachments: [Attachment], quotedMessages: [QuotedMessage], reactions: [Reaction], spans: [Span]) {
      self.init(unsafeResultMap: ["__typename": "GeneralMessage", "id": id, "date": date, "sender": sender.resultMap, "message": message, "fallback": fallback, "edited": edited, "attachments": attachments.map { (value: Attachment) -> ResultMap in value.resultMap }, "quotedMessages": quotedMessages.map { (value: QuotedMessage) -> ResultMap in value.resultMap }, "reactions": reactions.map { (value: Reaction) -> ResultMap in value.resultMap }, "spans": spans.map { (value: Span) -> ResultMap in value.resultMap }])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    /// State
    public var id: GraphQLID {
      get {
        return resultMap["id"]! as! GraphQLID
      }
      set {
        resultMap.updateValue(newValue, forKey: "id")
      }
    }

    public var date: String {
      get {
        return resultMap["date"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "date")
      }
    }

    public var sender: Sender {
      get {
        return Sender(unsafeResultMap: resultMap["sender"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "sender")
      }
    }

    /// Content
    public var message: String? {
      get {
        return resultMap["message"] as? String
      }
      set {
        resultMap.updateValue(newValue, forKey: "message")
      }
    }

    public var fallback: String {
      get {
        return resultMap["fallback"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "fallback")
      }
    }

    public var edited: Bool {
      get {
        return resultMap["edited"]! as! Bool
      }
      set {
        resultMap.updateValue(newValue, forKey: "edited")
      }
    }

    public var attachments: [Attachment] {
      get {
        return (resultMap["attachments"] as! [ResultMap]).map { (value: ResultMap) -> Attachment in Attachment(unsafeResultMap: value) }
      }
      set {
        resultMap.updateValue(newValue.map { (value: Attachment) -> ResultMap in value.resultMap }, forKey: "attachments")
      }
    }

    public var quotedMessages: [QuotedMessage] {
      get {
        return (resultMap["quotedMessages"] as! [ResultMap]).map { (value: ResultMap) -> QuotedMessage in QuotedMessage(unsafeResultMap: value) }
      }
      set {
        resultMap.updateValue(newValue.map { (value: QuotedMessage) -> ResultMap in value.resultMap }, forKey: "quotedMessages")
      }
    }

    public var reactions: [Reaction] {
      get {
        return (resultMap["reactions"] as! [ResultMap]).map { (value: ResultMap) -> Reaction in Reaction(unsafeResultMap: value) }
      }
      set {
        resultMap.updateValue(newValue.map { (value: Reaction) -> ResultMap in value.resultMap }, forKey: "reactions")
      }
    }

    public var spans: [Span] {
      get {
        return (resultMap["spans"] as! [ResultMap]).map { (value: ResultMap) -> Span in Span(unsafeResultMap: value) }
      }
      set {
        resultMap.updateValue(newValue.map { (value: Span) -> ResultMap in value.resultMap }, forKey: "spans")
      }
    }

    public struct Sender: GraphQLSelectionSet {
      public static let possibleTypes = ["User"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(UserShort.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var userShort: UserShort {
          get {
            return UserShort(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }

    public struct Attachment: GraphQLSelectionSet {
      public static let possibleTypes = ["MessageAttachmentFile", "MessageAttachmentPost", "MessageRichAttachment"]

      public static let selections: [GraphQLSelection] = [
        GraphQLTypeCase(
          variants: ["MessageAttachmentFile": AsMessageAttachmentFile.selections, "MessageRichAttachment": AsMessageRichAttachment.selections],
          default: [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("fallback", type: .nonNull(.scalar(String.self))),
          ]
        )
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public static func makeMessageAttachmentPost(fallback: String) -> Attachment {
        return Attachment(unsafeResultMap: ["__typename": "MessageAttachmentPost", "fallback": fallback])
      }

      public static func makeMessageAttachmentFile(fallback: String, id: GraphQLID, fileId: String, fileMetadata: AsMessageAttachmentFile.FileMetadatum, filePreview: String? = nil) -> Attachment {
        return Attachment(unsafeResultMap: ["__typename": "MessageAttachmentFile", "fallback": fallback, "id": id, "fileId": fileId, "fileMetadata": fileMetadata.resultMap, "filePreview": filePreview])
      }

      public static func makeMessageRichAttachment(fallback: String, title: String? = nil, subTitle: String? = nil, titleLink: String? = nil, titleLinkHostname: String? = nil, text: String? = nil, icon: AsMessageRichAttachment.Icon? = nil, image: AsMessageRichAttachment.Image? = nil, keyboard: AsMessageRichAttachment.Keyboard? = nil) -> Attachment {
        return Attachment(unsafeResultMap: ["__typename": "MessageRichAttachment", "fallback": fallback, "title": title, "subTitle": subTitle, "titleLink": titleLink, "titleLinkHostname": titleLinkHostname, "text": text, "icon": icon.flatMap { (value: AsMessageRichAttachment.Icon) -> ResultMap in value.resultMap }, "image": image.flatMap { (value: AsMessageRichAttachment.Image) -> ResultMap in value.resultMap }, "keyboard": keyboard.flatMap { (value: AsMessageRichAttachment.Keyboard) -> ResultMap in value.resultMap }])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fallback: String {
        get {
          return resultMap["fallback"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "fallback")
        }
      }

      public var asMessageAttachmentFile: AsMessageAttachmentFile? {
        get {
          if !AsMessageAttachmentFile.possibleTypes.contains(__typename) { return nil }
          return AsMessageAttachmentFile(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsMessageAttachmentFile: GraphQLSelectionSet {
        public static let possibleTypes = ["MessageAttachmentFile"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("fallback", type: .nonNull(.scalar(String.self))),
          GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
          GraphQLField("fileId", type: .nonNull(.scalar(String.self))),
          GraphQLField("fileMetadata", type: .nonNull(.object(FileMetadatum.selections))),
          GraphQLField("filePreview", type: .scalar(String.self)),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(fallback: String, id: GraphQLID, fileId: String, fileMetadata: FileMetadatum, filePreview: String? = nil) {
          self.init(unsafeResultMap: ["__typename": "MessageAttachmentFile", "fallback": fallback, "id": id, "fileId": fileId, "fileMetadata": fileMetadata.resultMap, "filePreview": filePreview])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var fallback: String {
          get {
            return resultMap["fallback"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "fallback")
          }
        }

        public var id: GraphQLID {
          get {
            return resultMap["id"]! as! GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "id")
          }
        }

        public var fileId: String {
          get {
            return resultMap["fileId"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "fileId")
          }
        }

        public var fileMetadata: FileMetadatum {
          get {
            return FileMetadatum(unsafeResultMap: resultMap["fileMetadata"]! as! ResultMap)
          }
          set {
            resultMap.updateValue(newValue.resultMap, forKey: "fileMetadata")
          }
        }

        public var filePreview: String? {
          get {
            return resultMap["filePreview"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "filePreview")
          }
        }

        public struct FileMetadatum: GraphQLSelectionSet {
          public static let possibleTypes = ["FileMetadata"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("name", type: .nonNull(.scalar(String.self))),
            GraphQLField("mimeType", type: .scalar(String.self)),
            GraphQLField("size", type: .nonNull(.scalar(Int.self))),
            GraphQLField("isImage", type: .nonNull(.scalar(Bool.self))),
            GraphQLField("imageWidth", type: .scalar(Int.self)),
            GraphQLField("imageHeight", type: .scalar(Int.self)),
            GraphQLField("imageFormat", type: .scalar(String.self)),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public init(name: String, mimeType: String? = nil, size: Int, isImage: Bool, imageWidth: Int? = nil, imageHeight: Int? = nil, imageFormat: String? = nil) {
            self.init(unsafeResultMap: ["__typename": "FileMetadata", "name": name, "mimeType": mimeType, "size": size, "isImage": isImage, "imageWidth": imageWidth, "imageHeight": imageHeight, "imageFormat": imageFormat])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var name: String {
            get {
              return resultMap["name"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "name")
            }
          }

          public var mimeType: String? {
            get {
              return resultMap["mimeType"] as? String
            }
            set {
              resultMap.updateValue(newValue, forKey: "mimeType")
            }
          }

          public var size: Int {
            get {
              return resultMap["size"]! as! Int
            }
            set {
              resultMap.updateValue(newValue, forKey: "size")
            }
          }

          public var isImage: Bool {
            get {
              return resultMap["isImage"]! as! Bool
            }
            set {
              resultMap.updateValue(newValue, forKey: "isImage")
            }
          }

          public var imageWidth: Int? {
            get {
              return resultMap["imageWidth"] as? Int
            }
            set {
              resultMap.updateValue(newValue, forKey: "imageWidth")
            }
          }

          public var imageHeight: Int? {
            get {
              return resultMap["imageHeight"] as? Int
            }
            set {
              resultMap.updateValue(newValue, forKey: "imageHeight")
            }
          }

          public var imageFormat: String? {
            get {
              return resultMap["imageFormat"] as? String
            }
            set {
              resultMap.updateValue(newValue, forKey: "imageFormat")
            }
          }
        }
      }

      public var asMessageRichAttachment: AsMessageRichAttachment? {
        get {
          if !AsMessageRichAttachment.possibleTypes.contains(__typename) { return nil }
          return AsMessageRichAttachment(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsMessageRichAttachment: GraphQLSelectionSet {
        public static let possibleTypes = ["MessageRichAttachment"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("fallback", type: .nonNull(.scalar(String.self))),
          GraphQLField("title", type: .scalar(String.self)),
          GraphQLField("subTitle", type: .scalar(String.self)),
          GraphQLField("titleLink", type: .scalar(String.self)),
          GraphQLField("titleLinkHostname", type: .scalar(String.self)),
          GraphQLField("text", type: .scalar(String.self)),
          GraphQLField("icon", type: .object(Icon.selections)),
          GraphQLField("image", type: .object(Image.selections)),
          GraphQLField("keyboard", type: .object(Keyboard.selections)),
          GraphQLField("fallback", type: .nonNull(.scalar(String.self))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(fallback: String, title: String? = nil, subTitle: String? = nil, titleLink: String? = nil, titleLinkHostname: String? = nil, text: String? = nil, icon: Icon? = nil, image: Image? = nil, keyboard: Keyboard? = nil) {
          self.init(unsafeResultMap: ["__typename": "MessageRichAttachment", "fallback": fallback, "title": title, "subTitle": subTitle, "titleLink": titleLink, "titleLinkHostname": titleLinkHostname, "text": text, "icon": icon.flatMap { (value: Icon) -> ResultMap in value.resultMap }, "image": image.flatMap { (value: Image) -> ResultMap in value.resultMap }, "keyboard": keyboard.flatMap { (value: Keyboard) -> ResultMap in value.resultMap }])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var fallback: String {
          get {
            return resultMap["fallback"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "fallback")
          }
        }

        public var title: String? {
          get {
            return resultMap["title"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "title")
          }
        }

        public var subTitle: String? {
          get {
            return resultMap["subTitle"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "subTitle")
          }
        }

        public var titleLink: String? {
          get {
            return resultMap["titleLink"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "titleLink")
          }
        }

        public var titleLinkHostname: String? {
          get {
            return resultMap["titleLinkHostname"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "titleLinkHostname")
          }
        }

        public var text: String? {
          get {
            return resultMap["text"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "text")
          }
        }

        public var icon: Icon? {
          get {
            return (resultMap["icon"] as? ResultMap).flatMap { Icon(unsafeResultMap: $0) }
          }
          set {
            resultMap.updateValue(newValue?.resultMap, forKey: "icon")
          }
        }

        public var image: Image? {
          get {
            return (resultMap["image"] as? ResultMap).flatMap { Image(unsafeResultMap: $0) }
          }
          set {
            resultMap.updateValue(newValue?.resultMap, forKey: "image")
          }
        }

        public var keyboard: Keyboard? {
          get {
            return (resultMap["keyboard"] as? ResultMap).flatMap { Keyboard(unsafeResultMap: $0) }
          }
          set {
            resultMap.updateValue(newValue?.resultMap, forKey: "keyboard")
          }
        }

        public struct Icon: GraphQLSelectionSet {
          public static let possibleTypes = ["Image"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("url", type: .nonNull(.scalar(String.self))),
            GraphQLField("metadata", type: .object(Metadatum.selections)),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public init(url: String, metadata: Metadatum? = nil) {
            self.init(unsafeResultMap: ["__typename": "Image", "url": url, "metadata": metadata.flatMap { (value: Metadatum) -> ResultMap in value.resultMap }])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var url: String {
            get {
              return resultMap["url"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "url")
            }
          }

          public var metadata: Metadatum? {
            get {
              return (resultMap["metadata"] as? ResultMap).flatMap { Metadatum(unsafeResultMap: $0) }
            }
            set {
              resultMap.updateValue(newValue?.resultMap, forKey: "metadata")
            }
          }

          public struct Metadatum: GraphQLSelectionSet {
            public static let possibleTypes = ["FileMetadata"]

            public static let selections: [GraphQLSelection] = [
              GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
              GraphQLField("name", type: .nonNull(.scalar(String.self))),
              GraphQLField("mimeType", type: .scalar(String.self)),
              GraphQLField("size", type: .nonNull(.scalar(Int.self))),
              GraphQLField("isImage", type: .nonNull(.scalar(Bool.self))),
              GraphQLField("imageWidth", type: .scalar(Int.self)),
              GraphQLField("imageHeight", type: .scalar(Int.self)),
              GraphQLField("imageFormat", type: .scalar(String.self)),
            ]

            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public init(name: String, mimeType: String? = nil, size: Int, isImage: Bool, imageWidth: Int? = nil, imageHeight: Int? = nil, imageFormat: String? = nil) {
              self.init(unsafeResultMap: ["__typename": "FileMetadata", "name": name, "mimeType": mimeType, "size": size, "isImage": isImage, "imageWidth": imageWidth, "imageHeight": imageHeight, "imageFormat": imageFormat])
            }

            public var __typename: String {
              get {
                return resultMap["__typename"]! as! String
              }
              set {
                resultMap.updateValue(newValue, forKey: "__typename")
              }
            }

            public var name: String {
              get {
                return resultMap["name"]! as! String
              }
              set {
                resultMap.updateValue(newValue, forKey: "name")
              }
            }

            public var mimeType: String? {
              get {
                return resultMap["mimeType"] as? String
              }
              set {
                resultMap.updateValue(newValue, forKey: "mimeType")
              }
            }

            public var size: Int {
              get {
                return resultMap["size"]! as! Int
              }
              set {
                resultMap.updateValue(newValue, forKey: "size")
              }
            }

            public var isImage: Bool {
              get {
                return resultMap["isImage"]! as! Bool
              }
              set {
                resultMap.updateValue(newValue, forKey: "isImage")
              }
            }

            public var imageWidth: Int? {
              get {
                return resultMap["imageWidth"] as? Int
              }
              set {
                resultMap.updateValue(newValue, forKey: "imageWidth")
              }
            }

            public var imageHeight: Int? {
              get {
                return resultMap["imageHeight"] as? Int
              }
              set {
                resultMap.updateValue(newValue, forKey: "imageHeight")
              }
            }

            public var imageFormat: String? {
              get {
                return resultMap["imageFormat"] as? String
              }
              set {
                resultMap.updateValue(newValue, forKey: "imageFormat")
              }
            }
          }
        }

        public struct Image: GraphQLSelectionSet {
          public static let possibleTypes = ["Image"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("url", type: .nonNull(.scalar(String.self))),
            GraphQLField("metadata", type: .object(Metadatum.selections)),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public init(url: String, metadata: Metadatum? = nil) {
            self.init(unsafeResultMap: ["__typename": "Image", "url": url, "metadata": metadata.flatMap { (value: Metadatum) -> ResultMap in value.resultMap }])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var url: String {
            get {
              return resultMap["url"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "url")
            }
          }

          public var metadata: Metadatum? {
            get {
              return (resultMap["metadata"] as? ResultMap).flatMap { Metadatum(unsafeResultMap: $0) }
            }
            set {
              resultMap.updateValue(newValue?.resultMap, forKey: "metadata")
            }
          }

          public struct Metadatum: GraphQLSelectionSet {
            public static let possibleTypes = ["FileMetadata"]

            public static let selections: [GraphQLSelection] = [
              GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
              GraphQLField("name", type: .nonNull(.scalar(String.self))),
              GraphQLField("mimeType", type: .scalar(String.self)),
              GraphQLField("size", type: .nonNull(.scalar(Int.self))),
              GraphQLField("isImage", type: .nonNull(.scalar(Bool.self))),
              GraphQLField("imageWidth", type: .scalar(Int.self)),
              GraphQLField("imageHeight", type: .scalar(Int.self)),
              GraphQLField("imageFormat", type: .scalar(String.self)),
            ]

            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public init(name: String, mimeType: String? = nil, size: Int, isImage: Bool, imageWidth: Int? = nil, imageHeight: Int? = nil, imageFormat: String? = nil) {
              self.init(unsafeResultMap: ["__typename": "FileMetadata", "name": name, "mimeType": mimeType, "size": size, "isImage": isImage, "imageWidth": imageWidth, "imageHeight": imageHeight, "imageFormat": imageFormat])
            }

            public var __typename: String {
              get {
                return resultMap["__typename"]! as! String
              }
              set {
                resultMap.updateValue(newValue, forKey: "__typename")
              }
            }

            public var name: String {
              get {
                return resultMap["name"]! as! String
              }
              set {
                resultMap.updateValue(newValue, forKey: "name")
              }
            }

            public var mimeType: String? {
              get {
                return resultMap["mimeType"] as? String
              }
              set {
                resultMap.updateValue(newValue, forKey: "mimeType")
              }
            }

            public var size: Int {
              get {
                return resultMap["size"]! as! Int
              }
              set {
                resultMap.updateValue(newValue, forKey: "size")
              }
            }

            public var isImage: Bool {
              get {
                return resultMap["isImage"]! as! Bool
              }
              set {
                resultMap.updateValue(newValue, forKey: "isImage")
              }
            }

            public var imageWidth: Int? {
              get {
                return resultMap["imageWidth"] as? Int
              }
              set {
                resultMap.updateValue(newValue, forKey: "imageWidth")
              }
            }

            public var imageHeight: Int? {
              get {
                return resultMap["imageHeight"] as? Int
              }
              set {
                resultMap.updateValue(newValue, forKey: "imageHeight")
              }
            }

            public var imageFormat: String? {
              get {
                return resultMap["imageFormat"] as? String
              }
              set {
                resultMap.updateValue(newValue, forKey: "imageFormat")
              }
            }
          }
        }

        public struct Keyboard: GraphQLSelectionSet {
          public static let possibleTypes = ["MessageKeyboard"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("buttons", type: .nonNull(.list(.list(.nonNull(.object(Button.selections)))))),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public init(buttons: [[Button]?]) {
            self.init(unsafeResultMap: ["__typename": "MessageKeyboard", "buttons": buttons.map { (value: [Button]?) -> [ResultMap]? in value.flatMap { (value: [Button]) -> [ResultMap] in value.map { (value: Button) -> ResultMap in value.resultMap } } }])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var buttons: [[Button]?] {
            get {
              return (resultMap["buttons"] as! [[ResultMap]?]).map { (value: [ResultMap]?) -> [Button]? in value.flatMap { (value: [ResultMap]) -> [Button] in value.map { (value: ResultMap) -> Button in Button(unsafeResultMap: value) } } }
            }
            set {
              resultMap.updateValue(newValue.map { (value: [Button]?) -> [ResultMap]? in value.flatMap { (value: [Button]) -> [ResultMap] in value.map { (value: Button) -> ResultMap in value.resultMap } } }, forKey: "buttons")
            }
          }

          public struct Button: GraphQLSelectionSet {
            public static let possibleTypes = ["ModernMessageButton"]

            public static let selections: [GraphQLSelection] = [
              GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
              GraphQLField("title", type: .nonNull(.scalar(String.self))),
              GraphQLField("style", type: .nonNull(.scalar(ModernMessageButtonStyle.self))),
              GraphQLField("url", type: .scalar(String.self)),
            ]

            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public init(title: String, style: ModernMessageButtonStyle, url: String? = nil) {
              self.init(unsafeResultMap: ["__typename": "ModernMessageButton", "title": title, "style": style, "url": url])
            }

            public var __typename: String {
              get {
                return resultMap["__typename"]! as! String
              }
              set {
                resultMap.updateValue(newValue, forKey: "__typename")
              }
            }

            public var title: String {
              get {
                return resultMap["title"]! as! String
              }
              set {
                resultMap.updateValue(newValue, forKey: "title")
              }
            }

            public var style: ModernMessageButtonStyle {
              get {
                return resultMap["style"]! as! ModernMessageButtonStyle
              }
              set {
                resultMap.updateValue(newValue, forKey: "style")
              }
            }

            public var url: String? {
              get {
                return resultMap["url"] as? String
              }
              set {
                resultMap.updateValue(newValue, forKey: "url")
              }
            }
          }
        }
      }
    }

    public struct QuotedMessage: GraphQLSelectionSet {
      public static let possibleTypes = ["GeneralMessage", "ServiceMessage"]

      public static let selections: [GraphQLSelection] = [
        GraphQLTypeCase(
          variants: ["GeneralMessage": AsGeneralMessage.selections],
          default: [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
            GraphQLField("date", type: .nonNull(.scalar(String.self))),
            GraphQLField("message", type: .scalar(String.self)),
            GraphQLField("sender", type: .nonNull(.object(Sender.selections))),
            GraphQLField("message", type: .scalar(String.self)),
            GraphQLField("fallback", type: .nonNull(.scalar(String.self))),
            GraphQLField("spans", type: .nonNull(.list(.nonNull(.object(Span.selections))))),
          ]
        )
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public static func makeServiceMessage(id: GraphQLID, date: String, message: String? = nil, sender: Sender, fallback: String, spans: [Span]) -> QuotedMessage {
        return QuotedMessage(unsafeResultMap: ["__typename": "ServiceMessage", "id": id, "date": date, "message": message, "sender": sender.resultMap, "fallback": fallback, "spans": spans.map { (value: Span) -> ResultMap in value.resultMap }])
      }

      public static func makeGeneralMessage(id: GraphQLID, date: String, message: String? = nil, sender: AsGeneralMessage.Sender, fallback: String, spans: [AsGeneralMessage.Span], edited: Bool, attachments: [AsGeneralMessage.Attachment]) -> QuotedMessage {
        return QuotedMessage(unsafeResultMap: ["__typename": "GeneralMessage", "id": id, "date": date, "message": message, "sender": sender.resultMap, "fallback": fallback, "spans": spans.map { (value: AsGeneralMessage.Span) -> ResultMap in value.resultMap }, "edited": edited, "attachments": attachments.map { (value: AsGeneralMessage.Attachment) -> ResultMap in value.resultMap }])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      /// State
      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var date: String {
        get {
          return resultMap["date"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "date")
        }
      }

      /// Content
      public var message: String? {
        get {
          return resultMap["message"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "message")
        }
      }

      public var sender: Sender {
        get {
          return Sender(unsafeResultMap: resultMap["sender"]! as! ResultMap)
        }
        set {
          resultMap.updateValue(newValue.resultMap, forKey: "sender")
        }
      }

      public var fallback: String {
        get {
          return resultMap["fallback"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "fallback")
        }
      }

      public var spans: [Span] {
        get {
          return (resultMap["spans"] as! [ResultMap]).map { (value: ResultMap) -> Span in Span(unsafeResultMap: value) }
        }
        set {
          resultMap.updateValue(newValue.map { (value: Span) -> ResultMap in value.resultMap }, forKey: "spans")
        }
      }

      public struct Sender: GraphQLSelectionSet {
        public static let possibleTypes = ["User"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLFragmentSpread(UserShort.self),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var fragments: Fragments {
          get {
            return Fragments(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }

        public struct Fragments {
          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public var userShort: UserShort {
            get {
              return UserShort(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }
        }
      }

      public struct Span: GraphQLSelectionSet {
        public static let possibleTypes = ["MessageSpanLink", "MessageSpanMultiUserMention", "MessageSpanRoomMention", "MessageSpanUserMention"]

        public static let selections: [GraphQLSelection] = [
          GraphQLTypeCase(
            variants: ["MessageSpanUserMention": AsMessageSpanUserMention.selections, "MessageSpanMultiUserMention": AsMessageSpanMultiUserMention.selections, "MessageSpanRoomMention": AsMessageSpanRoomMention.selections, "MessageSpanLink": AsMessageSpanLink.selections],
            default: [
              GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
              GraphQLField("offset", type: .nonNull(.scalar(Int.self))),
              GraphQLField("length", type: .nonNull(.scalar(Int.self))),
            ]
          )
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public static func makeMessageSpanUserMention(offset: Int, length: Int, user: AsMessageSpanUserMention.User) -> Span {
          return Span(unsafeResultMap: ["__typename": "MessageSpanUserMention", "offset": offset, "length": length, "user": user.resultMap])
        }

        public static func makeMessageSpanMultiUserMention(offset: Int, length: Int, users: [AsMessageSpanMultiUserMention.User]) -> Span {
          return Span(unsafeResultMap: ["__typename": "MessageSpanMultiUserMention", "offset": offset, "length": length, "users": users.map { (value: AsMessageSpanMultiUserMention.User) -> ResultMap in value.resultMap }])
        }

        public static func makeMessageSpanRoomMention(offset: Int, length: Int, room: AsMessageSpanRoomMention.Room) -> Span {
          return Span(unsafeResultMap: ["__typename": "MessageSpanRoomMention", "offset": offset, "length": length, "room": room.resultMap])
        }

        public static func makeMessageSpanLink(offset: Int, length: Int, url: String) -> Span {
          return Span(unsafeResultMap: ["__typename": "MessageSpanLink", "offset": offset, "length": length, "url": url])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var offset: Int {
          get {
            return resultMap["offset"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "offset")
          }
        }

        public var length: Int {
          get {
            return resultMap["length"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "length")
          }
        }

        public var asMessageSpanUserMention: AsMessageSpanUserMention? {
          get {
            if !AsMessageSpanUserMention.possibleTypes.contains(__typename) { return nil }
            return AsMessageSpanUserMention(unsafeResultMap: resultMap)
          }
          set {
            guard let newValue = newValue else { return }
            resultMap = newValue.resultMap
          }
        }

        public struct AsMessageSpanUserMention: GraphQLSelectionSet {
          public static let possibleTypes = ["MessageSpanUserMention"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("offset", type: .nonNull(.scalar(Int.self))),
            GraphQLField("length", type: .nonNull(.scalar(Int.self))),
            GraphQLField("user", type: .nonNull(.object(User.selections))),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public init(offset: Int, length: Int, user: User) {
            self.init(unsafeResultMap: ["__typename": "MessageSpanUserMention", "offset": offset, "length": length, "user": user.resultMap])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var offset: Int {
            get {
              return resultMap["offset"]! as! Int
            }
            set {
              resultMap.updateValue(newValue, forKey: "offset")
            }
          }

          public var length: Int {
            get {
              return resultMap["length"]! as! Int
            }
            set {
              resultMap.updateValue(newValue, forKey: "length")
            }
          }

          public var user: User {
            get {
              return User(unsafeResultMap: resultMap["user"]! as! ResultMap)
            }
            set {
              resultMap.updateValue(newValue.resultMap, forKey: "user")
            }
          }

          public struct User: GraphQLSelectionSet {
            public static let possibleTypes = ["User"]

            public static let selections: [GraphQLSelection] = [
              GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
              GraphQLFragmentSpread(UserShort.self),
            ]

            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public var __typename: String {
              get {
                return resultMap["__typename"]! as! String
              }
              set {
                resultMap.updateValue(newValue, forKey: "__typename")
              }
            }

            public var fragments: Fragments {
              get {
                return Fragments(unsafeResultMap: resultMap)
              }
              set {
                resultMap += newValue.resultMap
              }
            }

            public struct Fragments {
              public private(set) var resultMap: ResultMap

              public init(unsafeResultMap: ResultMap) {
                self.resultMap = unsafeResultMap
              }

              public var userShort: UserShort {
                get {
                  return UserShort(unsafeResultMap: resultMap)
                }
                set {
                  resultMap += newValue.resultMap
                }
              }
            }
          }
        }

        public var asMessageSpanMultiUserMention: AsMessageSpanMultiUserMention? {
          get {
            if !AsMessageSpanMultiUserMention.possibleTypes.contains(__typename) { return nil }
            return AsMessageSpanMultiUserMention(unsafeResultMap: resultMap)
          }
          set {
            guard let newValue = newValue else { return }
            resultMap = newValue.resultMap
          }
        }

        public struct AsMessageSpanMultiUserMention: GraphQLSelectionSet {
          public static let possibleTypes = ["MessageSpanMultiUserMention"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("offset", type: .nonNull(.scalar(Int.self))),
            GraphQLField("length", type: .nonNull(.scalar(Int.self))),
            GraphQLField("users", type: .nonNull(.list(.nonNull(.object(User.selections))))),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public init(offset: Int, length: Int, users: [User]) {
            self.init(unsafeResultMap: ["__typename": "MessageSpanMultiUserMention", "offset": offset, "length": length, "users": users.map { (value: User) -> ResultMap in value.resultMap }])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var offset: Int {
            get {
              return resultMap["offset"]! as! Int
            }
            set {
              resultMap.updateValue(newValue, forKey: "offset")
            }
          }

          public var length: Int {
            get {
              return resultMap["length"]! as! Int
            }
            set {
              resultMap.updateValue(newValue, forKey: "length")
            }
          }

          public var users: [User] {
            get {
              return (resultMap["users"] as! [ResultMap]).map { (value: ResultMap) -> User in User(unsafeResultMap: value) }
            }
            set {
              resultMap.updateValue(newValue.map { (value: User) -> ResultMap in value.resultMap }, forKey: "users")
            }
          }

          public struct User: GraphQLSelectionSet {
            public static let possibleTypes = ["User"]

            public static let selections: [GraphQLSelection] = [
              GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
              GraphQLFragmentSpread(UserShort.self),
            ]

            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public var __typename: String {
              get {
                return resultMap["__typename"]! as! String
              }
              set {
                resultMap.updateValue(newValue, forKey: "__typename")
              }
            }

            public var fragments: Fragments {
              get {
                return Fragments(unsafeResultMap: resultMap)
              }
              set {
                resultMap += newValue.resultMap
              }
            }

            public struct Fragments {
              public private(set) var resultMap: ResultMap

              public init(unsafeResultMap: ResultMap) {
                self.resultMap = unsafeResultMap
              }

              public var userShort: UserShort {
                get {
                  return UserShort(unsafeResultMap: resultMap)
                }
                set {
                  resultMap += newValue.resultMap
                }
              }
            }
          }
        }

        public var asMessageSpanRoomMention: AsMessageSpanRoomMention? {
          get {
            if !AsMessageSpanRoomMention.possibleTypes.contains(__typename) { return nil }
            return AsMessageSpanRoomMention(unsafeResultMap: resultMap)
          }
          set {
            guard let newValue = newValue else { return }
            resultMap = newValue.resultMap
          }
        }

        public struct AsMessageSpanRoomMention: GraphQLSelectionSet {
          public static let possibleTypes = ["MessageSpanRoomMention"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("offset", type: .nonNull(.scalar(Int.self))),
            GraphQLField("length", type: .nonNull(.scalar(Int.self))),
            GraphQLField("room", type: .nonNull(.object(Room.selections))),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public init(offset: Int, length: Int, room: Room) {
            self.init(unsafeResultMap: ["__typename": "MessageSpanRoomMention", "offset": offset, "length": length, "room": room.resultMap])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var offset: Int {
            get {
              return resultMap["offset"]! as! Int
            }
            set {
              resultMap.updateValue(newValue, forKey: "offset")
            }
          }

          public var length: Int {
            get {
              return resultMap["length"]! as! Int
            }
            set {
              resultMap.updateValue(newValue, forKey: "length")
            }
          }

          public var room: Room {
            get {
              return Room(unsafeResultMap: resultMap["room"]! as! ResultMap)
            }
            set {
              resultMap.updateValue(newValue.resultMap, forKey: "room")
            }
          }

          public struct Room: GraphQLSelectionSet {
            public static let possibleTypes = ["PrivateRoom", "SharedRoom"]

            public static let selections: [GraphQLSelection] = [
              GraphQLTypeCase(
                variants: ["PrivateRoom": AsPrivateRoom.selections, "SharedRoom": AsSharedRoom.selections],
                default: [
                  GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
                ]
              )
            ]

            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public static func makePrivateRoom(id: GraphQLID, user: AsPrivateRoom.User) -> Room {
              return Room(unsafeResultMap: ["__typename": "PrivateRoom", "id": id, "user": user.resultMap])
            }

            public static func makeSharedRoom(id: GraphQLID, title: String) -> Room {
              return Room(unsafeResultMap: ["__typename": "SharedRoom", "id": id, "title": title])
            }

            public var __typename: String {
              get {
                return resultMap["__typename"]! as! String
              }
              set {
                resultMap.updateValue(newValue, forKey: "__typename")
              }
            }

            public var asPrivateRoom: AsPrivateRoom? {
              get {
                if !AsPrivateRoom.possibleTypes.contains(__typename) { return nil }
                return AsPrivateRoom(unsafeResultMap: resultMap)
              }
              set {
                guard let newValue = newValue else { return }
                resultMap = newValue.resultMap
              }
            }

            public struct AsPrivateRoom: GraphQLSelectionSet {
              public static let possibleTypes = ["PrivateRoom"]

              public static let selections: [GraphQLSelection] = [
                GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
                GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
                GraphQLField("user", type: .nonNull(.object(User.selections))),
              ]

              public private(set) var resultMap: ResultMap

              public init(unsafeResultMap: ResultMap) {
                self.resultMap = unsafeResultMap
              }

              public init(id: GraphQLID, user: User) {
                self.init(unsafeResultMap: ["__typename": "PrivateRoom", "id": id, "user": user.resultMap])
              }

              public var __typename: String {
                get {
                  return resultMap["__typename"]! as! String
                }
                set {
                  resultMap.updateValue(newValue, forKey: "__typename")
                }
              }

              public var id: GraphQLID {
                get {
                  return resultMap["id"]! as! GraphQLID
                }
                set {
                  resultMap.updateValue(newValue, forKey: "id")
                }
              }

              public var user: User {
                get {
                  return User(unsafeResultMap: resultMap["user"]! as! ResultMap)
                }
                set {
                  resultMap.updateValue(newValue.resultMap, forKey: "user")
                }
              }

              public struct User: GraphQLSelectionSet {
                public static let possibleTypes = ["User"]

                public static let selections: [GraphQLSelection] = [
                  GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
                  GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
                  GraphQLField("name", type: .nonNull(.scalar(String.self))),
                ]

                public private(set) var resultMap: ResultMap

                public init(unsafeResultMap: ResultMap) {
                  self.resultMap = unsafeResultMap
                }

                public init(id: GraphQLID, name: String) {
                  self.init(unsafeResultMap: ["__typename": "User", "id": id, "name": name])
                }

                public var __typename: String {
                  get {
                    return resultMap["__typename"]! as! String
                  }
                  set {
                    resultMap.updateValue(newValue, forKey: "__typename")
                  }
                }

                public var id: GraphQLID {
                  get {
                    return resultMap["id"]! as! GraphQLID
                  }
                  set {
                    resultMap.updateValue(newValue, forKey: "id")
                  }
                }

                public var name: String {
                  get {
                    return resultMap["name"]! as! String
                  }
                  set {
                    resultMap.updateValue(newValue, forKey: "name")
                  }
                }
              }
            }

            public var asSharedRoom: AsSharedRoom? {
              get {
                if !AsSharedRoom.possibleTypes.contains(__typename) { return nil }
                return AsSharedRoom(unsafeResultMap: resultMap)
              }
              set {
                guard let newValue = newValue else { return }
                resultMap = newValue.resultMap
              }
            }

            public struct AsSharedRoom: GraphQLSelectionSet {
              public static let possibleTypes = ["SharedRoom"]

              public static let selections: [GraphQLSelection] = [
                GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
                GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
                GraphQLField("title", type: .nonNull(.scalar(String.self))),
              ]

              public private(set) var resultMap: ResultMap

              public init(unsafeResultMap: ResultMap) {
                self.resultMap = unsafeResultMap
              }

              public init(id: GraphQLID, title: String) {
                self.init(unsafeResultMap: ["__typename": "SharedRoom", "id": id, "title": title])
              }

              public var __typename: String {
                get {
                  return resultMap["__typename"]! as! String
                }
                set {
                  resultMap.updateValue(newValue, forKey: "__typename")
                }
              }

              public var id: GraphQLID {
                get {
                  return resultMap["id"]! as! GraphQLID
                }
                set {
                  resultMap.updateValue(newValue, forKey: "id")
                }
              }

              public var title: String {
                get {
                  return resultMap["title"]! as! String
                }
                set {
                  resultMap.updateValue(newValue, forKey: "title")
                }
              }
            }
          }
        }

        public var asMessageSpanLink: AsMessageSpanLink? {
          get {
            if !AsMessageSpanLink.possibleTypes.contains(__typename) { return nil }
            return AsMessageSpanLink(unsafeResultMap: resultMap)
          }
          set {
            guard let newValue = newValue else { return }
            resultMap = newValue.resultMap
          }
        }

        public struct AsMessageSpanLink: GraphQLSelectionSet {
          public static let possibleTypes = ["MessageSpanLink"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("offset", type: .nonNull(.scalar(Int.self))),
            GraphQLField("length", type: .nonNull(.scalar(Int.self))),
            GraphQLField("url", type: .nonNull(.scalar(String.self))),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public init(offset: Int, length: Int, url: String) {
            self.init(unsafeResultMap: ["__typename": "MessageSpanLink", "offset": offset, "length": length, "url": url])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var offset: Int {
            get {
              return resultMap["offset"]! as! Int
            }
            set {
              resultMap.updateValue(newValue, forKey: "offset")
            }
          }

          public var length: Int {
            get {
              return resultMap["length"]! as! Int
            }
            set {
              resultMap.updateValue(newValue, forKey: "length")
            }
          }

          public var url: String {
            get {
              return resultMap["url"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "url")
            }
          }
        }
      }

      public var asGeneralMessage: AsGeneralMessage? {
        get {
          if !AsGeneralMessage.possibleTypes.contains(__typename) { return nil }
          return AsGeneralMessage(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsGeneralMessage: GraphQLSelectionSet {
        public static let possibleTypes = ["GeneralMessage"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
          GraphQLField("date", type: .nonNull(.scalar(String.self))),
          GraphQLField("message", type: .scalar(String.self)),
          GraphQLField("sender", type: .nonNull(.object(Sender.selections))),
          GraphQLField("message", type: .scalar(String.self)),
          GraphQLField("fallback", type: .nonNull(.scalar(String.self))),
          GraphQLField("spans", type: .nonNull(.list(.nonNull(.object(Span.selections))))),
          GraphQLField("edited", type: .nonNull(.scalar(Bool.self))),
          GraphQLField("attachments", type: .nonNull(.list(.nonNull(.object(Attachment.selections))))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(id: GraphQLID, date: String, message: String? = nil, sender: Sender, fallback: String, spans: [Span], edited: Bool, attachments: [Attachment]) {
          self.init(unsafeResultMap: ["__typename": "GeneralMessage", "id": id, "date": date, "message": message, "sender": sender.resultMap, "fallback": fallback, "spans": spans.map { (value: Span) -> ResultMap in value.resultMap }, "edited": edited, "attachments": attachments.map { (value: Attachment) -> ResultMap in value.resultMap }])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        /// State
        public var id: GraphQLID {
          get {
            return resultMap["id"]! as! GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "id")
          }
        }

        public var date: String {
          get {
            return resultMap["date"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "date")
          }
        }

        /// Content
        public var message: String? {
          get {
            return resultMap["message"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "message")
          }
        }

        public var sender: Sender {
          get {
            return Sender(unsafeResultMap: resultMap["sender"]! as! ResultMap)
          }
          set {
            resultMap.updateValue(newValue.resultMap, forKey: "sender")
          }
        }

        public var fallback: String {
          get {
            return resultMap["fallback"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "fallback")
          }
        }

        public var spans: [Span] {
          get {
            return (resultMap["spans"] as! [ResultMap]).map { (value: ResultMap) -> Span in Span(unsafeResultMap: value) }
          }
          set {
            resultMap.updateValue(newValue.map { (value: Span) -> ResultMap in value.resultMap }, forKey: "spans")
          }
        }

        public var edited: Bool {
          get {
            return resultMap["edited"]! as! Bool
          }
          set {
            resultMap.updateValue(newValue, forKey: "edited")
          }
        }

        public var attachments: [Attachment] {
          get {
            return (resultMap["attachments"] as! [ResultMap]).map { (value: ResultMap) -> Attachment in Attachment(unsafeResultMap: value) }
          }
          set {
            resultMap.updateValue(newValue.map { (value: Attachment) -> ResultMap in value.resultMap }, forKey: "attachments")
          }
        }

        public struct Sender: GraphQLSelectionSet {
          public static let possibleTypes = ["User"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLFragmentSpread(UserShort.self),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var fragments: Fragments {
            get {
              return Fragments(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }

          public struct Fragments {
            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public var userShort: UserShort {
              get {
                return UserShort(unsafeResultMap: resultMap)
              }
              set {
                resultMap += newValue.resultMap
              }
            }
          }
        }

        public struct Span: GraphQLSelectionSet {
          public static let possibleTypes = ["MessageSpanLink", "MessageSpanMultiUserMention", "MessageSpanRoomMention", "MessageSpanUserMention"]

          public static let selections: [GraphQLSelection] = [
            GraphQLTypeCase(
              variants: ["MessageSpanUserMention": AsMessageSpanUserMention.selections, "MessageSpanMultiUserMention": AsMessageSpanMultiUserMention.selections, "MessageSpanRoomMention": AsMessageSpanRoomMention.selections, "MessageSpanLink": AsMessageSpanLink.selections],
              default: [
                GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
                GraphQLField("offset", type: .nonNull(.scalar(Int.self))),
                GraphQLField("length", type: .nonNull(.scalar(Int.self))),
              ]
            )
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public static func makeMessageSpanUserMention(offset: Int, length: Int, user: AsMessageSpanUserMention.User) -> Span {
            return Span(unsafeResultMap: ["__typename": "MessageSpanUserMention", "offset": offset, "length": length, "user": user.resultMap])
          }

          public static func makeMessageSpanMultiUserMention(offset: Int, length: Int, users: [AsMessageSpanMultiUserMention.User]) -> Span {
            return Span(unsafeResultMap: ["__typename": "MessageSpanMultiUserMention", "offset": offset, "length": length, "users": users.map { (value: AsMessageSpanMultiUserMention.User) -> ResultMap in value.resultMap }])
          }

          public static func makeMessageSpanRoomMention(offset: Int, length: Int, room: AsMessageSpanRoomMention.Room) -> Span {
            return Span(unsafeResultMap: ["__typename": "MessageSpanRoomMention", "offset": offset, "length": length, "room": room.resultMap])
          }

          public static func makeMessageSpanLink(offset: Int, length: Int, url: String) -> Span {
            return Span(unsafeResultMap: ["__typename": "MessageSpanLink", "offset": offset, "length": length, "url": url])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var offset: Int {
            get {
              return resultMap["offset"]! as! Int
            }
            set {
              resultMap.updateValue(newValue, forKey: "offset")
            }
          }

          public var length: Int {
            get {
              return resultMap["length"]! as! Int
            }
            set {
              resultMap.updateValue(newValue, forKey: "length")
            }
          }

          public var asMessageSpanUserMention: AsMessageSpanUserMention? {
            get {
              if !AsMessageSpanUserMention.possibleTypes.contains(__typename) { return nil }
              return AsMessageSpanUserMention(unsafeResultMap: resultMap)
            }
            set {
              guard let newValue = newValue else { return }
              resultMap = newValue.resultMap
            }
          }

          public struct AsMessageSpanUserMention: GraphQLSelectionSet {
            public static let possibleTypes = ["MessageSpanUserMention"]

            public static let selections: [GraphQLSelection] = [
              GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
              GraphQLField("offset", type: .nonNull(.scalar(Int.self))),
              GraphQLField("length", type: .nonNull(.scalar(Int.self))),
              GraphQLField("user", type: .nonNull(.object(User.selections))),
            ]

            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public init(offset: Int, length: Int, user: User) {
              self.init(unsafeResultMap: ["__typename": "MessageSpanUserMention", "offset": offset, "length": length, "user": user.resultMap])
            }

            public var __typename: String {
              get {
                return resultMap["__typename"]! as! String
              }
              set {
                resultMap.updateValue(newValue, forKey: "__typename")
              }
            }

            public var offset: Int {
              get {
                return resultMap["offset"]! as! Int
              }
              set {
                resultMap.updateValue(newValue, forKey: "offset")
              }
            }

            public var length: Int {
              get {
                return resultMap["length"]! as! Int
              }
              set {
                resultMap.updateValue(newValue, forKey: "length")
              }
            }

            public var user: User {
              get {
                return User(unsafeResultMap: resultMap["user"]! as! ResultMap)
              }
              set {
                resultMap.updateValue(newValue.resultMap, forKey: "user")
              }
            }

            public struct User: GraphQLSelectionSet {
              public static let possibleTypes = ["User"]

              public static let selections: [GraphQLSelection] = [
                GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
                GraphQLFragmentSpread(UserShort.self),
              ]

              public private(set) var resultMap: ResultMap

              public init(unsafeResultMap: ResultMap) {
                self.resultMap = unsafeResultMap
              }

              public var __typename: String {
                get {
                  return resultMap["__typename"]! as! String
                }
                set {
                  resultMap.updateValue(newValue, forKey: "__typename")
                }
              }

              public var fragments: Fragments {
                get {
                  return Fragments(unsafeResultMap: resultMap)
                }
                set {
                  resultMap += newValue.resultMap
                }
              }

              public struct Fragments {
                public private(set) var resultMap: ResultMap

                public init(unsafeResultMap: ResultMap) {
                  self.resultMap = unsafeResultMap
                }

                public var userShort: UserShort {
                  get {
                    return UserShort(unsafeResultMap: resultMap)
                  }
                  set {
                    resultMap += newValue.resultMap
                  }
                }
              }
            }
          }

          public var asMessageSpanMultiUserMention: AsMessageSpanMultiUserMention? {
            get {
              if !AsMessageSpanMultiUserMention.possibleTypes.contains(__typename) { return nil }
              return AsMessageSpanMultiUserMention(unsafeResultMap: resultMap)
            }
            set {
              guard let newValue = newValue else { return }
              resultMap = newValue.resultMap
            }
          }

          public struct AsMessageSpanMultiUserMention: GraphQLSelectionSet {
            public static let possibleTypes = ["MessageSpanMultiUserMention"]

            public static let selections: [GraphQLSelection] = [
              GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
              GraphQLField("offset", type: .nonNull(.scalar(Int.self))),
              GraphQLField("length", type: .nonNull(.scalar(Int.self))),
              GraphQLField("users", type: .nonNull(.list(.nonNull(.object(User.selections))))),
            ]

            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public init(offset: Int, length: Int, users: [User]) {
              self.init(unsafeResultMap: ["__typename": "MessageSpanMultiUserMention", "offset": offset, "length": length, "users": users.map { (value: User) -> ResultMap in value.resultMap }])
            }

            public var __typename: String {
              get {
                return resultMap["__typename"]! as! String
              }
              set {
                resultMap.updateValue(newValue, forKey: "__typename")
              }
            }

            public var offset: Int {
              get {
                return resultMap["offset"]! as! Int
              }
              set {
                resultMap.updateValue(newValue, forKey: "offset")
              }
            }

            public var length: Int {
              get {
                return resultMap["length"]! as! Int
              }
              set {
                resultMap.updateValue(newValue, forKey: "length")
              }
            }

            public var users: [User] {
              get {
                return (resultMap["users"] as! [ResultMap]).map { (value: ResultMap) -> User in User(unsafeResultMap: value) }
              }
              set {
                resultMap.updateValue(newValue.map { (value: User) -> ResultMap in value.resultMap }, forKey: "users")
              }
            }

            public struct User: GraphQLSelectionSet {
              public static let possibleTypes = ["User"]

              public static let selections: [GraphQLSelection] = [
                GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
                GraphQLFragmentSpread(UserShort.self),
              ]

              public private(set) var resultMap: ResultMap

              public init(unsafeResultMap: ResultMap) {
                self.resultMap = unsafeResultMap
              }

              public var __typename: String {
                get {
                  return resultMap["__typename"]! as! String
                }
                set {
                  resultMap.updateValue(newValue, forKey: "__typename")
                }
              }

              public var fragments: Fragments {
                get {
                  return Fragments(unsafeResultMap: resultMap)
                }
                set {
                  resultMap += newValue.resultMap
                }
              }

              public struct Fragments {
                public private(set) var resultMap: ResultMap

                public init(unsafeResultMap: ResultMap) {
                  self.resultMap = unsafeResultMap
                }

                public var userShort: UserShort {
                  get {
                    return UserShort(unsafeResultMap: resultMap)
                  }
                  set {
                    resultMap += newValue.resultMap
                  }
                }
              }
            }
          }

          public var asMessageSpanRoomMention: AsMessageSpanRoomMention? {
            get {
              if !AsMessageSpanRoomMention.possibleTypes.contains(__typename) { return nil }
              return AsMessageSpanRoomMention(unsafeResultMap: resultMap)
            }
            set {
              guard let newValue = newValue else { return }
              resultMap = newValue.resultMap
            }
          }

          public struct AsMessageSpanRoomMention: GraphQLSelectionSet {
            public static let possibleTypes = ["MessageSpanRoomMention"]

            public static let selections: [GraphQLSelection] = [
              GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
              GraphQLField("offset", type: .nonNull(.scalar(Int.self))),
              GraphQLField("length", type: .nonNull(.scalar(Int.self))),
              GraphQLField("room", type: .nonNull(.object(Room.selections))),
            ]

            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public init(offset: Int, length: Int, room: Room) {
              self.init(unsafeResultMap: ["__typename": "MessageSpanRoomMention", "offset": offset, "length": length, "room": room.resultMap])
            }

            public var __typename: String {
              get {
                return resultMap["__typename"]! as! String
              }
              set {
                resultMap.updateValue(newValue, forKey: "__typename")
              }
            }

            public var offset: Int {
              get {
                return resultMap["offset"]! as! Int
              }
              set {
                resultMap.updateValue(newValue, forKey: "offset")
              }
            }

            public var length: Int {
              get {
                return resultMap["length"]! as! Int
              }
              set {
                resultMap.updateValue(newValue, forKey: "length")
              }
            }

            public var room: Room {
              get {
                return Room(unsafeResultMap: resultMap["room"]! as! ResultMap)
              }
              set {
                resultMap.updateValue(newValue.resultMap, forKey: "room")
              }
            }

            public struct Room: GraphQLSelectionSet {
              public static let possibleTypes = ["PrivateRoom", "SharedRoom"]

              public static let selections: [GraphQLSelection] = [
                GraphQLTypeCase(
                  variants: ["PrivateRoom": AsPrivateRoom.selections, "SharedRoom": AsSharedRoom.selections],
                  default: [
                    GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
                  ]
                )
              ]

              public private(set) var resultMap: ResultMap

              public init(unsafeResultMap: ResultMap) {
                self.resultMap = unsafeResultMap
              }

              public static func makePrivateRoom(id: GraphQLID, user: AsPrivateRoom.User) -> Room {
                return Room(unsafeResultMap: ["__typename": "PrivateRoom", "id": id, "user": user.resultMap])
              }

              public static func makeSharedRoom(id: GraphQLID, title: String) -> Room {
                return Room(unsafeResultMap: ["__typename": "SharedRoom", "id": id, "title": title])
              }

              public var __typename: String {
                get {
                  return resultMap["__typename"]! as! String
                }
                set {
                  resultMap.updateValue(newValue, forKey: "__typename")
                }
              }

              public var asPrivateRoom: AsPrivateRoom? {
                get {
                  if !AsPrivateRoom.possibleTypes.contains(__typename) { return nil }
                  return AsPrivateRoom(unsafeResultMap: resultMap)
                }
                set {
                  guard let newValue = newValue else { return }
                  resultMap = newValue.resultMap
                }
              }

              public struct AsPrivateRoom: GraphQLSelectionSet {
                public static let possibleTypes = ["PrivateRoom"]

                public static let selections: [GraphQLSelection] = [
                  GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
                  GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
                  GraphQLField("user", type: .nonNull(.object(User.selections))),
                ]

                public private(set) var resultMap: ResultMap

                public init(unsafeResultMap: ResultMap) {
                  self.resultMap = unsafeResultMap
                }

                public init(id: GraphQLID, user: User) {
                  self.init(unsafeResultMap: ["__typename": "PrivateRoom", "id": id, "user": user.resultMap])
                }

                public var __typename: String {
                  get {
                    return resultMap["__typename"]! as! String
                  }
                  set {
                    resultMap.updateValue(newValue, forKey: "__typename")
                  }
                }

                public var id: GraphQLID {
                  get {
                    return resultMap["id"]! as! GraphQLID
                  }
                  set {
                    resultMap.updateValue(newValue, forKey: "id")
                  }
                }

                public var user: User {
                  get {
                    return User(unsafeResultMap: resultMap["user"]! as! ResultMap)
                  }
                  set {
                    resultMap.updateValue(newValue.resultMap, forKey: "user")
                  }
                }

                public struct User: GraphQLSelectionSet {
                  public static let possibleTypes = ["User"]

                  public static let selections: [GraphQLSelection] = [
                    GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
                    GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
                    GraphQLField("name", type: .nonNull(.scalar(String.self))),
                  ]

                  public private(set) var resultMap: ResultMap

                  public init(unsafeResultMap: ResultMap) {
                    self.resultMap = unsafeResultMap
                  }

                  public init(id: GraphQLID, name: String) {
                    self.init(unsafeResultMap: ["__typename": "User", "id": id, "name": name])
                  }

                  public var __typename: String {
                    get {
                      return resultMap["__typename"]! as! String
                    }
                    set {
                      resultMap.updateValue(newValue, forKey: "__typename")
                    }
                  }

                  public var id: GraphQLID {
                    get {
                      return resultMap["id"]! as! GraphQLID
                    }
                    set {
                      resultMap.updateValue(newValue, forKey: "id")
                    }
                  }

                  public var name: String {
                    get {
                      return resultMap["name"]! as! String
                    }
                    set {
                      resultMap.updateValue(newValue, forKey: "name")
                    }
                  }
                }
              }

              public var asSharedRoom: AsSharedRoom? {
                get {
                  if !AsSharedRoom.possibleTypes.contains(__typename) { return nil }
                  return AsSharedRoom(unsafeResultMap: resultMap)
                }
                set {
                  guard let newValue = newValue else { return }
                  resultMap = newValue.resultMap
                }
              }

              public struct AsSharedRoom: GraphQLSelectionSet {
                public static let possibleTypes = ["SharedRoom"]

                public static let selections: [GraphQLSelection] = [
                  GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
                  GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
                  GraphQLField("title", type: .nonNull(.scalar(String.self))),
                ]

                public private(set) var resultMap: ResultMap

                public init(unsafeResultMap: ResultMap) {
                  self.resultMap = unsafeResultMap
                }

                public init(id: GraphQLID, title: String) {
                  self.init(unsafeResultMap: ["__typename": "SharedRoom", "id": id, "title": title])
                }

                public var __typename: String {
                  get {
                    return resultMap["__typename"]! as! String
                  }
                  set {
                    resultMap.updateValue(newValue, forKey: "__typename")
                  }
                }

                public var id: GraphQLID {
                  get {
                    return resultMap["id"]! as! GraphQLID
                  }
                  set {
                    resultMap.updateValue(newValue, forKey: "id")
                  }
                }

                public var title: String {
                  get {
                    return resultMap["title"]! as! String
                  }
                  set {
                    resultMap.updateValue(newValue, forKey: "title")
                  }
                }
              }
            }
          }

          public var asMessageSpanLink: AsMessageSpanLink? {
            get {
              if !AsMessageSpanLink.possibleTypes.contains(__typename) { return nil }
              return AsMessageSpanLink(unsafeResultMap: resultMap)
            }
            set {
              guard let newValue = newValue else { return }
              resultMap = newValue.resultMap
            }
          }

          public struct AsMessageSpanLink: GraphQLSelectionSet {
            public static let possibleTypes = ["MessageSpanLink"]

            public static let selections: [GraphQLSelection] = [
              GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
              GraphQLField("offset", type: .nonNull(.scalar(Int.self))),
              GraphQLField("length", type: .nonNull(.scalar(Int.self))),
              GraphQLField("url", type: .nonNull(.scalar(String.self))),
            ]

            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public init(offset: Int, length: Int, url: String) {
              self.init(unsafeResultMap: ["__typename": "MessageSpanLink", "offset": offset, "length": length, "url": url])
            }

            public var __typename: String {
              get {
                return resultMap["__typename"]! as! String
              }
              set {
                resultMap.updateValue(newValue, forKey: "__typename")
              }
            }

            public var offset: Int {
              get {
                return resultMap["offset"]! as! Int
              }
              set {
                resultMap.updateValue(newValue, forKey: "offset")
              }
            }

            public var length: Int {
              get {
                return resultMap["length"]! as! Int
              }
              set {
                resultMap.updateValue(newValue, forKey: "length")
              }
            }

            public var url: String {
              get {
                return resultMap["url"]! as! String
              }
              set {
                resultMap.updateValue(newValue, forKey: "url")
              }
            }
          }
        }

        public struct Attachment: GraphQLSelectionSet {
          public static let possibleTypes = ["MessageAttachmentFile", "MessageAttachmentPost", "MessageRichAttachment"]

          public static let selections: [GraphQLSelection] = [
            GraphQLTypeCase(
              variants: ["MessageAttachmentFile": AsMessageAttachmentFile.selections, "MessageRichAttachment": AsMessageRichAttachment.selections],
              default: [
                GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
                GraphQLField("fallback", type: .nonNull(.scalar(String.self))),
              ]
            )
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public static func makeMessageAttachmentPost(fallback: String) -> Attachment {
            return Attachment(unsafeResultMap: ["__typename": "MessageAttachmentPost", "fallback": fallback])
          }

          public static func makeMessageAttachmentFile(fallback: String, fileId: String, fileMetadata: AsMessageAttachmentFile.FileMetadatum, filePreview: String? = nil) -> Attachment {
            return Attachment(unsafeResultMap: ["__typename": "MessageAttachmentFile", "fallback": fallback, "fileId": fileId, "fileMetadata": fileMetadata.resultMap, "filePreview": filePreview])
          }

          public static func makeMessageRichAttachment(fallback: String, title: String? = nil, subTitle: String? = nil, titleLink: String? = nil, titleLinkHostname: String? = nil, text: String? = nil, icon: AsMessageRichAttachment.Icon? = nil, image: AsMessageRichAttachment.Image? = nil) -> Attachment {
            return Attachment(unsafeResultMap: ["__typename": "MessageRichAttachment", "fallback": fallback, "title": title, "subTitle": subTitle, "titleLink": titleLink, "titleLinkHostname": titleLinkHostname, "text": text, "icon": icon.flatMap { (value: AsMessageRichAttachment.Icon) -> ResultMap in value.resultMap }, "image": image.flatMap { (value: AsMessageRichAttachment.Image) -> ResultMap in value.resultMap }])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var fallback: String {
            get {
              return resultMap["fallback"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "fallback")
            }
          }

          public var asMessageAttachmentFile: AsMessageAttachmentFile? {
            get {
              if !AsMessageAttachmentFile.possibleTypes.contains(__typename) { return nil }
              return AsMessageAttachmentFile(unsafeResultMap: resultMap)
            }
            set {
              guard let newValue = newValue else { return }
              resultMap = newValue.resultMap
            }
          }

          public struct AsMessageAttachmentFile: GraphQLSelectionSet {
            public static let possibleTypes = ["MessageAttachmentFile"]

            public static let selections: [GraphQLSelection] = [
              GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
              GraphQLField("fallback", type: .nonNull(.scalar(String.self))),
              GraphQLField("fileId", type: .nonNull(.scalar(String.self))),
              GraphQLField("fileMetadata", type: .nonNull(.object(FileMetadatum.selections))),
              GraphQLField("filePreview", type: .scalar(String.self)),
            ]

            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public init(fallback: String, fileId: String, fileMetadata: FileMetadatum, filePreview: String? = nil) {
              self.init(unsafeResultMap: ["__typename": "MessageAttachmentFile", "fallback": fallback, "fileId": fileId, "fileMetadata": fileMetadata.resultMap, "filePreview": filePreview])
            }

            public var __typename: String {
              get {
                return resultMap["__typename"]! as! String
              }
              set {
                resultMap.updateValue(newValue, forKey: "__typename")
              }
            }

            public var fallback: String {
              get {
                return resultMap["fallback"]! as! String
              }
              set {
                resultMap.updateValue(newValue, forKey: "fallback")
              }
            }

            public var fileId: String {
              get {
                return resultMap["fileId"]! as! String
              }
              set {
                resultMap.updateValue(newValue, forKey: "fileId")
              }
            }

            public var fileMetadata: FileMetadatum {
              get {
                return FileMetadatum(unsafeResultMap: resultMap["fileMetadata"]! as! ResultMap)
              }
              set {
                resultMap.updateValue(newValue.resultMap, forKey: "fileMetadata")
              }
            }

            public var filePreview: String? {
              get {
                return resultMap["filePreview"] as? String
              }
              set {
                resultMap.updateValue(newValue, forKey: "filePreview")
              }
            }

            public struct FileMetadatum: GraphQLSelectionSet {
              public static let possibleTypes = ["FileMetadata"]

              public static let selections: [GraphQLSelection] = [
                GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
                GraphQLField("name", type: .nonNull(.scalar(String.self))),
                GraphQLField("mimeType", type: .scalar(String.self)),
                GraphQLField("size", type: .nonNull(.scalar(Int.self))),
                GraphQLField("isImage", type: .nonNull(.scalar(Bool.self))),
                GraphQLField("imageWidth", type: .scalar(Int.self)),
                GraphQLField("imageHeight", type: .scalar(Int.self)),
                GraphQLField("imageFormat", type: .scalar(String.self)),
              ]

              public private(set) var resultMap: ResultMap

              public init(unsafeResultMap: ResultMap) {
                self.resultMap = unsafeResultMap
              }

              public init(name: String, mimeType: String? = nil, size: Int, isImage: Bool, imageWidth: Int? = nil, imageHeight: Int? = nil, imageFormat: String? = nil) {
                self.init(unsafeResultMap: ["__typename": "FileMetadata", "name": name, "mimeType": mimeType, "size": size, "isImage": isImage, "imageWidth": imageWidth, "imageHeight": imageHeight, "imageFormat": imageFormat])
              }

              public var __typename: String {
                get {
                  return resultMap["__typename"]! as! String
                }
                set {
                  resultMap.updateValue(newValue, forKey: "__typename")
                }
              }

              public var name: String {
                get {
                  return resultMap["name"]! as! String
                }
                set {
                  resultMap.updateValue(newValue, forKey: "name")
                }
              }

              public var mimeType: String? {
                get {
                  return resultMap["mimeType"] as? String
                }
                set {
                  resultMap.updateValue(newValue, forKey: "mimeType")
                }
              }

              public var size: Int {
                get {
                  return resultMap["size"]! as! Int
                }
                set {
                  resultMap.updateValue(newValue, forKey: "size")
                }
              }

              public var isImage: Bool {
                get {
                  return resultMap["isImage"]! as! Bool
                }
                set {
                  resultMap.updateValue(newValue, forKey: "isImage")
                }
              }

              public var imageWidth: Int? {
                get {
                  return resultMap["imageWidth"] as? Int
                }
                set {
                  resultMap.updateValue(newValue, forKey: "imageWidth")
                }
              }

              public var imageHeight: Int? {
                get {
                  return resultMap["imageHeight"] as? Int
                }
                set {
                  resultMap.updateValue(newValue, forKey: "imageHeight")
                }
              }

              public var imageFormat: String? {
                get {
                  return resultMap["imageFormat"] as? String
                }
                set {
                  resultMap.updateValue(newValue, forKey: "imageFormat")
                }
              }
            }
          }

          public var asMessageRichAttachment: AsMessageRichAttachment? {
            get {
              if !AsMessageRichAttachment.possibleTypes.contains(__typename) { return nil }
              return AsMessageRichAttachment(unsafeResultMap: resultMap)
            }
            set {
              guard let newValue = newValue else { return }
              resultMap = newValue.resultMap
            }
          }

          public struct AsMessageRichAttachment: GraphQLSelectionSet {
            public static let possibleTypes = ["MessageRichAttachment"]

            public static let selections: [GraphQLSelection] = [
              GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
              GraphQLField("fallback", type: .nonNull(.scalar(String.self))),
              GraphQLField("title", type: .scalar(String.self)),
              GraphQLField("subTitle", type: .scalar(String.self)),
              GraphQLField("titleLink", type: .scalar(String.self)),
              GraphQLField("titleLinkHostname", type: .scalar(String.self)),
              GraphQLField("text", type: .scalar(String.self)),
              GraphQLField("icon", type: .object(Icon.selections)),
              GraphQLField("image", type: .object(Image.selections)),
              GraphQLField("fallback", type: .nonNull(.scalar(String.self))),
            ]

            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public init(fallback: String, title: String? = nil, subTitle: String? = nil, titleLink: String? = nil, titleLinkHostname: String? = nil, text: String? = nil, icon: Icon? = nil, image: Image? = nil) {
              self.init(unsafeResultMap: ["__typename": "MessageRichAttachment", "fallback": fallback, "title": title, "subTitle": subTitle, "titleLink": titleLink, "titleLinkHostname": titleLinkHostname, "text": text, "icon": icon.flatMap { (value: Icon) -> ResultMap in value.resultMap }, "image": image.flatMap { (value: Image) -> ResultMap in value.resultMap }])
            }

            public var __typename: String {
              get {
                return resultMap["__typename"]! as! String
              }
              set {
                resultMap.updateValue(newValue, forKey: "__typename")
              }
            }

            public var fallback: String {
              get {
                return resultMap["fallback"]! as! String
              }
              set {
                resultMap.updateValue(newValue, forKey: "fallback")
              }
            }

            public var title: String? {
              get {
                return resultMap["title"] as? String
              }
              set {
                resultMap.updateValue(newValue, forKey: "title")
              }
            }

            public var subTitle: String? {
              get {
                return resultMap["subTitle"] as? String
              }
              set {
                resultMap.updateValue(newValue, forKey: "subTitle")
              }
            }

            public var titleLink: String? {
              get {
                return resultMap["titleLink"] as? String
              }
              set {
                resultMap.updateValue(newValue, forKey: "titleLink")
              }
            }

            public var titleLinkHostname: String? {
              get {
                return resultMap["titleLinkHostname"] as? String
              }
              set {
                resultMap.updateValue(newValue, forKey: "titleLinkHostname")
              }
            }

            public var text: String? {
              get {
                return resultMap["text"] as? String
              }
              set {
                resultMap.updateValue(newValue, forKey: "text")
              }
            }

            public var icon: Icon? {
              get {
                return (resultMap["icon"] as? ResultMap).flatMap { Icon(unsafeResultMap: $0) }
              }
              set {
                resultMap.updateValue(newValue?.resultMap, forKey: "icon")
              }
            }

            public var image: Image? {
              get {
                return (resultMap["image"] as? ResultMap).flatMap { Image(unsafeResultMap: $0) }
              }
              set {
                resultMap.updateValue(newValue?.resultMap, forKey: "image")
              }
            }

            public struct Icon: GraphQLSelectionSet {
              public static let possibleTypes = ["Image"]

              public static let selections: [GraphQLSelection] = [
                GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
                GraphQLField("url", type: .nonNull(.scalar(String.self))),
                GraphQLField("metadata", type: .object(Metadatum.selections)),
              ]

              public private(set) var resultMap: ResultMap

              public init(unsafeResultMap: ResultMap) {
                self.resultMap = unsafeResultMap
              }

              public init(url: String, metadata: Metadatum? = nil) {
                self.init(unsafeResultMap: ["__typename": "Image", "url": url, "metadata": metadata.flatMap { (value: Metadatum) -> ResultMap in value.resultMap }])
              }

              public var __typename: String {
                get {
                  return resultMap["__typename"]! as! String
                }
                set {
                  resultMap.updateValue(newValue, forKey: "__typename")
                }
              }

              public var url: String {
                get {
                  return resultMap["url"]! as! String
                }
                set {
                  resultMap.updateValue(newValue, forKey: "url")
                }
              }

              public var metadata: Metadatum? {
                get {
                  return (resultMap["metadata"] as? ResultMap).flatMap { Metadatum(unsafeResultMap: $0) }
                }
                set {
                  resultMap.updateValue(newValue?.resultMap, forKey: "metadata")
                }
              }

              public struct Metadatum: GraphQLSelectionSet {
                public static let possibleTypes = ["FileMetadata"]

                public static let selections: [GraphQLSelection] = [
                  GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
                  GraphQLField("name", type: .nonNull(.scalar(String.self))),
                  GraphQLField("mimeType", type: .scalar(String.self)),
                  GraphQLField("size", type: .nonNull(.scalar(Int.self))),
                  GraphQLField("isImage", type: .nonNull(.scalar(Bool.self))),
                  GraphQLField("imageWidth", type: .scalar(Int.self)),
                  GraphQLField("imageHeight", type: .scalar(Int.self)),
                  GraphQLField("imageFormat", type: .scalar(String.self)),
                ]

                public private(set) var resultMap: ResultMap

                public init(unsafeResultMap: ResultMap) {
                  self.resultMap = unsafeResultMap
                }

                public init(name: String, mimeType: String? = nil, size: Int, isImage: Bool, imageWidth: Int? = nil, imageHeight: Int? = nil, imageFormat: String? = nil) {
                  self.init(unsafeResultMap: ["__typename": "FileMetadata", "name": name, "mimeType": mimeType, "size": size, "isImage": isImage, "imageWidth": imageWidth, "imageHeight": imageHeight, "imageFormat": imageFormat])
                }

                public var __typename: String {
                  get {
                    return resultMap["__typename"]! as! String
                  }
                  set {
                    resultMap.updateValue(newValue, forKey: "__typename")
                  }
                }

                public var name: String {
                  get {
                    return resultMap["name"]! as! String
                  }
                  set {
                    resultMap.updateValue(newValue, forKey: "name")
                  }
                }

                public var mimeType: String? {
                  get {
                    return resultMap["mimeType"] as? String
                  }
                  set {
                    resultMap.updateValue(newValue, forKey: "mimeType")
                  }
                }

                public var size: Int {
                  get {
                    return resultMap["size"]! as! Int
                  }
                  set {
                    resultMap.updateValue(newValue, forKey: "size")
                  }
                }

                public var isImage: Bool {
                  get {
                    return resultMap["isImage"]! as! Bool
                  }
                  set {
                    resultMap.updateValue(newValue, forKey: "isImage")
                  }
                }

                public var imageWidth: Int? {
                  get {
                    return resultMap["imageWidth"] as? Int
                  }
                  set {
                    resultMap.updateValue(newValue, forKey: "imageWidth")
                  }
                }

                public var imageHeight: Int? {
                  get {
                    return resultMap["imageHeight"] as? Int
                  }
                  set {
                    resultMap.updateValue(newValue, forKey: "imageHeight")
                  }
                }

                public var imageFormat: String? {
                  get {
                    return resultMap["imageFormat"] as? String
                  }
                  set {
                    resultMap.updateValue(newValue, forKey: "imageFormat")
                  }
                }
              }
            }

            public struct Image: GraphQLSelectionSet {
              public static let possibleTypes = ["Image"]

              public static let selections: [GraphQLSelection] = [
                GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
                GraphQLField("url", type: .nonNull(.scalar(String.self))),
                GraphQLField("metadata", type: .object(Metadatum.selections)),
              ]

              public private(set) var resultMap: ResultMap

              public init(unsafeResultMap: ResultMap) {
                self.resultMap = unsafeResultMap
              }

              public init(url: String, metadata: Metadatum? = nil) {
                self.init(unsafeResultMap: ["__typename": "Image", "url": url, "metadata": metadata.flatMap { (value: Metadatum) -> ResultMap in value.resultMap }])
              }

              public var __typename: String {
                get {
                  return resultMap["__typename"]! as! String
                }
                set {
                  resultMap.updateValue(newValue, forKey: "__typename")
                }
              }

              public var url: String {
                get {
                  return resultMap["url"]! as! String
                }
                set {
                  resultMap.updateValue(newValue, forKey: "url")
                }
              }

              public var metadata: Metadatum? {
                get {
                  return (resultMap["metadata"] as? ResultMap).flatMap { Metadatum(unsafeResultMap: $0) }
                }
                set {
                  resultMap.updateValue(newValue?.resultMap, forKey: "metadata")
                }
              }

              public struct Metadatum: GraphQLSelectionSet {
                public static let possibleTypes = ["FileMetadata"]

                public static let selections: [GraphQLSelection] = [
                  GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
                  GraphQLField("name", type: .nonNull(.scalar(String.self))),
                  GraphQLField("mimeType", type: .scalar(String.self)),
                  GraphQLField("size", type: .nonNull(.scalar(Int.self))),
                  GraphQLField("isImage", type: .nonNull(.scalar(Bool.self))),
                  GraphQLField("imageWidth", type: .scalar(Int.self)),
                  GraphQLField("imageHeight", type: .scalar(Int.self)),
                  GraphQLField("imageFormat", type: .scalar(String.self)),
                ]

                public private(set) var resultMap: ResultMap

                public init(unsafeResultMap: ResultMap) {
                  self.resultMap = unsafeResultMap
                }

                public init(name: String, mimeType: String? = nil, size: Int, isImage: Bool, imageWidth: Int? = nil, imageHeight: Int? = nil, imageFormat: String? = nil) {
                  self.init(unsafeResultMap: ["__typename": "FileMetadata", "name": name, "mimeType": mimeType, "size": size, "isImage": isImage, "imageWidth": imageWidth, "imageHeight": imageHeight, "imageFormat": imageFormat])
                }

                public var __typename: String {
                  get {
                    return resultMap["__typename"]! as! String
                  }
                  set {
                    resultMap.updateValue(newValue, forKey: "__typename")
                  }
                }

                public var name: String {
                  get {
                    return resultMap["name"]! as! String
                  }
                  set {
                    resultMap.updateValue(newValue, forKey: "name")
                  }
                }

                public var mimeType: String? {
                  get {
                    return resultMap["mimeType"] as? String
                  }
                  set {
                    resultMap.updateValue(newValue, forKey: "mimeType")
                  }
                }

                public var size: Int {
                  get {
                    return resultMap["size"]! as! Int
                  }
                  set {
                    resultMap.updateValue(newValue, forKey: "size")
                  }
                }

                public var isImage: Bool {
                  get {
                    return resultMap["isImage"]! as! Bool
                  }
                  set {
                    resultMap.updateValue(newValue, forKey: "isImage")
                  }
                }

                public var imageWidth: Int? {
                  get {
                    return resultMap["imageWidth"] as? Int
                  }
                  set {
                    resultMap.updateValue(newValue, forKey: "imageWidth")
                  }
                }

                public var imageHeight: Int? {
                  get {
                    return resultMap["imageHeight"] as? Int
                  }
                  set {
                    resultMap.updateValue(newValue, forKey: "imageHeight")
                  }
                }

                public var imageFormat: String? {
                  get {
                    return resultMap["imageFormat"] as? String
                  }
                  set {
                    resultMap.updateValue(newValue, forKey: "imageFormat")
                  }
                }
              }
            }
          }
        }
      }
    }

    public struct Reaction: GraphQLSelectionSet {
      public static let possibleTypes = ["ModernMessageReaction"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("user", type: .nonNull(.object(User.selections))),
        GraphQLField("reaction", type: .nonNull(.scalar(MessageReactionType.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(user: User, reaction: MessageReactionType) {
        self.init(unsafeResultMap: ["__typename": "ModernMessageReaction", "user": user.resultMap, "reaction": reaction])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var user: User {
        get {
          return User(unsafeResultMap: resultMap["user"]! as! ResultMap)
        }
        set {
          resultMap.updateValue(newValue.resultMap, forKey: "user")
        }
      }

      public var reaction: MessageReactionType {
        get {
          return resultMap["reaction"]! as! MessageReactionType
        }
        set {
          resultMap.updateValue(newValue, forKey: "reaction")
        }
      }

      public struct User: GraphQLSelectionSet {
        public static let possibleTypes = ["User"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLFragmentSpread(UserShort.self),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var fragments: Fragments {
          get {
            return Fragments(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }

        public struct Fragments {
          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public var userShort: UserShort {
            get {
              return UserShort(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }
        }
      }
    }

    public struct Span: GraphQLSelectionSet {
      public static let possibleTypes = ["MessageSpanLink", "MessageSpanMultiUserMention", "MessageSpanRoomMention", "MessageSpanUserMention"]

      public static let selections: [GraphQLSelection] = [
        GraphQLTypeCase(
          variants: ["MessageSpanUserMention": AsMessageSpanUserMention.selections, "MessageSpanMultiUserMention": AsMessageSpanMultiUserMention.selections, "MessageSpanRoomMention": AsMessageSpanRoomMention.selections, "MessageSpanLink": AsMessageSpanLink.selections],
          default: [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("offset", type: .nonNull(.scalar(Int.self))),
            GraphQLField("length", type: .nonNull(.scalar(Int.self))),
          ]
        )
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public static func makeMessageSpanUserMention(offset: Int, length: Int, user: AsMessageSpanUserMention.User) -> Span {
        return Span(unsafeResultMap: ["__typename": "MessageSpanUserMention", "offset": offset, "length": length, "user": user.resultMap])
      }

      public static func makeMessageSpanMultiUserMention(offset: Int, length: Int, users: [AsMessageSpanMultiUserMention.User]) -> Span {
        return Span(unsafeResultMap: ["__typename": "MessageSpanMultiUserMention", "offset": offset, "length": length, "users": users.map { (value: AsMessageSpanMultiUserMention.User) -> ResultMap in value.resultMap }])
      }

      public static func makeMessageSpanRoomMention(offset: Int, length: Int, room: AsMessageSpanRoomMention.Room) -> Span {
        return Span(unsafeResultMap: ["__typename": "MessageSpanRoomMention", "offset": offset, "length": length, "room": room.resultMap])
      }

      public static func makeMessageSpanLink(offset: Int, length: Int, url: String) -> Span {
        return Span(unsafeResultMap: ["__typename": "MessageSpanLink", "offset": offset, "length": length, "url": url])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var offset: Int {
        get {
          return resultMap["offset"]! as! Int
        }
        set {
          resultMap.updateValue(newValue, forKey: "offset")
        }
      }

      public var length: Int {
        get {
          return resultMap["length"]! as! Int
        }
        set {
          resultMap.updateValue(newValue, forKey: "length")
        }
      }

      public var asMessageSpanUserMention: AsMessageSpanUserMention? {
        get {
          if !AsMessageSpanUserMention.possibleTypes.contains(__typename) { return nil }
          return AsMessageSpanUserMention(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsMessageSpanUserMention: GraphQLSelectionSet {
        public static let possibleTypes = ["MessageSpanUserMention"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("offset", type: .nonNull(.scalar(Int.self))),
          GraphQLField("length", type: .nonNull(.scalar(Int.self))),
          GraphQLField("user", type: .nonNull(.object(User.selections))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(offset: Int, length: Int, user: User) {
          self.init(unsafeResultMap: ["__typename": "MessageSpanUserMention", "offset": offset, "length": length, "user": user.resultMap])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var offset: Int {
          get {
            return resultMap["offset"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "offset")
          }
        }

        public var length: Int {
          get {
            return resultMap["length"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "length")
          }
        }

        public var user: User {
          get {
            return User(unsafeResultMap: resultMap["user"]! as! ResultMap)
          }
          set {
            resultMap.updateValue(newValue.resultMap, forKey: "user")
          }
        }

        public struct User: GraphQLSelectionSet {
          public static let possibleTypes = ["User"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLFragmentSpread(UserTiny.self),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public init(id: GraphQLID, isYou: Bool, name: String, firstName: String, lastName: String? = nil, photo: String? = nil, shortname: String? = nil) {
            self.init(unsafeResultMap: ["__typename": "User", "id": id, "isYou": isYou, "name": name, "firstName": firstName, "lastName": lastName, "photo": photo, "shortname": shortname])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var fragments: Fragments {
            get {
              return Fragments(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }

          public struct Fragments {
            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public var userTiny: UserTiny {
              get {
                return UserTiny(unsafeResultMap: resultMap)
              }
              set {
                resultMap += newValue.resultMap
              }
            }
          }
        }
      }

      public var asMessageSpanMultiUserMention: AsMessageSpanMultiUserMention? {
        get {
          if !AsMessageSpanMultiUserMention.possibleTypes.contains(__typename) { return nil }
          return AsMessageSpanMultiUserMention(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsMessageSpanMultiUserMention: GraphQLSelectionSet {
        public static let possibleTypes = ["MessageSpanMultiUserMention"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("offset", type: .nonNull(.scalar(Int.self))),
          GraphQLField("length", type: .nonNull(.scalar(Int.self))),
          GraphQLField("users", type: .nonNull(.list(.nonNull(.object(User.selections))))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(offset: Int, length: Int, users: [User]) {
          self.init(unsafeResultMap: ["__typename": "MessageSpanMultiUserMention", "offset": offset, "length": length, "users": users.map { (value: User) -> ResultMap in value.resultMap }])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var offset: Int {
          get {
            return resultMap["offset"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "offset")
          }
        }

        public var length: Int {
          get {
            return resultMap["length"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "length")
          }
        }

        public var users: [User] {
          get {
            return (resultMap["users"] as! [ResultMap]).map { (value: ResultMap) -> User in User(unsafeResultMap: value) }
          }
          set {
            resultMap.updateValue(newValue.map { (value: User) -> ResultMap in value.resultMap }, forKey: "users")
          }
        }

        public struct User: GraphQLSelectionSet {
          public static let possibleTypes = ["User"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLFragmentSpread(UserTiny.self),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public init(id: GraphQLID, isYou: Bool, name: String, firstName: String, lastName: String? = nil, photo: String? = nil, shortname: String? = nil) {
            self.init(unsafeResultMap: ["__typename": "User", "id": id, "isYou": isYou, "name": name, "firstName": firstName, "lastName": lastName, "photo": photo, "shortname": shortname])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var fragments: Fragments {
            get {
              return Fragments(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }

          public struct Fragments {
            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public var userTiny: UserTiny {
              get {
                return UserTiny(unsafeResultMap: resultMap)
              }
              set {
                resultMap += newValue.resultMap
              }
            }
          }
        }
      }

      public var asMessageSpanRoomMention: AsMessageSpanRoomMention? {
        get {
          if !AsMessageSpanRoomMention.possibleTypes.contains(__typename) { return nil }
          return AsMessageSpanRoomMention(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsMessageSpanRoomMention: GraphQLSelectionSet {
        public static let possibleTypes = ["MessageSpanRoomMention"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("offset", type: .nonNull(.scalar(Int.self))),
          GraphQLField("length", type: .nonNull(.scalar(Int.self))),
          GraphQLField("room", type: .nonNull(.object(Room.selections))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(offset: Int, length: Int, room: Room) {
          self.init(unsafeResultMap: ["__typename": "MessageSpanRoomMention", "offset": offset, "length": length, "room": room.resultMap])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var offset: Int {
          get {
            return resultMap["offset"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "offset")
          }
        }

        public var length: Int {
          get {
            return resultMap["length"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "length")
          }
        }

        public var room: Room {
          get {
            return Room(unsafeResultMap: resultMap["room"]! as! ResultMap)
          }
          set {
            resultMap.updateValue(newValue.resultMap, forKey: "room")
          }
        }

        public struct Room: GraphQLSelectionSet {
          public static let possibleTypes = ["PrivateRoom", "SharedRoom"]

          public static let selections: [GraphQLSelection] = [
            GraphQLTypeCase(
              variants: ["PrivateRoom": AsPrivateRoom.selections, "SharedRoom": AsSharedRoom.selections],
              default: [
                GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
              ]
            )
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public static func makePrivateRoom(id: GraphQLID, user: AsPrivateRoom.User) -> Room {
            return Room(unsafeResultMap: ["__typename": "PrivateRoom", "id": id, "user": user.resultMap])
          }

          public static func makeSharedRoom(id: GraphQLID, title: String) -> Room {
            return Room(unsafeResultMap: ["__typename": "SharedRoom", "id": id, "title": title])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var asPrivateRoom: AsPrivateRoom? {
            get {
              if !AsPrivateRoom.possibleTypes.contains(__typename) { return nil }
              return AsPrivateRoom(unsafeResultMap: resultMap)
            }
            set {
              guard let newValue = newValue else { return }
              resultMap = newValue.resultMap
            }
          }

          public struct AsPrivateRoom: GraphQLSelectionSet {
            public static let possibleTypes = ["PrivateRoom"]

            public static let selections: [GraphQLSelection] = [
              GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
              GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
              GraphQLField("user", type: .nonNull(.object(User.selections))),
            ]

            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public init(id: GraphQLID, user: User) {
              self.init(unsafeResultMap: ["__typename": "PrivateRoom", "id": id, "user": user.resultMap])
            }

            public var __typename: String {
              get {
                return resultMap["__typename"]! as! String
              }
              set {
                resultMap.updateValue(newValue, forKey: "__typename")
              }
            }

            public var id: GraphQLID {
              get {
                return resultMap["id"]! as! GraphQLID
              }
              set {
                resultMap.updateValue(newValue, forKey: "id")
              }
            }

            public var user: User {
              get {
                return User(unsafeResultMap: resultMap["user"]! as! ResultMap)
              }
              set {
                resultMap.updateValue(newValue.resultMap, forKey: "user")
              }
            }

            public struct User: GraphQLSelectionSet {
              public static let possibleTypes = ["User"]

              public static let selections: [GraphQLSelection] = [
                GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
                GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
                GraphQLField("name", type: .nonNull(.scalar(String.self))),
              ]

              public private(set) var resultMap: ResultMap

              public init(unsafeResultMap: ResultMap) {
                self.resultMap = unsafeResultMap
              }

              public init(id: GraphQLID, name: String) {
                self.init(unsafeResultMap: ["__typename": "User", "id": id, "name": name])
              }

              public var __typename: String {
                get {
                  return resultMap["__typename"]! as! String
                }
                set {
                  resultMap.updateValue(newValue, forKey: "__typename")
                }
              }

              public var id: GraphQLID {
                get {
                  return resultMap["id"]! as! GraphQLID
                }
                set {
                  resultMap.updateValue(newValue, forKey: "id")
                }
              }

              public var name: String {
                get {
                  return resultMap["name"]! as! String
                }
                set {
                  resultMap.updateValue(newValue, forKey: "name")
                }
              }
            }
          }

          public var asSharedRoom: AsSharedRoom? {
            get {
              if !AsSharedRoom.possibleTypes.contains(__typename) { return nil }
              return AsSharedRoom(unsafeResultMap: resultMap)
            }
            set {
              guard let newValue = newValue else { return }
              resultMap = newValue.resultMap
            }
          }

          public struct AsSharedRoom: GraphQLSelectionSet {
            public static let possibleTypes = ["SharedRoom"]

            public static let selections: [GraphQLSelection] = [
              GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
              GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
              GraphQLField("title", type: .nonNull(.scalar(String.self))),
            ]

            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public init(id: GraphQLID, title: String) {
              self.init(unsafeResultMap: ["__typename": "SharedRoom", "id": id, "title": title])
            }

            public var __typename: String {
              get {
                return resultMap["__typename"]! as! String
              }
              set {
                resultMap.updateValue(newValue, forKey: "__typename")
              }
            }

            public var id: GraphQLID {
              get {
                return resultMap["id"]! as! GraphQLID
              }
              set {
                resultMap.updateValue(newValue, forKey: "id")
              }
            }

            public var title: String {
              get {
                return resultMap["title"]! as! String
              }
              set {
                resultMap.updateValue(newValue, forKey: "title")
              }
            }
          }
        }
      }

      public var asMessageSpanLink: AsMessageSpanLink? {
        get {
          if !AsMessageSpanLink.possibleTypes.contains(__typename) { return nil }
          return AsMessageSpanLink(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsMessageSpanLink: GraphQLSelectionSet {
        public static let possibleTypes = ["MessageSpanLink"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("offset", type: .nonNull(.scalar(Int.self))),
          GraphQLField("length", type: .nonNull(.scalar(Int.self))),
          GraphQLField("url", type: .nonNull(.scalar(String.self))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(offset: Int, length: Int, url: String) {
          self.init(unsafeResultMap: ["__typename": "MessageSpanLink", "offset": offset, "length": length, "url": url])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var offset: Int {
          get {
            return resultMap["offset"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "offset")
          }
        }

        public var length: Int {
          get {
            return resultMap["length"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "length")
          }
        }

        public var url: String {
          get {
            return resultMap["url"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "url")
          }
        }
      }
    }
  }

  public var asServiceMessage: AsServiceMessage? {
    get {
      if !AsServiceMessage.possibleTypes.contains(__typename) { return nil }
      return AsServiceMessage(unsafeResultMap: resultMap)
    }
    set {
      guard let newValue = newValue else { return }
      resultMap = newValue.resultMap
    }
  }

  public struct AsServiceMessage: GraphQLSelectionSet {
    public static let possibleTypes = ["ServiceMessage"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
      GraphQLField("date", type: .nonNull(.scalar(String.self))),
      GraphQLField("sender", type: .nonNull(.object(Sender.selections))),
      GraphQLField("message", type: .scalar(String.self)),
      GraphQLField("fallback", type: .nonNull(.scalar(String.self))),
      GraphQLField("spans", type: .nonNull(.list(.nonNull(.object(Span.selections))))),
      GraphQLField("serviceMetadata", type: .object(ServiceMetadatum.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(id: GraphQLID, date: String, sender: Sender, message: String? = nil, fallback: String, spans: [Span], serviceMetadata: ServiceMetadatum? = nil) {
      self.init(unsafeResultMap: ["__typename": "ServiceMessage", "id": id, "date": date, "sender": sender.resultMap, "message": message, "fallback": fallback, "spans": spans.map { (value: Span) -> ResultMap in value.resultMap }, "serviceMetadata": serviceMetadata.flatMap { (value: ServiceMetadatum) -> ResultMap in value.resultMap }])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    /// State
    public var id: GraphQLID {
      get {
        return resultMap["id"]! as! GraphQLID
      }
      set {
        resultMap.updateValue(newValue, forKey: "id")
      }
    }

    public var date: String {
      get {
        return resultMap["date"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "date")
      }
    }

    public var sender: Sender {
      get {
        return Sender(unsafeResultMap: resultMap["sender"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "sender")
      }
    }

    /// Content
    public var message: String? {
      get {
        return resultMap["message"] as? String
      }
      set {
        resultMap.updateValue(newValue, forKey: "message")
      }
    }

    public var fallback: String {
      get {
        return resultMap["fallback"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "fallback")
      }
    }

    public var spans: [Span] {
      get {
        return (resultMap["spans"] as! [ResultMap]).map { (value: ResultMap) -> Span in Span(unsafeResultMap: value) }
      }
      set {
        resultMap.updateValue(newValue.map { (value: Span) -> ResultMap in value.resultMap }, forKey: "spans")
      }
    }

    public var serviceMetadata: ServiceMetadatum? {
      get {
        return (resultMap["serviceMetadata"] as? ResultMap).flatMap { ServiceMetadatum(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "serviceMetadata")
      }
    }

    public struct Sender: GraphQLSelectionSet {
      public static let possibleTypes = ["User"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(UserShort.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var userShort: UserShort {
          get {
            return UserShort(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }

    public struct Span: GraphQLSelectionSet {
      public static let possibleTypes = ["MessageSpanLink", "MessageSpanMultiUserMention", "MessageSpanRoomMention", "MessageSpanUserMention"]

      public static let selections: [GraphQLSelection] = [
        GraphQLTypeCase(
          variants: ["MessageSpanUserMention": AsMessageSpanUserMention.selections, "MessageSpanMultiUserMention": AsMessageSpanMultiUserMention.selections, "MessageSpanRoomMention": AsMessageSpanRoomMention.selections, "MessageSpanLink": AsMessageSpanLink.selections],
          default: [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("offset", type: .nonNull(.scalar(Int.self))),
            GraphQLField("length", type: .nonNull(.scalar(Int.self))),
          ]
        )
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public static func makeMessageSpanUserMention(offset: Int, length: Int, user: AsMessageSpanUserMention.User) -> Span {
        return Span(unsafeResultMap: ["__typename": "MessageSpanUserMention", "offset": offset, "length": length, "user": user.resultMap])
      }

      public static func makeMessageSpanMultiUserMention(offset: Int, length: Int, users: [AsMessageSpanMultiUserMention.User]) -> Span {
        return Span(unsafeResultMap: ["__typename": "MessageSpanMultiUserMention", "offset": offset, "length": length, "users": users.map { (value: AsMessageSpanMultiUserMention.User) -> ResultMap in value.resultMap }])
      }

      public static func makeMessageSpanRoomMention(offset: Int, length: Int, room: AsMessageSpanRoomMention.Room) -> Span {
        return Span(unsafeResultMap: ["__typename": "MessageSpanRoomMention", "offset": offset, "length": length, "room": room.resultMap])
      }

      public static func makeMessageSpanLink(offset: Int, length: Int, url: String) -> Span {
        return Span(unsafeResultMap: ["__typename": "MessageSpanLink", "offset": offset, "length": length, "url": url])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var offset: Int {
        get {
          return resultMap["offset"]! as! Int
        }
        set {
          resultMap.updateValue(newValue, forKey: "offset")
        }
      }

      public var length: Int {
        get {
          return resultMap["length"]! as! Int
        }
        set {
          resultMap.updateValue(newValue, forKey: "length")
        }
      }

      public var asMessageSpanUserMention: AsMessageSpanUserMention? {
        get {
          if !AsMessageSpanUserMention.possibleTypes.contains(__typename) { return nil }
          return AsMessageSpanUserMention(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsMessageSpanUserMention: GraphQLSelectionSet {
        public static let possibleTypes = ["MessageSpanUserMention"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("offset", type: .nonNull(.scalar(Int.self))),
          GraphQLField("length", type: .nonNull(.scalar(Int.self))),
          GraphQLField("user", type: .nonNull(.object(User.selections))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(offset: Int, length: Int, user: User) {
          self.init(unsafeResultMap: ["__typename": "MessageSpanUserMention", "offset": offset, "length": length, "user": user.resultMap])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var offset: Int {
          get {
            return resultMap["offset"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "offset")
          }
        }

        public var length: Int {
          get {
            return resultMap["length"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "length")
          }
        }

        public var user: User {
          get {
            return User(unsafeResultMap: resultMap["user"]! as! ResultMap)
          }
          set {
            resultMap.updateValue(newValue.resultMap, forKey: "user")
          }
        }

        public struct User: GraphQLSelectionSet {
          public static let possibleTypes = ["User"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLFragmentSpread(UserTiny.self),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public init(id: GraphQLID, isYou: Bool, name: String, firstName: String, lastName: String? = nil, photo: String? = nil, shortname: String? = nil) {
            self.init(unsafeResultMap: ["__typename": "User", "id": id, "isYou": isYou, "name": name, "firstName": firstName, "lastName": lastName, "photo": photo, "shortname": shortname])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var fragments: Fragments {
            get {
              return Fragments(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }

          public struct Fragments {
            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public var userTiny: UserTiny {
              get {
                return UserTiny(unsafeResultMap: resultMap)
              }
              set {
                resultMap += newValue.resultMap
              }
            }
          }
        }
      }

      public var asMessageSpanMultiUserMention: AsMessageSpanMultiUserMention? {
        get {
          if !AsMessageSpanMultiUserMention.possibleTypes.contains(__typename) { return nil }
          return AsMessageSpanMultiUserMention(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsMessageSpanMultiUserMention: GraphQLSelectionSet {
        public static let possibleTypes = ["MessageSpanMultiUserMention"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("offset", type: .nonNull(.scalar(Int.self))),
          GraphQLField("length", type: .nonNull(.scalar(Int.self))),
          GraphQLField("users", type: .nonNull(.list(.nonNull(.object(User.selections))))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(offset: Int, length: Int, users: [User]) {
          self.init(unsafeResultMap: ["__typename": "MessageSpanMultiUserMention", "offset": offset, "length": length, "users": users.map { (value: User) -> ResultMap in value.resultMap }])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var offset: Int {
          get {
            return resultMap["offset"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "offset")
          }
        }

        public var length: Int {
          get {
            return resultMap["length"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "length")
          }
        }

        public var users: [User] {
          get {
            return (resultMap["users"] as! [ResultMap]).map { (value: ResultMap) -> User in User(unsafeResultMap: value) }
          }
          set {
            resultMap.updateValue(newValue.map { (value: User) -> ResultMap in value.resultMap }, forKey: "users")
          }
        }

        public struct User: GraphQLSelectionSet {
          public static let possibleTypes = ["User"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLFragmentSpread(UserTiny.self),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public init(id: GraphQLID, isYou: Bool, name: String, firstName: String, lastName: String? = nil, photo: String? = nil, shortname: String? = nil) {
            self.init(unsafeResultMap: ["__typename": "User", "id": id, "isYou": isYou, "name": name, "firstName": firstName, "lastName": lastName, "photo": photo, "shortname": shortname])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var fragments: Fragments {
            get {
              return Fragments(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }

          public struct Fragments {
            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public var userTiny: UserTiny {
              get {
                return UserTiny(unsafeResultMap: resultMap)
              }
              set {
                resultMap += newValue.resultMap
              }
            }
          }
        }
      }

      public var asMessageSpanRoomMention: AsMessageSpanRoomMention? {
        get {
          if !AsMessageSpanRoomMention.possibleTypes.contains(__typename) { return nil }
          return AsMessageSpanRoomMention(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsMessageSpanRoomMention: GraphQLSelectionSet {
        public static let possibleTypes = ["MessageSpanRoomMention"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("offset", type: .nonNull(.scalar(Int.self))),
          GraphQLField("length", type: .nonNull(.scalar(Int.self))),
          GraphQLField("room", type: .nonNull(.object(Room.selections))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(offset: Int, length: Int, room: Room) {
          self.init(unsafeResultMap: ["__typename": "MessageSpanRoomMention", "offset": offset, "length": length, "room": room.resultMap])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var offset: Int {
          get {
            return resultMap["offset"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "offset")
          }
        }

        public var length: Int {
          get {
            return resultMap["length"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "length")
          }
        }

        public var room: Room {
          get {
            return Room(unsafeResultMap: resultMap["room"]! as! ResultMap)
          }
          set {
            resultMap.updateValue(newValue.resultMap, forKey: "room")
          }
        }

        public struct Room: GraphQLSelectionSet {
          public static let possibleTypes = ["PrivateRoom", "SharedRoom"]

          public static let selections: [GraphQLSelection] = [
            GraphQLTypeCase(
              variants: ["PrivateRoom": AsPrivateRoom.selections, "SharedRoom": AsSharedRoom.selections],
              default: [
                GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
              ]
            )
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public static func makePrivateRoom(id: GraphQLID, user: AsPrivateRoom.User) -> Room {
            return Room(unsafeResultMap: ["__typename": "PrivateRoom", "id": id, "user": user.resultMap])
          }

          public static func makeSharedRoom(id: GraphQLID, title: String) -> Room {
            return Room(unsafeResultMap: ["__typename": "SharedRoom", "id": id, "title": title])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var asPrivateRoom: AsPrivateRoom? {
            get {
              if !AsPrivateRoom.possibleTypes.contains(__typename) { return nil }
              return AsPrivateRoom(unsafeResultMap: resultMap)
            }
            set {
              guard let newValue = newValue else { return }
              resultMap = newValue.resultMap
            }
          }

          public struct AsPrivateRoom: GraphQLSelectionSet {
            public static let possibleTypes = ["PrivateRoom"]

            public static let selections: [GraphQLSelection] = [
              GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
              GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
              GraphQLField("user", type: .nonNull(.object(User.selections))),
            ]

            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public init(id: GraphQLID, user: User) {
              self.init(unsafeResultMap: ["__typename": "PrivateRoom", "id": id, "user": user.resultMap])
            }

            public var __typename: String {
              get {
                return resultMap["__typename"]! as! String
              }
              set {
                resultMap.updateValue(newValue, forKey: "__typename")
              }
            }

            public var id: GraphQLID {
              get {
                return resultMap["id"]! as! GraphQLID
              }
              set {
                resultMap.updateValue(newValue, forKey: "id")
              }
            }

            public var user: User {
              get {
                return User(unsafeResultMap: resultMap["user"]! as! ResultMap)
              }
              set {
                resultMap.updateValue(newValue.resultMap, forKey: "user")
              }
            }

            public struct User: GraphQLSelectionSet {
              public static let possibleTypes = ["User"]

              public static let selections: [GraphQLSelection] = [
                GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
                GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
                GraphQLField("name", type: .nonNull(.scalar(String.self))),
              ]

              public private(set) var resultMap: ResultMap

              public init(unsafeResultMap: ResultMap) {
                self.resultMap = unsafeResultMap
              }

              public init(id: GraphQLID, name: String) {
                self.init(unsafeResultMap: ["__typename": "User", "id": id, "name": name])
              }

              public var __typename: String {
                get {
                  return resultMap["__typename"]! as! String
                }
                set {
                  resultMap.updateValue(newValue, forKey: "__typename")
                }
              }

              public var id: GraphQLID {
                get {
                  return resultMap["id"]! as! GraphQLID
                }
                set {
                  resultMap.updateValue(newValue, forKey: "id")
                }
              }

              public var name: String {
                get {
                  return resultMap["name"]! as! String
                }
                set {
                  resultMap.updateValue(newValue, forKey: "name")
                }
              }
            }
          }

          public var asSharedRoom: AsSharedRoom? {
            get {
              if !AsSharedRoom.possibleTypes.contains(__typename) { return nil }
              return AsSharedRoom(unsafeResultMap: resultMap)
            }
            set {
              guard let newValue = newValue else { return }
              resultMap = newValue.resultMap
            }
          }

          public struct AsSharedRoom: GraphQLSelectionSet {
            public static let possibleTypes = ["SharedRoom"]

            public static let selections: [GraphQLSelection] = [
              GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
              GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
              GraphQLField("title", type: .nonNull(.scalar(String.self))),
            ]

            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public init(id: GraphQLID, title: String) {
              self.init(unsafeResultMap: ["__typename": "SharedRoom", "id": id, "title": title])
            }

            public var __typename: String {
              get {
                return resultMap["__typename"]! as! String
              }
              set {
                resultMap.updateValue(newValue, forKey: "__typename")
              }
            }

            public var id: GraphQLID {
              get {
                return resultMap["id"]! as! GraphQLID
              }
              set {
                resultMap.updateValue(newValue, forKey: "id")
              }
            }

            public var title: String {
              get {
                return resultMap["title"]! as! String
              }
              set {
                resultMap.updateValue(newValue, forKey: "title")
              }
            }
          }
        }
      }

      public var asMessageSpanLink: AsMessageSpanLink? {
        get {
          if !AsMessageSpanLink.possibleTypes.contains(__typename) { return nil }
          return AsMessageSpanLink(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsMessageSpanLink: GraphQLSelectionSet {
        public static let possibleTypes = ["MessageSpanLink"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("offset", type: .nonNull(.scalar(Int.self))),
          GraphQLField("length", type: .nonNull(.scalar(Int.self))),
          GraphQLField("url", type: .nonNull(.scalar(String.self))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(offset: Int, length: Int, url: String) {
          self.init(unsafeResultMap: ["__typename": "MessageSpanLink", "offset": offset, "length": length, "url": url])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var offset: Int {
          get {
            return resultMap["offset"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "offset")
          }
        }

        public var length: Int {
          get {
            return resultMap["length"]! as! Int
          }
          set {
            resultMap.updateValue(newValue, forKey: "length")
          }
        }

        public var url: String {
          get {
            return resultMap["url"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "url")
          }
        }
      }
    }

    public struct ServiceMetadatum: GraphQLSelectionSet {
      public static let possibleTypes = ["InviteServiceMetadata", "KickServiceMetadata", "TitleChangeServiceMetadata", "PhotoChangeServiceMetadata", "PostRespondServiceMetadata"]

      public static let selections: [GraphQLSelection] = [
        GraphQLTypeCase(
          variants: ["InviteServiceMetadata": AsInviteServiceMetadata.selections, "KickServiceMetadata": AsKickServiceMetadata.selections, "TitleChangeServiceMetadata": AsTitleChangeServiceMetadata.selections, "PhotoChangeServiceMetadata": AsPhotoChangeServiceMetadata.selections, "PostRespondServiceMetadata": AsPostRespondServiceMetadata.selections],
          default: [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          ]
        )
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public static func makeInviteServiceMetadata(users: [AsInviteServiceMetadata.User]? = nil, invitedBy: AsInviteServiceMetadata.InvitedBy) -> ServiceMetadatum {
        return ServiceMetadatum(unsafeResultMap: ["__typename": "InviteServiceMetadata", "users": users.flatMap { (value: [AsInviteServiceMetadata.User]) -> [ResultMap] in value.map { (value: AsInviteServiceMetadata.User) -> ResultMap in value.resultMap } }, "invitedBy": invitedBy.resultMap])
      }

      public static func makeKickServiceMetadata(user: AsKickServiceMetadata.User, kickedBy: AsKickServiceMetadata.KickedBy) -> ServiceMetadatum {
        return ServiceMetadatum(unsafeResultMap: ["__typename": "KickServiceMetadata", "user": user.resultMap, "kickedBy": kickedBy.resultMap])
      }

      public static func makeTitleChangeServiceMetadata(title: String) -> ServiceMetadatum {
        return ServiceMetadatum(unsafeResultMap: ["__typename": "TitleChangeServiceMetadata", "title": title])
      }

      public static func makePhotoChangeServiceMetadata(photo: String? = nil) -> ServiceMetadatum {
        return ServiceMetadatum(unsafeResultMap: ["__typename": "PhotoChangeServiceMetadata", "photo": photo])
      }

      public static func makePostRespondServiceMetadata(respondType: GraphQLID) -> ServiceMetadatum {
        return ServiceMetadatum(unsafeResultMap: ["__typename": "PostRespondServiceMetadata", "respondType": respondType])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var asInviteServiceMetadata: AsInviteServiceMetadata? {
        get {
          if !AsInviteServiceMetadata.possibleTypes.contains(__typename) { return nil }
          return AsInviteServiceMetadata(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsInviteServiceMetadata: GraphQLSelectionSet {
        public static let possibleTypes = ["InviteServiceMetadata"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("users", type: .list(.nonNull(.object(User.selections)))),
          GraphQLField("invitedBy", type: .nonNull(.object(InvitedBy.selections))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(users: [User]? = nil, invitedBy: InvitedBy) {
          self.init(unsafeResultMap: ["__typename": "InviteServiceMetadata", "users": users.flatMap { (value: [User]) -> [ResultMap] in value.map { (value: User) -> ResultMap in value.resultMap } }, "invitedBy": invitedBy.resultMap])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var users: [User]? {
          get {
            return (resultMap["users"] as? [ResultMap]).flatMap { (value: [ResultMap]) -> [User] in value.map { (value: ResultMap) -> User in User(unsafeResultMap: value) } }
          }
          set {
            resultMap.updateValue(newValue.flatMap { (value: [User]) -> [ResultMap] in value.map { (value: User) -> ResultMap in value.resultMap } }, forKey: "users")
          }
        }

        public var invitedBy: InvitedBy {
          get {
            return InvitedBy(unsafeResultMap: resultMap["invitedBy"]! as! ResultMap)
          }
          set {
            resultMap.updateValue(newValue.resultMap, forKey: "invitedBy")
          }
        }

        public struct User: GraphQLSelectionSet {
          public static let possibleTypes = ["User"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLFragmentSpread(UserTiny.self),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public init(id: GraphQLID, isYou: Bool, name: String, firstName: String, lastName: String? = nil, photo: String? = nil, shortname: String? = nil) {
            self.init(unsafeResultMap: ["__typename": "User", "id": id, "isYou": isYou, "name": name, "firstName": firstName, "lastName": lastName, "photo": photo, "shortname": shortname])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var fragments: Fragments {
            get {
              return Fragments(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }

          public struct Fragments {
            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public var userTiny: UserTiny {
              get {
                return UserTiny(unsafeResultMap: resultMap)
              }
              set {
                resultMap += newValue.resultMap
              }
            }
          }
        }

        public struct InvitedBy: GraphQLSelectionSet {
          public static let possibleTypes = ["User"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLFragmentSpread(UserTiny.self),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public init(id: GraphQLID, isYou: Bool, name: String, firstName: String, lastName: String? = nil, photo: String? = nil, shortname: String? = nil) {
            self.init(unsafeResultMap: ["__typename": "User", "id": id, "isYou": isYou, "name": name, "firstName": firstName, "lastName": lastName, "photo": photo, "shortname": shortname])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var fragments: Fragments {
            get {
              return Fragments(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }

          public struct Fragments {
            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public var userTiny: UserTiny {
              get {
                return UserTiny(unsafeResultMap: resultMap)
              }
              set {
                resultMap += newValue.resultMap
              }
            }
          }
        }
      }

      public var asKickServiceMetadata: AsKickServiceMetadata? {
        get {
          if !AsKickServiceMetadata.possibleTypes.contains(__typename) { return nil }
          return AsKickServiceMetadata(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsKickServiceMetadata: GraphQLSelectionSet {
        public static let possibleTypes = ["KickServiceMetadata"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("user", type: .nonNull(.object(User.selections))),
          GraphQLField("kickedBy", type: .nonNull(.object(KickedBy.selections))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(user: User, kickedBy: KickedBy) {
          self.init(unsafeResultMap: ["__typename": "KickServiceMetadata", "user": user.resultMap, "kickedBy": kickedBy.resultMap])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var user: User {
          get {
            return User(unsafeResultMap: resultMap["user"]! as! ResultMap)
          }
          set {
            resultMap.updateValue(newValue.resultMap, forKey: "user")
          }
        }

        public var kickedBy: KickedBy {
          get {
            return KickedBy(unsafeResultMap: resultMap["kickedBy"]! as! ResultMap)
          }
          set {
            resultMap.updateValue(newValue.resultMap, forKey: "kickedBy")
          }
        }

        public struct User: GraphQLSelectionSet {
          public static let possibleTypes = ["User"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLFragmentSpread(UserTiny.self),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public init(id: GraphQLID, isYou: Bool, name: String, firstName: String, lastName: String? = nil, photo: String? = nil, shortname: String? = nil) {
            self.init(unsafeResultMap: ["__typename": "User", "id": id, "isYou": isYou, "name": name, "firstName": firstName, "lastName": lastName, "photo": photo, "shortname": shortname])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var fragments: Fragments {
            get {
              return Fragments(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }

          public struct Fragments {
            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public var userTiny: UserTiny {
              get {
                return UserTiny(unsafeResultMap: resultMap)
              }
              set {
                resultMap += newValue.resultMap
              }
            }
          }
        }

        public struct KickedBy: GraphQLSelectionSet {
          public static let possibleTypes = ["User"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLFragmentSpread(UserTiny.self),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public init(id: GraphQLID, isYou: Bool, name: String, firstName: String, lastName: String? = nil, photo: String? = nil, shortname: String? = nil) {
            self.init(unsafeResultMap: ["__typename": "User", "id": id, "isYou": isYou, "name": name, "firstName": firstName, "lastName": lastName, "photo": photo, "shortname": shortname])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var fragments: Fragments {
            get {
              return Fragments(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }

          public struct Fragments {
            public private(set) var resultMap: ResultMap

            public init(unsafeResultMap: ResultMap) {
              self.resultMap = unsafeResultMap
            }

            public var userTiny: UserTiny {
              get {
                return UserTiny(unsafeResultMap: resultMap)
              }
              set {
                resultMap += newValue.resultMap
              }
            }
          }
        }
      }

      public var asTitleChangeServiceMetadata: AsTitleChangeServiceMetadata? {
        get {
          if !AsTitleChangeServiceMetadata.possibleTypes.contains(__typename) { return nil }
          return AsTitleChangeServiceMetadata(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsTitleChangeServiceMetadata: GraphQLSelectionSet {
        public static let possibleTypes = ["TitleChangeServiceMetadata"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("title", type: .nonNull(.scalar(String.self))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(title: String) {
          self.init(unsafeResultMap: ["__typename": "TitleChangeServiceMetadata", "title": title])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var title: String {
          get {
            return resultMap["title"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "title")
          }
        }
      }

      public var asPhotoChangeServiceMetadata: AsPhotoChangeServiceMetadata? {
        get {
          if !AsPhotoChangeServiceMetadata.possibleTypes.contains(__typename) { return nil }
          return AsPhotoChangeServiceMetadata(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsPhotoChangeServiceMetadata: GraphQLSelectionSet {
        public static let possibleTypes = ["PhotoChangeServiceMetadata"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("photo", type: .scalar(String.self)),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(photo: String? = nil) {
          self.init(unsafeResultMap: ["__typename": "PhotoChangeServiceMetadata", "photo": photo])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var photo: String? {
          get {
            return resultMap["photo"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "photo")
          }
        }
      }

      public var asPostRespondServiceMetadata: AsPostRespondServiceMetadata? {
        get {
          if !AsPostRespondServiceMetadata.possibleTypes.contains(__typename) { return nil }
          return AsPostRespondServiceMetadata(unsafeResultMap: resultMap)
        }
        set {
          guard let newValue = newValue else { return }
          resultMap = newValue.resultMap
        }
      }

      public struct AsPostRespondServiceMetadata: GraphQLSelectionSet {
        public static let possibleTypes = ["PostRespondServiceMetadata"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("respondType", type: .nonNull(.scalar(GraphQLID.self))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(respondType: GraphQLID) {
          self.init(unsafeResultMap: ["__typename": "PostRespondServiceMetadata", "respondType": respondType])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var respondType: GraphQLID {
          get {
            return resultMap["respondType"]! as! GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "respondType")
          }
        }
      }
    }
  }
}

public struct OrganizationFull: GraphQLFragment {
  public static let fragmentDefinition =
    "fragment OrganizationFull on Organization {\n  __typename\n  id\n  superAccountId\n  isMine\n  isOwner: betaIsOwner\n  isAdmin: betaIsAdmin\n  featured: alphaFeatured\n  isCommunity: alphaIsCommunity\n  name\n  photo\n  shortname\n  website\n  about\n  twitter\n  facebook\n  linkedin\n  members: alphaOrganizationMembers {\n    __typename\n    role\n    user {\n      __typename\n      ...UserFull\n    }\n  }\n  requests: alphaOrganizationMemberRequests {\n    __typename\n    role\n    user {\n      __typename\n      ...UserFull\n    }\n  }\n  rooms: betaPublicRooms {\n    __typename\n    ...RoomShort\n  }\n}"

  public static let possibleTypes = ["Organization"]

  public static let selections: [GraphQLSelection] = [
    GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
    GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
    GraphQLField("superAccountId", type: .nonNull(.scalar(GraphQLID.self))),
    GraphQLField("isMine", type: .nonNull(.scalar(Bool.self))),
    GraphQLField("betaIsOwner", alias: "isOwner", type: .nonNull(.scalar(Bool.self))),
    GraphQLField("betaIsAdmin", alias: "isAdmin", type: .nonNull(.scalar(Bool.self))),
    GraphQLField("alphaFeatured", alias: "featured", type: .nonNull(.scalar(Bool.self))),
    GraphQLField("alphaIsCommunity", alias: "isCommunity", type: .nonNull(.scalar(Bool.self))),
    GraphQLField("name", type: .nonNull(.scalar(String.self))),
    GraphQLField("photo", type: .scalar(String.self)),
    GraphQLField("shortname", type: .scalar(String.self)),
    GraphQLField("website", type: .scalar(String.self)),
    GraphQLField("about", type: .scalar(String.self)),
    GraphQLField("twitter", type: .scalar(String.self)),
    GraphQLField("facebook", type: .scalar(String.self)),
    GraphQLField("linkedin", type: .scalar(String.self)),
    GraphQLField("alphaOrganizationMembers", alias: "members", type: .nonNull(.list(.nonNull(.object(Member.selections))))),
    GraphQLField("alphaOrganizationMemberRequests", alias: "requests", type: .nonNull(.list(.nonNull(.object(Request.selections))))),
    GraphQLField("betaPublicRooms", alias: "rooms", type: .nonNull(.list(.nonNull(.object(Room.selections))))),
  ]

  public private(set) var resultMap: ResultMap

  public init(unsafeResultMap: ResultMap) {
    self.resultMap = unsafeResultMap
  }

  public init(id: GraphQLID, superAccountId: GraphQLID, isMine: Bool, isOwner: Bool, isAdmin: Bool, featured: Bool, isCommunity: Bool, name: String, photo: String? = nil, shortname: String? = nil, website: String? = nil, about: String? = nil, twitter: String? = nil, facebook: String? = nil, linkedin: String? = nil, members: [Member], requests: [Request], rooms: [Room]) {
    self.init(unsafeResultMap: ["__typename": "Organization", "id": id, "superAccountId": superAccountId, "isMine": isMine, "isOwner": isOwner, "isAdmin": isAdmin, "featured": featured, "isCommunity": isCommunity, "name": name, "photo": photo, "shortname": shortname, "website": website, "about": about, "twitter": twitter, "facebook": facebook, "linkedin": linkedin, "members": members.map { (value: Member) -> ResultMap in value.resultMap }, "requests": requests.map { (value: Request) -> ResultMap in value.resultMap }, "rooms": rooms.map { (value: Room) -> ResultMap in value.resultMap }])
  }

  public var __typename: String {
    get {
      return resultMap["__typename"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "__typename")
    }
  }

  public var id: GraphQLID {
    get {
      return resultMap["id"]! as! GraphQLID
    }
    set {
      resultMap.updateValue(newValue, forKey: "id")
    }
  }

  /// # Refactor?
  public var superAccountId: GraphQLID {
    get {
      return resultMap["superAccountId"]! as! GraphQLID
    }
    set {
      resultMap.updateValue(newValue, forKey: "superAccountId")
    }
  }

  public var isMine: Bool {
    get {
      return resultMap["isMine"]! as! Bool
    }
    set {
      resultMap.updateValue(newValue, forKey: "isMine")
    }
  }

  public var isOwner: Bool {
    get {
      return resultMap["isOwner"]! as! Bool
    }
    set {
      resultMap.updateValue(newValue, forKey: "isOwner")
    }
  }

  public var isAdmin: Bool {
    get {
      return resultMap["isAdmin"]! as! Bool
    }
    set {
      resultMap.updateValue(newValue, forKey: "isAdmin")
    }
  }

  public var featured: Bool {
    get {
      return resultMap["featured"]! as! Bool
    }
    set {
      resultMap.updateValue(newValue, forKey: "featured")
    }
  }

  public var isCommunity: Bool {
    get {
      return resultMap["isCommunity"]! as! Bool
    }
    set {
      resultMap.updateValue(newValue, forKey: "isCommunity")
    }
  }

  public var name: String {
    get {
      return resultMap["name"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "name")
    }
  }

  public var photo: String? {
    get {
      return resultMap["photo"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "photo")
    }
  }

  public var shortname: String? {
    get {
      return resultMap["shortname"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "shortname")
    }
  }

  public var website: String? {
    get {
      return resultMap["website"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "website")
    }
  }

  public var about: String? {
    get {
      return resultMap["about"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "about")
    }
  }

  public var twitter: String? {
    get {
      return resultMap["twitter"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "twitter")
    }
  }

  public var facebook: String? {
    get {
      return resultMap["facebook"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "facebook")
    }
  }

  public var linkedin: String? {
    get {
      return resultMap["linkedin"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "linkedin")
    }
  }

  public var members: [Member] {
    get {
      return (resultMap["members"] as! [ResultMap]).map { (value: ResultMap) -> Member in Member(unsafeResultMap: value) }
    }
    set {
      resultMap.updateValue(newValue.map { (value: Member) -> ResultMap in value.resultMap }, forKey: "members")
    }
  }

  public var requests: [Request] {
    get {
      return (resultMap["requests"] as! [ResultMap]).map { (value: ResultMap) -> Request in Request(unsafeResultMap: value) }
    }
    set {
      resultMap.updateValue(newValue.map { (value: Request) -> ResultMap in value.resultMap }, forKey: "requests")
    }
  }

  public var rooms: [Room] {
    get {
      return (resultMap["rooms"] as! [ResultMap]).map { (value: ResultMap) -> Room in Room(unsafeResultMap: value) }
    }
    set {
      resultMap.updateValue(newValue.map { (value: Room) -> ResultMap in value.resultMap }, forKey: "rooms")
    }
  }

  public struct Member: GraphQLSelectionSet {
    public static let possibleTypes = ["OrganizationJoinedMember"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLField("role", type: .nonNull(.scalar(OrganizationMemberRole.self))),
      GraphQLField("user", type: .nonNull(.object(User.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(role: OrganizationMemberRole, user: User) {
      self.init(unsafeResultMap: ["__typename": "OrganizationJoinedMember", "role": role, "user": user.resultMap])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var role: OrganizationMemberRole {
      get {
        return resultMap["role"]! as! OrganizationMemberRole
      }
      set {
        resultMap.updateValue(newValue, forKey: "role")
      }
    }

    public var user: User {
      get {
        return User(unsafeResultMap: resultMap["user"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "user")
      }
    }

    public struct User: GraphQLSelectionSet {
      public static let possibleTypes = ["User"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(UserFull.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var userFull: UserFull {
          get {
            return UserFull(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }

  public struct Request: GraphQLSelectionSet {
    public static let possibleTypes = ["OrganizationRequestedMember"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLField("role", type: .nonNull(.scalar(OrganizationMemberRole.self))),
      GraphQLField("user", type: .nonNull(.object(User.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(role: OrganizationMemberRole, user: User) {
      self.init(unsafeResultMap: ["__typename": "OrganizationRequestedMember", "role": role, "user": user.resultMap])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var role: OrganizationMemberRole {
      get {
        return resultMap["role"]! as! OrganizationMemberRole
      }
      set {
        resultMap.updateValue(newValue, forKey: "role")
      }
    }

    public var user: User {
      get {
        return User(unsafeResultMap: resultMap["user"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "user")
      }
    }

    public struct User: GraphQLSelectionSet {
      public static let possibleTypes = ["User"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(UserFull.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var userFull: UserFull {
          get {
            return UserFull(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }

  public struct Room: GraphQLSelectionSet {
    public static let possibleTypes = ["SharedRoom"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLFragmentSpread(RoomShort.self),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var fragments: Fragments {
      get {
        return Fragments(unsafeResultMap: resultMap)
      }
      set {
        resultMap += newValue.resultMap
      }
    }

    public struct Fragments {
      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var roomShort: RoomShort {
        get {
          return RoomShort(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }
    }
  }
}

public struct OrganizationMedium: GraphQLFragment {
  public static let fragmentDefinition =
    "fragment OrganizationMedium on Organization {\n  __typename\n  id\n  name\n  photo\n  isMine\n  isOwner: betaIsOwner\n  isAdmin: betaIsAdmin\n  isCommunity: alphaIsCommunity\n  adminMembers: alphaOrganizationAdminMembers {\n    __typename\n    role\n    user {\n      __typename\n      ...UserFull\n    }\n  }\n}"

  public static let possibleTypes = ["Organization"]

  public static let selections: [GraphQLSelection] = [
    GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
    GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
    GraphQLField("name", type: .nonNull(.scalar(String.self))),
    GraphQLField("photo", type: .scalar(String.self)),
    GraphQLField("isMine", type: .nonNull(.scalar(Bool.self))),
    GraphQLField("betaIsOwner", alias: "isOwner", type: .nonNull(.scalar(Bool.self))),
    GraphQLField("betaIsAdmin", alias: "isAdmin", type: .nonNull(.scalar(Bool.self))),
    GraphQLField("alphaIsCommunity", alias: "isCommunity", type: .nonNull(.scalar(Bool.self))),
    GraphQLField("alphaOrganizationAdminMembers", alias: "adminMembers", type: .nonNull(.list(.nonNull(.object(AdminMember.selections))))),
  ]

  public private(set) var resultMap: ResultMap

  public init(unsafeResultMap: ResultMap) {
    self.resultMap = unsafeResultMap
  }

  public init(id: GraphQLID, name: String, photo: String? = nil, isMine: Bool, isOwner: Bool, isAdmin: Bool, isCommunity: Bool, adminMembers: [AdminMember]) {
    self.init(unsafeResultMap: ["__typename": "Organization", "id": id, "name": name, "photo": photo, "isMine": isMine, "isOwner": isOwner, "isAdmin": isAdmin, "isCommunity": isCommunity, "adminMembers": adminMembers.map { (value: AdminMember) -> ResultMap in value.resultMap }])
  }

  public var __typename: String {
    get {
      return resultMap["__typename"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "__typename")
    }
  }

  public var id: GraphQLID {
    get {
      return resultMap["id"]! as! GraphQLID
    }
    set {
      resultMap.updateValue(newValue, forKey: "id")
    }
  }

  public var name: String {
    get {
      return resultMap["name"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "name")
    }
  }

  public var photo: String? {
    get {
      return resultMap["photo"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "photo")
    }
  }

  public var isMine: Bool {
    get {
      return resultMap["isMine"]! as! Bool
    }
    set {
      resultMap.updateValue(newValue, forKey: "isMine")
    }
  }

  public var isOwner: Bool {
    get {
      return resultMap["isOwner"]! as! Bool
    }
    set {
      resultMap.updateValue(newValue, forKey: "isOwner")
    }
  }

  public var isAdmin: Bool {
    get {
      return resultMap["isAdmin"]! as! Bool
    }
    set {
      resultMap.updateValue(newValue, forKey: "isAdmin")
    }
  }

  public var isCommunity: Bool {
    get {
      return resultMap["isCommunity"]! as! Bool
    }
    set {
      resultMap.updateValue(newValue, forKey: "isCommunity")
    }
  }

  public var adminMembers: [AdminMember] {
    get {
      return (resultMap["adminMembers"] as! [ResultMap]).map { (value: ResultMap) -> AdminMember in AdminMember(unsafeResultMap: value) }
    }
    set {
      resultMap.updateValue(newValue.map { (value: AdminMember) -> ResultMap in value.resultMap }, forKey: "adminMembers")
    }
  }

  public struct AdminMember: GraphQLSelectionSet {
    public static let possibleTypes = ["OrganizationJoinedMember"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLField("role", type: .nonNull(.scalar(OrganizationMemberRole.self))),
      GraphQLField("user", type: .nonNull(.object(User.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(role: OrganizationMemberRole, user: User) {
      self.init(unsafeResultMap: ["__typename": "OrganizationJoinedMember", "role": role, "user": user.resultMap])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var role: OrganizationMemberRole {
      get {
        return resultMap["role"]! as! OrganizationMemberRole
      }
      set {
        resultMap.updateValue(newValue, forKey: "role")
      }
    }

    public var user: User {
      get {
        return User(unsafeResultMap: resultMap["user"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "user")
      }
    }

    public struct User: GraphQLSelectionSet {
      public static let possibleTypes = ["User"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(UserFull.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var userFull: UserFull {
          get {
            return UserFull(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public struct OrganizationProfileFull: GraphQLFragment {
  public static let fragmentDefinition =
    "fragment OrganizationProfileFull on OrganizationProfile {\n  __typename\n  id\n  name\n  photoRef {\n    __typename\n    uuid\n    crop {\n      __typename\n      x\n      y\n      w\n      h\n    }\n  }\n  website\n  websiteTitle\n  about\n  twitter\n  facebook\n  linkedin\n  shortname\n  featured: alphaFeatured\n}"

  public static let possibleTypes = ["OrganizationProfile"]

  public static let selections: [GraphQLSelection] = [
    GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
    GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
    GraphQLField("name", type: .nonNull(.scalar(String.self))),
    GraphQLField("photoRef", type: .object(PhotoRef.selections)),
    GraphQLField("website", type: .scalar(String.self)),
    GraphQLField("websiteTitle", type: .scalar(String.self)),
    GraphQLField("about", type: .scalar(String.self)),
    GraphQLField("twitter", type: .scalar(String.self)),
    GraphQLField("facebook", type: .scalar(String.self)),
    GraphQLField("linkedin", type: .scalar(String.self)),
    GraphQLField("shortname", type: .scalar(String.self)),
    GraphQLField("alphaFeatured", alias: "featured", type: .nonNull(.scalar(Bool.self))),
  ]

  public private(set) var resultMap: ResultMap

  public init(unsafeResultMap: ResultMap) {
    self.resultMap = unsafeResultMap
  }

  public init(id: GraphQLID, name: String, photoRef: PhotoRef? = nil, website: String? = nil, websiteTitle: String? = nil, about: String? = nil, twitter: String? = nil, facebook: String? = nil, linkedin: String? = nil, shortname: String? = nil, featured: Bool) {
    self.init(unsafeResultMap: ["__typename": "OrganizationProfile", "id": id, "name": name, "photoRef": photoRef.flatMap { (value: PhotoRef) -> ResultMap in value.resultMap }, "website": website, "websiteTitle": websiteTitle, "about": about, "twitter": twitter, "facebook": facebook, "linkedin": linkedin, "shortname": shortname, "featured": featured])
  }

  public var __typename: String {
    get {
      return resultMap["__typename"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "__typename")
    }
  }

  public var id: GraphQLID {
    get {
      return resultMap["id"]! as! GraphQLID
    }
    set {
      resultMap.updateValue(newValue, forKey: "id")
    }
  }

  public var name: String {
    get {
      return resultMap["name"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "name")
    }
  }

  public var photoRef: PhotoRef? {
    get {
      return (resultMap["photoRef"] as? ResultMap).flatMap { PhotoRef(unsafeResultMap: $0) }
    }
    set {
      resultMap.updateValue(newValue?.resultMap, forKey: "photoRef")
    }
  }

  public var website: String? {
    get {
      return resultMap["website"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "website")
    }
  }

  public var websiteTitle: String? {
    get {
      return resultMap["websiteTitle"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "websiteTitle")
    }
  }

  public var about: String? {
    get {
      return resultMap["about"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "about")
    }
  }

  public var twitter: String? {
    get {
      return resultMap["twitter"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "twitter")
    }
  }

  public var facebook: String? {
    get {
      return resultMap["facebook"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "facebook")
    }
  }

  public var linkedin: String? {
    get {
      return resultMap["linkedin"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "linkedin")
    }
  }

  public var shortname: String? {
    get {
      return resultMap["shortname"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "shortname")
    }
  }

  public var featured: Bool {
    get {
      return resultMap["featured"]! as! Bool
    }
    set {
      resultMap.updateValue(newValue, forKey: "featured")
    }
  }

  public struct PhotoRef: GraphQLSelectionSet {
    public static let possibleTypes = ["ImageRef"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLField("uuid", type: .nonNull(.scalar(String.self))),
      GraphQLField("crop", type: .object(Crop.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(uuid: String, crop: Crop? = nil) {
      self.init(unsafeResultMap: ["__typename": "ImageRef", "uuid": uuid, "crop": crop.flatMap { (value: Crop) -> ResultMap in value.resultMap }])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var uuid: String {
      get {
        return resultMap["uuid"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "uuid")
      }
    }

    public var crop: Crop? {
      get {
        return (resultMap["crop"] as? ResultMap).flatMap { Crop(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "crop")
      }
    }

    public struct Crop: GraphQLSelectionSet {
      public static let possibleTypes = ["ImageCrop"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("x", type: .nonNull(.scalar(Int.self))),
        GraphQLField("y", type: .nonNull(.scalar(Int.self))),
        GraphQLField("w", type: .nonNull(.scalar(Int.self))),
        GraphQLField("h", type: .nonNull(.scalar(Int.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(x: Int, y: Int, w: Int, h: Int) {
        self.init(unsafeResultMap: ["__typename": "ImageCrop", "x": x, "y": y, "w": w, "h": h])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var x: Int {
        get {
          return resultMap["x"]! as! Int
        }
        set {
          resultMap.updateValue(newValue, forKey: "x")
        }
      }

      public var y: Int {
        get {
          return resultMap["y"]! as! Int
        }
        set {
          resultMap.updateValue(newValue, forKey: "y")
        }
      }

      public var w: Int {
        get {
          return resultMap["w"]! as! Int
        }
        set {
          resultMap.updateValue(newValue, forKey: "w")
        }
      }

      public var h: Int {
        get {
          return resultMap["h"]! as! Int
        }
        set {
          resultMap.updateValue(newValue, forKey: "h")
        }
      }
    }
  }
}

public struct OrganizationSearch: GraphQLFragment {
  public static let fragmentDefinition =
    "fragment OrganizationSearch on Organization {\n  __typename\n  id\n  superAccountId\n  name\n  photo\n  isMine\n  about\n  status\n  featured: alphaFeatured\n  members: alphaOrganizationMembers {\n    __typename\n    user {\n      __typename\n      id\n      name\n      photo\n    }\n  }\n}"

  public static let possibleTypes = ["Organization"]

  public static let selections: [GraphQLSelection] = [
    GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
    GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
    GraphQLField("superAccountId", type: .nonNull(.scalar(GraphQLID.self))),
    GraphQLField("name", type: .nonNull(.scalar(String.self))),
    GraphQLField("photo", type: .scalar(String.self)),
    GraphQLField("isMine", type: .nonNull(.scalar(Bool.self))),
    GraphQLField("about", type: .scalar(String.self)),
    GraphQLField("status", type: .nonNull(.scalar(String.self))),
    GraphQLField("alphaFeatured", alias: "featured", type: .nonNull(.scalar(Bool.self))),
    GraphQLField("alphaOrganizationMembers", alias: "members", type: .nonNull(.list(.nonNull(.object(Member.selections))))),
  ]

  public private(set) var resultMap: ResultMap

  public init(unsafeResultMap: ResultMap) {
    self.resultMap = unsafeResultMap
  }

  public init(id: GraphQLID, superAccountId: GraphQLID, name: String, photo: String? = nil, isMine: Bool, about: String? = nil, status: String, featured: Bool, members: [Member]) {
    self.init(unsafeResultMap: ["__typename": "Organization", "id": id, "superAccountId": superAccountId, "name": name, "photo": photo, "isMine": isMine, "about": about, "status": status, "featured": featured, "members": members.map { (value: Member) -> ResultMap in value.resultMap }])
  }

  public var __typename: String {
    get {
      return resultMap["__typename"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "__typename")
    }
  }

  public var id: GraphQLID {
    get {
      return resultMap["id"]! as! GraphQLID
    }
    set {
      resultMap.updateValue(newValue, forKey: "id")
    }
  }

  /// # Refactor?
  public var superAccountId: GraphQLID {
    get {
      return resultMap["superAccountId"]! as! GraphQLID
    }
    set {
      resultMap.updateValue(newValue, forKey: "superAccountId")
    }
  }

  public var name: String {
    get {
      return resultMap["name"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "name")
    }
  }

  public var photo: String? {
    get {
      return resultMap["photo"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "photo")
    }
  }

  public var isMine: Bool {
    get {
      return resultMap["isMine"]! as! Bool
    }
    set {
      resultMap.updateValue(newValue, forKey: "isMine")
    }
  }

  public var about: String? {
    get {
      return resultMap["about"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "about")
    }
  }

  public var status: String {
    get {
      return resultMap["status"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "status")
    }
  }

  public var featured: Bool {
    get {
      return resultMap["featured"]! as! Bool
    }
    set {
      resultMap.updateValue(newValue, forKey: "featured")
    }
  }

  public var members: [Member] {
    get {
      return (resultMap["members"] as! [ResultMap]).map { (value: ResultMap) -> Member in Member(unsafeResultMap: value) }
    }
    set {
      resultMap.updateValue(newValue.map { (value: Member) -> ResultMap in value.resultMap }, forKey: "members")
    }
  }

  public struct Member: GraphQLSelectionSet {
    public static let possibleTypes = ["OrganizationJoinedMember"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLField("user", type: .nonNull(.object(User.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(user: User) {
      self.init(unsafeResultMap: ["__typename": "OrganizationJoinedMember", "user": user.resultMap])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var user: User {
      get {
        return User(unsafeResultMap: resultMap["user"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "user")
      }
    }

    public struct User: GraphQLSelectionSet {
      public static let possibleTypes = ["User"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("name", type: .nonNull(.scalar(String.self))),
        GraphQLField("photo", type: .scalar(String.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, name: String, photo: String? = nil) {
        self.init(unsafeResultMap: ["__typename": "User", "id": id, "name": name, "photo": photo])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var name: String {
        get {
          return resultMap["name"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "name")
        }
      }

      public var photo: String? {
        get {
          return resultMap["photo"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "photo")
        }
      }
    }
  }
}

public struct OrganizationShort: GraphQLFragment {
  public static let fragmentDefinition =
    "fragment OrganizationShort on Organization {\n  __typename\n  id\n  name\n  photo\n  isCommunity: alphaIsCommunity\n}"

  public static let possibleTypes = ["Organization"]

  public static let selections: [GraphQLSelection] = [
    GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
    GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
    GraphQLField("name", type: .nonNull(.scalar(String.self))),
    GraphQLField("photo", type: .scalar(String.self)),
    GraphQLField("alphaIsCommunity", alias: "isCommunity", type: .nonNull(.scalar(Bool.self))),
  ]

  public private(set) var resultMap: ResultMap

  public init(unsafeResultMap: ResultMap) {
    self.resultMap = unsafeResultMap
  }

  public init(id: GraphQLID, name: String, photo: String? = nil, isCommunity: Bool) {
    self.init(unsafeResultMap: ["__typename": "Organization", "id": id, "name": name, "photo": photo, "isCommunity": isCommunity])
  }

  public var __typename: String {
    get {
      return resultMap["__typename"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "__typename")
    }
  }

  public var id: GraphQLID {
    get {
      return resultMap["id"]! as! GraphQLID
    }
    set {
      resultMap.updateValue(newValue, forKey: "id")
    }
  }

  public var name: String {
    get {
      return resultMap["name"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "name")
    }
  }

  public var photo: String? {
    get {
      return resultMap["photo"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "photo")
    }
  }

  public var isCommunity: Bool {
    get {
      return resultMap["isCommunity"]! as! Bool
    }
    set {
      resultMap.updateValue(newValue, forKey: "isCommunity")
    }
  }
}

public struct RoomFull: GraphQLFragment {
  public static let fragmentDefinition =
    "fragment RoomFull on Room {\n  __typename\n  ... on PrivateRoom {\n    id\n    user {\n      __typename\n      ...UserShort\n    }\n    settings {\n      __typename\n      id\n      mute\n    }\n  }\n  ... on SharedRoom {\n    id\n    kind\n    title\n    photo\n    socialImage\n    description\n    organization {\n      __typename\n      ...OrganizationMedium\n    }\n    membership\n    role\n    membersCount\n    members {\n      __typename\n      role\n      membership\n      user {\n        __typename\n        ...UserShort\n      }\n      canKick\n    }\n    requests {\n      __typename\n      user {\n        __typename\n        ...UserShort\n      }\n    }\n    settings {\n      __typename\n      id\n      mute\n    }\n    canEdit\n    welcomeMessage {\n      __typename\n      isOn\n      sender {\n        __typename\n        id\n        name\n      }\n      message\n    }\n    pinnedMessage {\n      __typename\n      ...FullMessage\n    }\n  }\n}"

  public static let possibleTypes = ["PrivateRoom", "SharedRoom"]

  public static let selections: [GraphQLSelection] = [
    GraphQLTypeCase(
      variants: ["PrivateRoom": AsPrivateRoom.selections, "SharedRoom": AsSharedRoom.selections],
      default: [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      ]
    )
  ]

  public private(set) var resultMap: ResultMap

  public init(unsafeResultMap: ResultMap) {
    self.resultMap = unsafeResultMap
  }

  public static func makePrivateRoom(id: GraphQLID, user: AsPrivateRoom.User, settings: AsPrivateRoom.Setting) -> RoomFull {
    return RoomFull(unsafeResultMap: ["__typename": "PrivateRoom", "id": id, "user": user.resultMap, "settings": settings.resultMap])
  }

  public static func makeSharedRoom(id: GraphQLID, kind: SharedRoomKind, title: String, photo: String, socialImage: String? = nil, description: String? = nil, organization: AsSharedRoom.Organization? = nil, membership: SharedRoomMembershipStatus, role: RoomMemberRole, membersCount: Int? = nil, members: [AsSharedRoom.Member], requests: [AsSharedRoom.Request]? = nil, settings: AsSharedRoom.Setting, canEdit: Bool, welcomeMessage: AsSharedRoom.WelcomeMessage? = nil, pinnedMessage: AsSharedRoom.PinnedMessage? = nil) -> RoomFull {
    return RoomFull(unsafeResultMap: ["__typename": "SharedRoom", "id": id, "kind": kind, "title": title, "photo": photo, "socialImage": socialImage, "description": description, "organization": organization.flatMap { (value: AsSharedRoom.Organization) -> ResultMap in value.resultMap }, "membership": membership, "role": role, "membersCount": membersCount, "members": members.map { (value: AsSharedRoom.Member) -> ResultMap in value.resultMap }, "requests": requests.flatMap { (value: [AsSharedRoom.Request]) -> [ResultMap] in value.map { (value: AsSharedRoom.Request) -> ResultMap in value.resultMap } }, "settings": settings.resultMap, "canEdit": canEdit, "welcomeMessage": welcomeMessage.flatMap { (value: AsSharedRoom.WelcomeMessage) -> ResultMap in value.resultMap }, "pinnedMessage": pinnedMessage.flatMap { (value: AsSharedRoom.PinnedMessage) -> ResultMap in value.resultMap }])
  }

  public var __typename: String {
    get {
      return resultMap["__typename"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "__typename")
    }
  }

  public var asPrivateRoom: AsPrivateRoom? {
    get {
      if !AsPrivateRoom.possibleTypes.contains(__typename) { return nil }
      return AsPrivateRoom(unsafeResultMap: resultMap)
    }
    set {
      guard let newValue = newValue else { return }
      resultMap = newValue.resultMap
    }
  }

  public struct AsPrivateRoom: GraphQLSelectionSet {
    public static let possibleTypes = ["PrivateRoom"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
      GraphQLField("user", type: .nonNull(.object(User.selections))),
      GraphQLField("settings", type: .nonNull(.object(Setting.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(id: GraphQLID, user: User, settings: Setting) {
      self.init(unsafeResultMap: ["__typename": "PrivateRoom", "id": id, "user": user.resultMap, "settings": settings.resultMap])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var id: GraphQLID {
      get {
        return resultMap["id"]! as! GraphQLID
      }
      set {
        resultMap.updateValue(newValue, forKey: "id")
      }
    }

    public var user: User {
      get {
        return User(unsafeResultMap: resultMap["user"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "user")
      }
    }

    public var settings: Setting {
      get {
        return Setting(unsafeResultMap: resultMap["settings"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "settings")
      }
    }

    public struct User: GraphQLSelectionSet {
      public static let possibleTypes = ["User"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(UserShort.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var userShort: UserShort {
          get {
            return UserShort(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }

    public struct Setting: GraphQLSelectionSet {
      public static let possibleTypes = ["RoomUserNotificaionSettings"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("mute", type: .scalar(Bool.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, mute: Bool? = nil) {
        self.init(unsafeResultMap: ["__typename": "RoomUserNotificaionSettings", "id": id, "mute": mute])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var mute: Bool? {
        get {
          return resultMap["mute"] as? Bool
        }
        set {
          resultMap.updateValue(newValue, forKey: "mute")
        }
      }
    }
  }

  public var asSharedRoom: AsSharedRoom? {
    get {
      if !AsSharedRoom.possibleTypes.contains(__typename) { return nil }
      return AsSharedRoom(unsafeResultMap: resultMap)
    }
    set {
      guard let newValue = newValue else { return }
      resultMap = newValue.resultMap
    }
  }

  public struct AsSharedRoom: GraphQLSelectionSet {
    public static let possibleTypes = ["SharedRoom"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
      GraphQLField("kind", type: .nonNull(.scalar(SharedRoomKind.self))),
      GraphQLField("title", type: .nonNull(.scalar(String.self))),
      GraphQLField("photo", type: .nonNull(.scalar(String.self))),
      GraphQLField("socialImage", type: .scalar(String.self)),
      GraphQLField("description", type: .scalar(String.self)),
      GraphQLField("organization", type: .object(Organization.selections)),
      GraphQLField("membership", type: .nonNull(.scalar(SharedRoomMembershipStatus.self))),
      GraphQLField("role", type: .nonNull(.scalar(RoomMemberRole.self))),
      GraphQLField("membersCount", type: .scalar(Int.self)),
      GraphQLField("members", type: .nonNull(.list(.nonNull(.object(Member.selections))))),
      GraphQLField("requests", type: .list(.nonNull(.object(Request.selections)))),
      GraphQLField("settings", type: .nonNull(.object(Setting.selections))),
      GraphQLField("canEdit", type: .nonNull(.scalar(Bool.self))),
      GraphQLField("welcomeMessage", type: .object(WelcomeMessage.selections)),
      GraphQLField("pinnedMessage", type: .object(PinnedMessage.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(id: GraphQLID, kind: SharedRoomKind, title: String, photo: String, socialImage: String? = nil, description: String? = nil, organization: Organization? = nil, membership: SharedRoomMembershipStatus, role: RoomMemberRole, membersCount: Int? = nil, members: [Member], requests: [Request]? = nil, settings: Setting, canEdit: Bool, welcomeMessage: WelcomeMessage? = nil, pinnedMessage: PinnedMessage? = nil) {
      self.init(unsafeResultMap: ["__typename": "SharedRoom", "id": id, "kind": kind, "title": title, "photo": photo, "socialImage": socialImage, "description": description, "organization": organization.flatMap { (value: Organization) -> ResultMap in value.resultMap }, "membership": membership, "role": role, "membersCount": membersCount, "members": members.map { (value: Member) -> ResultMap in value.resultMap }, "requests": requests.flatMap { (value: [Request]) -> [ResultMap] in value.map { (value: Request) -> ResultMap in value.resultMap } }, "settings": settings.resultMap, "canEdit": canEdit, "welcomeMessage": welcomeMessage.flatMap { (value: WelcomeMessage) -> ResultMap in value.resultMap }, "pinnedMessage": pinnedMessage.flatMap { (value: PinnedMessage) -> ResultMap in value.resultMap }])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var id: GraphQLID {
      get {
        return resultMap["id"]! as! GraphQLID
      }
      set {
        resultMap.updateValue(newValue, forKey: "id")
      }
    }

    public var kind: SharedRoomKind {
      get {
        return resultMap["kind"]! as! SharedRoomKind
      }
      set {
        resultMap.updateValue(newValue, forKey: "kind")
      }
    }

    public var title: String {
      get {
        return resultMap["title"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "title")
      }
    }

    public var photo: String {
      get {
        return resultMap["photo"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "photo")
      }
    }

    public var socialImage: String? {
      get {
        return resultMap["socialImage"] as? String
      }
      set {
        resultMap.updateValue(newValue, forKey: "socialImage")
      }
    }

    public var description: String? {
      get {
        return resultMap["description"] as? String
      }
      set {
        resultMap.updateValue(newValue, forKey: "description")
      }
    }

    public var organization: Organization? {
      get {
        return (resultMap["organization"] as? ResultMap).flatMap { Organization(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "organization")
      }
    }

    public var membership: SharedRoomMembershipStatus {
      get {
        return resultMap["membership"]! as! SharedRoomMembershipStatus
      }
      set {
        resultMap.updateValue(newValue, forKey: "membership")
      }
    }

    public var role: RoomMemberRole {
      get {
        return resultMap["role"]! as! RoomMemberRole
      }
      set {
        resultMap.updateValue(newValue, forKey: "role")
      }
    }

    public var membersCount: Int? {
      get {
        return resultMap["membersCount"] as? Int
      }
      set {
        resultMap.updateValue(newValue, forKey: "membersCount")
      }
    }

    public var members: [Member] {
      get {
        return (resultMap["members"] as! [ResultMap]).map { (value: ResultMap) -> Member in Member(unsafeResultMap: value) }
      }
      set {
        resultMap.updateValue(newValue.map { (value: Member) -> ResultMap in value.resultMap }, forKey: "members")
      }
    }

    public var requests: [Request]? {
      get {
        return (resultMap["requests"] as? [ResultMap]).flatMap { (value: [ResultMap]) -> [Request] in value.map { (value: ResultMap) -> Request in Request(unsafeResultMap: value) } }
      }
      set {
        resultMap.updateValue(newValue.flatMap { (value: [Request]) -> [ResultMap] in value.map { (value: Request) -> ResultMap in value.resultMap } }, forKey: "requests")
      }
    }

    public var settings: Setting {
      get {
        return Setting(unsafeResultMap: resultMap["settings"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "settings")
      }
    }

    public var canEdit: Bool {
      get {
        return resultMap["canEdit"]! as! Bool
      }
      set {
        resultMap.updateValue(newValue, forKey: "canEdit")
      }
    }

    public var welcomeMessage: WelcomeMessage? {
      get {
        return (resultMap["welcomeMessage"] as? ResultMap).flatMap { WelcomeMessage(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "welcomeMessage")
      }
    }

    public var pinnedMessage: PinnedMessage? {
      get {
        return (resultMap["pinnedMessage"] as? ResultMap).flatMap { PinnedMessage(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "pinnedMessage")
      }
    }

    public struct Organization: GraphQLSelectionSet {
      public static let possibleTypes = ["Organization"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(OrganizationMedium.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var organizationMedium: OrganizationMedium {
          get {
            return OrganizationMedium(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }

    public struct Member: GraphQLSelectionSet {
      public static let possibleTypes = ["RoomMember"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("role", type: .nonNull(.scalar(RoomMemberRole.self))),
        GraphQLField("membership", type: .nonNull(.scalar(SharedRoomMembershipStatus.self))),
        GraphQLField("user", type: .nonNull(.object(User.selections))),
        GraphQLField("canKick", type: .nonNull(.scalar(Bool.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(role: RoomMemberRole, membership: SharedRoomMembershipStatus, user: User, canKick: Bool) {
        self.init(unsafeResultMap: ["__typename": "RoomMember", "role": role, "membership": membership, "user": user.resultMap, "canKick": canKick])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var role: RoomMemberRole {
        get {
          return resultMap["role"]! as! RoomMemberRole
        }
        set {
          resultMap.updateValue(newValue, forKey: "role")
        }
      }

      public var membership: SharedRoomMembershipStatus {
        get {
          return resultMap["membership"]! as! SharedRoomMembershipStatus
        }
        set {
          resultMap.updateValue(newValue, forKey: "membership")
        }
      }

      public var user: User {
        get {
          return User(unsafeResultMap: resultMap["user"]! as! ResultMap)
        }
        set {
          resultMap.updateValue(newValue.resultMap, forKey: "user")
        }
      }

      public var canKick: Bool {
        get {
          return resultMap["canKick"]! as! Bool
        }
        set {
          resultMap.updateValue(newValue, forKey: "canKick")
        }
      }

      public struct User: GraphQLSelectionSet {
        public static let possibleTypes = ["User"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLFragmentSpread(UserShort.self),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var fragments: Fragments {
          get {
            return Fragments(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }

        public struct Fragments {
          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public var userShort: UserShort {
            get {
              return UserShort(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }
        }
      }
    }

    public struct Request: GraphQLSelectionSet {
      public static let possibleTypes = ["RoomMember"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("user", type: .nonNull(.object(User.selections))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(user: User) {
        self.init(unsafeResultMap: ["__typename": "RoomMember", "user": user.resultMap])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var user: User {
        get {
          return User(unsafeResultMap: resultMap["user"]! as! ResultMap)
        }
        set {
          resultMap.updateValue(newValue.resultMap, forKey: "user")
        }
      }

      public struct User: GraphQLSelectionSet {
        public static let possibleTypes = ["User"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLFragmentSpread(UserShort.self),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var fragments: Fragments {
          get {
            return Fragments(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }

        public struct Fragments {
          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public var userShort: UserShort {
            get {
              return UserShort(unsafeResultMap: resultMap)
            }
            set {
              resultMap += newValue.resultMap
            }
          }
        }
      }
    }

    public struct Setting: GraphQLSelectionSet {
      public static let possibleTypes = ["RoomUserNotificaionSettings"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("mute", type: .scalar(Bool.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, mute: Bool? = nil) {
        self.init(unsafeResultMap: ["__typename": "RoomUserNotificaionSettings", "id": id, "mute": mute])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var mute: Bool? {
        get {
          return resultMap["mute"] as? Bool
        }
        set {
          resultMap.updateValue(newValue, forKey: "mute")
        }
      }
    }

    public struct WelcomeMessage: GraphQLSelectionSet {
      public static let possibleTypes = ["WelcomeMessage"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("isOn", type: .nonNull(.scalar(Bool.self))),
        GraphQLField("sender", type: .object(Sender.selections)),
        GraphQLField("message", type: .scalar(String.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(isOn: Bool, sender: Sender? = nil, message: String? = nil) {
        self.init(unsafeResultMap: ["__typename": "WelcomeMessage", "isOn": isOn, "sender": sender.flatMap { (value: Sender) -> ResultMap in value.resultMap }, "message": message])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var isOn: Bool {
        get {
          return resultMap["isOn"]! as! Bool
        }
        set {
          resultMap.updateValue(newValue, forKey: "isOn")
        }
      }

      public var sender: Sender? {
        get {
          return (resultMap["sender"] as? ResultMap).flatMap { Sender(unsafeResultMap: $0) }
        }
        set {
          resultMap.updateValue(newValue?.resultMap, forKey: "sender")
        }
      }

      public var message: String? {
        get {
          return resultMap["message"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "message")
        }
      }

      public struct Sender: GraphQLSelectionSet {
        public static let possibleTypes = ["User"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
          GraphQLField("name", type: .nonNull(.scalar(String.self))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(id: GraphQLID, name: String) {
          self.init(unsafeResultMap: ["__typename": "User", "id": id, "name": name])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var id: GraphQLID {
          get {
            return resultMap["id"]! as! GraphQLID
          }
          set {
            resultMap.updateValue(newValue, forKey: "id")
          }
        }

        public var name: String {
          get {
            return resultMap["name"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "name")
          }
        }
      }
    }

    public struct PinnedMessage: GraphQLSelectionSet {
      public static let possibleTypes = ["GeneralMessage", "ServiceMessage"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(FullMessage.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var fullMessage: FullMessage {
          get {
            return FullMessage(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public struct RoomShort: GraphQLFragment {
  public static let fragmentDefinition =
    "fragment RoomShort on Room {\n  __typename\n  ... on PrivateRoom {\n    id\n    user {\n      __typename\n      ...UserShort\n    }\n  }\n  ... on SharedRoom {\n    id\n    kind\n    title\n    photo\n    membership\n    role\n    canEdit\n    membersCount\n    pinnedMessage {\n      __typename\n      ...FullMessage\n    }\n    organization {\n      __typename\n      ...OrganizationShort\n    }\n  }\n}"

  public static let possibleTypes = ["PrivateRoom", "SharedRoom"]

  public static let selections: [GraphQLSelection] = [
    GraphQLTypeCase(
      variants: ["PrivateRoom": AsPrivateRoom.selections, "SharedRoom": AsSharedRoom.selections],
      default: [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      ]
    )
  ]

  public private(set) var resultMap: ResultMap

  public init(unsafeResultMap: ResultMap) {
    self.resultMap = unsafeResultMap
  }

  public static func makePrivateRoom(id: GraphQLID, user: AsPrivateRoom.User) -> RoomShort {
    return RoomShort(unsafeResultMap: ["__typename": "PrivateRoom", "id": id, "user": user.resultMap])
  }

  public static func makeSharedRoom(id: GraphQLID, kind: SharedRoomKind, title: String, photo: String, membership: SharedRoomMembershipStatus, role: RoomMemberRole, canEdit: Bool, membersCount: Int? = nil, pinnedMessage: AsSharedRoom.PinnedMessage? = nil, organization: AsSharedRoom.Organization? = nil) -> RoomShort {
    return RoomShort(unsafeResultMap: ["__typename": "SharedRoom", "id": id, "kind": kind, "title": title, "photo": photo, "membership": membership, "role": role, "canEdit": canEdit, "membersCount": membersCount, "pinnedMessage": pinnedMessage.flatMap { (value: AsSharedRoom.PinnedMessage) -> ResultMap in value.resultMap }, "organization": organization.flatMap { (value: AsSharedRoom.Organization) -> ResultMap in value.resultMap }])
  }

  public var __typename: String {
    get {
      return resultMap["__typename"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "__typename")
    }
  }

  public var asPrivateRoom: AsPrivateRoom? {
    get {
      if !AsPrivateRoom.possibleTypes.contains(__typename) { return nil }
      return AsPrivateRoom(unsafeResultMap: resultMap)
    }
    set {
      guard let newValue = newValue else { return }
      resultMap = newValue.resultMap
    }
  }

  public struct AsPrivateRoom: GraphQLSelectionSet {
    public static let possibleTypes = ["PrivateRoom"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
      GraphQLField("user", type: .nonNull(.object(User.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(id: GraphQLID, user: User) {
      self.init(unsafeResultMap: ["__typename": "PrivateRoom", "id": id, "user": user.resultMap])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var id: GraphQLID {
      get {
        return resultMap["id"]! as! GraphQLID
      }
      set {
        resultMap.updateValue(newValue, forKey: "id")
      }
    }

    public var user: User {
      get {
        return User(unsafeResultMap: resultMap["user"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "user")
      }
    }

    public struct User: GraphQLSelectionSet {
      public static let possibleTypes = ["User"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(UserShort.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var userShort: UserShort {
          get {
            return UserShort(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }

  public var asSharedRoom: AsSharedRoom? {
    get {
      if !AsSharedRoom.possibleTypes.contains(__typename) { return nil }
      return AsSharedRoom(unsafeResultMap: resultMap)
    }
    set {
      guard let newValue = newValue else { return }
      resultMap = newValue.resultMap
    }
  }

  public struct AsSharedRoom: GraphQLSelectionSet {
    public static let possibleTypes = ["SharedRoom"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
      GraphQLField("kind", type: .nonNull(.scalar(SharedRoomKind.self))),
      GraphQLField("title", type: .nonNull(.scalar(String.self))),
      GraphQLField("photo", type: .nonNull(.scalar(String.self))),
      GraphQLField("membership", type: .nonNull(.scalar(SharedRoomMembershipStatus.self))),
      GraphQLField("role", type: .nonNull(.scalar(RoomMemberRole.self))),
      GraphQLField("canEdit", type: .nonNull(.scalar(Bool.self))),
      GraphQLField("membersCount", type: .scalar(Int.self)),
      GraphQLField("pinnedMessage", type: .object(PinnedMessage.selections)),
      GraphQLField("organization", type: .object(Organization.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(id: GraphQLID, kind: SharedRoomKind, title: String, photo: String, membership: SharedRoomMembershipStatus, role: RoomMemberRole, canEdit: Bool, membersCount: Int? = nil, pinnedMessage: PinnedMessage? = nil, organization: Organization? = nil) {
      self.init(unsafeResultMap: ["__typename": "SharedRoom", "id": id, "kind": kind, "title": title, "photo": photo, "membership": membership, "role": role, "canEdit": canEdit, "membersCount": membersCount, "pinnedMessage": pinnedMessage.flatMap { (value: PinnedMessage) -> ResultMap in value.resultMap }, "organization": organization.flatMap { (value: Organization) -> ResultMap in value.resultMap }])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var id: GraphQLID {
      get {
        return resultMap["id"]! as! GraphQLID
      }
      set {
        resultMap.updateValue(newValue, forKey: "id")
      }
    }

    public var kind: SharedRoomKind {
      get {
        return resultMap["kind"]! as! SharedRoomKind
      }
      set {
        resultMap.updateValue(newValue, forKey: "kind")
      }
    }

    public var title: String {
      get {
        return resultMap["title"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "title")
      }
    }

    public var photo: String {
      get {
        return resultMap["photo"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "photo")
      }
    }

    public var membership: SharedRoomMembershipStatus {
      get {
        return resultMap["membership"]! as! SharedRoomMembershipStatus
      }
      set {
        resultMap.updateValue(newValue, forKey: "membership")
      }
    }

    public var role: RoomMemberRole {
      get {
        return resultMap["role"]! as! RoomMemberRole
      }
      set {
        resultMap.updateValue(newValue, forKey: "role")
      }
    }

    public var canEdit: Bool {
      get {
        return resultMap["canEdit"]! as! Bool
      }
      set {
        resultMap.updateValue(newValue, forKey: "canEdit")
      }
    }

    public var membersCount: Int? {
      get {
        return resultMap["membersCount"] as? Int
      }
      set {
        resultMap.updateValue(newValue, forKey: "membersCount")
      }
    }

    public var pinnedMessage: PinnedMessage? {
      get {
        return (resultMap["pinnedMessage"] as? ResultMap).flatMap { PinnedMessage(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "pinnedMessage")
      }
    }

    public var organization: Organization? {
      get {
        return (resultMap["organization"] as? ResultMap).flatMap { Organization(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "organization")
      }
    }

    public struct PinnedMessage: GraphQLSelectionSet {
      public static let possibleTypes = ["GeneralMessage", "ServiceMessage"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(FullMessage.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var fullMessage: FullMessage {
          get {
            return FullMessage(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }

    public struct Organization: GraphQLSelectionSet {
      public static let possibleTypes = ["Organization"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(OrganizationShort.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, name: String, photo: String? = nil, isCommunity: Bool) {
        self.init(unsafeResultMap: ["__typename": "Organization", "id": id, "name": name, "photo": photo, "isCommunity": isCommunity])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var organizationShort: OrganizationShort {
          get {
            return OrganizationShort(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public struct SessionStateFull: GraphQLFragment {
  public static let fragmentDefinition =
    "fragment SessionStateFull on SessionState {\n  __typename\n  isLoggedIn\n  isProfileCreated\n  isAccountActivated\n  isAccountExists\n  isAccountPicked\n  isCompleted\n  isBlocked\n}"

  public static let possibleTypes = ["SessionState"]

  public static let selections: [GraphQLSelection] = [
    GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
    GraphQLField("isLoggedIn", type: .nonNull(.scalar(Bool.self))),
    GraphQLField("isProfileCreated", type: .nonNull(.scalar(Bool.self))),
    GraphQLField("isAccountActivated", type: .nonNull(.scalar(Bool.self))),
    GraphQLField("isAccountExists", type: .nonNull(.scalar(Bool.self))),
    GraphQLField("isAccountPicked", type: .nonNull(.scalar(Bool.self))),
    GraphQLField("isCompleted", type: .nonNull(.scalar(Bool.self))),
    GraphQLField("isBlocked", type: .nonNull(.scalar(Bool.self))),
  ]

  public private(set) var resultMap: ResultMap

  public init(unsafeResultMap: ResultMap) {
    self.resultMap = unsafeResultMap
  }

  public init(isLoggedIn: Bool, isProfileCreated: Bool, isAccountActivated: Bool, isAccountExists: Bool, isAccountPicked: Bool, isCompleted: Bool, isBlocked: Bool) {
    self.init(unsafeResultMap: ["__typename": "SessionState", "isLoggedIn": isLoggedIn, "isProfileCreated": isProfileCreated, "isAccountActivated": isAccountActivated, "isAccountExists": isAccountExists, "isAccountPicked": isAccountPicked, "isCompleted": isCompleted, "isBlocked": isBlocked])
  }

  public var __typename: String {
    get {
      return resultMap["__typename"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "__typename")
    }
  }

  public var isLoggedIn: Bool {
    get {
      return resultMap["isLoggedIn"]! as! Bool
    }
    set {
      resultMap.updateValue(newValue, forKey: "isLoggedIn")
    }
  }

  public var isProfileCreated: Bool {
    get {
      return resultMap["isProfileCreated"]! as! Bool
    }
    set {
      resultMap.updateValue(newValue, forKey: "isProfileCreated")
    }
  }

  public var isAccountActivated: Bool {
    get {
      return resultMap["isAccountActivated"]! as! Bool
    }
    set {
      resultMap.updateValue(newValue, forKey: "isAccountActivated")
    }
  }

  public var isAccountExists: Bool {
    get {
      return resultMap["isAccountExists"]! as! Bool
    }
    set {
      resultMap.updateValue(newValue, forKey: "isAccountExists")
    }
  }

  /// deprecated
  public var isAccountPicked: Bool {
    get {
      return resultMap["isAccountPicked"]! as! Bool
    }
    set {
      resultMap.updateValue(newValue, forKey: "isAccountPicked")
    }
  }

  public var isCompleted: Bool {
    get {
      return resultMap["isCompleted"]! as! Bool
    }
    set {
      resultMap.updateValue(newValue, forKey: "isCompleted")
    }
  }

  public var isBlocked: Bool {
    get {
      return resultMap["isBlocked"]! as! Bool
    }
    set {
      resultMap.updateValue(newValue, forKey: "isBlocked")
    }
  }
}

public struct SettingsFull: GraphQLFragment {
  public static let fragmentDefinition =
    "fragment SettingsFull on Settings {\n  __typename\n  id\n  primaryEmail\n  emailFrequency\n  desktopNotifications\n  mobileNotifications\n  mobileAlert\n  mobileIncludeText\n}"

  public static let possibleTypes = ["Settings"]

  public static let selections: [GraphQLSelection] = [
    GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
    GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
    GraphQLField("primaryEmail", type: .nonNull(.scalar(String.self))),
    GraphQLField("emailFrequency", type: .nonNull(.scalar(EmailFrequency.self))),
    GraphQLField("desktopNotifications", type: .nonNull(.scalar(NotificationMessages.self))),
    GraphQLField("mobileNotifications", type: .nonNull(.scalar(NotificationMessages.self))),
    GraphQLField("mobileAlert", type: .nonNull(.scalar(Bool.self))),
    GraphQLField("mobileIncludeText", type: .nonNull(.scalar(Bool.self))),
  ]

  public private(set) var resultMap: ResultMap

  public init(unsafeResultMap: ResultMap) {
    self.resultMap = unsafeResultMap
  }

  public init(id: GraphQLID, primaryEmail: String, emailFrequency: EmailFrequency, desktopNotifications: NotificationMessages, mobileNotifications: NotificationMessages, mobileAlert: Bool, mobileIncludeText: Bool) {
    self.init(unsafeResultMap: ["__typename": "Settings", "id": id, "primaryEmail": primaryEmail, "emailFrequency": emailFrequency, "desktopNotifications": desktopNotifications, "mobileNotifications": mobileNotifications, "mobileAlert": mobileAlert, "mobileIncludeText": mobileIncludeText])
  }

  public var __typename: String {
    get {
      return resultMap["__typename"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "__typename")
    }
  }

  public var id: GraphQLID {
    get {
      return resultMap["id"]! as! GraphQLID
    }
    set {
      resultMap.updateValue(newValue, forKey: "id")
    }
  }

  public var primaryEmail: String {
    get {
      return resultMap["primaryEmail"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "primaryEmail")
    }
  }

  public var emailFrequency: EmailFrequency {
    get {
      return resultMap["emailFrequency"]! as! EmailFrequency
    }
    set {
      resultMap.updateValue(newValue, forKey: "emailFrequency")
    }
  }

  public var desktopNotifications: NotificationMessages {
    get {
      return resultMap["desktopNotifications"]! as! NotificationMessages
    }
    set {
      resultMap.updateValue(newValue, forKey: "desktopNotifications")
    }
  }

  public var mobileNotifications: NotificationMessages {
    get {
      return resultMap["mobileNotifications"]! as! NotificationMessages
    }
    set {
      resultMap.updateValue(newValue, forKey: "mobileNotifications")
    }
  }

  public var mobileAlert: Bool {
    get {
      return resultMap["mobileAlert"]! as! Bool
    }
    set {
      resultMap.updateValue(newValue, forKey: "mobileAlert")
    }
  }

  public var mobileIncludeText: Bool {
    get {
      return resultMap["mobileIncludeText"]! as! Bool
    }
    set {
      resultMap.updateValue(newValue, forKey: "mobileIncludeText")
    }
  }
}

public struct UserFull: GraphQLFragment {
  public static let fragmentDefinition =
    "fragment UserFull on User {\n  __typename\n  id\n  name\n  firstName\n  lastName\n  photo\n  phone\n  email\n  website\n  about\n  location\n  isBot\n  isYou\n  online\n  lastSeen\n  linkedin\n  twitter\n  shortname\n  primaryOrganization {\n    __typename\n    ...OrganizationShort\n  }\n}"

  public static let possibleTypes = ["User"]

  public static let selections: [GraphQLSelection] = [
    GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
    GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
    GraphQLField("name", type: .nonNull(.scalar(String.self))),
    GraphQLField("firstName", type: .nonNull(.scalar(String.self))),
    GraphQLField("lastName", type: .scalar(String.self)),
    GraphQLField("photo", type: .scalar(String.self)),
    GraphQLField("phone", type: .scalar(String.self)),
    GraphQLField("email", type: .scalar(String.self)),
    GraphQLField("website", type: .scalar(String.self)),
    GraphQLField("about", type: .scalar(String.self)),
    GraphQLField("location", type: .scalar(String.self)),
    GraphQLField("isBot", type: .nonNull(.scalar(Bool.self))),
    GraphQLField("isYou", type: .nonNull(.scalar(Bool.self))),
    GraphQLField("online", type: .nonNull(.scalar(Bool.self))),
    GraphQLField("lastSeen", type: .scalar(String.self)),
    GraphQLField("linkedin", type: .scalar(String.self)),
    GraphQLField("twitter", type: .scalar(String.self)),
    GraphQLField("shortname", type: .scalar(String.self)),
    GraphQLField("primaryOrganization", type: .object(PrimaryOrganization.selections)),
  ]

  public private(set) var resultMap: ResultMap

  public init(unsafeResultMap: ResultMap) {
    self.resultMap = unsafeResultMap
  }

  public init(id: GraphQLID, name: String, firstName: String, lastName: String? = nil, photo: String? = nil, phone: String? = nil, email: String? = nil, website: String? = nil, about: String? = nil, location: String? = nil, isBot: Bool, isYou: Bool, online: Bool, lastSeen: String? = nil, linkedin: String? = nil, twitter: String? = nil, shortname: String? = nil, primaryOrganization: PrimaryOrganization? = nil) {
    self.init(unsafeResultMap: ["__typename": "User", "id": id, "name": name, "firstName": firstName, "lastName": lastName, "photo": photo, "phone": phone, "email": email, "website": website, "about": about, "location": location, "isBot": isBot, "isYou": isYou, "online": online, "lastSeen": lastSeen, "linkedin": linkedin, "twitter": twitter, "shortname": shortname, "primaryOrganization": primaryOrganization.flatMap { (value: PrimaryOrganization) -> ResultMap in value.resultMap }])
  }

  public var __typename: String {
    get {
      return resultMap["__typename"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "__typename")
    }
  }

  public var id: GraphQLID {
    get {
      return resultMap["id"]! as! GraphQLID
    }
    set {
      resultMap.updateValue(newValue, forKey: "id")
    }
  }

  public var name: String {
    get {
      return resultMap["name"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "name")
    }
  }

  public var firstName: String {
    get {
      return resultMap["firstName"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "firstName")
    }
  }

  public var lastName: String? {
    get {
      return resultMap["lastName"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "lastName")
    }
  }

  public var photo: String? {
    get {
      return resultMap["photo"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "photo")
    }
  }

  public var phone: String? {
    get {
      return resultMap["phone"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "phone")
    }
  }

  public var email: String? {
    get {
      return resultMap["email"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "email")
    }
  }

  public var website: String? {
    get {
      return resultMap["website"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "website")
    }
  }

  public var about: String? {
    get {
      return resultMap["about"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "about")
    }
  }

  public var location: String? {
    get {
      return resultMap["location"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "location")
    }
  }

  public var isBot: Bool {
    get {
      return resultMap["isBot"]! as! Bool
    }
    set {
      resultMap.updateValue(newValue, forKey: "isBot")
    }
  }

  public var isYou: Bool {
    get {
      return resultMap["isYou"]! as! Bool
    }
    set {
      resultMap.updateValue(newValue, forKey: "isYou")
    }
  }

  public var online: Bool {
    get {
      return resultMap["online"]! as! Bool
    }
    set {
      resultMap.updateValue(newValue, forKey: "online")
    }
  }

  public var lastSeen: String? {
    get {
      return resultMap["lastSeen"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "lastSeen")
    }
  }

  public var linkedin: String? {
    get {
      return resultMap["linkedin"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "linkedin")
    }
  }

  public var twitter: String? {
    get {
      return resultMap["twitter"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "twitter")
    }
  }

  public var shortname: String? {
    get {
      return resultMap["shortname"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "shortname")
    }
  }

  public var primaryOrganization: PrimaryOrganization? {
    get {
      return (resultMap["primaryOrganization"] as? ResultMap).flatMap { PrimaryOrganization(unsafeResultMap: $0) }
    }
    set {
      resultMap.updateValue(newValue?.resultMap, forKey: "primaryOrganization")
    }
  }

  public struct PrimaryOrganization: GraphQLSelectionSet {
    public static let possibleTypes = ["Organization"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLFragmentSpread(OrganizationShort.self),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(id: GraphQLID, name: String, photo: String? = nil, isCommunity: Bool) {
      self.init(unsafeResultMap: ["__typename": "Organization", "id": id, "name": name, "photo": photo, "isCommunity": isCommunity])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var fragments: Fragments {
      get {
        return Fragments(unsafeResultMap: resultMap)
      }
      set {
        resultMap += newValue.resultMap
      }
    }

    public struct Fragments {
      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var organizationShort: OrganizationShort {
        get {
          return OrganizationShort(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }
    }
  }
}

public struct UserShort: GraphQLFragment {
  public static let fragmentDefinition =
    "fragment UserShort on User {\n  __typename\n  id\n  name\n  firstName\n  lastName\n  photo\n  email\n  online\n  lastSeen\n  isYou\n  isBot\n  shortname\n  primaryOrganization {\n    __typename\n    ...OrganizationShort\n  }\n}"

  public static let possibleTypes = ["User"]

  public static let selections: [GraphQLSelection] = [
    GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
    GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
    GraphQLField("name", type: .nonNull(.scalar(String.self))),
    GraphQLField("firstName", type: .nonNull(.scalar(String.self))),
    GraphQLField("lastName", type: .scalar(String.self)),
    GraphQLField("photo", type: .scalar(String.self)),
    GraphQLField("email", type: .scalar(String.self)),
    GraphQLField("online", type: .nonNull(.scalar(Bool.self))),
    GraphQLField("lastSeen", type: .scalar(String.self)),
    GraphQLField("isYou", type: .nonNull(.scalar(Bool.self))),
    GraphQLField("isBot", type: .nonNull(.scalar(Bool.self))),
    GraphQLField("shortname", type: .scalar(String.self)),
    GraphQLField("primaryOrganization", type: .object(PrimaryOrganization.selections)),
  ]

  public private(set) var resultMap: ResultMap

  public init(unsafeResultMap: ResultMap) {
    self.resultMap = unsafeResultMap
  }

  public init(id: GraphQLID, name: String, firstName: String, lastName: String? = nil, photo: String? = nil, email: String? = nil, online: Bool, lastSeen: String? = nil, isYou: Bool, isBot: Bool, shortname: String? = nil, primaryOrganization: PrimaryOrganization? = nil) {
    self.init(unsafeResultMap: ["__typename": "User", "id": id, "name": name, "firstName": firstName, "lastName": lastName, "photo": photo, "email": email, "online": online, "lastSeen": lastSeen, "isYou": isYou, "isBot": isBot, "shortname": shortname, "primaryOrganization": primaryOrganization.flatMap { (value: PrimaryOrganization) -> ResultMap in value.resultMap }])
  }

  public var __typename: String {
    get {
      return resultMap["__typename"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "__typename")
    }
  }

  public var id: GraphQLID {
    get {
      return resultMap["id"]! as! GraphQLID
    }
    set {
      resultMap.updateValue(newValue, forKey: "id")
    }
  }

  public var name: String {
    get {
      return resultMap["name"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "name")
    }
  }

  public var firstName: String {
    get {
      return resultMap["firstName"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "firstName")
    }
  }

  public var lastName: String? {
    get {
      return resultMap["lastName"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "lastName")
    }
  }

  public var photo: String? {
    get {
      return resultMap["photo"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "photo")
    }
  }

  public var email: String? {
    get {
      return resultMap["email"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "email")
    }
  }

  public var online: Bool {
    get {
      return resultMap["online"]! as! Bool
    }
    set {
      resultMap.updateValue(newValue, forKey: "online")
    }
  }

  public var lastSeen: String? {
    get {
      return resultMap["lastSeen"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "lastSeen")
    }
  }

  public var isYou: Bool {
    get {
      return resultMap["isYou"]! as! Bool
    }
    set {
      resultMap.updateValue(newValue, forKey: "isYou")
    }
  }

  public var isBot: Bool {
    get {
      return resultMap["isBot"]! as! Bool
    }
    set {
      resultMap.updateValue(newValue, forKey: "isBot")
    }
  }

  public var shortname: String? {
    get {
      return resultMap["shortname"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "shortname")
    }
  }

  public var primaryOrganization: PrimaryOrganization? {
    get {
      return (resultMap["primaryOrganization"] as? ResultMap).flatMap { PrimaryOrganization(unsafeResultMap: $0) }
    }
    set {
      resultMap.updateValue(newValue?.resultMap, forKey: "primaryOrganization")
    }
  }

  public struct PrimaryOrganization: GraphQLSelectionSet {
    public static let possibleTypes = ["Organization"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLFragmentSpread(OrganizationShort.self),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(id: GraphQLID, name: String, photo: String? = nil, isCommunity: Bool) {
      self.init(unsafeResultMap: ["__typename": "Organization", "id": id, "name": name, "photo": photo, "isCommunity": isCommunity])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var fragments: Fragments {
      get {
        return Fragments(unsafeResultMap: resultMap)
      }
      set {
        resultMap += newValue.resultMap
      }
    }

    public struct Fragments {
      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var organizationShort: OrganizationShort {
        get {
          return OrganizationShort(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }
    }
  }
}

public struct UserTiny: GraphQLFragment {
  public static let fragmentDefinition =
    "fragment UserTiny on User {\n  __typename\n  id\n  isYou\n  name\n  firstName\n  lastName\n  photo\n  shortname\n}"

  public static let possibleTypes = ["User"]

  public static let selections: [GraphQLSelection] = [
    GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
    GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
    GraphQLField("isYou", type: .nonNull(.scalar(Bool.self))),
    GraphQLField("name", type: .nonNull(.scalar(String.self))),
    GraphQLField("firstName", type: .nonNull(.scalar(String.self))),
    GraphQLField("lastName", type: .scalar(String.self)),
    GraphQLField("photo", type: .scalar(String.self)),
    GraphQLField("shortname", type: .scalar(String.self)),
  ]

  public private(set) var resultMap: ResultMap

  public init(unsafeResultMap: ResultMap) {
    self.resultMap = unsafeResultMap
  }

  public init(id: GraphQLID, isYou: Bool, name: String, firstName: String, lastName: String? = nil, photo: String? = nil, shortname: String? = nil) {
    self.init(unsafeResultMap: ["__typename": "User", "id": id, "isYou": isYou, "name": name, "firstName": firstName, "lastName": lastName, "photo": photo, "shortname": shortname])
  }

  public var __typename: String {
    get {
      return resultMap["__typename"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "__typename")
    }
  }

  public var id: GraphQLID {
    get {
      return resultMap["id"]! as! GraphQLID
    }
    set {
      resultMap.updateValue(newValue, forKey: "id")
    }
  }

  public var isYou: Bool {
    get {
      return resultMap["isYou"]! as! Bool
    }
    set {
      resultMap.updateValue(newValue, forKey: "isYou")
    }
  }

  public var name: String {
    get {
      return resultMap["name"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "name")
    }
  }

  public var firstName: String {
    get {
      return resultMap["firstName"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "firstName")
    }
  }

  public var lastName: String? {
    get {
      return resultMap["lastName"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "lastName")
    }
  }

  public var photo: String? {
    get {
      return resultMap["photo"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "photo")
    }
  }

  public var shortname: String? {
    get {
      return resultMap["shortname"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "shortname")
    }
  }
}

public struct ChatUpdateFragment: GraphQLFragment {
  public static let fragmentDefinition =
    "fragment ChatUpdateFragment on ChatUpdate {\n  __typename\n  ... on ChatMessageReceived {\n    message {\n      __typename\n      ...FullMessage\n    }\n    repeatKey\n  }\n  ... on ChatMessageUpdated {\n    message {\n      __typename\n      ...FullMessage\n    }\n  }\n  ... on ChatMessageDeleted {\n    message {\n      __typename\n      id\n    }\n  }\n  ... on ChatUpdated {\n    chat {\n      __typename\n      ...RoomShort\n    }\n  }\n}"

  public static let possibleTypes = ["ChatUpdated", "ChatMessageReceived", "ChatMessageUpdated", "ChatMessageDeleted", "ChatLostAccess"]

  public static let selections: [GraphQLSelection] = [
    GraphQLTypeCase(
      variants: ["ChatMessageReceived": AsChatMessageReceived.selections, "ChatMessageUpdated": AsChatMessageUpdated.selections, "ChatMessageDeleted": AsChatMessageDeleted.selections, "ChatUpdated": AsChatUpdated.selections],
      default: [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      ]
    )
  ]

  public private(set) var resultMap: ResultMap

  public init(unsafeResultMap: ResultMap) {
    self.resultMap = unsafeResultMap
  }

  public static func makeChatLostAccess() -> ChatUpdateFragment {
    return ChatUpdateFragment(unsafeResultMap: ["__typename": "ChatLostAccess"])
  }

  public static func makeChatMessageReceived(message: AsChatMessageReceived.Message, repeatKey: String? = nil) -> ChatUpdateFragment {
    return ChatUpdateFragment(unsafeResultMap: ["__typename": "ChatMessageReceived", "message": message.resultMap, "repeatKey": repeatKey])
  }

  public static func makeChatMessageUpdated(message: AsChatMessageUpdated.Message) -> ChatUpdateFragment {
    return ChatUpdateFragment(unsafeResultMap: ["__typename": "ChatMessageUpdated", "message": message.resultMap])
  }

  public static func makeChatMessageDeleted(message: AsChatMessageDeleted.Message) -> ChatUpdateFragment {
    return ChatUpdateFragment(unsafeResultMap: ["__typename": "ChatMessageDeleted", "message": message.resultMap])
  }

  public static func makeChatUpdated(chat: AsChatUpdated.Chat) -> ChatUpdateFragment {
    return ChatUpdateFragment(unsafeResultMap: ["__typename": "ChatUpdated", "chat": chat.resultMap])
  }

  public var __typename: String {
    get {
      return resultMap["__typename"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "__typename")
    }
  }

  public var asChatMessageReceived: AsChatMessageReceived? {
    get {
      if !AsChatMessageReceived.possibleTypes.contains(__typename) { return nil }
      return AsChatMessageReceived(unsafeResultMap: resultMap)
    }
    set {
      guard let newValue = newValue else { return }
      resultMap = newValue.resultMap
    }
  }

  public struct AsChatMessageReceived: GraphQLSelectionSet {
    public static let possibleTypes = ["ChatMessageReceived"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLField("message", type: .nonNull(.object(Message.selections))),
      GraphQLField("repeatKey", type: .scalar(String.self)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(message: Message, repeatKey: String? = nil) {
      self.init(unsafeResultMap: ["__typename": "ChatMessageReceived", "message": message.resultMap, "repeatKey": repeatKey])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var message: Message {
      get {
        return Message(unsafeResultMap: resultMap["message"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "message")
      }
    }

    public var repeatKey: String? {
      get {
        return resultMap["repeatKey"] as? String
      }
      set {
        resultMap.updateValue(newValue, forKey: "repeatKey")
      }
    }

    public struct Message: GraphQLSelectionSet {
      public static let possibleTypes = ["GeneralMessage", "ServiceMessage"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(FullMessage.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var fullMessage: FullMessage {
          get {
            return FullMessage(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }

  public var asChatMessageUpdated: AsChatMessageUpdated? {
    get {
      if !AsChatMessageUpdated.possibleTypes.contains(__typename) { return nil }
      return AsChatMessageUpdated(unsafeResultMap: resultMap)
    }
    set {
      guard let newValue = newValue else { return }
      resultMap = newValue.resultMap
    }
  }

  public struct AsChatMessageUpdated: GraphQLSelectionSet {
    public static let possibleTypes = ["ChatMessageUpdated"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLField("message", type: .nonNull(.object(Message.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(message: Message) {
      self.init(unsafeResultMap: ["__typename": "ChatMessageUpdated", "message": message.resultMap])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var message: Message {
      get {
        return Message(unsafeResultMap: resultMap["message"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "message")
      }
    }

    public struct Message: GraphQLSelectionSet {
      public static let possibleTypes = ["GeneralMessage", "ServiceMessage"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(FullMessage.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var fullMessage: FullMessage {
          get {
            return FullMessage(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }

  public var asChatMessageDeleted: AsChatMessageDeleted? {
    get {
      if !AsChatMessageDeleted.possibleTypes.contains(__typename) { return nil }
      return AsChatMessageDeleted(unsafeResultMap: resultMap)
    }
    set {
      guard let newValue = newValue else { return }
      resultMap = newValue.resultMap
    }
  }

  public struct AsChatMessageDeleted: GraphQLSelectionSet {
    public static let possibleTypes = ["ChatMessageDeleted"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLField("message", type: .nonNull(.object(Message.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(message: Message) {
      self.init(unsafeResultMap: ["__typename": "ChatMessageDeleted", "message": message.resultMap])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var message: Message {
      get {
        return Message(unsafeResultMap: resultMap["message"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "message")
      }
    }

    public struct Message: GraphQLSelectionSet {
      public static let possibleTypes = ["GeneralMessage", "ServiceMessage"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public static func makeGeneralMessage(id: GraphQLID) -> Message {
        return Message(unsafeResultMap: ["__typename": "GeneralMessage", "id": id])
      }

      public static func makeServiceMessage(id: GraphQLID) -> Message {
        return Message(unsafeResultMap: ["__typename": "ServiceMessage", "id": id])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      /// State
      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }
    }
  }

  public var asChatUpdated: AsChatUpdated? {
    get {
      if !AsChatUpdated.possibleTypes.contains(__typename) { return nil }
      return AsChatUpdated(unsafeResultMap: resultMap)
    }
    set {
      guard let newValue = newValue else { return }
      resultMap = newValue.resultMap
    }
  }

  public struct AsChatUpdated: GraphQLSelectionSet {
    public static let possibleTypes = ["ChatUpdated"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLField("chat", type: .nonNull(.object(Chat.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(chat: Chat) {
      self.init(unsafeResultMap: ["__typename": "ChatUpdated", "chat": chat.resultMap])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var chat: Chat {
      get {
        return Chat(unsafeResultMap: resultMap["chat"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "chat")
      }
    }

    public struct Chat: GraphQLSelectionSet {
      public static let possibleTypes = ["PrivateRoom", "SharedRoom"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(RoomShort.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var roomShort: RoomShort {
          get {
            return RoomShort(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }
}

public struct DialogUpdateFragment: GraphQLFragment {
  public static let fragmentDefinition =
    "fragment DialogUpdateFragment on DialogUpdate {\n  __typename\n  ... on DialogMessageReceived {\n    cid\n    unread\n    globalUnread\n    message: alphaMessage {\n      __typename\n      ...TinyMessage\n    }\n  }\n  ... on DialogMessageUpdated {\n    cid\n    message: alphaMessage {\n      __typename\n      ...TinyMessage\n    }\n  }\n  ... on DialogMessageDeleted {\n    cid\n    message: alphaMessage {\n      __typename\n      ...TinyMessage\n    }\n    prevMessage: alphaPrevMessage {\n      __typename\n      ...TinyMessage\n    }\n    unread\n    globalUnread\n  }\n  ... on DialogMessageRead {\n    cid\n    unread\n    globalUnread\n  }\n  ... on DialogMessageRead {\n    cid\n    unread\n    globalUnread\n  }\n  ... on DialogTitleUpdated {\n    cid\n    title\n  }\n  ... on DialogMuteChanged {\n    cid\n    mute\n  }\n  ... on DialogMentionedChanged {\n    cid\n    haveMention\n  }\n  ... on DialogPhotoUpdated {\n    cid\n    photo\n  }\n  ... on DialogDeleted {\n    cid\n    globalUnread\n  }\n}"

  public static let possibleTypes = ["DialogMessageReceived", "DialogMessageUpdated", "DialogMessageDeleted", "DialogMessageRead", "DialogTitleUpdated", "DialogDeleted", "DialogPhotoUpdated", "DialogMuteChanged", "DialogMentionedChanged"]

  public static let selections: [GraphQLSelection] = [
    GraphQLTypeCase(
      variants: ["DialogMessageReceived": AsDialogMessageReceived.selections, "DialogMessageUpdated": AsDialogMessageUpdated.selections, "DialogMessageDeleted": AsDialogMessageDeleted.selections, "DialogMessageRead": AsDialogMessageRead.selections, "DialogTitleUpdated": AsDialogTitleUpdated.selections, "DialogMuteChanged": AsDialogMuteChanged.selections, "DialogMentionedChanged": AsDialogMentionedChanged.selections, "DialogPhotoUpdated": AsDialogPhotoUpdated.selections, "DialogDeleted": AsDialogDeleted.selections],
      default: [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      ]
    )
  ]

  public private(set) var resultMap: ResultMap

  public init(unsafeResultMap: ResultMap) {
    self.resultMap = unsafeResultMap
  }

  public static func makeDialogMessageReceived(cid: GraphQLID, unread: Int, globalUnread: Int, message: AsDialogMessageReceived.Message) -> DialogUpdateFragment {
    return DialogUpdateFragment(unsafeResultMap: ["__typename": "DialogMessageReceived", "cid": cid, "unread": unread, "globalUnread": globalUnread, "message": message.resultMap])
  }

  public static func makeDialogMessageUpdated(cid: GraphQLID, message: AsDialogMessageUpdated.Message) -> DialogUpdateFragment {
    return DialogUpdateFragment(unsafeResultMap: ["__typename": "DialogMessageUpdated", "cid": cid, "message": message.resultMap])
  }

  public static func makeDialogMessageDeleted(cid: GraphQLID, message: AsDialogMessageDeleted.Message, prevMessage: AsDialogMessageDeleted.PrevMessage? = nil, unread: Int, globalUnread: Int) -> DialogUpdateFragment {
    return DialogUpdateFragment(unsafeResultMap: ["__typename": "DialogMessageDeleted", "cid": cid, "message": message.resultMap, "prevMessage": prevMessage.flatMap { (value: AsDialogMessageDeleted.PrevMessage) -> ResultMap in value.resultMap }, "unread": unread, "globalUnread": globalUnread])
  }

  public static func makeDialogMessageRead(cid: GraphQLID, unread: Int, globalUnread: Int) -> DialogUpdateFragment {
    return DialogUpdateFragment(unsafeResultMap: ["__typename": "DialogMessageRead", "cid": cid, "unread": unread, "globalUnread": globalUnread])
  }

  public static func makeDialogTitleUpdated(cid: GraphQLID, title: String) -> DialogUpdateFragment {
    return DialogUpdateFragment(unsafeResultMap: ["__typename": "DialogTitleUpdated", "cid": cid, "title": title])
  }

  public static func makeDialogMuteChanged(cid: GraphQLID, mute: Bool) -> DialogUpdateFragment {
    return DialogUpdateFragment(unsafeResultMap: ["__typename": "DialogMuteChanged", "cid": cid, "mute": mute])
  }

  public static func makeDialogMentionedChanged(cid: GraphQLID, haveMention: Bool) -> DialogUpdateFragment {
    return DialogUpdateFragment(unsafeResultMap: ["__typename": "DialogMentionedChanged", "cid": cid, "haveMention": haveMention])
  }

  public static func makeDialogPhotoUpdated(cid: GraphQLID, photo: String? = nil) -> DialogUpdateFragment {
    return DialogUpdateFragment(unsafeResultMap: ["__typename": "DialogPhotoUpdated", "cid": cid, "photo": photo])
  }

  public static func makeDialogDeleted(cid: GraphQLID, globalUnread: Int) -> DialogUpdateFragment {
    return DialogUpdateFragment(unsafeResultMap: ["__typename": "DialogDeleted", "cid": cid, "globalUnread": globalUnread])
  }

  public var __typename: String {
    get {
      return resultMap["__typename"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "__typename")
    }
  }

  public var asDialogMessageReceived: AsDialogMessageReceived? {
    get {
      if !AsDialogMessageReceived.possibleTypes.contains(__typename) { return nil }
      return AsDialogMessageReceived(unsafeResultMap: resultMap)
    }
    set {
      guard let newValue = newValue else { return }
      resultMap = newValue.resultMap
    }
  }

  public struct AsDialogMessageReceived: GraphQLSelectionSet {
    public static let possibleTypes = ["DialogMessageReceived"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLField("cid", type: .nonNull(.scalar(GraphQLID.self))),
      GraphQLField("unread", type: .nonNull(.scalar(Int.self))),
      GraphQLField("globalUnread", type: .nonNull(.scalar(Int.self))),
      GraphQLField("alphaMessage", alias: "message", type: .nonNull(.object(Message.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(cid: GraphQLID, unread: Int, globalUnread: Int, message: Message) {
      self.init(unsafeResultMap: ["__typename": "DialogMessageReceived", "cid": cid, "unread": unread, "globalUnread": globalUnread, "message": message.resultMap])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var cid: GraphQLID {
      get {
        return resultMap["cid"]! as! GraphQLID
      }
      set {
        resultMap.updateValue(newValue, forKey: "cid")
      }
    }

    public var unread: Int {
      get {
        return resultMap["unread"]! as! Int
      }
      set {
        resultMap.updateValue(newValue, forKey: "unread")
      }
    }

    public var globalUnread: Int {
      get {
        return resultMap["globalUnread"]! as! Int
      }
      set {
        resultMap.updateValue(newValue, forKey: "globalUnread")
      }
    }

    public var message: Message {
      get {
        return Message(unsafeResultMap: resultMap["message"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "message")
      }
    }

    public struct Message: GraphQLSelectionSet {
      public static let possibleTypes = ["GeneralMessage", "ServiceMessage"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(TinyMessage.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var tinyMessage: TinyMessage {
          get {
            return TinyMessage(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }

  public var asDialogMessageUpdated: AsDialogMessageUpdated? {
    get {
      if !AsDialogMessageUpdated.possibleTypes.contains(__typename) { return nil }
      return AsDialogMessageUpdated(unsafeResultMap: resultMap)
    }
    set {
      guard let newValue = newValue else { return }
      resultMap = newValue.resultMap
    }
  }

  public struct AsDialogMessageUpdated: GraphQLSelectionSet {
    public static let possibleTypes = ["DialogMessageUpdated"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLField("cid", type: .nonNull(.scalar(GraphQLID.self))),
      GraphQLField("alphaMessage", alias: "message", type: .nonNull(.object(Message.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(cid: GraphQLID, message: Message) {
      self.init(unsafeResultMap: ["__typename": "DialogMessageUpdated", "cid": cid, "message": message.resultMap])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var cid: GraphQLID {
      get {
        return resultMap["cid"]! as! GraphQLID
      }
      set {
        resultMap.updateValue(newValue, forKey: "cid")
      }
    }

    public var message: Message {
      get {
        return Message(unsafeResultMap: resultMap["message"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "message")
      }
    }

    public struct Message: GraphQLSelectionSet {
      public static let possibleTypes = ["GeneralMessage", "ServiceMessage"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(TinyMessage.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var tinyMessage: TinyMessage {
          get {
            return TinyMessage(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }

  public var asDialogMessageDeleted: AsDialogMessageDeleted? {
    get {
      if !AsDialogMessageDeleted.possibleTypes.contains(__typename) { return nil }
      return AsDialogMessageDeleted(unsafeResultMap: resultMap)
    }
    set {
      guard let newValue = newValue else { return }
      resultMap = newValue.resultMap
    }
  }

  public struct AsDialogMessageDeleted: GraphQLSelectionSet {
    public static let possibleTypes = ["DialogMessageDeleted"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLField("cid", type: .nonNull(.scalar(GraphQLID.self))),
      GraphQLField("alphaMessage", alias: "message", type: .nonNull(.object(Message.selections))),
      GraphQLField("alphaPrevMessage", alias: "prevMessage", type: .object(PrevMessage.selections)),
      GraphQLField("unread", type: .nonNull(.scalar(Int.self))),
      GraphQLField("globalUnread", type: .nonNull(.scalar(Int.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(cid: GraphQLID, message: Message, prevMessage: PrevMessage? = nil, unread: Int, globalUnread: Int) {
      self.init(unsafeResultMap: ["__typename": "DialogMessageDeleted", "cid": cid, "message": message.resultMap, "prevMessage": prevMessage.flatMap { (value: PrevMessage) -> ResultMap in value.resultMap }, "unread": unread, "globalUnread": globalUnread])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var cid: GraphQLID {
      get {
        return resultMap["cid"]! as! GraphQLID
      }
      set {
        resultMap.updateValue(newValue, forKey: "cid")
      }
    }

    public var message: Message {
      get {
        return Message(unsafeResultMap: resultMap["message"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "message")
      }
    }

    public var prevMessage: PrevMessage? {
      get {
        return (resultMap["prevMessage"] as? ResultMap).flatMap { PrevMessage(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "prevMessage")
      }
    }

    public var unread: Int {
      get {
        return resultMap["unread"]! as! Int
      }
      set {
        resultMap.updateValue(newValue, forKey: "unread")
      }
    }

    public var globalUnread: Int {
      get {
        return resultMap["globalUnread"]! as! Int
      }
      set {
        resultMap.updateValue(newValue, forKey: "globalUnread")
      }
    }

    public struct Message: GraphQLSelectionSet {
      public static let possibleTypes = ["GeneralMessage", "ServiceMessage"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(TinyMessage.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var tinyMessage: TinyMessage {
          get {
            return TinyMessage(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }

    public struct PrevMessage: GraphQLSelectionSet {
      public static let possibleTypes = ["GeneralMessage", "ServiceMessage"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLFragmentSpread(TinyMessage.self),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var tinyMessage: TinyMessage {
          get {
            return TinyMessage(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }
    }
  }

  public var asDialogMessageRead: AsDialogMessageRead? {
    get {
      if !AsDialogMessageRead.possibleTypes.contains(__typename) { return nil }
      return AsDialogMessageRead(unsafeResultMap: resultMap)
    }
    set {
      guard let newValue = newValue else { return }
      resultMap = newValue.resultMap
    }
  }

  public struct AsDialogMessageRead: GraphQLSelectionSet {
    public static let possibleTypes = ["DialogMessageRead"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLField("cid", type: .nonNull(.scalar(GraphQLID.self))),
      GraphQLField("unread", type: .nonNull(.scalar(Int.self))),
      GraphQLField("globalUnread", type: .nonNull(.scalar(Int.self))),
      GraphQLField("cid", type: .nonNull(.scalar(GraphQLID.self))),
      GraphQLField("unread", type: .nonNull(.scalar(Int.self))),
      GraphQLField("globalUnread", type: .nonNull(.scalar(Int.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(cid: GraphQLID, unread: Int, globalUnread: Int) {
      self.init(unsafeResultMap: ["__typename": "DialogMessageRead", "cid": cid, "unread": unread, "globalUnread": globalUnread])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var cid: GraphQLID {
      get {
        return resultMap["cid"]! as! GraphQLID
      }
      set {
        resultMap.updateValue(newValue, forKey: "cid")
      }
    }

    public var unread: Int {
      get {
        return resultMap["unread"]! as! Int
      }
      set {
        resultMap.updateValue(newValue, forKey: "unread")
      }
    }

    public var globalUnread: Int {
      get {
        return resultMap["globalUnread"]! as! Int
      }
      set {
        resultMap.updateValue(newValue, forKey: "globalUnread")
      }
    }
  }

  public var asDialogTitleUpdated: AsDialogTitleUpdated? {
    get {
      if !AsDialogTitleUpdated.possibleTypes.contains(__typename) { return nil }
      return AsDialogTitleUpdated(unsafeResultMap: resultMap)
    }
    set {
      guard let newValue = newValue else { return }
      resultMap = newValue.resultMap
    }
  }

  public struct AsDialogTitleUpdated: GraphQLSelectionSet {
    public static let possibleTypes = ["DialogTitleUpdated"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLField("cid", type: .nonNull(.scalar(GraphQLID.self))),
      GraphQLField("title", type: .nonNull(.scalar(String.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(cid: GraphQLID, title: String) {
      self.init(unsafeResultMap: ["__typename": "DialogTitleUpdated", "cid": cid, "title": title])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var cid: GraphQLID {
      get {
        return resultMap["cid"]! as! GraphQLID
      }
      set {
        resultMap.updateValue(newValue, forKey: "cid")
      }
    }

    public var title: String {
      get {
        return resultMap["title"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "title")
      }
    }
  }

  public var asDialogMuteChanged: AsDialogMuteChanged? {
    get {
      if !AsDialogMuteChanged.possibleTypes.contains(__typename) { return nil }
      return AsDialogMuteChanged(unsafeResultMap: resultMap)
    }
    set {
      guard let newValue = newValue else { return }
      resultMap = newValue.resultMap
    }
  }

  public struct AsDialogMuteChanged: GraphQLSelectionSet {
    public static let possibleTypes = ["DialogMuteChanged"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLField("cid", type: .nonNull(.scalar(GraphQLID.self))),
      GraphQLField("mute", type: .nonNull(.scalar(Bool.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(cid: GraphQLID, mute: Bool) {
      self.init(unsafeResultMap: ["__typename": "DialogMuteChanged", "cid": cid, "mute": mute])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var cid: GraphQLID {
      get {
        return resultMap["cid"]! as! GraphQLID
      }
      set {
        resultMap.updateValue(newValue, forKey: "cid")
      }
    }

    public var mute: Bool {
      get {
        return resultMap["mute"]! as! Bool
      }
      set {
        resultMap.updateValue(newValue, forKey: "mute")
      }
    }
  }

  public var asDialogMentionedChanged: AsDialogMentionedChanged? {
    get {
      if !AsDialogMentionedChanged.possibleTypes.contains(__typename) { return nil }
      return AsDialogMentionedChanged(unsafeResultMap: resultMap)
    }
    set {
      guard let newValue = newValue else { return }
      resultMap = newValue.resultMap
    }
  }

  public struct AsDialogMentionedChanged: GraphQLSelectionSet {
    public static let possibleTypes = ["DialogMentionedChanged"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLField("cid", type: .nonNull(.scalar(GraphQLID.self))),
      GraphQLField("haveMention", type: .nonNull(.scalar(Bool.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(cid: GraphQLID, haveMention: Bool) {
      self.init(unsafeResultMap: ["__typename": "DialogMentionedChanged", "cid": cid, "haveMention": haveMention])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var cid: GraphQLID {
      get {
        return resultMap["cid"]! as! GraphQLID
      }
      set {
        resultMap.updateValue(newValue, forKey: "cid")
      }
    }

    public var haveMention: Bool {
      get {
        return resultMap["haveMention"]! as! Bool
      }
      set {
        resultMap.updateValue(newValue, forKey: "haveMention")
      }
    }
  }

  public var asDialogPhotoUpdated: AsDialogPhotoUpdated? {
    get {
      if !AsDialogPhotoUpdated.possibleTypes.contains(__typename) { return nil }
      return AsDialogPhotoUpdated(unsafeResultMap: resultMap)
    }
    set {
      guard let newValue = newValue else { return }
      resultMap = newValue.resultMap
    }
  }

  public struct AsDialogPhotoUpdated: GraphQLSelectionSet {
    public static let possibleTypes = ["DialogPhotoUpdated"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLField("cid", type: .nonNull(.scalar(GraphQLID.self))),
      GraphQLField("photo", type: .scalar(String.self)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(cid: GraphQLID, photo: String? = nil) {
      self.init(unsafeResultMap: ["__typename": "DialogPhotoUpdated", "cid": cid, "photo": photo])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var cid: GraphQLID {
      get {
        return resultMap["cid"]! as! GraphQLID
      }
      set {
        resultMap.updateValue(newValue, forKey: "cid")
      }
    }

    public var photo: String? {
      get {
        return resultMap["photo"] as? String
      }
      set {
        resultMap.updateValue(newValue, forKey: "photo")
      }
    }
  }

  public var asDialogDeleted: AsDialogDeleted? {
    get {
      if !AsDialogDeleted.possibleTypes.contains(__typename) { return nil }
      return AsDialogDeleted(unsafeResultMap: resultMap)
    }
    set {
      guard let newValue = newValue else { return }
      resultMap = newValue.resultMap
    }
  }

  public struct AsDialogDeleted: GraphQLSelectionSet {
    public static let possibleTypes = ["DialogDeleted"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLField("cid", type: .nonNull(.scalar(GraphQLID.self))),
      GraphQLField("globalUnread", type: .nonNull(.scalar(Int.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(cid: GraphQLID, globalUnread: Int) {
      self.init(unsafeResultMap: ["__typename": "DialogDeleted", "cid": cid, "globalUnread": globalUnread])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var cid: GraphQLID {
      get {
        return resultMap["cid"]! as! GraphQLID
      }
      set {
        resultMap.updateValue(newValue, forKey: "cid")
      }
    }

    public var globalUnread: Int {
      get {
        return resultMap["globalUnread"]! as! Int
      }
      set {
        resultMap.updateValue(newValue, forKey: "globalUnread")
      }
    }
  }
}