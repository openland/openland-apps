package com.openland.react.graphql

import android.util.Log
import com.apollographql.apollo.ApolloCall
import com.apollographql.apollo.ApolloClient
import com.apollographql.apollo.ApolloQueryWatcher
import com.apollographql.apollo.ApolloSubscriptionCall
import com.apollographql.apollo.api.*
import com.apollographql.apollo.api.cache.http.HttpCachePolicy
import com.apollographql.apollo.api.internal.Optional
import com.apollographql.apollo.cache.normalized.*
import com.apollographql.apollo.cache.normalized.lru.EvictionPolicy
import com.apollographql.apollo.cache.normalized.lru.LruNormalizedCacheFactory
import com.apollographql.apollo.cache.normalized.sql.ApolloSqlHelper
import com.apollographql.apollo.cache.normalized.sql.SqlNormalizedCacheFactory
import com.apollographql.apollo.exception.ApolloException
import com.apollographql.apollo.fetcher.ApolloResponseFetchers
import com.apollographql.apollo.fetcher.ResponseFetcher
import com.apollographql.apollo.internal.cache.normalized.ResponseNormalizer
import com.apollographql.apollo.internal.field.MapFieldValueResolver
import com.apollographql.apollo.internal.response.RealResponseReader
import com.apollographql.apollo.internal.response.ResolveDelegate
import com.apollographql.apollo.response.CustomTypeAdapter
import com.apollographql.apollo.response.CustomTypeValue
import com.apollographql.apollo.response.ScalarTypeAdapters
import com.apollographql.apollo.subscription.WebSocketSubscriptionTransport
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.openland.api.*
import okhttp3.OkHttpClient
import kotlin.reflect.KParameter
import kotlin.reflect.full.functions
import kotlin.reflect.full.staticFunctions
import com.openland.api.type.CustomType
import com.openland.api.type.UpdateProfileInput
import okhttp3.Request
import okhttp3.WebSocket
import okhttp3.WebSocketListener
import okio.ByteString
import java.text.Normalizer
import kotlin.reflect.full.createInstance
import kotlin.reflect.full.isSubclassOf
import kotlin.reflect.jvm.jvmErasure

object EmptyResponseDelegate : ResolveDelegate<Map<String, Any>> {
    override fun didResolve(field: ResponseField?, variables: Operation.Variables?) {
        // Nothing to do
    }

    override fun willResolveElement(atIndex: Int) {
        // Nothing to do
    }

    override fun willResolveRootQuery(operation: Operation<*, *, *>?) {
        // Nothing to do
    }

    override fun didResolveList(array: MutableList<Any?>?) {
        // Nothing to do
    }

    override fun didResolveNull() {
        // Nothing to do
    }

    override fun didResolveElement(atIndex: Int) {
        // Nothing to do
    }

    override fun didResolveScalar(value: Any?) {
        // Nothing to do
    }

    override fun willResolveObject(objectField: ResponseField?, objectSource: Optional<Map<String, Any>>?) {
        // Nothing to do
    }

    override fun didResolveObject(objectField: ResponseField?, objectSource: Optional<Map<String, Any>>?) {
        // Nothing to do
    }

    override fun willResolve(field: ResponseField?, variables: Operation.Variables?) {
        // Nothing to do
    }
}

class JSResponseListWriter(val res: WritableArray) : ResponseWriter.ListItemWriter {

    override fun writeLong(value: Long?) {
        if (value != null) {
            res.pushDouble((value as Number).toDouble())
        } else {
            res.pushNull()
        }
    }

    override fun writeObject(marshaller: ResponseFieldMarshaller?) {
        if (marshaller != null) {
            val child: WritableMap = WritableNativeMap()
            val writer = JSResponseWriter(child)
            marshaller.marshal(writer)
            res.pushMap(child)
        } else {
            res.pushNull()
        }
    }

    override fun writeString(value: String?) {
        if (value != null) {
            res.pushString(value)
        } else {
            res.pushNull()
        }
    }

    override fun writeBoolean(value: Boolean?) {
        if (value != null) {
            res.pushBoolean(value)
        } else {
            res.pushNull()
        }
    }

    override fun writeDouble(value: Double?) {
        if (value != null) {
            res.pushDouble((value as Number).toDouble())
        } else {
            res.pushNull()
        }
    }

    override fun writeInt(value: Int?) {
        if (value != null) {
            res.pushDouble((value as Number).toDouble())
        } else {
            res.pushNull()
        }
    }

    override fun writeCustom(scalarType: ScalarType, value: Any?) {
        if (scalarType.typeName() == "ID") {
            if (value != null) {
                res.pushString(value.toString())
            } else {
                res.pushNull()
            }
        } else if (scalarType.typeName() == "Date") {
            if (value != null) {
                res.pushString(value.toString())
            } else {
                res.pushNull()
            }
        } else {
            throw Error("Not implemented: " + scalarType.typeName())
        }
    }

