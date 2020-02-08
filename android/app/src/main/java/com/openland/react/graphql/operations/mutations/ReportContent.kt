package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ReportContentSelector = obj(
            field("reportContent", "reportContent", arguments(fieldValue("contentId", refValue("contentId")), fieldValue("type", refValue("type")), fieldValue("message", refValue("message"))), scalar("Boolean"))
        )
val ReportContent = object: OperationDefinition {
    override val name = "ReportContent"
    override val kind = OperationKind.MUTATION
    override val body = "mutation ReportContent(\$contentId:ID!,\$type:String!,\$message:String){reportContent(contentId:\$contentId,type:\$type,message:\$message)}"
    override val selector = ReportContentSelector
}