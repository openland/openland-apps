package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ReportOnlineSelector = obj(
            field("presenceReportOnline","presenceReportOnline", arguments(fieldValue("active", refValue("active")), fieldValue("platform", refValue("platform")), fieldValue("timeout", intValue(5000))), notNull(scalar("String")))
        )
val ReportOnline = object: OperationDefinition {
    override val name = "ReportOnline"
    override val kind = OperationKind.MUTATION
    override val body = "mutation ReportOnline(\$active:Boolean,\$platform:String){presenceReportOnline(active:\$active,platform:\$platform,timeout:5000)}"
    override val selector = ReportOnlineSelector
}