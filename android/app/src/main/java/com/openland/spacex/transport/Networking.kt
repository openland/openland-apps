package com.openland.spacex.transport

import org.json.JSONArray
import org.json.JSONObject


interface NetworkingHandler {

    // Callbacks

    fun onResponse(id: String, data: JSONObject)
    fun onError(id: String, data: JSONArray)
    fun onCompleted(id: String)
    fun onTryAgain(id: String, delay: Int)

    // Session State

    fun onSessionRestart()
    fun onConnected()
    fun onDisconnected()
}