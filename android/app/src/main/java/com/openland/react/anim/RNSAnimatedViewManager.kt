package com.openland.react.anim

import android.graphics.PointF
import android.support.v4.view.animation.FastOutSlowInInterpolator
import android.util.Log
import android.view.animation.LinearInterpolator
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.uimanager.PixelUtil
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.UIManagerModule
import com.facebook.react.uimanager.UIManagerModuleListener
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.views.view.ReactViewManager
import com.openland.react.anim.hack.CubicBezierInterpolator
import com.openland.react.anim.hack.MakeAnimationsFast


class RNSAnimatedViewViewManager(val reactContext: ReactApplicationContext) : ReactViewManager() {

    private val manager: RNSAnimatedViewManager by lazy {
        reactContext.getNativeModule(RNSAnimatedViewManager::class.java)!!
    }

    override fun getName(): String {
        return "RNSAnimatedView"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): RNSAnimatedView {
        return RNSAnimatedView(this, reactContext)
    }

    fun registerView(key: String, view: RNSAnimatedView) {
        this.manager.registerView(key, view)
    }

    @ReactProp(name = "animatedKey")
    fun setAnimatedKey(view: RNSAnimatedView, key: String) {
        view.setAnimatedKey(key)
    }
}

class RNSAnimatedViewManager(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), UIManagerModuleListener {

    private var views = mutableMapOf<String, RNSAnimatedView>()
    private var pending = mutableListOf<RNSAnimationTransactionSpec>()

    override fun getName(): String {
        return "RNSAnimatedViewManager"
    }

    override fun initialize() {
        super.initialize()
        // Subscribe for mount events to catch right time to start animation
        val uiManager = reactApplicationContext.getNativeModule(UIManagerModule::class.java)
        uiManager.addUIManagerListener(this)
    }

    /**
     * Register animated view
     * [UI THREAD]
     */
    fun registerView(key: String, view: RNSAnimatedView) {
        this.views[key] = view
        resolvePendingAnimations()
    }


    /**
     * Entry point for animations
     * [BACKGROUND THREAD]
     */
    @ReactMethod
    fun animate(spec: String) {
        val resolved = parseAnimationSpec(spec)

        // Put transaction to pending list to start on next frame
        synchronized(this.pending) {
            pending.add(resolved)
        }
    }

    /**
     * Catch view updates to put animations
     * [BACKGROUND THREAD]
     */
    override fun willDispatchViewUpdates(uiManager: UIManagerModule) {
        uiManager.addUIBlock {
            resolvePendingAnimations()
        }
    }

    /**
     * Trying to find animations that can be started
     */
    private fun resolvePendingAnimations() {
        val pend = synchronized(this.pending) { this.pending.toTypedArray() }
        if (pend.isNotEmpty()) {
            val toRemove = mutableListOf<RNSAnimationTransactionSpec>()
            for (resolved in pend) {
                var resolvedView = mutableMapOf<String, RNSAnimatedView>()
                var hasAllViews = true
                for (a in resolved.animations) {
                    val view = views[a.viewKey]
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
                    doAnimations(resolved, resolvedView)
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

    private fun doAnimations(spec: RNSAnimationTransactionSpec, views: Map<String, RNSAnimatedView>) {
        for (a in spec.animations) {
            val view = views[a.viewKey]
            if (view != null) {
                val anim = MakeAnimationsFast.fastAnimate(view)

                // Set duration
                if (a.duration != null) {
                    anim.duration = (a.duration!! * 1000).toLong()
                } else {
                    anim.duration = (spec.duration * 1000).toLong()
                }

                // Easing
                when {
                    a.easing.type === RNSEasingType.linear -> anim.interpolator = LinearInterpolator()
                    a.easing.type === RNSEasingType.material -> anim.interpolator = FastOutSlowInInterpolator()
                    a.easing.type === RNSEasingType.bezier -> anim.interpolator = CubicBezierInterpolator(PointF(a.easing.bezier!![0], a.easing.bezier!![1]), PointF(a.easing.bezier!![2], a.easing.bezier!![3]))
                    else -> // Fallback to linear
                        anim.interpolator = LinearInterpolator()
                }

                when {
                    a.property == "opacity" -> {
                        view.alpha = a.from
                        anim.alpha(a.to)
                    }
                    a.property == "translateX" -> {
                        view.translationX = PixelUtil.toPixelFromDIP(a.from)
                        anim.translationX(PixelUtil.toPixelFromDIP(a.to))
                    }
                    a.property == "translateY" -> {
                        view.translationY = PixelUtil.toPixelFromDIP(a.from)
                        anim.translationY(PixelUtil.toPixelFromDIP(a.to))
                    }
                }
            }
        }
    }
}