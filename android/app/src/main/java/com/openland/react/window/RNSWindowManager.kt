package com.openland.react.window

import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.uimanager.UIManagerModule
import com.facebook.react.uimanager.UIManagerModuleListener
import com.openland.react.runOnUIThreadDelayed

/**
 * RNSWindowManager removes window background right after first rendering of the application to avoid overdraw
 */
class RNSWindowManager(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), LifecycleEventListener, UIManagerModuleListener {

    private var isActive = false
    private var resumed = false

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
            runOnUIThreadDelayed(100) {
                reactApplicationContext.getNativeModule(UIManagerModule::class.java).addUIBlock {
                    currentActivity?.window?.setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))
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
        currentActivity?.window?.setBackgroundDrawable(ColorDrawable(Color.WHITE))
    }

    override fun onHostDestroy() {
        this.isActive = false
        this.resumed = false
        currentActivity?.window?.setBackgroundDrawable(ColorDrawable(Color.WHITE))
    }
}