package com.openland.app

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View

import com.facebook.react.ReactActivity

import com.facebook.react.ReactActivityDelegate
import com.facebook.react.ReactRootView
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.openland.react.keyboard.KeyboardHeightProvider
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView
import android.net.Uri
import android.os.Parcelable
import android.view.WindowManager
import android.util.DisplayMetrics
import org.json.JSONObject
import android.provider.MediaStore
import com.beust.klaxon.JsonArray
import org.json.JSONArray
import java.net.URLEncoder


class MainActivity : ReactActivity() {

    private var provider: KeyboardHeightProvider? = null

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    override fun getMainComponentName(): String? {
        return "openland"
    }

    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return object : ReactActivityDelegate(this, mainComponentName) {
            override fun createRootView(): ReactRootView {
                return RNGestureHandlerEnabledRootView(this@MainActivity)
            }

            override fun onPause() {
                super.onPause()
                Log.d("MainActivity", "onPause")
            }

            override fun onResume() {
                super.onResume()
                Log.d("MainActivity", "onResume")
            }

            override fun onDestroy() {
                super.onDestroy()
                Log.d("MainActivity", "onDestroy")
            }
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        window.decorView.systemUiVisibility = View.SYSTEM_UI_FLAG_LAYOUT_STABLE or View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN or View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR or View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR or WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS

        this.provider = KeyboardHeightProvider(this)
        provider!!.addKeyboardListener(object : KeyboardHeightProvider.KeyboardListener {
            override fun onHeightChanged(height: Int) {
                Log.d("MainActivity", "Height: $height")
                val map = WritableNativeMap()
                if (height > 0) {
                    map.putDouble("height", (height / resources.displayMetrics.density).toDouble())
                } else {
                    map.putDouble("height", 0.0)
                }
                (applicationContext as MainApplication)
                        .reactNativeHost
                        .reactInstanceManager
                        .currentReactContext
                        ?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                        ?.emit("async_keyboard_height", map)
            }
        })

        onIntent(intent)
    }

    private fun getStatusBarHeight(metrics: DisplayMetrics): Float {
        val heightResId = getResources().getIdentifier("status_bar_height", "dimen", "android")
        return if (heightResId > 0)
            getResources().getDimensionPixelSize(heightResId) / metrics.density
        else
            0.0f
    }

    private fun getRealHeight(metrics: DisplayMetrics): Float {
        return metrics.heightPixels / metrics.density
    }

    private fun getSoftMenuBarHeight(metrics: DisplayMetrics): Float {
        val realHeight = getRealHeight(metrics)
        val ctx = (applicationContext as MainApplication)
                .reactNativeHost
                .reactInstanceManager
                .currentReactContext!!
        val usableMetrics = ctx.resources.getDisplayMetrics()

        (getSystemService(Context.WINDOW_SERVICE) as WindowManager)
                .defaultDisplay.getMetrics(metrics)
        val usableHeight = usableMetrics.heightPixels

        return Math.max(0f, realHeight - usableHeight / metrics.density)
    }

    override fun onResume() {
        super.onResume()
        window.decorView.post {
            provider!!.start()
        }
    }

    override fun onPause() {
        super.onPause()

        // Start keep alive service
        val service = Intent(applicationContext, MainService::class.java)
        val bundle = Bundle()
        service.putExtras(bundle)
        startService(service)
    }

    override fun onDestroy() {
        super.onDestroy()
        provider!!.close()
    }

    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
        onIntent(intent);
    }

    private fun onIntent(intent: Intent?) {
        if (intent == null) {
            return
        }

        if (intent.action === Intent.ACTION_SEND) {
            var files = JSONArray()
            var strings = JSONArray()

            (intent.getParcelableExtra<Parcelable>(Intent.EXTRA_STREAM) as? Uri)?.let {
                val proj = arrayOf(MediaStore.Images.Media.DATA)
                val cursor = applicationContext.contentResolver.query(it, proj, null, null, null)
                val columnIndex = cursor.getColumnIndexOrThrow(proj[0])
                if (cursor != null && cursor.moveToFirst()) {
                    do {
                        files.put(cursor.getString(columnIndex))
                    } while (cursor.moveToNext())
                    cursor.close()
                }
            }

            intent.getStringExtra(Intent.EXTRA_TEXT)?.let {
                strings.put(it)
            }

            val res = Intent(Intent.ACTION_VIEW)
            val data = JSONObject()

            if(files.length() > 0){
                data.put("files", files)
            }
            if(strings.length() > 0){
                data.put("strings", strings)
            }

            res.data = Uri.parse("openland://deep/share?data=" + URLEncoder.encode(data.toString(), "utf8"))
            startActivity(res)

        }
    }
}
