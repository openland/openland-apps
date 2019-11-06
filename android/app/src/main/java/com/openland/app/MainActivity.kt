package com.openland.app

import android.app.Service
import android.content.ComponentName
import android.content.Intent
import android.content.ServiceConnection
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
import android.os.IBinder
import android.view.WindowManager
import android.app.NotificationManager

class MainActivity : ReactActivity() {

    private var provider: KeyboardHeightProvider? = null
    private var pendingIntent: Intent? = null

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    override fun getMainComponentName(): String? {
        return "openland"
    }

    private var delegate: ReactActivityDelegate? = null;

    override fun createReactActivityDelegate(): ReactActivityDelegate {
        delegate = object : ReactActivityDelegate(this, mainComponentName) {
            override fun createRootView(): ReactRootView {
                return RNGestureHandlerEnabledRootView(this@MainActivity)
            }

            override fun onCreate(savedInstanceState: Bundle?) {
                super.onCreate(savedInstanceState)
                Log.d("MainActivity", "onCreate")
            }

            override fun onPause() {
                super.onPause()
                (applicationContext as MainApplication).bindKeepAliveOnce()
            }

            override fun onResume() {
                super.onResume()
                // TODO: process pending after started
                Log.d("MainActivity", "onResume")
                if(pendingIntent != null){
                    onNewIntent(pendingIntent)
                    pendingIntent = null
                }
            }

            override fun onDestroy() {
                super.onDestroy()
                Log.d("MainActivity", "onDestroy")
            }

            override fun onNewIntent(intent: Intent?): Boolean {
                if (intent != null && intent.getStringExtra("conversationId") !== null) {
                    val res = Intent(Intent.ACTION_VIEW)
                    res.data = Uri.parse("openland://deep/mail/" + intent.getStringExtra("conversationId"))
                    super.onNewIntent(res)
                    return true
                }
                return false
            }
        }
        return delegate as ReactActivityDelegate
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        Log.d("Native", "BOOTSTRAP: Starting activity")
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

        (getSystemService(NOTIFICATION_SERVICE) as? NotificationManager)?.cancelAll()
        pendingIntent = intent

    }

    override fun onResume() {
        super.onResume()
        window.decorView.post {
            provider!!.start()
        }

        (getSystemService(NOTIFICATION_SERVICE) as? NotificationManager)?.cancelAll()
    }

    override fun onDestroy() {
        super.onDestroy()
        provider!!.close()
    }

    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
        delegate?.onNewIntent(intent)
    }

     class DumbServiceConnection: ServiceConnection{
        override fun onServiceDisconnected(name: ComponentName?) {
            Log.d("DumbServiceConnection", name?.className + " disconnected")
        }

        override fun onServiceConnected(name: ComponentName?, service: IBinder?) {
            Log.d("DumbServiceConnection", name?.className + " connected")
        }

    }

}
