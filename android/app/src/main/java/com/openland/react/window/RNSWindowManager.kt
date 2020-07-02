package com.openland.react.window

import android.content.Context
import android.graphics.Color
import android.graphics.Rect
import android.graphics.drawable.ColorDrawable
import android.os.Build
import android.util.Log
import android.view.View
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.uimanager.UIManagerModule
import com.facebook.react.uimanager.UIManagerModuleListener
import com.openland.react.runOnUIThread
import com.openland.react.runOnUIThreadDelayed
import java.lang.reflect.Field

/**
 * RNSWindowManager removes window background right after first rendering of the application to avoid overdraw
 */
class RNSWindowManager(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), LifecycleEventListener, UIManagerModuleListener {

    private var isActive = false
    private var resumed = false

    private var attachInfoField: Field? = null
    private var stableInsetsField: Field? = null

    override fun getName(): String {
        return "RNSWindowManager"
    }

    override fun initialize() {
        super.initialize()

        reactApplicationContext.addLifecycleEventListener(this)
        reactApplicationContext.getNativeModule(UIManagerModule::class.java).addUIManagerListener(this)
    }



    override fun willDispatchViewUpdates(uiManager: UIManagerModule?) {
        if (!this.isActive && this.resumed) {
            isActive = true
//            runOnUIThreadDelayed(1000) {
//                reactApplicationContext.getNativeModule(UIManagerModule::class.java).addUIBlock {
//                    currentActivity?.window?.setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))
//                }
//            }
        }
    }

    protected fun getNormalNavigationBarHeight(ctx: Context): Float {
        try {
            val res = ctx.getResources()
            val rid = res.getIdentifier("config_showNavigationBar", "bool", "android")
            if (rid > 0) {
                val flag = res.getBoolean(rid) || Build.FINGERPRINT.contains("generic")
                if (flag) {
                    val resourceId = res.getIdentifier("navigation_bar_height", "dimen", "android")
                    if (resourceId > 0) {
                        return res.getDimensionPixelSize(resourceId).toFloat()
                    }
                }
            }
        } catch (e: Throwable) {
            return 0f
        }

        return 0f
    }

    private fun navbarHeightOf(ctx: Context, view: View?): Float {
        if (view == null) {
            return 0f
        }

        try {
            return attachInfoOf(view)?.let { insetsRectOf(it) }?.bottom?.toFloat() ?: 0f
        } catch (e: Exception) {
            Log.e(javaClass.name, "ViewInset error", e)
            return getNormalNavigationBarHeight(ctx)
        }
    }

    private fun attachInfoOf(view: View): Any? {
        if (attachInfoField == null) {
            attachInfoField = View::class.java.getDeclaredField("mAttachInfo")
        }

        attachInfoField?.isAccessible = true
        return attachInfoField?.get(view)
    }

    private fun insetsRectOf(attachInfo: Any): Rect? {
        if (stableInsetsField == null) {
            stableInsetsField = attachInfo.javaClass.getDeclaredField("mStableInsets")
        }

        stableInsetsField?.isAccessible = true
        return stableInsetsField?.get(attachInfo) as? Rect
    }

    override fun getConstants(): MutableMap<String, Any> {
        val res = mutableMapOf<String, Any>()
        val usableMetrics = reactApplicationContext.resources.getDisplayMetrics()
        val view = reactApplicationContext.currentActivity?.window?.decorView
        val navbarHeight = navbarHeightOf(reactApplicationContext, view)
        res["NAVIGATION_BAR"] = navbarHeight / usableMetrics.density

        return res
    }

    override fun hasConstants(): Boolean {
        return true;
    }

    @ReactMethod
    fun setStatusBarColor(color: String) {
        if (color == "light") {
            runOnUIThread {
                reactApplicationContext.currentActivity?.window?.decorView?.apply {
                    systemUiVisibility = systemUiVisibility or View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR or View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR
                }
            }
        } else {
            runOnUIThread {
                reactApplicationContext.currentActivity?.window?.decorView?.apply {
                    systemUiVisibility = systemUiVisibility and (View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR or View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR).inv()
                }
            }
        }
    }


    override fun onHostResume() {
        this.isActive = false
        this.resumed = true
    }

    override fun onHostPause() {
        this.isActive = false
        this.resumed = false
//        currentActivity?.window?.setBackgroundDrawable(ColorDrawable(Color.WHITE))
    }

    override fun onHostDestroy() {
        this.isActive = false
        this.resumed = false
//        currentActivity?.window?.setBackgroundDrawable(ColorDrawable(Color.WHITE))
    }
}