    override fun writeList(items: MutableList<Any?>?, listWriter: ResponseWriter.ListWriter) {
        if (items != null) {
            val child: WritableArray = WritableNativeArray()
            val writer = JSResponseListWriter(child)
            listWriter.write(items, writer)
            res.pushArray(child)
        } else {
            res.pushNull()
        }
    }
}

class JSResponseWriter(val res: WritableMap) : ResponseWriter {

    override fun writeLong(field: ResponseField, value: Long?) {
        if (value != null) {
            res.putDouble(field.responseName(), value.toDouble())
        } else {
            res.putNull(field.responseName())
        }
    }

    override fun writeString(field: ResponseField, value: String?) {
        if (value != null) {
            res.putString(field.responseName(), value)
        } else {
            res.putNull(field.responseName())
        }
    }

    override fun writeDouble(field: ResponseField, value: Double?) {
        if (value != null) {
            res.putDouble(field.responseName(), value)
        } else {
            res.putNull(field.responseName())
        }
    }

    override fun writeList(field: ResponseField, values: MutableList<Any?>?, listWriter: ResponseWriter.ListWriter) {
        if (values != null) {
            val child: WritableArray = WritableNativeArray()
            val writer = JSResponseListWriter(child)
            listWriter.write(values, writer)
            res.putArray(field.responseName(), child)
        } else {
            res.putNull(field.responseName())
        }
    }

    override fun writeObject(field: ResponseField, marshaller: ResponseFieldMarshaller?) {
        if (marshaller != null) {
            val child: WritableMap = WritableNativeMap()
            val writer = JSResponseWriter(child)
            marshaller.marshal(writer)
            res.putMap(field.responseName(), child)
        } else {
            res.putNull(field.responseName())
        }
    }

    override fun writeBoolean(field: ResponseField, value: Boolean?) {
        if (value != null) {
            res.putBoolean(field.responseName(), value)
        } else {
            res.putNull(field.responseName())
        }
    }

    override fun writeInt(field: ResponseField, value: Int?) {
        if (value != null) {
            res.putDouble(field.responseName(), value.toDouble())
        } else {
            res.putNull(field.responseName())
        }
    }

    override fun writeCustom(field: ResponseField.CustomTypeField, value: Any?) {
        if (field.scalarType().typeName() == "ID") {
            if (value != null) {
                res.putString(field.responseName(), value.toString())
            } else {
                res.putNull(field.responseName())
            }
        } else if (field.scalarType().typeName() == "Date") {
            if (value != null) {
                res.putString(field.responseName(), value.toString())
            } else {
                res.putNull(field.responseName())
            }
        } else {
            throw Error("Not implemented: " + field.scalarType().typeName())
        }
    }
}

class JSStoreOperationCallback(val id: String, val key: String, val context: ReactApplicationContext) : ApolloStoreOperation.Callback<Operation.Data> {
    override fun onSuccess(result: Operation.Data?) {
        val map = WritableNativeMap()
        map.putString("key", key)
        map.putString("type", "response")
        map.putString("id", id)

        val d = result
        if (d != null) {
            val dataMap = WritableNativeMap()
            d.marshaller().marshal(JSResponseWriter(dataMap))
            map.putMap("data", dataMap)
        } else {
            map.putNull("data")
        }

        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("apollo_client", map)
    }

    override fun onFailure(t: Throwable?) {
        t?.printStackTrace()
        val map = WritableNativeMap()
        map.putString("key", key)
        map.putString("type", "failure")
        map.putString("id", id)
        map.putString("kind", "network")
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("apollo_client", map)
    }
}


class JSStoreOperationCallback2(val id: String, val key: String, val context: ReactApplicationContext) : ApolloStoreOperation.Callback<Boolean> {
    override fun onSuccess(result: Boolean) {
        val map = WritableNativeMap()
        map.putString("key", key)
        map.putString("type", "response")
        map.putString("id", id)
        map.putNull("data")

        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("apollo_client", map)
    }

    override fun onFailure(t: Throwable?) {
        t?.printStackTrace()
        val map = WritableNativeMap()
        map.putString("key", key)
        map.putString("type", "failure")
        map.putString("id", id)
        map.putString("kind", "network")
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("apollo_client", map)
    }
}

class JSOperationCallback(val id: String, val key: String, val context: ReactApplicationContext) : ApolloCall.Callback<Operation.Data>() {
    override fun onFailure(e: ApolloException) {
        Log.d("APOLLO", "JSOperationCallback onFailure")
        e.printStackTrace()
        val map = WritableNativeMap()
        map.putString("key", key)
        map.putString("type", "failure")
        map.putString("id", id)
        map.putString("kind", "network")
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("apollo_client", map)
    }

