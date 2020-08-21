package com.openland.react.async

import android.os.Process
import android.util.Log
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import org.json.JSONArray
import java.util.concurrent.CopyOnWriteArrayList

data class AsyncDataViewItem(val key: String, var spec: AsyncViewSpec)

data class AsyncDataViewState(var items: List<AsyncDataViewItem>, val competed: Boolean, val competedForward: Boolean, var scrollToKey: String?, var animated: Boolean?)

class AsyncDataView(val context: ReactContext, val key: String) {
    private var applyModes: Array<String> = arrayOf()

    var state: AsyncDataViewState = AsyncDataViewState(emptyList(), false, false, null, false)

    private var listeners = CopyOnWriteArrayList<(state: AsyncDataViewState) -> Unit>()
    private var isRequested = false
    private var isRequestedForward = false

    fun applyModes(renderModes: Array<String>){
        this.applyModes = renderModes
        val s = AsyncDataViewState(this.state.items.map {
            when (it.spec) {
                is AsyncFlexSpec -> AsyncDataViewItem(it.key, (it.spec as AsyncFlexSpec).applyModes(this.applyModes))
                else -> it
            }
        }, this.state.competed, this.state.competedForward, this.state.scrollToKey, false)
        this.state = s
        notifyWatchers(s)
    }

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

    fun handleInit(items: List<AsyncDataViewItem>, completed: Boolean, completedForward: Boolean, anchor: String?) {
        val s = AsyncDataViewState(items, completed, completedForward, anchor, false)
        this.state = s
        notifyWatchers(s)
    }

    fun handleAddItem(item: AsyncDataViewItem, index: Int, isAnchor: Boolean?) {
        val s = AsyncDataViewState(this.state.items.subList(0, index) + AsyncDataViewItem(item.key, (item.spec as AsyncFlexSpec).applyModes(this.applyModes)) + this.state.items.subList(index, this.state.items.size), this.state.competed, this.state.competedForward, if (isAnchor !== null && isAnchor) item.key else this.state.scrollToKey, false)
        this.state = s
        notifyWatchers(s)
    }

    fun handleUpdateItem(item: AsyncDataViewItem, index: Int) {
        val s = AsyncDataViewState(this.state.items.subList(0, index) + AsyncDataViewItem(item.key, (item.spec as AsyncFlexSpec).applyModes(this.applyModes)) + this.state.items.subList(index + 1, this.state.items.size), this.state.competed, this.state.competedForward, this.state.scrollToKey, false)
        this.state = s
        notifyWatchers(s)
    }

    fun handleMoveItem(key: String, from: Int, to: Int) {
        val i = this.state.items[from]
        var itms = this.state.items.subList(0, from) + this.state.items.subList(from + 1, this.state.items.size)
        itms = itms.subList(0, to) + i + itms.subList(to, itms.size)
        val s = AsyncDataViewState(itms, this.state.competed, this.state.competedForward, this.state.scrollToKey, false)
        this.state = s
        notifyWatchers(s)
    }

    fun handleRemoveItem(key: String, index: Int) {
        val itms = this.state.items.subList(0, index) + this.state.items.subList(index + 1, this.state.items.size)
        val s = AsyncDataViewState(itms, this.state.competed, this.state.competedForward, this.state.scrollToKey, false)
        this.state = s
        notifyWatchers(s)
    }

    fun handleLoadedMore(items: List<AsyncDataViewItem>, completed: Boolean) {
        val s = AsyncDataViewState(this.state.items + items.map {
            when (it.spec) {
                is AsyncFlexSpec -> AsyncDataViewItem(it.key, (it.spec as AsyncFlexSpec).applyModes(this.applyModes))
                else -> it
            }
        }, completed, this.state.competedForward, this.state.scrollToKey, false)
        this.state = s
        notifyWatchers(s)
        this.isRequested = false
    }

