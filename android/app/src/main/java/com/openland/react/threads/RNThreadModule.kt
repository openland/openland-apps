package com.openland.react.threads

import android.os.Handler
import android.os.Looper
import android.util.Log

import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactInstanceManager
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.JSBundleLoader
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.devsupport.interfaces.DevSupportManager
import com.facebook.react.jstasks.HeadlessJsTaskContext
import com.facebook.react.jstasks.HeadlessJsTaskEventListener

import java.io.File
import java.io.IOException
import java.util.ArrayList
import java.util.Arrays
import java.util.HashMap


import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.Response
import okio.Okio
import okio.Sink


class RNThreadModule(
        reactAppCtx: ReactApplicationContext,
        private val reactNativeHost: ReactNativeHost,
        private val additionalThreadPackages: Array<ReactPackage>)
    : ReactContextBaseJavaModule(reactAppCtx), LifecycleEventListener, HeadlessJsTaskEventListener {

    private val TAG = "ThreadManager"
    private val threads: HashMap<Int, JSThread> = HashMap()

    private val reactInstanceManager: ReactInstanceManager
        get() = reactNativeHost.reactInstanceManager

    private val devSupportManager: DevSupportManager
        get() = reactInstanceManager.devSupportManager

    private var hasTasks = false
    private var hasApp = false
    private var started = false

    init {
        reactAppCtx.addLifecycleEventListener(this)
        runOnMainThread {
            val headlessJsTaskContext = HeadlessJsTaskContext.getInstance(reactApplicationContext)
            headlessJsTaskContext.addTaskEventListener(this)
        }
    }

    override fun getName(): String {
        return "ThreadManager"
    }

    @ReactMethod
    fun startThread(jsFileName: String, promise: Promise) {
        Log.d(TAG, "Starting web thread - $jsFileName")

        // When we create the absolute file path later, a "./" will break it.
        // Remove the leading "./" if it exists.
        val jsFileSlug = if (jsFileName.contains("./"))
            jsFileName.replace("./", "")
        else
            jsFileName

        val bundleLoader = if (devSupportManager.devSupportEnabled)
            createDevBundleLoader(jsFileName, jsFileSlug)
        else
            createReleaseBundleLoader(jsFileName, jsFileSlug)

        try {
            val threadPackages = ArrayList(Arrays.asList(*additionalThreadPackages))
            threadPackages.add(0, ThreadBaseReactPackage(reactInstanceManager))

            val threadContextBuilder = ReactContextBuilder(reactApplicationContext)
                    .setJSBundleLoader(bundleLoader)
                    .setDevSupportManager(devSupportManager)
                    .setReactInstanceManager(reactInstanceManager)
                    .setReactPackages(threadPackages)

            val thread = JSThread(jsFileSlug)
            thread.runFromContext(
                    reactApplicationContext,
                    threadContextBuilder
            )
            threads[thread.threadId] = thread
            promise.resolve(thread.threadId)
        } catch (e: Exception) {
            promise.reject(e)
            devSupportManager.handleException(e)
        }

    }

    @ReactMethod
    fun stopThread(threadId: Int) {
        val thread = threads[threadId]
        if (thread == null) {
            Log.d(TAG, "Cannot stop thread - thread is null for id $threadId")
            return
        }

        runOnMainThread {
            thread.terminate()
            threads.remove(threadId)
        }
    }

    @ReactMethod
    fun postThreadMessage(threadId: Int, message: String) {
        val thread = threads[threadId]
        if (thread == null) {
            Log.d(TAG, "Cannot post message to thread - thread is null for id $threadId")
            return
        }

        thread.postMessage(message)
    }

    override fun onHostResume() {
        runOnMainThread {
            Log.d(TAG, "onHostResume")
            hasApp = true
            maybeUpdateState()
        }
    }

    override fun onHostPause() {
        runOnMainThread {
            Log.d(TAG, "onHostPause")
            hasApp = false
            maybeUpdateState()
        }
    }

    override fun onHostDestroy() {
        runOnMainThread {
            Log.d(TAG, "onHostDestroy")
            hasApp = false
            maybeUpdateState()
        }
    }

    override fun onHeadlessJsTaskStart(taskId: Int) {
        runOnMainThread {
            Log.d(TAG, "onHeadlessJsTaskStart $taskId")
            hasTasks = true
            maybeUpdateState()
        }
    }

    override fun onHeadlessJsTaskFinish(taskId: Int) {
        val headlessJsTaskContext = HeadlessJsTaskContext.getInstance(reactApplicationContext)
        val hasTasksYet = headlessJsTaskContext.hasActiveTasks()
        runOnMainThread {
            Log.d(TAG, "onHeadlessJsTaskFinish $taskId")
            hasTasks = hasTasksYet
            maybeUpdateState()
        }
    }

    override fun onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy()
        runOnMainThread {
            for (threadId in threads.keys) {
                threads[threadId]!!.terminate()
            }
        }
    }

    private fun maybeUpdateState() {
        if (this.hasApp || this.hasTasks) {
            if (!started) {
                Log.d(TAG,"Resuming all threads")
                started = true
                for (threadId in threads.keys) {
                    threads[threadId]!!.onHostResume()
                }
            }
        } else {
            if (started) {
                Log.d(TAG,"Pausing all threads")
                started = false
                for (threadId in threads.keys) {
                    threads[threadId]!!.onHostPause()
                }
            }
        }
    }

    private fun runOnMainThread(callback: () -> Unit) {
        Handler(Looper.getMainLooper()).post(callback)
    }

    /*
     *  Helper methods
     */

    private fun createDevBundleLoader(jsFileName: String, jsFileSlug: String): JSBundleLoader {
        val bundleUrl = bundleUrlForFile(jsFileName)
        // nested file directory will not exist in the files dir during development,
        // so remove any leading directory paths to simply download a flat file into
        // the root of the files directory.
        val splitFileSlug = jsFileSlug.split("/".toRegex()).dropLastWhile { it.isEmpty() }.toTypedArray()
        val bundleOut = reactApplicationContext.filesDir.absolutePath + "/" + splitFileSlug[splitFileSlug.size - 1]

        Log.d(TAG, "createDevBundleLoader - download web thread to - $bundleOut")
        downloadScriptToFileSync(bundleUrl, bundleOut)

        return JSBundleLoader.createCachedBundleFromNetworkLoader(bundleUrl, bundleOut)
    }

    private fun createReleaseBundleLoader(jsFileName: String, jsFileSlug: String): JSBundleLoader {
        Log.d(TAG, "createReleaseBundleLoader - reading file from assets")
        return JSBundleLoader.createAssetLoader(reactApplicationContext, "assets://threads/$jsFileSlug.bundle", false)
    }

    private fun bundleUrlForFile(fileName: String): String {
        // http://localhost:8081/index.android.bundle?platform=android&dev=true&hot=false&minify=false
        val sourceUrl = devSupportManager.sourceUrl.replace("http://", "")
        return ("http://"
                + sourceUrl.split("/".toRegex()).dropLastWhile { it.isEmpty() }.toTypedArray()[0]
                + "/"
                + fileName
                + ".bundle?platform=android&dev=true&hot=false&minify=false")
    }

    private fun downloadScriptToFileSync(bundleUrl: String, bundleOut: String) {
        val client = OkHttpClient()
        val out = File(bundleOut)

        val request = Request.Builder()
                .url(bundleUrl)
                .build()

        try {
            val response = client.newCall(request).execute()
            if (!response.isSuccessful) {
                throw RuntimeException("Error downloading thread script - " + response.toString())
            }

            val output = Okio.sink(out)
            Okio.buffer(response.body()!!.source()).readAll(output)
        } catch (e: IOException) {
            throw RuntimeException("Exception downloading thread script to file", e)
        }

    }
}
