package com.openland.react.graphql

import android.util.Log
import com.apollographql.apollo.ApolloCall
import com.apollographql.apollo.ApolloClient
import com.apollographql.apollo.api.*
import com.apollographql.apollo.exception.ApolloException
import com.apollographql.apollo.internal.response.RealResponseReader
import com.apollographql.apollo.subscription.WebSocketSubscriptionTransport
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import okhttp3.OkHttpClient
import java.math.BigDecimal
import java.util.LinkedHashMap
import kotlin.reflect.full.declaredMemberProperties
import kotlin.reflect.jvm.isAccessible
import com.apollographql.apollo.cache.normalized.sql.ApolloSqlHelper
import com.apollographql.apollo.cache.normalized.sql.SqlNormalizedCacheFactory
import com.apollographql.apollo.api.ResponseField
import com.apollographql.apollo.cache.normalized.CacheKey
import com.apollographql.apollo.cache.normalized.CacheKeyResolver
import kotlin.reflect.KParameter
import kotlin.reflect.full.functions
import kotlin.reflect.full.staticFunctions
import android.provider.Settings.System.DATE_FORMAT
import com.apollographql.apollo.response.CustomTypeValue
import com.apollographql.apollo.response.CustomTypeAdapter
import com.openland.api.type.CustomType


class JSResponseListWriter(val res: WritableArray) : ResponseWriter.ListItemWriter {

    override fun writeLong(value: Any?) {
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

    override fun writeString(value: Any?) {
        if (value != null) {
            res.pushString((value as String))
        } else {
            res.pushNull()
        }
    }

    override fun writeBoolean(value: Any?) {
        if (value != null) {
            res.pushBoolean((value as Boolean))
        } else {
            res.pushNull()
        }
    }

    override fun writeDouble(value: Any?) {
        if (value != null) {
            res.pushDouble((value as Number).toDouble())
        } else {
            res.pushNull()
        }
    }

    override fun writeInt(value: Any?) {
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
        } else {
            throw Error("Not implemented")
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
            for (v in values) {
                listWriter.write(v, writer)
            }
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
        } else {
            throw Error("Not implemented")
        }
    }
}

class JSVariables(val data: ReadableMap?) : Operation.Variables() {
    private var valueMap: MutableMap<String, Any> = LinkedHashMap()

    init {
        if (this.data != null) {
            this.valueMap = this.data.toHashMap()
        }
    }

    override fun valueMap(): MutableMap<String, Any> {
        return valueMap
    }

    override fun marshaller(): InputFieldMarshaller {
        return JSInputFieldMarshaller(valueMap)
    }
}

class JSData(val data: WritableMap) : Operation.Data {
    override fun marshaller(): ResponseFieldMarshaller {
        return ResponseFieldMarshaller {
            //            val i = data.keySetIterator()
//            while (i.hasNextKey()) {
//                val k = i.nextKey()
//                val v = data.getDynamic(k)
//                if (v.isNull) {
//                    it.writeBoolean(ResponseField.forBoolean(k, ar), null)
//                }
//            }
        }
    }
}

class JSQuery(val query: String, vars: ReadableMap?) : Query<JSData, JSData, JSVariables> {
    val variables = JSVariables(vars)

    override fun wrapData(data: JSData): JSData {
        return data
    }

    override fun variables(): JSVariables {
        return variables
    }

    override fun queryDocument(): String {
        return query
    }

    override fun responseFieldMapper(): ResponseFieldMapper<JSData> {
        return JSDataMapper
    }

    override fun operationId(): String {
        return "jq"
    }

    override fun name(): OperationName {
        return OperationName { "SomeQuery" }
    }
}

class JSSubscription(val query: String, vars: ReadableMap) : Subscription<JSData, JSData, JSVariables> {
    val variables = JSVariables(vars)

    override fun wrapData(data: JSData): JSData {
        return data
    }

    override fun variables(): JSVariables {
        return variables
    }

    override fun queryDocument(): String {
        return query
    }

    override fun responseFieldMapper(): ResponseFieldMapper<JSData> {
        return JSDataMapper
    }

    override fun operationId(): String {
        return ""
    }

    override fun name(): OperationName {
        return OperationName { "SomeSubscription" }
    }
}

object JSDataMapper : ResponseFieldMapper<JSData> {

    private val recordSetField = RealResponseReader::class.declaredMemberProperties.find { it.name == "recordSet" }!!

    init {
        recordSetField.isAccessible = true
    }

    private fun load(src: Map<String, Any>, to: WritableMap) {
        for (k in src.keys) {
            val v = src[k]
            when (v) {
                null -> {
                    to.putNull(k)
                }
                is Map<*, *> -> {
                    val d: WritableMap = WritableNativeMap()
                    load(v as Map<String, Any>, d)
                    to.putMap(k, d)
                }
                is String -> to.putString(k, v)
                is Boolean -> to.putBoolean(k, v)
                is List<*> -> {
                    val d: WritableArray = WritableNativeArray()
                    for (v2 in (v as List<Any>)) {
                        when (v2) {
                            is Map<*, *> -> {
                                val d2: WritableMap = WritableNativeMap()
                                load(v2 as Map<String, Any>, d2)
                                d.pushMap(d2)
                            }
                            is String -> d.pushString(v2)
                            is Boolean -> d.pushBoolean(v2)
                            is BigDecimal -> {
                                to.putDouble(k, v2.toDouble())
                            }
                            else -> {
                                throw Error()
                            }
                        }
                    }
                    to.putArray(k, d)
                }
                is BigDecimal -> {
                    to.putDouble(k, v.toDouble())
                }
                else -> {
                    throw Error()
                }
            }
        }
    }

    override fun map(responseReader: ResponseReader): JSData {
        val r = responseReader as RealResponseReader<Map<String, Any>>
        val fr = this.recordSetField.get(r) as Map<String, Any>
        val d: WritableMap = WritableNativeMap()
        load(fr, d)
        return JSData(d)
    }
}

class JSInputFieldMarshaller(val data: Map<String, Any>) : InputFieldMarshaller {

    private fun write(src: Map<String, Any>, to: InputFieldWriter) {
        for (k in src.keys) {
            val v = src[k]
            when (v) {
                is String -> to.writeString(k, v)
                is Boolean -> to.writeBoolean(k, v)
                is Map<*, *> -> to.writeObject(k) {
                    write(v as Map<String, Any>, it)
                }
            }
        }
    }

    override fun marshal(writer: InputFieldWriter) {
        this.write(this.data, writer)
    }
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

        val clazz = Class.forName("com.openland.api." + query + "Query").kotlin
        val clazzBuilder = Class.forName("com.openland.api." + query + "Query\$Builder").kotlin
        val builder = clazz.staticFunctions.find { it.name === "builder" }!!.call()
        if (arguments != null) {
            val i = arguments.keySetIterator()
            while (i.hasNextKey()) {
                val k = i.nextKey()
                val bf = clazzBuilder.functions.find { it.name === k } ?: continue
                val arg = bf.parameters.find { it.kind == KParameter.Kind.VALUE }!!
            }
        }
        val res = clazzBuilder.functions.find { it.name == "build" }!!.call(builder) as Query<Operation.Data, Operation.Data, Operation.Variables>


        this.client.query(res).enqueue(object : ApolloCall.Callback<Operation.Data>() {
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