package com.korshakov.testing.openland.async.views

import com.facebook.litho.Column
import com.facebook.litho.Row
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
import com.facebook.yoga.YogaAlign
import com.korshakov.testing.openland.async.AsyncDataViewItem
import com.korshakov.testing.openland.async.AsyncViewSpec
import com.korshakov.testing.openland.async.resolveNode

@GroupSectionSpec
object LithoSectionSpec {

    @OnCreateChildren
    internal fun onCreateChildren(c: SectionContext, @Prop dataModel: List<AsyncDataViewItem>, @Prop reactContext: ReactContext): Children {
        return Children.create()
                .child(DataDiffSection.create<AsyncDataViewItem>(c)
                        .data(dataModel)
                        .renderEventHandler(LithoSection.onRenderEdge(c)))
                .build()
    }

    @OnEvent(RenderEvent::class)
    @JvmName("onRenderEdge")
    internal fun onRenderEdge(c: SectionContext, @FromEvent model: AsyncDataViewItem, @Prop reactContext: ReactContext): RenderInfo {
        return ComponentRenderInfo.create()
                .component(Column.create(c)
                        .child(resolveNode(c, model.spec, reactContext))
                        .alignItems(YogaAlign.STRETCH)
                        .widthPercent(100.0f))
                .build()
    }
}