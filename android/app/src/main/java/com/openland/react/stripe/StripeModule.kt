package com.openland.react.stripe

import android.widget.FrameLayout
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.openland.app.MainActivity
import com.openland.app.MainApplication
import com.openland.react.runOnUIThread
import com.stripe.android.model.ConfirmSetupIntentParams
import com.stripe.android.model.StripeIntent
import com.stripe.android.view.CardMultilineWidget
import java.util.*

object StripeRegistry {
    val views = WeakHashMap<String, StripeCardView>()
}

class StripeCardView(context: ReactContext) : FrameLayout(context) {

    val input = CardMultilineWidget(context)

    init {
        this.addView(this.input, LayoutParams(
                android.view.ViewGroup.LayoutParams.MATCH_PARENT,
                android.view.ViewGroup.LayoutParams.MATCH_PARENT
        ))
    }

    fun setCallbackKey(src: String) {
        StripeRegistry.views[src] = this
    }
}

class StripeCardViewManager : SimpleViewManager<StripeCardView>() {

    override fun getName(): String {
        return "RNStripeCardView"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): StripeCardView {
        return StripeCardView(reactContext)
    }

    @ReactProp(name = "callbackKey")
    fun setCallbackKey(view: StripeCardView, configKey: String) {
        view.setCallbackKey(configKey)
    }
}

class StripeModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "RNStripe"
    }

    @ReactMethod
    fun confirmSetupIntent(callbackKey: String, clientSecret: String) {
        runOnUIThread {
            val pparams = StripeRegistry.views[callbackKey]?.input?.paymentMethodCreateParams
            val activity = reactApplicationContext.currentActivity!! as MainActivity
            if (pparams === null) {
                val map = WritableNativeMap()
                map.putString("clientSecret", clientSecret)
                map.putString("status", "failed")
                (reactApplicationContext.applicationContext as MainApplication)
                        .reactNativeHost
                        .reactInstanceManager
                        .currentReactContext
                        ?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                        ?.emit("openland_stripe_setup_intent", map)
                return@runOnUIThread
            }

            val params = ConfirmSetupIntentParams.create(pparams, clientSecret)
            activity.stripe.confirmSetupIntent(activity, params)

        }
    }
}