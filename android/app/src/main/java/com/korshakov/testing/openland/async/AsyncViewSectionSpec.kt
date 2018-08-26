package com.korshakov.testing.openland.async

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

@GroupSectionSpec
object AsyncViewSectionSpec {

    @OnCreateChildren
    internal fun onCreateChildren(
            c: SectionContext,
            @Prop dataModel: List<AsyncViewSpec>): Children {
        return Children.create()
                .child(DataDiffSection.create<AsyncViewSpec>(c)
                        .data(dataModel)
                        .renderEventHandler(AsyncViewSection.`onRenderEdge$app_debug`(c)))
                .build()
    }

    @OnEvent(RenderEvent::class)
    internal fun onRenderEdge(
            c: SectionContext,
            @FromEvent model: AsyncViewSpec): RenderInfo {
        return ComponentRenderInfo.create()
                .component(resolveNode(c, model))
                .build()
    }
}