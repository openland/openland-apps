package com.korshakov.testing.openland.async

import com.beust.klaxon.JsonArray
import com.beust.klaxon.JsonObject
import com.beust.klaxon.Parser
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.util.concurrent.CopyOnWriteArrayList

data class AsyncDataViewItem(val key: String, val spec: AsyncViewSpec)

data class AsyncDataViewState(val items: List<AsyncDataViewItem>, val competed: Boolean)

class AsyncDataView(val context: ReactContext, val key: String) {
    var state: AsyncDataViewState = AsyncDataViewState(emptyList(), false)

    private var listeners = CopyOnWriteArrayList<(state: AsyncDataViewState) -> Unit>()
    private var isRequested = false

    fun watch(handler: (state: AsyncDataViewState) -> Unit): () -> Unit {
        synchronized(listeners) {
            listeners.add(handler)
            Unit
        }
        return {
            synchronized(listeners) {
                val i = listeners.indexOf(handler)
                if (i >= 0) {
                    listeners.removeAt(i)
                }
            }
        }
    }

    private fun notifyWatchers(state: AsyncDataViewState) {
        for (l in listeners) {
            l(state)
        }
    }

    fun handleInit(items: List<AsyncDataViewItem>, completed: Boolean) {
        val s = AsyncDataViewState(items, completed)
        this.state = s
        notifyWatchers(s)
    }

    fun handleAddItem(item: AsyncDataViewItem, index: Int) {
        val s = AsyncDataViewState(this.state.items.subList(0, index) + item + this.state.items.subList(index, this.state.items.size), this.state.competed)
        this.state = s
        notifyWatchers(s)
    }

    fun handleUpdateItem(item: AsyncDataViewItem, index: Int) {
        val s = AsyncDataViewState(this.state.items.subList(0, index) + item + this.state.items.subList(index + 1, this.state.items.size), this.state.competed)
        this.state = s
        notifyWatchers(s)
    }

    fun handleMoveItem(key: String, from: Int, to: Int) {
        val i = this.state.items[from]
        var itms = this.state.items.subList(0, from) + this.state.items.subList(from + 1, this.state.items.size)
        itms = itms.subList(0, to) + i + itms.subList(to, itms.size)
        val s = AsyncDataViewState(itms, this.state.competed)
        this.state = s
        notifyWatchers(s)
    }

    fun handleRemoveItem(key: String, index: Int) {
        val itms = this.state.items.subList(0, index) + this.state.items.subList(index + 1, this.state.items.size)
        val s = AsyncDataViewState(itms, this.state.competed)
        this.state = s
        notifyWatchers(s)
    }

    fun handleLoadedMore(items: List<AsyncDataViewItem>, completed: Boolean) {
        val s = AsyncDataViewState(this.state.items + items, completed)
        this.state = s
        notifyWatchers(s)
        this.isRequested = false
    }

    fun handleLoadMore() {
        if (!isRequested && !this.state.competed && this.state.items.isNotEmpty()) {
            isRequested = true
            val map = WritableNativeMap()
            map.putString("key", this.key)
            this.context
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                    .emit("async_on_load_more", map)
        }
    }
}

class AsyncDataViewManager(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    companion object {
        private var dataViews = mutableMapOf<String, AsyncDataView>()
        fun getDataView(key: String, context: ReactContext): AsyncDataView {
            synchronized(dataViews) {
                return if (dataViews.containsKey(key)) {
                    dataViews[key]!!
                } else {
                    val res = AsyncDataView(context, key)
                    dataViews[key] = res
                    res
                }
            }
        }
    }

    override fun getName(): String {
        return "RNAsyncDataViewManager"
    }

    @ReactMethod
    fun dataViewInit(dataSourceKey: String, config: String, completed: Boolean) {
        val parser = Parser()
        val parsed = parser.parse(StringBuilder(config)) as JsonArray<JsonObject>
        val items = parsed.map { AsyncDataViewItem(it["key"] as String, parseSpec(it["config"] as String, reactApplicationContext)) }
        getDataView(dataSourceKey, this.reactApplicationContext).handleInit(items, completed)
    }

    @ReactMethod
    fun dataViewAddItem(dataSourceKey: String, key: String, config: String, index: Int) {
        getDataView(dataSourceKey, this.reactApplicationContext).handleAddItem(AsyncDataViewItem(key, parseSpec(config, reactApplicationContext)), index)
    }

    @ReactMethod
    fun dataViewUpdateItem(dataSourceKey: String, key: String, config: String, index: Int) {
        getDataView(dataSourceKey, this.reactApplicationContext).handleUpdateItem(AsyncDataViewItem(key, parseSpec(config, reactApplicationContext)), index)
    }

    @ReactMethod
    fun dataViewRemoveItem(dataSourceKey: String, key: String, index: Int) {
        getDataView(dataSourceKey, this.reactApplicationContext).handleRemoveItem(key, index)
    }

    @ReactMethod
    fun dataViewMoveItem(dataSourceKey: String, key: String, fromIndex: Int, toIndex: Int) {
        getDataView(dataSourceKey, this.reactApplicationContext).handleMoveItem(key, fromIndex, toIndex)
    }

    @ReactMethod
    fun dataViewLoadedMore(dataSourceKey: String, config: String, completed: Boolean) {
        val parser = Parser()
        val parsed = parser.parse(StringBuilder(config)) as JsonArray<JsonObject>
        val items = parsed.map { AsyncDataViewItem(it["key"] as String, parseSpec(it["config"] as String, reactApplicationContext)) }
        getDataView(dataSourceKey, this.reactApplicationContext).handleLoadedMore(items, completed)
    }

    @ReactMethod
    fun dataViewCompleted(dataSourceKey: String) {
        //
    }
}