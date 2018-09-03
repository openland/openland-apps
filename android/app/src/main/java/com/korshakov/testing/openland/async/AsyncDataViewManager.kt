package com.korshakov.testing.openland.async

import com.beust.klaxon.JsonArray
import com.beust.klaxon.JsonObject
import com.beust.klaxon.Parser
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.util.concurrent.CopyOnWriteArrayList

data class AsyncDataViewItem(val key: String, val spec: AsyncViewSpec)

data class AsyncDataViewState(val items: List<AsyncDataViewItem>, val competed: Boolean)

class AsyncDataView {
    var state: AsyncDataViewState = AsyncDataViewState(emptyList(), false)

    private var listeners = CopyOnWriteArrayList<(state: AsyncDataViewState) -> Unit>()

    fun watch(handler: (state: AsyncDataViewState) -> Unit): () -> Unit {
        synchronized(listeners) {
            listeners.add(handler)
            Unit
        }
        return {
            synchronized(listeners) {
                val i = listeners.indexOf(handler)
                if (i >= 0) {
                    listeners.removeAt(i);
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
        var i = this.state.items[from]
        var itms = this.state.items.subList(0, from) + this.state.items.subList(from + 1, this.state.items.size)
        itms = itms.subList(0, to) + i + itms.subList(to, itms.size)
        val s = AsyncDataViewState(itms, this.state.competed)
        this.state = s
        notifyWatchers(s)
    }

    fun handleRemoveItem(key: String, index: Int) {
        var itms = this.state.items.subList(0, index) + this.state.items.subList(index + 1, this.state.items.size)
        val s = AsyncDataViewState(itms, this.state.competed)
        this.state = s
        notifyWatchers(s)
    }
}

class AsyncDataViewManager(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    companion object {
        private var dataViews = mutableMapOf<String, AsyncDataView>()
        fun getDataView(key: String): AsyncDataView {
            synchronized(dataViews) {
                return if (dataViews.containsKey(key)) {
                    dataViews[key]!!
                } else {
                    val res = AsyncDataView()
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
        val items = parsed.map { AsyncDataViewItem(it["key"] as String, parseSpec(it["config"] as String)) }
        getDataView(dataSourceKey).handleInit(items, completed)
    }

    @ReactMethod
    fun dataViewAddItem(dataSourceKey: String, key: String, config: String, index: Int) {
        getDataView(dataSourceKey).handleAddItem(AsyncDataViewItem(key, parseSpec(config)), index)
    }

    @ReactMethod
    fun dataViewUpdateItem(dataSourceKey: String, key: String, config: String, index: Int) {
        getDataView(dataSourceKey).handleUpdateItem(AsyncDataViewItem(key, parseSpec(config)), index)
    }

    @ReactMethod
    fun dataViewRemoveItem(dataSourceKey: String, key: String, index: Int) {
        getDataView(dataSourceKey).handleRemoveItem(key, index)
    }

    @ReactMethod
    fun dataViewMoveItem(dataSourceKey: String, key: String, fromIndex: Int, toIndex: Int) {
        getDataView(dataSourceKey).handleMoveItem(key, fromIndex, toIndex)
    }

    @ReactMethod
    fun dataViewLoadedMore(dataSourceKey: String, config: String, completed: Boolean) {
        //
    }

    @ReactMethod
    fun dataViewCompleted(dataSourceKey: String) {
        //
    }
}