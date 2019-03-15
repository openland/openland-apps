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
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import java.math.BigDecimal
import java.util.LinkedHashMap
import kotlin.reflect.full.declaredMemberProperties
import kotlin.reflect.jvm.isAccessible

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
            // Unsupported?
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
        return ""
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
                .build()
    }

    fun query(id: String, query: String, arguments: ReadableMap?) {
        this.client.query(JSQuery(query, arguments)).enqueue(object : ApolloCall.Callback<JSData>() {
            override fun onFailure(e: ApolloException) {
                val map = WritableNativeMap()
                map.putString("key", key)
                map.putString("type", "failure")
                map.putString("id", id)
                context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                        .emit("apollo_client", map)
            }

            override fun onResponse(response: Response<JSData>) {
                val map = WritableNativeMap()
                map.putString("key", key)
                map.putString("type", "response")
                map.putString("id", id)
                map.putMap("data", response.data()!!.data)
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