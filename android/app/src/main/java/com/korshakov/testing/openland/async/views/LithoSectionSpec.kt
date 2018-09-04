package com.korshakov.testing.openland.async.views

import android.graphics.Color
import android.util.Log
import com.facebook.litho.Column
import com.facebook.litho.Row
import com.facebook.litho.annotations.FromEvent
import com.facebook.litho.annotations.OnEvent
import com.facebook.litho.annotations.Prop
import com.facebook.litho.sections.Children
import com.facebook.litho.sections.SectionContext
import com.facebook.litho.sections.annotations.GroupSectionSpec
import com.facebook.litho.sections.annotations.OnCreateChildren
import com.facebook.litho.sections.annotations.OnViewportChanged
import com.facebook.litho.sections.common.DataDiffSection
import com.facebook.litho.sections.common.RenderEvent
import com.facebook.litho.sections.common.SingleComponentSection
import com.facebook.litho.widget.ComponentRenderInfo
import com.facebook.litho.widget.Progress
import com.facebook.litho.widget.RenderInfo
import com.facebook.react.bridge.ReactContext
import com.facebook.yoga.YogaAlign
import com.facebook.yoga.YogaJustify
import com.korshakov.testing.openland.async.*

@GroupSectionSpec
object LithoSectionSpec {

    @OnCreateChildren
    internal fun onCreateChildren(c: SectionContext,
                                  @Prop dataViewKey: String,
                                  @Prop dataModel: List<AsyncDataViewItem>,
                                  @Prop loading: Boolean,
                                  @Prop headerPadding: Float): Children {

        var footer = Row.create(c)
                .heightDip(64.0f)
                .widthPercent(100.0f)
                .alignItems(YogaAlign.CENTER)
                .justifyContent(YogaJustify.CENTER)

        if (loading && dataModel.isNotEmpty()) {
            footer.child(Progress.create(c)
                    .heightDip(32.0f)
                    .widthDip(32.0f)
                    .color(0xFF4747EC.toInt()))
        }

        return Children.create()
                .child(SingleComponentSection.create(c)
                        .component(Row.create(c).heightDip(headerPadding)))
                .child(DataDiffSection.create<AsyncDataViewItem>(c)
                        .data(dataModel)
                        .renderEventHandler(LithoSection.onRenderEdge(c)))
                .child(SingleComponentSection.create(c)
                        .component(footer))
                .build()
    }

    @OnViewportChanged
    internal fun onViewportChanged(c: SectionContext,
                                   firstVisibleIndex: Int,
                                   lastVisibleIndex: Int,
                                   totalCount: Int,
                                   firstFullyVisibleIndex: Int,
                                   lastFullyVisibleIndex: Int,
                                   @Prop dataViewKey: String,
                                   @Prop reactContext: ReactContext) {
        if (lastVisibleIndex > totalCount - 20) {
            AsyncDataViewManager.getDataView(dataViewKey, reactContext).handleLoadMore()
        }
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