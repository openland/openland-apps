package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ReportContentSelector = obj(
            field("reportContent","reportContent", arguments(fieldValue("contentId", refValue("contentId")), fieldValue("message", refValue("message")), fieldValue("type", refValue("type"))), scalar("Boolean"))
        )
val ReportContent = object: OperationDefinition {
    override val name = "ReportContent"
    override val kind = OperationKind.MUTATION
    override val body = "mutation ReportContent(\$contentId:ID!,\$message:String,\$type:String!){reportContent(contentId:\$contentId,message:\$message,type:\$type)}"
    override val selector = ReportContentSelector
}