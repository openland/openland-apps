package com.openland.app

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
import android.view.WindowManager
import android.app.NotificationManager
import android.content.res.Configuration
import com.openland.react.stripe.StripeModule
import com.stripe.android.*
import com.stripe.android.model.StripeIntent

class MainActivity : ReactActivity() {

    private var provider: KeyboardHeightProvider? = null
    private var pendingIntent: Intent? = null
    lateinit var stripe: Stripe

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

            override fun onResume() {
                super.onResume()
                // TODO: process pending after started
                Log.d("MainActivity", "onResume")
                if (pendingIntent != null) {
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

        this.stripe = Stripe(this, "pk_test_y80EsXGYQdMKMcJ5lifEM4jx")

        val statusBarMode = if ((resources.configuration.uiMode and Configuration.UI_MODE_NIGHT_MASK) == Configuration.UI_MODE_NIGHT_YES) 0 else View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR
        window.decorView.systemUiVisibility = View.SYSTEM_UI_FLAG_LAYOUT_STABLE or View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN or statusBarMode or View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR or WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS

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

    private fun reportSetupIntentResult(clientSecret: String, status: String, id: String?, message: String?) {
        val map = WritableNativeMap()
        map.putString("clientSecret", clientSecret)
        map.putString("status", status)
        if (id != null) {
            map.putString("id", id)
        }
        if (message != null) {
            map.putString("message", message)
        }
        (applicationContext as MainApplication)
                .reactNativeHost
                .reactInstanceManager
                .currentReactContext
                ?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                ?.emit("openland_stripe_setup_intent", map)
    }

    private fun reportConfirmPaymentResult(id: String, status: String, message: String?) {
        val map = WritableNativeMap()
        map.putString("status", status)
        map.putString("id", id)

        if (message != null) {
            map.putString("message", message)
        }
        (applicationContext as MainApplication)
                .reactNativeHost
                .reactInstanceManager
                .currentReactContext
                ?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                ?.emit("openland_stripe_confirm_payment", map)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        val defaultError = "We are unable to authenticate your payment method. Please choose a different payment method and try again."
        val clientSecret = data?.extras?.getString("client_secret")

        this.stripe.onSetupResult(requestCode, data, object : ApiResultCallback<SetupIntentResult> {
            override fun onSuccess(result: SetupIntentResult) {
                val setupIntent = result.intent
                val status = setupIntent.status

                if (status == StripeIntent.Status.Succeeded) {
                    reportSetupIntentResult(clientSecret!!, "success", result.intent.paymentMethodId!!, null)
                } else {

                    if (result.outcome == StripeIntentResult.Outcome.CANCELED) {
                        // Special case for canceled authentication - sending failed state without
                        // error message that is not going to display error message

                        reportSetupIntentResult(clientSecret!!, "failed", null, null)
                    } else {
                        // We expect that any other state is failed with generic message

                        // NOTE: Error messages are not very user friendly and we use just generic
                        // error text instead
                        reportSetupIntentResult(clientSecret!!, "failed", null, defaultError)
                    }
                }
            }

            override fun onError(e: Exception) {
                // This is some kind of fatal error
                e.printStackTrace()
                reportSetupIntentResult(clientSecret!!, "failed", null, defaultError)
            }
        })

        // Handle the result of stripe.confirmPayment
        stripe.onPaymentResult(requestCode, data, object : ApiResultCallback<PaymentIntentResult> {
            override fun onSuccess(result: PaymentIntentResult) {
                val paymentIntent = result.intent
                val status = paymentIntent.status
                if(StripeModule.pendingConfirmPaymentId == null){
                    Log.e("stripe onPaymentResult", "no payment id!")
                }else{
                    Log.w("stripe", paymentIntent.id)
                    if (status == StripeIntent.Status.Succeeded) {
                        reportConfirmPaymentResult(StripeModule.pendingConfirmPaymentId!!, "success", null)
                    } else {
                        reportConfirmPaymentResult(StripeModule.pendingConfirmPaymentId!!, "failed", defaultError)
                    }
                }

            }

            override fun onError(e: Exception) {
                if(StripeModule.pendingConfirmPaymentId == null){
                    Log.e("stripe onPaymentResult", "no payment id!")
                }else{
                    reportConfirmPaymentResult(StripeModule.pendingConfirmPaymentId!!, "failed", e.localizedMessage)

                }
            }
        })
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

    override fun onPause() {
        super.onPause()

        try {
            // Start keep alive service
            val service = Intent(this.applicationContext, MainService::class.java)
            service.putExtras(Bundle())
            startService(service)
        } catch (e: Throwable) {
            e.printStackTrace()
        }

    }

    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
        delegate?.onNewIntent(intent)
    }
}
