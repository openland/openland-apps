package com.openland.react.graphql

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap


class RNGraphQL(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val clients = mutableMapOf<String, NativeGraphqlClient>()

    override fun getName(): String {
        return "RNGraphQL"
    }

    @ReactMethod
    fun createClient(key: String, endpoint: String, token: String?, storage: String?) {
        Log.d("RNGraphQLModule", "createClient")
        if (this.clients.containsKey(key)) {
            throw Error("Client with key $key already exists")
        }

        this.clients[key] = NativeGraphqlClient(key, this.reactApplicationContext, endpoint, token, storage)
    }

    @ReactMethod
    fun closeClient(key: String) {
        Log.d("RNGraphQLModule", "closeClient")
        if (!this.clients.containsKey(key)) {
            throw Error("Client with key $key does not exists")
        }
        this.clients.remove(key)!!.dispose()
    }

    @ReactMethod
    fun query(key: String, id: String, query: String, arguments: ReadableMap, parameters: ReadableMap) {
        Log.d("RNGraphQLModule", "query:$query")
        if (!this.clients.containsKey(key)) {
            throw Error("Client with key $key does not exists")
        }
        this.clients[key]!!.query(id, query, arguments, parameters)
    }

    @ReactMethod
    fun watch(key: String, id: String, query: String, arguments: ReadableMap, parameters: ReadableMap) {
        Log.d("RNGraphQLModule", "watch:$query")
        if (!this.clients.containsKey(key)) {
            throw Error("Client with key $key does not exists")
        }
        this.clients[key]!!.watch(id, query, arguments, parameters)
    }

    @ReactMethod
    fun watchEnd(key: String, id: String) {
        Log.d("RNGraphQLModule", "watchEnd")
        if (!this.clients.containsKey(key)) {
            throw Error("Client with key $key does not exists")
        }
        this.clients[key]!!.watchEnd(id)
    }


    @ReactMethod
    fun mutate(key: String, id: String, query: String, arguments: ReadableMap) {
        Log.d("RNGraphQLModule", "mutate: $query")
        if (!this.clients.containsKey(key)) {
            throw Error("Client with key $key does not exists")
        }
        this.clients[key]!!.mutate(id, query, arguments)
    }

    @ReactMethod
    fun subscribe(key: String, id: String, query: String, arguments: ReadableMap) {
        Log.d("RNGraphQLModule", "subscribe: $query")
        if (!this.clients.containsKey(key)) {
            throw Error("Client with key $key does not exists")
        }
        this.clients[key]!!.subscribe(id, query, arguments)
    }

    @ReactMethod
    fun subscribeUpdate(key: String, id: String, arguments: ReadableMap) {
        Log.d("RNGraphQLModule", "subscribeUpdate")
        if (!this.clients.containsKey(key)) {
            throw Error("Client with key $key does not exists")
        }
        this.clients[key]!!.subscribeUpdate(id, arguments)
    }

    @ReactMethod
    fun unsubscribe(key: String, id: String) {
        Log.d("RNGraphQLModule", "unsubscribe")
        if (!this.clients.containsKey(key)) {
            throw Error("Client with key $key does not exists")
        }
        this.clients[key]!!.unsubscribe(id)
    }

    @ReactMethod
    fun read(key: String, id: String, query: String, arguments: ReadableMap) {
        Log.d("RNGraphQLModule", "read: $query")
        if (!this.clients.containsKey(key)) {
            throw Error("Client with key $key does not exists")
        }
        this.clients[key]!!.read(id, query, arguments)
    }


    @ReactMethod
    fun write(key: String, id: String, data: ReadableMap, query: String, arguments: ReadableMap) {
        Log.d("RNGraphQLModule", "write: $query")
        if (!this.clients.containsKey(key)) {
            throw Error("Client with key $key does not exists")
        }
        this.clients[key]!!.write(id, data, query, arguments)
    }
}