package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val AuthResolveShortNameSelector = obj(
            field("alphaResolveShortName", "item", arguments(fieldValue("shortname", refValue("shortname"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("User", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("name", "name", notNull(scalar("String"))),
                        field("firstName", "firstName", notNull(scalar("String"))),
                        field("lastName", "lastName", scalar("String")),
                        field("photo", "photo", scalar("String")),
                        field("externalSocialImage", "externalSocialImage", scalar("String")),
                        field("online", "online", notNull(scalar("Boolean"))),
                        field("currentVoiceChat", "currentVoiceChat", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("title", "title", scalar("String")),
                                field("speakersCount", "speakersCount", notNull(scalar("Int"))),
                                field("listenersCount", "listenersCount", notNull(scalar("Int"))),
                                field("speakers", "speakers", notNull(list(notNull(obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("id", "id", notNull(scalar("ID"))),
                                        field("user", "user", notNull(obj(
                                                field("__typename", "__typename", notNull(scalar("String"))),
                                                field("id", "id", notNull(scalar("ID"))),
                                                field("name", "name", notNull(scalar("String"))),
                                                field("photo", "photo", scalar("String"))
                                            )))
                                    )))))
                            ))
                    )),
                    inline("Organization", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("name", "name", notNull(scalar("String"))),
                        field("photo", "photo", scalar("String")),
                        field("about", "about", scalar("String")),
                        field("applyLinkEnabled", "applyLinkEnabled", notNull(scalar("Boolean"))),
                        field("applyLink", "applyLink", scalar("String")),
                        field("externalSocialImage", "externalSocialImage", scalar("String")),
                        field("alphaIsCommunity", "isCommunity", notNull(scalar("Boolean"))),
                        field("alphaFeatured", "featured", notNull(scalar("Boolean"))),
                        field("owner", "owner", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID")))
                            )))
                    )),
                    inline("SharedRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("SharedRoom", SharedRoomPreviewSelector)
                    )),
                    inline("DiscoverChatsCollection", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID")))
                    ))
                ))
        )
val AuthResolveShortName = object: OperationDefinition {
    override val name = "AuthResolveShortName"
    override val kind = OperationKind.QUERY
    override val body = "query AuthResolveShortName(\$shortname:String!){item:alphaResolveShortName(shortname:\$shortname){__typename ... on User{__typename id name firstName lastName photo externalSocialImage online currentVoiceChat{__typename id title speakersCount listenersCount speakers{__typename id user{__typename id name photo}}}}... on Organization{__typename id name photo about applyLinkEnabled applyLink externalSocialImage isCommunity:alphaIsCommunity featured:alphaFeatured owner{__typename id}}... on SharedRoom{__typename ...SharedRoomPreview}... on DiscoverChatsCollection{__typename id}}}fragment SharedRoomPreview on SharedRoom{__typename id isChannel isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}membership owner{__typename id}title photo externalSocialImage membersCount description featured previewMembers{__typename id name photo}}"
    override val selector = AuthResolveShortNameSelector
}