    override fun onResponse(response: Response<Operation.Data>) {
        Log.d("APOLLO", "JSOperationCallback onResponse")
        if (response.hasErrors()) {
            val map = WritableNativeMap()
            map.putString("key", key)
            map.putString("type", "failure")
            map.putString("id", id)
            map.putString("kind", "graphql")
            val errors = WritableNativeArray()
            for (i in response.errors()) {
                val errMap = WritableNativeMap()
                errMap.putString("message", i.message() ?: "Unknown error")
                val custom = i.customAttributes()
                if (custom.containsKey("uuid")) {
                    errMap.putString("uuid", custom["uuid"] as String)
                }
                if (custom.containsKey("shouldRetry")) {
                    errMap.putBoolean("shouldRetry", custom["shouldRetry"] as Boolean)
                } else {
                    errMap.putBoolean("shouldRetry", false)
                }

                if (custom.containsKey("invalidFields")) {
                    val errFields = WritableNativeArray()
                    val errFieldsSrc = custom["invalidFields"] as List<Map<String, Any>>
                    for (j in errFieldsSrc) {
                        val errField = WritableNativeMap()
                        errField.putString("key", j["key"] as String)
                        errField.putString("message", j["message"] as String)
                        errFields.pushMap(errField)
                    }
                    errMap.putArray("invalidFields", errFields)
                }

                errors.pushMap(errMap)
            }
            map.putArray("data", errors)
            context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                    .emit("apollo_client", map)
            return
        }

        val map = WritableNativeMap()
        map.putString("key", key)
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

        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("apollo_client", map)
    }
}

fun loadResponseFetcher(parameters: ReadableMap): ResponseFetcher {
    var responseFetcher: ResponseFetcher = ApolloResponseFetchers.CACHE_FIRST
    val policy = if (parameters.hasKey("fetchPolicy")) parameters.getString("fetchPolicy") else null
    when (policy) {
        "cache-first" -> responseFetcher = ApolloResponseFetchers.CACHE_FIRST
        "network-only" -> responseFetcher = ApolloResponseFetchers.NETWORK_ONLY
        "cache-and-network" -> responseFetcher = ApolloResponseFetchers.CACHE_AND_NETWORK
        "no-cache" -> throw Error("no-cache is unsupported on Android")
    }
    return responseFetcher
}

class NativeGraphqlClient(val key: String, val context: ReactApplicationContext, endpoint: String, token: String?, storage: String?) {

    private val httpClient: OkHttpClient
    private val client: ApolloClient
    private val watches = mutableMapOf<String, ApolloQueryWatcher<*>>()
    private var subscriptions: SubscriptionManager? = null

