package com.openland.react.graphql

import android.util.Log
import com.apollographql.apollo.ApolloCall
import com.apollographql.apollo.ApolloClient
import com.apollographql.apollo.api.*
import com.apollographql.apollo.api.cache.http.HttpCachePolicy
import com.apollographql.apollo.cache.normalized.CacheKey
import com.apollographql.apollo.cache.normalized.CacheKeyResolver
import com.apollographql.apollo.cache.normalized.sql.ApolloSqlHelper
import com.apollographql.apollo.cache.normalized.sql.SqlNormalizedCacheFactory
import com.apollographql.apollo.exception.ApolloException
import com.apollographql.apollo.fetcher.ResponseFetcher
import com.apollographql.apollo.response.CustomTypeAdapter
import com.apollographql.apollo.response.CustomTypeValue
import com.apollographql.apollo.subscription.WebSocketSubscriptionTransport
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.openland.api.RegisterPushMutation
import okhttp3.OkHttpClient
import kotlin.reflect.KParameter
import kotlin.reflect.full.functions
import kotlin.reflect.full.staticFunctions
import com.openland.api.type.CustomType
import com.openland.api.type.UpdateProfileInput
import kotlin.reflect.full.isSubclassOf
import kotlin.reflect.jvm.jvmErasure


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

fun parseInputArguments(name: String, arguments: ReadableMap?): Any {
    val clazz = Class.forName(name).kotlin
    val clazzBuilder = Class.forName("$name\$Builder").kotlin
    val builder = clazz.staticFunctions.find { it.name == "builder" }!!.call()
    if (arguments != null) {
        val i = arguments.keySetIterator()
        while (i.hasNextKey()) {
            val k = i.nextKey()
            val bf = clazzBuilder.functions.find { it.name == k } ?: continue
            val argType = bf.parameters.find { it.kind == KParameter.Kind.VALUE }!!.type
            val arg = argType.jvmErasure.qualifiedName
            if (arg == "kotlin.String") {
                bf.call(builder, arguments.getString(k))
            } else if (arg == "kotlin.Int") {
                bf.call(builder, arguments.getInt(k))
            } else if (arg == "kotlin.Boolean") {
                bf.call(builder, arguments.getBoolean(k))
            } else {
                if (Class.forName(arg).isEnum) {
                    val arg2 = arguments.getString(k)
                    var found = false
                    for (e in Class.forName(arg).enumConstants) {
                        if (arg2 == (e as Enum<*>).name) {
                            bf.call(builder, e)
                            found = true
                            break
                        }
                    }
                    if (!found) {
                        throw Error("Unable to find enum value: $arg2")
                    }
                } else {
                    if (argType.jvmErasure.isSubclassOf(InputType::class)) {
                        val input = parseInputArguments(argType.jvmErasure.qualifiedName!!, arguments.getMap(k))
                        bf.call(builder, input)
                    } else {
                        throw Error("!!")
                    }
                }
            }
        }
    }
    return clazzBuilder.functions.find { it.name == "build" }!!.call(builder)!!
}

fun createOperation(type: String, query: String, arguments: ReadableMap?): Operation<Operation.Data, Operation.Data, Operation.Variables> {
    return parseInputArguments("com.openland.api.$query$type", arguments) as Operation<Operation.Data, Operation.Data, Operation.Variables>
}

fun createQuery(query: String, arguments: ReadableMap?): Query<Operation.Data, Operation.Data, Operation.Variables> {
    return createOperation("Query", query, arguments) as Query<Operation.Data, Operation.Data, Operation.Variables>
}

fun createMutation(query: String, arguments: ReadableMap?): Mutation<Operation.Data, Operation.Data, Operation.Variables> {
    return createOperation("Mutation", query, arguments) as Mutation<Operation.Data, Operation.Data, Operation.Variables>
}

class NativeGraphqlClient(val key: String, val context: ReactApplicationContext, endpoint: String, token: String?) {

    private val httpClient: OkHttpClient
    private val client: ApolloClient

