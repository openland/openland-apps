package com.openland.react.anim

import android.annotation.SuppressLint
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.views.view.ReactViewGroup
import com.facebook.react.views.view.ReactViewManager

class RNSAnimatedViewViewManager : ReactViewManager() {

    companion object {
        val sharedInstance = RNSAnimatedViewViewManager()
    }

    private var manager: RNSAnimatedViewManager? = null

    override fun getName(): String {
        return "RNSAnimatedView"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): RNSAnimatedView {
        return RNSAnimatedView(this, reactContext)
    }

    fun registerView(key: String, view: RNSAnimatedView) {
        this.manager!!.registerView(key, view)
    }

    fun registerViewManager(manager: RNSAnimatedViewManager) {
        this.manager = manager
    }

    @ReactProp(name = "animatedKey")
    fun setAnimatedKey(view: RNSAnimatedView, key: String) {
        view.setAnimatedKey(key)
    }
}

@SuppressLint("ViewConstructor")
class RNSAnimatedView(private val manager: RNSAnimatedViewViewManager, context: ReactContext) : ReactViewGroup(context) {

    private var animatedKey: String? = null
    private var isRegistered = false

    fun setAnimatedKey(key: String) {
        this.animatedKey = key
    }

    override fun onLayout(changed: Boolean, left: Int, top: Int, right: Int, bottom: Int) {
        super.onLayout(changed, left, top, right, bottom)
        if (!isRegistered) {
            isRegistered = true
            manager.registerView(this.animatedKey!!, this)
        }
    }
}
