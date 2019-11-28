package com.openland.react

import android.content.res.Configuration
import android.graphics.drawable.AnimatedVectorDrawable
import android.util.Log
import android.view.View
import com.facebook.react.uimanager.ThemedReactContext
import android.view.LayoutInflater
import android.widget.ImageView
import androidx.appcompat.content.res.AppCompatResources.getDrawable
import androidx.vectordrawable.graphics.drawable.AnimatedVectorDrawableCompat
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ViewProps
import com.facebook.react.uimanager.annotations.ReactProp
import com.openland.app.R

class SplashViewManager : SimpleViewManager<View>() {

    override fun getName(): String {
        return "AndroidSplashView"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): View {
        val activity = if (reactContext.currentActivity != null) reactContext.currentActivity!! else reactContext
        val currentMode = activity.resources.configuration.uiMode and Configuration.UI_MODE_NIGHT_MASK
        val isDark = currentMode == Configuration.UI_MODE_NIGHT_YES
        val inflater = LayoutInflater.from(activity)
        val view = inflater.inflate(if (isDark) R.layout.splash_dark else R.layout.splash, null)
        return view
    }


    @ReactProp(name = "splashVisible")
    fun setSplashVisible(view: View, visible: Boolean) {
        if (!visible && view.getTag(R.id.visible) != true) {
            view.setTag(R.id.visible, true)
            for(i in 1..10){
                view.postDelayed({
                    Thread.sleep(500)
                }, 500)
            }
            view.animate().alpha(0f).setDuration(250L).start()
//            (view.findViewById<ImageView>(R.id.image).background as AnimatedVectorDrawable).start()
//            (view.findViewById<ImageView>(R.id.back).background as AnimatedVectorDrawable).start()
        }
    }

}
