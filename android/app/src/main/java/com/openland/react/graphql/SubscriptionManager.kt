package com.openland.react.graphql

import com.apollographql.apollo.ApolloClient
import com.apollographql.apollo.ApolloSubscriptionCall
import com.apollographql.apollo.api.Operation
import com.apollographql.apollo.api.Response
import com.apollographql.apollo.exception.ApolloException
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.modules.core.DeviceEventManagerModule

class ActiveSubscription(val manager: SubscriptionManager, val id: String, val query: String, var arguments: ReadableMap) {
    private var started = false
    private var subscription: ApolloSubscriptionCall<Operation.Data>? = null

    fun start() {
        if (!this.started) {
            this.started = true
            doStart()
        }
    }

    fun stop() {
        if (this.started) {
            this.started = false
            doStop()
        }
    }

    private fun doStop() {
        val ex = this.subscription
        this.subscription = null
        ex?.cancel()
    }

    private fun doStart() {
        val subs = manager.client.subscribe(createSubscription(query, arguments))
        this.subscription = subs
        subs.execute(object : ApolloSubscriptionCall.Callback<Operation.Data> {
            override fun onFailure(e: ApolloException) {
                if (this@ActiveSubscription.subscription == subs) {
                    this@ActiveSubscription.onEnded()
                }
            }

            override fun onResponse(response: Response<Operation.Data>) {
                if (response.hasErrors()) {
                    if (this@ActiveSubscription.subscription == subs) {
                        this@ActiveSubscription.onEnded()
                    }
                    return
                }

                val map = WritableNativeMap()
                map.putString("key", manager.key)
                map.putString("type", "response")
                map.putString("id", id)

                val d = response.data()
                if (d != null) {
                    val dataMap = WritableNativeMap()
                    d.marshaller().marshal(JSResponseWriter(dataMap))
                    map.putMap("data", dataMap)
                } else {
                    map.putNull("data")
                }

                manager.context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                        .emit("apollo_client", map)
            }

            override fun onCompleted() {
                if (this@ActiveSubscription.subscription == subs) {
                    this@ActiveSubscription.onEnded()
                }
            }
        })
    }

    private fun onEnded() {
        if (this.started) {
            // Restarting
            doStop()
            doStart()
        }
    }
}

class SubscriptionManager(val key: String, val client: ApolloClient, val context: ReactApplicationContext) {

    private val subscriptions = mutableMapOf<String, ActiveSubscription>()
    // private var socketConnected = false

    @Synchronized
    fun subscribe(id: String, query: String, arguments: ReadableMap) {
        val subs = ActiveSubscription(this, id, query, arguments)
        this.subscriptions[id] = subs
        subs.start()
    }

    @Synchronized
    fun update(id: String, args: ReadableMap) {
        this.subscriptions[id]?.apply {
            arguments = args
        }
    }

    @Synchronized
    fun unsubscribe(id: String) {
        subscriptions.remove(id)?.stop()
    }

    @Synchronized
    fun onSocketStopped() {
//        if (socketConnected) {
//            socketConnected = false
        this.subscriptions.values.forEach {
            it.stop()
            it.start()
        }
///
    }

    @Synchronized
    fun onSocketStarted() {
//        if (!socketConnected) {
//            socketConnected = true
//            this.subscriptions.values.forEach {
//                it.start()
//            }
//        }
    }
}