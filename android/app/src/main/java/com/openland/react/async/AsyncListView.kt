package com.openland.react.async

import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.widget.FrameLayout
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.litho.*
import com.facebook.litho.sections.SectionContext
import com.facebook.litho.sections.widget.*
import com.facebook.react.uimanager.PixelUtil
import com.facebook.react.uimanager.annotations.ReactProp
import com.openland.react.async.views.LithoSection
import com.facebook.react.common.MapBuilder
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.UIManagerModule
import com.facebook.react.views.scroll.ScrollEvent
import com.facebook.react.views.scroll.ScrollEventType


class AsyncListView(context: ReactContext) : FrameLayout(context) {
    private val asyncContext = ComponentContext(context)
    private val lithoView = LithoView(context)
    private var inited = false
    private var dataView: AsyncDataView? = null
    private var dataViewKey: String? = null
    private var state: AsyncDataViewState = AsyncDataViewState(emptyList(), true)
    private var dataViewSubscription: (() -> Unit)? = null
    private var inverted: Boolean = false
    private var headerPadding: Float = 0.0f
    private var overflowColor: Int? = null
    private val scrollListener = object : RecyclerView.OnScrollListener() {

        override fun onScrolled(recyclerView: RecyclerView, dx: Int, dy: Int) {
            val manager = (recyclerView.layoutManager as LinearLayoutManager)
            val v = manager.findViewByPosition(1)
            if (v != null) {
                val offset = -Math.round(v.top - PixelUtil.toPixelFromDIP(headerPadding))

                context.getNativeModule(UIManagerModule::class.java)
                        .eventDispatcher
                        .dispatchEvent(
                                ScrollEvent.obtain(
                                        id,
                                        ScrollEventType.SCROLL,
                                        0,
                                        offset,
                                        0f,
                                        0f,
                                        0,
                                        0,
                                        0,
                                        0))

            }
        }
    }

    init {
        this.addView(this.lithoView,
                android.widget.FrameLayout.LayoutParams(
                        android.view.ViewGroup.LayoutParams.MATCH_PARENT,
                        android.view.ViewGroup.LayoutParams.MATCH_PARENT))
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
            this.dataViewSubscription = this.dataView!!.watch {
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

     fun setOverflowColor(value: Int) {
        this.overflowColor = value
        if (inited) {
            updateData()
        }
    }

    private fun updateData() {
        val recycler = RecyclerCollectionComponent.create(asyncContext)
                .backgroundColor(if (this.state.items.isEmpty()) (if (this.overflowColor !== null) this.overflowColor!! else 0x00ffffff) else  0x00ffffff)
                .clipToPadding(false)
                .clipChildren(false)
                .disablePTR(true)
                .section(LithoSection.create(SectionContext(asyncContext))
                        .dataModel(this.state.items)
                        .headerPadding(this.headerPadding)
                        .overflowColor(this.overflowColor)
                        .reactContext(context as ReactContext)
                        .loading(!this.state.competed)
                        .dataViewKey(this.dataViewKey!!))
                .recyclerConfiguration(ListRecyclerConfiguration<SectionBinderTarget>(LinearLayoutManager.VERTICAL, this.inverted))
                .onScrollListener(this.scrollListener)
                .itemAnimator(null)
                .build()
        lithoView.setComponentAsync(recycler)
    }

    fun dispose() {
        if (inited) {
            this.dataViewSubscription!!()
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

    @ReactProp(name = "overflowColor")
    fun setOverflowColor(view: AsyncListView, value: Int) {
        view.setOverflowColor(value)
    }

    override fun getExportedCustomDirectEventTypeConstants(): MutableMap<String, Any> {
        return MapBuilder.builder<String, Any>()
                .put("onScroll",
                        MapBuilder.of("registrationName", "onScroll"))
                .build()
    }
}