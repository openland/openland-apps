package com.korshakov.testing.openland.async

import android.graphics.Color
import android.support.v7.widget.LinearLayoutManager
import android.widget.FrameLayout
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.litho.*
import com.facebook.litho.sections.SectionContext
import com.facebook.litho.sections.common.SingleComponentSection
import com.facebook.litho.sections.widget.*
import com.facebook.litho.widget.SolidColor
import com.facebook.react.bridge.*
import com.facebook.react.uimanager.annotations.ReactProp
import com.korshakov.testing.openland.async.views.LithoSection


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

    init {
        this.addView(this.lithoView,
                android.widget.FrameLayout.LayoutParams(
                        android.view.ViewGroup.LayoutParams.MATCH_PARENT,
                        android.view.ViewGroup.LayoutParams.MATCH_PARENT))
        lithoView.setComponent(SolidColor.create(asyncContext).color(Color.RED).build())
    }

    fun setInverted(inverted: Boolean) {
        this.inverted = inverted
        if (inited) {
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
                updateData()
            }
            updateData()
        }
    }

    fun setHeaderPadding(value: Float) {
        this.headerPadding = value
        if (inited) {
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
        lithoView.setComponentAsync(recycler)
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