    init {

        val dateCustomTypeAdapter = object : CustomTypeAdapter<String> {
            override fun decode(value: CustomTypeValue<*>): String {
                return value.value.toString()

            }

            override fun encode(value: String): CustomTypeValue<*> {
                return CustomTypeValue.GraphQLString(value)
            }
        }

        val apolloSqlHelper = ApolloSqlHelper.create(context, "appcache")
        val cacheFactory = SqlNormalizedCacheFactory(apolloSqlHelper)
        val resolver = object : CacheKeyResolver() {
            override fun fromFieldRecordSet(field: ResponseField, recordSet: Map<String, Any>): CacheKey {
                return formatCacheKey(recordSet["id"] as String?)
            }

            override fun fromFieldArguments(field: ResponseField, variables: Operation.Variables): CacheKey {
                return formatCacheKey(field.resolveArgument("id", variables) as String?)
            }

            private fun formatCacheKey(id: String?): CacheKey {
                return if (id == null || id.isEmpty()) {
                    CacheKey.NO_KEY
                } else {
                    CacheKey.from(id)
                }
            }
        }


        val httpBuilder = OkHttpClient.Builder()
        if (token != null) {

            httpBuilder.addInterceptor { chain ->
                val original = chain.request()

                // Request customization: add request headers
                val requestBuilder = original.newBuilder()
                        .addHeader("x-openland-token", token)

                val request = requestBuilder.build()
                chain.proceed(request)
            }
        }
        this.httpClient = httpBuilder.build()


        this.client = ApolloClient.builder()
                .serverUrl("https:$endpoint")
                .okHttpClient(this.httpClient)
                .subscriptionTransportFactory(WebSocketSubscriptionTransport.Factory("wss:$endpoint", this.httpClient))
                .sendOperationIdentifiers(false)
                .logger { priority, message, t, args ->
                    Log.d("APOLLO", String.format(message, *args))
                }
                .normalizedCache(cacheFactory, resolver)
                .addCustomTypeAdapter(CustomType.DATE, dateCustomTypeAdapter)
                .build()
    }

    fun query(id: String, query: String, arguments: ReadableMap?) {
        this.client.query(createQuery(query, arguments))
                .watcher()
                .enqueueAndWatch(object : ApolloCall.Callback<Operation.Data>() {
                    override fun onFailure(e: ApolloException) {
                        e.printStackTrace()
                        val map = WritableNativeMap()
                        map.putString("key", key)
                        map.putString("type", "failure")
                        map.putString("id", id)
                        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                                .emit("apollo_client", map)
                    }

                    override fun onResponse(response: Response<Operation.Data>) {

                        if (response.hasErrors()) {
                            val map = WritableNativeMap()
                            map.putString("key", key)
                            map.putString("type", "failure")
                            map.putString("id", id)
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
                })
    }

    fun refetch(id: String, query: String, arguments: ReadableMap?) {
        this.client.query(createQuery(query, arguments))
                .httpCachePolicy(HttpCachePolicy.NETWORK_FIRST)
                .enqueue(object : ApolloCall.Callback<Operation.Data>() {
                    override fun onFailure(e: ApolloException) {
                        e.printStackTrace()
                        val map = WritableNativeMap()
                        map.putString("key", key)
                        map.putString("type", "failure")
                        map.putString("id", id)
                        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                                .emit("apollo_client", map)
                    }

                    override fun onResponse(response: Response<Operation.Data>) {

                        if (response.hasErrors()) {
                            val map = WritableNativeMap()
                            map.putString("key", key)
                            map.putString("type", "failure")
                            map.putString("id", id)
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
                })
    }

    fun mutate(id: String, query: String, arguments: ReadableMap?) {
        this.client.mutate(createMutation(query, arguments))
                .enqueue(object : ApolloCall.Callback<Operation.Data>() {
                    override fun onFailure(e: ApolloException) {
                        e.printStackTrace()
                        val map = WritableNativeMap()
                        map.putString("key", key)
                        map.putString("type", "failure")
                        map.putString("id", id)
                        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                                .emit("apollo_client", map)
                    }

                    override fun onResponse(response: Response<Operation.Data>) {

                        if (response.hasErrors()) {
                            val map = WritableNativeMap()
                            map.putString("key", key)
                            map.putString("type", "failure")
                            map.putString("id", id)
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
                })
    }

    fun subscribe(id: String, query: String) {
//         this.client.subscribe(JSSubscription(query))
//                 .execute()
    }

    fun dispose() {
        // TODO: Implement
    }
}