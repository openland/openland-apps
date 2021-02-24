package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val UserSelector = obj(
            field("user", "user", arguments(fieldValue("id", refValue("userId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("User", UserFullSelector)
                ))),
            field("room", "conversation", arguments(fieldValue("id", refValue("userId"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("PrivateRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("settings", "settings", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("mute", "mute", scalar("Boolean"))
                            )))
                    ))
                ))
        )
val User = object: OperationDefinition {
    override val name = "User"
    override val kind = OperationKind.QUERY
    override val body = "query User(\$userId:ID!){user:user(id:\$userId){__typename ...UserFull}conversation:room(id:\$userId){__typename ... on PrivateRoom{__typename id settings{__typename id mute}}}}fragment UserFull on User{__typename id name firstName lastName photo phone birthDay email website about birthDay location isBot isDeleted online lastSeen joinDate linkedin instagram twitter facebook shortname audienceSize inContacts isBanned isMeBanned followedByMe followersCount followingCount currentVoiceChat{__typename ...VoiceChatWithSpeakers}primaryOrganization{__typename ...OrganizationShort}}fragment VoiceChatWithSpeakers on VoiceChat{__typename ...VoiceChatEntity speakers{__typename ...VoiceChatParticipant}}fragment VoiceChatEntity on VoiceChat{__typename id title active adminsCount speakersCount listenersCount me{__typename ...VoiceChatParticipant}}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename id name firstName photo}status handRaised}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite featured:alphaFeatured}"
    override val selector = UserSelector
}