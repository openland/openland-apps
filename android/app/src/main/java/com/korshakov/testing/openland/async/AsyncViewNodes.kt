package com.korshakov.testing.openland.async

import com.facebook.litho.Component
import com.facebook.litho.ComponentContext
import com.facebook.litho.Row
import com.facebook.litho.widget.Text

fun resolveNode(context: ComponentContext, src: AsyncViewSpec): Component {
    if (src is AsyncFlexSpec) {
        val res = Row.create(context)
        for (c in src.children) {
            res.child(resolveNode(context, c))
        }
        // TODO: Handle styles
        return res.build()
    } else if (src is AsyncTextSpec) {
        val res = Text.create(context)
                .text(src.text)
        // TODO: Handle styles
        return res.build()
    }
    error("Unsupported spec")
}