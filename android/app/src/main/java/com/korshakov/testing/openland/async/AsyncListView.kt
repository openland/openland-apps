package com.korshakov.testing.openland.async

import android.support.v7.widget.LinearLayoutManager
import android.widget.FrameLayout
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.litho.*
import com.facebook.litho.sections.SectionContext
import com.facebook.litho.sections.widget.*
import com.facebook.react.bridge.*
import com.facebook.react.uimanager.annotations.ReactProp
import com.korshakov.testing.openland.async.views.LithoSection


class AsyncListView(context: ReactContext) : FrameLayout(context) {
    private val asyncContext = ComponentContext(context)
    private val lithoView = LithoView(context)
    private var inited = false
    private var dataView: AsyncDataView? = null
    private var state: AsyncDataViewState? = null
    private var dataViewSibscription: (() -> Unit)? = null
    private var inverted: Boolean = false

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
            this.dataView = AsyncDataViewManager.getDataView(key)
            this.state = this.dataView!!.state
            this.dataViewSibscription = this.dataView!!.watch {
                this.state = it
                updateData()
            }
            updateData()
        }
    }

    private fun updateData() {
        val recycler = RecyclerCollectionComponent.create(asyncContext)
                .disablePTR(true)
                .section(LithoSection.create(SectionContext(asyncContext))
                        .dataModel(this.state!!.items)
                        .reactContext(context as ReactContext))
                .recyclerConfiguration(ListRecyclerConfiguration<SectionBinderTarget>(LinearLayoutManager.VERTICAL, this.inverted))
                .build()
        lithoView.setComponent(recycler)
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
}