package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val VoiceChatHandRaisedSelector = obj(
            field("voiceChatHandRaised", "voiceChatHandRaised", arguments(fieldValue("id", refValue("id")), fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("user", "user", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("id", "id", notNull(scalar("ID"))),
                                    field("photo", "photo", scalar("String")),
                                    field("firstName", "firstName", notNull(scalar("String"))),
                                    field("name", "name", notNull(scalar("String"))),
                                    field("followersCount", "followersCount", notNull(scalar("Int")))
                                )))
                        ))))),
                    field("cursor", "cursor", scalar("String")),
                    field("haveMore", "haveMore", notNull(scalar("Boolean")))
                )))
        )
val VoiceChatHandRaised = object: OperationDefinition {
    override val name = "VoiceChatHandRaised"
    override val kind = OperationKind.QUERY
    override val body = "query VoiceChatHandRaised(\$id:ID!,\$first:Int!,\$after:String){voiceChatHandRaised(id:\$id,first:\$first,after:\$after){__typename items{__typename id user{__typename id photo firstName name followersCount}}cursor haveMore}}"
    override val selector = VoiceChatHandRaisedSelector
}