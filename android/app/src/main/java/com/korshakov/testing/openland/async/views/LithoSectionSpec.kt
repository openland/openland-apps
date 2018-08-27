package com.korshakov.testing.openland.async.views

import com.facebook.litho.annotations.FromEvent
import com.facebook.litho.annotations.OnEvent
import com.facebook.litho.annotations.Prop
import com.facebook.litho.sections.Children
import com.facebook.litho.sections.SectionContext
import com.facebook.litho.sections.annotations.GroupSectionSpec
import com.facebook.litho.sections.annotations.OnCreateChildren
import com.facebook.litho.sections.common.DataDiffSection
import com.facebook.litho.sections.common.RenderEvent
import com.facebook.litho.widget.ComponentRenderInfo
import com.facebook.litho.widget.RenderInfo
import com.facebook.react.bridge.ReactContext
import com.korshakov.testing.openland.async.AsyncViewSpec
import com.korshakov.testing.openland.async.resolveNode

@GroupSectionSpec
object LithoSectionSpec {

    @OnCreateChildren
    internal fun onCreateChildren(c: SectionContext, @Prop dataModel: List<AsyncViewSpec>, @Prop reactContext: ReactContext): Children {
        return Children.create()
                .child(DataDiffSection.create<AsyncViewSpec>(c)
                        .data(dataModel)
                        .renderEventHandler(LithoSection.onRenderEdge(c)))
                .build()
    }

    @OnEvent(RenderEvent::class)
    @JvmName("onRenderEdge")
    internal fun onRenderEdge(c: SectionContext, @FromEvent model: AsyncViewSpec, @Prop reactContext: ReactContext): RenderInfo {
        return ComponentRenderInfo.create()
                .component(resolveNode(c, model, reactContext))
                .build()
    }
}