package com.korshakov.testing.openland.async

import android.graphics.Canvas
import android.graphics.Color
import android.support.v7.widget.LinearLayoutManager
import android.widget.FrameLayout
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.litho.*
import com.facebook.litho.sections.SectionContext
import com.facebook.litho.sections.common.SingleComponentSection
import com.facebook.litho.sections.widget.*
import com.facebook.litho.widget.Progress
import com.facebook.litho.widget.SolidColor
import com.facebook.react.bridge.*
import com.facebook.react.uimanager.annotations.ReactProp
import com.korshakov.testing.openland.async.views.LithoSection
import com.microsoft.appcenter.SessionContext


class AsyncListView(context: ReactContext) : FrameLayout(context) {
    private val asyncContext = ComponentContext(context)
    private val lithoView = LithoView(context)
    private var inited = false
    private var dataView: AsyncDataView? = null
    private var dataViewKey: String? = null
    private var state: AsyncDataViewState = AsyncDataViewState(emptyList(), true)
    private var dataViewSibscription: (() -> Unit)? = null
    private var inverted: Boolean = false
    private var headerPadding: Float = 0.0f
    private var mounted = false

    init {
        this.addView(this.lithoView,
                android.widget.FrameLayout.LayoutParams(
                        android.view.ViewGroup.LayoutParams.MATCH_PARENT,
                        android.view.ViewGroup.LayoutParams.MATCH_PARENT))
        // lithoView.setComponent(SolidColor.create(asyncContext).color(Color.TRANSPARENT).build())
//        val recycler = RecyclerCollectionComponent.create(asyncContext)
//                .disablePTR(true)
//                .section(SingleComponentSection.create(SectionContext(asyncContext)).component(Progress.create(asyncContext)).build())
//                .build()
//        lithoView.setComponent(recycler)
    }

    fun setInverted(inverted: Boolean) {
        this.inverted = inverted
        if (inited && mounted) {
            updateData()
        }
    }

    fun setDataViewKey(key: String) {
        if (!inited) {
            inited = true
            this.dataView = AsyncDataViewManager.getDataView(key, this.context as ReactContext)
            this.dataViewKey = key
            this.state = this.dataView!!.state
            this.dataViewSibscription = this.dataView!!.watch {
                this.state = it
                if (this.mounted) {
                    updateData()
                }
            }
            // updateData()
            val recycler = RecyclerCollectionComponent.create(asyncContext)
                    .disablePTR(true)
                    .section(LithoSection.create(SectionContext(asyncContext))
                            .dataModel(emptyList())
                            .headerPadding(this.headerPadding)
                            .reactContext(context as ReactContext)
                            .loading(true)
                            .dataViewKey(this.dataViewKey!!))
                    .recyclerConfiguration(ListRecyclerConfiguration<SectionBinderTarget>(LinearLayoutManager.VERTICAL, this.inverted))
                    .asyncPropUpdates(true)
                    .asyncStateUpdates(true)
                    .canMeasureRecycler(false)
                    .build()
            lithoView.setComponent(recycler)
        }
    }

    fun setHeaderPadding(value: Float) {
        this.headerPadding = value
        if (inited && this.mounted) {
            updateData()
        }
    }

    private fun updateData() {
        val recycler = RecyclerCollectionComponent.create(asyncContext)
                .disablePTR(true)
                .section(LithoSection.create(SectionContext(asyncContext))
                        .dataModel(this.state.items)
                        .headerPadding(this.headerPadding)
                        .reactContext(context as ReactContext)
                        .loading(!this.state.competed)
                        .dataViewKey(this.dataViewKey!!))
                .recyclerConfiguration(ListRecyclerConfiguration<SectionBinderTarget>(LinearLayoutManager.VERTICAL, this.inverted))
                .build()
        lithoView.setComponent(recycler)
    }

    override fun onLayout(changed: Boolean, left: Int, top: Int, right: Int, bottom: Int) {
        super.onLayout(changed, left, top, right, bottom)
        // runOnUIThreadDelayed(250) {
        if (!this.mounted) {
//            runOnUIThreadDelayed(100) {
////                val recycler = RecyclerCollectionComponent.create(asyncContext)
////                        .disablePTR(true)
////                        .section(LithoSection.create(SectionContext(asyncContext))
////                                .dataModel(emptyList())
////                                .headerPadding(this.headerPadding)
////                                .reactContext(context as ReactContext)
////                                .loading(!this.state.competed)
////                                .dataViewKey(this.dataViewKey!!))
////                        .recyclerConfiguration(ListRecyclerConfiguration<SectionBinderTarget>(LinearLayoutManager.VERTICAL, this.inverted))
////                        .build()
////                lithoView.setComponent(recycler)
//
//                runOnUIThreadDelayed(10) {
//                    this.mounted = true
//                    updateData()
//                }
//            }
            this.mounted = true
            updateData()
        }
        //}
    }

    fun dispose() {
        if (inited) {
            this.dataViewSibscription!!()
        }
    }
}

class AsyncListViewManager : SimpleViewManager<AsyncListView>() {

    override fun getName(): String {
        return "RNAsyncListView"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): AsyncListView {
        return AsyncListView(reactContext)
    }

    override fun onDropViewInstance(view: AsyncListView) {
        view.dispose()
    }

    @ReactProp(name = "dataViewKey")
    fun setDataViewKey(view: AsyncListView, key: String) {
        view.setDataViewKey(key)
    }

    @ReactProp(name = "inverted")
    fun setInverted(view: AsyncListView, inverted: Boolean) {
        view.setInverted(inverted)
    }

    @ReactProp(name = "headerPadding")
    fun setHeaderPadding(view: AsyncListView, value: Float) {
        view.setHeaderPadding(value)
    }
}