    init {

        val dateCustomTypeAdapter = object : CustomTypeAdapter<String> {
            override fun decode(value: CustomTypeValue<*>): String {
                return value.value.toString()
            }

            override fun encode(value: String): CustomTypeValue<*> {
                return CustomTypeValue.GraphQLString(value)
            }
        }

        val cacheFactory: NormalizedCacheFactory<*>
        cacheFactory = if (storage != null) {
            val apolloSqlHelper = ApolloSqlHelper.create(context, "gql-$storage.sqlite")
            SqlNormalizedCacheFactory(apolloSqlHelper)
        } else {
            LruNormalizedCacheFactory(EvictionPolicy.builder().build())
        }
        val resolver = object : CacheKeyResolver() {
            override fun fromFieldRecordSet(field: ResponseField, recordSet: Map<String, Any>): CacheKey {
                return formatCacheKey(recordSet["id"] as String?, recordSet["__typename"] as String?)
            }

            override fun fromFieldArguments(field: ResponseField, variables: Operation.Variables): CacheKey {
                return formatCacheKey(field.resolveArgument("id", variables) as String?, field.resolveArgument("__typename", variables) as String?)
            }

            private fun formatCacheKey(id: String?, typename: String?): CacheKey {
                return if (id == null || id.isEmpty() || typename == null || typename.isEmpty()) {
                    CacheKey.NO_KEY
                } else {
                    CacheKey.from("$typename$$id")
                }
            }
        }

        val httpBuilder = OkHttpClient.Builder()
        val connParams = mutableMapOf<String, Any>()
        if (token != null) {

            httpBuilder.addInterceptor { chain ->
                val original = chain.request()

                // Request customization: add request headers
                val requestBuilder = original.newBuilder()
                        .addHeader("x-openland-token", token)

                val request = requestBuilder.build()
                chain.proceed(request)
            }

            connParams.put("x-openland-token", token)
        }
        this.httpClient = httpBuilder.build()

        val wsFactory = WebSocket.Factory { request, listener ->
            this.httpClient.newWebSocket(request, object : WebSocketListener() {

                override fun onOpen(webSocket: WebSocket, response: okhttp3.Response) {
                    Log.d("WS", "onOpen")
                    listener.onOpen(webSocket, response)
                    this@NativeGraphqlClient.subscriptions!!.onSocketStarted()
                }

                override fun onFailure(webSocket: WebSocket, t: Throwable, response: okhttp3.Response?) {
                    Log.d("WS", "onFailure")
                    listener.onFailure(webSocket, t, response)
                    this@NativeGraphqlClient.subscriptions!!.onSocketStopped()
                }

                override fun onClosing(webSocket: WebSocket, code: Int, reason: String) {
                    Log.d("WS", "onClosing")
                    listener.onClosing(webSocket, code, reason)
                    this@NativeGraphqlClient.subscriptions!!.onSocketStopped()
                }

                override fun onMessage(webSocket: WebSocket, text: String) {
                    Log.d("WS", "onMessage")
                    listener.onMessage(webSocket, text)
                }

                override fun onMessage(webSocket: WebSocket, bytes: ByteString) {
                    Log.d("WS", "onMessage")
                    listener.onMessage(webSocket, bytes)
                }

                override fun onClosed(webSocket: WebSocket, code: Int, reason: String) {
                    Log.d("WS", "onMessage")
                    listener.onClosed(webSocket, code, reason)
                }
            })
        }

        this.client = ApolloClient.builder()
                .serverUrl("https:$endpoint")
                .okHttpClient(this.httpClient)
                .subscriptionTransportFactory(WebSocketSubscriptionTransport.Factory("wss:$endpoint", wsFactory))
                .subscriptionConnectionParams(connParams)
                .enableAutoPersistedQueries(false)
                .logger { priority, message, t, args ->
                    Log.d("APOLLO", String.format(message, *args))
                }
                .normalizedCache(cacheFactory, resolver)
                .addCustomTypeAdapter(CustomType.DATE, dateCustomTypeAdapter)
                .build()
        this.subscriptions = SubscriptionManager(key, client, context)
    }

    fun query(id: String, query: String, arguments: ReadableMap, parameters: ReadableMap) {
        this.client.query(readQuery(query, arguments))
                .responseFetcher(loadResponseFetcher(parameters))
                .enqueue(JSOperationCallback(id, key, context))
    }

    fun watch(id: String, query: String, arguments: ReadableMap, parameters: ReadableMap) {
        val w = this.client.query(readQuery(query, arguments))
                .responseFetcher(loadResponseFetcher(parameters))
                .watcher()
        this.watches[id] = w
        w.enqueueAndWatch(JSOperationCallback(id, key, context))
    }

    fun watchEnd(id: String) {
        this.watches.remove(id)?.cancel()
    }

    fun mutate(id: String, query: String, arguments: ReadableMap) {
        this.client.mutate(readMutation(query, arguments))
                .enqueue(JSOperationCallback(id, key, context))
    }

    fun read(id: String, query: String, arguments: ReadableMap) {
        this.client.apolloStore().read(readQuery(query, arguments))
                .enqueue(JSStoreOperationCallback(id, key, context))
    }

    fun write(id: String, data: ReadableMap, query: String, arguments: ReadableMap) {
        val query = readQuery(query, arguments)
        val variables = query.variables()
        val reader = RealResponseReader<Map<String, Any>>(variables,
                nativeMapToApolloMap(data),
                MapFieldValueResolver(),
                ScalarTypeAdapters(emptyMap()),
                EmptyResponseDelegate)
        val mapped = query.responseFieldMapper().map(reader)
        this.client.apolloStore().writeAndPublish(query, mapped)
                .enqueue(JSStoreOperationCallback2(id, key, context))
    }

    fun writeFragment(id: String, data: ReadableMap, fragment: String) {
        val fragment = readFragment(fragment, data)
        this.client.apolloStore()
                .writeAndPublish(fragment.second, CacheKey.from(fragment.first), Operation.EMPTY_VARIABLES)
                .enqueue(JSStoreOperationCallback2(id, key, context))
    }

    fun subscribe(id: String, query: String, arguments: ReadableMap) {
        this.subscriptions!!.subscribe(id, query, arguments)
    }

    fun subscribeUpdate(id: String, arguments: ReadableMap) {
        this.subscriptions!!.update(id, arguments)
    }

    fun unsubscribe(id: String) {
        this.subscriptions!!.unsubscribe(id)
    }

    fun dispose() {
        this.subscriptions!!.destroy()
    }
}