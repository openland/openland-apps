package com.openland.react.anim

import android.annotation.SuppressLint
import com.facebook.react.bridge.ReactContext
import com.facebook.react.views.view.ReactViewGroup


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
