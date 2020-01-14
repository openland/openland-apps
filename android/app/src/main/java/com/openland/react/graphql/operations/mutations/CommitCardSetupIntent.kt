package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val CommitCardSetupIntentSelector = obj(
            field("cardCommitSetupIntent", "cardCommitSetupIntent", arguments(fieldValue("id", refValue("id")), fieldValue("pmid", refValue("pmid"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                )))
        )
val CommitCardSetupIntent = object: OperationDefinition {
    override val name = "CommitCardSetupIntent"
    override val kind = OperationKind.MUTATION
    override val body = "mutation CommitCardSetupIntent(\$id:ID!,\$pmid:ID!){cardCommitSetupIntent(id:\$id,pmid:\$pmid){__typename id}}"
    override val selector = CommitCardSetupIntentSelector
}