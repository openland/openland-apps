package com.openland.react.v8

import android.content.Context
import android.os.Build
import android.os.Handler
import android.os.HandlerThread
import android.support.annotation.RequiresApi
import android.util.Log
import com.eclipsesource.v8.V8
import com.eclipsesource.v8.V8Array
import com.eclipsesource.v8.V8Object
import com.facebook.react.bridge.JavaJSExecutor
import java.io.IOException
import java.lang.Exception
import java.net.URL
import java.util.concurrent.CompletableFuture

class V8Executor(val context: Context) : JavaJSExecutor {

    class Factory(val context: Context): JavaJSExecutor.Factory {
        override fun create(): JavaJSExecutor {
            return V8Executor(context)
        }
    }

    private val TAG = "V8"
    private lateinit var runtime: V8
    private lateinit var global: V8Object
    private lateinit var json: V8Object
    private val workerThread = HandlerThread("v8-worker")
    private val handler: Handler

    init {
        workerThread.start()
        while (workerThread.looper == null) {
            Thread.sleep(1)
        }
        handler = Handler(workerThread.looper)
        handler.post {
            runtime = V8.createV8Runtime("global")
            global = runtime.getObject("global")
            json = runtime.getObject("JSON")
        }
    }

    override fun setGlobalVariable(propertyName: String, jsonEncodedValue: String) {
        Log.d(TAG, "setGlobalVariable: $propertyName")
        handler.post {
            val parsed = json.executeObjectFunction("parse", V8Array(runtime).push(jsonEncodedValue))
            global.add(propertyName, parsed)
        }
    }

    @RequiresApi(Build.VERSION_CODES.N)
    override fun loadApplicationScript(sourceURL: String) {
        Log.d(TAG, "loadApplicationScript: $sourceURL")
        val fut = CompletableFuture<String>()
        handler.post {
            if (sourceURL.startsWith("http://")) {
                val data = URL(sourceURL).readText()
                Log.d(TAG, "downloaded")
                try {
                    runtime.executeScript(data)
                } catch (e: Exception) {
                    fut.completeExceptionally(JavaJSExecutor.ProxyExecutorException(e))
                }
                Log.d(TAG, "executed")
                fut.complete("")
            } else {
                val data = loadData(sourceURL)
                try {
                    runtime.executeScript(data)
                } catch (e: Exception) {
                    fut.completeExceptionally(JavaJSExecutor.ProxyExecutorException(e))
                }
                Log.d(TAG, "executed")
                fut.complete("")
            }
        }
        fut.get()
    }

    private fun loadData(inFile: String): String {
        var tContents = ""

        try {
            val stream = this.context.assets.open(inFile)

            val size = stream.available()
            val buffer = ByteArray(size)
            stream.read(buffer)
            stream.close()
            tContents = String(buffer)
        } catch (e: IOException) {
            throw e
            // Handle exceptions here
        }

        return tContents
    }

    override fun close() {
        Log.d(TAG, "close")
    }

    @RequiresApi(Build.VERSION_CODES.N)
    override fun executeJSCall(methodName: String, jsonArgsArray: String): String {
        Log.d(TAG, "executeJSCall: $methodName (${jsonArgsArray})")
        val fut = CompletableFuture<String>()
        handler.post {
            try {
                val parsed = json.executeArrayFunction("parse", V8Array(runtime).push(jsonArgsArray))
                val res = global.getObject("__fbBatchedBridge").executeFunction(methodName, parsed)
                val str = json.executeStringFunction("stringify", V8Array(runtime).push(res))
                fut.complete(str)
            } catch (e: Exception) {
                fut.completeExceptionally(JavaJSExecutor.ProxyExecutorException(e))
            }
        }
        return fut.get()
    }
}