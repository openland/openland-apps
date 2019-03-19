package com.openland.react.graphql

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
    fun createClient(key: String, endpoint: String, token: String) {
        if (this.clients.containsKey(key)) {
            throw Error("Client with key $key already exists")
        }

        this.clients[key] = NativeGraphqlClient(key, this.reactApplicationContext, endpoint, token)
    }

    @ReactMethod
    fun query(key: String, id: String, query: String, arguments: ReadableMap?) {
        if (!this.clients.containsKey(key)) {
            throw Error("Client with key $key does not exists")
        }
        this.clients[key]!!.query(id, query, arguments)
    }

    @ReactMethod
    fun refetch(key: String, id: String, query: String, arguments: ReadableMap?) {
        if (!this.clients.containsKey(key)) {
            throw Error("Client with key $key does not exists")
        }
        this.clients[key]!!.refetch(id, query, arguments)
    }

    @ReactMethod
    fun read(key: String, id: String, query: String, arguments: ReadableMap?) {
        if (!this.clients.containsKey(key)) {
            throw Error("Client with key $key does not exists")
        }
        this.clients[key]!!.read(id, query, arguments)
    }

    @ReactMethod
    fun subscribe(key: String, id: String, query: String, arguments: ReadableMap?) {
        if (!this.clients.containsKey(key)) {
            throw Error("Client with key $key does not exists")
        }
        this.clients[key]!!.subscribe(id, query, arguments)
    }

    @ReactMethod
    fun write(key: String, id: String, data: ReadableMap, query: String, arguments: ReadableMap?) {
        if (!this.clients.containsKey(key)) {
            throw Error("Client with key $key does not exists")
        }
        this.clients[key]!!.write(id, data, query, arguments)
    }

    @ReactMethod
    fun mutate(key: String, id: String, query: String, arguments: ReadableMap?) {
        if (!this.clients.containsKey(key)) {
            throw Error("Client with key $key does not exists")
        }
        this.clients[key]!!.mutate(id, query, arguments)
    }

    @ReactMethod
    fun closeClient(key: String) {
        if (!this.clients.containsKey(key)) {
            throw Error("Client with key $key does not exists")
        }
        this.clients.remove(key)!!.dispose()
    }
}