package com.openland.react.anim

import android.graphics.PointF
import android.support.v4.view.animation.FastOutSlowInInterpolator
import android.util.Log
import android.view.animation.LinearInterpolator
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.uimanager.PixelUtil
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.UIManagerModule
import com.facebook.react.uimanager.UIManagerModuleListener
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.views.view.ReactViewManager
import com.openland.react.anim.hack.CubicBezierInterpolator
import com.openland.react.anim.hack.MakeAnimationsFast
import com.openland.react.runOnUIThread
import com.openland.react.runOnUIThreadDelayed


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

        // Register in view view manager
        RNSAnimatedViewViewManager.sharedInstance.registerViewManager(this)
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
                for (a in resolved.valueSets) {
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
        for(s in spec.valueSets) {
            val view = views[s.viewKey]
            if (view != null) {
                when {
                    s.property == "opacity" -> {
                        view.alpha = s.value
                    }
                    s.property == "translateX" -> {
                        view.translationX = PixelUtil.toPixelFromDIP(s.value)
                    }
                    s.property == "translateY" -> {
                        view.translationY = PixelUtil.toPixelFromDIP(s.value)
                    }
                }
            }
        }
        var maxDuration = 0.0f
        for (a in spec.animations) {
            val view = views[a.viewKey]
            if (view != null) {
                val anim = MakeAnimationsFast.fastAnimate(view)

                // Set duration
                if (a.duration != null) {
                    anim.duration = (a.duration!! * 1000).toLong()
                    maxDuration = Math.max(a.duration!!, maxDuration)
                } else {
                    anim.duration = (spec.duration * 1000).toLong()
                    maxDuration = Math.max(spec.duration, maxDuration)
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

        if (spec.transactionKey != null) {
            if (spec.animations.size == 0) {
                onCompleted(spec.transactionKey!!)
            } else {
                runOnUIThread {
                    runOnUIThreadDelayed((maxDuration * 1000).toInt()) {
                        onCompleted(spec.transactionKey!!)
                    }
                }
            }
        }
    }

    private fun onCompleted(key:String) {
        val map = WritableNativeMap()
        map.putString("key", key)
        this.reactApplicationContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("react_s_animation_completed", map)
    }
}