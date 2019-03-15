package com.openland.react.graphql

import com.apollographql.apollo.ApolloCall
import com.apollographql.apollo.ApolloClient
import com.apollographql.apollo.api.*
import com.apollographql.apollo.exception.ApolloException
import com.apollographql.apollo.internal.response.RealResponseReader
import com.apollographql.apollo.subscription.WebSocketSubscriptionTransport
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeMap
import okhttp3.OkHttpClient
import kotlin.reflect.full.declaredMemberProperties
import kotlin.reflect.jvm.isAccessible

class JSData(val data: WritableMap) : Operation.Data {
    override fun marshaller(): ResponseFieldMarshaller {
        return ResponseFieldMarshaller {

        }
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


class NativeGraphqlClient(val context: ReactApplicationContext, endpoint: String, token: String) {

    private val httpClient: OkHttpClient = OkHttpClient.Builder()
            .build()
    private val client: ApolloClient

    init {
        this.client = ApolloClient.builder()
                .serverUrl("https:$endpoint")
                .okHttpClient(this.httpClient)
                .subscriptionTransportFactory(WebSocketSubscriptionTransport.Factory("wss:$endpoint", this.httpClient))
                .sendOperationIdentifiers(false)
                .build()
    }

    fun query(id: String, query: String) {
        this.client.query(object : Query<JSData, JSData, Operation.Variables> {
            override fun wrapData(data: JSData): JSData {
                return data
            }

            override fun variables(): Operation.Variables {
                return Operation.EMPTY_VARIABLES
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
        }).enqueue(object : ApolloCall.Callback<JSData>() {
            override fun onFailure(e: ApolloException) {
                TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
            }

            override fun onResponse(response: Response<JSData>) {
                TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
            }
        })
    }

    fun dispose() {
        // TODO: Implement
    }
}