    fun handleLoadedMoreForward(items: List<AsyncDataViewItem>, completed: Boolean) {
        val s = AsyncDataViewState(items.map {
            when (it.spec) {
                is AsyncFlexSpec -> AsyncDataViewItem(it.key, (it.spec as AsyncFlexSpec).applyModes(this.applyModes))
                else -> it
            }
        } + this.state.items, this.state.competed, completed, this.state.scrollToKey, false)
        this.state = s
        notifyWatchers(s)
        this.isRequestedForward = false
    }

    fun handleScrollToKeyRequest(scrollToKey: String){
        val s = AsyncDataViewState(this.state.items, this.state.competed, this.state.competedForward, scrollToKey, false)
        this.state = s
        notifyWatchers(s)
    }

    fun handleScrollToTopFunc() {
        if (!this.state.items.isEmpty()) {
            val s = AsyncDataViewState(this.state.items, this.state.competed, this.state.competedForward, this.state.items[0].key, true);
            this.state = s
            notifyWatchers(s)
        }
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

    fun handleLoadMoreForward() {
        if (!isRequestedForward && !this.state.competed && this.state.items.isNotEmpty()) {
            isRequestedForward = true
            val map = WritableNativeMap()
            map.putString("key", this.key)
            this.context
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                    .emit("async_on_load_more_forward", map)
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
    fun dataViewInit(dataSourceKey: String, config: String, completed: Boolean, completedForward: Boolean, anchor: String?) {
        // Process.setThreadPriority(Process.THREAD_PRIORITY_FOREGROUND)
        Thread.currentThread().priority = Thread.NORM_PRIORITY + 2
        Log.d("SView", "Current thread priority: " + Thread.currentThread().priority)
        val start = System.currentTimeMillis()
        val parsed = JSONArray(config)
        val items = mutableListOf<AsyncDataViewItem>()
        for (i in 0 until parsed.length()) {
            val itm = parsed.getJSONObject(i)
            items.add(AsyncDataViewItem(itm.getString("key"), resolveSpec(itm.getJSONObject("config"), reactApplicationContext)))
        }
        Log.d("SView-DataView", "Inited in " + (System.currentTimeMillis() - start) + " ms")
        getDataView(dataSourceKey, this.reactApplicationContext).handleInit(items, completed, completedForward, anchor)
    }

    @ReactMethod
    fun dataViewAddItem(dataSourceKey: String, key: String, config: String, index: Int, isAnchor: Boolean) {
        getDataView(dataSourceKey, this.reactApplicationContext).handleAddItem(AsyncDataViewItem(key, parseSpec(config, reactApplicationContext)), index, isAnchor)
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
        val parsed = JSONArray(config)
        val items = mutableListOf<AsyncDataViewItem>()
        for (i in 0 until parsed.length()) {
            val itm = parsed.getJSONObject(i)
            items.add(AsyncDataViewItem(itm.getString("key"), resolveSpec(itm.getJSONObject("config"), reactApplicationContext)))
        }
        getDataView(dataSourceKey, this.reactApplicationContext).handleLoadedMore(items, completed)
    }
    @ReactMethod
    fun dataViewLoadedMoreForward(dataSourceKey: String, config: String, completed: Boolean) {
        val parsed = JSONArray(config)
        val items = mutableListOf<AsyncDataViewItem>()
        for (i in 0 until parsed.length()) {
            val itm = parsed.getJSONObject(i)
            items.add(AsyncDataViewItem(itm.getString("key"), resolveSpec(itm.getJSONObject("config"), reactApplicationContext)))
        }
        getDataView(dataSourceKey, this.reactApplicationContext).handleLoadedMoreForward(items, completed)
    }

    @ReactMethod
    fun dataViewCompleted(dataSourceKey: String) {
        //
    }

    @ReactMethod
    fun dataViewScrollToKeyReqested(dataSourceKey: String, scrollToKey: String) {
        getDataView(dataSourceKey, this.reactApplicationContext).handleScrollToKeyRequest(scrollToKey)
    }

    @ReactMethod
    fun dataViewScrollToTopFunc(dataSourceKey: String) {
        getDataView(dataSourceKey, this.reactApplicationContext).handleScrollToTopFunc()
    }
}