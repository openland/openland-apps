package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ReportOnlineSelector = obj(
            field("presenceReportOnline", "presenceReportOnline", arguments(fieldValue("timeout", intValue(5000)), fieldValue("active", refValue("active")), fieldValue("platform", refValue("platform"))), notNull(scalar("String")))
        )
val ReportOnline = object: OperationDefinition {
    override val name = "ReportOnline"
    override val kind = OperationKind.MUTATION
    override val body = "mutation ReportOnline(\$active:Boolean,\$platform:String){presenceReportOnline(timeout:5000,active:\$active,platform:\$platform)}"
    override val selector = ReportOnlineSelector
}