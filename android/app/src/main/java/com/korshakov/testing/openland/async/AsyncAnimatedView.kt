package com.korshakov.testing.openland.async

import android.graphics.Paint
import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.uimanager.PixelUtil
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.UIManagerModule
import com.facebook.react.uimanager.UIManagerModuleListener
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.views.view.ReactViewGroup
import com.facebook.react.views.view.ReactViewManager

object AsyncAnimatedViewStorage {
    var views = mutableMapOf<String, AsyncAnimatedView>()
    var manager: AsyncAnimatedViewManager? = null

    fun registerView(key: String, view: AsyncAnimatedView) {
        this.views[key] = view

        this.manager!!.resolvePendingAnimations()
    }
}


class AsyncAnimatedView(val manager: AsyncAnimatedViewViewManager, context: ReactContext) : ReactViewGroup(context) {

    private var animatedKey: String? = null
    private var isRegistered = false

    fun setAnimatedKey(key: String) {
        this.animatedKey = key
    }

    override fun onLayout(changed: Boolean, left: Int, top: Int, right: Int, bottom: Int) {
        if (!isRegistered) {
            isRegistered = true
            AsyncAnimatedViewStorage.registerView(this.animatedKey!!, this)
        }
        super.onLayout(changed, left, top, right, bottom)
    }
}

class AsyncAnimatedViewViewManager : ReactViewManager() {

    override fun getName(): String {
        return "RNFastAnimatedView"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): AsyncAnimatedView {
        return AsyncAnimatedView(this, reactContext)
    }

    @ReactProp(name = "animatedKey")
    fun setAnimatedKey(view: AsyncAnimatedView, key: String) {
        view.setAnimatedKey(key)
    }
}

class AsyncAnimatedViewManager(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), UIManagerModuleListener {

    private var pending = mutableListOf<RNFastAnimationTransactionSpec>()

    override fun initialize() {
        super.initialize()
        val reactCtx = reactApplicationContext
        val uiManager = reactCtx.getNativeModule(UIManagerModule::class.java)
        uiManager.addUIManagerListener(this)
        AsyncAnimatedViewStorage.manager = this
    }

    override fun willDispatchViewUpdates(uiManager: UIManagerModule) {

        uiManager.addUIBlock {
            resolvePendingAnimations()
        }
    }

    fun resolvePendingAnimations() {
        val pend = synchronized(this.pending) { this.pending.toTypedArray() }
        if (pend.isNotEmpty()) {
            val toRemove = mutableListOf<RNFastAnimationTransactionSpec>()
            for (resolved in pend) {
                var resolvedView = mutableMapOf<String, AsyncAnimatedView>()
                var hasAllViews = true
                for (a in resolved.animations) {
                    val view = AsyncAnimatedViewStorage.views[a.viewKey]
                    if (view == null) {
                        if (!a.optional) {
                            hasAllViews = false
                            Log.d("ANIMATIONS", "Unable to find " + a.viewKey)
                        }
                    } else {
                        resolvedView[a.viewKey] = view
                    }
                }

                if (hasAllViews) {
                    toRemove.add(resolved)

                    for (a in resolved.animations) {
                        val view = resolvedView[a.viewKey]

                        if (view != null) {
                            val anim = view.animate()
                            if (a.duration != null) {
                                anim.duration = (a.duration!! * 1000).toLong()
                            } else {
                                anim.duration = (resolved.duration * 1000).toLong()
                            }
                            if (a.property == "opacity") {
                                view.alpha = a.from
                                anim.alpha(a.to)
                                // anim.alphaBy(a.to - a.from)
                            } else if (a.property == "translateX") {
                                view.x = PixelUtil.toPixelFromDIP(a.from)
                                anim.translationX(PixelUtil.toPixelFromDIP(a.to))
                                // anim.translationXBy(a.to - a.from)
                            } else {
                                continue
                            }
                            anim.start()
                        }
                    }
                }

            }
            if (toRemove.isNotEmpty()) {
                synchronized(this.pending) {
                    for (r in toRemove) {
                        this.pending.remove(r)
                    }
                }
            }
        }
    }

    override fun getName(): String {
        return "RNFastAnimatedViewManager"
    }

    @ReactMethod
    fun animate(spec: String) {
        val resolved = parseAnimationSpec(spec)
        synchronized(this.pending) {
            pending.add(resolved)
        }
    }
}