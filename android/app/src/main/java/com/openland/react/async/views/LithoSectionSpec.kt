package com.openland.react.async.views

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
import com.facebook.litho.sections.common.*
import com.facebook.litho.widget.ComponentRenderInfo
import com.facebook.litho.widget.Progress
import com.facebook.litho.widget.RenderInfo
import com.facebook.react.bridge.ReactContext
import com.facebook.yoga.YogaAlign
import com.facebook.yoga.YogaEdge
import com.facebook.yoga.YogaJustify
import com.openland.react.async.*
import java.util.*

@GroupSectionSpec
object LithoSectionSpec {

    @OnCreateChildren
    internal fun onCreateChildren(c: SectionContext,
                                  @Prop dataViewKey: String,
                                  @Prop dataModel: List<AsyncDataViewItem>,
                                  @Prop loading: Boolean,
                                  @Prop loadingForward: Boolean,
                                  @Prop headerPadding: Float,
                                  @Prop(optional = true) overflowColor: Int?,
                                  @Prop(optional = true) loaderColor: Int?
    ): Children {

        var footer = Column.create(c)
                .heightDip(64.0f)
                .widthPercent(100.0f)
                .alignItems(YogaAlign.CENTER)
                .justifyContent(YogaJustify.CENTER)



        if (overflowColor != null) {
            footer.backgroundColor(overflowColor)
                    .justifyContent(YogaJustify.FLEX_END)
                    .clipToOutline(false)
            var overflow = Row.create(c)
                    .heightDip(1000.0f)
                    .marginDip(YogaEdge.TOP, -1000.0f)
                    .backgroundColor(overflowColor)
                    .alignSelf(YogaAlign.STRETCH)
                    .clipToOutline(false)

            footer.child(overflow)


        }

        if (loading) {
            val progress = Progress.create(c)
                    .heightDip(32.0f)
                    .widthDip(32.0f)
                    .color(if (loaderColor !== null) loaderColor else 0xFF0084fe.toInt())
                    .marginDip(YogaEdge.BOTTOM, 16.0f)

            footer.child(progress)
        }

        var header = Row.create(c)
                .widthPercent(100.0f)
                .alignItems(YogaAlign.CENTER)
                .justifyContent(YogaJustify.CENTER)
                .heightDip(headerPadding + if (loadingForward) 64.0f else 0f)
        if (overflowColor !== null) {
            header.backgroundColor(overflowColor)
        }

        if (loadingForward) {
            val progress = Progress.create(c)
                    .heightDip(32.0f)
                    .widthDip(32.0f)
                    .color(if (loaderColor !== null) loaderColor else 0xFF0084fe.toInt())
                    .marginDip(YogaEdge.BOTTOM, 16.0f)

            header.child(progress)
        }

        return Children.create()
                .child(SingleComponentSection.create(c)
                        .component(header)
                        .key( "header" + if (loadingForward) "header_" + Date().time.toString() else "")
                )
                .child(DataDiffSection.create<AsyncDataViewItem>(c)
                        .data(dataModel)
// known bug: list resets position after all items updated, method below can fix it, but some how (possible litho bug, yet we cant use latest version because of androidX)
// if this methods are enabled item height is not updating (requestLayout not called?)
//                        .onCheckIsSameItemEventHandler(LithoSection.isSameItem(c))
//                        .onCheckIsSameContentEventHandler(LithoSection.isSameContent(c))
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

        if (firstVisibleIndex < 20) {
            AsyncDataViewManager.getDataView(dataViewKey, reactContext).handleLoadMoreForward()
        }
    }

    @OnEvent(OnCheckIsSameItemEvent::class)
    @JvmName("isSameItem")
    fun isSameItem(
            c: SectionContext,
            @FromEvent previousItem: AsyncDataViewItem,
            @FromEvent nextItem: AsyncDataViewItem): Boolean = previousItem.key == nextItem.key

    @OnEvent(OnCheckIsSameContentEvent::class)
    @JvmName("isSameContent")
    fun isSameContent(
            c: SectionContext,
            @FromEvent previousItem: AsyncDataViewItem,
            @FromEvent nextItem: AsyncDataViewItem): Boolean = previousItem == nextItem

    @OnEvent(RenderEvent::class)
    @JvmName("onRenderEdge")
    internal fun onRenderEdge(c: SectionContext, @FromEvent model: AsyncDataViewItem, @Prop reactContext: ReactContext): RenderInfo {
        return ComponentRenderInfo.create()
                .component(Column.create(c)
                        .child(resolveNode(c, model.spec, reactContext))
                        .alignItems(YogaAlign.STRETCH)
                        .clipToOutline(false)
                        .widthPercent(100.0f))
                .build()
    }
}